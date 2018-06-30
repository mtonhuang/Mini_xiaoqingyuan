String.prototype.StrCut2Arr = function (n) {
  var str = this;
  var arr = [];
  var len = Math.ceil(str.length / n);
  for (var i = 0; i < len; i++) {
    if (str.length >= n) {
      var strCut = str.substring(0, n);
      arr.push(strCut);
      str = str.substring(n);
    } else {
      str = str;
      arr.push(str);
    }
  }
  return arr;
};
String.prototype.gblen = function () {
  var len = 0;
  for (var i = 0; i < this.length; i++) {
    if (this.charCodeAt(i) > 127 || this.charCodeAt(i) == 94) {
      len += 2;
    } else {
      len++;
    }
  }
  return len;
} ;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    groupId:{
      type:Number,
      value:""
    },
    index: {
      type: Number,
      value: ""
    },
    mainData:{
      type:null
    },
    isShare:{
      type:Boolean,
      value:false
    }
  },
  data: {
     userEditor:"",
     lineCount:0,
     isEditor:false,
     isFirst:true
  },
ready(){
   this.setData({
     nowIndex:0
   })
   
}
  ,
  methods: {
     toggleText(e){
       var index =++this.data.nowIndex;
       if(this.data.isFirst){
         this.setData({
           isFirst:false
         })
       }
       if (this.data.mainData){
       index >= this.data.mainData.length ? index = 0 :'';
       }
       this.setData({
         nowIndex:index
       })
     },
     bindLineCount(e){
          this.setData({
            lineCount:e.detail.lineCount
          })

     },
     editorSubmit(e){
       this.setData({
         userData: e.detail.value.editor
       });
       if(e.detail.value.editor == ''){
         this.setData({
           isEditor: false
         })
         return
       }
       console.log('lineacoutn', this.data.lineCount);
       var count = Math.ceil(((this.data.lineCount) / 2));
       count <= 0 ? count = 1 :"";
       console.log(this.data.userData.length,count);
       var length = Math.ceil(this.data.userData.length /count );
     
       var datas = this.data.userData.StrCut2Arr(length);
       console.log("datas",datas);
       this.setData({
           mainData:datas,
           nowIndex:0,
           isEditor:false
       });
       this.triggerEvent("datachange",{data:datas,groupId:this.data.groupId,index:this.data.index});
     },
     toggleEditor(){
       this.setData({
        isEditor :!this.data.isEditor
       })
     }

  }
})


// editorSubmit(e){
//   this.setData({
//     userData: e.detail.value.editor
//   });
//   if (e.detail.value.editor == '') {
//     this.setData({
//       isEditor: false
//     })
//     return
//   }
//   console.log('lineacoutn', this.data.lineCount);
//   var count = Math.ceil(((this.data.lineCount) / 2));
//   count <= 0 ? count = 1 : "";
//   console.log(this.data.userData.length, count);
//   var length = Math.ceil(this.data.userData.length / count);

//   var datas = this.data.userData.StrCut2Arr(length);
//   console.log("datas", datas);
//   this.setData({
//     mainData: datas,
//     nowIndex: 0,
//     isEditor: false
//   });
//   this.triggerEvent("datachange", { data: datas, groupId: this.data.groupId, index: this.data.index });
// },
