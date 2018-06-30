const app = getApp()
function isObjEqual(o1, o2) {
  var props1 = Object.getOwnPropertyNames(o1);
  var props2 = Object.getOwnPropertyNames(o2);
  if (props1.length != props2.length) {
    return false;
  }
  for (var i = 0, max = props1.length; i < max; i++) {
    var propName = props1[i];
    if (o1[propName] !== o2[propName]) {
      return false;
    }
  }
  return true;
}
Page({
  data: {
     pageData:{
       id:0,
       ename:'friend',
       name:'两小无猜'
     },
     isShare:false,
     isSave:false
     ,
     saveData:""
     ,
     mainData:[{
       title: 'https://mini.zsylife.cn/data/upload/images/friend/title.png',
       topText:'https://mini.zsylife.cn/data/upload/images/friend/top-text.png',
       content: {
         main1:'https://mini.zsylife.cn/data/upload/images/friend/main1.png',
         main2:'https://mini.zsylife.cn/data/upload/images/friend/main2.png',
         dialog:'https://mini.zsylife.cn/data/upload/images/friend/dialog.png'},
       footer:'https://mini.zsylife.cn/data/upload/images/friend/bottom.png'
     }, {
         title: 'https://mini.zsylife.cn/data/upload/images/ta/title.png',
         topText: 'http://dev.mini.zsylife.cn/data/upload/images/ta/top-text.png',
         content: {
           main1: 'http://dev.mini.zsylife.cn/data/upload/images/ta/main1.png',
           main2: 'http://dev.mini.zsylife.cn/data/upload/images/ta/main2.png',
           dialog: 'http://dev.mini.zsylife.cn/data/upload/images/ta/dialog1.png',
           dialog1: 'http://dev.mini.zsylife.cn/data/upload/images/ta/dialog2.png'
         },
         footer: 'http://dev.mini.zsylife.cn/data/upload/images/ta/bottom.png'
       }, {
         title: 'https://mini.zsylife.cn/data/upload/images/lover/title.png',
         topText: 'https://mini.zsylife.cn/data/upload/images/lover/top-text.png',
         content: {
           main1: 'http://dev.mini.zsylife.cn/data/upload/images/lover/main1.png',
           main2: 'http://dev.mini.zsylife.cn/data/upload/images/lover/main2.png',
           dialog: 'http://dev.mini.zsylife.cn/data/upload/images/friend/dialog.png'
         },
         footer: 'http://dev.mini.zsylife.cn/data/upload/images/lover/bottom.png'
     }, {
       title: 'http://dev.mini.zsylife.cn/data/upload/images/parents/title.png',
       topText: 'http://dev.mini.zsylife.cn/data/upload/images/parents/top-text.png',
       content: {
         main1: 'http://dev.mini.zsylife.cn/data/upload/images/parents/main1.png',
         main2: 'http://dev.mini.zsylife.cn/data/upload/images/parents/main2.png',
         dialog: 'http://dev.mini.zsylife.cn/data/upload/images/ta/dialog1.png',
         dialog1: 'http://dev.mini.zsylife.cn/data/upload/images/ta/dialog2.png'
       },
       footer: 'http://dev.mini.zsylife.cn/data/upload/images/parents/bottom.png'}],
     userEditor:[[{},{}],[{},{}]]
     
    
  },
  onLoad: function (options) {
    
   
      var that = this ;
      // options = {
      //   id: 3,
      //   ename: 'parents',
      //   name: '两小无猜'
      // };
      
      if(options.shareId){
        // options. id = (parseInt(options.id) - 1).toString(); 
          that.setData({
            isShare:true,
            pageData:options
          });
          wx.request({
            url: app.globalData.baseServer +'/index.php/Api/Wechatprogram/getcontent',
            method: 'POST',
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            data: {
              share_id: options.shareId
            },
            success(res) {
              let arr = res.data.data.content.content;
              arr = arr.replace(/&quot;/g,'"');
              arr = JSON.parse(arr);
              that.setData({
                'rawData': arr
              });
              app.onSet(res.data.data.music.url);
            },
            fail(res) {
              console.log(res);
            }
          });
          
      }
      else if(options.id){
      options.id = (parseInt(options.id) - 1).toString(); 
      app.login();
      var newJson = {
        id: options.id,
        ename:options.ename
      };
      that.setData({
         pageData: newJson,
         isShare:false
      });
      
      //看是否有音乐数据，有数据则不请求，没数据则请求
      if (!app.globalData.backgroundMusic.typeList[options.id]){
      wx.request({
        url: app.globalData.baseServer + '/index.php/Api/Wechatprogram/wxmusic',
        method: 'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        data:{
          num: 5,
          cate_id: parseInt(options.id) + 1
        },
        success(res){
          console.log(parseInt(options.id) + 1,res);
          app.globalData.backgroundMusic.typeList[options.id] = res.data.data ;
          app.globalData.backgroundMusic.nowList = res.data.data ;
          app.globalData.backgroundMusic.nowIndex = 0 ;
          app.onSet();
        },
        fail(res){
          console.log('类型音乐获取失败');
        }
      });
      }
      else{
        app.globalData.backgroundMusic.nowList = app.globalData.backgroundMusic.typeList[options.id];
        app.globalData.backgroundMusic.nowIndex = 0;
        app.onSet();
      }
      //数据设定
      wx.request({
        url: app.globalData.baseServer + '/index.php/Api/Wechatprogram/wxcopy',
        method:'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        data:{
          num:2,
          cate_id: parseInt(options.id)+1
        },
        success(res){
           console.log(res);
          //设置文字内容
          var arr = [];
          for(let [index,item] of res.data.content.entries()){
                 arr[index] = item.content;
          }
          //朋友页数据处理
          
            var rawData = arr;
            for (let [index, item] of rawData.entries()) {
              rawData[index] = rawData[index].split("&|&");
              for (let [indexs, items] of rawData[index].entries()) {
                rawData[index][indexs] = rawData[index][indexs].split("|&|");
              }
            }
            that.setData({
              'rawData': rawData
            })
          
        },
        fail(res){
          console.log(res)
        }
      });
      }
      wx.showShareMenu();
  },
  onReady: function () {
      this.setData({
        isPlay:app.globalData.isPlay
      });
      //弹窗组件，调用方式
      //this.alert.changeMeg("info");
      this.alert = this.selectComponent("#shareAlert");
      var that = this ;
     
     
  },
  onShow: function () {
    //每次进入页面，判断页面是否播放，在传给音乐组件
    this.setData({
      isPlay: app.globalData.isPlay
    });
  }
  ,
  saveData(){
    var that = this ;
    wx.showLoading({
      title:"上传中...",
      mask:true
    });
    var arr = this.data.rawData;
    arr = JSON.stringify(arr);  
    let postData = {
      content: arr,
      uid: parseInt(app.globalData.userInfo.id),
      cate_id: (parseInt(that.data.pageData.id) + 1),
      mid: app.globalData.backgroundMusic.nowList[app.globalData.backgroundMusic.nowIndex].id
    };
    if (isObjEqual(postData,this.data.saveData)){
      wx.hideLoading();
      that.alert.changeMeg("保存成功，赶紧去分享吧~");
      return
    } 
    wx.request({
      url: app.globalData.baseServer +'/index.php/Api/Wechatprogram/addcopy',
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: postData,
      success(res) {
          that.setData({
            share_id: res.data.share_id,
            isSave:true,
            saveData:postData
          });     
          wx.hideLoading();
         that.alert.changeMeg("保存成功，赶紧去分享吧~");
      },
      fail(res) {
        console.log('something WRong');
      }
    })
  }
  ,
  //自定义分享
  onShareAppMessage: function (res,b) {
    var that = this ;
    let share_id = this.data.share_id; 
    let $path ;
    if (share_id) {
       $path = '/pages/main/main?id=' + that.data.pageData.id + '&shareId=' + share_id + '&ename=' + that.data.pageData.ename;
    }
    else {
       $path = '/pages/main/main?id=' + (parseInt(that.data.pageData.id) + 1 )+ '&ename=' + that.data.pageData.ename;
    }
    console.log($path);
    return {
      title: '我们的回忆',
      path: $path,
      imageUrl: that.data.mainData[that.data.pageData.id].title,
      success: function (res) {
        wx.showModal({
          title: '祝贺',
          content: '恭喜，分享成功。赶紧去查看一下吧~',
          showCancel:true,
          confirmText:"查看",
          success(res){
            if(res.confirm){
            wx.redirectTo({
              url: $path,
            })
            }
          }
        })
      },
      fail: function (res) {
        console.log(res);
      }
    } 
    
  },
  editorDataSet(e){
     var json = this.data.rawData;
     json[e.detail.groupId][e.detail.index] = e.detail.data;
     this.setData({
       rawData:json
     });
  }
  
})


