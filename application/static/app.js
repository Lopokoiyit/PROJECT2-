function tester() {
    const url = "/view_api"

    d3.json(url).then(function(response) {
        console.log(response);

        response.forEach(row => {
            row.energy_production_gwh = +row.energy_production_gwh 
        });

        // labels for each trace
        const fuel_types = [...new Set(response.map(row => row.fuel_source))];
        console.log("fuel_type:", fuel_types);

        // x labels
        const states = [...new Set(response.map(row => row.state))];
        console.log("states: ", states);

        // years
        const fin_year = [...new Set(response.map(row => row.financial_year))];
        console.log("years: ", fin_year);

        // the year will be from a dropdown menu
        const year = fin_year[11];

        function getStateTotal(data, year, state) {
            const state_production = data.filter((v,i) => {
                return (v["financial_year"] == year && v["state"] == state)
            });

            const state_total = state_production.reduce((accumulator, object) => {
                return accumulator + object.energy_production_gwh
            }, 0);
           

            return state_total  
        };

        test = getStateTotal(response, year, states[0])
        console.log("test: ", test)
        
        function getYValues(data, year, fuel, state) {
            const state_total = getStateTotal(data,year,state)
            var production = data.filter((v, i) => {
                return (v["financial_year"] == year && v["fuel_source"] == fuel && v["state"] == state)
            });
            const output = (production[0].energy_production_gwh)/state_total

            return output
        }

        function createTrace(data, year, states, fuel) {
            x_values = states;
            y_values = states.map(state => {
                return getYValues(data, year, fuel, state)
                });
            var trace ={
                x: x_values,
                y: y_values,
                name: fuel,
                type: 'bar'
            };

            return trace
        }
              

        traces =[]
        fuel_types.forEach(fuel => {
            var trace = createTrace(response, year, states, fuel)
            traces.push(trace)
        })


        var test = createTrace(response, year, states, fuel_types[0])
        var test2 = createTrace(response, year, states, fuel_types[1])

        console.log("tracers: ", traces)

        var data = traces

        var layout = {
            barmode: 'stack',
            yaxis: {tickformat: '%'},
            height: 800,
            yaxis: {
                type: '', 
                range: [0,1],
                tickformat: "0.0%"
              }
        };          
                        

        Plotly.newPlot('dbtest', data, layout)
      
    })
};    

tester()