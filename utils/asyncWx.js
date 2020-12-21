
//查看授权状态getSetting
export const getSetting = () => {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

//调用地址chooseAddress
export const chooseAddress = () => {
  return new Promise((resolve, reject) => {
    wx.chooseAddress({
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}


//打开授权页面openSetting
export const openSetting = () => {
  return new Promise((resolve, reject) => {
    wx.openSetting({
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

//提示是否删除页面 showModal，要求参数{}
export const showModal = ({content}) => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: '提示',
      content: content,
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

//结算页面提示showToast，要求参数{}object
export const showToast = ({title}) => {
  return new Promise((resolve, reject) => {
    wx.showToast({
      title: title,
      icon: 'none',
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

//获取登陆login成功后的code
export const login = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      timeout: 10000,
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

//发起支付requestPayment，参数是个{}object
export const requestPayment = (pay) => {
  return new Promise((resolve, reject) => {
    wx.requestPayment({
      ...pay,
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      },
    })
  })
}