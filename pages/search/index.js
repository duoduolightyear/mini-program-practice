import { request }from '../../request/index';

Page({
  data: {
    goods: [],
    //取消按钮显示
    isFocus:false,
    //输入框的值
    iptValue: ''
  },

  //页面的定时器id
  timeId: 0,

  //输入内容，触发事件
  handleInput(e) {
    
    //获取输入值
    const {value} = e.detail;
    
    //合法性验证
    if(!value.trim()){
      this.setData({
        goods: [],
        isFocus: false,
        iptValue: ''
      })
      //值不合法
      return;
    }

    //发送请求
    this.setData({
      isFocus: true
    })
    clearTimeout(this.timeId); 
    this.timeId = setTimeout(()=>{
      this.qsearch(value);
    },1000);
  },
  //发送请求，获取搜索数据
  async qsearch(query) {
    //请求
    const response = await request({
      url:'/goods/qsearch', 
      data: {query}
    });
    //赋值
    this.setData({
      goods: response
    })
  },

  //取消按钮点击事件
  handleCancel() {
    this.setData({
      iptValue: '',
      isFocus: false,
      goods: []
    })
  }
})