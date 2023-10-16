import { Base64 } from "js-base64";

function encodeJSON(json) {
    return Base64.encode(JSON.stringify(json))
}

function decodeBase64(base64String) {
    return JSON.parse(Base64.decode(base64String))
}

export {encodeJSON, decodeBase64};