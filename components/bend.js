class Bend extends HTMLElement {

  constructor() {
    super();
    const template = document.createElement('template');
    template.innerHTML = /*html*/ `
    <style>
    .bend{
    position:relative;
      
      width:10vw;
      height:10vw;
    }
    .bend>div{
      background-color:white;
      border:solid 1px black;
      box-sizing:border-box;

    }
    .bend>div:nth-child(1){
      width:100%;
      height:100%;
      
      border-radius:50%;
    }
    .bend>div:nth-child(2){
     position:absolute;
     top:25%;
     left:25%;
     z-index:1;
      width:50%;
      height:50%;
      border-radius:50%;
    }
    .bend>div:nth-child(3){
    
      width:100%;
      height:50%;
      position:absolute;
      z-index:2;
      top:50%;
      border:none;
    }
    .bend>div:nth-child(4){
    position:absolute;
    z-index:5;
    top:50%;
      width:calc(25% + 1px);
      height:100%;
      border-top:none;
      border-bottom:none;
      
    }
    </style>
    <div class='bend'>
     <div></div>
     <div></div>
     <div></div>
     <div></div>
     

    </div>
    
    
    `
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.bend=this._shadowRoot.querySelector('.bend');
    this.lastDiv=this._shadowRoot.querySelector('.bend>div:last-child');
  }
  attributeChangedCallback(name,oldvalue,newvalue){
    if(name=='width'){
      this.bend.style.width=newvalue;
      this.bend.style.height=newvalue;
    }else if(name=='height'){
      this.lastDiv.style.height=newvalue;
    }
  }
  static get observedAttributes(){
    return['width','height'];
  }
}
window.customElements.define('swh-bend',Bend);