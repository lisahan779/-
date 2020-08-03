// 云函数入口文件 就是node的实际项目
const cloud = require('wx-server-sdk')
const axios = require("axios")
const doubanbook = require("doubanbook") //解密豆瓣网站的
const cherrio = require("cheerio") //解析html文档用的专门爬虫
cloud.init()

// 通过搜索查看对应数据，搜索的数据需要解密
async function searchdouban(isbn) {
  const url = "https://book.douban.com/subject_search?search_text=" + isbn
  let serachInfo = await axios.get(url)
  // 获取了对应数据的原网页内容 
  // 解密这个正则： /window\.__DATA__ = "(.*)"/
  let reg = /window\.__DATA__ = "(.*)"/
  // doubanbook  解密豆瓣的一个包，只需要npm 
  if (reg.test(serachInfo.data)) {
    // 获取匹配的括号中的第一个值
    // console.log(111,RegExp.$1)
    // 解密出数据的内容
    let searchdata = doubanbook(RegExp.$1)[0]
    return searchdata //返回的数据拿到详情页的url
  }
}
async function getdouban(isbn) {
  // 第一个爬虫根据isbn查询url
  let detailInfo = await searchdouban(isbn)
  console.log(333, detailInfo.title, detailInfo.rating.value)
  // 第二层获取详情页的数据
  let detailPage = await axios.get(detailInfo.url) 
  // 第二个爬虫爬网址详情页对应的内容
  const $ = cherrio.load(detailPage.data)
  // $("#info")获取div中id名为infod的数据并进行筛选 split('\n')换行 v.trim()去空
  const inf = $("#info").text().split('\n').map(v => v.trim()).filter(v => v)
  let author = inf[1]
  let tags = []
  $("#db-tags-sections a, .tag").each((i, v) => {
    tags.push({
      title: $(v).text()
    })
  })
  // console.log(555,inf)
  const ret = {
    // 获取时间戳
    create_time: new Date().getTime(),
    title: detailInfo.title, //书籍标题
    rate: detailInfo.cover_url,
    url: detailInfo.url,
    summary: $("#link-report .intro").text(), //文章简介
    tags, //标签
    author, //作者
  }
  console.log(ret)
  return ret

}

// 云函数入口函数实际执行
exports.main = async (event, context) => {
  const {
    isbn
  } = event
  return getdouban(isbn)

}