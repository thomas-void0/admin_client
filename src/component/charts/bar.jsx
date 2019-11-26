import React, { Component } from 'react'
import ReactEcharts from "echarts-for-react";
import {Card,Button} from 'antd'

export default class Bar extends Component {
    constructor(props){
        super(props)
        this.state={
            sales:[5,20,11,22,54,23],
            stores:[6,10,25,20,64,13],
        }
    }
    update = () => {
        this.setState(state => ({
          sales: state.sales.map(sale => sale + 1),
          stores: state.stores.reduce((pre, store) => {
            pre.push(store-1)
            return pre
          }, []),
        }))
    }
    render() {
        const title = (<Button type="primary" onClick={this.update}>更新</Button>)
        const option = {
            title:{
                text:"销售情况"
            },
            legend: {
                data:['销量', '库存']
            },
            tooltip: {},
            xAxis: {
                data: ["电动车","五菱宏光","川崎","长安","科鲁兹","科迈罗"]
            },
            yAxis: {},
            series: [
                {
                    name:"销量",
                    type: 'bar',
                    data:this.state.sales
                },
                {
                    name:"库存",
                    type: 'bar',
                    data:this.state.stores
                },
            ]
        };
        return (
            <Card title={title}>
                <ReactEcharts
                    option={option}
                    notMerge={true}
                />
            </Card>
        )
    }
}
