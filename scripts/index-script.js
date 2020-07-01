$(document).ready(function () {
    var tempo = 120;
    var noteblocks = $(".note-block");

    //Listeners
    $("#play-btn").on("click", function () {
        playSequence();
    });
    $("#stop-btn").on("click", function () {
        stopSequence();
    });
    $("#pause-btn").on("click", function () {
        stopSequence();
    })
});

function playSequence() {
    alert("play");
}

function stopSequence() {
    alert("stop");
}