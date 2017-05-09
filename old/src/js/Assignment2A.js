    //Width and height
    var padding = 50;
    w = 1000;
    h = 500;

    //Create SVG element
    var svg = d3.select("#vis1")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    var data2003 = "dataWeek703.csv";
    var data2015 = "dataWeek715.csv";
    var currentLoad = data2003;
    var year = d3.select("#year");

    // Your beautiful D3 code will go here
    var dataset = [];
    var color = ["#818DC5", "#A181C5", "#C581C0", "#C5818C", "#C59A81", "#C5C381", "#89C167", "#67C184", "#67C1B3", "#696969"];
    var coord = [];
    var xScale;
    var yScale;
    var rScale;
    var dist = [];

    d3.csv(currentLoad, function(data) {
        dataset = data;
        for (var i = 0; i < dataset.length; i++) {
            coord.push([parseInt(dataset[i].prostitution), parseInt(dataset[i].vehicle), parseInt(dataset[i].total), dataset[i].pdDistrict]);
        }
        makeCharts();
    });

    // Geberate the chart
    function makeCharts() {
        //Create scale functions
        xScale = d3.scale.linear()
            .domain([0, d3.max(coord, function(d) {
                return d[0];
            })])
            .range([padding * 2, w - padding * 2]);

        yScale = d3.scale.linear()
            .domain([0, d3.max(coord, function(d) {
                return d[1];
            })])
            .range([h - padding, padding]);

        rScale = d3.scale.linear()
            .domain([0, d3.max(coord, function(d) {
                return d[2];
            })])
            .range([5, 20]);


        // Create Circles
        svg.selectAll("circle")
            .data(coord)
            .enter()
            .append("circle")
            .attr("cx", function(d) {
                return xScale(d[0]);
            })
            .attr("cy", function(d) {
                return yScale(d[1]);
            })
            .attr("r", function(d) {
                return Math.sqrt(rScale(d[2])) * 5; // Area show and scale by 5;
            })
            .attr("fill", function(d, i) {
                return color[i];
            })
            .on("mouseover", function(d) {
                //Update the tooltip position and value
                d3.select("#tooltip")
                    .style("left", (d3.event.pageX - 34) + "px")
                    .style("top", (d3.event.pageY - 30) + "px")
                    .style("opacity", 1)
                    .html("<br><strong>DISTRICT: </strong>" + d[3] + "<br><strong>TOTAL CRIME: </strong>" + d[2] + "<br><strong>PROSTITUTION: </strong>" +
                        d[0] + "<br><strong>VECHILE CRIMES: </strong>" + d[1])
                //Show the tooltip
                d3.select("#tooltip")
                    .classed("hidden", false);
            })
            .on("mouseout", function() {
                //Hide the tooltip
                d3.select("#tooltip")
                    .classed("hidden", true);
            });

        //Define X axis
        var xAxis = d3.svg.axis()
            .scale(xScale)
            .orient("bottom")
            .ticks(10);
        //Define Y axis
        var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left")
            .ticks(10);

        //Create X axis
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + (h - padding) + ")")
            .call(xAxis);

        // Create Y axis
        svg.append('g')
            .attr('class', 'axis')
            .attr("transform", "translate(" + padding + ",0)")
            .call(yAxis);

          // Create X Label
        svg.append("text")
            .attr("x", w - padding)
            .attr("y", (h - padding) - 4) //set your y attribute here
            .style("text-anchor", "end")
            .attr("font-weight", "bold")
            .style("font-size", "15px")
            .text("PROSTITUTION");

            // Create Y Label
        svg.append("text")
            .attr("class", "label")
            .attr("transform", "rotate(-90)")
            .attr("x", 0)
            .attr("y", 65)
            .attr("font-weight", "bold")
            .style("text-anchor", "end")
            .style("font-size", "15px")
            .text("VEHICLE THEFT");


        //On click, update with new data
        d3.select("#vis1")
            .on("click", function() {
                var coordUp = [];

                if (currentLoad == data2003) {
                    year.html("Showing Data for  2015");
                    currentLoad = data2015;
                } else {
                    currentLoad = data2003;
                    year.html("Showing Data for  2003");
                }
                // Load alternative year data
                d3.csv(currentLoad, function(data) {
                    dataset = data;
                    for (var i = 0; i < dataset.length; i++) {
                        // Store data in array
                        coordUp.push([parseInt(dataset[i].prostitution), parseInt(dataset[i].vehicle), parseInt(dataset[i].total), dataset[i].pdDistrict]);
                    }

                    //Update all circles
                    svg.selectAll("circle")
                        .data(coordUp)
                        .transition()
                        .duration(1000)
                        .attr("cx", function(d) {
                            return xScale(d[0]);
                        })
                        .attr("cy", function(d) {
                            return yScale(d[1]);
                        })
                        .attr("r", function(d) {
                            return Math.sqrt(rScale(d[2])) * 5; // Area show and scale
                        })
                        .attr("fill", function(d, i) {
                            return color[i];
                        })

                });
            });
    }
