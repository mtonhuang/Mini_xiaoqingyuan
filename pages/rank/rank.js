const app = getApp()
Page({
  data: {
    isdown:false,
    isNull:false,
    titleData: [
      { name: "两小无猜",ename:'friend', id: "0", imgUrl: "../../images/rank/btn1.png" },
      { name: "君子好逑", id: "1", imgUrl: "../../images/rank/btn2.png" },
      { name: "执子之手",ename:'lover', id: "2", imgUrl: "../../images/rank/btn3.png" },
      { name: "与子偕老", id: "3", imgUrl: "../../images/rank/btn4.png" }
    ],
    contentData: [],
    listData:{}
  },
  onLoad: function (options) {
    this.getDetailData(this.data.url);
    this.setData({
      nowData: this.data.titleData[0]
    })
  },
  onReady: function () {
    let that = this;
    app.login();
   
         
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#F6E0DF'
    });
    let timer = setInterval(function(){
      if (app.globalData.userInfo.id){
        clearInterval(timer);
        wx.request({
          url: app.globalData.baseServer + '/index.php/Api/Wechatprogram/userpost',
          method: 'POST',
          header: { 'content-type': 'application/x-www-form-urlencoded' },
          data: {
            cate_id: parseInt(that.data.nowData.id) + 1,
            page: 1,
            num: 4,

            uid: app.globalData.userInfo.id
          },
          success(res) {
            if (!res.data.status) {
              that.setData({
                isNull: true
              });
              return
            }
            let obj = that.data.listData;
            obj[that.data.nowData.id] = { data: res.data.data, page: 1 };
            that.setData({
              listData: obj,
              contentData: res.data.data
            });
            console.log(res.data);
          },
          fail(res) {
            wx.showModal({
              title: '提示',
              content: "连接服务器出错，请稍后再试~",
              showCancel: false
            })
          }
        })
      }
    },500);
    
  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onReachBottom: function () {
    let that = this ;
    if (that.data.listData[that.data.nowData.id])
    {
    let $page = that.data.listData[that.data.nowData.id].page + 1 ;
    let status = that.data.listData[that.data.nowData.id].isBottom ;
    
    if(status){
      return 
    }
    that.setData({
      isDown:true
    });
    wx.request({
      url: app.globalData.baseServer +'/index.php/Api/Wechatprogram/userpost',
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        cate_id: parseInt(that.data.nowData.id) + 1,
        page: $page,
        num: 4,
        
      uid: app.globalData.userInfo.id
      },
      success(res) {
        let obj = that.data.listData;
        //obj[that.data.nowData.id] = { data: res.data.data, page: $page };
        if(!res.data.status){
          obj[that.data.nowData.id].isBottom = true;
          that.setData({
            listData: obj,
            isDown: false
          });
          return
        }
        obj[that.data.nowData.id].data = obj[that.data.nowData.id].data.concat(res.data.data);
        obj[that.data.nowData.id].page = $page;
        that.setData({
          listData: obj,
          contentData: obj[that.data.nowData.id].data,
          isDown:false
        });
      },
      fail(res) {
        console.log('读取列表数据出错');
      }
    })
    }
  },
  onShareAppMessage: function () {

  },
  contentDetail(e) {
    let url = e.currentTarget.dataset.url
    this.getDetailData(url)
  },
  getDetailData(url) {
    let that = this
    // wx.request({
    //   url: url,
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success(res) {
    //     console.log('数据liu', res.data, that)
    //     that.setData({
    //       contentData: res.data,
    //       url: url
    //     })
    //   }
    // });
  },
  toMain(e){
     var $path = '/pages/main/main?id=' + e.currentTarget.dataset.type + '&shareId=' + e.currentTarget.dataset.shareid + '&ename='+this.data.nowData.ename;
     wx.navigateTo({
       url: $path,
     })
  },
  togglePage(e){
    let that  = this ;
    // if (this.data.listData[e.currentTarget.dataset.id]){
    //   this.setData({
    //     contentData: that.data.listData[e.currentTarget.dataset.id].data,
    //     nowData: that.data.titleData[e.currentTarget.dataset.id],
    //     isNull: false
    //   });
    //   return
    // }
     this.setData({
       contentData:[],
       nowData:that.data.titleData[e.currentTarget.dataset.id],
       isNull:false
     });
     wx.request({
       url: app.globalData.baseServer +'/index.php/Api/Wechatprogram/userpost',
       method: 'POST',
       header: { 'content-type': 'application/x-www-form-urlencoded' },
       data: {
         cate_id: parseInt(that.data.nowData.id) + 1,
         page: 1,
         num: 4,
         uid: app.globalData.userInfo.id
       },
       success(res) {
         if (!res.data.status) {
           that.setData({
             isNull: true
           });
           return
         }
         let obj = that.data.listData;
         obj[that.data.nowData.id] = { data: res.data.data, page: 1 };
         that.setData({
           listData: obj,
           contentData: res.data.data
         });
       },
       fail(res) {
         wx.showModal({
           title: '提示',
           content: "连接服务器出错，请稍后再试~",
           showCancel: false
         })
       }
     })
  }
})