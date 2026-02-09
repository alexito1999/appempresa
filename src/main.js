import { Modal } from "bootstrap";
import { IconExclamation } from "./icons/IconExclamation.js";
import { IconValidate } from "./icons/IconValidate.js";
import $ from "jquery";

const modal = new Modal(document.getElementById("trackerFormModal"));

document.getElementById("btnScanTracker").addEventListener("click", () => {
    modal.show();
});

document.getElementById("startScanner").addEventListener("click", () => {
    const trackerData = {
        ct: document.getElementById("ct").value,
        tipo: document.getElementById("tipoTracker").value,
        numero: document.getElementById("numTracker").value,
        nombre: document.getElementById("trackerText").textContent,
    };
    localStorage.setItem("trackerData", JSON.stringify(trackerData));
    if (validateForm()) {
        window.location.href = "/src/escaner/escaner.html";
    } else {
        alert("Por favor, complete todos los campos del formulario.");
    }
});

function validateForm() {
    const ct = document.getElementById("ct").value.trim();
    const tipo = document.getElementById("tipoTracker").value.trim();
    const num = document.getElementById("numTracker").value.trim();
    return ct !== "" && tipo !== "" && num !== "";
}

function applyValidationClass(input, value) {
    const isInteger = value !== "" && Number.isInteger(Number(value));
    if (isInteger) {
        input.classList.remove("invalido");
        input.classList.add("valido");
    } else {
        input.classList.remove("valido");
        input.classList.add("invalido");
    }
}
let estadoIcon = false;
function updateTrackerName() {
    const ct = $("#ct").val().trim();
    const tipo = $("#tipoTracker").val().trim();
    const num = $("#numTracker").val().trim();
    applyValidationClass(document.getElementById("ct"), ct);
    applyValidationClass(document.getElementById("tipoTracker"), tipo);
    applyValidationClass(document.getElementById("numTracker"), num);
    const ctVal = ct || "?";
    const tipoVal = tipo || "?";
    const numVal = num || "?";
    const texto = `Tr${ctVal}.${tipoVal}.${numVal}`;
    const incompleto = [ctVal, tipoVal, numVal].includes("?");
    $("#trackerText").text(texto);
    if (incompleto && estadoIcon === false) return;
    if (!incompleto && estadoIcon === true) return;
    estadoIcon = !incompleto;
    const nuevoIcono = incompleto ? IconExclamation(16) : IconValidate(16);
    $("#trackerIcon")
        .stop(true, true)
        .fadeOut(120, function () {
            $(this).html(nuevoIcono).fadeIn(120);
        });
}

document.getElementById("ct").addEventListener("input", updateTrackerName);
document
    .getElementById("tipoTracker")
    .addEventListener("input", updateTrackerName);
document
    .getElementById("numTracker")
    .addEventListener("input", updateTrackerName);
