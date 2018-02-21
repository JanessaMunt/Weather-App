
//get location and store lat/long
var lat;
var long;




main();

function main(){
	var temp;



	//get location lat and long
	navigator.geolocation.getCurrentPosition(function(location) {
	  lat = location.coords.latitude;
	  long = location.coords.longitude;
	  getWeather(); //get data and add it
	});


}



function getWeather(){
	var icons = {
		"day":
		{"Clear": "<i class=\"wi wi-day-sunny\"></i>",
		"Clouds": "<i class=\"wi wi-day-cloudy\"></i>",
		"Extreme": "<i class=\"wi wi-thermometer\"></i>",
		"Drizzle": "<i class=\"wi wi-day-showers\"></i>",
		"Rain": "<i class=\"wi wi-day-rain\"></i>",
		"Thunderstorm": "<i class=\"wi wi-day-lightning\"></i>",
		"Snow": "<i class=\"wi wi-day-snow\"></i>",
		"Atmosphere": "<i class=\"wi wi-day-fog\"></i>",
		"Other": "<i class=\"wi wi-cloudy\"></i>"},
		"night":
		{"Clear": "<i class=\"wi wi-night-clear\"></i>",
		"Clouds": "<i class=\"wi wi-night-alt-cloudy\"></i>",
		"Extreme": "<i class=\"wi wi-thermometer\"></i>",
		"Drizzle": "<i class=\"wi wi-night-alt-showers\"></i>",
		"Rain": "<i class=\"wi wi-night-alt-rain\"></i>",
		"Thunderstorm": "<i class=\"wi wi-night-thunderstorm\"></i>",
		"Snow": "<i class=\"wi wi-night-alt-snow\"></i>",
		"Atmosphere": "<i class=\"wi wi-night-fog\"></i>",
		"Other": "<i class=\"wi wi-cloudy\"></i>"},
	};

	$.ajax({
		url: "https://fcc-weather-api.glitch.me/api/current?lon=" + long + "&lat=" + lat,
		success: function(info){
			var data = info;
			var timeOfDay = "day";
			$(".location:first").text(data.name + ", ");
			$(".location:last").text(data.sys.country);
			//get tempature data and store in both c and f
			temp.c = Math.round(data.main.temp) + " " +String.fromCharCode(176)+"C";
			temp.f = Math.round(data.main.temp*1.8 + 32) + " " +String.fromCharCode(176)+"F";
			$("#temp").text(temp.f);
			$(".weather:last").text(data.weather[0].main);
			timeOfDay = isDay(data.sys.sunrise, data.sys.sunset, data.dt);
			$(".weather:first").html(icons[timeOfDay][data.weather[0]["Other"]]);
			$(".weather:first").html(icons[timeOfDay][data.weather[0].main]);

		}


	});
}
//check if it is day or night
function isDay(sunrise, sunset, time){
	if(time > sunrise && time < sunset){
 		return "day";
 	}
 	else{
 		return "night";
	}
}

//toggle c and f
$("button:first").on("click",function(){
	if ($("#temp").text() === temp.c) {
		$("#temp").text(temp.f);
	}
	else{
		$("#temp").text(temp.c);
	}
})
