loaded = false;

function showPosition(position)
{
    if(!loaded)
    {
        latitudine = position.coords.latitude;
        longitudine = position.coords.longitude;

        loaded = true;
        click_enabled = true;
        create_map("global-map", latitudine, longitudine);
    }
}


$(document).ready(function()
{
    if (navigator.geolocation)
    {
        navigator.geolocation.watchPosition(showPosition);
    }

    $(".show-on-map").click(function()
    {
        var lat = $(this).attr("latitude");
        var lon = $(this).attr("longitude");

        $("#global-map").html(" ");
        create_map("global-map", lat, lon);
    });
});


