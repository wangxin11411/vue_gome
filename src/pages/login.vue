<template>
  <div class="gome-rec">
    登录页面
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.gome-index{
  display:flex;
  height:100%;
  flex-direction: column;
}
.main{
  width:100%;
  background:#ea5504;
  flex: 1;
  overflow-y:scroll
}
header{
  width:100%;
  height:50px;
  background:#c00;
}
footer{
  width:100%;
  height:50px;
  background-color: #f6f6f6;
  border-top: 1px solid #e4e4e4;
}
.footer{
  display:flex;
  flex-direction: row
}
.footer li{
  width:20%;
  height:50px;
  background-size: contain;
  background-position: 50% 50%;
  background-repeat: no-repeat;
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
