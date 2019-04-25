$(document).ready(function () {
    $("#notes").hide();
    $(document).on('click', '.articles', function () {
        $("#notes").show();
        // $("#notes").empty();
        var thisId = $(this).attr('data-id');
        console.log(thisId);
        $.ajax({
            method: "GET",
            url: "/articles/" + thisId
        })
            .then(function (data) {
                console.log(data);
                $("#titleinput").val(data.title);
                $("#bodyinput").val(data.note);
                $("#entryId").val(thisId);
            })
    });
    var send = function () {
        // Grab the id associated with the article from the submit button
        var thisId = $('#entryId').val();

        // Run a POST request to change the note, using what's entered in the inputs
        $.ajax({
            method: "POST",
            url: "/articles/" + thisId,
            data: {
                // Value taken from title input
                title: $("#titleinput").val(),
                // Value taken from note textarea
                body: $("#bodyinput").val()
            }
        })
            // With that done
            .then(function (data) {
                // Log the response
                console.log(data);
                // Empty the notes section
                // $("#notes").empty();
                window.location.replace("/");
            })
            .fail(function (err) {
                alert(err);
            });
    }
    $("#save").on("click",send);
    $("#delete").on("click", function () {
        $("#bodyinput").val("");
        send();
    });
});