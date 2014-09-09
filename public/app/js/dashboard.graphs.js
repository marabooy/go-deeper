/**
 * Created by David Kaguma on 9/9/2014.
 */
var accelerometer = dc.compositeChart('#chart');


var speedChart = dc.lineChart('#speed');

var gyroChart = dc.compositeChart('#gyro');


function populateGraphs(parentHref) {

    $.get(parentHref, function (data) {

        var dtgFormat = d3.time.format("%Y-%m-%d %H:%M:%S:%L");
        //console.log(data);

        //preprocess data
        data.forEach(function (d) {
            d.timestamp = dtgFormat.parse(d.timestamps.substr(0, 24));
            //console.log(d.timestamp);
            d.accelX = +d.accelerometer_x;
            d.accelY = +d.accelerometer_y;
            d.accelZ = +d.accelerometer_z;
            d.speed = +d.speed;
            d.gyroX = +d.gyroscope_x;
            d.gyroY = +gyroscope_y;
            d.gyroZ = +gyroscope_z;

        });

        var facts = new crossfilter(data);
        var allFacts = facts.groupAll();


        var timeDimesion = facts.dimension(function (d) {

            return Math.ceil(d.timestamp / 100) * 100;
        });


        var axelY = timeDimesion.group().reduceSum(function (d) {
            return d.accelY / 2;
        })

        var axelX = timeDimesion.group().reduceSum(function (d) {
            return d.accelX / 2;
        });

        var axelZ = timeDimesion.group.reduceSum(function (d) {
            return d.accelZ / 2;

        })


        var start = Date.parse(data[0].timestamps);
        var end = Date.parse(data[data.length - 1].timestamps);
        console.log("start", start, end);

        accelerometer.width(400).height(200).margins({top: 10, right: 10, bottom: 20, left: 40})
            .dimension(timeDimesion)
            .transitionDuration(500)
            .elasticY(true).
            brushOn(true)
            .valueAccessor(function (d) {
                return d.value;
            })
            .mouseZoomable(true)
            .x(d3.time.scale().domain([start, end])) // scale and domain of the graph
            .compose([
                dc.lineChart(accelerometer).group(axelY).ordinalColors(["#F57F6D"]),
                dc.lineChart(accelerometer).group(axelX)
            ]).renderLabel(true)

            .xAxis();

     speedChart.width(200).height(100).dimension(timeDimesion).group(speedGroup)
         .x(d3.time.scale().domain([start, end])).xAxis();


        dc.renderAll();


    });

}


