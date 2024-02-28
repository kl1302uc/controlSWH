import '../components/pipe.js';
import {TimedAjaxRequest} from './request.js';
const shangbu=document.querySelectorAll('.shangbu');
const xiabu=document.querySelectorAll('.xiabu');
const zhuguandao=document.querySelector(".zhuguandao");
const shangbubeng=document.querySelector(".shangbubeng");
const xiabubeng=document.querySelector(".xiabubeng");
const shuixiangDetail=document.querySelector('.shuixiang>.detail');
const shuiwei=document.querySelector('.shuixiang>.shuiweiWrap>.shuiwei');

/*控制上循环泵开关*/
function shangbukaiguan(valueBool){
    shangbubeng.style.animationPlayState=valueBool?"running":"paused";
    shangbu.forEach((el,index)=>{
        el.start=valueBool?"true":"false";
    });  
}
/*控制下循环泵开关*/
function xiabukaiguan(valueBool){
    xiabubeng.style.animationPlayState=valueBool?"running":"paused";
    xiabu.forEach((el,index)=>{
        el.start=valueBool?"true":"false";
    })
}

/*获取太阳能数据*/
  

const dataFetcher = new TimedAjaxRequest('http://center.zhuineng.com:50020/api-t/translate?type=0&uid=329c7b6dee7c46f095a4fb7d93c79089&pid=bb85a5219375426fb805ebacef87d65b', 5000,(data)=>{
    shangbukaiguan(data.KP1S);

    xiabukaiguan(data.KP2S);
  
    shuixiangDetail.innerText=`温度:${data.T0}℃
    水位:${data.W1}%`;
    shuiwei.style.height=data.W1+'%';

}); // 每 5 秒获取一次数据
dataFetcher.start();