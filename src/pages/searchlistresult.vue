<template>
  <div class="gome-searchResult">
    
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
      <li>筛选</li>
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
    <b @click="back">111</b>
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

sp= qdzx,djh,qg,tg,zj,fq,zxtc,mptm,lq
 */
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
      s_rebate:false
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
    getItem(){
      var $that = this;
      $that.$jsonp('https://search.suning.com/emall/mobile/wap/clientSearch.jsonp', {
          cityId: '010',
          keyword: $that.keyWord,
          channel:"",
          cp:"0",
          ps:"10",
          st:$that.s_sort,
          set:5,
          cf:"",
          iv:"-1",
          ci:"",
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
          $that.getItemStaus(json.goods)
        })
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
          $that.search_items = _temp
        })
    },
    back(){
      this.$router.go(-2)
    }
  },
  beforeCreate: function () {
    //beforeCreate 创建前状态===============》
  },
  created: function () {
      //创建完毕状态===============》
      
      if(this.$route.query.keyword){
        this.setHistory(this.$route.query.keyword)
        this.keyWord = this.$route.query.keyword
      }
      this.getItem()
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
</style>
