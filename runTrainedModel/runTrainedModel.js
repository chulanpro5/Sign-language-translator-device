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

function setup() {
    let options = {
        inputs: 90,
        outputs: 1,
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
}

function concatJointPosition(id, position) {
    return id + ": " + position[0] + ", " + position[1] + ", " + position[2] + "<br>";
}

function draw(position) {
    rect(position[0] + 200, position[1] + 200, 20, 20);
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


Leap.loop(options, function(frame) {
    frameString = "";
    if (frame.id % 40 == 0) {
        frameString = concatdata("frameid", frame.id);
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
     
        }
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
        Model.classify(inputs, gotResult);
    }
    output.innerHTML = frameString;
})

function gotResult(error, results) {
    console.log(results);

}
