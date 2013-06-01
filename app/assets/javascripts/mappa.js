loaded = false;

function showPosition(position)
{
	 if(!loaded)
	 {
	 	latitudine = position.coords.latitude;
	 	longitudine = position.coords.longitude;

	 	show(position.coords.latitude, position.coords.longitude);

	 	loaded = true;
	 }
}

function show(lat, lon, vett, lens)
{
	$("#demoMap").html("");

	map = new OpenLayers.Map("demoMap");
    map.addLayer(new OpenLayers.Layer.OSM());
    
    epsg4326 =  new OpenLayers.Projection("EPSG:4326"); //WGS 1984 projection
    projectTo = map.getProjectionObject(); //The map projection (Spherical Mercator)
   
    var lonLat = new OpenLayers.LonLat(lon, lat ).transform(epsg4326, projectTo);
          
    var zoom = 14;
    
    map.setCenter (lonLat, zoom);

    vectorLayer = new OpenLayers.Layer.Vector("Overlay");
    
    // Define markers as "features" of the vector layer:
    var feature = new OpenLayers.Feature.Vector(
            new OpenLayers.Geometry.Point( lon, lat ).transform(epsg4326, projectTo),
            {description:'You are here'} ,
            {externalGraphic: 'img/marker.png', graphicHeight: 25, graphicWidth: 21, graphicXOffset:-12, graphicYOffset:-25  }
        );    
    vectorLayer.addFeatures(feature);
    
    if(vett != null)
    {
    	addPointers(vectorLayer, vett);
    }
    
    map.addLayer(vectorLayer);
 
    
    //Add a selector control to the vectorLayer with popup functions
    var controls = {
      selector: new OpenLayers.Control.SelectFeature(vectorLayer, { onSelect: createPopup, onUnselect: destroyPopup })
    };

    function createPopup(feature) {
      feature.popup = new OpenLayers.Popup.FramedCloud("pop",
          feature.geometry.getBounds().getCenterLonLat(),
          null,
          '<div class="markerContent">'+feature.attributes.description+'</div>',
          null,
          true,
          function() { controls['selector'].unselectAll(); }
      );
      //feature.popup.closeOnMove = true;
      map.addPopup(feature.popup);
    }

    function destroyPopup(feature) {
      feature.popup.destroy();
      feature.popup = null;
    }
    
    map.addControl(controls['selector']);
    controls['selector'].activate();
    
    map.events.register('click', map, handleMapClick);
}

function handleMapClick(e)
{
	if(click_attivi)
	{
		   OSMLonLat = map.getLonLatFromViewPortPx(e.xy);
		   OSMLonLat.transform( map.projection, map.displayProjection);

		   Lo = OSMLonLat.lon
		   La  = OSMLonLat.lat

		   $("#lat").val(La);
		   $("#long").val(Lo);
	}
}


function addPointers(vectorLayer, vett)
{
	for(var i = 0; i < vett.length; i++)
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
	            {externalGraphic: ico_url, graphicHeight: 25, graphicWidth: 21, graphicXOffset:-12, graphicYOffset:-25  }
	    ); 

	    vectorLayer.addFeatures(feature);

	    console.log("ADDO --> " + vett[i]["hospital_name"]);
	}
}



$(document).ready(function()
{
	if (navigator.geolocation)
    {
    	navigator.geolocation.watchPosition(showPosition);
    }
    
    $("#do-find").click(function()
	{
			console.log("CITTA -> " +  $("#city").val());

			$.ajax(
			{
				  type: "POST",
				  url: "find.php",
				  data: "city=" + $("#city").val() + "&nation=" + $("#nation").val(),
				  dataType: "html",

				  success: function(msg)
				  {
				    	console.log("POST --> " + msg);

				    	obj = jQuery.parseJSON(msg);

				    	show(obj[0]["latitude"], obj[0]["longitude"], obj);

				    	$("#find").fadeOut(300);
				    	$("#demoMap").animate({height: '600px'},"slow");       
				  },

				  error: function()
				  {
				    	alert("Chiamata fallita!!!");
				  }
			});
	});

	$("#do-show-all").click(function()
	{	
			showAll();
	});
});

function showAll()
{
		$.ajax(
		{
			  type: "POST",
			  url: "find.php",
			  data: "s=all&nation=z&city=d",  //da fix
			  dataType: "html",

			  success: function(msg)
			  {				    	
			    	obj = jQuery.parseJSON(msg);

			    	show(obj[0]["latitude"], obj[0]["longitude"], obj);

			    	$("#find").fadeOut(300);
			    	$("#demoMap").animate({height: '600px'},"slow");       
			  },

			  error: function()
			  {
			    	alert("Chiamata fallita!!!");
			  }
		});
}


function capitalize(string)
{
	    return string.charAt(0).toUpperCase() + string.slice(1);
}


function draw(field)
{
	if(field == "0")
	{
		return "<img src='img/cross.png' title='' alt''>";
	}
	else
	{
		return "<img src='img/check.png' title='' alt''>";
	}
}

function detail(id_hospital)
{
	$("#modal-item").html(" ");

	for(var i = 0; i < obj.length; i++)
	{
		if(obj[i]["ID_hospital"] == id_hospital)
		{
			$("#modal-titolo").html(capitalize(obj[i]["hospital_name"]) + " - " + capitalize(obj[i]["city"]));

$("#modal-item").append("<tr> <td><img src='img/book.png' width='25px'></td> <td>Nome</td> <td class='details-tb'>" + obj[i]["hospital_name"] + "</td> </tr>");
$("#modal-item").append("<tr> <td><img src='img/hos.png' width='32px'></td> <td>Type</td> <td class='details-tb'>" + obj[i]["htype_name"] + "</td> </tr>");

$("#modal-item").append("<tr> <td><img src='img/ambu.png' width='40px'></td> <td>Ambulance</td> <td class='details-tb'>" + draw(obj[i]["ambulance"]) + "</td> </tr>");
$("#modal-item").append("<tr> <td><img src='img/utenz.png' width='30px'></td> <td>Operating Block</td> <td class='details-tb'>" + draw(obj[i]["operating_block"]) + "</td> </tr>");

$("#modal-item").append("<tr> <td><img src='img/ambu.png' width='39px'></td> <td>CD4_testing</td> <td class='details-tb'>" + draw(obj[i]["CD4_testing"]) + "</td> </tr>");
$("#modal-item").append("<tr> <td>&nbsp;<img src='img/1354366054_pushpin-1.png' width='20px'></td> <td>Area size</td> <td class='details-tb'>" + obj[i]["area_size"] + "</td> </tr>");

$("#modal-item").append("<tr> <td><img src='img/permission.png' width='23px'></td> <td>Permission</td> <td class='details-tb'>" + obj[i]["permission"] + "</td> </tr>");
$("#modal-item").append("<tr> <td><img src='img/nurse.png' width='30px'></td> <td>Nurse</td> <td class='details-tb'>" + draw(obj[i]["nurse"]) + "</td> </tr>");

$("#modal-item").append("<tr> <td><img src='img/doctor.jpg' width='23px'></td> <td>Doctor</td> <td class='details-tb'>" + draw(obj[i]["doctor"]) + "</td> </tr>");
$("#modal-item").append("<tr> <td><img src='img/ambu.png' width='30px'></td> <td>Midwife</td> <td class='details-tb'>" + draw(obj[i]["midwife"]) + "</td> </tr>");


			$("#myModal").modal("show");

			return;
		}
	}
}