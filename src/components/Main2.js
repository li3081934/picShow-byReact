require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import ReactDOM from 'react-dom';


let imgSrc =  require('../data/picinfo.json');
var imagesDatas=(function (imgArr){
  for(var i=0;i<imgArr.length;i++){
    var sinImgData = imgArr[i];
    sinImgData.picSrc = require('../images/'+sinImgData.picSrc);
    imgArr[i]=sinImgData
  }
  return imgArr
})(imgSrc);
function getRandomPos(low,higt){
  return Math.ceil(Math.random()*(higt-low)+low)
}
//////////////////
class ImgFig extends React.Component {

  constructor(props) {
    super(props);
    var styleObj={};
    this.state={
      arrange:[]
    };
    if(props.arrange){
      //console.log(props.arrange)

    }

  }
  handleClick(){

    if (this.props.arrange.pos.left==800 && this.props.arrange.pos.top==212){
      if(this.props.arrange.rotateDeg3D=='rotateY(0deg)'){
        this.props.arrange.rotateDeg3D='rotateY(180deg) translate(-1px)';

      }else {
        this.props.arrange.rotateDeg3D='rotateY(0deg)'
      }

      //console.log(this.props.arrange.pos.left)
      this.setState({
        arrange:this.props.arrange
      })
    }else {
      this.props.onClick();
      console.log('========')
    }


  }
//style={{marginRight: spacing + 'em'}}
  render(){
    return(
      //<figure style={this.props.arrange.pos}>

      <figure style={{left:this.props.arrange.pos.left,top:this.props.arrange.pos.top,transform:this.props.arrange.rotateDeg+""+this.props.arrange.rotateDeg3D,zIndex:this.props.arrange.zIndex}} onClick={this.handleClick.bind(this)}>
        <img src={this.props.data.picSrc} alt={this.props.data.title}/>
        <figcaption>
          <h2>{this.props.data.title}</h2>
        </figcaption>
        <div className="cardBack">
          <p>asfasfasfasf</p>
        </div>
      </figure>

    );
  }
}
/*var ImgFig=React.createClass(){
  render:function (){
    return (
      <figure>
        <img src={this.props.data.picSrc} alt={this.props.data.title}/>
        <figcaption>
          <h2>{this.props.data.title}</h2>
        </figcaption>
      </figure>
    )
  }
}*/

