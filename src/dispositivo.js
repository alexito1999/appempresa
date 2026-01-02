

import Bowser from "bowser";

const parser = Bowser.getParser(window.navigator.userAgent);
const tipo = parser.getPlatformType(); // "mobile", "tablet", "desktop"

export function isMobile() {
    return tipo === "mobile";
}

export function isTablet() {
    return tipo === "tablet";
}

export function isDesktop() {
    return tipo === "desktop";
}

export function getDeviceType() {
    return tipo;
}
