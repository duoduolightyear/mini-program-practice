import { getSetting, chooseAddress, openSetting, showModal, showToast } from '../../utils/asyncWx';

Page({
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },

  onShow() {
    //获取缓存,地址信息
    const address = wx.getStorageSync('address');
    this.setData({
      address
    })
    //获取缓存，购物车信息
    const cart = wx.getStorageSync('cart') || [];
    //全选框
    // const allChecked = cart.length !== 0 && cart.every(item=>item.checked);

    //计算
    this.setCart(cart);
  },


  //获取收货地址
  // handleAddress() {
  //   //查看授权状态
  //   wx.getSetting({
  //     success: (result) => {
  //       let scopeAddress = result.authSetting['scope.address'];
  //       if (scopeAddress || scopeAddress === undefined) {
  //         //授权过或者未授权,调用地址
  //         wx.chooseAddress({
  //           success: (result1) => {
  //             console.log(result1);
  //           },
  //         })
  //       } else {
  //         //拒绝过授权，打开授权页面
  //         wx.openSetting({
  //           success: (result2) => {
  //             //授权后调用地址
  //             wx.chooseAddress({
  //               success: (result3) => {
  //                 console.log(result3);
  //               },
  //             })
  //           }
  //         })
  //       }
  //     }
  //   })

  // },

  //点击事件，获取收货地址
  
  async handleAddress() {
    try {
      //获取授权状态
      const response_1 = await getSetting();
      const scopeAddress = response_1.authSetting['scope.address'];

      //判断授权状态: 如果拒绝过授权，打开授权页面
      if (!scopeAddress) {
        await openSetting();
      }

      //授权后调用地址  
      const address = await chooseAddress();

      //调用地址后，存入缓存
      wx.setStorageSync('address', address);

    } catch (error) {
      console.log(error);
    }
  },

  //改变商品选中状态
  handleItemChange(e){
    //获取被选中的商品的id
    const goods_id = e.currentTarget.dataset.id;
    //获取购物车数组
    let cart = this.data.cart;
    //获取被选中的商品的索引
    let index = cart.findIndex(item=>item.goods_id === goods_id);
    //修改选中状态
    cart[index].checked = !cart[index].checked;
    //重新计算
    this.setCart(cart);
  },

  //设定全选反选状态
  handleAllCheckChange(){
    //获取选中状态
    let allChecked = this.data.allChecked;
    let cart = this.data.cart;
    //取反
    allChecked = !allChecked;
    //更改复选框状态
    cart.forEach(item=>item.checked=allChecked);
    //将结果填充回cart
    this.setCart(cart);
  },

  //商品数量编辑
  async handleItemEdit(e){
    //获取商品id和操作符
    const goods_id = e.currentTarget.dataset.id;
    const operation = e.currentTarget.dataset.operation;
    //获取购物车数组
    let cart = this.data.cart;
    //获取被选中的商品的索引
    let index = cart.findIndex(item=>item.goods_id === goods_id);
    //检查是不是最后一个商品，删除或编辑
    if(cart[index].num===1&&operation===-1){
      const res = await showModal({content:'是否删除商品？'});
      //确认删除，重新计算
      if(res.confirm){
        cart.splice(index,1);
        this.setCart(cart);
      }
    } else {
      //编辑，重新计算
      cart[index].num+=operation;
      this.setCart(cart);
    }
  },

 

  //结算功能
  async handlePay() {
    //确认填写收货地址
    const address = this.data.address;
    if(!address.cityName){
      await showToast({title: '请选择收货地址'});
      return;
    }
    //确认选中商品
    const totalNum = this.data.totalNum;
    if(totalNum===0){
      await showToast({title: '请选择要购买的商品'});
      return
    }
    //跳转到支付页面
    wx.navigateTo({
      url: '../pay/index',
    })
  },

   //计算总价格总数量
   setCart(cart){
    //总价格总数量
    let allChecked = true;
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(item=>{
      if(item.checked){
        totalPrice += item.num * item.goods_price;
        totalNum += item.num;
      } else{
        allChecked = false;
      }
    })
    //判断购物车数组是否为空
    allChecked = allChecked.length !== 0? allChecked:false;
    //赋值
    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum
    })
    //存入缓存
    wx.setStorageSync('cart', cart);
  },






})