// userLineChange(e){
//   var data = this.data.userEditor;
//   console.log(e.detail.lineCount, data);

//   data[e.currentTarget.dataset.groudid][e.currentTarget.dataset.index].lineCount = e.detail.lineCount - 1;
//   this.setData({
//     userEditor: data
//   });
// },
// userInput(e){
//   var data = this.data.userEditor;
//   data[e.currentTarget.dataset.groudid][e.currentTarget.dataset.index].value = e.detail.value;
//   this.setData({
//     userEditor: data
//   });
// },
// submitbtn(e){
//   console.log(e);
//   var data = this.data.userEditor[e.currentTarget.dataset.groudid][e.currentTarget.dataset.index];
//   console.log(data);
//   var length = Math.ceil(data.value.length / (data.lineCount / 2));
//   var datas = data.value.StrCut2Arr(length);
//   var raw = this.data.rawData;
//   raw[e.currentTarget.dataset.groudid][e.currentTarget.dataset.index + 1] = { nowIndex: 0, data: datas }
//   this.setData({
//     rawData: raw
//   });
// }
  
  // toggleText(e){
  // console.log(e);
  // var json = e.currentTarget.dataset.datas;
  // var data = this.data.rawData;
  // json.nowIndex += 1;
  // json.nowIndex >= json.data.length ? json.nowIndex = 0 : "";

  // data[e.currentTarget.dataset.groudid][e.currentTarget.dataset.index] = json;
  // console.log(data);
  // this.setData({
  //   rawData: data
  // })

  
// }



