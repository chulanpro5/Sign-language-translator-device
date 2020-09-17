let output = document.getElementById('output');
let frameString = "",
    handString = "",
    fingerString = "";
let hand, finger;
let targetLabel = 'a';

let options = {
    enableGestures: true,
    //optimizeHMD: true,
    //frameEventName: 'animationFrame',
};

function concatJointPosition(id, position) {
    return id + ": " + position[0] + ", " + position[1] + ", " + position[2] + "<br>";
}

function setup() {
    createCanvas(500, 500);
    background(200);
    let optionsData = {
        inputs: 45,
        outputs: 4,
        task: 'classification',
        debug: 'true'
    };
    Model = ml5.neuralNetwork(optionsData);
}

function draw(position) {
    rect(position[0] + 200, position[1] + 200, 20, 20);
}

function keyPressed() {
    if (key == 's') {
        Model.saveData('rawData');
    } else {
        targetLabel = document.getElementById('label').value;
    }
}

function whileTraining(epoch, loss) {
    console.log(epoch);
}

function finishedTraining() {
    console.log('finished Training');
}

function concatdata(id, data) {
    return id + ": " + data + "<br>";
}

function getFingerName(fingerType) {
    switch (fingerType) {
        case 0:
            return "Thumb";
            break;

        case 1:
            return "Index";
            break;

        case 2:
            return "Middle";
            break;

        case 3:
            return "Ring";
            break;

        case 4:
            return "Pinky";
            break;
    }
}
let status = 1;

function startCollect() {
    setTimeout(getData, 2000);
}

function getData() {
    let countFrame = 0;
    Leap.loop(options, function(frame) {
        if (frame.id % 5 == 0 && countFrame < 100) {
            let fps = frame.currentFrameRate;
            countFrame++;
            frameString = concatdata("frameid", frame.id);
            console.log(fps);
            frameString += concatdata("numhands", frame.hands.length);
            frameString += concatdata("numfingers", frame.fingers.length);
            frameString += "<br>";
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
            }
            for (let i = 0, len = frame.hands.length; i < len; i++) {
                hand = frame.hands[i];
                handString = concatdata("handtype", hand.type);
                fingerString = "";
                handString += "<br>";
                background(220);
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
                }
            }
            let target = {
                label: targetLabel
            };
            Model.addData(inputs, target);
            for (let j = 0, len2 = hand.fingers.length; j < len2; j++) {
                finger = hand.fingers[j];
                fingerString += concatdata("fingertype", finger.type) + "(" + getFingerName(finger.type) + ") <br>";
                fingerString += concatJointPosition("fingerdip", finger.dipPosition);
                fingerString += concatJointPosition("fingerpip", finger.pipPosition);
                fingerString += concatJointPosition("fingermcp", finger.mcpPosition);
                fingerString += "<br>";
                draw(finger.dipPosition);
                draw(finger.pipPosition);
                draw(finger.mcpPosition);
            }
            frameString += fingerString
            frameString += handString;
            console.log(inputs);
        }
        output.innerHTML = frameString;
    })
    status = 0;
}