var msg = new SpeechSynthesisUtterance();
var voices = window.speechSynthesis.getVoices();
msg.voice = voices[0];
msg.volume = 1;
msg.rate = 1;
msg.pitch = 2;
msg.lang = 'vi';

let sentence = [
    "Bạn có khỏe không",
    "Bạn có khỏe không",
    "Bạn có khỏe không",
]

for (let i = 0; i < 3; i++) {
    msg.text = sentence[i];
    speechSynthesis.speak(msg);
    let k = 0;
    console.log(i);
    console.log(msg.text);
    for (let k = 0; k <= 1000; k++) {

    }
}