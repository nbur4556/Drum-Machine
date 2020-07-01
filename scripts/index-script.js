var trackList = new Array();
var tempo = 120;
var _Playing = false;

//Track class stores a tracks sample, tab number, and notelist for a specific track
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
        this.samplePlayer[this.spIndex].play();
    }
}

//Run when JQuery document is loaded
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

//Getters and Setters
function setTempo() { tempo = $("#tempo-ctrl").val(); }
function getMilisecondsFromTempo() { return (60000 / tempo) / 4; }

//Create track objects and store in track list
function buildTracks() {
    let i = 0;
    trackList[i] = new Track(i, "samples/os-sidestick.mp3");
    console.log(trackList[i]);
}

//Set and trigger first noteblock, and start recursion
function playSequence() {
    var firstNoteblock = $(".note-block").first();

    _Playing = true;
    triggerNoteblock(firstNoteblock);
}

//Trigger a specific noteblock, and loop to the next noteblock if _Playing is true
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

//Set _Playing to false, stopping recursion in playSequence() and triggerNoteblock() functions
function stopSequence() {
    _Playing = false;
}

//If a selected noteblock is active, set to inactive. If a selected noteblock is inactive, set to active.
function toggleActiveNote(noteblock) {
    if ($(noteblock).hasClass("active-nb")) {
        $(noteblock).removeClass("active-nb")
    }
    else {
        $(noteblock).addClass("active-nb")
    }
}