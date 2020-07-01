var allSamples = new Array();
var tempo = 120;
var _Playing = false;

$(document).ready(function () {
    $("#tempo-ctrl").val(tempo);

    loadAllSamples();

    //Listeners
    $("#tempo-ctrl").on("click", function () {
        setTempo();
    });
    $("#play-btn").on("click", function () {
        if (!_Playing) { playSequence(); }
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

function setTempo() { tempo = $("#tempo-ctrl").val(); }
function getMilisecondsFromTempo() { return (60000 / tempo) / 4; }

function loadAllSamples() {
    allSamples.push(new Audio("samples/os-sidestick.mp3"));
    allSamples.type = "audio/mp3";
}

function playSequence() {
    var firstNoteblock = $(".note-block").first();

    _Playing = true;
    triggerNoteblock(firstNoteblock);
}

function triggerNoteblock(noteblock) {
    allSamples[0].play();

    $(noteblock).addClass("triggered-nb").delay(getMilisecondsFromTempo()).queue(function () {
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
    if ($(noteblock).hasClass("active-nb")) {
        $(noteblock).removeClass("active-nb")
    }
    else {
        $(noteblock).addClass("active-nb")
    }
}