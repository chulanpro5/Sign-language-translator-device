let output = document.getElementById('output');
let hand, finger;
let targetLabel = 'a';

function setup() {
    let optionsData = {
        inputs: 810,
        outputs: 10,
        task: 'classification',
        debug: 'true'
    };
    Model = ml5.neuralNetwork(optionsData);
}

function keyPressed() {
    if (key == '.') {
        Model.saveData('rawData');
    } else {
        targetLabel = document.getElementById('label').value;
    }
}

function startCollect() {
    countFrame = 0;
    console.log('start collecting data');
    setTimeout(getData, 500);
}

let options = {
    enableGestures: true,
    optimizeHMD: true,
    // frameEventName: 'animationFrame',
};

let check = 0;
let cntFrame = 0;
let countFrame;

let joint = new Array;

for (let i = 0; i <= 1; ++i)
    joint[i] = new Array;


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

let frameID;

let nhap = [];

let checkLeft, checkRight;
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

let dem = 0;

let jointTrain = new Array;

for (let i = 0; i <= 1; i++) {
    jointTrain[i] = new Array;
    for (let j = 0; j <= 44; j++) {
        jointTrain[i][j] = new Array;
    }
}

function getData() {
    let target = {
        label: targetLabel
    };

    if (dem == 0) console.log("START");

    console.log(nhap);

    for (let i = 0; i <= 1; i++)
        for (let j = 0; j <= 44; j++)
            jointTrain[i][j][dem] = nhap[i][j];

    dem++;

    if (dem == 5) {
        dem = 0;

        let inputsTrain = new Array;

        if (checkLeft == 0)
            jointTrain[0] = jointTrain[1];
        if (checkRight == 0)
            jointTrain[1] = jointTrain[0];

        console.log('nhap');
        console.log(nhap);

        for (let i = 0; i <= 1; i++)
            for (let j = 0; j <= 44; j++)
                for (let k = 0; k <= 4; k++)
                    jointSmoothed[i][j][k] = 1;

        for (let i = 0; i <= 1; i++) {
            for (let j = 0; j <= 44; j++)
                for (let k = 0; k <= 4; k++) {
                    jointSmoothed[i][j][k] = (-3 * jointTrain[i][j][Math.max(0, k - 2)] + jointTrain[i][j][Math.max(0, k - 1)] * 12 + 17 * jointTrain[i][j][k] + 12 * jointTrain[i][j][Math.min(k + 1, 4)] - 3 * jointTrain[i][j][Math.min(k + 2, 4)]) / 13;
                    jointSmoothed[i][j][k] = Math.round(jointSmoothed[i][j][k] * 100) / 100;
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
                    movement[i][j][k] = Math.round(movement[i][j][k] * 100) / 100;
                    inputsTrain.push(movement[i][j][k]);
                }
        }

        console.log('jointSmoothed');
        console.log(jointSmoothed);
        console.log('movement');
        console.log(movement);
        console.log('inputsTrain');
        console.log(inputsTrain);
        Model.addData(inputsTrain, target);

    } else if (dem < 5) setTimeout(getData, 200);
}