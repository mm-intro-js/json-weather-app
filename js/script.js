$(document).ready(function () {

	weatherApp = {

		$targetArea: $("#weather"),

		weatherApiKey: "",

		lastLatitude: "",
		lastLongitude: "",

		getFormData: function () {
			if (weatherApp.weatherApiKey === null || weatherApp.weatherApiKey === "") {
				weatherApp.weatherApiKey = $("#apikey").val().trim();
			}

			var zip = $("#zip").val().trim();
			if (zip === null || zip.length < 5) {
				weatherApp.$targetArea.html("Enter a valid zip code.");
			} else {
				weatherApp.getWeatherData(zip);
			}

			console.log(weatherApp.weatherApiKey);
			console.log(zip);
		},

		getWeatherData: function (zipcode) {
			var url = "//api.openweathermap.org/data/2.5/weather?zip=" + zipcode + ",us&appid=" + weatherApp.weatherApiKey + "&units=imperial";

			//var url = "testData/test.json"

			$.getJSON(url, function (data) {

				if (data.cod == 200) {
					//weatherApp.$targetArea.html("Success!");


					// THIS IS WHERE YOU WOULD ADD THE DATA TO THE PAGE
					// Add the city name
					//
					console.log(data.name);
					$("#weather").append("<br>In " + data.name);

					//$("#weather").replaceWith("<div id=weather>" + "In " + data.name);


					// Add the weather condition descriptions, all of them, comma separated

					var descriptions = data.weather;
					var descLength = data.weather.length;
					//console.log(descLength);

					$("#weather").append(" the current conditions are ");
					var i;
					for (i = 0; i < descLength; i++) {
						//console.log(descriptions[i].description)
						if (i == descLength - 1) {
							$("#weather").append(descriptions[i].description + ".");
						} else if (i == descLength - 2) {
							$("#weather").append(descriptions[i].description + " and ")
						} else {
							$("#weather").append(descriptions[i].description + ", ");
						}
					}

					// Add the current temperature, the day's low & high temp, current pressure, & current humidity
					$("#weather").append("<p>The temperature is " + data.main.temp + "° Fahrenheit, the atmospheric pressure is " + data.main.pressure + " millibars and the current humidity is " + data.main.humidity + "%.");

					/*if (data.main.humidity != 100) {
						weatherApp.$targetArea.append(".");
					} else {
						weatherApp.$targetArea.append(" (precipitation).");
					}*/

					// Get the lat & longitude from the result and save
					//lastLatitude = (data.coord.lat);
					//lastLongitude = (data.coord.lon);

					weatherApp.lastLatitude = data.coord.lat;
					weatherApp.lastLongitude = data.coord.lon;
					//console.log("lat= " + weatherApp.lastLatitude);
					//console.log("long= " + weatherApp.lastLongitude);

					// Add a button for 5 day forcast
					weatherApp.$targetArea.append('<div id="5day"><button id="fiveDay">Get 5 Day Forecast</button></div>');
					$("#fiveDay").on("click", weatherApp.getFiveDayWeather);

				} else {
					weatherApp.$targetArea.html("Sorry, no weather data available. Try again later.");
				}
			}).fail(function () {
				weatherApp.$targetArea.html("Sorry, no weather data available. Try again later.");
			});
		},

		getFiveDayWeather: function () {
			var url = "//api.openweathermap.org/data/2.5/forecast?lat=" + weatherApp.lastLatitude + "&lon=" + weatherApp.lastLongitude + "&appid=" + weatherApp.weatherApiKey + "&units=imperial";

			$.getJSON(url, function (data) {
				var $target = $("#5day")
				if (data.cod == 200) {
					//$target.html("Success!");

					// THIS IS WHERE YOU WOULD ADD THE 5 DAY FORCAST DATA TO THE PAGE
					var forecasts = data.list;
					var forecastsLength = data.list.length;

					//console.log(forecastsLength);

					// For each of the 5 days, at each time specified, add the date/time plus:
					//   - the weather condition descriptions, all of them, comma separated
					//   - day's temp, low & high temp, pressure, humidity


					for (i = 0; i < forecastsLength; i += 8) {
						$target.append("<br>" + "On " + forecasts[i].dt_txt + " the conditions will be ");

						var forecastDescLength = data.list[i].weather.length

						//console.log(data.list[i].weather.length)
						for (idesc = 0; idesc < forecastDescLength; idesc++) {
							if (idesc == forecastDescLength - 1) {
								$target.append(forecasts[i].weather[idesc].description + ".");
							} else if (idesc == forecastDescLength - 2) {
								$target.append(forecasts[i].weather[idesc].description + " and ");
							} else {
								$target.append(forecasts[i].weather[idesc].description + ", ");
							}
						}
						$target.append(" The average temperature wil be " + forecasts[i].main.temp + "° with a high of " + forecasts[i].main.temp_max + "° and a low of " + forecasts[i].main.temp_min + "°. The atmospheric pressure will be around " + forecasts[i].main.pressure + " millibars with a humidity of " + forecasts[i].main.humidity + "%");

						if (forecasts[i].main.humidity != 100) {
							$target.append(".<br>");
						} else {
							$target.append(" (precipitation).<br>");
						}
					}

				} else {
					$target.html("Sorry, 5 day forcast data is unavailable. Try again later.");
				}
			}).fail(function () {
				weatherApp.$targetArea.html("Sorry, 5 day forcast data is unavailable. Try again later.");
			});

		}
	}

	// Form submit handler
	$("#submit").click(function () {
		weatherApp.getFormData();
		return false;
	});

});