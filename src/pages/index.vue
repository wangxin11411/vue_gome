<template>
  <div class="gome-index">
    <header>
      <img src="//css.gomein.net.cn/plus/style/index/images/grass_logo.png" alt="">
      <label v-on:click="gotosearch">{{defaultSearch}}</label>
      <div class="login-box"><router-link v-bind:to="{name:'Login'}">登录</router-link></div> 
    </header>
    <div class="main">
      <div style="width:50%;background:#06c">1<br/>1<br/>21<br/>1<br/>13<br/>1<br/>14<br/>1<br/>1<br/>21<br/>1<br/>13<br/>1<br/>14<br/>1<br/>1<br/>21<br/>1<br/>13<br/>1<br/>14<br/>1<br/>1<br/>21<br/>1<br/>13<br/>1<br/>14<br/>1<br/>1<br/>21<br/>1<br/>13<br/>1<br/>14<br/>1<br/>1<br/>21<br/>1<br/>13<br/>1<br/>14<br/>1<br/>1<br/>21<br/>1<br/>13<br/>1<br/>14<br/>1<br/>1<br/>21<br/>1<br/>13<br/>1<br/>14<br/>1<br/>1<br/>21<br/>1<br/>13<br/>1<br/>14<br/>1<br/>1<br/>21<br/>1<br/>13<br/>1<br/>14<br/>1<br/>1<br/>21<br/>1<br/>13<br/>1<br/>14<br/>1<br/>1<br/>21<br/>1<br/>13<br/>1<br/>14<br/></div> 
    </div>
    <footer>
      <ul class="footer">
        <li class="home"></li>
        <li class="category"><router-link v-bind:to="{name:'Category'}"></router-link></li>
        <li class="bestchange"><router-link v-bind:to="{name:'Rec'}"></router-link></li>
        <li class="shopcart"><router-link v-bind:to="{name:'Shopcart'}"></router-link></li>
        <li class="mycenter"><router-link v-bind:to="{name:'Mycenter'}"></router-link></li>
      </ul>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      defaultSearch:"12.12百货狂想盛典"
    }
  },
  methods:{
    gotosearch(){
      this.$router.push({path:"SearchList",query:{"key":this.defaultSearch}})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a{color: #333}
.gome-index{
  display:flex;
  height:100%;
  flex-direction: column;
  color: #fff;
}
.main{
  width:100%;
  background:#ea5504;
  flex: 1;
  overflow-y:scroll;
}
::-webkit-scrollbar{
  width:0px;
}
header{
  width:100%;
  height:50px;
  background:#c00;
  display: flex;
  flex-direction: row;
  align-items:center;
  background-color: #f6f6f6;
}
footer{
  width:100%;
  height:50px;
  background-color: #fff;
  border-top: 1px solid #e4e4e4;
}
/**/
header img{
  width: 30px;
  height: 30px;
  margin-left: 15px;
}
header label{
  display: block;
  background-image:url(../assets/search.png);
  background-size:15px;
  background-position: 10px 7px;
  background-repeat: no-repeat;
  background-color: #e6e6e6;
  height: 30px;
  flex:1;
  margin: 0 15px;
  border-radius: 15px;
  text-indent: 30px;
  line-height: 30px;
  font-size: 12px;
  color: #999;
}
header .login-box{
  margin-right: 15px;
  white-space: nowrap;
  font-size: 14px;
}
/**/
.footer{
  display:flex;
  flex-direction: row;
  flex-wrap: nowrap
}
.footer li{
  width:20%;
  height:50px;
  background-size: contain;
  background-position: 50% 50%;
  background-repeat: no-repeat;
}
.footer a{
  display:block;
  width:100%;
  height:100%;
}
.footer .home{
  background-image:url(../assets/n-home.png)
}
.footer .category{
  background-image:url(../assets/n-catergry.png)
}
.footer .bestchange{
  background-image:url(../assets/n-find.png)
}
.footer .shopcart{
  background-image:url(../assets/n-cart.png)
}
.footer .mycenter{
  background-image:url(../assets/n-me.png)
}
</style>
