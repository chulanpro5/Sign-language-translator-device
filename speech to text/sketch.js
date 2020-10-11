// navigator.language
let lang = 'en-US';
let speechRec = new p5.SpeechRec(lang, gotSpeech);

let continuous = true;
let interim = false;

speechRec.start(continuous, interim);

function gotSpeech() {
    if (speechRec.resultValue) {
        //createP(speechRec.resultString);
        let str = speechRec.resultString;
        console.log(str);

        let inputText = [];
        let text = '';
        for (i = 0; i < str.length; i++) {
            text = text + str[i];
            if (str[i] == ' ') {
                kq = text.toLowerCase();
                inputText.push(kq);
                text = '';
            }
        }
        kq = text.toLowerCase();
        inputText.push(kq);

        for (let i = 0; i < inputText.length; i++)
            console.log(inputText[i]);
    }
}