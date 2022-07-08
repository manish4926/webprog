let dta = [
        { name: "Delhi", rainfall: [2.3, 4, 3.1, 5.5, 1.1, 1.2, 7] },
        { name: "Noida", rainfall: [6.3, 0, 0.1, 3.5, 1, 2.6, 0.7] },
        { name: "Dehradun", rainfall: [12, 5.6, 3.1, 0.55, 11, 16.2, 19] },
        { name: "Nanital", rainfall: [8, 1.4, 0.61, 15.5, 6.6, 2, 9.82] },
    ];

    let output = [];


    for (let i = 0; i < dta.length; i++) {
        let rain = dta[i]['rainfall'];
        //console.log(rain.length);
        let totoalfall = 0;
        for (let index = 0; index < rain.length; index++) {
            totoalfall = totoalfall + rain[index];            
        }
        let avgfall = totoalfall / rain.length;  
        output.push({"name": dta[i]["name"], "avgRainfall": avgfall});
    }

    console.log(output);