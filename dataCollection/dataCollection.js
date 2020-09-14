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
        inputs: 90,
        outputs: 1,
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
        if (frame.id % 20 == 0 && countFrame < 15) {
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
                zMcpPinkyRight: 0
            }
            for (let i = 0, len = frame.hands.length; i < len; i++) {
                hand = frame.hands[i];
                handString = concatdata("handtype", hand.type);
                fingerString = "";
                handString += "<br>";
                background(220);
                if (hand.type == 0) {
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
                } else {
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
                if (inputs.xDipThumbLeft != 0) {
                    inputs.xDipThumbLeft = 0;
                    inputs.yDipThumbLeft -= inputs.xDipThumbLeft;
                    inputs.zDipThumbLeft -= inputs.xDipThumbLeft;
                    inputs.xPipThumbLeft -= inputs.xDipThumbLeft;
                    inputs.yPipThumbLeft -= inputs.xDipThumbLeft;
                    inputs.zPipThumbLeft -= inputs.xDipThumbLeft;
                    inputs.xMcpThumbLeft -= inputs.xDipThumbLeft;
                    inputs.yMcpThumbLeft -= inputs.xDipThumbLeft;
                    inputs.zMcpThumbLeft -= inputs.xDipThumbLeft;

                    inputs.xDipIndexLeft -= inputs.xDipThumbLeft;
                    inputs.yDipIndexLeft -= inputs.xDipThumbLeft;
                    inputs.zDipIndexLeft -= inputs.xDipThumbLeft;
                    inputs.xPipIndexLeft -= inputs.xDipThumbLeft;
                    inputs.yPipIndexLeft -= inputs.xDipThumbLeft;
                    inputs.zPipIndexLeft -= inputs.xDipThumbLeft;
                    inputs.xMcpIndexLeft -= inputs.xDipThumbLeft;
                    inputs.yMcpIndexLeft -= inputs.xDipThumbLeft;
                    inputs.zMcpIndexLeft -= inputs.xDipThumbLeft;

                    inputs.xDipMiddleLeft -= inputs.xDipThumbLeft;
                    inputs.yDipMiddleLeft -= inputs.xDipThumbLeft;
                    inputs.zDipMiddleLeft -= inputs.xDipThumbLeft;
                    inputs.xPipMiddleLeft -= inputs.xDipThumbLeft;
                    inputs.yPipMiddleLeft -= inputs.xDipThumbLeft;
                    inputs.zPipMiddleLeft -= inputs.xDipThumbLeft;
                    inputs.xMcpMiddleLeft -= inputs.xDipThumbLeft;
                    inputs.yMcpMiddleLeft -= inputs.xDipThumbLeft;
                    inputs.zMcpMiddleLeft -= inputs.xDipThumbLeft;

                    inputs.xDipRingLeft -= inputs.xDipThumbLeft;
                    inputs.yDipRingLeft -= inputs.xDipThumbLeft;
                    inputs.zDipRingLeft -= inputs.xDipThumbLeft;
                    inputs.xPipRingLeft -= inputs.xDipThumbLeft;
                    inputs.yPipRingLeft -= inputs.xDipThumbLeft;
                    inputs.zPipRingLeft -= inputs.xDipThumbLeft;
                    inputs.xMcpRingLeft -= inputs.xDipThumbLeft;
                    inputs.yMcpRingLeft -= inputs.xDipThumbLeft;
                    inputs.zMcpRingLeft -= inputs.xDipThumbLeft;

                    inputs.xDipPinkyLeft -= inputs.xDipThumbLeft;
                    inputs.yDipPinkyLeft -= inputs.xDipThumbLeft;
                    inputs.zDipPinkyLeft -= inputs.xDipThumbLeft;
                    inputs.xPipPinkyLeft -= inputs.xDipThumbLeft;
                    inputs.yPipPinkyLeft -= inputs.xDipThumbLeft;
                    inputs.zPipPinkyLeft -= inputs.xDipThumbLeft;
                    inputs.xMcpPinkyLeft -= inputs.xDipThumbLeft;
                    inputs.yMcpPinkyLeft -= inputs.xDipThumbLeft;
                    inputs.zMcpPinkyLeft -= inputs.xDipThumbLeft;

                    inputs.xDipThumbRight -= inputs.xDipThumbLeft;
                    inputs.yDipThumbRight -= inputs.xDipThumbLeft;
                    inputs.zDipThumbRight -= inputs.xDipThumbLeft;
                    inputs.xPipThumbRight -= inputs.xDipThumbLeft;
                    inputs.yPipThumbRight -= inputs.xDipThumbLeft;
                    inputs.zPipThumbRight -= inputs.xDipThumbLeft;
                    inputs.xMcpThumbRight -= inputs.xDipThumbLeft;
                    inputs.yMcpThumbRight -= inputs.xDipThumbLeft;
                    inputs.zMcpThumbRight -= inputs.xDipThumbLeft;

                    inputs.xDipIndexRight -= inputs.xDipThumbLeft;
                    inputs.yDipIndexRight -= inputs.xDipThumbLeft;
                    inputs.zDipIndexRight -= inputs.xDipThumbLeft;
                    inputs.xPipIndexRight -= inputs.xDipThumbLeft;
                    inputs.yPipIndexRight -= inputs.xDipThumbLeft;
                    inputs.zPipIndexRight -= inputs.xDipThumbLeft;
                    inputs.xMcpIndexRight -= inputs.xDipThumbLeft;
                    inputs.yMcpIndexRight -= inputs.xDipThumbLeft;
                    inputs.zMcpIndexRight -= inputs.xDipThumbLeft;

                    inputs.xDipMiddleRight -= inputs.xDipThumbLeft;
                    inputs.yDipMiddleRight -= inputs.xDipThumbLeft;
                    inputs.zDipMiddleRight -= inputs.xDipThumbLeft;
                    inputs.xPipMiddleRight -= inputs.xDipThumbLeft;
                    inputs.yPipMiddleRight -= inputs.xDipThumbLeft;
                    inputs.zPipMiddleRight -= inputs.xDipThumbLeft;
                    inputs.xMcpMiddleRight -= inputs.xDipThumbLeft;
                    inputs.yMcpMiddleRight -= inputs.xDipThumbLeft;
                    inputs.zMcpMiddleRight -= inputs.xDipThumbLeft;

                    inputs.xDipRingRight -= inputs.xDipThumbLeft;
                    inputs.yDipRingRight -= inputs.xDipThumbLeft;
                    inputs.zDipRingRight -= inputs.xDipThumbLeft;
                    inputs.xPipRingRight -= inputs.xDipThumbLeft;
                    inputs.yPipRingRight -= inputs.xDipThumbLeft;
                    inputs.zPipRingRight -= inputs.xDipThumbLeft;
                    inputs.xMcpRingRight -= inputs.xDipThumbLeft;
                    inputs.yMcpRingRight -= inputs.xDipThumbLeft;
                    inputs.zMcpRingRight -= inputs.xDipThumbLeft;

                    inputs.xDipPinkyRight -= inputs.xDipThumbLeft;
                    inputs.yDipPinkyRight -= inputs.xDipThumbLeft;
                    inputs.zDipPinkyRight -= inputs.xDipThumbLeft;
                    inputs.xPipPinkyRight -= inputs.xDipThumbLeft;
                    inputs.yPipPinkyRight -= inputs.xDipThumbLeft;
                    inputs.zPipPinkyRight -= inputs.xDipThumbLeft;
                    inputs.xMcpPinkyRight -= inputs.xDipThumbLeft;
                    inputs.yMcpPinkyRight -= inputs.xDipThumbLeft;
                    inputs.zMcpPinkyRight -= inputs.xDipThumbLeft;

                } else if (inputs.xDipThumbRight != 0) {

                    inputs.xDipThumbLeft -= inputs.xDipThumbRight;
                    inputs.yDipThumbLeft -= inputs.xDipThumbRight;
                    inputs.zDipThumbLeft -= inputs.xDipThumbRight;
                    inputs.xPipThumbLeft -= inputs.xDipThumbRight;
                    inputs.yPipThumbLeft -= inputs.xDipThumbRight;
                    inputs.zPipThumbLeft -= inputs.xDipThumbRight;
                    inputs.xMcpThumbLeft -= inputs.xDipThumbRight;
                    inputs.yMcpThumbLeft -= inputs.xDipThumbRight;
                    inputs.zMcpThumbLeft -= inputs.xDipThumbRight;

                    inputs.xDipIndexLeft -= inputs.xDipThumbRight;
                    inputs.yDipIndexLeft -= inputs.xDipThumbRight;
                    inputs.zDipIndexLeft -= inputs.xDipThumbRight;
                    inputs.xPipIndexLeft -= inputs.xDipThumbRight;
                    inputs.yPipIndexLeft -= inputs.xDipThumbRight;
                    inputs.zPipIndexLeft -= inputs.xDipThumbRight;
                    inputs.xMcpIndexLeft -= inputs.xDipThumbRight;
                    inputs.yMcpIndexLeft -= inputs.xDipThumbRight;
                    inputs.zMcpIndexLeft -= inputs.xDipThumbRight;

                    inputs.xDipMiddleLeft -= inputs.xDipThumbRight;
                    inputs.yDipMiddleLeft -= inputs.xDipThumbRight;
                    inputs.zDipMiddleLeft -= inputs.xDipThumbRight;
                    inputs.xPipMiddleLeft -= inputs.xDipThumbRight;
                    inputs.yPipMiddleLeft -= inputs.xDipThumbRight;
                    inputs.zPipMiddleLeft -= inputs.xDipThumbRight;
                    inputs.xMcpMiddleLeft -= inputs.xDipThumbRight;
                    inputs.yMcpMiddleLeft -= inputs.xDipThumbRight;
                    inputs.zMcpMiddleLeft -= inputs.xDipThumbRight;

                    inputs.xDipRingLeft -= inputs.xDipThumbRight;
                    inputs.yDipRingLeft -= inputs.xDipThumbRight;
                    inputs.zDipRingLeft -= inputs.xDipThumbRight;
                    inputs.xPipRingLeft -= inputs.xDipThumbRight;
                    inputs.yPipRingLeft -= inputs.xDipThumbRight;
                    inputs.zPipRingLeft -= inputs.xDipThumbRight;
                    inputs.xMcpRingLeft -= inputs.xDipThumbRight;
                    inputs.yMcpRingLeft -= inputs.xDipThumbRight;
                    inputs.zMcpRingLeft -= inputs.xDipThumbRight;

                    inputs.xDipPinkyLeft -= inputs.xDipThumbRight;
                    inputs.yDipPinkyLeft -= inputs.xDipThumbRight;
                    inputs.zDipPinkyLeft -= inputs.xDipThumbRight;
                    inputs.xPipPinkyLeft -= inputs.xDipThumbRight;
                    inputs.yPipPinkyLeft -= inputs.xDipThumbRight;
                    inputs.zPipPinkyLeft -= inputs.xDipThumbRight;
                    inputs.xMcpPinkyLeft -= inputs.xDipThumbRight;
                    inputs.yMcpPinkyLeft -= inputs.xDipThumbRight;
                    inputs.zMcpPinkyLeft -= inputs.xDipThumbRight;

                    inputs.xDipThumbRight = 0;
                    inputs.yDipThumbRight -= inputs.xDipThumbRight;
                    inputs.zDipThumbRight -= inputs.xDipThumbRight;
                    inputs.xPipThumbRight -= inputs.xDipThumbRight;
                    inputs.yPipThumbRight -= inputs.xDipThumbRight;
                    inputs.zPipThumbRight -= inputs.xDipThumbRight;
                    inputs.xMcpThumbRight -= inputs.xDipThumbRight;
                    inputs.yMcpThumbRight -= inputs.xDipThumbRight;
                    inputs.zMcpThumbRight -= inputs.xDipThumbRight;

                    inputs.xDipIndexRight -= inputs.xDipThumbRight;
                    inputs.yDipIndexRight -= inputs.xDipThumbRight;
                    inputs.zDipIndexRight -= inputs.xDipThumbRight;
                    inputs.xPipIndexRight -= inputs.xDipThumbRight;
                    inputs.yPipIndexRight -= inputs.xDipThumbRight;
                    inputs.zPipIndexRight -= inputs.xDipThumbRight;
                    inputs.xMcpIndexRight -= inputs.xDipThumbRight;
                    inputs.yMcpIndexRight -= inputs.xDipThumbRight;
                    inputs.zMcpIndexRight -= inputs.xDipThumbRight;

                    inputs.xDipMiddleRight -= inputs.xDipThumbRight;
                    inputs.yDipMiddleRight -= inputs.xDipThumbRight;
                    inputs.zDipMiddleRight -= inputs.xDipThumbRight;
                    inputs.xPipMiddleRight -= inputs.xDipThumbRight;
                    inputs.yPipMiddleRight -= inputs.xDipThumbRight;
                    inputs.zPipMiddleRight -= inputs.xDipThumbRight;
                    inputs.xMcpMiddleRight -= inputs.xDipThumbRight;
                    inputs.yMcpMiddleRight -= inputs.xDipThumbRight;
                    inputs.zMcpMiddleRight -= inputs.xDipThumbRight;

                    inputs.xDipRingRight -= inputs.xDipThumbRight;
                    inputs.yDipRingRight -= inputs.xDipThumbRight;
                    inputs.zDipRingRight -= inputs.xDipThumbRight;
                    inputs.xPipRingRight -= inputs.xDipThumbRight;
                    inputs.yPipRingRight -= inputs.xDipThumbRight;
                    inputs.zPipRingRight -= inputs.xDipThumbRight;
                    inputs.xMcpRingRight -= inputs.xDipThumbRight;
                    inputs.yMcpRingRight -= inputs.xDipThumbRight;
                    inputs.zMcpRingRight -= inputs.xDipThumbRight;

                    inputs.xDipPinkyRight -= inputs.xDipThumbRight;
                    inputs.yDipPinkyRight -= inputs.xDipThumbRight;
                    inputs.zDipPinkyRight -= inputs.xDipThumbRight;
                    inputs.xPipPinkyRight -= inputs.xDipThumbRight;
                    inputs.yPipPinkyRight -= inputs.xDipThumbRight;
                    inputs.zPipPinkyRight -= inputs.xDipThumbRight;
                    inputs.xMcpPinkyRight -= inputs.xDipThumbRight;
                    inputs.yMcpPinkyRight -= inputs.xDipThumbRight;
                    inputs.zMcpPinkyRight -= inputs.xDipThumbRight;

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
        }
        output.innerHTML = frameString;
    })
    status = 0;
}