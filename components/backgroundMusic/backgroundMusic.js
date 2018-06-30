const app = getApp()
Component({
  properties: {
    isPlay: {            // 属性名
      type: Boolean
    },
    isShare: {
      type: Boolean,
      value: false
    }
  },
  data: {
     
  },
  methods: {
     btn(){
       if(this.data.isPlay){
          app.onPause();
          app.globalData.isPlay = false;
          this.setData({
            isPlay:false
          });
       }
       else {
         app.onContinue();
         app.globalData.isPlay = true;
         this.setData({
           isPlay: true
         });
       }
     },
     toggleSong(){
       app.onPlay();
       this.setData({
         isPlay: true
       });
     }
  }
})
