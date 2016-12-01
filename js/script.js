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
            var url = "//api.openweathermap.org/data/2.5/weather?zip=" + zipcode + ",us&appid=" + weatherApp.weatherApiKey + "&units=imperial";

            //var url = "testData/test.json"

            $.getJSON(url, function (data) {

                if (data.cod == 200) {
                    weatherApp.$targetArea.html("Success!<br>");

                    // THIS IS WHERE YOU WOULD ADD THE DATA TO THE PAGE
                    // Add the city name
                    var city = data.name;
                    // Add the weather condition descriptions, all of them, comma separated
                    var description = data.weather[0].description;
                    var weather = data.weather[0].main;
                    // Add the current temperature, the day's low & high temp, current pressure, & current humidity
                    var temp = data.main.temp;
                    var tempMax = data.main.temp_max;
                    var tempMin = data.main.temp_min;
                    // Get the lat & longitude from the result and save
                    weatherApp.lastLatitiude = data.coord.lat;
                    weatherApp.lastLongitude = data.coord.lon;

                    //--------------------------------//
                    //                    console.log(data.name); //--City
                    //                    console.log(data.main.temp); //--Temp
                    //                    console.log(data.main.temp_max);
                    //                    console.log(data.main.temp_min);
                    //                    console.log(data.weather[0].main); //--Weather
                    //                    console.log(data.weather[0].description); //--WeatherDescription
                    //                    console.log(weatherApp.lastLatitiude); //--Latitude
                    //                    console.log(weatherApp.lastLongitude); //--Longitude
                    //--------------------------------//

                    weatherApp.$targetArea.append("City: " + city + "<br>" + "Temperature(Fahrenheit): " + temp + "<br>" + "Max Temperature: " + tempMax + "<br>" + "Min Temperature: " + tempMin + "<br>" + "Weather: " + weather + "<br>" + "Description: " + description + "<br><br>");


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
            var url = "//api.openweathermap.org/data/2.5/forecast?lat=" + weatherApp.lastLatitiude + "&lon=" + weatherApp.lastLongitude + "&appid=" + weatherApp.weatherApiKey + "&units=imperial";

            //var url = "testData/test5day.json"

            $.getJSON(url, function (data) {
                var $target = $("#5day");
                var i = 0;
                if (data.cod == 200) {
                    $target.html("Success!<br>");

                    // THIS IS WHERE YOU WOULD ADD THE 5 DAY FORCAST DATA TO THE PAGE

                    // For each of the 5 days, at each time specified, add the date/time plus:
                    //   - the weather condition descriptions, all of them, comma separated
                    //   - day's temp, low & high temp, pressure, humidity

                    for (i; i < data.list.length; i = i + 8) {
                        var time = data.list[i].dt_txt;
                        var temp = data.list[i].main.temp;
                        var tempMax = data.list[i].main.temp_max;
                        var tempMin = data.list[i].main.temp_min;
                        var pressure = data.list[i].main.pressure;
                        var humidity = data.list[i].main.humidity;
                        var weather = data.list[i].weather[0].main;
                        var description = data.list[i].weather[0].description;


                        //Logger Logging
                        //console.log("5 Day Forecast: " + time);
                        //console.log(time);

                        $target.append("Day/Time: " + time + "<br>" +
                            "Temperature: " + temp + "<br>" + "Max: " + tempMax + "<br>" + "Min: " + tempMin + "<br>" +
                            "Description: " + weather + ", " + description + "<br>" +
                            "Pressure: " + pressure + "<br>" +
                            "Humidity: " + humidity + "<br><br>"

                        );


                    }
                    //var time = data.list[0].dt_txt;console.log(time);



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