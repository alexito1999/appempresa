import { isMobile, isTablet, isDesktop } from "./dispositivo.js";
import { Html5Qrcode } from "html5-qrcode";

import { IconHome } from "./icons/IconHome.js";
import { IconInventory } from "./icons/Iconinventory.js";
import { IconTorch } from "./icons/IconTorch.js";
import { IconClose } from "./icons/IconClose.js";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import { Modal } from "bootstrap"; // IMPORTANTE


const html5QrCode = new Html5Qrcode("reader");

const cameraConfig = { facingMode: "environment" };
const qrConfig = {
    fps: 10,
    qrbox: function (w, h) {
        const minEdge = Math.min(w, h);
        const size = Math.floor(minEdge * 0.5);
        return { width: size, height: size };
    }
};
let stream = null;
let torchOn = false;

// -----------------------------
// 📌 FUNCIONES
// -----------------------------

async function toggleTorch() {
    try {
        if (isDesktop()) { console.log("Torch no disponible en PC"); return; }
        if (!stream) {
            stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } } });
        }
        const track = stream.getVideoTracks()[0];
        const capabilities = track.getCapabilities();
        if (!capabilities.torch) {
            console.log("Torch no soportado en este dispositivo");
            return;
        } torchOn = !torchOn; await track.applyConstraints({ advanced: [{ torch: torchOn }] });
        console.log("Torch:", torchOn ? "ON" : "OFF");
    } catch (err) { console.error("Error al controlar la linterna:", err); }
}

async function startCamera() {
    await html5QrCode.start(
        cameraConfig,
        qrConfig,
        onScanSuccess,
        onScanFailure
    );
}

async function stopCamera() {
    if (html5QrCode.isScanning) {
        await html5QrCode.stop();
    }
}

// -----------------------------
// 📌 CALLBACKS DEL ESCÁNER
// -----------------------------

function onScanSuccess(decodedText) {
    if (html5QrCode.isScanning) { html5QrCode.pause(); }

    const lista = JSON.parse(localStorage.getItem("codigos")) || [];
    lista.push({ codigo: decodedText, fecha: new Date().toLocaleString() });
    localStorage.setItem("codigos", JSON.stringify(lista));

    document.getElementById("codigoDetectado").textContent = decodedText;
    const modal = new Modal(document.getElementById("codigoModal"));
    modal.show();
}

function onScanFailure(error) {
    console.log("-Error:", error);
}

// -----------------------------
// 📌 EVENTOS
// -----------------------------

document.getElementById("torch").addEventListener("click", toggleTorch);
document.getElementById("codigoModal").addEventListener("hidden.bs.modal", () => { if (html5QrCode.isScanning) { html5QrCode.resume(); } });

// -----------------------------
// 📌 LANZAR FUNCIONES AL ARRANCAR EL DOM
// -----------------------------

document.addEventListener("DOMContentLoaded", () => {
    startCamera();
    document.getElementById("torch").innerHTML = IconTorch();
    document.getElementById("headerClose").innerHTML = IconClose();
    document.getElementById("headerInventory").innerHTML = IconInventory();
});


