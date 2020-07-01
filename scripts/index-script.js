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

        $(this).removeClass("active-nb").dequeue();

        if (_Playing && $(noteblock)) {
            if ($(this).next().attr("class") == $(this).attr("class")) {
                triggerNoteblock($(this).next());
            }
            else {
                triggerNoteblock($(".note-block").first());
            }
        }

    });

}

function stopSequence() {
    _Playing = false;
}