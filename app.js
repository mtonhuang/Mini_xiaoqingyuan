//app.js
const backgroundAudioManager = wx.getBackgroundAudioManager();
App({
  globalData: {
    baseServer: "https://mini.zsylife.cn/",
    userInfo:false,
    isPlay:true,
    check:"aaa",
    backgroundMusic:{
      nowIndex:0,
      listData: ['http://music.163.com/song/media/outer/url?id=281951.mp3', 'http://music.163.com/song/media/outer/url?id=398460.mp3', 'http://music.163.com/song/media/outer/url?id=281951.mp3'],
      typeList:{},
      nowList: []
    }
  },
  onLaunch(){
    var that = this ;

    wx.setNavigationBarTitle({
      title: '小情愿'
    })
    /*背景音乐设置*/ 
    this.globalData.backgroundMusic.nowList = this.globalData.backgroundMusic.listData;
    this.onSet();
  },
  onHide(){
   
     this.onPause();
  },onShow(){
     this.onPlay();
  },
  //设置音乐
  onSet(url){
    let that = this ;
    this.globalData.isPlay = true;
    if(url){
    backgroundAudioManager.src = url;
    backgroundAudioManager.title = '背景音乐';
    backgroundAudioManager.onEnded(function () {
      backgroundAudioManager.title = '背景音乐';
      backgroundAudioManager.src = url;
    })
    }
    else {
      let music = that.globalData.backgroundMusic.nowList[that.globalData.backgroundMusic.nowIndex]; 
      if( typeof music == 'string'){
      backgroundAudioManager.src = music;
      backgroundAudioManager.title = '背景音乐';
      backgroundAudioManager.onEnded(function () {
        backgroundAudioManager.title = '背景音乐';
        backgroundAudioManager.src = music;
      })
      }
      else {
        backgroundAudioManager.title = '背景音乐';
        backgroundAudioManager.src = music.url;
        backgroundAudioManager.onEnded(function () {
          backgroundAudioManager.title = '背景音乐';
          backgroundAudioManager.src = music.url;
        })
      }

    } 
  }
  ,
  //点击下一首
  onPlay(){
    var that = this;
    var now = this.globalData.backgroundMusic.nowIndex + 1;
    var length = this.globalData.backgroundMusic.nowList.length;
    now = (now >= length ? 0 : now);
    this.globalData.backgroundMusic.nowIndex = now;
    this.onSet();
  },
  onPause(){
    backgroundAudioManager.pause();
  }
  ,
  onContinue(){
    backgroundAudioManager.play();
  },
  //自然播放完毕则重新调用
  onEnded(){
    var that = this;
     
  },
  /*登录*/
  login(){
    var code, encryptedData, iv;
    var that = this ;
    //先判断用户登陆是否过期
    wx.checkSession({
      success(){
        console.log('登录态未过期');
        wx.getStorage({
          key: '3rd_session',
          success: function(res) {
            console.log(res.data);
            if(!res.data){
              that.loginIn();
              return
            }
            wx.request({
              url: that.globalData.baseServer +"/index.php/Api/Wechatprogram/wxusers",
              method:'POST',
              header: { 'content-type': 'application/x-www-form-urlencoded' },
              data: {'3rd_session':res.data},
              success(res){
                console.log(res, res.data.status);
                if(!res.data.status){
                  that.loginIn();
                  return
                }
                that.globalData.userInfo = res.data.data;
                console.log('success get userInfo:', res.data.data);
              },
              fail(res) { console.log(res)}
            })
          },
          fail(){
            console.log('登陆态未过期，3rd_session本地获取失败');
            that.loginIn();
          }
        });
      },
      fail(){
        that.loginIn();
      }
    }); 
  },
  loginIn(){
    var code;
    var that = this;
    wx.login({
      success(res) {
        code = res.code;
        wx.getUserInfo({
          success: function (res) {
            that.globalData.userInfo = res.userInfo;
            var $data = {
              "code": code,
              "nickname": res.userInfo.nickName,
              'gender': res.userInfo.gender,
              'city': res.userInfo.city,
              'province': res.userInfo.province,
              'country': res.userInfo.country,
              'avatarurl': res.userInfo.avatarUrl
            }
            wx.request({
              method: 'POST',
              header: { 'content-type': 'application/x-www-form-urlencoded' },
              url: that.globalData.baseServer + '/index.php/Api/Wechatprogram/wxlogin',
              data: $data,
              dataType: 'json',
              success: function (res) {
                console.log(res);
                wx.setStorage({
                  key: '3rd_session',
                  data: res.data["3rd_session"],
                  success(){
                    console.log('setStorageSuccess');
                  }
                });
              },
              fail: function (res) {
                console.log(2, res);
              }
            });
          },
          fail:function(){
      
            console.log('用户不授权');
           
          }
        });
      }
    });
  }
})





