$("#search").click(function(){
    event.preventDefault();

    var formulario = $('#form');
    var nombre = $('#nombre').val();
    var expresion = /[a-z]/gim;
    var expresion2 = /[1-893]/gim;
    if (nombre.match(expresion) || nombre.match(expresion2) && nombre > 0 && nombre <=893 && nombre != ""){
        $.ajax({
            type: "GET",
            url: `https://pokeapi.co/api/v2/pokemon/${nombre}`,
            dataType: "json",
            success: function(data) {
                $("#respuesta").empty();
                console.log(data.name);
                $("#respuesta").append(data.name + "<br>");
                $("#respuesta").append("Pokemón de tipo: " + data.types[0].type.name);
                $("#respuesta").css("font-weight", "bold");

                var options = {
                    title: {
                        text: "Pokemon stat"              
                    },
                    data: [              
                        {
                            type: "column",
                            dataPoints:[]
                        }
                    ]
                }

                for (var i = 0; i < data.stats.length; i++) {
                    options.data[0].dataPoints.push({label: data.stats[i].stat.name, y:data.stats[i].base_stat});
                }

                $("#chartContainer").CanvasJSChart(options);
                $("#chartContainer").show();
            },
            error: function(error){
                console.error(error.responseText);
            }
        });  
    }else{
        alert("Ingrese un número del 1 al 893 o ingrese el nombre correctamente!")
    }
 }); 
