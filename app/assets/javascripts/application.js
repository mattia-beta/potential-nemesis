// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require twitter/bootstrap
//= require OpenLayers.js
//= require code_maps
// require_tree .

// SHOW HIDDEN HOME PAGE
$(document).ready(function()
{
    if (navigator.geolocation)
    {
        navigator.geolocation.watchPosition(showPosition);
    }

    $("#sign-btn").click( function()
    {
        $("#login").css({"visibility": "hidden"});
        $("#sign-up").css({"visibility": "visible"});
    });

    $("#cancel-btn").click( function()
    {
        $("#login").css({"visibility": "visible"});
        $("#sign-up").css({"visibility": "hidden"});
    });
});


// SHOW HIDDEN USER ISSUES
$(document).ready(function()
{
    if (navigator.geolocation)
    {
        navigator.geolocation.watchPosition(showPosition);
    }

    $("#issue-btn").click( function()
    {
        $("#my-issues").css({"visibility": "hidden"});
        $("#add-issue").css({"visibility": "visible"});
    });

    $("#my-issue-btn").click( function()
    {
        $("#my-issues").css({"visibility": "visible"});
        $("#add-issue").css({"visibility": "hidden"});
    });
});

