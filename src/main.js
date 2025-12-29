


import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";

const html5QrCode = new Html5Qrcode("reader");

let currentCameraId = null;

// Buscar cámaras disponibles
Html5Qrcode.getCameras().then(devices => {
    if (devices && devices.length) {
        // Si hay cámara trasera, úsala
        const backCam = devices.find(d =>
            d.label.toLowerCase().includes("back")
        );

        currentCameraId = backCam ? backCam.id : devices[0].id;
    }
});

// Configuración del lector
const config = {
    fps: 10,
    qrbox: { width: 250, height: 250 }, formatsToSupport: [
        Html5QrcodeSupportedFormats.EAN_13,
        Html5QrcodeSupportedFormats.CODE_128,
        Html5QrcodeSupportedFormats.CODE_39,
        Html5QrcodeSupportedFormats.UPC_A,
        Html5QrcodeSupportedFormats.UPC_E,
        Html5QrcodeSupportedFormats.ITF,
        Html5QrcodeSupportedFormats.CODABAR
    ],
    experimentalFeatures: {
        useBarCodeDetectorIfSupported: true
    }
};

// Cuando detecta un QR
function onScanSuccess(decodedText) {
    document.getElementById("result").textContent =
        "Código detectado: " + decodedText;

    html5QrCode.stop();
}

// Errores normales de escaneo (no mostrar)
function onScanFailure(error) { }

// Botón: iniciar cámara
document.getElementById("btnStart").addEventListener("click", () => {
    if (!currentCameraId) {
        alert("No se encontró cámara");
        return;
    }

    html5QrCode.start(
        currentCameraId,
        config,
        onScanSuccess,
        onScanFailure
    );
});

// Botón: detener cámara
document.getElementById("btnStop").addEventListener("click", () => {
    html5QrCode.stop();
});