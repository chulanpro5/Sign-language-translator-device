var text = "Xin chào";
text = encodeURIComponent(text);
console.log(text);
var url = "https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=vi&q=" + text;
console.log(url);
$('audio').attr('src', url).get(0).play();