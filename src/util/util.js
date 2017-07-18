export const fix = function (obj) {
    for (var key in obj) {
        if (obj[key] == -1 || obj[key] == null || obj[key] === "") {
            delete obj[key];
        } else {
            if (obj[key].constructor.name == "Date") {
                obj[key] = (obj[key]).valueOf();
            }
        }
    }
};
/*	<button v-clipboard="copyData">Copy</button>*/
export const deleteItem = function (arr, index) {
    arr.copyWithin(index, index + 1);
    arr.length = arr.length - 1;
};

export const storage = {
    get(key) {
        let temp = sessionStorage.getItem(key);
        if (!temp || temp == "") {
            return null;
        }
        return JSON.parse(temp);
    },
    set(key, obj) {
        sessionStorage.setItem(key, JSON.stringify(obj));
    }
};

export const formatDate = function (date) {
    if (date == null) {
        return ""
    }
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    if (m < 10) {
        m = "0" + m;
    }
    if (d < 10) {
        d = "0" + d;
    }
    return y + "-" + m + "-" + d;
}
/**
 * 根据某个值进行排序
 */
export const sortNum = function () {
    return function (a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
    }
}
/************************************************************************************************************/
/**
// var fullYear = formatDate((new Date()), "yyyy-MM-dd ").split("-")[0]
// this.showText = getNumberShuXiangByYear(fullYear, this.number)
 * 1.将日期转换为Unix时间戳 :  getUnix_setDateUnix("2017-06-04 12:12:12");
 * 2.获取当前时间的Unix时间戳（不传参代表获取当前时间的时间戳）：getUnix_setDateUnix();
 *  String strtime 要转换的日期时间格式 2016-07-26 10:55:38
 *  时间戳格式: 1469504554276
 */
export const getUnix_setDateUnix = function (strtime = false) {
    if (strtime) {
        var date = new Date(strtime);
    } else {
        var date = new Date();
    }
    var time1 = date.getTime() / 1000; //会精确到毫秒---长度为13位
    return time1;
}
export const getUnix_setDate = function (strtime = false) {
    if (strtime) {
        var date = new Date(strtime);
    } else {
        var date = new Date();
    }
    var time1 = date.getTime(); //会精确到毫秒---长度为13位
    return time1;
}

//1.将日期转换为Unix时间戳 :  getUnix_setDateUnix("2017-06-04 00:00:00");
export const getUnixShort = function () {
    var year = new Date().getFullYear()
    var month = new Date().getMonth() + 1; //当前月份
    var date = new Date().getDate();
    var myData = year + '/' + month + '/' + date + ' ' + '00' + ':' + '00' + ':' + '00';
    var myData2 = Date.parse(myData);
    return myData2
}
//结束时间
export const getUnixShortEnd = function () {
    var year = new Date().getFullYear()
    var month = new Date().getMonth() + 1; //当前月份
    var date = new Date().getDate();
    var myData = year + '/' + month + '/' + date + ' ' + '23' + ':' + '59' + ':' + '59';
    var myData2 = Date.parse(myData);
    return myData2
}
/**
 * 将时间戳转行为日期包含时分秒
 * 调用 getLocalTime(时间戳);
 */
export const getLocalTime = function (nS) {
    return new Date(parseInt(nS)).toJSON().replace(/年|月/g, "-").replace(/T/g, " ");
}
/**
 * 将时间转换为日期，不包含时分秒
 * 调用
 * var date=new Date(时间戳/1000);
 * getLocalTimeymd(date);
 */
export const getLocalTimeymd = function (now) {
    var fullYear = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour = now.getHours(); //小时
    var minute = now.getMinutes(); //分钟
    var second = now.getSeconds(); //秒数
    return fullYear + "-" + month + "-" + date;
}

/**
 * 将时间戳转化为倒计时;
 */
export const getCutTime = function (timestamp) {
	let h=Math.floor(timestamp/60/60);
	let m=Math.floor(timestamp/60%60);
	let s=Math.floor(timestamp%60);
	const padTime=(t)=>{
	    t=t.toString();
	    if(t<10){
	        t="0"+t;
        }
        if(t.length>2){
	        t=t.substring(0,2)
        }
        return t
    }
    return padTime(h)+":"+padTime(m)+":"+padTime(s);
}

/**
 * 将时间戳转化为倒计时包含天数;
 */

