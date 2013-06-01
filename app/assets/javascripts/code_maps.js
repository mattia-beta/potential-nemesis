
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

    map.addLayer(vectorLayer);

}
