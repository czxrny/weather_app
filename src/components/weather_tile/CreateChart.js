import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

function CreateChart(props) {
    const createChartData = (arr, fieldName) => {
        let chartData = [];
        for (let i = 0; i < props.timeArr.length; i++) {
            chartData.push({ name: props.timeArr[i], [fieldName]: arr[i] });
        }
        return chartData;
    };

    return (
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart
                data={createChartData(props.data, props.type)}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
                <XAxis dataKey="name" stroke={"#000000"}/>
                <Tooltip />
                <Area type="monotone" dataKey="temperature" stroke="#8884da" fill="#dba912" />
            </AreaChart>
        </ResponsiveContainer>
    )
}

export default CreateChart;