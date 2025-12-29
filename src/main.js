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

// Iniciar cámara con un ID específico
async function startCamera(cameraId) {
    currentCameraId = cameraId;

    await html5QrCode.start(
        currentCameraId,
        config,
        onScanSuccess,
        onScanFailure
    );
}

// Iniciar cámara por defecto
async function startDefaultCamera() {
    const devices = await getCameras();
    if (!devices) return;

    const defaultId = devices[0].id;
    await startCamera(defaultId);
}

// Detener cámara
async function stopCamera() {
    if (html5QrCode.isScanning) {
        await html5QrCode.stop();
    }
}

// -----------------------------
// 📌 LISTAR CÁMARAS + SELECCIONAR
// -----------------------------

document.getElementById("btnListar").addEventListener("click", async () => {
    const devices = await getCameras();
    if (!devices) return;

    const list = document.getElementById("list-camaras");
    list.innerHTML = "";

    devices.forEach(device => {
        const li = document.createElement("li");
        li.className = "list-group-item list-group-item-action";
        li.textContent = device.label || `Cámara ${device.id}`;

        li.addEventListener("click", async () => {
            await stopCamera();
            await startCamera(device.id);
        });

        list.appendChild(li);
    });
});

// -----------------------------
// 📌 CALLBACKS DEL ESCÁNER
// -----------------------------

async function onScanSuccess(decodedText) {
    document.getElementById("result").textContent =
        "Código detectado: " + decodedText;

    await stopCamera();
}

function onScanFailure(error) {
    // Ignorar errores de escaneo
}

// -----------------------------
// 📌 EVENTOS DE BOTONES
// -----------------------------

document.getElementById("btnStart").addEventListener("click", startDefaultCamera);
document.getElementById("btnStop").addEventListener("click", stopCamera);
