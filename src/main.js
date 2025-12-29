import { Html5Qrcode } from "html5-qrcode";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

// Instancia del lector
const html5QrCode = new Html5Qrcode("reader");
let currentCameraId = null;

// Configuración del lector
const config = {
    fps: 10,
    qrbox: { width: 250, height: 250 }
};

// -----------------------------
// 📌 FUNCIONES EXTRAÍDAS
// -----------------------------

// Obtener cámaras
async function getCameras() {
    const devices = await Html5Qrcode.getCameras();
    if (!devices || devices.length === 0) {
        alert("No se encontraron cámaras.");
        return null;
    }
    return devices;
}

// Seleccionar cámara (por ahora la primera)
function selectDefaultCamera(devices) {
    return devices[0].id;
}

// Iniciar cámara
async function startCamera() {
    const devices = await getCameras();
    if (!devices) return;

    currentCameraId = selectDefaultCamera(devices);

    await html5QrCode.start(
        currentCameraId,
        config,
        onScanSuccess,
        onScanFailure
    );
}

// Detener cámara
function stopCamera() {
    html5QrCode.stop();
}

// Listar cámaras en pantalla
async function listCameras() {
    const devices = await getCameras();
    if (!devices) return;

    const listCameras = document.getElementById("list-camaras");
    listCameras.innerHTML = "";

    devices.forEach(device => {
        const li = document.createElement("li");
        li.textContent = device.label || `Cámara ${device.id}`;
        listCameras.appendChild(li);
    });
}

// -----------------------------
// 📌 CALLBACKS DEL ESCÁNER
// -----------------------------

function onScanSuccess(decodedText) {
    document.getElementById("result").textContent =
        "Código detectado: " + decodedText;

    stopCamera();
}

function onScanFailure(error) {
    // Ignorar errores de escaneo
}

// -----------------------------
// 📌 EVENTOS DE BOTONES
// -----------------------------

document.getElementById("btnStart").addEventListener("click", startCamera);
document.getElementById("btnStop").addEventListener("click", stopCamera);
document.getElementById("btnListar").addEventListener("click", listCameras);
