//获取cookie、
function getCookie(name) {
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)"); 
    return (arr=document.cookie.match(reg))?unescape(arr[2]):null;
}

//设置cookie,增加到vue实例方便全局调用
function setCookie (c_name, value) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + 7);
    document.cookie = c_name + "=" + escape(value) + ";expires=" + exdate.toGMTString();
};

//删除cookie
function delCookie (name) {
    var exp = new Date(); 
    exp.setTime(exp.getTime() - 1); 
    var cval=getCookie(name); 
    if(cval!=null) 
        document.cookie= name + "="+cval+";expires="+exp.toGMTString(); 
};

export default ({
    getCookie:getCookie,
    setCookie:setCookie,
    delCookie:delCookie
})