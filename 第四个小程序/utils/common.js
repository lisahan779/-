const news = [
  {
    id: '356412',
  title: '特写：2019，天安门城楼前的中国',
  poster: 'http://image1.chinanews.com.cn/cnsupload/big/2019/10-01/4-426/a7e426b0dd6c43d2bc710fafe810a0d5.jpg',
  add_date: '2019 - 10 - 01',
  content: '    对于普通民众而言，一场阅兵式，军事装备展示无疑最令人期待。这个昔日饱经炮火、战乱洗礼的民族，此刻正在集中向世界展示70年来国家的发展进步。'

  },
  {
    id: '546734',
  title: '中国成功发射高分十号卫星 主要用于国土普查、防灾减灾等领域',
  poster: 'http://i2.chinanews.com/simg/cmshd/2019/10/05/998e12aa71f248d4a797761b18e48418.jpg',
  add_date: '2019 - 10 - 05',
  content: '    中新网北京10月5日电(郭超凯 赵金龙)北京时间10月5日2时51分，中国在太原卫星发射中心用长征四号丙运载火箭，成功将高分十号卫星发射升空，卫星顺利进入预定轨道，任务获得圆满成功。'
  },
  {
    id: '239875',
  title: '记者手记：国家庆典，每个人都是记录者',
  poster: 'http://i2.chinanews.com/simg/cmshd/2019/10/01/c5391220f28d49bdbd14c58a4300bde0.jpg',
  add_date: '2019 - 10 - 01',
  content: '    10月1日凌晨3时，大批中外记者先后乘坐巴士，向天安门方向出发。仍处于夜幕中的北京，多数市民正在享受难得的假期时光。此刻长安街上的安静，将与7个小时后形成巨大反差。'

  }
]

//获取新闻列表从后台动态的形式
function getNewList()
{
  let list = [];
  for( var i = 0; i < news.length; i++){
    let obj = {};
    obj.id = news[i].id;
    obj.poster = news[i].poster;
    obj.content = news[i].content;
    obj.add_date = news[i].add_date;
    obj.title = news[i].title;
    list.push(obj);
  }
  return list;
}

//获取新闻内容 通过id获取
function getNewsDetail(newsID)
{
  let message = {
    code:'404',
    news:{}
  };
  for( var i = 0; i < news.length; i++){
    if( newsID == news[i].id ){
      message.code = '200',
      message.news = news[i];
      break;
    }
  }
  return message;
}

module.exports = {
  getNewList:getNewList,
  getNewsDetail:getNewsDetail
}