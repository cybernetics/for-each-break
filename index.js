'use strict';

const UNDEFINED = void 0;

const BREAK = (function () {
    // main function for BREAK function
    const Break = function (arg = UNDEFINED) {
        BREAK.returned = arg;
        return BREAK;
    };

    // used for nested each and eachProp housekeeping
    // clear or set default return value and return previous state
    Break.clearDefault = function clearDefault(defaultReturn) {
        const returned = BREAK.returned;
        BREAK.returned = defaultReturn;
        return returned;
    };

    // used for nested each and eachProp housekeeping
    // restore default returned which was cleared above
    Break.restoreDefault = function restoreDefault(returned) {
        BREAK.returned = returned;
    };

    // used for setting default break returned value before callback invocation
    Break.setDefault = function setDefault(returned) {
        BREAK.returned = returned;
    };
    return Break;
})();

/**
 * Execute forEach on array like object and return value using BREAK
 *
 * @this             array like object over which to loop
 * @param callback   callback function (value, index, array)
 * @param thisArg    optional arg to use as this for the callback
 * @param defaultReturn optional default return value
 * @return {*}
 */
function forEach(callback, thisArg = UNDEFINED, defaultReturn = UNDEFINED) {
    const savedReturn = BREAK.clearDefault(defaultReturn);
    const iMax = this.length;
    let result = thisArg;
    for (let i = 0; i < iMax; i++) {
        const value = this[i];
        const returned = callback.call(thisArg, value, i, this);
        if (returned === BREAK) {
            result = BREAK.returned;
            break;
        }
    }
    BREAK.restoreDefault(savedReturn);
    return result;
}

/**
 * Execute forEach on array like object in reverse and return value using BREAK
 *
 * @this             array like object over which to loop
 * @param callback   callback function (value, index, array)
 * @param thisArg    optional arg to use as this for the callback
 * @param defaultReturn optional default return value
 * @return {*}
 */
function forEachRight(callback, thisArg = UNDEFINED, defaultReturn = UNDEFINED) {
    const savedReturn = BREAK.clearDefault(defaultReturn);
    const iMax = this.length;
    let result = thisArg;
    for (let i = iMax; i--;) {
        const value = this[i];
        const returned = callback.call(thisArg, value, i, this);
        if (returned === BREAK) {
            result = BREAK.returned;
            break;
        }
    }
    BREAK.restoreDefault(savedReturn);
    return result;
}

/**
 * Execute map on array like object and return accumulated values,
 * returning BREAK will terminate loop early,
 * BREAK(value) or RETURN(value) will return value as result of call
 *
 * @this             array like object over which to loop
 * @param callback   callback function (value, index, array)
 * @param thisArg    optional arg to use as this for the callback
 * @return {*}
 */
function map(callback, thisArg = UNDEFINED) {
    let result = [];
    const savedReturn = BREAK.clearDefault(result);
    const iMax = this.length;
    for (let i = 0; i < iMax; i++) {
        const value = this[i];
        const returned = callback.call(thisArg, value, i, this);
        if (returned === BREAK) {
            result = BREAK.returned;
            break;
        }
        result.push(returned);
    }
    BREAK.restoreDefault(savedReturn);
    return result;
}

/**
 * Execute map on array like object in reverse and return accumulated values,
 * returning BREAK will terminate loop early,
 * BREAK(value) or RETURN(value) will return value as result of call
 *
 * @this             array like object over which to loop
 * @param callback   callback function (value, index, array)
 * @param thisArg    optional arg to use as this for the callback
 * @return {*}
 */
function mapRight(callback, thisArg = UNDEFINED) {
    let result = [];
    const savedReturn = BREAK.clearDefault(result);
    const iMax = this.length;
    for (let i = iMax; i--;) {
        const value = this[i];
        const returned = callback.call(thisArg, value, i, this);
        if (returned === BREAK) {
            result = BREAK.returned;
            break;
        }
        result.push(returned);
    }
    BREAK.restoreDefault(savedReturn);
    return result;
}

/**
 * Execute filter on array like object and return accumulated values,
 * returning BREAK or RETURN will terminate loop early,
 * BREAK(value) or RETURN(value) will return value as result of call
 *
 * @this             array like object over which to loop
 * @param callback   callback function (value, index, array)
 * @param thisArg    optional arg to use as this for the callback
 * @return {*}
 */
function filter(callback, thisArg = UNDEFINED) {
    let result = [];
    const savedReturn = BREAK.clearDefault(result);
    const iMax = this.length;
    let i = iMax;
    for (let i = 0; i < iMax; i++) {
        const value = this[i];
        const returned = callback.call(thisArg, value, i, this);
        if (returned === BREAK) {
            result = BREAK.returned;
            break;
        }
        if (returned) {
            result.push(value);
        }
    }
    BREAK.restoreDefault(savedReturn);
    return result;
}

/**
 * Execute filter on array like object in reverse and return accumulated values,
 * returning BREAK or RETURN will terminate loop early,
 * BREAK(value) or RETURN(value) will return value as result of call
 *
 * @this             array like object over which to loop
 * @param callback   callback function (value, index, array)
 * @param thisArg    optional arg to use as this for the callback
 * @return {*}
 */
function filterRight(callback, thisArg = UNDEFINED) {
    let result = [];
    const savedReturn = BREAK.clearDefault(result);
    const iMax = this.length;
    let i = iMax;
    for (let i = iMax; i--;) {
        const value = this[i];
        const returned = callback.call(thisArg, value, i, this);
        if (returned === BREAK) {
            result = BREAK.returned;
            break;
        }
        if (returned) {
            result.push(value);
        }
    }
    BREAK.restoreDefault(savedReturn);
    return result;
}

module.exports.BREAK = BREAK;
module.exports.RETURN = BREAK;
module.exports.forEach = forEach;
module.exports.map = map;
module.exports.filter = filter;
module.exports.forEachRight = forEachRight;
module.exports.mapRight = mapRight;
module.exports.filterRight = filterRight;
