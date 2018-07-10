var animals = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird", 
"ferret", "turtle", "sugar glider", "chinchilla", "hedgehog", "hermit crab", 
"gerbil", "capybara", "teacup pig", "serval", "salamander", "frog"]

function displayGifInfo() {
  var animalname = $(this).attr("animalName");
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=XhmH9jMCy7Gt5jsFhnSWNvPKpzm5VEjH&q=" + animalname + "&limit=10&offset=0&rating=PG&lang=en";  
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response)
    $("#animalGifs").empty()
    for (var i = 0; i< response.data.length; i++) {
      var gifdiv = $("<div class='gifdiv'>")
      $("#animalGifs").prepend(gifdiv)
      var rating = $("<p>").text("Rating: " + response.data[i].rating)
      gifdiv.append(rating)
      var animalgif = $("<img>").attr("src", response.data[i].images.fixed_height_still.url).attr("state", "still")
      animalgif.attr("stillurl", response.data[i].images.fixed_height_still.url)
      animalgif.attr("movingurl", response.data[i].images.fixed_height.url)
      gifdiv.append(animalgif)

      animalgif.on("click", function () {
        var state = $(this).attr("state")
        if (state === "moving") {
          var movingurl = $(this).attr("stillurl")
          $(this).attr("src", movingurl)
          $(this).attr("state", "still")
          // console.log("stop") 
        }
        else if (state === "still") {
          var stillurl = $(this).attr("movingurl")
          $(this).attr("src", stillurl)
          $(this).attr("state", "moving")
          // console.log("go")
        }
      })
    }
  });
}

function renderButtons() {
  $("#animalButtons").empty()
  for (var i = 0; i < animals.length; i++) {
    var ab = $("<button>")
    ab.addClass("animalButton")
    ab.attr("animalName", animals[i])
    ab.text(animals[i])
    $("#animalButtons").append(ab)
  }
};

$("#addAnimal").on("click", function (event) {
  event.preventDefault();
  var newAnimal = $("#animal-input").val().trim()
  animals.push(newAnimal)
  console.log(animals)
  renderButtons();
  $("#animal-input").val('')
});

$(document).on("click", ".animalButton", displayGifInfo);

renderButtons(); 
