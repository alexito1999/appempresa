import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";

const html5QrCode = new Html5Qrcode("reader");
let currentCameraId = null;

const config = {
    fps: 10,
    qrbox: { width: 250, height: 250 },
    formatsToSupport: [
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
        alert("No se encontró cámara");
        return;
    }

    const backCam = devices.find(d =>
        d.label.toLowerCase().includes("back")
    );

    currentCameraId = backCam ? backCam.id : devices[0].id;

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
