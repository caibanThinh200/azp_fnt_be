import TEXT_DEFINE from "../constant/textDefine"

export const getActionResult = (code, result = null, error = null, extraMessage = "") => {
    if(result && typeof(result) === "string") {
        result = `${result} ${TEXT_DEFINE.ACTION[code]}, ${extraMessage}`
    }
    if(error && typeof(error) === "string") {
        error = `${error} ${TEXT_DEFINE.ACTION[code]}, ${extraMessage}`
    }
    return {
        status: code === 200 ? "SUCCESS" : "FAILED",
        result: result,
        error: code !== 200 ? {
            code,
            message: error
        } : null
    }
}

export const checkUndefined = (val) => {
    if (Array.isArray(val)) {
        return val.length > 0 ? val : []
    } else {
        return val || val !== undefined || val !== "" || val !== null ? val : "";
    }
};

export function removeObjectEmptyValue(obj) {
    return obj && Object.entries(obj)
        .filter(([_, v]) => !!v)
        .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});
}

export function checkSpicialCharacter(value) {
    return value.match(/^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/) || "";
}

export function checkPhoneNumberValue(value) {
    return value.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im) || "";
}

export function hasNumber(string) {
    return /\d/.test(string);
}

export function checkUpperCase(strings) {
    var i = 0;
    return strings.split("").some(character => isNaN(parseInt(character)) && character === character.toUpperCase())
}

export function checkEmailValue(value) {
    return value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) || "";
}

export function hasNumberInString(value) {
    return /\d/.test(value);
}

export function responseBadRequest(message, res) {
    res.json({
        status: TAG_DEFINE.STATUS.failed,
        result: null,
        error: {
            code: 400,
            message: message
        }
    })
}