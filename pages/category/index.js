import { request } from '../../request/index';

Page({

  data: {
    //左侧菜单
    menuList: [],
    //右侧商品
    productList: [],
    //选中的左侧菜单
    currentIndex: 0,
    //右侧商品距离顶部的距离
    scrollTop: 0
  },

  //接口返回数据暂时存放
  Cates: [],

  onLoad: function (options) {
    //缓存功能
    let cat = wx.getStorageSync('cates');
    if (!cat) {
      // console.log("没有缓存");
      this.getCates()
    } else {
      if (Date.now() - cat.time > 1000 * 300) {
        //缓存过期，重新发送请求
        // console.log("缓存过期");
        this.getCates();
      } else {
        // console.log("缓存没过期");
        //获取缓存
        this.Cates = cat.data
        //赋值
        let menuList = this.Cates.map(item => item.cat_name);
        let productList = this.Cates[0].children;
        this.setData({
          menuList,
          productList
        })
      }
    }

  },
  //获取分类数据
  // getCates(){
  //   request({url: '/categories'})
  //     .then(response=> {
  //       this.Cates = response.data.message;
  //       //把接口数据存入本地存储
  //       wx.setStorageSync('cates', {
  //         time:Date.now(),
  //         data: this.Cates
  //       })
  //       //左侧菜单
  //       let menuList = this.Cates.map(item => item.cat_name);
  //       //右侧商品
  //       let productList = this.Cates[0].children;

  //       this.setData({
  //         menuList,
  //         productList
  //       })
  //     })
  // },

  //获取分类数据，使用async await语法
  async getCates() {
    let response = await request({ url: '/categories' });
    //接口数据
    this.Cates = response;
    //把接口数据存入本地存储
    wx.setStorageSync('cates', {
      time: Date.now(),
      data: this.Cates
    })
    //左侧菜单
    let menuList = this.Cates.map(item => item.cat_name);
    //右侧商品
    let productList = this.Cates[0].children;

    this.setData({
      menuList,
      productList
    })

  },

  //左侧菜单点击时间
  handleItemChange(e) {
    //获取索引
    let currentIndex = e.currentTarget.dataset.index;
    //获取对应的右侧商品页
    let productList = this.Cates[currentIndex].children;
    this.setData({
      currentIndex,
      productList,
      scrollTop: 0
    })
  }

})