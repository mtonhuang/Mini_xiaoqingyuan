// components/loadImage/loadImage.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
       src:{
         type:String
       },
       bgcolor:{
         type:String,
         value:'rgb(211,211,211)'
       },
       height:{
         type:String
       }
  },

  /**
   * 组件的初始数据
   */
  data: {
     isLoad:false
  },
  ready(){

  },

  /**
   * 组件的方法列表
   */
  methods: {
      load(){
        this.setData({
          isLoad:true
        })
      }
  }
})
