// 获取token
// 获取订单编号
// 完成支付
// 删除缓存中被选中的商品
// 缓存删除后的数据
// 跳转页面

import { getSetting, chooseAddress, openSetting, showModal, showToast,requestPayment } from '../../utils/asyncWx';
import { request } from '../../request/index';

Page({
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0
  },

  onShow() {
    //获取缓存,地址信息
    const address = wx.getStorageSync('address');
    //获取缓存，购物车信息
    let cart = wx.getStorageSync('cart');
    //只有被选中的商品
    cart = cart.filter(item=>item.checked);
    //计算
    //总价格总数量
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(item=>{ 
        totalPrice += item.num * item.goods_price;
        totalNum += item.num;
    })
    //赋值
    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    })
  },

  //支付功能
  async handleOrderPay(){
    try {
      //判断缓存中是否有用户token
    const token = wx.getStorageSync('token');
    if(!token){
      //没有token，跳转到授权页面
      wx.navigateTo({
        url: '../auth/index',
      })
    }

    //有token，就开始创建订单
    //需要的参数
    //请求头参数
    const header = {Authorization: token};
    //请求体参数
    const order_price = this.data.totalPrice;
    const address = this.data.address;
    const consignee_addr = address.provinceName + address.cityName + address.countyName + address.detailInfo
    let goods	 = [];
    const cart  = this.data.cart;
    cart.forEach(item=>goods.push({
      goods_id: item.goods_id,
      goods_number: item.num,
      goods_price: item.goods_price
    }));
    //请求体参数对象
    const orderParams = {order_price, consignee_addr, goods};
    //发送请求，获取订单编号order_number
    const {order_number} = await request({
      url: '/my/orders/create',
      header,
      data: orderParams,
      method: 'POST'    
    });
    console.log(order_number);

    //发送请求，获取支付参数
    const {pay} = await request({
      url: '/my/orders/req_unifiedorder',
      header,
      data: {order_number},
      method: 'POST'
    })
  

    //发起支付 报错 以下无法允许
    // const res = await requestPayment(pay);

    //查询订单支付状态
    // const res = await request({
    //   url: '/my/orders/chkOrder',
    //   header,
    //   data: {order_number},
    //   method: "POST"
    // });
    // console.log(res);
    //弹窗提示
    // await showToast({title: '支付成功'})
    //删除缓存中已经支付的产品，重新缓存

    //跳转到订单页面
    wx.navigateTo({
      url: '../order/index',
    })
    } catch (error) {
      //弹窗提示
    await showToast({title: '支付失败'})
      console.log(error);
    }
   
    

  }

})