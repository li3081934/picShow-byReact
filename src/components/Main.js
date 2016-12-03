require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import ReactDOM from 'react-dom';
var imgsInfoArr=require('../data/picInfo.json');//拿到图片数据
class NavUnit extends React.Component{
    handleClick(){
        if(this.props.arrange.isCenter){
            this.props.doBack()
        }else {
            this.props.doClick();
        }
    }
    render(){
        /*if(this.props.arrange.isCenter){
            this.props.arrange.isCenter='scale(1.5,1.5)'
        }*/
        var rotateDeg
        if(this.props.arrange.isBack){
            rotateDeg=180
        }else {
            rotateDeg=0
        }
        let  styles={
            //this.props.arrange.isCenter?'scale(1.2,1.2)':'',
            transform:(this.props.arrange.isCenter?'scale(1.2,1.2)':'')+''+'rotateY('+rotateDeg+'deg)',
            backgroundColor:this.props.arrange.isCenter?'#666':'#999'

        };
        return(
            <span style={styles} onClick={this.handleClick.bind(this)}>{this.props.arrange.isCenter?'\u21B7':''}</span>
        )
    }
}
class ImgUnit extends React.Component{

    handleClick(){
        //console.log(this.props)
        if(this.props.arrange.isCenter){
            this.props.doBack()
        }else {
            this.props.doClick();
        }


        /*if(this.centerIndex.index==this.props.unitIndex){
            debugger;
        }else {
            debugger;


            this.centerIndex.index=this.props.unitIndex;
        }*/

    }
    render(){
        if (this.props.arrange.isBack){
            this.props.arrange.isBack=180;
        }else {
            this.props.arrange.isBack=0
        }
        var styles={left:this.props.arrange.pos.left,
            top:this.props.arrange.pos.top,
            transform:'rotateZ('+this.props.arrange.rotateDeg+'deg)'+' '+'rotateY('+this.props.arrange.isBack+'deg)'

        };

        return (
            <figure style={styles} onClick={this.handleClick.bind(this)}>
                <img src={'images/'+this.props.data.picSrc}/>
                <figcaption >
                    <h2>{this.props.data.title}</h2>
                </figcaption>
                <div className="cardBack">
                    <p>{this.props.data.desc}</p>
                </div>
            </figure>
        )

    }
}


class AppComponent extends React.Component {
    imgZonePosition={
        centerPos:{
            x:0,
            y:0
        },
        hPosZone:{
            leftRangeX:[0,0],
            rightRangeX:[0,0],
            y:[0,0]
        },
        vPosZone:{
            x:[0,0],
            y:[0,0]
        }
    };
    randomNum=function(min,max){
          return Math.floor(Math.random()*(max-min)+min)
    };

    reRange=function(centerIndex){

        //引入this.imgZonePosition
        var imgZonePosition = this.imgZonePosition;

        //引入state
        var imgUnitsArr = this.state.imgUnitsArr;

        //设置中心图片
        var centerZoneArr=imgUnitsArr.splice(centerIndex,1);

        centerZoneArr[0]={
            pos:{
                left:imgZonePosition.centerPos.x,
                top:imgZonePosition.centerPos.y
            },
            rotateDeg:0,
            isBack:false,
            isCenter:true
        };
        this.state.navUnitsArr[centerIndex].isCenter=true;
        //设置顶部区
        var topZoneArr = [],
            topZoneNum=Math.floor(Math.random()*2),
            topZongIndex=Math.ceil(Math.random()*imgUnitsArr.length-topZoneNum);
        topZoneArr=imgUnitsArr.splice(topZongIndex,topZoneNum);
        for(var i = 0;i<topZoneArr.length;i++){
            topZoneArr[i]={
                pos:{
                    left:this.randomNum(imgZonePosition.vPosZone.x[0],imgZonePosition.vPosZone.x[1]),
                    top:this.randomNum(imgZonePosition.vPosZone.y[0],imgZonePosition.vPosZone.y[1])
                },
                rotateDeg:Math.ceil(Math.random()*60-30),
                isBack:false,
                isCenter:false
            };
            //this.state.navUnitsArr[i].isCenter=false;
        }




        //设置左右区
        for(var i=0;i< imgUnitsArr.length;i++) {
            if (i < Math.ceil(imgUnitsArr.length / 2)) {
                //分成数量相等两部分
                imgUnitsArr[i].pos = {
                    left: this.randomNum(imgZonePosition.hPosZone.leftRangeX[0], imgZonePosition.hPosZone.leftRangeX[1]),
                    top: this.randomNum(imgZonePosition.hPosZone.y[0], imgZonePosition.hPosZone.y[1])

                };

            } else {
                imgUnitsArr[i].pos = {
                    left: this.randomNum(imgZonePosition.hPosZone.rightRangeX[0], imgZonePosition.hPosZone.rightRangeX[1]),
                    top: this.randomNum(imgZonePosition.hPosZone.y[0], imgZonePosition.hPosZone.y[1])
                }
            }
            imgUnitsArr[i].rotateDeg = Math.ceil(Math.random() * 60 - 30);
            imgUnitsArr[i].isBack = false;
            imgUnitsArr[i].isCenter = false;
            //this.state.navUnitsArr[i].isCenter=false;
        }
        if(topZoneArr&&topZoneArr[0]){
            imgUnitsArr.splice(topZongIndex,0,topZoneArr[0]);
        }
        imgUnitsArr.splice(centerIndex,0,centerZoneArr[0]);
        //console.log(imgUnitsArr);

        this.setState({
            imgUnitsArr:imgUnitsArr,
            navUnitsArr:this.state.navUnitsArr
        })
    };

