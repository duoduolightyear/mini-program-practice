import { request } from '../../request/index';

Page({

  data: {
    tabs: [
      {
        id: 0,
        value: "综合",
        isActive: true
      },
      {
        id: 1,
        value: "销量",
        isActive: false
      },
      {
        id: 2,
        value: "价格",
        isActive: false
      }
    ],
    goodsList: []
  },

  //商品列表数据接口需要的参数
  queryParams: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10
  },

  //列表总页数
  totalPages: 1,

  onLoad: function (options) {
    //获取参数cid
    this.queryParams.cid = options.cid;
    //获取商品列表数据
    this.getGoodsList();
  },

  //获取商品列表数据
  async getGoodsList(){
    //发送请求
    let response = await request({url: '/goods/search', data: this.queryParams});
    // console.log(response);
    //计算总页数：总条数 / 每页容量
    this.totalPages = Math.ceil(response.total / this.queryParams.pagesize);
    this.setData({
      //拼接数组，原先的数据+下一页的新数据
      goodsList: [...this.data.goodsList, ...response.goods]
    });
    //关闭下拉刷新事件
    wx.stopPullDownRefresh();
  },

  //tab点击事件
  handleitemChange(e) {
    let index = e.detail;
    let tabs = this.data.tabs;
    tabs.forEach((v,i)=> i===index? v.isActive=true : v.isActive=false);
    this.setData({
      tabs
    })
  },

  //页面上拉触底事件
  onReachBottom(){
    if(this.queryParams.pagenum >= this.totalPages){
      //处于最后一页
      wx.showToast({
        title: '已经到达底部',
      })
    } else {
      //还有下一页，重新发送请求
      this.queryParams.pagenum++;
      this.getGoodsList()
    }
  },

  //下拉刷新事件
  onPullDownRefresh(){
    //清空页面数据
    this.setData({
      goodsList: []
    });
    this.queryParams.pagenum = 1;
    //重新发送请求
    this.getGoodsList();
  }

})