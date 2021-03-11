function setup() {
    let optionsData = {
        inputs: 810,
        outputs: 10,
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
        Model.train({ epochs: 200 }, finishedTraining);
    }
}

function finishedTraining() {
    console.log('finished Training');
    Model.save();
}
//git test
//test branch