/**
 * @description Sets a cookie with the specified name, value, and expiration period.
 *
 * @param {string} name  - The name of the cookie.
 * @param {string} value - The value to be stored in the cookie.
 * @param {number} days  - The number of days until the cookie expires.
 */
function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    const sameSite = ';SameSite=None';
    const secure = ';Secure'; /*because of HTTPS*/
    document.cookie = name + '=' + value  + ';expires=' + expires.toUTCString() + ';path=/' + sameSite + secure;
}

/**
 * @description Retrieves the value of a cookie with the specified name.
 *
 * @param {string} name   - The name of the cookie to retrieve.
 * @returns {string|null} - The value of the cookie, or null if the cookie is not found.
 */
function getCookie(name) {
    const nameEQ = name + '=';
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) === ' ') cookie = cookie.substring(1, cookie.length);
        if (cookie.indexOf(nameEQ) === 0) return cookie.substring(nameEQ.length, cookie.length);
    }
    return null;
}

/**
 * @description Deletes a cookie by setting its expiration date to the past.
 * 
 * @param {string} name - The name of the cookie to delete.
 */
function delCookie(name) {
    document.cookie = name + '=' + null + ";expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;SameSite=None;Secure";
}


/**
 * @description Checks if a cookie with the specified name exists.
 *
 * @param {string} name - The name of the cookie to check.
 * @returns {boolean}   - True if the cookie exists, false otherwise.
 */
function cookieExists(name) {
    if (getCookie(name) !== null) {
        return true;
    }
    return false;
}