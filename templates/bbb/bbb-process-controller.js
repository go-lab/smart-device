var fs = require('fs');
var Q = require('q');

function bbbProcess(processPath, param) {
    // param to be replaced with the process param to control/sense.
    // e.g. period, duty cycle...
    bbbProcess.PARAM = param;
    bbbProcess.RUN_PATH = processPath + 'run';
    bbbProcess.PARAM_PATH = processPath + 'param';
    this.configureDevice();
}

bbbProcess.prototype.writeFile = function (file, content) {
    var deferred = Q.defer();
    fs.writeFile(file, content, function (error) {
        if (error) {
            deferred.reject(error);
        }
        else {
            console.log('writeFile complete: ' + file);
            deferred.resolve();
        }
    });
    return deferred.promise;
};

bbbProcess.prototype.setParam = function (param) {
    try {
        bbbPWM.PARAM = param;
        fs.writeFile(bbbPRocess.PARAM_PATH, bbbPWM.PARAM );
    }
    catch (e) {
        console.log('setParam error: ' + e);
    }
};

//turns OFF process
bbbProcess.prototype.turnOff = function () {
    this.writeFile(bbbPWM.RUN_PATH, '0');
};

//turns ON process 
bbbProcess.prototype.turnOn = function () {
    this.writeFile(bbbPWM.RUN_PATH, '1');
};

//process initialization/configuration
bbbProcess.prototype.configureDevice = function () {
    var _this = this;

    this.writeFile(bbbProcess.RUN_PATH, '1').then(function () {
        //process initialization code
        // param to be replaced with the process param to control/sense.
        // e.g. period, duty cycle...
        return _this.writeFile(bbbProcess.PARAM_PATH, bbbProcess.PARAM);
    }).then(function () {
            console.log('Process Configured...');
        }, _this.errorHandler).done();
};

bbbProcess.errorHandler = function (error) {
    console.log('Error: ' + error.message);
};

module.exports = bbbProcess;