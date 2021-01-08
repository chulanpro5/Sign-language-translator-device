var msg = new SpeechSynthesisUtterance();
var voices = window.speechSynthesis.getVoices();
msg.voice = voices[0];
msg.volume = 1;
msg.rate = 1;
msg.pitch = 2;
msg.text = "xin chào tôi tên là Hiếu";
msg.lang = 'vi';
speechSynthesis.speak(msg);