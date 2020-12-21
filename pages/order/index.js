// pages/order/index.js
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
        value: "待付款",
        isActive: false
      },
      {
        id: 2,
        value: "待发货",
        isActive: false
      },
      {
        id: 3,
        value: "退款/退货",
        isActive: false
      }
    ],
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

})