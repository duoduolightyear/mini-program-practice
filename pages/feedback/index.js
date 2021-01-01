// pages/feedback/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "体验问题",
        isActive: true
      },
      {
        id: 1,
        value: "商品、商家投诉",
        isActive: false
      },
    ],
  },

  //点击事件
  handleitemChange(e) {
    let index = e.detail;
    let tabs = this.data.tabs;
    tabs.forEach((v,i)=> i===index? v.isActive=true : v.isActive=false);
    this.setData({
      tabs
    })
  },

  
})