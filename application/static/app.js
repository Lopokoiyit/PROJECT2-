var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top: 20,
    right: 40,
    bottom: 60,
    left: 50
  };

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3
  .select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

  var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

function CallResponse() {
    const url = "/view_api"

    d3.json(url).then(function(response){
        console.log(response);

        var parseTime = d3.timeParse("%Y-%m");

          // Format the data
          response.forEach(function(response) {
          response.financial_year = parseTime(response.financial_year);
          
          // response.population = response.population.replace(",","")
          response.energy_consumption_pj = +response.energy_consumption_pj;
          response.population = +response.population;

          // console.log(response.population)
          // console.log(response.energy_consumption_pj)

          // response.energy_consumption_pj = parseInt(response.energy_consumption_pj);
          // response.population = parseInt(response.population);

        });

        var xTimeScale = d3.scaleTime()
        .domain(d3.extent(response,d => d.financial_year))
        .range([0,width]);

        var yLinearScale1 = d3.scaleLinear()
        .domain([0, d3.max(response, d => d.population)])
        .range([height, 0]);

        var yLinearScale2 = d3.scaleLinear()
        .domain([0, d3.max(response, d => d.energy_consumption_pj)])
        .range([height, 0]);

        var bottomAxis = d3.axisBottom(xTimeScale);
        var leftAxis = d3.axisLeft(yLinearScale1);
        var rightAxis = d3.axisRight(yLinearScale2);

        // Add bottomAxis
        chartGroup.append("g").attr("transform", `translate(0, ${height})`).call(bottomAxis);

        // Add leftAxis to the left side of the display
        chartGroup.append("g").call(leftAxis);

        // Add rightAxis to the right side of the display
        chartGroup.append("g").attr("transform", `translate(${width}, 0)`).call(rightAxis);

        var line1 = d3
        .line()
        .x(d => xTimeScale(d.financial_year))
        .y(d => yLinearScale1(d.population));

        var line2 = d3
        .line()
        .x(d => xTimeScale(d.financial_year))
        .y(d => yLinearScale2(d.energy_consumption_pj));

        // Append a path for line1
        chartGroup.append("path")
        .data([response])
        .attr("d", line1)
        .classed("line green", true);

        // Append a path for line2
        chartGroup.append("path")
        .data([response])
        .attr("d", line2)
        .classed("line orange", true);

    })
  }
CallResponse()