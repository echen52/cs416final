async function loadData() {
          const data = await d3.csv("Data/RAPTOR_ALL_T20.csv");
          console.log(data);
    
   }

loadData();


function renderScene1(raw_data) {
    // var aggregatedData = aggregateData(raw_data);
    var aggregatedData = raw_data;
    var svg = d3.select("svg"),
        width = +svg.attr("width"),
        height = +svg.attr("height");

    // Define margins for the SVG
    var margin = { top: 50, right: 30, bottom: 100, left: 50 },
        chartWidth = width - margin.left - margin.right,
        chartHeight = height - margin.top - margin.bottom;

    var xScale = d3.scaleLinear()
        .domain([0, 7000])
        .range([0, chartWidth]);

    var yScale = d3.scaleLinear()
        .domain([0, 13])
        .range([chartHeight, 0]);

    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);


    // Draw the axes
    var chartGroup = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        chartGroup.append("text")
    .attr("transform", "rotate(-90)")  // To rotate the text and make it vertical
    .attr("y", -50)
    .attr("x", -chartHeight / 2)
    .attr("dy", "-3em")
    .style("text-anchor", "middle")
    .text("Energy");

    chartGroup.append("g")
        .attr("transform", "translate(0," + chartHeight + ")")
        .call(xAxis)
        .selectAll(".tick text")
        .attr("transform", "rotate(-45)")  // Rotates text by 45 degrees
        .style("text-anchor", "end")
        .attr("dx", "-0.5em")
        .attr("dy", "0.5em");

    chartGroup.append("g")
        .call(yAxis);

    // Draw the scatterplot
    chartGroup.selectAll("circle")
        .data(raw_data)
        .enter().append("circle")
        .attr("cx", d => xScale(d.mp)  // Align with center of band
        .attr("cy", d => yScale(d.raptor_total))
        .attr("r", 5)
        .style("fill", "#0077b6")
        .on("mouseover", function(event, d) {
            d3.select(this)
            .attr("r", 7)
            .style("fill", "#ff5733");

        // Add tooltip
        chartGroup.append("text")
            .attr("id", "tooltip")
            .attr("x", xScale(d.mp) + xScale.bandwidth() / 2)  // Center the tooltip text within the band
            .attr("y", yScale(d.raptor_total) - 15)
            .attr("text-anchor", "middle")
            .attr("font-family", "sans-serif")
            .attr("font-size", "11px")
            .attr("font-weight", "bold")
            .attr("fill", "black")
            .text(`WAR: ${d.war_total}`);
        })
        .on("mouseout", function(d) {
            d3.select(this)
            .attr("r", 5)
            .style("fill", "#0077b6");

        // Remove tooltip
        d3.select("#tooltip").remove();
        });

    // Add annotation
    const annotations = [{
        note: {
            label: "Hover over each point to see Wins Above Replacement.",
            title: "Note"
        },
        x: width / 2,
        y: margin.top / 2,
        dy: 0,
        dx: 0
    }];

    const makeAnnotations = d3.annotation()
        .annotations(annotations);

    svg.append("g")
        .attr("class", "annotation-group1")
        .call(makeAnnotations);
}


renderScene1(data);
