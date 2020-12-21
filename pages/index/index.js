import {request} from '../../request/index';
//Page Object
Page({
  data: {
    //轮播图数组
    swiperList: [],
    //导航数组
    categoryList: [],
    //楼层数组
    floorList: []
  },
  //options(Object)
  onLoad: function(options) {
    //获取轮播图数据
    this.getSwiperList();
    //获取导航数据
    this.getCategoryList();
    //获取楼层数据
    this.getFloorList();


    
  },

  //获取轮播图数据
  getSwiperList(){
    request({url: '/home/swiperdata'})
      .then(result=> {
        this.setData({
          swiperList: result
        })
      })
  },
  //获取导航数据
  getCategoryList() {
    request({url: '/home/catitems'})
      .then(result=> {
        this.setData({
          categoryList: result
        })
      })
  },
  //获取楼层数据
  getFloorList() {
    request({url: '/home/floordata'})
      .then(result=> {
        this.setData({
          floorList: result 
        })
      })
  }

});


  