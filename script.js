async function init() {

var margin = {top: 50, right: 50, bottom: 50, left: 50},
width = 300 - margin.left - margin.right,
height = 300 - margin.top - margin.bottom;

var x = d3.scaleLog().base(10).domain([10,150]).range([0, width]);
var y = d3.scaleLog().base(10).domain([10,150]).range([height, 0]);

const data = await d3.csv('https://flunky.github.io/cars2017.csv');
console.log(data);


d3.select('svg')
.append('g')
.attr("transform","translate(" + margin.left + "," + margin.top + ")")
.selectAll('circle')
.data(data)
.enter()
.append('circle')
.attr("cx", function(d) {return x(parseInt(d.AverageCityMPG)); })
.attr("cy", function(d) {return y(parseInt(d.AverageHighwayMPG));})
.attr("r", function(d) {return 2+parseInt(d.EngineCylinders);});

d3.select("svg").append("g")
.attr("transform","translate(" + margin.left + "," + margin.top + ")")
.call(d3.axisLeft(y).tickValues([10, 20, 50, 100])
.tickFormat( function(d) {
return d;
}));

d3.select("svg").append("g")
.attr("transform","translate(" + margin.left + "," + (height + margin.top) + ")")
.call(d3.axisBottom(x).tickValues([10, 20, 50, 100])
.tickFormat((d, i) => ['10', '20', '50', '100'][i]));

}
