var output = document.getElementById('output');
var frameString = "",
    handString = "",
    fingerString = "";
var hand, finger;

let headmound_mode = false;
var options = {
    enableGesture: true,
    optimizeHMD: true,
    frameEventName: 'animationFrame',
};

function keyPressed() {
    if (key == 'v') {
        if (headmound_mode == false) headmound_mode = true;
        else headmound_mode = false;
        options = {
            enableGesture: true,
            optimizeHMD: headmound_mode,
            frameEventName: 'animationFrame',
        };
        console.log('headmound_mode: ' + headmound_mode);
    }
}

Leap.loop(options, function(frame) {
    //let fps = frame.currentFrameRate;
    //console.log(fps);
    frameString = concatdata("frame_id", frame.id);
    frameString += concatdata("num_hands", frame.hands.length);
    frameString += concatdata("num_fingers", frame.fingers.length);
    frameString += "<br>";


    for (var i = 0, len = frame.hands.length; i < len; i++) {
        hand = frame.hands[i];
        handString = concatdata("hand_type", hand.type);
        fingerString = "";
        handString += "<br>";
        background(220);
        for (var j = 0, len2 = hand.fingers.length; j < len2; j++) {
            finger = hand.fingers[j];
            fingerString += concatdata("finger_type", finger.type) + "(" + getFingerName(finger.type) + ") <br>";
            fingerString += concatJointPosition("finger_dip", finger.dipPosition);
            fingerString += concatJointPosition("finger_pip", finger.pipPosition);
            fingerString += concatJointPosition("finger_mcp", finger.mcpPosition);
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

function setup() {
    createCanvas(500, 500);
    background(220);
}

function draw(position) {
    rect(position[0] + 200, position[1] + 200, 10, 10);
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

function concatJointPosition(id, position) {
    return id + ": " + position[0] + ", " + position[1] + ", " + position[2] + "<br>";
}