joint = new Array;
for (let i = 0; i <= 1; ++i) {
    joint[i] = new Array;
    for (let j = 0; j <= 44; j++) {
        joint[i][j] = new Array;
        for (let k = 0; k <= 4; k++) {
            joint[i][j][k] = new Array;
        }
    }
}
joint[1][34][5] = 4;
console.log(joint[1][34][5]);