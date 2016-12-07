$(document).ready(function () {

  console.log("hello");

  weatherApp = {

    $targetArea: $("#weather"),

    weatherApiKey: "",

    lastLatitiude: "",
    lastLongitude: "",
    blnCurrent: false,

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
          //weatherApp.$targetArea.html("Success! </br>");
            blnCurrent=true;
          $("#weather").append("In the city of " + data.name + ": </br>");
            $("#weather").append("Cloudiness is at "+ data.clouds.all+ "%, </br>")
            $("#weather").append("Current temperature: "+data.main.temp+" degrees Farenheit, </br>");
            $("#weather").append("Current barometric pressure:"+data.main.pressure+ "millibars, <br>" );
            $("#weather").append("Current humidity:"+data.main.humidity+ "%, </br>");
            getWeatherConditions(data.weather,blnCurrent);
            $("#weather").append("Today's High temperature: " + data.main.temp_max+ " degrees Farenheit, </br>");
            $("#weather").append("Today's Low temperature: " + data.main.temp_min+ " degrees Farenheit, </br>");
            $("#weather").append("Current wind speed is " + data.wind.speed + " miles per hour  @"+data.wind.deg+" degrees, </br>");
            $("#weather").append("Winds gusts are at " + data.wind.gust+ " miles per hour")
            $("#weather").append("<hr>");
            // THIS IS WHERE YOU WOULD ADD THE DATA TO THE PAGE
          // Add the city name

          // Add the weather condition descriptions, all of them, comma separated

          // Add the current temperature, the day's low & high temp, current pressure, & current humidity

          // Get the lat & longitude from the result and save
          weatherApp.lastLatitiude = data.coord.lat;
          weatherApp.lastLongitude = data.coord.lon;
            console.log("last latitude is "+ weatherApp.lastLatitiude + "degrees");
            console.log("last longitude is "+ weatherApp.lastLongitude + "degrees");

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
        var nRainfall = 0.0000;
        var nSnowfall = 0.0000;
            blnCurrent = false;
          
        if (data.cod == 200) {
          $target.html("Five Day Forecast");

          // THIS IS WHERE YOU WOULD ADD THE 5 DAY FORCAST DATA TO THE PAGE
                $.each(data.list, function(i,item) {
                    $("#weather").append("For "+item.dt_txt+", </br>");
                    $("#weather").append("Cloudiness is at "+ item.clouds.all+ "%, </br>")
                    $("#weather").append("ground level pressure:"+item.main.grnd_level+" millibars, </br>");
                    $("#weather").append("humidity:"+item.main.humidity+"%, </br>");
                    getWeatherConditions(item.weather, blnCurrent);
                    $("#weather").append("barometric pressure:"+item.main.pressure+" millibars, </br>");
                    $("#weather").append("sea_level pressure:"+item.main.sea_level+" millibars, </br>");
                    $("#weather").append("Current temperature: "+item.main.temp+" degrees Farenheit, </br>");
                    $("#weather").append("Today's High temperature: " + item.main.temp_max+ " degrees Farenheit, </br>");
                    $("#weather").append("Today's Low temperature: " + item.main.temp_min+ " degrees Farenheit, </br>"); 
                    if (item.rain['3h']>0){
                        nRainfall = item.rain['3h']+" inches, </br>";
                    }
                    else {
                        nRainfall = "none, </br>";
                    }
                    $("#weather").append("Rainfall: "+nRainfall);
                    if (item.snow['3h']>0){
                        nSnowfall = item.snow['3h']+" inches, </br>";
                    }
                    else {
                        nSnowfall = "none, </br>";
                    }
                    $("#weather").append("Snowfall: "+nSnowfall);
                    $("#weather").append("Wind Speed:"+item.wind.speed+" miles per hour, @"+item.wind.deg+" degrees </br>");
                    $("#weather").append("<hr>");
                })
          // For each of the 5 days, at each time specified, add the date/time plus:
          //   - the weather condition descriptions, all of them, comma separated
          //   - day's temp, low & high temp, pressure, humidity


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

         function getWeatherConditions(arrayWeather, blnCurrent) {
          if (blnCurrent){
             $("#weather").append("Current weather conditions: </br>"); 
          } else {
             $("#weather").append("Weather conditions: </br>"); 
          }
         
          $.each(arrayWeather, function(i,item) {
                    var strEnd = "";
                    if (i != item.length){
                       strEnd = ", </br>"; 
                    }
                    else {
                       strEnd = "</br>";  
                    }
                    $("#weather").append(item.description + ", </br>");
               })
            
        }

});