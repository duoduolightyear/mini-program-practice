import { request } from '../../request/index';

Page({

  data: {
    //商品详情
    goodsDetail: {}
  },

  //商品图片对象
  goodsInfo: {},

  onLoad: function (options) {
    //参数
    let goods_id = options.goods_id; 
    this.getGoodsDetail(goods_id);
  },

  //获取商品详情数据
  async getGoodsDetail (goods_id) {
    let response = await request({url:'/goods/detail', data: {goods_id}});
    this.goodsInfo =  response;
    this.setData({
      goodsDetail: {
        goods_name: response.goods_name,
        goods_price: response.goods_price,
        goods_introduce: response.goods_introduce.replace(/\.wbp/g,'.jpg'),
        pics: response.pics,
        goods_id: response.goods_id
      }
    })

  },

  //点击预览事件
  handlePreview(e){
    //商品图片数组
    let urls = this.goodsInfo.pics.map(item=>item.pics_mid);
    //点击的图片
    let current = e.currentTarget.dataset.url;

    wx.previewImage({
      urls,
      current
    })

  },

  //点击加入购物车
  handleAddCart() {
    //获取缓存
    let cart = wx.getStorageSync('cart') || [];
    //查看是否缓存中有数据，用数据的索引来查
    let index = cart.findIndex(item=>item.goods_id === this.goodsInfo.goods_id);
    if(index === -1) {
      //不存在，设置数量属性并添加
      this.goodsInfo.num = 1;
      this.goodsInfo.checked = true;
      cart.push(this.goodsInfo);
    } else {
      //存在，数量+1
      cart[index].num++;
    }
    //将数据添加到缓存
    wx.setStorageSync('cart', cart);
    //添加成功，弹窗提示
    wx.showToast({
      title: '添加成功',
      icon: 'success',
      mask: true
    })

  }
  
})