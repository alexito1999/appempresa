import Bowser from "bowser";
const info = Bowser.getParser(window.navigator.userAgent);
const tipo = info.getPlatformType();
console.log("Tipo de dispositivo:", tipo);
if (tipo === "mobile") {
    alert("Estás en un móvil");
} else if (tipo === "tablet") {
    alert("Estás en una tablet");
} else { alert("Estás en un ordenador"); }