loaded = false;

function showPosition(position)
{
    if(!loaded)
    {
        latitudine = position.coords.latitude;
        longitudine = position.coords.longitude;

        loaded = true;

        create_map("user-map", latitudine, longitudine);
    }
}


$(document).ready(function()
{
    if (navigator.geolocation)
    {
        navigator.geolocation.watchPosition(showPosition);
    }
});

