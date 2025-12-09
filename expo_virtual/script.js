// ======================================
// 1. DADOS E DESCRIÇÕES DA EXPOSIÇÃO
// ======================================
const dadosExposicao = {
    "cadeira": {
        titulo: "Cadeira da Mãe Joaquina",
        descricao: "Cadeira utilizada pela Mãe Joaquina, entidade chefe da casa. A cadeira é um ponto de força da casa, ficando sempre junto ao congá.",
        imagem: "image.png"
    },
     "ponteiras": {
        titulo: "Primeiras Ponteiras da Casa",
        descricao: "As primeiras ponteiras utilizadas na casa. A ponteira é um instrumento utilizado para a proteção dos rituais de Umbanda.",
        imagem: "ponteiras.png"
    },
     "cigana": {
        titulo: "Canto da Cigana",
        descricao: "O 'canto' da Cigana Cacilda, onde ela trabalhava.",
        imagem: "canto_cigana.png"
    },
     "toco": {
        titulo: "Toco do Cacique Morubissaba",
        descricao: "Toco do Cacique Morubissaba, também um ponto de força no terreiro, ficando sempre junto ao congá.",
        imagem: "toco.png"
    },
       "simbolo": {
        titulo: "Simbolo da Terreira",
        descricao: "",
        imagem: "Simbolo da Terreira.jpg"
    },
    // Adicione os outros IDs aqui se necessário

    "sincretismo": { titulo: "Sincretismo", descricao: "Descrição pendente...", imagem: "" },
    "bandeira_guarani": { titulo: "Bandeira Guarani", descricao: "Descrição pendente...", imagem: "" },
    "ponto_cacique": { titulo: "Ponto Cacique", descricao: "Descrição pendente...", imagem: "" },
    "ponto_junta": { titulo: "Ponto Junta Médica", descricao: "Descrição pendente...", imagem: "" }
};

// ======================================
// 2. LÓGICA DO MODAL
// ======================================

const modal = document.getElementById('modal-descricao');
const closeButton = document.querySelector('.close-button');

function abrirModal(objetoId) {
    const dados = dadosExposicao[objetoId];
    if (!dados) return; 

    document.getElementById('modal-titulo').textContent = dados.titulo;
    document.getElementById('modal-texto').textContent = dados.descricao;
  
    const imgElement = document.getElementById('modal-imagem');
    if (dados.imagem) {
        imgElement.src = dados.imagem;
        imgElement.style.display = 'block';
    } else {
        imgElement.src = '';
        imgElement.style.display = 'none';
    }

    modal.style.display = 'block';
}

function fecharModal() {
    modal.style.display = 'none';
}

closeButton.addEventListener('click', fecharModal);

window.addEventListener('click', function(event) {
    if (event.target === modal) {
        fecharModal();
    }
});

// ======================================
// 3. EVENTOS DOS HOTSPOTS E HOVER (SVG CORRIGIDO)
// ======================================

const svgContainer = document.getElementById('hover-svg');

document.querySelectorAll('.hotspot').forEach(hotspot => {
    
    // --- CLIQUE (ABRIR MODAL) ---
    hotspot.addEventListener('click', function(e) {
        e.preventDefault(); 
        const objetoId = this.dataset.id; 
        abrirModal(objetoId); 
    });

    // --- HOVER (DESENHAR FORMA SVG) ---
    hotspot.addEventListener('mouseenter', function() {
        if (!svgContainer) return;

        // 1. Pega as coordenadas ATUAIS (já redimensionadas pelo script abaixo)
        const coords = this.coords;
        const shapeType = this.shape;

        let shape;
        const svgNS = "http://www.w3.org/2000/svg";

        if (shapeType === 'poly') {
            // Cria polígono
            shape = document.createElementNS(svgNS, "polygon");
            shape.setAttribute("points", coords);
        
        } else if (shapeType === 'rect') {
            // Cria retângulo (COM CORREÇÃO PARA LARGURA NEGATIVA)
            shape = document.createElementNS(svgNS, "rect");
            const c = coords.split(',').map(Number);
            
            // Usa Math.min para garantir o ponto inicial correto e Math.abs para largura positiva
            const x = Math.min(c[0], c[2]);
            const y = Math.min(c[1], c[3]);
            const width = Math.abs(c[2] - c[0]);
            const height = Math.abs(c[3] - c[1]);
            
            shape.setAttribute("x", x);
            shape.setAttribute("y", y);
            shape.setAttribute("width", width);
            shape.setAttribute("height", height);
        }

        // Adiciona a classe de estilo e insere no SVG
        if (shape) {
            shape.setAttribute("class", "hover-shape");
            svgContainer.appendChild(shape);
        }
    });

    hotspot.addEventListener('mouseleave', function() {
        // Remove qualquer desenho quando o mouse sai
        if (svgContainer) {
            while (svgContainer.firstChild) {
                svgContainer.removeChild(svgContainer.firstChild);
            }
        }
    });
});

// ======================================
// 4. CORREÇÃO DE RESPONSIVIDADE PARA IMAGE MAP
// ======================================

const originalWidth = 4284;
const originalHeight = 5712;

function resizeImageMap() {
    const img = document.getElementById('imagem-principal');
    if (!img) return;

    const map = document.querySelector('map[name="image-map"]');
    if (!map) return;
    
    const currentWidth = img.clientWidth;
    const scaleFactor = currentWidth / originalWidth;
    const areas = map.querySelectorAll('area');
    
    areas.forEach(area => {
        const originalCoords = area.dataset.originalCoords || area.coords;
        
        if (!area.dataset.originalCoords) {
            area.dataset.originalCoords = originalCoords;
        }

        const coordsArray = originalCoords.split(',').map(c => parseInt(c.trim()));
        const newCoords = coordsArray.map(c => Math.round(c * scaleFactor)).join(',');
        
        area.coords = newCoords;
    });
}

window.addEventListener('load', resizeImageMap);
window.addEventListener('resize', resizeImageMap);