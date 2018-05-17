$(function() {
  var keywordArray = [];
  var titleArray = [];
  var contributorArray = [];
  var searchArray = [];

  $.get("/json", function(data) {
    //Make sure there are no duplicates and sort data into
    //a specific array and a main autocomplete array
    function dataSort(sortedArray, acArray) {
      var isRepeat = false;
      if (acArray.length > 0) {
        for (var j = 0; j < acArray.length; j++) {
          if (datapoint === acArray[j]) {
            isRepeat = true;
          }
        }
      }
      if (isRepeat === false) {
        sortedArray.push(datapoint);
        acArray.push(datapoint);
      }
    }

    for (var i = 0; i < data.videos.length; i++) {
      var datapoint = data.videos[i].keywordOne;
      dataSort(keywordArray, searchArray);
    }

    for (var i = 0; i < data.videos.length; i++) {
      var datapoint = data.videos[i].keywordTwo;
      if (datapoint !== "") {
        dataSort(keywordArray, searchArray);
      }
    }

    for (var i = 0; i < data.videos.length; i++) {
      var datapoint = data.videos[i].keywordThree;
      if (datapoint !== "") {
        dataSort(keywordArray, searchArray);
      }
    }

    for (var i = 0; i < data.videos.length; i++) {
      var datapoint = data.videos[i].title;
      dataSort(titleArray, searchArray);
    }

    for (var i = 0; i < data.videos.length; i++) {
      var datapoint = data.videos[i].Contributor.name;
      dataSort(contributorArray, searchArray);
    }

    //integrate select2 autocomplete package with search bar
    $(".search_bar").select2({ data: searchArray });
  });

  //process search requests and redirect to search page
  $("#nav_search_btn").on("click", function(event) {
    event.preventDefault();
    var searchTerm = $(".search_bar")
      .find(":selected")
      .text();
    //function to determine which route to use
    function findSearchRoute(array, searchTerm) {
      for (var i = 0; i < array.length; i++) {
        if (searchTerm === array[i]) {
          if (array === keywordArray) {
            queryUrl = "/api/videos/keyword/" + searchTerm;
            console.log(queryUrl);
            window.location.href = queryUrl;
          } else if (array === titleArray) {
            queryUrl = "/api/videos/" + searchTerm;
            console.log(queryUrl);
            window.location.href = queryUrl;
          } else if (array === contributorArray) {
            queryUrl = "/api/videos/contributor/" + searchTerm;
            console.log(queryUrl);
            window.location.href = queryUrl;
          }
        }
      }
    }
    //check all routes
    function routeSearch(searchTerm) {
      findSearchRoute(keywordArray, searchTerm);
      findSearchRoute(titleArray, searchTerm);
      findSearchRoute(contributorArray, searchTerm);
    }

    routeSearch(searchTerm);
  });
});
