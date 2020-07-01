var _Playing = false;
var tempo = 90;

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
    $(".note-block").on("click", function () {
        toggleActiveNote(this);
    });
});

function playSequence() {
    var firstNoteblock = $(".note-block").first();

    _Playing = true;
    triggerNoteblock(firstNoteblock);
}

function triggerNoteblock(noteblock) {
    $(noteblock).addClass("triggered-nb").delay(tempo).queue(function () {
        $(this).removeClass("triggered-nb").dequeue();

        if (_Playing && $(noteblock)) {
            if ($(this).next().hasClass("note-block")) {
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

function toggleActiveNote(noteblock) {
    console.log($(noteblock).attr("class"));

    if ($(noteblock).hasClass("active-nb")) {
        $(noteblock).removeClass("active-nb")
    }
    else {
        $(noteblock).addClass("active-nb")
    }
}