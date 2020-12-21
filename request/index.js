// 公共接口https://api-hmugo-web.itheima.net/api/public/v1
//发送请求的次数
let ajaxTime = 0;
export const request = (params) => {    
  //请求次数
  ajaxTime++;
  //加载中图标显示
  wx.showLoading({
    title: '加载中',
    mask: true
  });
  //请求
  let baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1';
  return new Promise((resolve, reject)=>{
    wx.request({
      ...params,
      url: baseUrl + params.url,
      success: (result) =>{
        resolve(result.data.message)
      },
      fail: (err)=> {
        reject(err)
      },
      complete: () => {
        //请求完成
        ajaxTime--;
        //加载中图标隐藏
        wx.hideLoading();
      }
    })  
  })
};

