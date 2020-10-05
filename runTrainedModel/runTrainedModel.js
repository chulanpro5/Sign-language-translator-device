let output = document.getElementById('output');
let frameString = "",
    handString = "",
    fingerString = "";
let hand, finger;
let targetLabel = 'a';
let sentences = [];
let msg = new SpeechSynthesisUtterance();
let voices = window.speechSynthesis.getVoices();
let checkWord = "";
let options = {
    enableGestures: true,
    optimizeHMD: true,
    frameEventName: 'animationFrame',
};

function setup() {
    let options = {
        inputs: 450,
        outputs: 10,
        task: 'classification',
        debug: true
    }
    Model = ml5.neuralNetwork(options);
    const modelInfo = {
        model: 'model.json',
        metadata: 'model_meta.json',
        weights: 'model.weights.bin',
    };
    Model.load(modelInfo, ModelLoaded);
}

function ModelLoaded() {
    console.log('Ready');
    classifyLeap();
}
let countFrame = 0;
let wordPackage = ["Tôi ", "bạn ",
    "gia đình ", "bóng chuyền ", "thể thao ",
    "chơi ", "khỏe mạnh ", "ăn ", "uống ", "nghỉ ngơi ", "tập thể dục ", "cười ", "khóc ", "buồn ", "vui ",
    "không ?"
];
let wordType = [1, 1,
    2, 2, 2,
    3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    4
];
// 1 : chủ ngữ
// 2 : động từ
// 3 : bổ ngữ
let sentencePackage = [
    "Bạn có khỏe mạnh không ?",
    "Tôi đang ăn cơm",
    "Tôi rất vui",
    "Tôi đang buồn",
    "Tôi khá là mệt mõi"
]

let wordtype = [];

function findIdWord(sentence) {
    for (let i = 0, len = sentence.length; i < len; i++) {
        let word = sentence[i];
        for (let j = 0; j < wordPackage.length; j++)
            if (word == wordPackage[j])
                wordtype[i] = wordType[j];
    }
}

function sortSentence(sentence) {
    let len = sentence.length;
    for (let i = 0; i < len; i++)
        for (let j = 0; j < len; j++) {
            if (wordtype[j] > wordtype[i]) {
                let temp = wordtype[j];
                let tmp = sentence[j];
                wordtype[j] = wordtype[i];
                wordtype[i] = temp;
                sentence[j] = sentence[i];
                sentence[i] = tmp;
            }
        }
    return sentence;
}

function createSentence(sentence) {
    let len = sentence.length;
    let newSentence = [];
    let ans = "";
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < len; j++) {
            let str = sentencePackage[i];
            if (str.indexOf(sentence[j]) != -1)
                newSentence.push(str.indexOf(sentence[j]));
        }
        let check = 1;
        for (let j = 0; j < newSentence.length - 1; j++)
            if (newSentence[j] > newSentence[j + 1])
                check = 0;
        if (check == 1) {
            if (newSentence.length > ans.length)
                ans = sentencePackage[i];
        }
    }
    return ans;
}
findIdWord(sentenceExample);
let ans = sortSentence(sentenceExample);
console.log(ans);
ans = createSentence(ans);
console.log(ans);

