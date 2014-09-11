/**
 * Created by David Kaguma on 9/11/2014.
 */


//slice and dice the data to fit the requirements
var lastIndex = 0;
var range = 0;
var maxIndex = geoJson._source.geometry.coordinates.length;
var properties = geoJson._source.properties;
console.log(geoJson);
var timeLine = [];

var timeDimensionLength = 0;

var deltas = [];
function chunk() {

    lastIndex = range;
    for (var i = lastIndex; (timeDimensionLength < 3000 && i<2000); i++) {
        range++;
        var delta = properties.cumulative_time[i + 1] - properties.cumulative_time[i];
        console.log(delta, "delta");

        deltas.push(delta);
        timeDimensionLength += delta;
    }
}

function fillUp() {
    var x = [];

    for (var i = lastIndex; i < range; i++) {
        var time = moment(properties.timestamps[i]);
        x.push({x: time.unix(), y: +properties.accelerometer_x[i]})
    }

    return cachedData =
        [
            {
                values: x,      //values - represents the array of {x,y} data points
                key: 'Sine Wave', //key  - the name of the series.
                color: '#ff7f0e'  //color - optional: choose your own line color.
            }
        ]
}
var cachedData, accelerometerChart;

var accelerometerData = [];

var x = {"type": "spline", "dataPoints": [], "color": 'rgb(255, 127, 14)'}
var y = {"type": "spline", "dataPoints": [], "color": 'rgb(44, 160, 44)'};
var z = {"type": "spline", "dataPoints": [], "color": 'rgb(119, 119, 255)'};
marker = {"type": "spline", dataPoints: [], color: "#00000"};


var speedX=

accelerometerData = [x, y, z, marker];
function accelerometerCharts() {


    for (var i = lastIndex; i < range; i++) {
        var time = new Date(properties.timestamps[i]);
        timeLine.push(time);
        var xVal = +properties.accelerometer_x[i];
        x.dataPoints.push({x: time, y: xVal});

        var yVal = +properties.accelerometer_y[i];
        y.dataPoints.push({x: time, y: yVal});

        var zVal = +properties.accelerometer_z[i];
        z.dataPoints.push({x: time, y: zVal});

    }


    accelerometerChart = new CanvasJS.Chart("chart",
        {
            title: {
                text: "Accelerometer"
            },
            data: accelerometerData
        });

    accelerometerChart.render();

}


function drawSpeed(){

}


function drawNew() {
    accelerometerCharts();
}


function updateChart() {


}

function schedule() {
    var delta=0;
    if (deltas.length == 0) {
        x.dataPoints.length=0;
        y.dataPoints.length=0;
        z.dataPoints.length=0;
        chunk();
        //console.log(deltas.length);
        drawNew();
    }
    else {
        delta= deltas.shift();

        timeDimensionLength -=delta;
        var time = timeLine.shift();
        marker.dataPoints.shift();
        marker.dataPoints.shift();
        marker.dataPoints.push({x: time, y: 20});
        marker.dataPoints.push({x: time, y: -20});
        accelerometerChart.render()
    }

    requestAnimationFrame(schedule,delta);
}

requestAnimationFrame(schedule);

//discover images and videos if they exist