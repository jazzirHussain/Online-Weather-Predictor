
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];
const videoPath = {
  rain: 'static/video/rain.mp4',
  sun:'static/video/sun.mp4',
  snow: 'static/video/snow.mp4',
  fog: 'static/video/fog.mp4',
  drizzle: 'static/video/drizzle.mp4'
}
const audioPath = {
  rain: 'static/audio/rain.wav',
  sun:'static/audio/sun.mp3',
  snow: 'static/audio/snow.mp3',
  fog: 'static/audio/fog.mp3',
  drizzle: 'static/audio/drizzle.mp3'
}

document.querySelector(".search button").addEventListener("click", function () {
  predictWeather()
});

function getVideoPath(key){
  if(key in videoPath){
    return videoPath[key]
  }
  else return false
}

function getAudioPath(key){
  if(key in audioPath){
    return audioPath[key]
  }
  else return false
}

function predictWeather() {
  var inputDate = document.getElementById('inputDate').value;

  // Make a POST request to your Flask API
  fetch('/predict_weather', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'date=' + inputDate
  })
    .then(response => response.json())
    .then(data => {
      // Display the predicted weather in the <p> tag
      document.querySelector(".city").innerText = "Climate on " + new Date(inputDate).toDateString();

      const { predicted_weather } = data
      document.querySelector(".temp").innerText = predicted_weather.toUpperCase();
      document.querySelector(".weather").classList.remove("loading");
      if (getVideoPath(predicted_weather)) {
        var video = document.getElementById('background-video');
        var audio = document.getElementById('background-audio');
        video.src = getVideoPath(predicted_weather);
        audio.src = getAudioPath(predicted_weather)
        video.style.visibility = 'visible';
      } else {
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";
      }

    })
    .catch(error => {
      console.error('Error:', error);
    });
}
