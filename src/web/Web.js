import React, {Component} from 'react';
import {HashRouter as Router, Link, HashHistory} from 'react-router-dom';
import * as d3 from 'd3';
import {Layout, Row, Col} from 'antd';
import './Web.css';


class Web extends Component {
    constructor(props){
        super(props);
        this.state = {
            colorRed : "#ff3d00",
            colorYellow : "#ff9100",
            colorBlue : "#00897b",
            colorGreen :"#00e676",

        };//设置state
    }
    componentWillMount() {
        this.setState({
            data:this.getSortData(),
        });//设置state
    }
    componentDidMount(){

    }


    getSortData=(count=8)=>{
        var arr = [], i=0;
        while(i++<count){
            let v = Math.floor((Math.random()*90+10));//10~100
            arr.push({v:v,color:this.state.colorBlue});
        }
        return arr;
    }
    resetColor = (data) => {
        data.forEach(v => {
            v.color = this.state.colorBlue;
        });
    }

    bubble=function* (data) {
        var length = data.length;
        for (var i = 0; i < length; i++) {
            for (var j = 0; j < length - 1; j++) {
                data[j].color = this.state.colorYellow;
                yield data;
                if (data[j].v > data[j + 1].v) {
                    //交换
                    data[j].color = data[j + 1].color = this.state.colorRed;
                    yield data;
                    let t = data[j].v;
                    data[j].v = data[j + 1].v;
                    data[j + 1].v = t;
                    console.log("交换");
                    yield data;
                }
                this.resetColor(data);
            }
        }
    }

    handleStart = (select) => {
        // var select = document.getElementById("select").value;//materialize的问题
        //console.log("handleStart",select);
        // if (!SortalGorithm.hasOwnProperty(select)) {
        //     alert("无该排序方法");
        //     return;
        // }
        //console.log(this.props);
        /****************颜色归一**************/
        var data = this.state.data.slice();
        this.resetColor(data);
        /************处理各种算法**************/
        var iter =this.bubble(data);
        var go = ()=> {
            let currentData = iter.next();
            //console.log("next", currentData);

            if (!currentData.done) {
                this.setState({data: currentData.value});
                setTimeout(go, 500);
            }
        }
        setTimeout(go, 0);
    }

    render() {

        return (
            <div className="col s12 m12 l12">
                <div onClick={()=>{this.handleStart("bubble")}}>点击</div>
                <div style={{width: "100%", display: "flex", justifyContent: 'center'}}>
                    <SortGraph data={this.state.data}/>
                </div>
            </div>
        )
    }
}

class SortGraph extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        //svg宽高
        var paddingBottom = 30;
        var height = 400;
        var data = this.props.data;
        //求比例变换
        var dataV = data.map(v => {
            return v.v
        });
        var min = Math.min(...dataV);
        var max = Math.max(...dataV);
        //console.log("render SortGraph",{max,min});
        var linear = d3.scaleLinear().domain([0, max]).range([0, height - paddingBottom - 10]);
        var w = 30;
        var dom = data.map((value, i) => {
            var h = linear(value.v);
            var x = i * (w + 5);
            var y = height - h - paddingBottom;
            return (
                <g key={i}>
                    <Bar x={x} y={y} width={w} height={h} fill={value.color}/>
                    <text x={x} y={y - 2} dx={w / 2} textAnchor="middle">{value.v}</text>
                </g>);
        });
        var width = (w + 5) * data.length;
        return (
            <svg ref={(r) => this.chartRef = r} height={height} width={width} style={{paddingTop: '20px'}} className="center-align">
                <g>
                    {dom}
                </g>
            </svg>)
    }
}

class Bar extends React.Component {
    render() {
        return (
            <rect  x={this.props.x} y={this.props.y} width={this.props.width} height={this.props.height}
                  fill={this.props.fill}></rect>
        );
    }
}




export default Web;