function classifyLeap() {
    countFrame = 0;
    let inputsData = [];
    let inputsTrain = [];
    Leap.loop(options, function(frame) {
        if (frame.id % 20 == 0 && countFrame == 0) {
            let check = 0;
            let inputs = {
                xDipThumbLeft: 0,
                yDipThumbLeft: 0,
                zDipThumbLeft: 0,
                xPipThumbLeft: 0,
                yPipThumbLeft: 0,
                zPipThumbLeft: 0,
                xMcpThumbLeft: 0,
                yMcpThumbLeft: 0,
                zMcpThumbLeft: 0,

                xDipIndexLeft: 0,
                yDipIndexLeft: 0,
                zDipIndexLeft: 0,
                xPipIndexLeft: 0,
                yPipIndexLeft: 0,
                zPipIndexLeft: 0,
                xMcpIndexLeft: 0,
                yMcpIndexLeft: 0,
                zMcpIndexLeft: 0,

                xDipMiddleLeft: 0,
                yDipMiddleLeft: 0,
                zDipMiddleLeft: 0,
                xPipMiddleLeft: 0,
                yPipMiddleLeft: 0,
                zPipMiddleLeft: 0,
                xMcpMiddleLeft: 0,
                yMcpMiddleLeft: 0,
                zMcpMiddleLeft: 0,

                xDipRingLeft: 0,
                yDipRingLeft: 0,
                zDipRingLeft: 0,
                xPipRingLeft: 0,
                yPipRingLeft: 0,
                zPipRingLeft: 0,
                xMcpRingLeft: 0,
                yMcpRingLeft: 0,
                zMcpRingLeft: 0,

                xDipPinkyLeft: 0,
                yDipPinkyLeft: 0,
                zDipPinkyLeft: 0,
                xPipPinkyLeft: 0,
                yPipPinkyLeft: 0,
                zPipPinkyLeft: 0,
                xMcpPinkyLeft: 0,
                yMcpPinkyLeft: 0,
                zMcpPinkyLeft: 0,
                xDipThumbRight: 0,
                yDipThumbRight: 0,
                zDipThumbRight: 0,
                xPipThumbRight: 0,
                yPipThumbRight: 0,
                zPipThumbRight: 0,
                xMcpThumbRight: 0,
                yMcpThumbRight: 0,
                zMcpThumbRight: 0,

                xDipIndexRight: 0,
                yDipIndexRight: 0,
                zDipIndexRight: 0,
                xPipIndexRight: 0,
                yPipIndexRight: 0,
                zPipIndexRight: 0,
                xMcpIndexRight: 0,
                yMcpIndexRight: 0,
                zMcpIndexRight: 0,

                xDipMiddleRight: 0,
                yDipMiddleRight: 0,
                zDipMiddleRight: 0,
                xPipMiddleRight: 0,
                yPipMiddleRight: 0,
                zPipMiddleRight: 0,
                xMcpMiddleRight: 0,
                yMcpMiddleRight: 0,
                zMcpMiddleRight: 0,

                xDipRingRight: 0,
                yDipRingRight: 0,
                zDipRingRight: 0,
                xPipRingRight: 0,
                yPipRingRight: 0,
                zPipRingRight: 0,
                xMcpRingRight: 0,
                yMcpRingRight: 0,
                zMcpRingRight: 0,

                xDipPinkyRight: 0,
                yDipPinkyRight: 0,
                zDipPinkyRight: 0,
                xPipPinkyRight: 0,
                yPipPinkyRight: 0,
                zPipPinkyRight: 0,
                xMcpPinkyRight: 0,
                yMcpPinkyRight: 0,
                zMcpPinkyRight: 0,
            }
            for (let i = 0, len = frame.hands.length; i < len; i++) {
                check = 1;
                hand = frame.hands[i];
                if (hand.type == 'left') {
                    for (let j = 0, len2 = hand.fingers.length; j < len2; j++) {
                        finger = hand.fingers[j];
                        if (finger.type == 0) {
                            inputs.xDipThumbLeft = finger.dipPosition[0];
                            inputs.yDipThumbLeft = finger.dipPosition[1];
                            inputs.zDipThumbLeft = finger.dipPosition[2];
                            inputs.xPipThumbLeft = finger.pipPosition[0];
                            inputs.yPipThumbLeft = finger.pipPosition[1];
                            inputs.zPipThumbLeft = finger.pipPosition[2];
                            inputs.xMcpThumbLeft = finger.mcpPosition[0];
                            inputs.yMcpThumbLeft = finger.mcpPosition[1];
                            inputs.zMcpThumbLeft = finger.mcpPosition[2];
                        } else if (finger.type == 1) {
                            inputs.xDipIndexLeft = finger.dipPosition[0];
                            inputs.yDipIndexLeft = finger.dipPosition[1];
                            inputs.zDipIndexLeft = finger.dipPosition[2];
                            inputs.xPipIndexLeft = finger.pipPosition[0];
                            inputs.yPipIndexLeft = finger.pipPosition[1];
                            inputs.zPipIndexLeft = finger.pipPosition[2];
                            inputs.xMcpIndexLeft = finger.mcpPosition[0];
                            inputs.yMcpIndexLeft = finger.mcpPosition[1];
                            inputs.zMcpIndexLeft = finger.mcpPosition[2];
                        } else if (finger.type == 2) {
                            inputs.xDipMiddleLeft = finger.dipPosition[0];
                            inputs.yDipMiddleLeft = finger.dipPosition[1];
                            inputs.zDipMiddleLeft = finger.dipPosition[2];
                            inputs.xPipMiddleLeft = finger.pipPosition[0];
                            inputs.yPipMiddleLeft = finger.pipPosition[1];
                            inputs.zPipMiddleLeft = finger.pipPosition[2];
                            inputs.xMcpMiddleLeft = finger.mcpPosition[0];
                            inputs.yMcpMiddleLeft = finger.mcpPosition[1];
                            inputs.zMcpMiddleLeft = finger.mcpPosition[2];
                        } else if (finger.type == 3) {
                            inputs.xDipRingLeft = finger.dipPosition[0];
                            inputs.yDipRingLeft = finger.dipPosition[1];
                            inputs.zDipRingLeft = finger.dipPosition[2];
                            inputs.xPipRingLeft = finger.pipPosition[0];
                            inputs.yPipRingLeft = finger.pipPosition[1];
                            inputs.zPipRingLeft = finger.pipPosition[2];
                            inputs.xMcpRingLeft = finger.mcpPosition[0];
                            inputs.yMcpRingLeft = finger.mcpPosition[1];
                            inputs.zMcpRingLeft = finger.mcpPosition[2];
                        } else if (finger.type == 4) {
                            inputs.xDipPinkyLeft = finger.dipPosition[0];
                            inputs.yDipPinkyLeft = finger.dipPosition[1];
                            inputs.zDipPinkyLeft = finger.dipPosition[2];
                            inputs.xPipPinkyLeft = finger.pipPosition[0];
                            inputs.yPipPinkyLeft = finger.pipPosition[1];
                            inputs.zPipPinkyLeft = finger.pipPosition[2];
                            inputs.xMcpPinkyLeft = finger.mcpPosition[0];
                            inputs.yMcpPinkyLeft = finger.mcpPosition[1];
                            inputs.zMcpPinkyLeft = finger.mcpPosition[2];
                        }
                    }
                } else if (hand.type == 'right') {
                    for (let j = 0, len2 = hand.fingers.length; j < len2; j++) {
                        finger = hand.fingers[j];
                        if (finger.type == 0) {
                            inputs.xDipThumbRight = finger.dipPosition[0];
                            inputs.yDipThumbRight = finger.dipPosition[1];
                            inputs.zDipThumbRight = finger.dipPosition[2];
                            inputs.xPipThumbRight = finger.pipPosition[0];
                            inputs.yPipThumbRight = finger.pipPosition[1];
                            inputs.zPipThumbRight = finger.pipPosition[2];
                            inputs.xMcpThumbRight = finger.mcpPosition[0];
                            inputs.yMcpThumbRight = finger.mcpPosition[1];
                            inputs.zMcpThumbRight = finger.mcpPosition[2];
                        } else if (finger.type == 1) {
                            inputs.xDipIndexRight = finger.dipPosition[0];
                            inputs.yDipIndexRight = finger.dipPosition[1];
                            inputs.zDipIndexRight = finger.dipPosition[2];
                            inputs.xPipIndexRight = finger.pipPosition[0];
                            inputs.yPipIndexRight = finger.pipPosition[1];
                            inputs.zPipIndexRight = finger.pipPosition[2];
                            inputs.xMcpIndexRight = finger.mcpPosition[0];
                            inputs.yMcpIndexRight = finger.mcpPosition[1];
                            inputs.zMcpIndexRight = finger.mcpPosition[2];
                        } else if (finger.type == 2) {
                            inputs.xDipMiddleRight = finger.dipPosition[0];
                            inputs.yDipMiddleRight = finger.dipPosition[1];
                            inputs.zDipMiddleRight = finger.dipPosition[2];
                            inputs.xPipMiddleRight = finger.pipPosition[0];
                            inputs.yPipMiddleRight = finger.pipPosition[1];
                            inputs.zPipMiddleRight = finger.pipPosition[2];
                            inputs.xMcpMiddleRight = finger.mcpPosition[0];
                            inputs.yMcpMiddleRight = finger.mcpPosition[1];
                            inputs.zMcpMiddleRight = finger.mcpPosition[2];
                        } else if (finger.type == 3) {
                            inputs.xDipRingRight = finger.dipPosition[0];
                            inputs.yDipRingRight = finger.dipPosition[1];
                            inputs.zDipRingRight = finger.dipPosition[2];
                            inputs.xPipRingRight = finger.pipPosition[0];
                            inputs.yPipRingRight = finger.pipPosition[1];
                            inputs.zPipRingRight = finger.pipPosition[2];
                            inputs.xMcpRingRight = finger.mcpPosition[0];
                            inputs.yMcpRingRight = finger.mcpPosition[1];
                            inputs.zMcpRingRight = finger.mcpPosition[2];
                        } else if (finger.type == 4) {
                            inputs.xDipPinkyRight = finger.dipPosition[0];
                            inputs.yDipPinkyRight = finger.dipPosition[1];
                            inputs.zDipPinkyRight = finger.dipPosition[2];
                            inputs.xPipPinkyRight = finger.pipPosition[0];
                            inputs.yPipPinkyRight = finger.pipPosition[1];
                            inputs.zPipPinkyRight = finger.pipPosition[2];
                            inputs.xMcpPinkyRight = finger.mcpPosition[0];
                            inputs.yMcpPinkyRight = finger.mcpPosition[1];
                            inputs.zMcpPinkyRight = finger.mcpPosition[2];
                        }
                    }
                }
            }
            if (check == 1) {
                inputsData.push(inputs);
                if (inputsData.length == 5) {
                    for (let i = 0; i < 5; i++) {
                        if (inputsData[i].xDipThumbLeft != 0) {
                            inputsTrain.push(inputsData[i].xDipThumbLeft);
                            inputsTrain.push(inputsData[i].yDipThumbLeft);
                            inputsTrain.push(inputsData[i].zDipThumbLeft);
                            inputsTrain.push(inputsData[i].xPipThumbLeft);
                            inputsTrain.push(inputsData[i].yPipThumbLeft);
                            inputsTrain.push(inputsData[i].zPipThumbLeft);
                            inputsTrain.push(inputsData[i].xMcpThumbLeft);
                            inputsTrain.push(inputsData[i].yMcpThumbLeft);
                            inputsTrain.push(inputsData[i].zMcpThumbLeft);

                            inputsTrain.push(inputsData[i].xDipIndexLeft);
                            inputsTrain.push(inputsData[i].yDipIndexLeft);
                            inputsTrain.push(inputsData[i].zDipIndexLeft);
                            inputsTrain.push(inputsData[i].xPipIndexLeft);
                            inputsTrain.push(inputsData[i].yPipIndexLeft);
                            inputsTrain.push(inputsData[i].zPipIndexLeft);
                            inputsTrain.push(inputsData[i].xMcpIndexLeft);
                            inputsTrain.push(inputsData[i].yMcpIndexLeft);
                            inputsTrain.push(inputsData[i].zMcpIndexLeft);

                            inputsTrain.push(inputsData[i].xDipMiddleLeft);
                            inputsTrain.push(inputsData[i].yDipMiddleLeft);
                            inputsTrain.push(inputsData[i].zDipMiddleLeft);
                            inputsTrain.push(inputsData[i].xPipMiddleLeft);
                            inputsTrain.push(inputsData[i].yPipMiddleLeft);
                            inputsTrain.push(inputsData[i].zPipMiddleLeft);
                            inputsTrain.push(inputsData[i].xMcpMiddleLeft);
                            inputsTrain.push(inputsData[i].yMcpMiddleLeft);
                            inputsTrain.push(inputsData[i].zMcpMiddleLeft);

                            inputsTrain.push(inputsData[i].xDipRingLeft);
                            inputsTrain.push(inputsData[i].yDipRingLeft);
                            inputsTrain.push(inputsData[i].zDipRingLeft);
                            inputsTrain.push(inputsData[i].xPipRingLeft);
                            inputsTrain.push(inputsData[i].yPipRingLeft);
                            inputsTrain.push(inputsData[i].zPipRingLeft);
                            inputsTrain.push(inputsData[i].xMcpRingLeft);
                            inputsTrain.push(inputsData[i].yMcpRingLeft);
                            inputsTrain.push(inputsData[i].zMcpRingLeft);

                            inputsTrain.push(inputsData[i].xDipPinkyLeft);
                            inputsTrain.push(inputsData[i].yDipPinkyLeft);
                            inputsTrain.push(inputsData[i].zDipPinkyLeft);
                            inputsTrain.push(inputsData[i].xPipPinkyLeft);
                            inputsTrain.push(inputsData[i].yPipPinkyLeft);
                            inputsTrain.push(inputsData[i].zPipPinkyLeft);
                            inputsTrain.push(inputsData[i].xMcpPinkyLeft);
                            inputsTrain.push(inputsData[i].yMcpPinkyLeft);
                            inputsTrain.push(inputsData[i].zMcpPinkyLeft);
                        } else {
                            inputsTrain.push(inputsData[i].xDipThumbRight);
                            inputsTrain.push(inputsData[i].yDipThumbRight);
                            inputsTrain.push(inputsData[i].zDipThumbRight);
                            inputsTrain.push(inputsData[i].xPipThumbRight);
                            inputsTrain.push(inputsData[i].yPipThumbRight);
                            inputsTrain.push(inputsData[i].zPipThumbRight);
                            inputsTrain.push(inputsData[i].xMcpThumbRight);
                            inputsTrain.push(inputsData[i].yMcpThumbRight);
                            inputsTrain.push(inputsData[i].zMcpThumbRight);

                            inputsTrain.push(inputsData[i].xDipIndexRight);
                            inputsTrain.push(inputsData[i].yDipIndexRight);
                            inputsTrain.push(inputsData[i].zDipIndexRight);
                            inputsTrain.push(inputsData[i].xPipIndexRight);
                            inputsTrain.push(inputsData[i].yPipIndexRight);
                            inputsTrain.push(inputsData[i].zPipIndexRight);
                            inputsTrain.push(inputsData[i].xMcpIndexRight);
                            inputsTrain.push(inputsData[i].yMcpIndexRight);
                            inputsTrain.push(inputsData[i].zMcpIndexRight);

                            inputsTrain.push(inputsData[i].xDipMiddleRight);
                            inputsTrain.push(inputsData[i].yDipMiddleRight);
                            inputsTrain.push(inputsData[i].zDipMiddleRight);
                            inputsTrain.push(inputsData[i].xPipMiddleRight);
                            inputsTrain.push(inputsData[i].yPipMiddleRight);
                            inputsTrain.push(inputsData[i].zPipMiddleRight);
                            inputsTrain.push(inputsData[i].xMcpMiddleRight);
                            inputsTrain.push(inputsData[i].yMcpMiddleRight);
                            inputsTrain.push(inputsData[i].zMcpMiddleRight);

                            inputsTrain.push(inputsData[i].xDipRingRight);
                            inputsTrain.push(inputsData[i].yDipRingRight);
                            inputsTrain.push(inputsData[i].zDipRingRight);
                            inputsTrain.push(inputsData[i].xPipRingRight);
                            inputsTrain.push(inputsData[i].yPipRingRight);
                            inputsTrain.push(inputsData[i].zPipRingRight);
                            inputsTrain.push(inputsData[i].xMcpRingRight);
                            inputsTrain.push(inputsData[i].yMcpRingRight);
                            inputsTrain.push(inputsData[i].zMcpRingRight);

                            inputsTrain.push(inputsData[i].xDipPinkyRight);
                            inputsTrain.push(inputsData[i].yDipPinkyRight);
                            inputsTrain.push(inputsData[i].zDipPinkyRight);
                            inputsTrain.push(inputsData[i].xPipPinkyRight);
                            inputsTrain.push(inputsData[i].yPipPinkyRight);
                            inputsTrain.push(inputsData[i].zPipPinkyRight);
                            inputsTrain.push(inputsData[i].xMcpPinkyRight);
                            inputsTrain.push(inputsData[i].yMcpPinkyRight);
                            inputsTrain.push(inputsData[i].zMcpPinkyRight);
                        }
                        if (inputsData[i].xDipThumbRight != 0) {
                            inputsTrain.push(inputsData[i].xDipThumbRight);
                            inputsTrain.push(inputsData[i].yDipThumbRight);
                            inputsTrain.push(inputsData[i].zDipThumbRight);
                            inputsTrain.push(inputsData[i].xPipThumbRight);
                            inputsTrain.push(inputsData[i].yPipThumbRight);
                            inputsTrain.push(inputsData[i].zPipThumbRight);
                            inputsTrain.push(inputsData[i].xMcpThumbRight);
                            inputsTrain.push(inputsData[i].yMcpThumbRight);
                            inputsTrain.push(inputsData[i].zMcpThumbRight);

                            inputsTrain.push(inputsData[i].xDipIndexRight);
                            inputsTrain.push(inputsData[i].yDipIndexRight);
                            inputsTrain.push(inputsData[i].zDipIndexRight);
                            inputsTrain.push(inputsData[i].xPipIndexRight);
                            inputsTrain.push(inputsData[i].yPipIndexRight);
                            inputsTrain.push(inputsData[i].zPipIndexRight);
                            inputsTrain.push(inputsData[i].xMcpIndexRight);
                            inputsTrain.push(inputsData[i].yMcpIndexRight);
                            inputsTrain.push(inputsData[i].zMcpIndexRight);

                            inputsTrain.push(inputsData[i].xDipMiddleRight);
                            inputsTrain.push(inputsData[i].yDipMiddleRight);
                            inputsTrain.push(inputsData[i].zDipMiddleRight);
                            inputsTrain.push(inputsData[i].xPipMiddleRight);
                            inputsTrain.push(inputsData[i].yPipMiddleRight);
                            inputsTrain.push(inputsData[i].zPipMiddleRight);
                            inputsTrain.push(inputsData[i].xMcpMiddleRight);
                            inputsTrain.push(inputsData[i].yMcpMiddleRight);
                            inputsTrain.push(inputsData[i].zMcpMiddleRight);

                            inputsTrain.push(inputsData[i].xDipRingRight);
                            inputsTrain.push(inputsData[i].yDipRingRight);
                            inputsTrain.push(inputsData[i].zDipRingRight);
                            inputsTrain.push(inputsData[i].xPipRingRight);
                            inputsTrain.push(inputsData[i].yPipRingRight);
                            inputsTrain.push(inputsData[i].zPipRingRight);
                            inputsTrain.push(inputsData[i].xMcpRingRight);
                            inputsTrain.push(inputsData[i].yMcpRingRight);
                            inputsTrain.push(inputsData[i].zMcpRingRight);

                            inputsTrain.push(inputsData[i].xDipPinkyRight);
                            inputsTrain.push(inputsData[i].yDipPinkyRight);
                            inputsTrain.push(inputsData[i].zDipPinkyRight);
                            inputsTrain.push(inputsData[i].xPipPinkyRight);
                            inputsTrain.push(inputsData[i].yPipPinkyRight);
                            inputsTrain.push(inputsData[i].zPipPinkyRight);
                            inputsTrain.push(inputsData[i].xMcpPinkyRight);
                            inputsTrain.push(inputsData[i].yMcpPinkyRight);
                            inputsTrain.push(inputsData[i].zMcpPinkyRight);
                        } else {
                            inputsTrain.push(inputsData[i].xDipThumbLeft);
                            inputsTrain.push(inputsData[i].yDipThumbLeft);
                            inputsTrain.push(inputsData[i].zDipThumbLeft);
                            inputsTrain.push(inputsData[i].xPipThumbLeft);
                            inputsTrain.push(inputsData[i].yPipThumbLeft);
                            inputsTrain.push(inputsData[i].zPipThumbLeft);
                            inputsTrain.push(inputsData[i].xMcpThumbLeft);
                            inputsTrain.push(inputsData[i].yMcpThumbLeft);
                            inputsTrain.push(inputsData[i].zMcpThumbLeft);

                            inputsTrain.push(inputsData[i].xDipIndexLeft);
                            inputsTrain.push(inputsData[i].yDipIndexLeft);
                            inputsTrain.push(inputsData[i].zDipIndexLeft);
                            inputsTrain.push(inputsData[i].xPipIndexLeft);
                            inputsTrain.push(inputsData[i].yPipIndexLeft);
                            inputsTrain.push(inputsData[i].zPipIndexLeft);
                            inputsTrain.push(inputsData[i].xMcpIndexLeft);
                            inputsTrain.push(inputsData[i].yMcpIndexLeft);
                            inputsTrain.push(inputsData[i].zMcpIndexLeft);

                            inputsTrain.push(inputsData[i].xDipMiddleLeft);
                            inputsTrain.push(inputsData[i].yDipMiddleLeft);
                            inputsTrain.push(inputsData[i].zDipMiddleLeft);
                            inputsTrain.push(inputsData[i].xPipMiddleLeft);
                            inputsTrain.push(inputsData[i].yPipMiddleLeft);
                            inputsTrain.push(inputsData[i].zPipMiddleLeft);
                            inputsTrain.push(inputsData[i].xMcpMiddleLeft);
                            inputsTrain.push(inputsData[i].yMcpMiddleLeft);
                            inputsTrain.push(inputsData[i].zMcpMiddleLeft);

                            inputsTrain.push(inputsData[i].xDipRingLeft);
                            inputsTrain.push(inputsData[i].yDipRingLeft);
                            inputsTrain.push(inputsData[i].zDipRingLeft);
                            inputsTrain.push(inputsData[i].xPipRingLeft);
                            inputsTrain.push(inputsData[i].yPipRingLeft);
                            inputsTrain.push(inputsData[i].zPipRingLeft);
                            inputsTrain.push(inputsData[i].xMcpRingLeft);
                            inputsTrain.push(inputsData[i].yMcpRingLeft);
                            inputsTrain.push(inputsData[i].zMcpRingLeft);

                            inputsTrain.push(inputsData[i].xDipPinkyLeft);
                            inputsTrain.push(inputsData[i].yDipPinkyLeft);
                            inputsTrain.push(inputsData[i].zDipPinkyLeft);
                            inputsTrain.push(inputsData[i].xPipPinkyLeft);
                            inputsTrain.push(inputsData[i].yPipPinkyLeft);
                            inputsTrain.push(inputsData[i].zPipPinkyLeft);
                            inputsTrain.push(inputsData[i].xMcpPinkyLeft);
                            inputsTrain.push(inputsData[i].yMcpPinkyLeft);
                            inputsTrain.push(inputsData[i].zMcpPinkyLeft);
                        }
                    }
                    countFrame = 1;
                    console.log(inputsTrain);
                    Model.classify(inputsTrain, gotResult);
                }
            } else if (sentences.length > 0) {
                msg.voice = voices[10];
                msg.volume = 1;
                msg.rate = 1;
                msg.pitch = 2;
                msg.lang = 'vi';
                wordType = new Array;
                findIdWord(sentences);
                let speech = sortSentence(sentences);
                msg.text = createSentence(speech);
                speechSynthesis.speak(msg);
                console.log(msg.text);
                sentences = new Array;
                msg.text = "";
                checkWord = "";
            }
        }

    })
}

function gotResult(error, results) {
    //console.log(results);
    if (results[0].confidence > 0.7 && results[0].label != checkWord) {
        console.log(results);
        checkWord = results[0].label;
        console.log(results[0].label);
        sentences.push(results[0].label + ' ');
        setTimeout(classifyLeap, 1500);
    } else classifyLeap();
}