export const getCutTime2 = function (timestamp) {
    var d=Math.floor(timestamp/60/60/24);
    let h=Math.floor(timestamp/60/60);
    let m=Math.floor(timestamp/60%60);
    let s=Math.floor(timestamp%60);
    const padTime=(t)=>{
        t=t.toString();
        if(t<10){
            t="0"+t;
        }
        if(t.length>2){
            t=t.substring(0,2)
        }
        return t
    }
    return [padTime(d),padTime(h),padTime(m),padTime(s)];
}

/**
 * 例子：randLot(4) 生成4位数的随机号码
 * 生成指定位数的随机号码,正整数
 * 实用与重庆时时彩，福彩3D，排列3
 *
 */
export const randLot = function (n) {
    var tlot = '';
    for (var i = 0; i < n; i++) {
        tlot += Math.floor(Math.random() * 10);
    }
    return tlot;
}

/**
 * 生成一个指定范围内的随机数（其他有双号码的需要单独获取组装起来）
 * 例如生成 2 - 9之间的随机整数，则：randomNum(2,9)
 */
export const ran = function (n, m) {
    var c = m - n + 1;
    return Math.floor(Math.random() * c + n);
}


/************************************************************************************************/
/**
 * UUID生成
 */
export const uuidCode = function () {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}
/**
 * 截取字符串
 */
export const splitComma = function (comma) {
    comma.split(",")
    return comma;
}
export const splitLine = function (line) {
    line.split("|")
    return line;
}
//开奖公告
//根据年份得到生肖
export const getShuXiang = function (year) {
    var yearInt = parseInt(year);
    if (yearInt < 1900) {
        return null;
    }
    var start = 1900;
    var years = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"];
    return years[(yearInt - start) % years.length];
}
//根据属相返回六合彩的49个数的数组，顺序。
export const getShuXiangArray = function (shuXiang) {
    var shuXiangArray = new Array(49);
    var years = ["鼠", "猪", "狗", "鸡", "猴", "羊", "马", "蛇", "龙", "兔", "虎", "牛"];
    var yearIndex = -1;
    for (var i = 0; i < years.length; i++) {
        if (shuXiang == (years[i])) {
            yearIndex = i;
            break;
        }
    }
    if (yearIndex > -1) {
        for (var i = 0; i < shuXiangArray.length; i++) {
            shuXiangArray[i] = years[(yearIndex + i) % years.length];
        }
        return shuXiangArray;
    }
}
//根据年份和号码得到生肖
export const getNumberShuXiangByYear = function (year, ballNumber) {
    var ballInShuXiangArrayIndex = parseInt(ballNumber) - 1;
    var shuXiang = getShuXiang(year);
    var shuXiangArray = getShuXiangArray(shuXiang);
    return shuXiangArray[ballInShuXiangArrayIndex];
}
//获得最近一周，两周，一个月，三个月
export const getNewTime = function (value) {
    if (value == '今天') {
        var time2 = getUnixShort()
        var time1 = getUnixShortEnd()
    }
    if (value == '昨天') {
        var time1 = getUnixShort() - 86400000
        var time2 = getUnixShortEnd() - 86400000

    }
    if (value == '前天') {
        var time1 = getUnixShort() - 172800000
        var time2 = getUnixShortEnd() - 172800000

    }
    if (value == '一周') {
        var time1 = getUnixShort() - 604800000
        var time2 = getUnixShortEnd()
    }
    if (value == '两周') {
        var time1 = getUnixShort() - 1209600000
        var time2 = getUnixShortEnd()
    }
    if (value == '一个月') {
        var time1 = getUnixShort() - 2592000000
        var time2 = getUnixShortEnd()
    }
    if (value == '三个月') {
        var time1 = getUnixShort() - 7776000000
        var time2 = getUnixShortEnd()
    }
    var time = [time1, time2]
    return time
}
//URL参数解析
export class URL{
    constructor(url=window.location.href){
        this.url=url.substring(url.indexOf("?")+1);
        this.init();
    }
    init(){
	if(!this.url){
	    return null
	}
	let obj={}
	let _arr=this.url.split("&");
	for(const v of _arr.values()){
	    const item=v.split("=");
	    obj[item[0]]=item[1]
	}
	this.obj=obj;
    }
    get(key){
       return this.obj[key]
    }
}

/*删除数组中指定的值*/
export const removeByValue=function(arr,val){
    for(var i=0; i<arr.length; i++) {
        if(arr[i] == val) {
        arr.splice(i, 1);
          break;
        }
    }
}
