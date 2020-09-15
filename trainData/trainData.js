function setup() {
    let optionsData = {
        inputs: 90,
        outputs: 1,
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
        let optionsTrain = {
            epochs: 200
        }
        Model.train(optionsTrain, finishedTraining);
    }
}

function finishedTraining() {
    console.log('finished Training');
    Model.save();
}