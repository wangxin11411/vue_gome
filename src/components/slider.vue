<template>
  <div class="sidebar">
    <transition name="fade" @touchmove.prevent>
      <div class="menu-mask" v-show="reallShow" @click="hideMenu"></div>
    </transition> 

    <transition name="side">
      <div class="menu-content" v-show="reallShow">
        <div class="menu-detail">
          111111111
        </div>
        <div class="content">
          22222222222222222
        </div>
        <div class="footer">
          <p class="border-1px"></p>
          <div class="nightmode">
            <i class="icon-night"></i>
            <span>夜间模式</span>
          </div>

          <div class="setting">
            <i class="icon-setting"></i>
            <span>设置</span>
          </div>

          <div class="exit">
            <i class="icon-exit"></i>
            <span>退出</span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    props: {
      reallShow: {
        type: Boolean
      }
    },
    data () {
      return {
        sign: '签到',
        showIcon: true,
        userInfo: ''
      }
    },
    methods: {
      // 显示菜单
      hideMenu () {
        this.$emit("closeFilter")
      },
      // 点击签到
      signClick () {
        this.sign = '已签到'
        this.showIcon = false
      }
    },
    computed: {
      // 显示
      /*isReallShow () {
        return !isShow
      }*/
    }
  }
</script>
<style>
.sidebar .menu-mask {
 position:fixed;
 top:0;
 left:0;
 bottom:0;
 right:0;
 opacity:1;
 z-index:10;
 background:rgba(0,0,0,.5);
 transfrom:translateZ(0)
}
.sidebar .menu-mask.fade-enter-to,.sidebar .menu-mask.fade-leave-to {
 transition:opacity .3s
}
.sidebar .menu-mask.fade-enter,.sidebar .menu-mask.fade-leave-to {
 opacity:0
}
.sidebar .menu-content {
 position:fixed;
 width:286px;
 height:100%;
 top:0;
 right:0;
 bottom:0;
 z-index:11;
 overflow-y:auto;
 background:#fff;
 -webkit-overflow-scrolling:touch
}
.sidebar .menu-content.side-enter-to,.sidebar .menu-content.side-leave-to {
 transition:-webkit-transform .3s;
 transition:transform .3s;
 transition:transform .3s,-webkit-transform .3s
}
.sidebar .menu-content.side-enter,.sidebar .menu-content.side-leave-to {
 -webkit-transform:translate3d(-286px,0,0);
 transform:translate3d(286px,0,0)
}
.sidebar .menu-content .menu-userInfo {
 box-sizing:border-box;
 width:100%;
 height:168px;
 position:relative;
 padding:50px 15px 15px
}
.sidebar .menu-content .menu-userInfo .avatar {
 position:absolute;
 bottom:50px;
 left:15px;
 border-radius:50%
}
.sidebar .menu-content .menu-userInfo .user-detail {
 position:absolute;
 bottom:20px;
 left:15px;
 font-size:0
}
.sidebar .menu-content .menu-userInfo .user-detail .name {
 display:inline-block;
 font-size:16px;
 font-weight:500;
 color:#fff;
 vertical-align:middle;
 max-width:130px;
 text-overflow:ellipsis;
 white-space:nowrap;
 overflow:hidden
}
.sidebar .menu-content .menu-userInfo .user-detail .isvip {
 width:14px;
 height:14px;
 vertical-align:middle;
 margin-left:6px
}
.sidebar .menu-content .menu-userInfo .user-detail .progress {
 font-size:8px;
 padding:1px 4px;
 border-radius:8px;
 color:#fff;
 font-weight:400;
 border:1px solid #fff;
 margin-left:6px;
 vertical-align:middle
}
.sidebar .menu-content .menu-userInfo .sign {
 display:inline-block;
 height:14px;
 line-height:14px;
 position:absolute;
 bottom:15px;
 font-size:12px;
 right:15px;
 padding:4px 8px;
 border:1px solid #e1e1e1;
 border-radius:12px;
 color:#fff
}
.sidebar .menu-content .menu-userInfo .sign:active {
 background:rgba(0,0,0,.1)
}
.sidebar .menu-content .menu-userInfo .sign i {
 height:14px;
 margin-right:5px;
 vertical-align:top
}
.sidebar .menu-content .content {
 background:#fff;
 display:block;
 padding-bottom:40px
}
.sidebar .menu-content .footer {
 background:red;
 position:fixed;
 transfrom:translateZ(0);
 bottom:0;
 height:40px;
 width:286px;
 font-size:0;
 background:#fff
}
.sidebar .menu-content .footer .border-1px {
 position:relative
}
.sidebar .menu-content .footer .border-1px:after {
 display:block;
 position:absolute;
 left:0;
 bottom:0;
 width:100%;
 border-top:1px solid rgba(7,17,27,.1);
 content:" "
}
.sidebar .menu-content .footer div {
 display:inline-block;
 font-size:16px;
 height:100%;
 text-align:center
}
.sidebar .menu-content .footer div i {
 color:#999;
 font-size:18px;
 vertical-align:middle
}
.sidebar .menu-content .footer div span {
 font-size:16px;
 vertical-align:middle
}
.sidebar .menu-content .footer div:active {
 background:#d5d5d5
}
.sidebar .menu-content .footer div.nightmode {
 width:40%;
 line-height:40px
}
.sidebar .menu-content .footer div.exit,.sidebar .menu-content .footer div.setting {
 width:30%;
 line-height:40px
}
.split {
 display:block;
 border-width:1px;
 border:none;
 border-top-width:1px;
 border-top-style:solid;
 border-bottom-width:1px;
 border-bottom-style:solid
}
.sidelist,.split {
 width:100%;
 box-sizing:border-box
}
.sidelist {
 position:relative;
 height:40px;
 line-height:40px;
 font-size:0;
 padding:0 15px
}
.sidelist:active {
 background:#d5d5d5
}
.sidelist .icon,.sidelist .title {
 display:inline-block;
 vertical-align:middle
}
.sidelist .icon {
 font-size:16px;
 margin-right:6px;
 color:#9a9a9a
}
.sidelist .title {
 font-size:14px;
 color:#333
}
.sidelist .disc {
 position:absolute;
 right:15px;
 font-weight:400;
 top:50%;
 -webkit-transform:translate3d(0,-50%,0);
 transform:translate3d(0,-50%,0);
 color:#9c9c9c;
 font-size:10px
}         
</style>