class AppComponent extends React.Component {
  constant={
      centerPos:{
        left:0,
        right:0
        },
      hPosRange:{
        leftZone:[0,0],
        rightZone:[0,0],
        y:[0,0]
        },
      vPosRange:{
        y:[0,0],
        x:[0,0]
        }
    }
  reRange=function(centerIndex){
    var imgsArrangeArr=this.state.imgsArrangeArr,
      constant=this.constant,
      centerPos=constant.centerPos,
      hPosRange=constant.hPosRange,
      vPosRange=constant.vPosRange,
      hPosLeftZoneSecx=hPosRange.leftZone,
      hPosRightZoneSecx=hPosRange.rightZone,
      hPosRightZoneY=hPosRange.y,
      vPosTopZoneX=vPosRange.x,
      vPosTopZoneY=vPosRange.y;

    var imgArrangeTopArr=[],
      topImgNum=Math.floor(Math.random()*2),
      topImgIndex=0;
    //赋值开始 中心赋值
    var imgArrangeCenterArr=imgsArrangeArr.splice(centerIndex,1);

    imgArrangeCenterArr[0].pos=centerPos;
    imgArrangeCenterArr[0].zIndex=99;
    imgArrangeCenterArr[0].rotateDeg="rotateZ(0deg)";
    //imgArrangeCenterArr[0].rotateDeg3D="rotateY(180deg)";
    topImgIndex=Math.ceil(Math.random()*(imgsArrangeArr.length-topImgNum));
    imgArrangeTopArr = imgsArrangeArr.splice(topImgIndex,topImgNum);
    //赋值开始 顶部赋值
    imgArrangeTopArr.forEach(function(value,index){
      imgArrangeTopArr[index].pos={
        top:getRandomPos(vPosTopZoneY[0],vPosTopZoneY[1]),
        left:getRandomPos(vPosTopZoneX[0],vPosTopZoneX[1])
      }
      imgArrangeTopArr[index].rotateDeg='rotateZ('+getRandomPos(0,180)+'deg)';
      imgArrangeTopArr[index].rotateDeg3D='rotateY(0deg)';
    });
    //赋值开始 左右部赋值
    for(var i = 0, k=imgsArrangeArr.length/2;i<imgsArrangeArr.length;i++){
      var hPosRangeLorR = null;
      if(i<k){
        hPosRangeLorR = hPosLeftZoneSecx;
      }else {
        hPosRangeLorR = hPosRightZoneSecx;
      }

      imgsArrangeArr[i].pos={
        top : getRandomPos(hPosRightZoneY[0],hPosRightZoneY[1]),
        left : getRandomPos(hPosRangeLorR[0],hPosRangeLorR[1])
      }
      imgsArrangeArr[i].rotateDeg='rotateZ('+getRandomPos(0,180)+'deg)';
      imgsArrangeArr[i].rotateDeg3D='rotateY(0deg)';
    }
    if(imgArrangeTopArr && imgArrangeTopArr[0]){
      imgsArrangeArr.splice(topImgIndex,0,imgArrangeTopArr[0]);
    }
    imgsArrangeArr.splice(centerIndex,0,imgArrangeCenterArr[0]);


    this.setState({
      imgsArrangeArr:imgsArrangeArr
    })
  };
  componentDidMount=function(){

    var stageDom=this.refs.stage,
      stageW=stageDom.scrollWidth,
      stageH=stageDom.scrollHeight,
      halfStageW=Math.ceil(stageW/2),
      halfstageH=Math.ceil(stageH/2);
    var imgFigDOM=ReactDOM.findDOMNode(this.refs.imgFig0),
      imgW=imgFigDOM.scrollWidth,
      imgH=imgFigDOM.scrollHeight,
      halfImgW=Math.ceil(imgW/2),
      halfImgH=Math.ceil(imgH/2);
    this.constant.centerPos={
      left:halfStageW-halfImgW,
      top:halfstageH-halfImgH
    };
    this.constant.hPosRange.leftZone[0]=-halfImgW;
    this.constant.hPosRange.leftZone[1]=halfStageW-halfImgW*3;

    this.constant.hPosRange.rightZone[0]=halfStageW+halfImgW;
    this.constant.hPosRange.rightZone[1]=stageW-halfImgW;
    this.constant.hPosRange.y[0]=-halfImgH;
    this.constant.hPosRange.y[1]=stageH-halfImgH;

    this.constant.vPosRange.y[0]=-halfImgH;
    this.constant.vPosRange.y[1]=halfstageH-halfImgH*3;
    this.constant.vPosRange.x[0]=halfStageW-halfImgW;
    this.constant.vPosRange.x[1]=halfStageW;
   // console.log(this.constant.centerPos)
    this.reRange(0);
  };
  constructor(props) {
    super(props);

    this.state = {
      imgsArrangeArr:[
/*        {
          pos:{
            left:'0',
            top:'0'
          },
          transform:'rotate(50deg)';

        }*/
      ]
    };
  }
  handleClick(index) {
    this.reRange(index);
    //console.log(1111111111)
  }
  render() {
    var navUnit=[],imgFigs=[];

    imagesDatas.forEach(function (value,index) {
      if(!this.state.imgsArrangeArr[index]){
        //this.reRange(index);
        this.state.imgsArrangeArr[index]={
          pos:{
            left:0,
            top:0
          },
          rotateDeg:'rotateZ(0deg)',
          rotateDeg3D:'rotateY(0deg)'

        }
      }
      imgFigs.push(<ImgFig data={value} ref={'imgFig'+index} arrange={this.state.imgsArrangeArr[index]} onClick={this.handleClick.bind(this,index)}/>)
      }.bind(this)
    );
    //this.reRange(1)
    return (
      <section className='stage' ref="stage">
        <section className='picMain'>
          {imgFigs}
        </section>
        <nav className='picNav'>
          {navUnit}
        </nav>
      </section>
    );
  };

}

AppComponent.defaultProps = {
};

export default AppComponent;
