function setup() {
    let optionsData = {
        inputs: 45,
        outputs: 4,
        task: 'classification',
        debug: 'true'
    };
    Model = ml5.neuralNetwork(optionsData);
    Model.loadData('rawData.json');
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