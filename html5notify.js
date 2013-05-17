(function (w) {
  'use strict';
	
	var napi, perms = ['granted', 'default', 'denied'];
	if (window.webkitNotifications) { // google chrome implementation
		napi = window.webkitNotifications;
		w.Html5Notification = function Html5Notification(title, options) {
			options = options || {};
			var n;
			try {
				n = napi.createNotification(options.iconUrl, title, options.body);
				n.__defineSetter__('onshow', function (callback) { this.ondisplay = callback; });
				n.__defineGetter__('onshow', function () { return this.ondisplay; });
				n.close = n.cancel;
				n.show();
			} catch (e) {
				n = {close : function () {}};
				n.__defineSetter__('onerror', function (callback) { if (typeof callback === 'function') callback.call(this); });
			}
			if (options.onclose) n.onclose = options.onclose;
			if (options.onerror) n.onerror = options.onerror;
			if (options.onshow) n.onshow = options.onshow;
			if (options.onclick) n.onclick = options.onclick;
			return n;
		};
		w.Html5Notification.__defineGetter__('permission', function () { return perms[napi.checkPermission()]; });
		w.Html5Notification.requestPermission = function (callback) { napi.requestPermission(function () {
			if (typeof callback === 'function') callback.call(window, 'granted');
		}); };
	} else if (window.Notification) { // we can work with w3c working draft
		w.Html5Notification = window.Notification;
	} else { // web notifications not supported so let's make some dummy implementation
		w.Html5Notification = function Html5Notification() {
			this.close = function () {};
		};
		w.Html5Notification.permission = 'unsupported'; // we can't use setters/getters here cause it can be IE :-)
		w.Html5Notification.requestPermission = function (callback) {
			if (typeof callback === 'function') callback.call(this, 'unsupported');
		};
	}
}(window)); // we can use any other object that we what to have notifications
