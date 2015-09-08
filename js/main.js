//Selecting an Element - Vanilla JS
$(document).ready(function(){
    var div = document.createElement("div");
    div.innerHTML = "Hello, world!";
    document.body.appendChild(div);
});

// Selecting an element with d3 and applying a style
$(document).ready(function(){
    var body = d3.select("body");
    body.style("color", "black");
    body.style("background-color", "green");
});

$(document).ready(function(){
    d3.selectAll("section")
        .attr("class", "special")
        .append("div")
        .html("Hello, world!");
});

// Storing a <section> as a variable so it can be modified later
var section = d3.selectAll("section");

section.append("div")
    .html("First");
section.append("div")
    .html("Second");

// Coding a bar chart

var data = [4, 8, 15, 16, 23, 42];
// 1. Establishing the data-join

// Short form code
/*d3.select(".chart")
    .selectAll("div")
        .data(data)
    .enter().append("div")
        .style("width", function(d) { return d * 10 + "px"; })
        .text(function(d) {return d; });*/

// Long code to understand
var chart = d3.select(".chart");

var bar = chart.selectAll("div");

// joining the data to the selection (bar)
var barUpdate = bar.data(data);

// instantiate missing "div" elements
var barEnter = barUpdate.enter().append("div");

// Scaling to fit, the magic number 10 to get the right bar width
var x = d3.scale.linear()
    .domain([0, d3.max(data)])
    .range([0,420]);

// dynamically setting the size of each bar based on its "joined" data value
barEnter.style("width", function(d) { return x(d) + "px"; });

// Enter the text for each bar graph
barEnter.text(function(d) { return d; });

// SVG Tutorial

// 1. Code here runs first, before download starts
d3.csv("data.csv", function(error, data) {
   // 3. Code here runs last after download finishes
});

// 2. Code here runs second while the file is downloading
var width = 420;
var barHeight = 20;

var x = d3.scale.linear()
    .range([0, width]);

var chart = d3.select(".chart")
    .attr("width", width);

d3.csv("data.csv", type, function(error, data) {
    x.domain([0, d3.max(data, function(d) {return d.value; })]);

    chart.attr("height", barHeight * data.length);

    var bar = chart.selectAll("g")
        .data(data)
        .enter().append("g")
        .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

    bar.append("rect")
        .attr("width", function(d) { return x(d.value); })
        .attr("height", barHeight - 1);

    bar.append("text")
        .attr("x", function(d) { return x(d.value) - 3; })
        .attr("y", barHeight / 2)
        .attr("dy", ".35em")
        .text(function(d) { return d.value; });
});

function type(d) {
    d.value = +d.value; // coerce to number
    return d;
}


// Using CSV files
//d3.csv("test.csv")
//    .row(function(d) { return { key: d.key, value: +d.value}; })
//    .get(function(error, rows) {console.log(rows); });
//
//d3.csv("test.csv", function(d) {
//   return {
//       year: new Date(+d.Year, 0, 1),
//       make: d.Make,
//       model: d.Model,
//       length: +d.Length
//   };
//}, function(error, rows) {
//        console.log(rows);
//});

