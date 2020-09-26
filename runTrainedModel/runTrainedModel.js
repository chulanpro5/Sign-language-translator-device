let output = document.getElementById('output');
let frameString = "",
    handString = "",
    fingerString = "";
let hand, finger;
let targetLabel = 'a';
let sentences = [];
let options = {
    enableGestures: true,
    //optimizeHMD: true,
    //frameEventName: 'animationFrame',
};

function setup() {
    let options = {
        inputs: 225,
        outputs: 5,
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

function classifyLeap() {
    let countFrame = 0;
    let inputsData = [];
    let inputsTrain = [];
    Leap.loop(options, function(frame) {
        if (frame.id % 15 == 0 && countFrame < 1) {
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
            inputsData.push(inputs);
            if (inputsData.length == 5) {
                for (let i = 0; i < 5; i++) {
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
                countFrame = 1;
                Model.classify(inputsTrain, gotResult);
            }

        }
    })
}
let msg = new SpeechSynthesisUtterance();
let voices = window.speechSynthesis.getVoices();

function gotResult(error, results) {
    if (results[0].confidence > 0.8) {
        msg.voice = voices[10];
        msg.volume = 1;
        msg.rate = 1;
        msg.pitch = 2;
        msg.text = results[0].label;
        msg.lang = 'vi';
        speechSynthesis.speak(msg);
        console.log(results);
        console.log(results[0].label);
        sentences.push(results[0].label);
        setTimeout(classifyLeap, 2000);
        console.log(sentences);
    } else classifyLeap();
}