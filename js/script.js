$(document).ready(function () {

    console.log("hello");

    weatherApp = {

        $targetArea: $("#weather"),

        weatherApiKey: "",

        lastLatitiude: "",
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
            //var url = "//api.openweathermap.org/data/2.5/weather?zip=" + zipcode + ",us&appid=" + weatherApp.weatherApiKey + "&units=imperial";

            var url = "testData/test.json"

            $.getJSON(url, function (data) {

                if (data.cod == 200) {
                    //weatherApp.$targetArea.html("Success!");

                    // THIS IS WHERE YOU WOULD ADD THE DATA TO THE PAGE
                    // Add the city name
                    var cityName = data.name;
                    var weatherData = data.weather;

                    var tempMin = data.main.temp_min;
                    var tempMax = data.main.temp_max;
                    var pressure = data.main.pressure;
                    var temp = data.main.temp;
                    var humidity = data.main.humidity;

                    var lat = data.coord.lat;
                    var lon = data.coord.lon;

                    console.log("latitude " + lat);
                    console.log("longitude " + lon);



                    console.log("Max temp " + tempMax);
                    console.log("Min temp " + tempMin);
                    console.log("pressure " + pressure);
                    console.log("temp " + temp);
                    console.log("humidity " + humidity);


                    console.log("weather data" + weatherData);

                    console.log("city name " + cityName);

                    $('#weather').append("City name: " + cityName);
                    $('#weather').append('<br>');
                    $('#weather').append('<br>');


                    $('#weather').append("Max temp " + tempMax + "F");
                    $('#weather').append('<br>');
                    $('#weather').append('<br>');
                    $('#weather').append("Min temp " + tempMin + "F");
                    $('#weather').append('<br>');
                    $('#weather').append('<br>');
                    $('#weather').append("temp " + temp + "F");
                    $('#weather').append('<br>');
                    $('#weather').append('<br>');
                    $('#weather').append("pressure " + pressure);
                    $('#weather').append('<br>');
                    $('#weather').append('<br>');
                    $('#weather').append("humidity " + humidity);
                    $('#weather').append('<br>');
                    $('#weather').append('<br>');

                    $('#weather').append("Weather description: ");



                    // Add the weather condition descriptions, all of them, comma separated
                    for (i = 0; i < weatherData.length; i++) {
                        var weatherDescription = data.weather[i].description;

                        if (i != weatherData.length - 1) {

                            console.log("weather description: " + weatherDescription + ",");

                            $('#weather').append(weatherDescription + ",");

                        } else {

                            console.log(weatherDescription);
                            $('#weather').append(weatherDescription);

                        }




                    }



                    // Add the current temperature, the day's low & high temp, current pressure, & current humidity

                    // Get the lat & longitude from the result and save
                    weatherApp.lastLatitiude = lat;
                    weatherApp.lastLongitude = lon;

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
            //var url = "//api.openweathermap.org/data/2.5/forecast?lat=" + weatherApp.lastLatitiude + "&lon=" + weatherApp.lastLongitude + "&appid=" + weatherApp.weatherApiKey + "&units=imperial";

            var url = "testData/test5day.json"



            $.getJSON(url, function (data) {
                var list = data.list;
                console.log("list " + list);
                var $target = $("#5day");
                if (data.cod == 200) {
                    //$target.html("Success!");

                    // THIS IS WHERE YOU WOULD ADD THE 5 DAY FORCAST DATA TO THE PAGE

                    // For each of the 5 days, at each time specified, add the date/time plus:
                    //   - the weather condition descriptions, all of them, comma separated
                    //   - day's temp, low & high temp, pressure, humidity

                    for (i = 0; i < list.length; i++) {
                        console.log("Date text " + list[i].dt_txt + " Humidity " + list[i].main.humidity + " Temp " + list[i].main.temp + "F" + " Max Temp " + list[i].main.temp_max + "F" + " Min Temp " + list[i].main.temp_min + "F" + " Pressure " + list[i].main.pressure);

                        $('#5day').append('<p>' + "Date text " + list[i].dt_txt + " Humidity " + list[i].main.humidity + " Temp " + list[i].main.temp + "F" + " Max Temp " + list[i].main.temp_max + "F" + " Min Temp " + list[i].main.temp_min + "F" + " Pressure " + list[i].main.pressure + '</p>');


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