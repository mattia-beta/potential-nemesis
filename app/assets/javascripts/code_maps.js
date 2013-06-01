
function create_map(div_name, latitudine, longitudine)
{
    console.log("Tue cordinate:  " + latitudine + " ; " + longitudine);

    map = new OpenLayers.Map(div_name);
    map.addLayer(new OpenLayers.Layer.OSM());

    epsg4326 = new OpenLayers.Projection("EPSG:4326"); //WGS 1984 projection
    projectTo = map.getProjectionObject(); //The map projection (Spherical Mercator)

    var lonLat = new OpenLayers.LonLat(longitudine, latitudine ).transform(epsg4326, projectTo);

    var zoom = 14;

    map.setCenter (lonLat, zoom);

    vectorLayer = new OpenLayers.Layer.Vector("Overlay");

    // Define markers as "features" of the vector layer:
    var feature = new OpenLayers.Feature.Vector(
        new OpenLayers.Geometry.Point( longitudine, latitudine ).transform(epsg4326, projectTo),
        {description:'You are here'} ,
        {externalGraphic: 'marker.png', graphicHeight: 25, graphicWidth: 21, graphicXOffset:-12, graphicYOffset:-25 }
    );
    vectorLayer.addFeatures(feature);

    addPointers(vectorLayer, latitudine, longitudine);

    map.addLayer(vectorLayer);
}


function addPointers(vectorLayer, lat, lon)
{
        $.ajax(
        {
            type: "GET",
            url: "/issues/fetch",
            data: {latitude: lat, longitude: lon},
            dataType: "json",

            success: function(msg)
            {
                console.log(msg);
                alert(msg);
                vett = JSON.parse(msg);


                for(var i = 0; i  < vett.length; i++)
                {
                    var feature = new OpenLayers.Feature.Vector
                    (
                        new OpenLayers.Geometry.Point( vett[i]["longitude"], vett[i]["latitude"] ).transform(epsg4326, projectTo),
                        {description:'This is ' + obj[i]["description"]} ,
                        {externalGraphic: "marker.png", graphicHeight: 25, graphicWidth: 21, graphicXOffset:-12, graphicYOffset:-25 }
                    );

                    vectorLayer.addFeatures(feature);
                }

            },

            error: function()
            {
                alert("Chiamata fallita!!!");
            }
        });


   /* for(var i = 0; i < vett.length; i++)
    {
        ico_url = "";
        switch(vett[i]["hospital_type"])
        {
            case "1": ico_url = "img/h_p.png"; break;
            case "2": ico_url = "img/h_h.png"; break;
            case "3": ico_url = "img/b_h.png"; break;
            case "4": ico_url = "img/a_h.png"; break;
            default: ico_url = "img/marker.png"; break;
        }

// Define markers as "features" of the vector layer:
        var feature = new OpenLayers.Feature.Vector
        (
            new OpenLayers.Geometry.Point( vett[i]["longitude"], vett[i]["latitude"] ).transform(epsg4326, projectTo),
            {description:'This is ' + obj[i]["hospital_name"] + "<br/> <a href='#' onclick='detail(" + obj[i]["ID_hospital"] + ")'>detail</a>"} ,
            {externalGraphic: ico_url, graphicHeight: 25, graphicWidth: 21, graphicXOffset:-12, graphicYOffset:-25 }
        );

        vectorLayer.addFeatures(feature);

        console.log("ADDO --> " + vett[i]["hospital_name"]);
    }  */
}
