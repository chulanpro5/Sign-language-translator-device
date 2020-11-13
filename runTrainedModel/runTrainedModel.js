let output = document.getElementById('output');
let frameString = "",
    handString = "",
    fingerString = "";
let hand, finger;
let targetLabel = 'a';
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
        inputs: 810,
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
let wordPackage = ["tôi", "bạn",
    "gia đình", "bóng chuyền", "thể thao",
    "chơi", "khỏe mạnh", "ăn", "uống", "nghỉ ngơi", "tập thể dục", "cười", "khóc", "buồn ", "vui",
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
    "Tôi khá là mệt mỏi",
    "Rất vui được gặp bạn",

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
let sentences = new Array;
let check = 0;
let joint = new Array;
for (let i = 0; i <= 1; ++i) {
    joint[i] = new Array;
    for (let j = 0; j <= 44; j++) {
        joint[i][j] = new Array;
    }
}

let jointSmoothed = new Array;
for (let i = 0; i <= 1; i++) {
    jointSmoothed[i] = new Array;
    for (let j = 0; j <= 44; j++) {
        jointSmoothed[i][j] = new Array;
    }
}

let movement = new Array;
for (let i = 0; i <= 1; i++) {
    movement[i] = new Array;
    for (let j = 0; j <= 44; j++) {
        movement[i][j] = new Array;
    }
}
let frameID = 0;
let cntFrame = 0;

function classifyLeap() {
    check = 0;
    Leap.loop(options, function(frame) {
        if (frame.id % 20 == 0 && check == 0 && frame.id != frameID) {
            frameID = frame.id;
            let checkLeft, checkRight;
            checkLeft = checkRight = 0;
            for (let i = 0, len = frame.hands.length; i < len; i++) {
                hand = frame.hands[i];
                if (hand.type == 'left') {
                    checkLeft = 1;
                    let palmX = hand.palmPosition[0];
                    let palmY = hand.palmPosition[1];
                    let palmZ = hand.palmPosition[2];
                    for (let j = 0, len2 = hand.fingers.length; j < len2; j++) {
                        finger = hand.fingers[j];
                        if (finger.type == 0) {
                            joint[0][0][cntFrame] = finger.dipPosition[0] - palmX;
                            joint[0][1][cntFrame] = finger.dipPosition[1] - palmY;
                            joint[0][2][cntFrame] = finger.dipPosition[2] - palmZ;
                            joint[0][3][cntFrame] = finger.pipPosition[0] - palmX;
                            joint[0][4][cntFrame] = finger.pipPosition[1] - palmY;
                            joint[0][5][cntFrame] = finger.pipPosition[2] - palmZ;
                            joint[0][6][cntFrame] = finger.mcpPosition[0] - palmX;
                            joint[0][7][cntFrame] = finger.mcpPosition[1] - palmY;
                            joint[0][8][cntFrame] = finger.mcpPosition[2] - palmZ;
                        } else if (finger.type == 1) {
                            joint[0][9][cntFrame] = finger.dipPosition[0] - palmX;
                            joint[0][10][cntFrame] = finger.dipPosition[1] - palmY;
                            joint[0][11][cntFrame] = finger.dipPosition[2] - palmZ;
                            joint[0][12][cntFrame] = finger.pipPosition[0] - palmX;
                            joint[0][13][cntFrame] = finger.pipPosition[1] - palmY;
                            joint[0][14][cntFrame] = finger.pipPosition[2] - palmZ;
                            joint[0][15][cntFrame] = finger.mcpPosition[0] - palmX;
                            joint[0][16][cntFrame] = finger.mcpPosition[1] - palmY;
                            joint[0][17][cntFrame] = finger.mcpPosition[2] - palmZ;
                        } else if (finger.type == 2) {
                            joint[0][18][cntFrame] = finger.dipPosition[0] - palmX;
                            joint[0][19][cntFrame] = finger.dipPosition[1] - palmY;
                            joint[0][20][cntFrame] = finger.dipPosition[2] - palmZ;
                            joint[0][21][cntFrame] = finger.pipPosition[0] - palmX;
                            joint[0][22][cntFrame] = finger.pipPosition[1] - palmY;
                            joint[0][23][cntFrame] = finger.pipPosition[2] - palmZ;
                            joint[0][24][cntFrame] = finger.mcpPosition[0] - palmX;
                            joint[0][25][cntFrame] = finger.mcpPosition[1] - palmY;
                            joint[0][26][cntFrame] = finger.mcpPosition[2] - palmZ;
                        } else if (finger.type == 3) {
                            joint[0][27][cntFrame] = finger.dipPosition[0] - palmX;
                            joint[0][28][cntFrame] = finger.dipPosition[1] - palmY;
                            joint[0][29][cntFrame] = finger.dipPosition[2] - palmZ;
                            joint[0][30][cntFrame] = finger.pipPosition[0] - palmX;
                            joint[0][31][cntFrame] = finger.pipPosition[1] - palmY;
                            joint[0][32][cntFrame] = finger.pipPosition[2] - palmZ;
                            joint[0][33][cntFrame] = finger.mcpPosition[0] - palmX;
                            joint[0][34][cntFrame] = finger.mcpPosition[1] - palmY;
                            joint[0][35][cntFrame] = finger.mcpPosition[2] - palmZ;
                        } else if (finger.type == 4) {
                            joint[0][36][cntFrame] = finger.dipPosition[0] - palmX;
                            joint[0][37][cntFrame] = finger.dipPosition[1] - palmY;
                            joint[0][38][cntFrame] = finger.dipPosition[2] - palmZ;
                            joint[0][39][cntFrame] = finger.pipPosition[0] - palmX;
                            joint[0][40][cntFrame] = finger.pipPosition[1] - palmY;
                            joint[0][41][cntFrame] = finger.pipPosition[2] - palmZ;
                            joint[0][42][cntFrame] = finger.mcpPosition[0] - palmX;
                            joint[0][43][cntFrame] = finger.mcpPosition[1] - palmY;
                            joint[0][44][cntFrame] = finger.mcpPosition[2] - palmZ;
                        }
                    }
                } else if (hand.type == 'right') {
                    let palmX = hand.palmPosition[0];
                    let palmY = hand.palmPosition[1];
                    let palmZ = hand.palmPosition[2];
                    checkRight = 1;
                    for (let j = 0, len2 = hand.fingers.length; j < len2; j++) {
                        finger = hand.fingers[j];
                        if (finger.type == 0) {
                            joint[1][0][cntFrame] = finger.dipPosition[0] - palmX;
                            joint[1][1][cntFrame] = finger.dipPosition[1] - palmY;
                            joint[1][2][cntFrame] = finger.dipPosition[2] - palmZ;
                            joint[1][3][cntFrame] = finger.pipPosition[0] - palmX;
                            joint[1][4][cntFrame] = finger.pipPosition[1] - palmY;
                            joint[1][5][cntFrame] = finger.pipPosition[2] - palmZ;
                            joint[1][6][cntFrame] = finger.mcpPosition[0] - palmX;
                            joint[1][7][cntFrame] = finger.mcpPosition[1] - palmY;
                            joint[1][8][cntFrame] = finger.mcpPosition[2] - palmZ;
                        } else if (finger.type == 1) {
                            joint[1][9][cntFrame] = finger.dipPosition[0] - palmX;
                            joint[1][10][cntFrame] = finger.dipPosition[1] - palmY;
                            joint[1][11][cntFrame] = finger.dipPosition[2] - palmZ;
                            joint[1][12][cntFrame] = finger.pipPosition[0] - palmX;
                            joint[1][13][cntFrame] = finger.pipPosition[1] - palmY;
                            joint[1][14][cntFrame] = finger.pipPosition[2] - palmZ;
                            joint[1][15][cntFrame] = finger.mcpPosition[0] - palmX;
                            joint[1][16][cntFrame] = finger.mcpPosition[1] - palmY;
                            joint[1][17][cntFrame] = finger.mcpPosition[2] - palmZ;
                        } else if (finger.type == 2) {
                            joint[1][18][cntFrame] = finger.dipPosition[0] - palmX;
                            joint[1][19][cntFrame] = finger.dipPosition[1] - palmY;
                            joint[1][20][cntFrame] = finger.dipPosition[2] - palmZ;
                            joint[1][21][cntFrame] = finger.pipPosition[0] - palmX;
                            joint[1][22][cntFrame] = finger.pipPosition[1] - palmY;
                            joint[1][23][cntFrame] = finger.pipPosition[2] - palmZ;
                            joint[1][24][cntFrame] = finger.mcpPosition[0] - palmX;
                            joint[1][25][cntFrame] = finger.mcpPosition[1] - palmY;
                            joint[1][26][cntFrame] = finger.mcpPosition[2] - palmZ;
                        } else if (finger.type == 3) {
                            joint[1][27][cntFrame] = finger.dipPosition[0] - palmX;
                            joint[1][28][cntFrame] = finger.dipPosition[1] - palmY;
                            joint[1][29][cntFrame] = finger.dipPosition[2] - palmZ;
                            joint[1][30][cntFrame] = finger.pipPosition[0] - palmX;
                            joint[1][31][cntFrame] = finger.pipPosition[1] - palmY;
                            joint[1][32][cntFrame] = finger.pipPosition[2] - palmZ;
                            joint[1][33][cntFrame] = finger.mcpPosition[0] - palmX;
                            joint[1][34][cntFrame] = finger.mcpPosition[1] - palmY;
                            joint[1][35][cntFrame] = finger.mcpPosition[2] - palmZ;
                        } else if (finger.type == 4) {
                            joint[1][36][cntFrame] = finger.dipPosition[0] - palmX;
                            joint[1][37][cntFrame] = finger.dipPosition[1] - palmY;
                            joint[1][38][cntFrame] = finger.dipPosition[2] - palmZ;
                            joint[1][39][cntFrame] = finger.pipPosition[0] - palmX;
                            joint[1][40][cntFrame] = finger.pipPosition[1] - palmY;
                            joint[1][41][cntFrame] = finger.pipPosition[2] - palmZ;
                            joint[1][42][cntFrame] = finger.mcpPosition[0] - palmX;
                            joint[1][43][cntFrame] = finger.mcpPosition[1] - palmY;
                            joint[1][44][cntFrame] = finger.mcpPosition[2] - palmZ;
                        }
                    }
                }
            }

            cntFrame++;

            if (cntFrame == 5) {
                check = 1;
                cntFrame = 0;
                let inputsTrain = new Array;

                if (checkLeft == 0)
                    joint[0] = joint[1];
                if (checkRight == 0)
                    joint[1] = joint[0];

                console.log(joint);
                for (let i = 0; i <= 1; i++)
                    for (let j = 0; j <= 44; j++)
                        for (let k = 0; k <= 4; k++)
                            jointSmoothed[i][j][k] = 1;

                for (let i = 0; i <= 1; i++) {
                    for (let j = 0; j <= 44; j++)
                        for (let k = 0; k <= 4; k++) {
                            jointSmoothed[i][j][k] = (-3 * joint[i][j][Math.max(0, k - 2)] + joint[i][j][Math.max(0, k - 1)] * 12 + 17 * joint[i][j][k] + 12 * joint[i][j][Math.min(k + 1, 4)] - 3 * joint[i][j][Math.min(k + 2, 4)]) / 13;
                            jointSmoothed[i][j][k] = Math.ceil(jointSmoothed[i][j][k]);
                            inputsTrain.push(jointSmoothed[i][j][k]);
                        }
                }

                for (let i = 0; i <= 1; i++)
                    for (let j = 0; j <= 44; j++)
                        for (let k = 0; k <= 4; k++)
                            movement[i][j][k] = 1;

                for (let i = 0; i <= 1; i++) {
                    for (let j = 0; j <= 44; j++)
                        for (let k = 1; k <= 4; k++) {
                            movement[i][j][k] = jointSmoothed[i][j][k] - jointSmoothed[i][j][k - 1];
                            movement[i][j][k] = Math.ceil(movement[i][j][k]);
                            inputsTrain.push(movement[i][j][k]);
                        }
                }

                Model.classify(inputsTrain, gotResult);
            }
        }

    })
}

function gotResult(error, results) {
    console.log(results);
    if (results[0].confidence > 0.3 && results[0].label != checkWord) {
        console.log(results);
        checkWord = results[0].label;
        console.log(results[0].label);
        sentences.push(results[0].label);
        setTimeout(classifyLeap, 1500);
    } else classifyLeap();
}