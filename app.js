// Cada entrada aqui aponta para um SVG
const pages = [
  { id: "Apresentacao",    label: "O projeto",     file: "Apresentacao.svg" },
  { id: "centro", label: "O Centro Espírita de Umbanda a Caminho da Verdade",     file: "bandeira-guarani-1.svg" },
  { id: "simbolo",    label: "O Simbolo do CEU - A Caminho da Verdade",     file: "simbolo.svg" },
  { id: "expo",    label: "Visite a Exposição Virtual",     file: "expo_virtual/index.html" },
  { id: "bandeira2", label: "Bandeira Guarani - Apresentação", file: "bandeira-guarani-2.svg" },
  { id: "bandeira3", label: "Bandeira Guarani - Artefatos", file: "bandeira-guarani-3.svg" },
  { id: "cacique1",  label: "Cacique Morubissaba - Apresentação", file: "cacique-1.svg" },
  { id: "cacique2",  label: "Cacique Morubissaba - Artefatos", file: "cacique-2.svg" },
  { id: "junta1",    label: "Junta Médica - Apresentração",         file: "junta-medica-1.svg" },
  { id: "junta2",    label: "Junta Médica - Artefatos",     file: "junta-medica-2.svg" },
  { id: "integrantes1",    label: "Integrantes 1",     file: "integrantes-1.svg" },
  { id: "integrantes2",    label: "Integrantes 2",     file: "integrantes-2.svg" },
  { id: "integrantes3",    label: "Integrantes 3",     file: "integrantes-3.svg" }
  
];
const menuEl = document.getElementById("menu");
const viewerEl = document.getElementById("viewer");
const sidebar = document.getElementById("sidebar");
const menuToggle = document.getElementById("menu-toggle");

/* Construir menu lateral */
function buildMenu() {
  pages.forEach(page => {
    const link = document.createElement("a");
    link.href = "#" + page.id;
    link.textContent = page.label;
    link.dataset.pageId = page.id;
    menuEl.appendChild(link);
  });
}

function setActive(id) {
  document.querySelectorAll("#menu a").forEach(a => {
    a.classList.toggle("active", a.dataset.pageId === id);
  });
}

function loadFromHash() {
  let id = location.hash.replace("#", "");
  if (!id) {
    id = "Apresentacao"; // página padrão
    location.hash = "#Apresentacao"; // define o hash na URL
  }
  const page = pages.find(p => p.id === id);

  if (!page) return;

  setActive(id);

 // Se for página externa → redireciona
if (page.external) {
  window.location.href = page.external;
  return;
}

// Caso contrário, carrega SVG normalmente
viewerEl.innerHTML = `
  <object type="image/svg+xml" data="${page.file}">
    <img src="${page.file}">
  </object>
`;

  // No mobile, fecha o menu ao clicar
  sidebar.classList.remove("open");
}

/* Toggle mobile */
menuToggle.onclick = () => {
  sidebar.classList.toggle("open");
};

buildMenu();
window.addEventListener("hashchange", loadFromHash);
window.addEventListener("load", loadFromHash);