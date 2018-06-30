const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
     item:{
       type:Object
     },
     index:{
       type:Number
     },
     page:{
       type:Object
     }
  },

  /**
   * 组件的初始数据
   */
  data: {
     
  },
  ready(){
     
    let data =JSON.parse(this.data.item.datas.content.replace(/&quot;/g,'"')) ;
    this.setData({
      contentData:data
    });
  }
  ,
  methods: {
    
  praiseIt(e) {
    let that = this;
    console.log(this.data.item.datas.id, app.globalData.userInfo.id);
    let $data = {
      sid: this.data.item.datas.id,
      uid: app.globalData.userInfo.id
    }
    wx.request({
      url: app.globalData.baseServer + '/index.php/Api/Wechatprogram/priase',
      data: $data,
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success(res) {
        console.log(that.data.item);
        if(that.data.item.ifpriase == 0 ){
          let json=that.data.item;
          json.datas.priase = parseInt(json.datas.priase) + 1;
          json.ifpriase = 1 ;
          that.setData({
              item : json 
          });
         
        }else{
          let json = that.data.item;
          json.datas.priase = parseInt(json.datas.priase) - 1;
          json.ifpriase = 0;
          that.setData({
            item: json
          });
         
        }
         
      },
      fail(res) { console.log(res) }
    })
  }
  ,
  toMain() {
  let $path = '/pages/main/main?id=' + (parseInt(this.data.page.id)) + '&shareId=' + this.data.item.datas.id + '&ename=' + this.data.page.ename;
    wx.navigateTo({
      url: $path,
    })
  }
  }
})
