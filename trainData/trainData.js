function setup() {
    let optionsData = {
        inputs: 180,
        outputs: 15,
        task: 'classification',
        debug: true
    };
    Model = ml5.neuralNetwork(optionsData);
    Model.loadData('rawData.json', keyPressed);
}

function keyPressed() {
    if (key == 't') {
        console.log('Start Training');
        Model.normalizeData();
        Model.train({ epochs: 70 }, finishedTraining);
    }
}

function finishedTraining() {
    console.log('finished Training');
    Model.save();
}
//git test
//test branch