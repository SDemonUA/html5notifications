html5notifications
==================

Try to get to use of web notifications

Script will create Html5Notification object that will sutisfy http://www.w3.org/TR/notifications/

Supported browsers : 
- Firefox 22+
- Safari 6+ (on X Mountain Lion)
- Chrome 22+

Usage

Chek permissions
Html5Notification.permission
- default : user was never asked to allow notifications
- denied : user denie notifications
- allowed : user allow notifications
- unsuported : (non-standard) browser does not support notifications

Html5Notification.requestPermission(callback) : must be called from user guesture handler (like click)
and will call callback with param 'allowed' if user allow notifications

var notif = new Html5Notification(title, {
  body : '', // notification text
  icon : '', // url for icon to be displayed in notification
  dir : '', // auto, ltr, rtl (default 'auto') - text direction
  tag : '' // some id to replace same notifications
});

notif.onshow = fn;
notif.onerror = fn;
notif.oncancel = fn;
notif.onclick = fn;

notif.close(); // cancel notification
