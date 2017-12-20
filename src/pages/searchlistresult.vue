<template>
  <div class="gome-searchResult">
    <header>
      <router-link class="home" :to="{name:'Index'}">首页</router-link>
      <router-link class="label" :to="{name:'SearchList'}">{{$route.query.keyword}}</router-link>
    </header>
    <scroller :on-infinite="infinite" ref="myscroller">
      <ul class="item-facet-box">
        <li>
          <dl class="facet-sort">
            <dt @click="s_sort_hide = false">{{s_sort_val}}</dt>
            <dd v-if="!s_sort_hide">
              <div v-if="s_sort != '0'" @click="changeSort('0','综合排序')">综合排序</div>
              <div v-if="s_sort != '9'" @click="changeSort('9','价格从低到高')">价格从低到高</div>
              <div v-if="s_sort != '10'" @click="changeSort('10','价格从高到低')">价格从高到低</div>
              <div v-if="s_sort != '8'" @click="changeSort('8','销量排序')">销量排序</div>
            </dd>
          </dl>
        </li>
        <li :class="s_self?'check':''" @click="changeSelf">自营</li><!--苏宁自营服务-->
        <li :class="s_rebate?'check':''" @click="changeRebate">返利</li><!--苏宁促销-->
        <li @click="changeFilter">筛选</li>
      </ul>
      <ul class="item-lists-box">
        <li class="list" v-for="item in search_items">
          <img :src="item.pic">
          <p class="name"><i v-if="item.suningSale" class="gome-icon-self"></i>{{item.catentdesc}}</p>
          <p class="salepoint"><span v-for="point in item.extenalFileds.appAttrTitle">{{point}}</span></p>
          <p class="price">¥{{item.price}}</p>
          <p class="propm"><span v-for="prom in item.promotionList">{{prom.simple}}</span><span>{{item.promotionLable}}</span></p>
          <p class="pinglun">{{item.extenalFileds.commentShow}}人评论</p>
        </li>
      </ul>
    </scroller>
    <div class="sidebar">
      <transition name="fade" @touchmove.prevent>
        <div class="menu-mask" v-show="isFilterShow" @click="closeFilter"></div>
      </transition> 

      <transition name="side">
        <div class="menu-content" v-show="isFilterShow">
          <div class="content" v-if="filterData">

            <!-- <dl class="filter-price">
              <dt><span class="check">{{checkValues.prices}}</span>价格区间</dt>
              <dd><div v-for="item in filterData.hotPrices" :class="item.checked?'on':''" @click="checkFilters(item,'prices')">{{item.start}}-{{item.end}}<br />{{item.percent}}</div></dd>
            </dl> -->

            <dl class="filter-normal">
              <dt>全部分类</dt>
              <dd><div v-for="item in filterData.allCategories" :class="item.checked?'on':''" @click="checkFilterCat(item)">{{item.name}}</div></dd>
            </dl>
            
            <dl class="filter-normal" v-for="filters in filterData.filters" v-if="filters.fieldName != 'price'">
              <dt @click="toggleFilter(filters)"><span class="check">{{checkValues[filters.fieldName]}}</span>{{filters.fieldNameDesc}}</dt>
              <dd v-if="filters.fieldName == 'bnf'" class="filter-brand">
                <span v-for="item in filters.values" :class="item.checked?'on':''" @click="checkFilter(item,filters.fieldName)"><img :src="'https://image.suning.cn/uimg/pcms/brandLogo/'+item.valueCode+'_150x60.jpg'"></span>
              </dd>
              <dd v-else v-show="!filters.isMultiSel"><div v-for="item in filters.values" :class="item.checked?'on':''" @click="checkFilter(item,filters.fieldName)">{{item.valueDesc}}</div></dd>
            </dl>

          </div>
          <div class="footer">
            <p class="border-1px"></p>

            <div class="filter-exit">
              <span class="filter-ok" @click="getItemByFilter">确定</span>
              <span class="filter-reset">全部重选</span>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
/*

st=0 综合

st=10 高到低

st=9 低到高

st=8 销量

ct=2 自营服务

ct=-1 全部

cf 品牌 分类 价格（1565_5198）

ci 分类

sp= qdzx,djh,qg,tg,zj,fq,zxtc,mptm,lq
 */

import Vue from 'vue'
import VueScroller from 'vue-scroller'
Vue.use(VueScroller)

