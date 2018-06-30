const app = getApp()
Page({
  data: {
    type:[],
    authBtn:false
  },
  toMain(e){  
    console.log(app.globalData.userInfo);
    if(!app.globalData.userInfo){
      this.setData({
        authBtn:true
      })
    }else{
    if ( !isNaN(e.currentTarget.dataset.id) && e.currentTarget.dataset.ename){
    var $url = "../main/main?id=" + e.currentTarget.dataset.id + "&ename=" + e.currentTarget.dataset.ename;
    }
   
    wx.navigateTo({
      url: $url,
    })
    }
  },
  
  onReady(){
    app.loginIn();
    wx.setNavigationBarTitle({
      title: '小情愿'
    })
    //弹窗组件，调用方式
    //this.alert.changeMeg("info");
    this.alert = this.selectComponent("#alert");
    var that =  this;    
    wx.request({
      url: app.globalData.baseServer +'/index.php/Api/Wechatprogram/wxcate',
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success(res){
        
        that.setData({
          type:res.data.data
        })
     
      },
      fail(res){console.log(res)}
    })
    
  },
  onShow: function () {
    wx.setNavigationBarColor({
      backgroundColor: '#fccfd6',
      frontColor: '#000000'

    });
    //每次进入页面，判断页面是否播放，在传给音乐组件
    this.setData({
      isPlay: app.globalData.isPlay
    });
  },
  userInfoHandler(e){
    let that = this ;
    this.setData({
      authBtn: false
    })
    console.log(e,e.detail.errMsg);
    if (e.detail.errMsg == 'getUserInfo:ok'){
      let code ;
          wx.login(
            {
              success(res){
                console.log(app.globalData.userInfo,e.detail.userInfo)
                code = res.code ;
                app.globalData.userInfo = e.detail.userInfo;
                var $data = {
                  "code": code,
                  "nickname": e.detail.userInfo.nickName,
                  'gender': e.detail.userInfo.gender,
                  'city': e.detail.userInfo.city,
                  'province': e.detail.userInfo.province,
                  'country': e.detail.userInfo.country,
                  'avatarurl': e.detail.userInfo.avatarUrl
                }
                wx.request({
                  method: 'POST',
                  header: { 'content-type': 'application/x-www-form-urlencoded' },
                  url: app.globalData.baseServer + '/index.php/Api/Wechatprogram/wxlogin',
                  data: $data,
                  dataType: 'json',
                  success: function (res) {
                    wx.setStorage({
                      key: '3rd_session',
                      data: res.data["3rd_session"],
                      success() {
                        console.log('setStorageSuccess');
                        wx.showToast({
                          title: '授权成功！',
                        })
                      }
                    });
                  },
                  fail: function (res) {
                    console.log(2, res);
                  }
                });
              }
            }
          )
    }
   
  } 
})
