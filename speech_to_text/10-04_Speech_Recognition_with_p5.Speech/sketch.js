// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/q_bXBcmfTJM

function setup() {
    noCanvas();
    let lang = navigator.language || 'en-US ';
    //  getAudioContext().resume();
    let speechRec = new p5.SpeechRec(lang, gotSpeech);
    console.log(speechRec);
    let continuous = true;
    let interim = true;
    speechRec.start(continuous, interim);

    function gotSpeech() {
        console.log("Alo");
        if (speechRec.resultValue) {
            createP(speechRec.resultString);
        }
    }
}