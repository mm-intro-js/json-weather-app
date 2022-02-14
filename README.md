# Simple Weather Application

This application uses the [Open Weather API](http://openweathermap.org/api) to display current weather data for a city with an option to also show the 5 day forcast data.

To use this application you must have a key for the API that you will enter when prompted.  Once entered, this key will be stored in your browser for later use.

## Assignment Goals:

- Build a JavaScript application object.
- Learn to use an online JSON data web API.
- Use jQuery to get ajax data and show appropriate error messages if the data cannot be obtained.
- Use jQuery to dynamically add the data to the web page.
- Use Aria attributes in HTML to indicate dynamic data


## GitHub Repository
https://github.com/htc-ccis2591/simple-weather-app/

You’ll want to begin each assignment by forking the repository and cloning it locally.  When you are done, you’ll push to GitHub and submit a pull request.

## Web API
For this assignment, we will use the Open Weather API to make a simple JavaScript application to get the weather by zip code.  

### Get API Key
To work with the API, you must register and get an API key.  You can get a free key that is able to make a limited number of requests for data.

### Store key
If the key is in local storage, use the key that was stored and hide the form field for the API key.  If the key is not found in local storage, show the form field to enter the API key. Then store the key entered in local browser storage so it doesn't need to be entered again. 

### Get Weather by Zip Code
Make a call to get the weather by zip code:  http://openweathermap.org/current#zip

Build HTML to display the name of the city plus all of the weather descriptions (for example, “Sky is clear.”), the current temperature, the daily high and low, current pressure and humidity.

Make sure to display the temperature in degrees Fahrenheit.  You can optionally set up Celcius if you like, but it should not be shown as the default.

### Get 5 Day Weather
Add a button after the current data to get the 5 day weather information.  The 5 day weather information is not available by zip.  You need to provide the latitude and longitude which is available from the current weather by zip code response.  Save this information from the earlier API call so that it can be used if they request the 5-day data.

Make a call to get the weather by zip code:  https://openweathermap.org/forecast5#geo5

Build HTML to display for each day and time in the response, all of the weather descriptions (for example, “Sky is clear.”), the temperature, the daily high and low, current pressure and humidity. 

Make sure to display the temperature in degrees Fahrenheit.  You can optionally set up Celcius if you like, but it should not be shown as the default.
