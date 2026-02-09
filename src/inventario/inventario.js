// Leer datos
const lista = JSON.parse(localStorage.getItem("codigos")) || [];
const tbody = document.getElementById("tablaCodigos");
for (let i = 0; i < 100; i++) {
  const tr = document.createElement("tr");
  tr.innerHTML = ` 
  <td class="col-lg fila-w W${i + 1}" contenteditable="true"></td> 
  <td class="col-s">${i + 1}</td> 
  <td class="col-s fila-e E${i + 1}" contenteditable="true"></td> `;
  tbody.appendChild(tr);
}
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("borrar")) {
    const index = e.target.getAttribute("data-index");
    if (confirm("¿Seguro que quieres borrar este código?")) {
      const lista = JSON.parse(localStorage.getItem("codigos")) || [];
      lista.splice(index, 1);
      localStorage.setItem("codigos", JSON.stringify(lista));
      location.reload();
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const trackerId = localStorage.getItem("trackerData");
  try {
    const trackerData = JSON.parse(trackerId);
    if (!trackerData || !trackerData.nombre) throw new Error();
    document.getElementById("trackerId").innerHTML = trackerData.nombre;
  } catch {
    window.location.href = "../index.html";
  }
});
document.addEventListener("input", (e) => {
  if (e.target.matches('td[contenteditable="true"]')) {
    e.target.style.border = "2px solid #28a745";
  }
});
