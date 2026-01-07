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
    "bandeira_guarani": { titulo: "Bandeira Guarani", descricao: "Este é o ponto que liga o Centro Espírita de Umbanda A Caminho da Verdade com a Falange Guarani, que não é exclusiva da casa, mas é característica.\nCom a Falange Guarani, chegam seus caboclos, trazendo purificação, proteção e cura da alma e do corpo. Os caboclos são conhecidos como guerreiros das matas e sábios da ancestralidade brasileira. Eles resgatam os saberes dos povos originários e nos permitem relembrar das nossas raízes. Com seus rituais de cura e saberes herdados dos ancestrais, mostram que somos a continuidade das águas, das matas e da natureza como um todo. Os caboclos também nos ensinam sobre resistência e nos convidam a refletir sobre a existência humana e como nos relacionamos com o mundo material e espiritual na modernidade.", imagem: "" },
    "ponto_cacique": { titulo: "Ponto Cacique", descricao: "Este é o ponto riscado de uma das primeiras entidades chefes da casa, no contexto da exposição, remete à ancestralidade do Centro Espírita de Umbanda A Caminho da Verdade, por ser o caboclo que a dirigente fundadora da casa, Valkiria Fraga Leite, recebia. Com este ponto, nos conectamos com a ancestralidade espiritual e genética da casa. Este Centro Espírita de Umbanda tem base na Sociedade Espírita Bom Jesus de Iguape, dos pais de Valkiria, Jovelino Pereira Fraga e Hercília Barboza Fraga.\nNeste aspecto, buscamos evidenciar e homenagear a linhagem espiritual e material que envolve esta terreira, bem como alguns de seus médiuns e frequentadores.\nO Cacique Morubissaba é uma entidade", imagem: "" },
    "ponto_junta": { titulo: "Ponto Junta Médica", descricao: "Este é o ponto que representa a Junta Médica, que é a porta de entrada da casa, ou seja, por onde a maioria dos frequentadores conhecem os trabalhos realizados na terreira e os médiuns começam a participar da corrente.\nÉ um trabalho de cura realizado na casa, com grande importância na vida das pessoas. Diversas curas foram alcançadas, das mais variadas, desde as mais graves até o acompanhamento durante uma etapa desafiadora na vida do paciente.\nOs médicos trabalham de maneira silenciosa, sempre deixando seus pacientes tranquilos e acolhidos, com esperança e fé de que seus desafios serão superados. São realizadas consultas com os médicos e cirurgias com o cirurgião da casa, Dr. Paulo Mendes. Os trabalhos são coordenados pelo Dr. Francisco Xavier, diretor espiritual da Junta Médica.", imagem: "" }
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