function setup() {
    let optionsData = {
        inputs: 225,
        outputs: 5,
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
        Model.train({ epochs: 100 }, finishedTraining);
    }
}

function finishedTraining() {
    console.log('finished Training');
    Model.save();
}