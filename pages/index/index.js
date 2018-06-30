const app = getApp()
Page({
  data: {
     animationData:{},firstLoad:true
  },
  onLoad: function (options) {
  
  },
  onReady: function () {
    // app.login();
  },
  onShow: function () {
    this.setData({
      isPlay: app.globalData.isPlay
    });
    //动画效果
    var animation = wx.createAnimation({
      duration:2000,
      timingFunction:'ease'
    });
    var animation1 = wx.createAnimation({
      duration: 2000,
      timingFunction: 'ease'
    });
    if(this.data.firstLoad){
      setTimeout(function () {
        animation.translateY(0).opacity(1).step()
        animation1.translateY(0).opacity(1).step()
        this.setData({
          animationData: { text: animation.export(), btn: animation1.export()},
          firstLoad:false
        })
      }.bind(this), 1000)
    }else {
      animation.translateY(0).opacity(1).step()
      animation1.translateY(0).opacity(1).step()
      this.setData({
        animationData: { text: animation.export(), btn: animation1.export() },
      })
    }
   

  },
  onHide: function () {

    
  },
  onUnload: function () {
  
  },
  onPullDownRefresh: function () {
  
  },
  onReachBottom: function () {
  
  },
  onShareAppMessage: function () {
  
  },
  hide(){
    var animation = wx.createAnimation({
      duration: 2000,
      timingFunction: 'ease'
    });
    var animation1 = wx.createAnimation({
      duration: 2000,
      timingFunction: 'ease'
    });

    animation.translateY(-200).opacity(0).step()
    animation1.translateY(200).opacity(0).step()
    this.setData({
      animationData: { text: animation.export(), btn: animation1.export() },
    })
  },
  toOther(e){
    this.hide();
    setTimeout(function(){
      wx.navigateTo({
        url: e.currentTarget.dataset.src,
      })
    }.bind(this),1000);
   
  }
})