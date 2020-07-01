var trackList = new Array();
var tempo = 120;
var _Playing = false;

class Track {
    constructor(trackTabNumber, sampleReference) {
        this.trackTabNumber = trackTabNumber;
        this.sampleReference = sampleReference;
        this.samplePlayer = [
            new Audio(sampleReference),
            new Audio(sampleReference),
            new Audio(sampleReference),
            new Audio(sampleReference),
            new Audio(sampleReference)
        ];
        this.noteList = new Array(15);
        this.spIndex = 0;
    }

    play() {
        if (this.spIndex >= this.samplePlayer.length - 1) {
            this.spIndex = 0;
        }
        else {
            this.spIndex++;
        }
        console.log(this.spIndex);
        this.samplePlayer[this.spIndex].play();
    }
}

$(document).ready(function () {
    $("#tempo-ctrl").val(tempo);

    buildTracks();

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

function buildTracks() {
    let i = 0;
    trackList[i] = new Track(i, "samples/os-sidestick.mp3");
    console.log(trackList[i]);
}

function playSequence() {
    var firstNoteblock = $(".note-block").first();

    _Playing = true;
    triggerNoteblock(firstNoteblock);
}

function triggerNoteblock(noteblock) {
    if ($(noteblock).hasClass("active-nb")) {
        trackList[0].play();
    }

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