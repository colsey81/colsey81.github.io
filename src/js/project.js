//Code for plotting map
var w2 = 600;
var h = 500;
var scale = ((w2-1) / 2 / Math.PI)

var rScale;



var color2 = ['pink', 'Brown', 'Red', 'Orange','Yellow', 'Green', 'Blue', 'Violet', 'Grey','black' ];//["orange", "steelblue", "", "springGreen", "#ff850c", "#42f4e8",'black','red','pink','blue'];

//Define quantize scale to sort data values into buckets of color
			var color = d3.scale.quantize()
								.range(["rgb(237,248,233)","rgb(186,228,179)","rgb(116,196,118)","rgb(49,163,84)","rgb(0,109,44)"]);
								//Colors taken from colorbrewer.js, included in the D3 download

//Define map projection
var projection = d3.geo.mercator()
    .center([-73.9, 40.730610,])
    .scale(44900)
    .translate([w2 / 2, h / 2]);

var path = d3.geo.path()
            .projection(projection);

//Create SVG element
var svg1 = d3.select("#vis1")
.append("svg")
.attr("width", w2)
.attr("height", h)
.append("g");

//Create SVG element
var svg2 = d3.select("#vis2")
.append("svg")
.attr("width", w2)
.attr("height", h)
.append("g");

//Create SVG element
var svg4 = d3.select("#vis4")
.append("svg")
.attr("width", 800)
.attr("height", h)
.append("g");

// Functions
function bind() {

    d3.json("../../res/data/nyc.geojson", function(json) {

        //Bind data and create one path per GeoJSON feature
        svg1.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", path)
            .style("fill", 'steelblue')
            .style( "opacity", 0.5)
            .attr("stroke", "black")
          //  .on("mouseover", mouseover)
          //  .on("mouseout", mouseout)
          //  .on("click", click);

            //Bind data and create one path per GeoJSON feature
          svg2.selectAll("path")
              .data(json.features)
              .enter()
              .append("path")
              .attr("d", path)
              .style("fill", 'steelblue')
              .style( "opacity", 0.5)
              .attr("stroke", "black")
          //    .on("mouseover", mouseover)
            //  .on("mouseout", mouseout)
            //  .on("click", click);

						//Bind data and create one path per GeoJSON feature
					svg4.selectAll("path")
							.data(json.features)
							.enter()
							.append("path")
							.attr("d", path)
							.style("fill", 'steelblue')
							.style( "opacity", 0.5)
							.attr("stroke", "black")
					  // .on("mouseover", mouseover)
						 //.on("mouseout", mouseout)
						 //.on("click", click);

    });


setTimeout(myFunction, 200); // Let dots overlay map

}


