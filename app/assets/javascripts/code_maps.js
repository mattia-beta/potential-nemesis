
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
        {externalGraphic: '/assets/marker.png', graphicHeight: 25, graphicWidth: 21, graphicXOffset:-12, graphicYOffset:-25 }
    );
    vectorLayer.addFeatures(feature);

    addPointers(vectorLayer, latitudine, longitudine);

    map.addLayer(vectorLayer);


    //Add a selector control to the vectorLayer with popup functions
    var controls =
    {
        selector: new OpenLayers.Control.SelectFeature(vectorLayer, { onSelect: createPopup, onUnselect: destroyPopup })
    };

    function createPopup(feature)
    {
        feature.popup = new OpenLayers.Popup.FramedCloud("pop",
            feature.geometry.getBounds().getCenterLonLat(),
            null,
            '<div class="markerContent">'+feature.attributes.description+'</div>',
            null,
            true,
            function()
            {
                controls['selector'].unselectAll();
            }
        );
        //feature.popup.closeOnMove = true;
        map.addPopup(feature.popup);
    }

    function destroyPopup(feature)
    {
        feature.popup.destroy();
        feature.popup = null;
    }

    map.addControl(controls['selector']);
    controls['selector'].activate();

    map.events.register('click', map, handleMapClick);
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
                for(var i = 0; i  < msg.length; i++)
                {
                    var feature = new OpenLayers.Feature.Vector
                    (
                        new OpenLayers.Geometry.Point( msg[i]["longitude"], msg[i]["latitude"] ).transform(epsg4326, projectTo),
                        {description:'This is ' + msg[i]["description"]} ,
                        {externalGraphic: "/assets/marker.png", graphicHeight: 25, graphicWidth: 21, graphicXOffset:-12, graphicYOffset:-25 }
                    );

                    vectorLayer.addFeatures(feature);
                }

            },

            error: function()
            {
                alert("Chiamata fallita!!!");
            }
        });
}
