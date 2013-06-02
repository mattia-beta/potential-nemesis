loaded = false;

function showPosition(position)
{
    if(!loaded)
    {
        latitudine = position.coords.latitude;
        longitudine = position.coords.longitude;

        loaded = true;

        click_enabled = false;
        create_map("home-maps", latitudine, longitudine);
    }
}



