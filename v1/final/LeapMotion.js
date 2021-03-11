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

function setup() {
    createCanvas(500, 500);
    background(220);
}

function draw(position) {
    // background(220);
    rect(position[0] + 200, position[1] + 200, 20, 20);
}

var output = document.getElementById('output');
var frameString = "",
    handString = "",
    fingerString = "";
var hand, finger;

var options = {
    enableGesture: true,
    frameEventName: 'animationFrame',
};

function getData() {
    Leap.loop(options, function(frame) {
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
}