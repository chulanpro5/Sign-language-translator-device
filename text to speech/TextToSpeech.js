let text = ["Tôi ", "tên ", "là ", "Hiếu"];
let audio = "";
for (let i = 0; i < text.length; i++) {
    audio += text[i];
}
console.log(audio);
audio = encodeURIComponent(audio);
console.log(audio);
var url = "https://translate.google.com.vn/translate_tts?ie=UTF-8&q=" + audio + "&tl=vi&client=tw-ob";
console.log(url);
$('audio').attr('src', url).get(0).play();
