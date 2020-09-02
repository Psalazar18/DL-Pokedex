$("#search").click(function(){
    event.preventDefault();
    var nombre = $('#nombre').val();
    $.ajax({
        type: "GET",
        url: `https://pokeapi.co/api/v2/pokemon/${nombre}`,
        dataType: "json",
        success: function(data) {
            $(".respuesta").empty();
            console.log(data.name);
            $(".respuesta").append(data.name + "<br>");
            $(".respuesta").append("Pokemón de tipo: " + data.types[0].type.name);
            $(".respuesta").css("font-weight", "bold");

            var options = {
                title: {
                    text: "Pokemon stat"              
                },
                data: [              
                    {
                        type: "column",
                        dataPoints:[
                            
                        ]
                    }
                ]
            }

            for (var i = 0; i < data.stats.length; i++) {
                options.data[0].dataPoints.push({label: data.stats[i].stat.name, y:data.stats[i].base_stat});
            }

            $("#chartContainer").CanvasJSChart(options);
            $("#chartContainer").show("slow");
        },
        error: function(error){
            console.error(error.responseText);
        }
    });  
 });   
    