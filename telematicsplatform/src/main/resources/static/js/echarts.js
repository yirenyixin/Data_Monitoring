$(function () {

    // echarts_1();
    // echarts_2();
    map();
    // echarts_3();
    // echarts_4();
    // echarts_5();
    // echarts_6();

    function echarts_1() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echarts_1'));
        $.ajax({
            url:"/func/carType",
            success:function (data) {
                option = {
                    backgroundColor: 'rgba(0,0,0,0)',
                    tooltip: {
                        trigger: 'item',
                        formatter: "{b}: <br/>{c} ({d}%)"
                    },
                    color: ['#af89d6', '#4ac7f5', '#0089ff', '#f36f8a', '#f5c847'],
                    legend: { //图例组件，颜色和名字
                        x: '70%',
                        y: 'center',
                        orient: 'vertical',
                        itemGap: 12, //图例每项之间的间隔
                        itemWidth: 10,
                        itemHeight: 10,
                        icon: 'rect',
                        data: ['房车', '旅行轿车', '轿跑车', '跑车', '敞篷车'],
                        textStyle: {
                            color: [],
                            fontStyle: 'normal',
                            fontFamily: '微软雅黑',
                            fontSize: 12,
                        }
                    },
                    series: [{
                        name: '行业占比',
                        type: 'pie',
                        clockwise: false, //饼图的扇区是否是顺时针排布
                        minAngle: 20, //最小的扇区角度（0 ~ 360）
                        center: ['35%', '50%'], //饼图的中心（圆心）坐标
                        radius: [50, 75], //饼图的半径
                        avoidLabelOverlap: true, ////是否启用防止标签重叠
                        itemStyle: { //图形样式
                            normal: {
                                borderColor: '#1e2239',
                                borderWidth: 2,
                            },
                        },
                        label: { //标签的位置
                            normal: {
                                show: true,
                                position: 'inside', //标签的位置
                                formatter: "{d}%",
                                textStyle: {
                                    color: '#fff',
                                }
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        data: data.dataList
                    }, {
                        name: '',
                        type: 'pie',
                        clockwise: false,
                        silent: true,
                        minAngle: 20, //最小的扇区角度（0 ~ 360）
                        center: ['35%', '50%'], //饼图的中心（圆心）坐标
                        radius: [0, 40], //饼图的半径
                        itemStyle: { //图形样式
                            normal: {
                                borderColor: '#1e2239',
                                borderWidth: 1.5,
                                opacity: 0.21,
                            }
                        },
                        label: { //标签的位置
                            normal: {
                                show: false,
                            }
                        },
                        data: data.dataList
                    }]
                };

                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
                window.addEventListener("resize", function () {
                    myChart.resize();
                });
            },
            dataType:"json",
            type:"post"
        });
    }

    function map() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('map'));

        var mapName = 'china'
        var data = []
        var geoCoordMap = {};
        var toolTipData = [];

        /*获取地图数据*/
        myChart.showLoading();
        var mapFeatures = echarts.getMap(mapName).geoJson.features;
        myChart.hideLoading();
        mapFeatures.forEach(function (v) {
            // 地区名称
            var name = v.properties.name;
            // 地区经纬度
            geoCoordMap[name] = v.properties.cp;
            data.push({
                name: name,
                value: Math.round(Math.random() * 100 + 10)
            })
            // '房车', '旅行轿车', '轿跑车', '跑车', '敞篷车'
            toolTipData.push({
                name: name,
                value: [{
                    name: "房车",
                    value: Math.round(Math.random() * 100000 + 10) + '辆'
                },
                    {
                        name: "旅行轿车",
                        value: Math.round(Math.random() * 100000 + 10) + '辆'
                    },
                    {
                        name: "轿跑车",
                        value: Math.round(Math.random() * 100000 + 10) + '辆'
                    },
                    {
                        name: "跑车",
                        value: Math.round(Math.random() * 100000 + 10) + '辆'
                    }
                    ,
                    {
                        name: "敞篷车",
                        value: Math.round(Math.random() * 100000 + 10) + '辆'
                    }
                ]
            })
        });

        var max = 480,
            min = 9; // todo
        var maxSize4Pin = 50,
            minSize4Pin = 20;
        var convertData = function (data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var geoCoord = geoCoordMap[data[i].name];
                if (geoCoord) {
                    res.push({
                        name: data[i].name,
                        value: geoCoord.concat(data[i].value),
                    });
                }
            }
            return res;
        };

        option = {
            tooltip: {
                trigger: 'item',
                formatter: function (params) {
                    if (typeof(params.value)[2] == "undefined") {
                        var toolTiphtml = ''
                        for (var i = 0; i < toolTipData.length; i++) {
                            if (params.name == toolTipData[i].name) {
                                toolTiphtml += toolTipData[i].name + ':<br>'
                                for (var j = 0; j < toolTipData[i].value.length; j++) {
                                    toolTiphtml += toolTipData[i].value[j].name + ':' + toolTipData[i].value[j].value + "<br>"
                                }
                            }
                        }
                        return toolTiphtml;
                    } else {
                        var toolTiphtml = ''
                        for (var i = 0; i < toolTipData.length; i++) {
                            if (params.name == toolTipData[i].name) {
                                toolTiphtml += toolTipData[i].name + ':<br>'
                                for (var j = 0; j < toolTipData[i].value.length; j++) {
                                    toolTiphtml += toolTipData[i].value[j].name + ':' + toolTipData[i].value[j].value + "<br>"
                                }
                            }
                        }
                        return toolTiphtml;
                    }
                }
            },
            legend: {
                orient: 'vertical',
                y: 'bottom',
                x: 'right',
                data: ['credit_pm2.5'],
                textStyle: {
                    color: '#fff'
                }
            },
            visualMap: {
                show: false,
                min: 0,
                max: 600,
                left: 'left',
                top: 'bottom',
                text: ['高', '低'], // 文本，默认为数值文本
                calculable: true,
                seriesIndex: [1],
                inRange: {
                    color: ['#22e5e8', '#0035f9', '#22e5e8'] // 蓝绿

                }
            },
            /*工具按钮组*/
            toolbox: {
                show: false,
                orient: 'vertical',
                left: 'right',
                top: 'center',
                feature: {

                    dataView: {
                        readOnly: false
                    },
                    restore: {},
                    saveAsImage: {}
                }
            },
            geo: {
                show: true,
                map: mapName,
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                },
                roam: true,
                itemStyle: {
                    normal: {
                        areaColor: '#031525',
                        borderColor: '#097bba'
                    },
                    emphasis: {
                        areaColor: '#2B91B7'
                    }
                }
            },
            series: [{
                name: '散点',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertData(data),
                symbolSize: function (val) {
                    return val[2] / 10;
                },
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        color: 'rgba(255,255,0,0.8)'
                    }
                }
            },
                {
                    type: 'map',
                    map: mapName,
                    geoIndex: 0,
                    aspectScale: 0.75, //长宽比
                    showLegendSymbol: false, // 存在legend时显示
                    label: {
                        normal: {
                            show: true
                        },
                        emphasis: {
                            show: false,
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    },
                    roam: true,
                    itemStyle: {
                        normal: {
                            areaColor: '#031525',
                            borderColor: '#3B5077',
                        },
                        emphasis: {
                            areaColor: '#2B91B7'
                        }
                    },
                    animation: false,
                    data: data
                },
                {
                    name: '点',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    symbol: 'pin', //气泡
                    symbolSize: function (val) {
                        var a = (maxSize4Pin - minSize4Pin) / (max - min);
                        var b = minSize4Pin - a * min;
                        b = maxSize4Pin - a * max;
                        return a * val[2] + b;
                    },
                    label: {

                        normal: {
                            show: false,
                            formatter: function (params) {
                                return params.data.value[2]
                            },
                            textStyle: {
                                color: '#fff',
                                fontSize: 9,
                            }
                        }
                    },
                    itemStyle: {

                        normal: {
                            color: 'rgba(255,255,0,0)', //标志颜色
                        }
                    },
                    zlevel: 6,
                    data: convertData(data),
                },
                {
                    name: 'Top 5',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    data: convertData(data.sort(function (a, b) {
                        return b.value - a.value;
                    }).slice(0, 5)),
                    symbolSize: function (val) {
                        return val[2] / 10;
                    },
                    showEffectOn: 'render',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: true,
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: 'rgba(255,255,0,0.8)',
                            shadowBlur: 10,
                            shadowColor: '#05C3F9'
                        }
                    },
                    zlevel: 1
                },

            ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize();
        });

    }

    function echarts_3() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echarts_3'));
        $.ajax({
            url:"/func/rechargeCell",
            success:function (data) {
                option = {

                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        orient: 'vertical',
                        data: ['简易程序案件数']
                    },
                    grid: {
                        left: '3%',
                        right: '3%',
                        top: '8%',
                        bottom: '5%',
                        containLabel: true
                    },
                    color: ['#a4d8cc', '#25f3e6'],
                    toolbox: {
                        show: false,
                        feature: {
                            mark: {show: true},
                            dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },

                    calculable: true,
                    xAxis: [
                        {
                            type: 'category',

                            axisTick: {show: false},

                            boundaryGap: false,
                            axisLabel: {
                                textStyle: {
                                    color: '#ccc',
                                    fontSize: '12'
                                },
                                lineStyle: {
                                    color: '#2c3459',
                                },
                                interval: {default: 0},
                                rotate: 50,
                                formatter: function (params) {
                                    var newParamsName = "";// 最终拼接成的字符串
                                    var paramsNameNumber = params.length;// 实际标签的个数
                                    var provideNumber = 4;// 每行能显示的字的个数
                                    var rowNumber = Math.ceil(paramsNameNumber / provideNumber);// 换行的话，需要显示几行，向上取整
                                    /**
                                     * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
                                     */
                                    // 条件等同于rowNumber>1
                                    if (paramsNameNumber > provideNumber) {
                                        /** 循环每一行,p表示行 */
                                        var tempStr = "";
                                        tempStr = params.substring(0, 4);
                                        newParamsName = tempStr + "...";// 最终拼成的字符串
                                    } else {
                                        // 将旧标签的值赋给新标签
                                        newParamsName = params;
                                    }
                                    //将最终的字符串返回
                                    return newParamsName
                                }

                            },
                            data: ['0时', '1时', '2时', '3时', '4时', '5时', '6时', '7时', '8时', '9时', '10时', '11时', '12时', '13时', '14时', '15时', '16时', '17时'
                                , '18时', '19时', '20时', '21时', '22时', '23时']
                        }
                    ],
                    yAxis: {

                        type: 'value',
                        axisLabel: {
                            textStyle: {
                                color: '#ccc',
                                fontSize: '12',
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: 'rgba(160,160,160,0.3)',
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: 'rgba(160,160,160,0.3)',
                            }
                        },

                    }
                    ,
                    series: [
                        {
                            // name:'简易程序案件数',
                            type: 'line',
                            areaStyle: {

                                normal: {
                                    type: 'default',
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 0.8, [{
                                        offset: 0,
                                        color: '#25f3e6'
                                    }, {
                                        offset: 1,
                                        color: '#0089ff'
                                    }], false)
                                }
                            },
                            smooth: true,
                            itemStyle: {
                                normal: {areaStyle: {type: 'default'}}
                            },
                            data: data.dataList
                        }
                    ]
                };

                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
                window.addEventListener("resize", function () {
                    myChart.resize();
                });
            },
            dataType:"json",
            type:"post"
        });


    }

    function echarts_4() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echarts_4'));

        $.ajax({
            url: "/func/dangerousDriving",
            success: function (data) {
                console.log(data.dataList)
                option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{b}: <br/>  {c} ({d}%)"
                    },
                    toolbox: {
                        show: false,
                        feature: {
                            mark: {show: true},
                            dataView: {show: true, readOnly: false},
                            magicType: {
                                show: true,
                                type: ['pie', 'funnel']
                            },
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    calculable: true,
                    series: [
                        {
                            name: '排名',
                            type: 'pie',
                            color: ['#af89d6', '#f5c847', '#ff999a', '#0089ff', '#25f3e6'],
                            radius: [20, 100],
                            center: ['50%', '50%'],
                            roseType: 'area',
                            data: data.dataList
                        }
                    ]
                };

                myChart.setOption(option);
                window.addEventListener("resize", function () {
                    myChart.resize();
                });
            },
            dataType: "json",
            type: "post"
        });


    }

    function echarts_5() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echarts_5'));
        var xData = function () {
            var data = ['致命故障', '严重故障', '一般故障', '轻微故障'];
            return data;
        }();
        $.ajax({
            url :"/func/faultCarNum",
            success:function (d) {
                option = {
                    tooltip: {
                        show: "true",
                        trigger: 'item',
                        backgroundColor: 'rgba(0,0,0,0.4)', // 背景
                        padding: [8, 10], //内边距
                        // extraCssText: 'box-shadow: 0 0 3px rgba(255, 255, 255, 0.4);', //添加阴影
                        formatter: function (params) {
                            if (params.seriesName != "") {
                                return params.name + ' ：  ' + params.value + ' 辆';
                            }
                        },

                    },
                    grid: {
                        borderWidth: 0,
                        top: 20,
                        bottom: 35,
                        left: 55,
                        right: 30,
                        textStyle: {
                            color: "#fff"
                        }
                    },
                    xAxis: [{
                        type: 'category',

                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#363e83',
                            }
                        },
                        axisLabel: {
                            inside: false,
                            textStyle: {
                                color: '#bac0c0',
                                fontWeight: 'normal',
                                fontSize: '12',
                            },
                        },
                        data: xData,
                    }, {
                        type: 'category',
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            show: false
                        },
                        splitArea: {
                            show: false
                        },
                        splitLine: {
                            show: false
                        },
                        data: xData,
                    }],
                    yAxis: {
                        type: 'value',
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#32346c',
                            }
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: '#32346c ',
                            }
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#bac0c0',
                                fontWeight: 'normal',
                                fontSize: '12',
                            },
                            formatter: '{value}',
                        },
                    },
                    series: [{
                        // name: '生师比(%)',
                        type: 'bar',
                        itemStyle: {
                            normal: {
                                show: true,
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#00c0e9'
                                }, {
                                    offset: 1,
                                    color: '#3b73cf'
                                }]),
                                barBorderRadius: 50,
                                borderWidth: 0,
                            },
                            emphasis: {
                                shadowBlur: 15,
                                shadowColor: 'rgba(105,123, 214, 0.7)'
                            }
                        },
                        zlevel: 2,
                        barWidth: '20%',
                        data: d.dataList,
                    },
                        {
                            name: '',
                            type: 'bar',
                            xAxisIndex: 1,
                            zlevel: 1,
                            itemStyle: {
                                normal: {
                                    color: '#121847',
                                    borderWidth: 0,
                                    shadowBlur: {
                                        shadowColor: 'rgba(255,255,255,0.31)',
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowOffsetY: 2,
                                    },
                                }
                            },
                            barWidth: '20%'
                        }
                    ]
                }


                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
                window.addEventListener("resize", function () {
                    myChart.resize();
                });
            },
            dataType:"json",
            type:"post"
        });
        // var data = [1500, 2500, 3760, 85230]

    }

    function echarts_6() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echarts_6'));

        // 载货汽车、越野汽车、自卸汽车、牵引车、专用汽车、客车、轿车、半挂车
        //房车、旅行轿车、轿跑车、跑车、敞篷车
        var xData = function () {
            var data = ['房车', '旅行轿车', '轿跑车', '跑车','敞篷车'];

            return data;
        }();

        $.ajax({
            url :"/func/cellWarningNum",
            success:function (d) {
                option = {
                    // backgroundColor: "#141f56",
                    tooltip: {
                        show: "true",
                        trigger: 'item',
                        backgroundColor: 'rgba(0,0,0,0.4)', // 背景
                        padding: [8, 10], //内边距
                        // extraCssText: 'box-shadow: 0 0 3px rgba(255, 255, 255, 0.4);', //添加阴影
                        formatter: function (params) {
                            if (params.seriesName != "") {
                                return params.name + ' ：  ' + params.value + ' 辆';
                            }
                        },

                    },
                    grid: {
                        borderWidth: 0,
                        top: 20,
                        bottom: 35,
                        left: 55,
                        right: 30,
                        textStyle: {
                            color: "#fff"
                        }
                    },
                    xAxis: [{
                        type: 'category',

                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#363e83',
                            }
                        },
                        axisLabel: {
                            inside: false,
                            textStyle: {
                                color: '#bac0c0',
                                fontWeight: 'normal',
                                fontSize: '12',
                            },
                        },
                        data: xData,
                    }, {
                        type: 'category',
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            show: false
                        },
                        splitArea: {
                            show: false
                        },
                        splitLine: {
                            show: false
                        },
                        data: xData,
                    }],
                    yAxis: {
                        type: 'value',
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#32346c',
                            }
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: '#32346c ',
                            }
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#bac0c0',
                                fontWeight: 'normal',
                                fontSize: '12',
                            },
                            formatter: '{value}',
                        },
                    },
                    series: [{
                        // name: '生师比(%)',
                        type: 'bar',
                        itemStyle: {
                            normal: {
                                show: true,
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#00c0e9'
                                }, {
                                    offset: 1,
                                    color: '#3b73cf'
                                }]),
                                barBorderRadius: 50,
                                borderWidth: 0,
                            },
                            emphasis: {
                                shadowBlur: 15,
                                shadowColor: 'rgba(105,123, 214, 0.7)'
                            }
                        },
                        zlevel: 2,
                        barWidth: '20%',
                        data: d.dataList,
                    },
                        {
                            name: '',
                            type: 'bar',
                            xAxisIndex: 1,
                            zlevel: 1,
                            itemStyle: {
                                normal: {
                                    color: '#121847',
                                    borderWidth: 0,
                                    shadowBlur: {
                                        shadowColor: 'rgba(255,255,255,0.31)',
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowOffsetY: 2,
                                    },
                                }
                            },
                            barWidth: '20%'
                            // ,
                            // data: [150, 30, 30, 30]
                        }
                    ]
                }


                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
                window.addEventListener("resize", function () {
                    myChart.resize();
                });
            },
            dataType:"json",
            type:"post"
        });
        // var data = [1500, 2500, 3760, 85230]

    }

})

