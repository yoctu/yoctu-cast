var applicationID = '05CE40F1';
var namespace = 'urn:x-cast:lu.offd.yoctucast';
var session = null;

function init() {
	if (!chrome.cast || !chrome.cast.isAvailable) { window.setTimeout(init, 100); return; }
	var sessionRequest = new chrome.cast.SessionRequest(applicationID);
	var apiConfig = new chrome.cast.ApiConfig(sessionRequest, sessionListener, function() {});
	chrome.cast.initialize(apiConfig, onInitSuccess, onError);
}

function onInitSuccess() {}

function onError(message) { console.log(message); }

function sessionListener(e) { session = e; }

function sessionUpdateListener(isAlive) {if (!isAlive) { session = null; }};

function sendMessage(message) {
	if (session!=null) {
		session.sendMessage(namespace, message);
	} else {
		chrome.cast.requestSession(function(e) {
			session = e;
			session.sendMessage(namespace, message);
		}, onError);
	}
}

init();