export default {
  name: 'Index',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      search_items:[],
      keyWord:"",
      s_sort:'0',
      s_sort_val:"综合排序",
      s_sort_hide : true,
      s_self:false,
      s_rebate:false,
      s_pagenumber:-1,
      s_filter:[],
      s_filter_c:"",
      isFilterShow:false,
      filterData:null,
      checkValues:{},
      noData:""
    }
  },
  methods: {
    setHistory (searchword) {
      let searchval = this.$tools.getCookie("searchval")?this.$tools.getCookie("searchval").split(","):[]
      searchval.splice(0, 0, searchword);
      searchval = new Set(searchval)
      this.$tools.setCookie("searchval",[...searchval].slice(0,9).join(","))
    },
    changeSort(sortId,sortValue){
      this.s_sort = sortId;
      this.s_sort_val = sortValue;
      this.s_sort_hide = true;
      this.getItem();
    },
    changeSelf(){
      this.s_self = !this.s_self;
      this.getItem()
    },
    changeRebate(){
      this.s_rebate = !this.s_rebate;
      this.getItem()
    },
    changeFilter(){
      this.isFilterShow = true;
      this.getFilterInfo()
    },
    checkFilter(o,key){
      o.checked = !o.checked;
      var _val = o.valueDesc+",";
      if(o.checked){
        if(!this.checkValues[key]) this.checkValues[key]= "";
        this.checkValues[key] = this.checkValues[key]+_val;
        this.s_filter.push(o.value)
      }else{
        this.checkValues[key] = this.checkValues[key].replace(_val,"")
        this.s_filter.remove(o.value)
      }
    },
    checkFilterCat(o){
      o.checked = !o.checked;
      this.s_filter_c = o.id;
      this.filterData= null;
      this.getFilterInfo()
    },
    closeFilter(){
      this.isFilterShow = false;
    },
    toggleFilter(o){
      o.isMultiSel = !o.isMultiSel
    },
    getItem(){
      console.log("获取商品")
      var $that = this;
      $that.$jsonp('https://search.suning.com/emall/mobile/wap/clientSearch.jsonp', {
          cityId: '010',
          keyword: $that.keyWord,
          channel:"",
          cp:$that.s_pagenumber,
          ps:"10",
          st:$that.s_sort,
          set:5,
          cf:$that.s_filter.join(","),
          iv:"-1",
          ci:$that.s_filter_c,
          ct:$that.s_self?"2":"-1",
          channelId:"WAP",
          sp:$that.s_rebate?"qdzx,djh,qg,tg,zj,fq,zxtc,mptm,lq":"",
          sg:"",
          sc:0,
          prune:"",
          operate:0,
          isAnalysised:0,
          istongma:1,
          v:99999999
        }).then(json => {
          if(json.goods.length == 0) return;
          $that.getItemStaus(json.goods)
        })
    },
    getItemByFilter(){
      this.search_items = [];
      this.s_pagenumber = -1;
      //this.getItem()
      this.closeFilter()
    },
    getItemStaus(data){
      var itemId = []
      var _temp = data
      var $that = this;
      _temp = data.filter(function(o){
        if(o.goodsType == "1"){
          return true;
        }
      })

      for(var i = 0,j = _temp.length;i<j;i++){
        if(_temp[i].goodsType == "1"){
          if(!_temp[i].suningSale){
            itemId.push("000000000"+_temp[i].catentryId+"__2_"+_temp[i].salesCode)
          }else{
            itemId.push("000000000"+_temp[i].catentryId+"_")
          }
        } 
      }
      $that.$jsonp('https://ds.suning.cn/ds/generalForTile/'+itemId.join(",")+'-010_010-2-0000000000-2--callDsServiceDate.jsonp',{callbackName:"callDsServiceDate"}).then(json => {
          for(var i = 0,j = _temp.length;i<j;i++){
            _temp[i].pic = "//image2.suning.cn/uimg/b2c/newcatentries/"+json.rs[i].bizCode+"-"+json.rs[i].cmmdtyCode+"_1_400x400.jpg"
            _temp[i].price = json.rs[i].price
            _temp[i].promotionList = json.rs[i].promotionList
            _temp[i].promotionLable = json.rs[i].promotionLable
            itemId.push("000000000"+_temp[i].catentryId+"_")
          }
          $that.search_items = $that.search_items.concat(_temp)
          
        })
    },
    getFilterInfo(){
      var $that = this;
      if(this.filterData) return;
      $that.$jsonp('https://search.suning.com/emall/mobile/getSelector.jsonp', {
          cityId: '010',
          keyword: $that.keyWord,
          channel:"",
          cp:"0",
          ps:"10",
          st:$that.s_sort,
          set:5,
          cf:$that.s_filter.join(","),
          iv:"-1",
          ci:$that.s_filter_c,
          ct:$that.s_self?"2":"-1",
          channelId:"WAP",
          sp:$that.s_rebate?"qdzx,djh,qg,tg,zj,fq,zxtc,mptm,lq":"",
          sg:"",
          sc:0,
          prune:"",
          operate:0,
          isAnalysised:1,
          istongma:1,
          v:99999999
        }).then(json => {
          $that.filterData = json
        })
    },
    back(){
      this.$router.go(-2)
    },
    infinite() {
      if(this.noData==""){
         setTimeout(() => {
          this.s_pagenumber+=1;
          this.getItem();
          this.$refs.myscroller.finishInfinite(2);
         })
         return;
      }
      var self = this;
      setTimeout(() => {
        self.noData = "没有更多数据"
        self.$refs.myscroller.resize();
      }, 1500)

    },
    refresh() {
      console.log('refresh')
       
    }
  },
  components:{},
  beforeCreate: function () {
    //beforeCreate 创建前状态===============》
    Array.prototype.remove = function(val) {
      var index = this.indexOf(val);
      if (index > -1) {
        this.splice(index, 1);
      }
    };
  },
  created: function () {
      //创建完毕状态===============》
      
      if(this.$route.query.keyword){
        this.setHistory(this.$route.query.keyword)
        this.keyWord = this.$route.query.keyword
      }
      
  },
  beforeMount: function () {
      //beforeMount 挂载前状态===============》
  },
  mounted: function () {
      //mounted 挂载结束状态===============》
      //this.getItem()
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
header .label{
  display: block;
  background-color: #e6e6e6;
  height: 30px;
  flex:1;
  width: 100%;
  margin: 0 15px 0 0;
  border-radius: 15px;
  text-indent: 10px;
  line-height: 30px;
  font-size: 12px;
  color: #999;
}
header .home{
  display: block;
  width: 40px;
  height: 30px;
  font-style: normal;
  line-height: 30px;
  text-align: center;
  font-size: 14px;
  color: #999;
}
/**/
.item-facet-box {
  height: 40px;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #e0e0e0;
}
.item-facet-box li{
  height: 40px;
  display: block;
  line-height: 40px;
  width: 100%;
  text-align: center;
  font-size: 14px;
}
.item-facet-box li:before{
  content: "|";
  float: right;
  color: #e0e0e0;
}
.item-facet-box li:last-child:before{
  display: none;
}
.item-facet-box .check{
  color: #ea5504;
}
/**/
.facet-sort{
  position: relative;
}
.facet-sort dt{
  color:#ea5504;
}
.facet-sort dd{
  position: absolute;
  width: 100%;
  background-color: #fff;
}
.facet-sort dd div{
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #e0e0e0;
}
/**/
.item-lists-box .list{
  height: 130px;
  padding: 10px 0 0 150px;
  overflow: hidden;
}
.item-lists-box .list img{
  float: left;
  margin-left: -140px;
  width: 130px;
  height: 130px;
}
.item-lists-box .list .name{
  line-height: 20px;
  height: 40px;
  padding-right: 10px;
  overflow: hidden;
  font-size: 14px;
}
.item-lists-box .list .salepoint{
  height: 20px;
  line-height: 20px;
  color: #999;
  overflow: hidden;
}
.item-lists-box .list .salepoint span:after{
  content: "|";
  display: inline-block;
  margin: -3px 5px 0;
}
.item-lists-box .list .price{
  height: 25px;
  line-height: 25px;
  color: #ea5504;
  font-size: 18px;
}
.item-lists-box .list .pinglun{
  font-size: 14px;
  color: #999;
  height: 24px;
  line-height: 24px;
  border-bottom: 1px solid #d1d1d1;
}
.item-lists-box .list .propm{
  height: 20px;
  line-height: 20px;
}
.item-lists-box .list .propm span{
  display: inline-block;
  color: #fff;
  background-color: #f60;
  padding: 0 5px;
  line-height: 16px;
  margin-right: 5px;
}
/*filter*/
.filter-price{
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
}
.filter-price dt{
  font-size: 14px;
  margin-bottom: 10px;
}
.filter-price dd{
  display: flex;
  flex-direction: row;
  justify-content:space-between;
}
.filter-price dd div{
  width: 30%;
  height: 40px;
  padding: 5px 0;
  line-height: 20px;
  text-align: center;
  background: #f1f1f1;
  border-radius: 5px;
}
.filter-price dd p{
  color: #999;
}
.filter-normal{
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
}
.filter-normal dt{
  font-size: 14px;
  margin-bottom: 10px;
}
.filter-normal dt .check{
  float: right;
  width: 60%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: #ea5504;
  text-align: right;
}
.filter-normal dd{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content:space-between;
}
.filter-normal dd div{
  width: 30%;
  text-align: center;
  height: 30px;
  line-height: 30px;
  background: #f1f1f1;
  margin-bottom: 10px;
}
.filter-normal div.on,.filter-price .on,.filter-price .on p{
  background-color: #ea5504;
  color: #fff;
}
.filter-brand span{
  display: block;
  width: 32%;
  margin-bottom: 5px;
}
.filter-brand span img{
  width: 100%;
  border: 1px solid #e0e0e0;
}
.filter-brand .on img{
  border: 1px solid #ea5504;
}
.filter-exit{
  width: 100%;
  line-height: 40px;
}
.filter-ok{
  float: right;
  height: 40px;
  width: 120px;
  background: #ea5504;
  color: #fff;
}
.filter-reset{
  float: right;
  height: 40px;
  width: 120px;
  background: #f1f1f1;
  border-left: 1px solid #e0e0e0;
}
/***/
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

.sidebar .menu-content .footer div.nightmode {
 width:40%;
 line-height:40px
}
.sidebar .menu-content .footer div.setting {
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
._v-container{
  top: 50px;
}
</style>
