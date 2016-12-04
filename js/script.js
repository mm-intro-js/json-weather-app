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
          
          // THIS IS WHERE YOU WOULD ADD THE DATA TO THE PAGE
          // Add the city name
          weatherApp.$targetArea.html("The weather for " + data.name + " is" + " Conditions: "  + data.weather[0].description + ", " +  "Current Temperature: " + data.main.temp + "F" + ", " + "Low: " + data.main.temp_min + "F" + ", " + "High: " + data.main.temp_max + "F" + ", " + "Pressure: " + data.main.pressure + ", " + "Humidity: " + data.main.humidity + "%");
          // Add the weather condition descriptions, all of them, comma separated
          // Add the current temperature, the day's low & high temp, current pressure, & current humidity

          // Get the lat & longitude from the result and save
          weatherApp.lastLatitiude = data.coord.lat;
          weatherApp.lastLongitude = data.coord.lon;

          // Add a button for 5 day forcast
          weatherApp.$targetArea.append('<div id="5day"><button id="fiveDay">Get 5 Day Forecast</button></div>');
          $("#fiveDay").on("click", weatherApp.getFiveDayWeather);
        $("#fiveDay").click(function(){
            $(this).remove();
        })        
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
        var $target = $("#5day")
        if (data.cod == 200) {
            
                      // THIS IS WHERE YOU WOULD ADD THE 5 DAY FORCAST DATA TO THE PAGE

          // For each of the 5 days, at each time specified, add the date/time plus:
          //   - the weather condition descriptions, all of them, comma separated
          //   - day's temp, low & high temp, pressure, humidity
            
            for (idx=0; idx <= data.list.length; idx++)
            {
                var myWeatherID = '#weather';
                
                $(myWeatherID).append('<p>Date: ' + data.list[idx].dt_txt + " " + "Condition(s): " + data.list[idx].weather[0].description + " ," + "Tempurature: "  + data.list[idx].main.temp + "," + "High: " + data.list[idx].main.temp_max + "," + "Low: " + data.list[idx].main.temp_min + "," + "Pressure: " + data.list[idx].main.pressure + "," + "Humidity: " + data.list[idx].main.humidity + "%");
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