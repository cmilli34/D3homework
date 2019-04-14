// @TODO: YOUR CODE HERE!
// from activity 2 lesson 3
var svgWidth = 1000;
var svgHeight = 700;

var margin = {
  top: 20,
  right: 40,
  bottom: 100,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;


// Append a div to the body to create tooltips, assign it a class
//var div = d3.select(".chart").append("div").attr("class", "tooltip").style("opacity", 0);

var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

var chosenXAxis = "Obesity"

function xScale(newsData, chosenXAxis) {

var xScale(newsData, d3.scaleLinear()
    .domain([d3.min(newsData, d => d[chosenXAxis])* 0.8,
    d3.max(newsData, d => d[chosenXAxis]) * 1.2
])
.range([0, width]);

return xLinearScale;

}

//make the axis transitionable
function renderAxes(newXScale, xAxis) {
var bottomAxis = d3.axisBottom(newXScale);

xAxis.transition()
    .duration(1000)
    .call(bottomAxis);

return xAxis;
}

//function for updating circles when x-axis changes

function renderCircles(circlesGroup, newXScale, chosenXAxis) {

    circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenXAxis]));

    return circlesGroup;
}

function updateToolTip(chosenXAxis, circlesGroup) {

    if (chosenXAxis === "income") {
    var label = "Obesity"
    }
    else {
    var label = "Smokes"
    }
    var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function(d) {
        return (`${d.obesity}<br>${label} ${d[chosenXAxis]}`);
    });

    circlesGroup.call(toolTip);

    circlesGroup.on("mouseover", function(data) {
    toolTip.show(data);
    })

    .on("mouseout", function(data, index){
    toolTip.hide(data);
    });

return circlesGroup;
}
//read in the csv data:

d3.csv('data.csv', function(error, newsData) {
    if(error) throw err;


    //convert non-string values to numeric. Learned a lot of this from 2-03-Par_BarChart_From_CSV app.js
    // initialize data points we're using

    newsData.forEach(function(data) {
        data.income = +data.income;
        data.obesity = +data.obesity;
        data.smokes = +data.smokes;
    });

    var yLinearScale = xScale(newsData, chosenXAxis);
    var xLinearScale = d3.scaleLinear()
    .domain([0, d3.max(newsData, d => d.income)])
    .range([height, 0]);;

    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    var xAxis = chartGroup.append("g")
    .classed("x-axis", true)
    .attr("transform"`translate(0, ${height})`)
    .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    // append initial circles
    var circlesGroup = chartGroup.selectAll("circle")
    .data(hairData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d[chosenXAxis]))
    .attr("cy", d => yLinearScale(d.income))
    .attr("r", 20)
    .attr("fill", "pink")

    var labelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${width / 2}, ${height + 20})`);
    
    var obesityLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 0)
    .attr("value", "income")
    .classed("active", true)
    .text("Obesity");

    var incomeLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 40)
    .attr("value", "income")
    .classed("inactive", true)
    .text("Income");

    chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height/2))
    .attr("dy", "1em")
    .classed("axis-text", true)
    .text("Chart");

    var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

    labelsGroup.selectAll("text")
    .on("click", function() {
    var value = d3.select(this).attr("value");
    if (value != chosenXAxis) {
        chosenXAxis = value;

        xLinearScale = xScale(newsData, chosenXAxis);

        xAxis = renderAxes(xLinearScale, xAxis);

        circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);

        circlesGroup = updateToolTip(chosenXAxis, circlesGroup)

        if (chosenXAxis == "income") {
            incomeLabel
            .classed("active", true)
            .classed("inactive", false);

            obesityLabel
            .classed("active", true)
            .classed("inactive", false);
        }

        else{
            incomeLabel
            .classed("active", true)
            .classed("inactive", false);

            obesityLabel
            .classed("active", true)
            .classed("inactive", false);

        }     
    }
    });

});


