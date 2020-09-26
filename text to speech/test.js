var msg = new SpeechSynthesisUtterance();
var voices = window.speechSynthesis.getVoices();
msg.voice = voices[0];
msg.volume = 1;
msg.rate = 1;
msg.pitch = 2;
msg.text = "";
msg.lang = 'vi';
speechSynthesis.speak(msg);