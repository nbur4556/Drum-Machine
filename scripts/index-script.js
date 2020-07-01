var _Playing = false;
var tempo = 120;

$(document).ready(function () {
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
    var firstNoteblock = $(".note-block").first();

    _Playing = true;
    triggerNoteblock(firstNoteblock);
}

function triggerNoteblock(noteblock) {

    $(noteblock).addClass("active-nb").delay(tempo).queue(function () {
        $(this).removeClass("active-nb");
        if (_Playing) {
            triggerNoteblock($(noteblock).next());
        }
    })

}

function stopSequence() {
    _Playing = false;
}