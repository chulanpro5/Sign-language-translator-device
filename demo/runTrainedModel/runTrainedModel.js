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
let sentences = [];

function setup() {
    video = createCapture(VIDEO);
    video.hide();
    let options = {
        inputs: 180,
        outputs: 15,
        task: 'classification',
        debug: true
    }
    Model = ml5.neuralNetwork(options);
    const modelInfo = {
        model: 'model.json',
        metadata: 'model_meta.json',
        weights: 'model.weights.bin',
    };

    createCanvas(642, 610);
    Model.load(modelInfo, ModelLoaded);
}

function ModelLoaded() {
    console.log('Ready');
    setTimeout(classifyLeap, 3000);
}
let countFrame = 0;
let wordPackage = ["tôi", "bạn", "tác giả", "thiết bị",
    "gia đình", "bóng chuyền", "thể thao", "tên", "xin chào", "hỗ trợ", "giao tiếp",
    "chơi", "khỏe mạnh", "ăn", "uống", "nghỉ ngơi", "tập thể dục", "cười", "khóc", "buồn ", "vui", "mọi người", "Hiếu",
    "không ?"
];
let wordType = [1, 1, 1, 1,
    2, 2, 2, 2, 2, 2, 2,
    3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    4
];
// 1 : chủ ngữ
// 2 : động từ
// 3 : bổ ngữ
let sentencePackage = [
    "tôi tên là Hiếu",
    "tôi là tác giả của thiết bị hỗ trợ giao tiếp",
    "xin chào mọi người",
    "bạn có khỏe mạnh không ?",
    "tôi đang ăn cơm",
    "tôi rất vui",
    "tôi đang buồn",
    "tôi khá là mệt mỏi",
    "rất vui được gặp bạn",
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

let t2 = 0;

function createSentence(sentence) {
    let len = sentence.length;
    let ans = "";
    for (let i = 0; i < 9; i++) {
        let newSentence = [];
        let str = sentencePackage[i];
        for (let j = 0; j < len; j++) {
            let tmp = sentence[j];
            if (str.indexOf(tmp) != -1)
                newSentence.push(tmp);
        }
        let t1 = newSentence.length;

        if (t1 > t2) {
            t2 = newSentence.length;
            ans = sentencePackage[i];
        }
    }
    t2 = 0;
    return ans;
}

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

let jointTrain = new Array;

for (let i = 0; i <= 1; i++) {
    jointTrain[i] = new Array;
    for (let j = 0; j <= 44; j++) {
        jointTrain[i][j] = new Array;
    }
}

let frameID = 0;
let cntFrame = 0;
let nhap = [];
let dem = 0;
let res = "";

function draw() {
    background(220);
    image(video, 0, 0);
    fill(0);
    noStroke();
    textSize(30);
    if (res.length > 0) {
        textAlign(CENTER, CENTER);
        text(res, 300, 550);
    }
    /*textAlign(CENTER, CENTER);
    text('text_here', 450, 450);*/
}

Leap.loop(options, function(frame) {
    /*let fps = frame.currentFrameRate;
    console.log('fps= ', fps);*/

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
                    joint[0][0] = finger.dipPosition[0] - palmX;
                    joint[0][1] = finger.dipPosition[1] - palmY;
                    joint[0][2] = finger.dipPosition[2] - palmZ;
                    joint[0][3] = finger.pipPosition[0] - palmX;
                    joint[0][4] = finger.pipPosition[1] - palmY;
                    joint[0][5] = finger.pipPosition[2] - palmZ;
                    joint[0][6] = finger.mcpPosition[0] - palmX;
                    joint[0][7] = finger.mcpPosition[1] - palmY;
                    joint[0][8] = finger.mcpPosition[2] - palmZ;
                } else if (finger.type == 1) {
                    joint[0][9] = finger.dipPosition[0] - palmX;
                    joint[0][10] = finger.dipPosition[1] - palmY;
                    joint[0][11] = finger.dipPosition[2] - palmZ;
                    joint[0][12] = finger.pipPosition[0] - palmX;
                    joint[0][13] = finger.pipPosition[1] - palmY;
                    joint[0][14] = finger.pipPosition[2] - palmZ;
                    joint[0][15] = finger.mcpPosition[0] - palmX;
                    joint[0][16] = finger.mcpPosition[1] - palmY;
                    joint[0][17] = finger.mcpPosition[2] - palmZ;
                } else if (finger.type == 2) {
                    joint[0][18] = finger.dipPosition[0] - palmX;
                    joint[0][19] = finger.dipPosition[1] - palmY;
                    joint[0][20] = finger.dipPosition[2] - palmZ;
                    joint[0][21] = finger.pipPosition[0] - palmX;
                    joint[0][22] = finger.pipPosition[1] - palmY;
                    joint[0][23] = finger.pipPosition[2] - palmZ;
                    joint[0][24] = finger.mcpPosition[0] - palmX;
                    joint[0][25] = finger.mcpPosition[1] - palmY;
                    joint[0][26] = finger.mcpPosition[2] - palmZ;
                } else if (finger.type == 3) {
                    joint[0][27] = finger.dipPosition[0] - palmX;
                    joint[0][28] = finger.dipPosition[1] - palmY;
                    joint[0][29] = finger.dipPosition[2] - palmZ;
                    joint[0][30] = finger.pipPosition[0] - palmX;
                    joint[0][31] = finger.pipPosition[1] - palmY;
                    joint[0][32] = finger.pipPosition[2] - palmZ;
                    joint[0][33] = finger.mcpPosition[0] - palmX;
                    joint[0][34] = finger.mcpPosition[1] - palmY;
                    joint[0][35] = finger.mcpPosition[2] - palmZ;
                } else if (finger.type == 4) {
                    joint[0][36] = finger.dipPosition[0] - palmX;
                    joint[0][37] = finger.dipPosition[1] - palmY;
                    joint[0][38] = finger.dipPosition[2] - palmZ;
                    joint[0][39] = finger.pipPosition[0] - palmX;
                    joint[0][40] = finger.pipPosition[1] - palmY;
                    joint[0][41] = finger.pipPosition[2] - palmZ;
                    joint[0][42] = finger.mcpPosition[0] - palmX;
                    joint[0][43] = finger.mcpPosition[1] - palmY;
                    joint[0][44] = finger.mcpPosition[2] - palmZ;
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
                    joint[1][0] = finger.dipPosition[0] - palmX;
                    joint[1][1] = finger.dipPosition[1] - palmY;
                    joint[1][2] = finger.dipPosition[2] - palmZ;
                    joint[1][3] = finger.pipPosition[0] - palmX;
                    joint[1][4] = finger.pipPosition[1] - palmY;
                    joint[1][5] = finger.pipPosition[2] - palmZ;
                    joint[1][6] = finger.mcpPosition[0] - palmX;
                    joint[1][7] = finger.mcpPosition[1] - palmY;
                    joint[1][8] = finger.mcpPosition[2] - palmZ;
                } else if (finger.type == 1) {
                    joint[1][9] = finger.dipPosition[0] - palmX;
                    joint[1][10] = finger.dipPosition[1] - palmY;
                    joint[1][11] = finger.dipPosition[2] - palmZ;
                    joint[1][12] = finger.pipPosition[0] - palmX;
                    joint[1][13] = finger.pipPosition[1] - palmY;
                    joint[1][14] = finger.pipPosition[2] - palmZ;
                    joint[1][15] = finger.mcpPosition[0] - palmX;
                    joint[1][16] = finger.mcpPosition[1] - palmY;
                    joint[1][17] = finger.mcpPosition[2] - palmZ;
                } else if (finger.type == 2) {
                    joint[1][18] = finger.dipPosition[0] - palmX;
                    joint[1][19] = finger.dipPosition[1] - palmY;
                    joint[1][20] = finger.dipPosition[2] - palmZ;
                    joint[1][21] = finger.pipPosition[0] - palmX;
                    joint[1][22] = finger.pipPosition[1] - palmY;
                    joint[1][23] = finger.pipPosition[2] - palmZ;
                    joint[1][24] = finger.mcpPosition[0] - palmX;
                    joint[1][25] = finger.mcpPosition[1] - palmY;
                    joint[1][26] = finger.mcpPosition[2] - palmZ;
                } else if (finger.type == 3) {
                    joint[1][27] = finger.dipPosition[0] - palmX;
                    joint[1][28] = finger.dipPosition[1] - palmY;
                    joint[1][29] = finger.dipPosition[2] - palmZ;
                    joint[1][30] = finger.pipPosition[0] - palmX;
                    joint[1][31] = finger.pipPosition[1] - palmY;
                    joint[1][32] = finger.pipPosition[2] - palmZ;
                    joint[1][33] = finger.mcpPosition[0] - palmX;
                    joint[1][34] = finger.mcpPosition[1] - palmY;
                    joint[1][35] = finger.mcpPosition[2] - palmZ;
                } else if (finger.type == 4) {
                    joint[1][36] = finger.dipPosition[0] - palmX;
                    joint[1][37] = finger.dipPosition[1] - palmY;
                    joint[1][38] = finger.dipPosition[2] - palmZ;
                    joint[1][39] = finger.pipPosition[0] - palmX;
                    joint[1][40] = finger.pipPosition[1] - palmY;
                    joint[1][41] = finger.pipPosition[2] - palmZ;
                    joint[1][42] = finger.mcpPosition[0] - palmX;
                    joint[1][43] = finger.mcpPosition[1] - palmY;
                    joint[1][44] = finger.mcpPosition[2] - palmZ;
                }
            }
        }
    }
    nhap = joint;
})

