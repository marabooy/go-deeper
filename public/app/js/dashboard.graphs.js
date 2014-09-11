/**
 * Created by David Kaguma on 9/9/2014.
 */
//var accelerometer = dc.compositeChart('#chart');


//var speedChart = dc.lineChart('#speed');

//var gyroChart = dc.compositeChart('#gyro');


function populateGraphs(parentHref) {

    $.get(parentHref, function (data) {

        //var dtgFormat = d3.time.format("%Y-%m-%d %H:%M:%S:%L");
        //console.log(data);

        //preprocess data
        data.forEach(function (d) {
            //d.timestamp = dtgFormat.parse(d.timestamps.substr(0, 24));
            //console.log(d.timestamp);
            d.accelX = +d.accelerometer_x;
            d.accelY = +d.accelerometer_y;
            d.accelZ = +d.accelerometer_z;
            d.speed = +d.speed;
            d.gyroX = +d.gyroscope_x;
            d.gyroY = +d.gyroscope_y;
            d.gyroZ = +d.gyroscope_z;

        });

        console.log(data.shift());


        var cachedData, accelerometerChart;

        var accelerometerData = [];

        var x = {
            "name": "x",
            "type": "spline", showInLegend: true,
            "dataPoints": [], "color": 'rgb(255, 127, 14)'
        }
        var y = {
            "name": "y",

            "type": "spline",
            showInLegend: true,
            "dataPoints": [], "color": 'rgb(44, 160, 44)'
        };
        var z = {
            "name": "z",

            "type": "spline", showInLegend: true,
            "dataPoints": [], "color": 'rgb(119, 119, 255)'
        };





        var speedX = {
            "name": "speed",

            "type": "spline", "dataPoints": [], showInLegend: true,
            "color": 'rgb(255, 127, 14)'
        };

        var speedData = [speedX];
        var speedChart;


        //Gyroscope xone
        var gyroX = {
            "name": "x",
            "type": "spline", showInLegend: true,
            "dataPoints": [], "color": 'rgb(255, 127, 14)'
        }
        var gyroY = {
            "name": "y",

            "type": "spline",
            showInLegend: true,
            "dataPoints": [], "color": 'rgb(44, 160, 44)'
        };
        var gyroZ = {
            "name": "z",

            "type": "spline", showInLegend: true,
            "dataPoints": [], "color": 'rgb(119, 119, 255)'
        };

        accelerometerData = [x, y, z];
        function accelerometerCharts() {


            for (var i = 0; i < data.length; i++) {
                var time = new Date(data[i].timestamps);
                var xVal = +data[i].accelX;

                x.dataPoints.push({x: time, y: xVal});

                var yVal = +data[i].accelY;
                y.dataPoints.push({x: time, y: yVal});
                //
                var zVal = +data[i].accelZ;
                z.dataPoints.push({x: time, y: zVal});

            }


            accelerometerChart = new CanvasJS.Chart("chart",
                {
                    zoomEnabled: true,
                    title: {
                        text: "Accelerometer"
                    },
                    data: accelerometerData
                });

            accelerometerChart.render();

        }


        function drawSpeed() {
            for (var i = 0; i < data.length; i++) {
                var time = new Date(data[i].timestamps);

                var speed = +data[i].speed;
                //console.log(speed);
                speedX.dataPoints.push({x: time, y: speed});
            }


            speedChart = new CanvasJS.Chart("speed",
                {
                    zoomEnabled: true,
                    title: {
                        text: "Speed"
                    },
                    data: speedData
                });

            speedChart.render();

        }




        gyroScopeData = [gyroX, gyroY, gyroZ];
        function gyroScopeCharts() {


            for (var i = 0; i < data.length; i++) {
                var time = new Date(data[i].timestamps);
                var xVal = +data[i].gyroX;

                gyroX.dataPoints.push({x: time, y: xVal});

                var yVal = +data[i].gyroY;
                gyroY.dataPoints.push({x: time, y: yVal});
                //
                var zVal = +data[i].gyroZ;
                gyroZ.dataPoints.push({x: time, y: zVal});

            }


            gyroScopeChart = new CanvasJS.Chart("gyro",
                {
                    zoomEnabled: true,
                    title: {
                        text: "GyroScope"
                    },
                    data: gyroScopeData
                });

            gyroScopeChart.render();

        }

        drawSpeed();
        accelerometerCharts();
        gyroScopeCharts();
    });

}