function myFunction(){

  d3.csv("graphKm.csv", function(data) {

				testData1 = data;
				//console.log(testData1)

        // Create points
        svg1.selectAll("circle")
            .data(testData1)
            .enter()
            .append("circle")
            .attr("cx", function(d) {
                return projection([d.LON, d.LAT])[0];
            })
            .attr("cy", function(d) {
                return projection([d.LON, d.LAT])[1];
            })
            .attr("r", function(d) {
                return 4;
            })
            .attr("stroke", function(d) {
                return "black";

            })
            .style("fill", function(d) {
                return color2[parseInt(d["k10"])];
            })
						.on("mouseover", function(d) {
						 //Update the tooltip position and value
							 d3.select("#tooltip5")
							 .html("<br><strong><b>ZIP CODE: <b></strong>" + d.ZipCode + "<br><strong>CLUSTER: </strong>" + d.k10)})

							.on("mouseout", function() {
									 //Hide the tooltip
									 d3.select("#tooltip5")
									 .html("<br><strong><b>ZIP CODE: <b></strong>" + "<br><strong>CLUSTER: </strong>")
								 });
    });

    d3.csv("graphInc.csv", function(data) {
          testData2 = data;

          // Create points
          svg2.selectAll("circle")
              .data(testData2)
              .enter()
              .append("circle")
              .attr("cx", function(d) {
                  return projection([d.LON, d.LAT])[0];
              })
              .attr("cy", function(d) {
                  return projection([d.LON, d.LAT])[1];
              })
              .attr("r", function(d) {
                  return 4;
              })
              .attr("stroke", function(d) {
                  return "black";

              })
              .style("fill", function(d) {
                  return color2[parseInt(d["k10"])];
              })
							.on("mouseover", function(d) {
						   //Update the tooltip position and value
						     d3.select("#tooltip5")
						     .html("<br><strong><b>ZIP CODE: <b></strong>" + d.ZipCode + "<br><strong>CLUSTER: </strong>" + d.k10)})

						    .on("mouseout", function() {
						         //Hide the tooltip
						         d3.select("#tooltip5")
						         .html("<br><strong><b>ZIP CODE: <b></strong>" + "<br><strong>CLUSTER: </strong>")
						       });
      });


			d3.csv("graphMove.csv", function(data) {
	          testData4 = data;

						rScale1 = d3.scale.linear()
		            .domain([0, d3.max(data, function(d) {
		                return d.Noise;
		            })])
		            .range([5, 20]);

						rScale2 = d3.scale.linear()
				          .domain([0, d3.max(data, function(d) {
				            return d.Neighbourhood;
				         })])
				         .range([5, 20]);
 						rScale3 = d3.scale.linear()
								 	.domain([0, d3.max(data, function(d) {
								 		return d.Food;
								 })])
								 	.range([5, 20]);

						rScale4 = d3.scale.linear()
								 	.domain([0, d3.max(data, function(d) {
								 			return d.Homeless;
								 	})])
								 		.range([5, 20]);

						rScale5 = d3.scale.linear()
								 	.domain([0, d3.max(data, function(d) {
									 			return d.Sanitation;
									 	})])
								 		.range([5, 20]);

	          // Create points
	          svg4.selectAll("circle")
	              .data(testData4)
	              .enter()
	              .append("circle")
	              .attr("cx", function(d) {
	                  return projection([d.LON, d.LAT])[0];
										})
	              .attr("cy", function(d) {
	                  return projection([d.LON, d.LAT])[1];
	              })
	              .attr("r", function(d) {
	                  return Math.sqrt(rScale1(d.Noise));
	              })
	              .attr("stroke", function(d) {
	                  return "black";

	              })
	              .style("fill", function(d) {
	                  return color2[4];
									 //return 'blue';
	              })
								.on("mouseover", function(d) {
							   //Update the tooltip position and value
							     d3.select("#tooltip3")
							     .html("<br><strong><b>ZIP CODE: <b></strong>" + d.ZipCode + "<br><strong>COMPLAINTS: </strong>" + d.Noise)})

							 .on("mouseout", function() {
							         //Hide the tooltip
							    d3.select("#tooltip3").html("<br><strong><b>ZIP CODE: <b></strong>" + "<br><strong>COMPLAINTS: </strong>" );
							       });

	      });
}

// Map Preview
d3.selectAll(".comp")
    .on("click", function() {
        update(d3.select(this).attr("id"));
    })

	// Map Preview
