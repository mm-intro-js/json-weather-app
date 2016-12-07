$(document).ready(function () {

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
    },

    getWeatherData: function (zipcode) {
      var url = "//api.openweathermap.org/data/2.5/weather?zip=" + zipcode + ",us&appid=" + weatherApp.weatherApiKey + "&units=imperial";

      //var url = "testData/test.json"
      var e = 0;

      $.getJSON(url, function (data) {

        if (data.cod == 200) {
            weatherApp.$targetArea.append("<p>City: " + data.name + "</br>" +   
                                          "Current Pressure: " + data.main.pressure + "</br>" +
                                          "Current Humidity: " + data.main.humidity + "</br>" +
                                          "Current Temp: " + data.main.temp + 
                                          " (Low: " + data.main.temp_min + " --- High: " + data.main.temp_max + ")" +
                                          "</p>");
            for (var i=0; i < data.weather.length; i++) {
                $.each(data.weather[i], function(index, value) {
                    e++;
                    if (e == 4)
                        {
                            weatherApp.$targetArea.append(index + value + ".</br>");
                            e=0;
                            
                        }
                    else
                        {
                            weatherApp.$targetArea.append(index + value + ", ");
                        };
                });
            };
                    
          weatherApp.lastLatitiude = data.coord.lat;
          weatherApp.lastLongitude = data.coord.lon;

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
        var $target = $("#5day")
        var e = 0;
        if (data.cod == 200) {

          // THIS IS WHERE YOU WOULD ADD THE 5 DAY FORCAST DATA TO THE PAGE
            
            for (var i=0; i<data.list.length; i++) {
                $target.append('<p>' + data.list[i].dt_txt + '</br>' +
                               'Pressure: ' +data.list[i].main.pressure +
                               ', Humidity: ' +data.list[i].main.Humidity +
                               ', Current temp: ' +data.list[i].main.temp +
                               ' (Low: ' +data.list[i].main.temp_min +
                               '---High: ' +data.list[i].main.temp_max +
                               ')</p>');
                e=0;
                $.each(data.list[i].weather[0], function(index, value) {
                    e++;
                    if (e == 4)
                        {
                            $target.append(index +": "+ value + ".");
                            e=0;
                        }
                    else
                        {
                            $target.append(index +": "+ value + ", ");
                        }
                });
            };

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