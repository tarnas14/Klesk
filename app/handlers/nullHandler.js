'use strict';

let thisIsNotTheCommandYouAreLookingFor = function() {
    return {
        makeItSo(parsedCommand, callback) {
            callback(null, 'This is not the command you are looking for.');
        }
    };
};

export default thisIsNotTheCommandYouAreLookingFor;