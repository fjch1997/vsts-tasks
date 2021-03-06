
import ma = require('vsts-task-lib/mock-answer');
import tmrm = require('vsts-task-lib/mock-run');
import path = require('path');
import fs = require('fs');
var Readable = require('stream').Readable

var nock = require('nock');

let taskPath = path.join(__dirname, '..', 'vsmobilecenterupload.js');
let tmr: tmrm.TaskMockRunner = new tmrm.TaskMockRunner(taskPath);

tmr.setInput('serverEndpoint', 'MyTestEndpoint');
tmr.setInput('appSlug', 'testuser/testapp');
tmr.setInput('app', '/test/path/to/one.ipa');
tmr.setInput('releaseNotesSelection', 'releaseNotesInput');
tmr.setInput('releaseNotesInput', 'my release notes');
tmr.setInput('symbolsType', 'Apple');
tmr.setInput('dsymPath', '/test/path/to/symbols.dSYM');

// provide answers for task mock
let a: ma.TaskLibAnswers = <ma.TaskLibAnswers>{
    "findMatch": {
        "/test/path/to/one.ipa": [
            "/test/path/to/one.ipa"
        ],
        "/test/path/to/symbols.dSYM": [
            "/test/path/to/symbols.dSYM"
        ]
    },
    "checkPath" : {
        "/test/path/to/one.ipa": true
    },
    "exist": {
        "/test/path/to/symbols.dSYM": false
    }
};
tmr.setAnswers(a);

tmr.run();

