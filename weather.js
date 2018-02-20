
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
		{"clear sky": "<i class=\"wi wi-day-sunny\"></i>",
		"few clouds": "<i class=\"wi wi-day-cloudy\"></i>",
		"scattered clouds": "<i class=\"wi wi-day-cloudy\"></i>",
		"broken clouds": "<i class=\"wi wi-day-cloudy\"></i>",
		"shower rain": "<i class=\"wi wi-day-rain-mix\"></i>",
		"rain": "<i class=\"wi wi-day-rain\"></i>",
		"thunderstorm": "<i class=\"wi wi-day-lightning\"></i>",
		"snow": "<i class=\"wi wi-day-snow\"></i>",
		"mist": "<i class=\"wi wi-day-fog\"></i>" },
		"night":
		{"clear sky": "<i class=\"wi wi-night-clear\"></i>",
		"few clouds": "<i class=\"wi wi-night-alt-cloudy\"></i>",
		"scattered clouds": "<i class=\"wi wi-night-alt-cloudy\"></i>",
		"broken clouds": "<i class=\"wi wi-night-alt-cloudy\"></i>",
		"shower rain": "<i class=\"wi wi-night-rain-mix\"></i>",
		"rain": "<i class=\"wi wi-night-alt-rain\"></i>",
		"thunderstorm": "<i class=\"wi wi-night-lightning\"></i>",
		"snow": "<i class=\"wi wi-night-snow\"></i>",
		"mist": "<i class=\"wi wi-night-fog\"></i>" }
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
			$(".weather:first").html(icons[timeOfDay][data.weather[0].description]);

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