d3.selectAll(".spf")
		 .on("click", function() {
		     updateSPF(d3.select(this).attr("id"));
		 })

		 // Update Cluster Map
		 function updateSPF(upSpf) {

			 var first = document.getElementById(upSpf).innerHTML;
			 d3.select('#spfText').html(first);

		     svg4.selectAll("circle")
		         .data(testData4)
		         .transition()

		         .attr("cx", function(d) {
		             return projection([d.LON, d.LAT])[0];
		         })
		         .attr("cy", function(d) {
		             return projection([d.LON, d.LAT])[1];
		         })
		         .attr("r", function(d) {

								if(upSpf == 'spf1'){
									return Math.sqrt(rScale1(d.Noise));
								}else if(upSpf == 'spf2'){
									return Math.sqrt(rScale2(d.Neighbourhood));
								}else if(upSpf == 'spf3'){
									return Math.sqrt(rScale3(d.Food));
								}else if(upSpf == 'spf4'){
									return Math.sqrt(rScale4(d.Homeless));
								}else if(upSpf == 'spf5'){
									return Math.sqrt(rScale5(d.Sanitation));
								}
								else{
									return 3;
								}

		                     })
		         .attr("stroke", function(d) {
		                 return "black";
		         })
		         .style("fill", function(d) {
							 if(upSpf == 'spf1'){
								return 'yellow'
							}else if(upSpf == 'spf2'){
								return 'red'
							}else if(upSpf == 'spf3'){
								return 'pink'
							}else if(upSpf == 'spf4'){
								return 'brown'
							}else if(upSpf == 'spf5'){
								return 'Green'
							}
							else{
								return colour2[5];
							}
		         });

}

// Update Cluster Map
function update(update) {

    svg1.selectAll("circle")
        .data(testData1)
        .transition()

        .attr("cx", function(d) {
            return projection([d.LON, d.LAT])[0];
        })
        .attr("cy", function(d) {
            return projection([d.LON, d.LAT])[1];
        })
        .attr("r", function(d) {
            return 4;
                    })
        .attr("stroke", function(d) {
                return "black";
        })
        .style("fill", function(d) {
            return color2[parseInt(d[update])];
        });


				svg2.selectAll("circle")
		        .data(testData2)
		        .transition()

		        .attr("cx", function(d) {
		            return projection([d.LON, d.LAT])[0];
		        })
		        .attr("cy", function(d) {
		            return projection([d.LON, d.LAT])[1];
		        })
		        .attr("r", function(d) {
		            return 4;
		                    })
		        .attr("stroke", function(d) {
		                return "black";
		        })
		        .style("fill", function(d) {
		            return color2[parseInt(d[update])];
		        })


}





function click(d) {
    //console.log(this);
  //  console.log(d.properties.neighborhood);
  //  console.log(d.properties.borough);
}

// https://bl.ocks.org/john-guerra/43c7656821069d00dcbc
function findColor(d) {
    //console.log(d);
    return 'white';
    /*
    if (d.properties.borough == "Queens") {
        return "#800000";
    }
    else if (d.properties.borough == "Bronx") {
        return "#ff3300";
    }
    else if (d.properties.borough == "Staten Island") {
        return "#cc0000";
    }
    else if (d.properties.borough == "Brooklyn") {
        return "#ff8000";
    }
    else if (d.properties.borough == "Manhattan") {
        return "#df9f9f";
    }
    */
}

bind();

function mouseover(d){
    // Highlight hovered province
  //  d3.select(this).style('fill', '#ffffff');
    d3.select("#tooltip")
                    .style("left", (d3.event.pageX + 30) + "px")
                    .style("top", (d3.event.pageY + 10) + "px")
                    .style("opacity", 1)
                    .html("<center><b><u>"+ d3.select(this) + "</b></u><br>" + d.properties.neighborhood)
    d3.select("#tooltip")
                    .classed("hidden", false);
}

function mouseout(d) {
    d3.select(this).style('fill', findColor)
    d3.select("#tooltip")
                    .classed("hidden", true);
}

// Zooming functionality, http://mtaptich.github.io/d3-lessons/d3-maps/
var zoom = d3.behavior.zoom()
        .on("zoom",function() {
            // Using d3 mouse events, dynamically update translation and scale.
            svg4.selectAll("path").attr("transform","translate("+
                d3.event.translate.join(",")+")scale("+d3.event.scale+")");

								svg4.selectAll("circle").attr("transform","translate("+
		                d3.event.translate.join(",")+")scale("+d3.event.scale+")");
          //  console.log("Zooming")
      });

svg4.call(zoom);
