
// --------------------------------------------------------------------------------//
// SETUP --------------------------------------------------------------------------//
// --------------------------------------------------------------------------------//

// Retrieve the scenes
var scene1 = d3.select('#scene1')
var scene2 = d3.select('#scene2')
var scene3 = d3.select('#scene3')

// constants
var width = 900
var height = 900

var margin = { top: 10, right: 100, bottom: 50, left: 50 },
width = 1000 - margin.left - margin.right,
height = 1000 - margin.top - margin.bottom;

// axis definition
// var x = d3.scaleBand()
// .domain([10, 20, 30, 40, 50])
// .range([0, width]);
//
//
//
// var y = d3.scaleLinear()
// .domain([0, 120])
// .range([height, 0]);
//
// var xAxis = d3.axisBottom()
// .scale(x)
// .ticks(5);
//
// var yAxis = d3.axisLeft()
// .scale(y)
// .ticks(10);


var scatter_tooltip = d3.select("body")
.append("div")
.append("div")
.style("opacity", 0)
.attr("class", "tooltip")
.style("background-color", "black")
.style("border-radius", "5px")
.style("padding", "15px")
.style("color", "white")

var bar_tooltip = d3.select("body")
.append("div")
.append("div")
.style("opacity", 0)
.attr("class", "tooltip")
.style("background-color", "black")
.style("border-radius", "5px")
.style("padding", "15px")
.style("color", "white")


// --------------------------------------------------------------------------------//
// SCENE ONE ----------------------------------------------------------------------//
// --------------------------------------------------------------------------------//

scene1.append('text')
.attr('x', -500)
.attr('y', 15)
.attr('transform', 'rotate(-90)')
.attr('text-anchor', 'middle')
.text('Offensive Rating')

scene1.append('text')
.attr('x', 500)
.attr('y', 1050)
.attr('text-anchor', 'middle')
.text('Defensive Rating')




async function load1() {
  d3.csv("Data/NBA_24_team.csv").then(function (data_given) {


    var scatterScaleX = d3.scaleLinear()
    .range([0, width])
    .domain([-10, 10])


    var scatterScaleY = d3.scaleLinear()
    .range([height, 0])
    .domain([-10, 10])

    var xAxis1 = d3.axisBottom(scatterScaleX)
    var yAxis1 = d3.axisLeft(scatterScaleY)

    var scatterColor = d3.scaleLinear()
    .domain([-12,12])
    .range(["#FF6347","#90ee90"]);

    var ratings = ["Good Net Rating", "Poor Net Rating" ]
    var scatterColorOrdinal = d3.scaleOrdinal()
    .domain(ratings)
    .range(["#90ee90", "#FF6347"]);


    // Legend
    var size = 30
    scene1.selectAll("legend")
    .data(ratings)
    .enter()
    .append("rect")
    .attr("x", 800)
    .attr("y", function (d, i) { return 200 + i * (size + 5) })
    .attr("width", size)
    .attr("height", size)
    .attr("stroke", "black")
    .style("fill", function (d) { return scatterColorOrdinal(d) })


    scene1.selectAll("labels")
    .data(ratings)
    .enter()
    .append("text")
    .attr("x", 800 + size * 1.2)
    .attr("y", function (d, i) { return 200 + i * (size + 5) + (size / 2) })
    .style("fill", function (d) { return "black" })
    .text(function (d) { return d })
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle")


    scene1.append("g")
    .attr("transform", "translate(50,950)")
    .attr("class", "axis")
    .call(xAxis1)
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-30)")
    .style("text-anchor", "end")

    scene1.append("g")
    .attr("transform", "translate(50,20)")
    .attr("class", "axis")
    .call(yAxis1)

    scene1.selectAll("circle")
    .data(data_given)
    .enter().append("circle")
    .attr("cx", d => scatterScaleX (d.D_REL) )  // Align with center of band
    .attr("cy", d => scatterScaleY(d.O_REL))
    .attr("r", 15)
    .style("fill", d => scatterColor (d.NET_RTG))
    .on("mouseover", function (d) {
      scatter_tooltip.transition()
      .duration(200)
      .style("opacity", .9);
      scatter_tooltip.html(d.Team)
      .style("left", (d3.event.pageX) + "px")
      .style("top", (d3.event.pageY - 28) + "px");
    })
    .on("mouseout", function (d) {
      scatter_tooltip.transition()
      .duration(500)
      .style("opacity", 0);
    });


    // Scene 1 Annotation
    scene1.append('rect')
    .attr("x", 650)
    .attr("y", 550)
    .attr("width", 375)
    .attr("height", 80)
    .style("fill", 'lightgray')

    scene1.append('text')
    .attr("x", 660)
    .attr("y", 570)
    .attr("width", 60)
    .attr("height", 50)
    .style("fill", 'black')
    .text("Teams with high net rating are good at offense")
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle")

    scene1.append('text')
    .attr("x", 660)
    .attr("y", 590)
    .attr("width", 60)
    .attr("height", 50)
    .style("fill", 'black')
    .text("and defense; the opposite is true for bad net")
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle")

    scene1.append('text')
    .attr("x", 660)
    .attr("y", 610)
    .attr("width", 60)
    .attr("height", 50)
    .style("fill", 'black')
    .text("rating teams.")
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle")





  })
}






