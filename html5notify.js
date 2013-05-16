(function (w) {
  'use strict';
	
	var napi, perms = ['granted', 'default', 'denied'];
	if (w.hasOwnProperty('webkitNotifications')) { // google chrome implementation
		napi = w.webkitNotifications;
		w.Html5Notification = function Html5Notification(title, options) {
			options = options || {};
			var n;
			try {
				n = napi.createNotification(options.iconUrl, title, options.body);
				n.__defineSetter__('onshow', function (c) { this.ondisplay = c; });
				n.__defineGetter__('onshow', function () { return this.ondisplay; });
				n.close = n.cancel;
				n.show();
			} catch (e) {
				n = {
					set onerror (v) { if (typeof v === 'function') v.call(this); }
				};
			}
			return n;
		};
		w.Html5Notification.__defineGetter__('permission', function () { return perms[napi.checkPermission()]; });
		w.Html5Notification.requestPermission = function (c) { napi.requestPermission(function () {
			if (typeof c === 'function') c.call(w, 'granted');
		}); };
	} else if (w.hasOwnProperty('Notification')) { // we can work with w3c working draft
		w.Html5Notification = w.Notification;
	} else { // web notifications not supported so let's make some dummy implementation
		w.Html5Notification = function Html5Notification() {
			this.close = function () {};
		};
		w.Html5Notification.permission = 'denied'; // we can't use setters/getters here cause it can be IE :-)
		w.Html5Notification.requestPermission = function (callback) {
			if (typeof callback === 'function') callback.call(this, 'denied');
		};
	}
}(window));
