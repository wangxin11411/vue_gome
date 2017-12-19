<template>
  <div class="gome-searchlist">
    <header>
      <span class="cancle" @click="goback()">取消</span>
      <input type="text" :placeholder="$route.query.key" v-model="searchKeyWords">
      <b v-on:click="goSearchBtn()"></b>
    </header>
    <dl class="reclist">
      <dt>热词推荐</dt>
      <dd v-for="item in hotKeyWords" v-on:click='goSearch(item.hotWord)'>{{item.hotWord}}</dd>
    </dl>

    <dl class="historyList">
      <dt><span class="historyClear" v-on:click="historyClear">清空</span>搜索历史</dt>
      <dd v-for="item in historyKeyWords" v-on:click='goSearch(item)' :data-keyword="item">{{item}}</dd>
    </dl>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      defaultKeyWords:"",
      searchKeyWords:"",
      hotKeyWords:[],
      historyKeyWords:[]
    }
  },
  methods: {
    goSearch (searchword) {
      this.$router.push({name:"SearchListResult",query:{keyword:searchword}})
    },
    goSearchBtn(){
      if(this.searchKeyWords == ""){
        this.$router.push({name:"SearchListResult",query:{hdword:this.defaultKeyWords}})
      }else{
        this.$router.push({name:"SearchListResult",query:{keyword:this.searchKeyWords}})
      }
    },
    historyClear(){
      this.historyKeyWords = [];
      this.$tools.delCookie("searchval")
    },
    goback(){
      this.$router.go(-1)
    }
  },
  beforeCreate: function () {
    //beforeCreate 创建前状态===============》
  },
  created: function () {
      //创建完毕状态===============》
      let _this = this;
      this.defaultKeyWords = this.$route.query.key;

      this.$http({
        method: 'post',
        url: 'https://so.m.jd.com/ware/hotKeyWord.action?_format_=json'
      }).then(function(response) {
        _this.hotKeyWords = JSON.parse(response.data.hotKeyWord).owner
      })

      this.historyKeyWords = this.$tools.getCookie("searchval")?this.$tools.getCookie("searchval").split(","):[];
  },
  beforeMount: function () {
      //beforeMount 挂载前状态===============》
  },
  mounted: function () {
      //mounted 挂载结束状态===============》
  },
  beforeUpdate: function () {
      //beforeUpdate 更新前状态===============》
  },
  updated: function () {
      //updated 更新完成状态===============》
  },
  beforeDestroy: function () {
      //beforeDestroy 销毁前状态===============》
  },
  destroyed: function () {
      //destroyed 销毁完成状态===============》 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
header{
  width:100%;
  height:50px;
  background:#c00;
  display: flex;
  flex-direction: row;
  align-items:center;
  background-color: #f6f6f6;
}
header .cancle{
  display: block;
  width: 30px;
  height: 30px;
  margin-left: 15px;
  font-size: 14px;
  line-height: 30px;
  white-space: nowrap;
}
header input{
  display: block;
  background-color: #e6e6e6;
  height: 30px;
  flex:1;
  margin: 0 15px;
  border-radius: 15px;
  text-indent: 10px;
  line-height: 30px;
  font-size: 12px;
  color: #999;
}
header b{
  float: right;
  margin-left: -50px;
  margin-right:20px;
  width: 30px;
  height: 30px;
  background-image:url(../assets/search.png);
  background-size:15px;
  background-position: 10px 7px;
  background-repeat: no-repeat;
  white-space: nowrap;
}
/***/
.reclist{
  padding-left: 15px;
  border-bottom: 1px solid #e0e0e0;
}
.reclist dt{
  height: 50px;
  line-height: 50px;
  overflow: hidden;
  color: #5e5e5e;
  font-weight: 700;
}
.reclist dd{
  display:inline-block;
  height: 30px;
  margin: 0 5px 10px 0;
  min-width: 50px;
  line-height: 30px;
  border: 1px solid #e0e0e0;
  border-radius: 15px;
  text-align: center;
  padding: 0 5px;
}
.historyList{

}
.historyList dt{
  height: 50px;
  padding-left: 15px;
  line-height: 50px;
  overflow: hidden;
  color: #5e5e5e;
  font-weight: 700;
  border-bottom: 1px solid #e0e0e0;
}
.historyList dd{
  height: 50px;
  padding-left: 15px;
  line-height: 50px;
  border-bottom: 1px solid #e0e0e0;
}
.historyList dt .historyClear{
  float: right;
  font-weight: 400;
  padding-right: 15px;
  color: #06c;
}
</style>
