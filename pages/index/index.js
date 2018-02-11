//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    detailList: ['暂无数据'],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    array:['中通快递','邮政EMS'],
    objectArray: [
      {
        id: 0,
        name: '中通快递',
        com:'zhongtong'
      },
      {
        id: 1,
        name: '邮政EMS',
        com:'ems'
      }
    ],
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //表单提交
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail)

    var that = this;
    var date = new Date();
    var comIndex = e.detail.value.com || 0;
    var com = this.data.objectArray[comIndex].com
    var nu = e.detail.value.nu;


    
    wx.request({
      "url": "https://ali-deliver.showapi.com/showapi_expInfo?com=" +com+"&nu="+nu,
      // "url": "https://ali-deliver.showapi.com/showapi_expInfo?com=zhongtong&nu=535962308717",
      header: {
        'Authorization':'APPCODE efa7da67579846caa73789603d74115a'
      },

      success: function (res) {
        var detail = res.data.showapi_res_body;
        if(detail.status == 4){
          that.setData({
            detailList: detail.data
          })
        }else{
          console.log(detail.msg)
          that.setData({
            detailList: [{ 'time': '','context':detail.msg}]
          })
        }
      }
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e)
    this.setData({
      index: e.detail.value
    })
  },


  onLoad: function () {
    console.log(this.data.objectArray)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  
})
