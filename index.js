'use strict'
var Alexa = require("alexa-sdk");
var APP_ID = 'SKILL ID HERE';

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(startSessionHandlers, InfoCollectorHandlers);
    alexa.execute();
};

var startSessionHandlers = {
    'LaunchRequest': function() {
        this.emit(':askWithCard', 'Hello, tell me to welcome the campers');
    },
    'AMAZON.HelpIntent': function() {
        this.emit(':ask', 'This skill wis to welcome campers to That Conference. Tell me to welcome the campers');
    },
    'AMAZON.StopIntent': function() {
        this.emit(':tell', "Goodbye!");
    },
    'AMAZON.CancelIntent': function() {
        this.emit(':tell', "Goodbye!");
    },
    'SessionEndedRequest': function() {
        console.log('session ended!');
        this.emit(":tell", "Goodbye!");
    }
}

var InfoCollectorHandlers = {
    'StartSession': function() {
        this.emit('StartSession');
    },
    'WelcomeIntent': function() {
        var response = "Welcome campers to <break strength='medium'/> <prosody volume='x-loud' pitch='high' rate='x-slow'>That Conference</prosody><break strength='x-strong'/>";
        var soundclip = ""; // "<audio src='https://s3.amazonaws.com/mp3-here' />"
        var response2 = "Let me introduce you to your speaker, <emphasis level='reduced'>Dana Hart</emphasis>. <break strength='x-strong'/><say-as interpret-as='interjection'>woo hoo</say-as>";
        this.emit(':tell', response+soundclip+response2);
    },
    'AMAZON.CancelIntent': function() {
        this.emit(':tell', "Goodbye!");
    },
    'SessionEndedRequest': function() {
        console.log('session ended!');
        this.emit(":tell", "Goodbye!");
    },
    'Unhandled': function() {
        console.log("UNHANDLED");
        this.emit(':ask', 'Sorry, I didn\'t get that. Try telling me to welcome the campers again.', 'Try telling me to welcome the campers.');
    }
}
