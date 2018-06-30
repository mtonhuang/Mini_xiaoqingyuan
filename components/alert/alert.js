// components/alert/alert.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
     btn:{
       type:Boolean,
       value:false
     },
     btnText:{
       type:String,
       value:"确定"
     }
  },

  /**
   * 组件的初始数据
   */
  data: {
     message:"",
     isShow:false,
     isAnim:false,
     loginbtn:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeMeg(a){
      var that =  this;
      this.setData({
        message:a,
        isShow:true
      });
      setTimeout(function(){
        that.setData({
          isAnim: true
        });
      },100);
    },
    hideIt(){
      this.setData({
        message: "",
        isShow: false,
        isAnim: false
      });
    },
    action(){
      this.hideIt();
      this.triggerEvent("action");
    },
    changeLoginIn(){
      let that = this ;
      this.setData({
        loginbtn:!this.data.liginbtn
      })
    }
    
  }
})
