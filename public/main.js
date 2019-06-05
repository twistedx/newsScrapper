// Grab the articles as a json
$.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    console.log(data[i].saved);

    if (!data[i].saved) {
      var div = $("<div class='card'>");
      div.append(`<div class='card-header'>
    ${data[i].title} <br>
      <a class="btn btn-small btn-primary" href="${data[i].url}"> Link </a>
      <a class="btn btn-small text-white btn-danger"data-toggle="modal" data-target="#myModal"  id="save" data-id="${
        data[i]._id
      }"> Save </a>
        `);
      $("#articles").append(div);
    } else {
      var div = $("<div class='card'>");
      div.append(`<div class='card-header' id="notePage">
      ${data[i].title} <br>
        <a class="btn btn-small btn-primary" href="${data[i].url}"> Link </a>
        <a class="btn btn-small text-white btn-danger deleteMe" data-id="${
          data[i]._id
        }" id="tacoTruck">delete</a>
        <a class="btn btn-small text-white btn-success" data-toggle="modal" id="update" data-target="#myModal" data-id="${
          data[i]._id
        }"> update </a>
          `);
      $("#savednotes").append(div);
    }
  }
});

// Whenever someone clicks a p tag
$(document).on("click", "#save", function() {
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      $("#notes").empty();

      $("#notes").text(`${data.title}`);

      // A button to submit a new note, with the id of the article saved to it
      $("#notes").attr("data-id", data._id);

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
});

$(document).on("click", "#update", function() {
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      $("#notes").empty();

      $("#notes").text(`${data.title}`);

      // A button to submit a new note, with the id of the article saved to it
      $("#notes").attr("data-id", data._id);

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
});

$("#myModal").on("shown.bs.modal", function() {
  $("#myInput").trigger("focus");
});

$("#submitModal").on("click", function(e) {
  var thisId = $("#notes").attr("data-id");
  var title = $("#titleinput").val();
  var body = $("#bodyinput").val();

  console.log(title + " " + body);
  console.log(thisId);
  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: title,
      // Value taken from note textarea
      body: body
    }
  }).then(function(data) {
    $("#myModal").modal("hide");
    window.location = "/";
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });
});

$(document).on("click", ".deleteMe", function(e) {
  var thisId = $(this).attr("data-id");
  $.ajax({
    method: "DELETE",
    url: "/articles/delete/" + thisId
  }).done(data => {
    window.location = "/";
  });
});