function classifyLeap() {
    if (dem == 0) console.log("START");

    let check = 1;

    for (let i = 0; i <= 1; i++)
        for (let j = 0; j <= 44; j++)
            if (nhap[i][j] != 0) check = 0;

    if (check == 1) {
        console.log(sentences);
        if (sentences.length == 0)
            setTimeout(classifyLeap, 600);
        else {
            findIdWord(sentences);
            sortSentence(sentences);
            res = "";
            res = createSentence(sentences);
            console.log(res);
            sentences = new Array;
            setTimeout(classifyLeap, 600);
        }
    }

    if (check == 0) {

        for (let i = 0; i <= 1; i++)
            for (let j = 0; j <= 44; j++)
                jointTrain[i][j][dem] = nhap[i][j];

        dem++;

        if (dem == 2) {
            dem = 0;

            let inputsTrain = new Array;

            for (let i = 0; i <= 1; i++)
                for (let j = 0; j <= 44; j++)
                    for (let k = 0; k <= 1; k++)
                        jointSmoothed[i][j][k] = 1;

            if (checkLeft == 0) {
                for (let j = 0; j <= 44; j++)
                    for (let k = 0; k <= 1; k++)
                        jointTrain[0][j][k] = jointTrain[1][j][k] * 11 / 12;
            }

            if (checkRight == 0) {
                for (let j = 0; j <= 44; j++)
                    for (let k = 0; k <= 1; k++)
                        jointTrain[1][j][k] = jointTrain[0][j][k] * 11 / 12;
            }

            for (let i = 0; i <= 1; i++) {
                for (let j = 0; j <= 44; j++)
                    for (let k = 0; k <= 1; k++) {
                        jointSmoothed[i][j][k] = (-3 * jointTrain[i][j][Math.max(0, k - 1)] + jointTrain[i][j][Math.max(0, k - 1)] * 12 + 17 * jointTrain[i][j][k] + 12 * jointTrain[i][j][Math.min(k + 1, 1)] - 3 * jointTrain[i][j][Math.min(k + 2, 1)]) / 13;
                        jointSmoothed[i][j][k] = Math.round(jointSmoothed[i][j][k] * 1000) / 1000;
                        inputsTrain.push(jointSmoothed[i][j][k]);
                    }
            }

            //  console.log(inputsTrain);
            Model.classify(inputsTrain, gotResult);

            for (let i = 0; i <= 1; i++)
                for (let j = 0; j <= 44; j++)
                    nhap[i][j] = 0;

        } else if (dem < 2) setTimeout(classifyLeap, 600);
    }
}

function gotResult(error, results) {
    if (results[0].confidence > 0.5 && results[0].label != checkWord) {
        //console.log(results);
        checkWord = results[0].label;
        sentences.push(results[0].label);
        checkWord = results[0].label;
        console.log(sentences);
        setTimeout(classifyLeap, 1800);
    } else classifyLeap();
}