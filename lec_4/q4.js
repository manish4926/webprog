let cs = {
    flavor: "vanilla",
    topping: {
        drizzle: "chocolava",
        sprinkle: "choco-chips",
    },
    cone: {
        type: "waffle",
        crust: {
        color: "dark",
        texture: "soft",
        },
    },
    };
//console.log(cs[0]);  
    // for (let values of ) {
    //     let element = cs[index];
    //     console.log(element);    
    // }

    let output = {};

    for (let key in cs) {
        if (cs.hasOwnProperty(key)) {
            value = cs[key];
            //console.log(value);
            if(typeof(value) == 'object')
            
                for (let childkey in value) {
                    childvalue = value[childkey];
                    output[key+"."+childkey] = childvalue;
                }
            } else {
                //console.log(value);
                output[key] = value;
            }
            
            //console.log(key, value);

         
        
    }

       console.log(output);
    