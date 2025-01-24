import React from "react";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import GetChartColor from "./GetChartColor"

function CreateChart(props) {
    let colors;

    const createChartData = (arr, fieldName) => {
        let chartData = [];
        for (let i = 0; i < props.timeArr.length; i++) {
            chartData.push({ name: props.timeArr[i], [fieldName]: arr[i] });
        }
        colors = GetChartColor(fieldName);
        return chartData;
    };

    return (
        <ResponsiveContainer width="100%" height={100}>
            <AreaChart
                data={createChartData(props.data, props.type)}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
            <Tooltip
                formatter={(value) => `${value.toFixed(1)} ${props.units}`}
            />
            <XAxis dataKey="name" stroke={"#000000"}/>
            <Tooltip />
            <Area type="monotone" dataKey={props.type} stroke={colors.stroke} fill={colors.fill} />
            </AreaChart>
        </ResponsiveContainer>
    )
}

export default CreateChart;