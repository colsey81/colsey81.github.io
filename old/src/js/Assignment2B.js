//Width and height
var w2 = 900;

var testData; //
var color2 = ["#42f450", "#f442dc", "#f44242", "#f1f442", "#ff850c", "#42f4e8"];
//Define map projection
var projection = d3.geo.mercator()
    .center([-122.433701, 37.767683])
    .scale(190000)
    .translate([w2 / 2, h / 2]);

//Define path generator
var path = d3.geo.path()
    .projection(projection);
//Create SVG element
var svg2 = d3.select("#vis2")
    .append("svg")
    .attr("width", w2)
    .attr("height", h)
// Distric labels
var labels = svg2.append('g').attr('class', 'labels');

//Load in GeoJSON data
d3.json("sfpddistricts.json", function(json) {

//  testing = json;

    //Bind data and create one path per GeoJSON feature
    svg2.selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("d", path)
        .style("fill", "steelblue")
        .style( "opacity", 0.5)
        //.style("fill", "#b0e0e6")
        .attr("stroke", "black");

        // Label the Districts
    labels.selectAll('.label').data(json.features).enter().append('text')
        .attr("class", "label")
        .attr('transform', function(d) {
            return "translate(" + path.centroid(d) + ")";
        })
        .style('text-anchor', 'middle')
        .style("font-size", "20px")
        .text(function(d) {
            return d.properties.DISTRICT
        });

    //Load in cities data
    d3.csv("Assignment2.csv", function(data) {
        testData = data;

        // Create points
        svg2.selectAll("circle")
            .data(testData)
            .enter()
            .append("circle")
            .attr("cx", function(d) {
                return projection([d.lon, d.lat])[0];
            })
            .attr("cy", function(d) {
                return projection([d.lon, d.lat])[1];
            })
            .attr("r", function(d) {
                if (d.cc == 6) {
                    return 8;
                } else if (d.cc == 0) {
                    return 3;
                } else {
                    return 0;
                }
            })
            .attr("stroke", function(d) {
                if (d.cc != 0) {
                    return "black";
                }
            })
            .style("fill", function(d) {
                return color2[parseInt(d["k6"])];
            })
            .on("mouseover", function(d) {
                //Update the tooltip position and value
                d3.select("#tooltip2")
                    .html("<strong>Lat:"+d.lat + ", Lon:" + d.lon + "<strong>")
                //Show the tooltip
                d3.select("#tooltip2")
                    .classed("hidden", false);
            })
            .on("mouseout", function() {
                //Hide the tooltip
                d3.select("#tooltip2")
                    .classed("hidden", true);
            });
    });
});

// Map Preview
d3.selectAll(".button")
    .on("click", function() {
        update(d3.select(this).attr("id"));
    })
    .on("mouseover", function() {
        //Set image src to correct value
        d3.select("#pics")
            .attr("src", "minPics/" + d3.select(this).attr("id") + ".PNG")
            .style("visibility", "visible");

        d3.select("#preview").html("Preview: " + d3.select(this).attr("id"));
    })
    .on("mouseout", function() {
        d3.select("#pics")
            .style("visibility", "hidden")

        d3.select("#preview")
            .html("Preview: ");
    })

// Update Map
function update(update) {
    d3.select('#kmean').html("Showing Data for " + update);

    svg2.selectAll("circle")
        .data(testData)
        .transition()

        .attr("cx", function(d) {
            return projection([d.lon, d.lat])[0];
        })
        .attr("cy", function(d) {
            return projection([d.lon, d.lat])[1];
        })
        .attr("r", function(d) {
            if (d.cc == parseInt(update[1])) {
                return 8;
            } else if (d.cc == 0) {
                return 3;
            } else {
                return 0;
            }
        })
        .attr("stroke", function(d) {
            if (d.cc != 0) {
                return "black";
            }
        })
        .style("fill", function(d) {
            return color2[parseInt(d[update])];
        });

}
