document.addEventListener("DOMContentLoaded", function() {
    const body = document.body;
        const themeBadgeLeft = document.getElementById("theme-badge-left");
    const themeBadgeRight = document.getElementById("theme-badge-right");
    const logoTextSienna = document.getElementById("logo-text-sienna"); // O elemento que contém "Sienna"
    const logoTextTurismo = document.getElementById("logo-text-turismo"); // O elemento que contém "Turismo"

    // Se não for uma página que tem os elementos da logo, não faz nada.
    if (!themeBadgeLeft || !themeBadgeRight || !logoTextSienna || !logoTextTurismo) {
        console.log("DEBUG: Elementos da logo não encontrados. themes.js não será executado.");
        return;
    }

    const themeIconLeft = document.getElementById("theme-icon-left");
    const themeIconRight = document.getElementById("theme-icon-right");
    const themeTooltip = document.getElementById("theme-tooltip-text");

    if (!themeIconLeft || !themeIconRight || !themeTooltip) {
        return;
    }

    // =================================================================
    // 1. DEFINIÇÃO DOS EVENTOS SAZONAIS
    // =================================================================
    const eventos = [
        { mes: 0, dia: 1, classe: "tema-anonovo", icone: "images/icone-ano-novo.png", texto: "Feliz Ano Novo! A Sienna Turismo deseja um 2025 cheio de viagens incríveis! 🎉" },
        { mes: 3, dia: 19, classe: "tema-dia-do-indio", icone: "fa-solid fa-feather-pointed", texto: "A Sienna Turismo apoia e valoriza a cultura indígena brasileira. (Dia do Índio) 🪶" },
        { mes: 4, classe: "tema-mes-das-noivas", icone: "fa-solid fa-ring", texto: "A Sienna Turismo celebra o amor e os momentos especiais. (Mês das Noivas) 💍" },
        { mes: 8, classe: "tema-setembro-amarelo", icone: "images/icone-setembro-amarelo.png", texto: "A Sienna Turismo apoia a valorização da vida. (Setembro Amarelo) 💛" },
        { mes: 9, classe: "tema-outubro-rosa", icone: "images/icone-outubro-rosa.png", texto: "A Sienna Turismo apoia a prevenção ao câncer de mama. (Outubro Rosa) 🎗️" },
        { mes: 10, classe: "tema-novembro-azul", icone: "images/icone-novembro-azul-final.png", texto: "A Sienna Turismo apoia a saúde masculina. (Novembro Azul) 💙" },
        { mes: 10, dia: 20, classe: "tema-consciencia-negra", icone: "images/icone-consciencia-negra.png", texto: "A Sienna Turismo apoia a igualdade racial. (Dia da Consciência Negra) ✊" },
        { mes: 11, classe: "tema-natal", icone: "images/icone-natal.png", texto: "Boas Festas! A Sienna Turismo deseja um Natal mágico! 🎄" }
    ];

    const hoje = new Date();
    const mesAtual = hoje.getMonth();
    const diaAtual = hoje.getDate();

    let eventoDeHoje = eventos.find(evento => evento.mes === mesAtual && evento.dia === diaAtual);
    if (!eventoDeHoje) {
        eventoDeHoje = eventos.find(evento => evento.mes === mesAtual && !evento.dia);
    }

    // =================================================================
    // 2. ATIVAÇÃO DO TEMA E EFEITO ONDA
    // =================================================================
    if (eventoDeHoje) {
        // 2.1. Configura os ícones e o tooltip
        // Se o ícone for uma classe Font Awesome (fa-solid), usa className.
        // Se for um caminho de imagem, usa src.
        if (eventoDeHoje.icone.startsWith("fa-")) {
            themeIconLeft.className = eventoDeHoje.icone;
            themeIconRight.className = eventoDeHoje.icone;
            themeIconLeft.style.display = "inline-block";
            themeIconRight.style.display = "inline-block";
        } else {
            themeIconLeft.src = eventoDeHoje.icone;
            themeIconRight.src = eventoDeHoje.icone;
            themeIconLeft.style.display = "inline-block";
            themeIconRight.style.display = "inline-block";
        }
        themeTooltip.textContent = eventoDeHoje.texto;
        
        // 2.2. Efeito Mística (Transição de 7 segundos)
        setTimeout(() => {
            body.classList.add("tema-ativo");
            body.classList.add(eventoDeHoje.classe);

            // Ativa a visibilidade e a animação dos ícones
            themeBadgeLeft.classList.add("active");
            themeBadgeRight.classList.add("active");
            
            // 2.3. Aplica o Efeito Onda (Wave Effect)
            // O efeito onda deve ser aplicado a cada letra para ser "letra por letra".
            // O HTML atual usa dois spans: 'Sienna' e 'Turismo'.
            // Para o efeito letra por letra, precisamos de um span para cada letra.
            
            // Função para envolver cada letra em um span
            function wrapLetters(element) {
                const text = element.textContent;
                element.textContent = ''; // Limpa o conteúdo original
                text.split('').forEach((char, index) => {
                    const span = document.createElement('span');
                    span.textContent = char === ' ' ? '\u00A0' : char; // Mantém espaços
                    span.style.transitionDelay = `${index * 0.1}s`; // Atraso de 100ms por letra (mais lento)
                    span.classList.add('wave-letter'); // Classe para o CSS
                    element.appendChild(span);
                });
            }
            
            // Aplica a função aos dois elementos da logo
            wrapLetters(logoTextSienna);
            wrapLetters(logoTextTurismo);
            // O CSS fará o resto com os transition-delays.
            // A classe 'tema-ativo' no body é o gatilho para a mudança de cor.

            console.log(`🎨 Tema sazonal ativado: ${eventoDeHoje.classe}`);
        }, 7000); // 7 segundos

    } else {
        themeBadgeLeft.style.display = "none";
        themeBadgeRight.style.display = "none";
    }
});
