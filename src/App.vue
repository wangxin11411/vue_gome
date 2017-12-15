<template>
  <div id="app" style="height:100%">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
@charset "utf-8";

body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,code,form,fieldset,legend,input,textarea,p,blockquote,th,td{
    margin:0;
    padding:0;
}
html,body{
    height:100%;
    font-size:12px;
    font-family: "microsoft yahei";
    color: #666;
}
a {
  text-decoration: none;
}
ul,ol {
  margin: 0;
  padding: 0;
  list-style: none;
}
img {vert-align: top;}
input{
  outline: none;
  border: 0 none;
}
a,
input,
button {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
input，textarea{outline:none}  

-webkit-appearance: none;

-webkit-user-select: none;
input,
button {
  -webkit-appearance: none;
  border-radius: 0;
}

-webkit-touch-callout:none; 

body {
  margin: 0;
  -webkit-user-select: none;
}

body * {
  -webkit-user-select: none;
  font-family: Helvetica;
}

body {
  -webkit-text-size-adjust: 100%;
}

-webkit-text-size-adjust: none; 

</style>