// --------------------------------------------------------------------------------//
// SCENE TWO ----------------------------------------------------------------------//
// --------------------------------------------------------------------------------//

// axis definition
var x2 = d3.scaleBand()
.domain([0, 30])
.range([0, width]);



var y2 = d3.scaleLinear()
.domain([10, 18])
.range([height, 0]);

var xAxis2 = d3.axisBottom()
.scale(x2)
.ticks(0);

var yAxis2 = d3.axisLeft()
.scale(y2)
.ticks(9);




var teams = ["Atlanta Hawks",
"Boston Celtics",
"Brooklyn Nets",
"Charlotte Hornets",
"Chicago Bulls",
"Cleveland Cavaliers",
"Dallas Mavericks",
"Denver Nuggets",
"Detroit Pistons",
"Golden State Warriors",
"Houston Rockets",
"Indiana Pacers",
"Los Angeles Clippers",
"Los Angeles Lakers",
"Memphis Grizzlies",
"Miami Heat",
"Milwaukee Bucks",
"Minnesota Timberwolves",
"New Orleans Pelicans",
"New York Knicks",
"Oklahoma City Thunder",
"Orlando Magic",
"Philadelphia 76ers",
"Phoenix Suns",
"Portland Trail Blazers",
"Sacramento Kings",
"San Antonio Spurs",
"Toronto Raptors",
"Utah Jazz",
"Washington Wizards"];

var o_3P = ["13.6",
"16.8",
"13.6",
"12.4",
"11.7",
"13.8",
"14.6",
"12",
"11",
"14.8",
"12.7",
"13",
"13",
"11.6",
"13.2",
"12.9",
"14.1",
"12.9",
"12.7",
"13.8",
"13.2",
"11.3",
"12.3",
"12.6",
"11.7",
"14.4",
"12.4",
"11.5",
"12.9",
"12"]


var d_3P = ["13.9",
"13.2",
"13.3",
"14",
"14.9",
"12.8",
"13.1",
"11.6",
"12.1",
"13.3",
"12.4",
"10.5",
"13.2",
"14",
"13.6",
"13.4",
"12.5",
"11.7",
"13.8",
"13.1",
"13.4",
"11.8",
"12.2",
"13.3",
"11.9",
"13.1",
"12.4",
"13.7",
"14.8",
"11.9"];


scene2.append("g")
.attr("transform", "translate(50,20)")
.attr("class", "axis")
.call(yAxis2);


