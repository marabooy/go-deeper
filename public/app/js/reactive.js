/**
 * Created by David Kaguma on 9/11/2014.
 */


//slice and dice the data to fit the requirement

var timeDimensionLength = 0;


var accelerometerChart;

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
marker = {
    "type": "spline",
    dataPoints: [], color: "#00000"
};


var speedX = {
    "name": "speed",

    "type": "spline", "dataPoints": [], showInLegend: true,
    "color": 'rgb(255, 127, 14)'
};
var speedMarker = {"type": "spline", "dataPoints": [], "color": '#00000'};

var speedData = [speedX, speedMarker];
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

var gyroMarker = {"type": "spline ", "dataPoints": [], "color": '#00000'};

accelerometerData = [x, y, z, marker];
function accelerometerCharts() {


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


    speedChart = new CanvasJS.Chart("speed",
        {
            title: {
                text: "Speed"
            },
            data: speedData
        });

    speedChart.render();

}


gyroScopeData = [gyroX, gyroY, gyroZ, gyroMarker];
function gyroScopeCharts() {


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

var speedometer;
function drawSpeedometer() {

    speedometer = new JustGage({id: 'speedometer', 'value': 0,"label":"Magnitude of Y",gaugeWidthScale:0.4,refreshAnimationTime:50,max:30});

}


function initCharts() {
    accelerometerCharts();
    //drawSpeed();
    drawSpeedometer();
    gyroScopeCharts()
}




function fillUp(data) {

    var date = new Date(data[31]);
    console.log(date);
    //accelerometer stuff
    x.dataPoints.push({y: +data[6], x: date});
    y.dataPoints.push({y: +data[7], x: date});
    z.dataPoints.push({y: +data[8], x: date});


    gyroX.dataPoints.push({y: +data[9], x: date});
    gyroY.dataPoints.push({y: +data[10], x: date});
    gyroZ.dataPoints.push({y: +data[11], x: date});

    var xVal = Math.abs(+data[7]);

    speedometer.refresh(xVal)

    if (x.dataPoints.length > 50) {
        x.dataPoints.shift();
        y.dataPoints.shift();
        z.dataPoints.shift();

        gyroX.dataPoints.shift();
        gyroY.dataPoints.shift();
        gyroZ.dataPoints.shift();
    }


        //mesh.rotation.x = +data[16];
        //mesh.rotation.y = +data[17];
        //mesh.rotation.z = +data[18];




    requestAnimationFrame(function () {
        gyroScopeChart.render();
        accelerometerChart.render();
        //renderer.render(scene, camera);

    });

}