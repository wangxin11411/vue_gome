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
.gome-icon-self{
  display: inline-block;
  vertical-align: middle;
  height: 15px;
  width: 30px;
  margin-right: 2px;
  margin-top: -2px;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAAAkCAMAAAAKJxydAAAAdVBMVEUAAAD/Xl7/Zmb/aWn/XV3/Y2P/XFz/XV3/XV3/XFz/Xl7/XFz/XFz/XV3/XFz/XV3/XFz/ZWX/XV3/Xl7/kpL/XV3/XV3/XV3/bm7/XFz/XFz/XV3/Xl7/XFz/XV3/YGD/XV3/XV3/X1//Xl7/Xl7/Xl7/XFwi4JyEAAAAJnRSTlMAgBQFnRz0h3bnTfHQoe5wpg7eVAO6+80K+cFeerewKJfiQC5nPOUN6+4AAAFHSURBVEjHvdbtbsIgGIbh12qBVp2tg9KP1e+953+Ic1UxT4vJsM7rF23InUBCgEgrW/GTKqv0uVCzkZMnScO1JsUNjdCwImvgl55SGGOpklgtDHmVQsR0sRbf5MiKeAIzW1YPEsy3RMIHcibcS2wLEVFPPe8wz6+YxWWAiXLVMbxY3ZWXhOgwC9EbYSJijyhgIV1iswSbXqJtb59Ze3yQiAnELqGnfgEJwX7bkMTCowhLxDSUeBJJDyR0DkpvYgASKYOlP3GMwNElWhOdE/uZU/8m5C7+0144KW/Iac6JzvsTuBB/4vQJTr0EcImAY6anQD84ZhmAYzYQvBfJx9AqLFHwfo3m/BWaiAnt/ishFZDhiQFI7CSy3kQ2AxkkBsL3oklRe0/cLsRSqZxArlRJV1LmhFJ5cBeiNTSKsa94HIx/orzgofQDVydducEeo6AAAAAASUVORK5CYII=);
  background-size:contain;
  background-repeat: no-repeat;
}

</style>
