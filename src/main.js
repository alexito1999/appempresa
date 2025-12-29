import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";

const html5QrCode = new Html5Qrcode("reader");
let currentCameraId = null;

const config = {
    fps: 10,
    qrbox: { width: 250, height: 250 }

};

function onScanSuccess(decodedText) {
    document.getElementById("result").textContent =
        "Código detectado: " + decodedText;

    html5QrCode.stop();
}

function onScanFailure(error) { }



document.getElementById("btnStart").addEventListener("click", async () => {
    // Pedir cámaras SOLO cuando el usuario pulsa el botón
    const devices = await Html5Qrcode.getCameras();
    if (!devices || devices.length === 0) {
        alert("No se encontraron cámaras.");
        return;
    }

    currentCameraId = devices[0].id; // Seleccionar la primera cámara disponible


    html5QrCode.start(
        currentCameraId,
        config,
        onScanSuccess,
        onScanFailure
    );
});

document.getElementById("btnStop").addEventListener("click", () => {
    html5QrCode.stop();
});
