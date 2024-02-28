import '../components/pipe.js';
import { DataFetcher } from './request.js';
const time = document.querySelector(".time");//主管道
const zhuguandao = document.querySelector(".zhuguandao");//主管道
/* 上太阳能管路 */
const shangbu = document.querySelectorAll('.shangbu');//上部所有管道
const t1 = document.querySelector('.t1');//上部温度
const t2 = document.querySelector('.t2');//下部温度
const shangbubeng = document.querySelector(".shangbubeng");//上部泵
/* 下太阳能管路 */
const xiabu = document.querySelectorAll('.xiabu');//下部所有管道
const t3 = document.querySelector('.t3');//上部温度
const t4 = document.querySelector('.t4');//下部温度
const xiabubeng = document.querySelector(".xiabubeng");//下部泵
/* 水箱 */
const shuixiangDetail = document.querySelector('.shuixiang>.detail');//水箱外部
const shuiwei = document.querySelector('.shuixiang>.shuiweiWrap>.shuiwei');//水位
/* 热泵管路 */
const t7 = document.querySelector('.t7');//热泵回水温度
const rebengPipe = document.querySelectorAll('.rebengPipe');//热泵管路
const rebeng = document.querySelector('.rebeng');//热泵
/* 用户管路 */
const yonghuPipe = document.querySelectorAll('.yonghu');//用户管路
const yonghubeng = document.querySelector('.yonghubeng');//用户热水泵
/* 用户循环泵开关 */
function yonghukaiguan(valueBool){
    yonghubeng.style.animationPlayState = valueBool ? "running" : "paused";
    yonghuPipe.forEach((el, index) => {
        el.start = valueBool ? "true" : "false";
    });
}

/*控制上循环泵开关*/
function shangbukaiguan(valueBool) {
    shangbubeng.style.animationPlayState = valueBool ? "running" : "paused";
    shangbu.forEach((el, index) => {
        el.start = valueBool ? "true" : "false";
    });
}
/*控制下循环泵开关*/
function xiabukaiguan(valueBool) {
    xiabubeng.style.animationPlayState = valueBool ? "running" : "paused";
    xiabu.forEach((el, index) => {
        el.start = valueBool ? "true" : "false";
    })
}
/* 控制空气能循环泵 */
function rebengkaiguan(valueBool) {
    rebeng.style.animationPlayState = valueBool ? "running" : "paused";
    rebengPipe[0].start = valueBool ? "true" : "false";
    rebengPipe[1].start = valueBool ? "true" : "false";
}
/*获取太阳能数据*/
const dataFetcher = new DataFetcher('http://center.zhuineng.com:50020/api-t/translate?type=0&uid=329c7b6dee7c46f095a4fb7d93c79089&pid=bb85a5219375426fb805ebacef87d65b', 5000); // 每 5 秒获取一次数据
dataFetcher.startFetching((data) => {
    time.innerText = data.DNT;//时间显示
    
    /*设置太阳能管道及泵*/
    t1.innerText='T1='+data.T1+"℃";
    t2.innerText='T2='+data.T2+"℃";
    shangbukaiguan(data.P1S);
    //if (data.P1S == false && data.P2S == false) zhuguandao.start = "false";
    zhuguandao.start=data.P1S || data.P2S//-------------------------------逻辑值赋值给文本有什么问题-------------
    t3.innerText='T1='+data.T3+"℃";
    t4.innerText='T2='+data.T4+"℃";
    xiabukaiguan(data.P2S);
    /*设置水箱 */
    shuixiangDetail.innerText = `温度:${data.T0}℃
  水位:${data.W1}%`;
    shuiwei.style.height = data.W1 + '%';
    /* 设置空气能热泵及管道 *///--------------------------------------------------------------------未发现是哪个参数------------------------
    rebengkaiguan(false);
    t7.innerText='T2='+data.T7+"℃";
    /* 设置用户热水泵及管道 */
    yonghukaiguan(false);//-----------------------------------------------------------------------------------------------------------
});