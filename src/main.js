import { Modal } from "bootstrap";

const modal = new Modal(document.getElementById("trackerFormModal"));

document.getElementById("btnScanTracker").addEventListener("click", () => {
    modal.show();
});

document.getElementById("startScanner").addEventListener("click", () => {
    const trackerData = {
        ct: document.getElementById("ct").value,
        tipo: document.getElementById("tipoTracker").value,
        numero: document.getElementById("numTracker").value,
        nombre: document.getElementById("trackerName").value,
    };
    localStorage.setItem("trackerData", JSON.stringify(trackerData));
    if (validateForm()) {
        window.location.href = "./src/scanner.html";
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
function updateTrackerName() {
/*     debugger;
 */    const ctInput = document.getElementById("ct");
    const tipoInput = document.getElementById("tipoTracker");
    const numInput = document.getElementById("numTracker");

    const ct = ctInput.value.trim();
    const tipo = tipoInput.value.trim();
    const num = numInput.value.trim();

    const ctVal = ct !== "" ? ct : "?";
    const tipoVal = tipo !== "" ? tipo : "?";
    const numVal = num !== "" ? num : "?";

    applyValidationClass(ctInput, ctVal);
    applyValidationClass(tipoInput, tipoVal);
    applyValidationClass(numInput, numVal);

    document.getElementById("trackerName").value =
        `Tr${ctVal}.${tipoVal}.${numVal}`;
}

document.getElementById("ct").addEventListener("input", updateTrackerName);
document
    .getElementById("tipoTracker")
    .addEventListener("input", updateTrackerName);
document
    .getElementById("numTracker")
    .addEventListener("input", updateTrackerName);
