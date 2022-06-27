
//引入express
const app = require('express')();
//引入echarts
const echarts = require('echarts');

//.all的意思是可以接受任何http的请求方式，常用的get，post 等等
app.all('/echarts/:title', (req, res) => {

    // 在 SSR 模式下第一个参数不需要再传入 DOM 对象
    const chart = echarts.init(null, null, {
        renderer: 'svg', // 必须使用 SVG 模式
        ssr: true, // 开启 SSR
        width: 400, // 需要指明高和宽
        height: 300
    });

    // 像正常使用一样 setOption
    chart.setOption({  
        title:{
             //这里使用传入的title
            text:req.params.title
        },
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'bar',
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(180, 180, 180, 0.2)'
                }
            }
        ]
    });

    // 输出字符串
    const svgStr = chart.renderToSVGString();
    // 返回给请求
    res.send(svgStr)
    res.end();

})
module.exports = app