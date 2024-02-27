/* 自定义管道组件 */
class Pipe extends HTMLElement {
  constructor() {
    super();
    const template = document.createElement("template");
    template.innerHTML = /*html*/ `
        <style>
             
             :host{
               
             }
            .wrap{
                border:solid 1px;
                overflow:hidden;
            }
            .wrap>.inner{
            
            
                height:2vw;
                width:800vw;
                background-image:repeating-linear-gradient(to left,white 0%,white 1%,blue 1%,blue 2%);
                animation:pipe 8s linear infinite;
            }
            @keyframes pipe{
              0%{
                transform:translateX(-50%);
              }
              100%{
                transform:translateX(-2%);
    
              }
            }
        </style>
        <div class="wrap">
          <div class="inner"></div>
        </div>
        `
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.wrap = this._shadowRoot.querySelector(".wrap");
    this.inner=this.wrap.querySelector('.inner');
   
  }
  connectedCallback(el) {
    
    
    
  }
  /*根据传值执行流动动作*/
  flowing(value) {
    if (value == true) {
      this.inner.style.animationPlayState='running';
    } else {
      this.inner.style.animationPlayState='paused';
    }
  }
  get width() {
    return this.getAttribute("width");
  }
  set width(value) {
    this.setAttribute("width", value);
  }
  get height() {
    return this.getAttribute("height");
  }
  set height(value) {
    this.setAttribute("height", value);
  }

  get direction() {
    return this.getAttribute("direction");
  }
  set direction(value) {
    this.setAttribute("direction", value);
  }
  get start() {
    return this.getAttribute("start");
  }
  set start(value) {
    this.setAttribute("start", value);
  }
  get water() {
    return this.getAttribute('water');
  }
  set water(value) {
    this.setAttribute('water', value);

  }
  set speed(value){
    this.setAttribute('speed',value);
  }
  get speed(){
    return this.getAttribute('speed');
  }

  attributeChangedCallback(name, oldvalue, newvalue) {
    switch (name) {
      case "width":
        this.wrap.style.width = newvalue;
        break;
      case "height":
        this.inner.style.height = newvalue;
        //this.inner.style.backgroundImage=`repeating-linear-gradient(to right,white 0,white ${newvalue},${this.getAttribute('water')} ${newvalue},${this.getAttribute('water')} ${newvalue})`;//赋值不成功
        break;
      case "direction":
        switch (newvalue) {
          case "top":
            this.wrap.style.transform='rotateZ(270deg)';
            break;
          case "right":
            this.wrap.style.transform='rotateZ(0deg)';
            break;
          case "bottom":
                this.wrap.style.transform='rotateZ(90deg)';
            break;
          case "left":
                this.wrap.style.transform='rotateZ(180deg)';
            break;
          default:
                this.wrap.style.transform='rotateZ(0deg)';
            console.warn("管道方向输入错误");
        }
        break;
      case "start":
        newvalue == "true" ? this.flowing(true) : this.flowing(false);
        break;
      case "water":
       // this.inner.style.backgroundImage=`repeating-linear-gradient(to right,white 0%,white 1%,${newvalue} 1%,${newvalue} 2%)`;
        let intHeight=parseFloat(this.getAttribute('height'));
        let heightUnit=this.getAttribute('height').replace(parseFloat(this.getAttribute('height'))+'','');
        this.inner.style.backgroundImage=`repeating-linear-gradient(to right,white 0,white ${4*intHeight+heightUnit},${newvalue} ${4*intHeight+heightUnit},${newvalue} ${8*intHeight+heightUnit})`;
        break;
      case "speed":
        this.inner.style.animationDuration=newvalue;
        break;

    }

  }
  static get observedAttributes() {
    return ["width", "height", "direction", "start", 'water','speed']
    //width:长度,height:管道厚度,direction:方向,start:开关,water:水温颜色,speed:速度
  }
}
window.customElements.define("swh-pipe", Pipe);