import React, {useEffect,  useState} from 'react';
import {
    Bar,
    BarChart,
    Brush,
    CartesianGrid,
    Cell,
    ReferenceLine,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import {GetBuyChartData, GetNetChartData, GetSellChartData, GetVolumeChartData} from "api/queries";
import moment from "moment";
import {infoColor} from "../../assets/jss/material-dashboard-react";
import {useFetchChartData} from "../../store/hooks/vault/useFetchChartData";
import {useChangeToken} from "../../store/hooks/globalSettings/useChangeToken";

export const TransactionChart = ({time, type}) => {
    const {fetchChartData,chartData} = useFetchChartData();
    const [colors,setColors] = useState([]);
    const [startIndex,setStartIndex] = useState(0)
    const {globalTokenAddress,globalPair}=useChangeToken()

    useEffect(() =>{
        const temp = []
        chartData.reverse().map((entry) => {
            const color = entry.value > 0 ? COLORS[0] : COLORS[1];
            temp.push(color)
        })
        setColors(temp)
    },[chartData])

    useEffect(() => {
        let min = 0;
        let max = 10000000000000;

        if (time === "hour") {
            max = moment().unix();
            min = moment().subtract(1, 'weeks').unix();
        }

        if (time === "minute") {
            max = moment().unix();
            min = moment().subtract(2, 'days').unix();
        }
        fetchChartData({time, pair:globalPair, token:globalTokenAddress, type, min, max})
    }, [time, globalPair, globalTokenAddress, type]);

    function formatXAxis(tickItem) {
        return moment(tickItem).format('D MMM YY')
    }


    const COLORS = ['#00CA4E', '#FF605C'];

    return (
        <>
            {
                chartData.length !== 0 &&
                <ResponsiveContainer width="100%"
                                     height={500}>
                    <BarChart
                        width="100%"
                        height={500}
                        data={chartData.reverse()}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="5 5" />
                        <XAxis dataKey="datetime" tickFormatter={formatXAxis}/>
                        <YAxis/>
                        <Tooltip/>
                        <ReferenceLine y={0}/>
                        <Brush dataKey="datetime" height={50} stroke={infoColor[0]} tickFormatter={formatXAxis} onChange={(e) => setStartIndex(e.startIndex)}/>
                        <Bar dataKey="value" >
                            {
                                chartData.reverse().map((_, index) => {
                                    return <Cell fill={colors[(index+startIndex)]} key={`cell-${index}`}/>;
                                })
                            }
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            }
        </>
    );


}
