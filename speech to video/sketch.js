// navigator.language
let lang = 'vi-VN';
let speechRec = new p5.SpeechRec(lang, gotSpeech);

let continuous = true;
let interim = false;

speechRec.start(continuous, interim);

function setup() {
  createCanvas(500, 50);
}

let printText;
function draw() {
  background(220);
  fill(0);
  noStroke();
  textSize(30);
  //textAlign(CENTER, CENTER);
  text(printText, 30, 33);
  //function write(printText){
  //  text('printText', 30, 20);
  //}
}

function gotSpeech() {
  if (speechRec.resultValue) {
    //createP(speechRec.resultString);
    let str = speechRec.resultString;
    console.log(str);
    printText = str;
    playVideo(str);
  }
}
function playVideo(str)
{
  let inputText=[];
  let text='';
  for (let i=0;i<str.length; i++) {
    if (str[i] == ' ') {
      kq = text.toLowerCase();
      inputText.push(kq);
      text = '';
    }
    else text = text + str[i];
  }
  kq = text.toLowerCase();
  inputText.push(kq);

  //for (let i=0; i<inputText.length; i++)
  //  console.log(inputText[i]);
  autoPlay(inputText);
}


function autoPlay(inputText)
{
  for (let i=0; i<inputText.length; i++){
    console.log(inputText[i]);
  }

  //let nameWord = ["xin" , "chào" , "bạn"];
  let playlist = [];
  let type = ".mp4";
  for (let i = 0; i < inputText.length; i++) {
      let nameVideo = "";
      let normalize = encodeURIComponent(inputText[i]);
      for(let j = 0 ; j < normalize.length ; j++)
          if(normalize[j] != '%')
              nameVideo = nameVideo + normalize[j];
          let videoPath = 'data/' + nameVideo + type;
            playlist.push(videoPath);
      }
  console.log(playlist);
  let video = Video(playlist[0], true);
  let i = 0;
  let o = 0;
  video.addEventListener('ended', function() {
      i++;
      //console.log(i);
      if (i > playlist.length) o = 1;
      if (o === 0) {
          console.log(i);
          video.src = playlist[i];
          video.play();
      }
  }, true);
  video.height = 280;
  video.width = 500;
  video.muted = true;
  video.src = playlist[0];
  console.log(video.src);
  video.play();
}
function Video(src, append) {
    let v = document.createElement("video");
    if (src != "") {
        v.src = src;
    }
    if (append == true) {
        document.body.appendChild(v);
    }
    return v;
}
