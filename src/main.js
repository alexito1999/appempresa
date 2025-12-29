import { Html5Qrcode } from "html5-qrcode";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import { Modal } from "bootstrap"; // IMPORTANTE
const html5QrCode = new Html5Qrcode("reader");
let currentCameraId = null;

const config = {
    fps: 10,
    qrbox: { width: 250, height: 250 }
};

// -----------------------------
// 📌 FUNCIONES
// -----------------------------

async function getCameras() {
    const devices = await Html5Qrcode.getCameras();
    if (!devices || devices.length === 0) {
        alert("No se encontraron cámaras.");
        return null;
    }
    return devices;
}

async function startCamera(cameraId) {
    currentCameraId = cameraId;

    await html5QrCode.start(
        currentCameraId,
        config,
        onScanSuccess,
        onScanFailure
    );
}

async function startDefaultCamera() {
    const devices = await getCameras();
    if (!devices) return;

    await startCamera(devices[0].id);
}

async function stopCamera() {
    if (html5QrCode.isScanning) {
        await html5QrCode.stop();
    }
}

// -----------------------------
// 📌 LLENAR SELECT DE CÁMARAS
// -----------------------------

async function loadCameraOptions() {
    const devices = await getCameras();
    if (!devices) return;

    const select = document.getElementById("selectCamaras");
    select.innerHTML = `<option value="">Selecciona una cámara...</option>`;

    devices.forEach(device => {
        const option = document.createElement("option");
        option.value = device.id;
        option.textContent = device.label || `Cámara ${device.id}`;
        select.appendChild(option);
    });
}

// -----------------------------
// 📌 CALLBACKS DEL ESCÁNER
// -----------------------------

function onScanSuccess(decodedText) {
    if (html5QrCode.isScanning) { html5QrCode.pause(); }

    const lista = JSON.parse(localStorage.getItem("codigos")) || [];
    lista.push({ codigo: decodedText, fecha: new Date().toLocaleString() });
    localStorage.setItem("codigos", JSON.stringify(lista));
    document.getElementById("codigoDetectado").textContent = decodedText; const modal = new Modal(document.getElementById("codigoModal"));
    modal.show();
    stopCamera();
}

function onScanFailure(error) {
    // Ignorar errores de escaneo
}

// -----------------------------
// 📌 EVENTOS
// -----------------------------

document.getElementById("btnStart").addEventListener("click", startDefaultCamera);
document.getElementById("btnStop").addEventListener("click", stopCamera);

document.getElementById("codigoModal").addEventListener("hidden.bs.modal", () => { if (html5QrCode.isScanning) { html5QrCode.resume(); } });

// Cuando el usuario selecciona una cámara del select
document.getElementById("selectCamaras").addEventListener("change", async (e) => {
    const cameraId = e.target.value;

    if (!cameraId) return;

    await stopCamera();
    await startCamera(cameraId);
});

// Cargar cámaras al iniciar la página
loadCameraOptions();