    componentDidMount=function(){
        //获取舞台宽度
        var stageW=this.refs.stage.scrollWidth,
            stageH=this.refs.stage.scrollHeight,
            halfStageW=Math.ceil(stageW/2),
            halfStageH=Math.ceil(stageH/2);
        //获取单个图片宽度
        var imgW=ReactDOM.findDOMNode(this.refs.img0).scrollWidth,
            imgH=ReactDOM.findDOMNode(this.refs.img0).scrollHeight,
            halfImgW=Math.ceil(imgW/2),
            halfImgH=Math.ceil(imgH/2);
        //计算每个区域的取值范围
        //中心点
        this.imgZonePosition.centerPos={
            x:halfStageW-halfImgW,
            y:halfStageH-halfImgH
        };
        //上部分
        this.imgZonePosition.vPosZone={
            x:[halfStageW-halfImgW*3,halfStageW+halfImgW],
            y:[-halfImgH,halfStageH-halfImgH*3]
        };
        //左右部分
        this.imgZonePosition.hPosZone={
            leftRangeX:[-halfImgW,halfStageW-halfImgW*3],
            rightRangeX:[halfStageW+halfImgW,stageW-halfImgW],
            y:[-halfImgH,stageH-halfImgH]
        };

        this.reRange(7)
    };

    constructor(props){
        super(props);
        this.state = {
            imgUnitsArr:[],
            navUnitsArr:[]
        }
    }
    doMove(centerIndex){
        return function (){
            this.reRange(centerIndex);
            for(var i =0;i<this.state.navUnitsArr.length;i++){
                this.state.navUnitsArr[i].isCenter=false
            }
            this.state.navUnitsArr[centerIndex].isCenter=!this.state.navUnitsArr[centerIndex].isCenter;
            this.setState({
                imgUnitsArr:this.state.imgUnitsArr,
                navUnitsArr:this.state.navUnitsArr
            })
        }.bind(this);

    }
    doBack(index){
        return function (){
            this.state.imgUnitsArr[index].isBack=!this.state.imgUnitsArr[index].isBack;
            this.state.navUnitsArr[index].isBack=!this.state.navUnitsArr[index].isBack;
            this.setState({
                imgUnitsArr:this.state.imgUnitsArr,
                navUnitsArr:this.state.navUnitsArr
            })
        }.bind(this)
    }
    render () {
        var navUnits=[],imgUnits=[];//初始化图片组件序列的数组
        //给图片组件序列赋值 并导入数据

        for (var i = 0;i < imgsInfoArr.length;i++){
            if(!this.state.imgUnitsArr[i]){
                this.state.imgUnitsArr[i] = {
                    pos: {
                        left: 0,
                        right: 0
                    },
                    rotateDeg: 0,
                    isBack: false,
                    isCenter:false

                };
            }
            if(!this.state.navUnitsArr[i]){
                this.state.navUnitsArr[i]={
                    isBack: false,
                    isCenter:false
                }
            }
            navUnits.push(<NavUnit  doClick={this.doMove(i) } doBack={this.doBack(i)} arrange={this.state.navUnitsArr[i]} key={i}/>)
            imgUnits.push(<ImgUnit data={imgsInfoArr[i]} ref={'img'+i}  arrange={this.state.imgUnitsArr[i]} doClick={this.doMove(i) } doBack={this.doBack(i)} key={i}/>)
        }

        return(
            <section className="stage" ref="stage">
                <section className="picMain">
                    {imgUnits}
                </section>
                <nav className="navWrap">
                    {navUnits}
                </nav>
            </section>
        )
    }
}




AppComponent.defaultProps = {};

export default AppComponent;