// axis labels
scene2.append('text')
.attr('x', -500)
.attr('y', 15)
.attr('transform', 'rotate(-90)')
.attr('text-anchor', 'middle')
.text('3 Pointers')

scene2.append('text')
.attr('x', 500)
.attr('y', 1075)
.attr('text-anchor', 'middle')
.text('Teams')





async function load2() {
  d3.csv("Data/NBA_24_team.csv").then(function (data_given) {


    var teamScale = d3.scaleBand()
    .range([0, width])
    .domain(data_given.map(function (d) { return d.Team; }))

    var teamAxis = d3.axisBottom()
    .scale(teamScale)
    .ticks(5);

    scene2.append("g")
    .attr("transform", "translate(50,950)")
    .attr("class", "axis")
    .call(teamAxis)
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-50)")
    .style("text-anchor", "end");


    scene2.selectAll("mybar")
    .data(data_given)
    .enter()
    .append("rect")
    .attr("x", function (d, i) { return margin.left + teamScale(teams[i]); })
    .attr("y", function (d, i) { return y2(o_3P[i]) + 10; })
    .attr("width", teamScale.bandwidth() - 10)
    .attr("height", function (d, i) { return height - y2(o_3P[i]); })
    .attr("fill", "#1E90FF").on("mouseover", function (d, i) {
      bar_tooltip.transition()
      .duration(200)
      .style("opacity", .9);
      bar_tooltip.html(teams[i])
      .style("left", (d3.event.pageX) + "px")
      .style("top", (d3.event.pageY - 28) + "px");
    })
    .on("mouseout", function (d) {
      bar_tooltip.transition()
      .duration(500)
      .style("opacity", 0);
    });
  })
}


// Scene 2 Annotation

scene2.append('text')
.attr("x", 660)
.attr("y", 170)
.attr("width", 60)
.attr("height", 50)
.style("fill", 'black')
.text("Large variance in 3-point shots made and ")
.attr("text-anchor", "left")
.style("alignment-baseline", "middle")

scene2.append('text')
.attr("x", 660)
.attr("y", 190)
.attr("width", 60)
.attr("height", 50)
.style("fill", 'black')
.text("allowed show the differences between teams ")
.attr("text-anchor", "left")
.style("alignment-baseline", "middle")

scene2.append('text')
.attr("x", 660)
.attr("y", 210)
.attr("width", 60)
.attr("height", 50)
.style("fill", 'black')
.text("with player skills and coaching.")
.attr("text-anchor", "left")
.style("alignment-baseline", "middle")





// This function is called by the buttons on top of the plot
function change(setting) {
  if (setting === "O_3P") {
    scene2.selectAll("rect")
    .transition()
    .duration(2000)
    .attr("fill", "#1E90FF")
    .attr("y", function (d, i) { return y2(o_3P[i]) + 10; })
    .attr("height", function (d, i) { return height - y2(o_3P[i]); })
  } else {
    scene2.selectAll("rect")
    .transition()
    .duration(2000)
    .attr("fill", "#FF6347")
    .attr("y", function (d, i) { return y2(d_3P[i]) + 10; })
    .attr("height", function (d, i) { return height - y2(d_3P[i]); })
  }
}

// --------------------------------------------------------------------------------//
// SCENE THREE --------------------------------------------------------------------//
// --------------------------------------------------------------------------------//





