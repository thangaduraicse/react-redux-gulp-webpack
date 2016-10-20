/**
 * utils.js
 * @description All the utility methods for the app goes here
 */

(function () {
 "use strict";

/**
 * Generate a random id
 * @see http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
 * @constructor
 */
function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
}
window.guid = guid;

/**
 * Get the cookie value
 * @see http://www.w3schools.com/js/js_cookies.asp
 * @param {string} cname - cookie name
 * @return {string} cookie value
 */
function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(";");
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
window.getCookie = getCookie;

/**
 * Check if two array is equals
 * http://stackoverflow.com/questions/7837456/how-to-compare-arrays-in-javascript
 * @param  {aray}    Array.prototype.equals
 * @return {boolean}
 */
if(Array.prototype.equals)
  console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
Array.prototype.equals = function (array) {
  if (!array)
    return false;
  if (this.length != array.length)
    return false;
  for (var i = 0, l=this.length; i < l; i++) {
    if (this[i] instanceof Array && array[i] instanceof Array) {
      if (!this[i].equals(array[i]))
        return false;
    }
    else if (this[i] != array[i]) {
      return false;
    }
  }
  return true;
}
Object.defineProperty(Array.prototype, "equals", {enumerable: false});

})();
