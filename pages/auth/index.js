import { request } from '../../request/index';
import { login } from '../../utils/asyncWx';

Page({

  //获取用户信息
  async handleGetUserInfo(e) {
    try {
      //需要的用户信息
      // const { encryptedData, rawData, iv, signature } = e.detail;
      //获取小程序登陆成功后的code
      // const { code } = await login();
      //获取用户token需要的所有参数
      // const loginParams = { encryptedData, rawData, iv, signature, code };
      //请求用户token
      // const {token} = await request({
      //   url: '/users/wxlogin',
      //   data: loginParams,
      //   method: 'POST'
      // });
      // console.log(res) 打印null,企业用户才能获取,直接输入接口提供的token
     
      const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo";
      //把token存入缓存，并跳转回上一个页面
      wx.setStorageSync('token', token);
      wx.navigateBack({
        delta: 1,
      });
    } catch (error) {
      console.log(error);
    }

  }

})