async function load3() {
  d3.csv("Data/NBA_24_team.csv").then(function (data) {

    var scatterScaleX = d3.scaleLinear()
    .range([0, width])
    .domain([-10, 10])


    var scatterScaleY = d3.scaleLinear()
    .range([height, 0])
    .domain([-10, 10])

    var xAxis3 = d3.axisBottom(scatterScaleX)
    var yAxis3 = d3.axisLeft(scatterScaleY)

    var radiusScale = d3.scaleLinear()
    .range([10, 50])
    .domain([10, 18])

    var defColorScale = d3.scaleLinear()
    .range(["#90ee90", "#FF6347"])
    .domain([10, 15])


    scene3.append('text')
    .attr('x', -500)
    .attr('y', 15)
    .attr('transform', 'rotate(-90)')
    .attr('text-anchor', 'middle')
    .text('Offensive Rating')

    scene3.append('text')
    .attr('x', 500)
    .attr('y', 1050)
    .attr('text-anchor', 'middle')
    .text('Defensive Rating')



    scene3.append("g")
    .attr("transform", "translate(50,950)")
    .attr("class", "axis")
    .call(xAxis3)
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-30)")
    .style("text-anchor", "end")

    scene3.append("g")
    .attr("transform", "translate(50,20)")
    .attr("class", "axis")
    .call(yAxis3)





    var d_3P_labels= ["Low # of Opp 3s", "High # of Opp 3s" ]
    var d_3P_ColorOrdinal = d3.scaleOrdinal()
    .domain(d_3P_labels)
    .range(["#90ee90", "#FF6347"]);



    var size = 30
    scene3.selectAll("legend")
    .data(d_3P_labels)
    .enter()
    .append("rect")
    .attr("x", 800)
    .attr("y", function (d, i) { return 200 + i * (size + 5) })
    .attr("width", size)
    .attr("height", size)
    .attr("stroke", "black")
    .style("fill", function (d) { return d_3P_ColorOrdinal(d) })


    scene3.selectAll("labels")
    .data(d_3P_labels)
    .enter()
    .append("text")
    .attr("x", 800 + size * 1.2)
    .attr("y", function (d, i) { return 200 + i * (size + 5) + (size / 2) })
    .style("fill", function (d) { return "black" })
    .text(function (d) { return d })
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle")






    // Scene 3 Annotation
    scene3.append('rect')
    .attr("x", 650)
    .attr("y", 550)
    .attr("width", 360)
    .attr("height", 110)
    .style("fill", 'lightgray')

    scene3.append('text')
    .attr("x", 660)
    .attr("y", 570)
    .attr("width", 60)
    .attr("height", 50)
    .style("fill", 'black')
    .text("More larger points above league average")
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle")

    scene3.append('text')
    .attr("x", 660)
    .attr("y", 590)
    .attr("width", 60)
    .attr("height", 50)
    .style("fill", 'black')
    .text("line shows relationship between 3-pointers")
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle")

    scene3.append('text')
    .attr("x", 660)
    .attr("y", 610)
    .attr("width", 60)
    .attr("height", 50)
    .style("fill", 'black')
    .text("and offensive efficiency; however, there is no")
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle")
    scene3.append('text')
    .attr("x", 660)
    .attr("y", 630)
    .attr("width", 60)
    .attr("height", 50)
    .style("fill", 'black')
    .text("clear color trend on sides of league average")
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle")
    scene3.append('text')
    .attr("x", 660)
    .attr("y", 650)
    .attr("width", 60)
    .attr("height", 50)
    .style("fill", 'black')
    .text("defense line. ")
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle")



    scene3.append('g')
    .selectAll("dots")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function (d) {return scatterScaleX(d.D_REL); })

    .attr("cy", function (d) {return scatterScaleY(d.O_REL); })

    .attr("r", function (d) { return radiusScale(d.O_3P); })
    .style("fill", function (d) { return defColorScale(d.D_3P); })
    .style("opacity", .9)
    .attr("stroke", "black")
    .on("mouseover", function (d) {
      scatter_tooltip.transition()
      .duration(200)
      .style("opacity", .9);
      scatter_tooltip.html(d.Team)
      .style("left", (d3.event.pageX) + "px")
      .style("top", (d3.event.pageY - 28) + "px");
    })
    .on("mouseout", function (d) {
      scatter_tooltip.transition()
      .duration(500)
      .style("opacity", 0);
    });
  })
}
