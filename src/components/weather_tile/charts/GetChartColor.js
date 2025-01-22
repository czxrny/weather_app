function GetChartColor(type) {
    switch (type) {
        case 'Temperature': return { fill: '#ca9801', stroke: '#dba912' };
        case 'WindSpeed': return { fill: '#a5d6a7', stroke: '#81c784' };
        case 'Humidity': return { fill: '#80deea', stroke: '#64b5f6' };
        default: return { fill: '#bdbdbd', stroke: '#a6a6a6' };
    }
};

export default GetChartColor;