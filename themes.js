document.addEventListener("DOMContentLoaded", function () {
    const body = document.body;
    const themeBadgeLeft = document.getElementById("theme-badge-left");
    const themeBadgeRight = document.getElementById("theme-badge-right");
    const logoTextSienna = document.getElementById("logo-text-sienna");
    const logoTextTurismo = document.getElementById("logo-text-turismo");

    if (!themeBadgeLeft || !themeBadgeRight || !logoTextSienna || !logoTextTurismo) {
        return;
    }

    const themeIconLeft = document.getElementById("theme-icon-left");
    const themeIconRight = document.getElementById("theme-icon-right");
    const themeTooltip = document.getElementById("theme-tooltip-text");

    if (!themeIconLeft || !themeIconRight || !themeTooltip) {
        return;
    }

    // Initialize Mystique Effect
    if (typeof MystiqueEffect !== 'undefined') {
        MystiqueEffect.init();
    }

    // =================================================================
    // 1. DEFINIÇÃO DOS EVENTOS SAZONAIS (COMPLETO)
    // =================================================================
    const eventos = [
        // JANEIRO
        { mes: 0, dia: 1, classe: "tema-anonovo", imagem: "images/icone-ano-novo.png", color: "#FFD700", decoration: "fa-solid fa-star", texto: "Feliz Ano Novo! A Sienna Turismo deseja um 2025 cheio de viagens incríveis! 🎉" },

        // FEVEREIRO / MARÇO (Carnaval)
        { mes: 1, classe: "tema-carnaval", imagem: "", color: "#FF4500", decoration: "fa-solid fa-mask", texto: "Alegria e Folia! Aproveite o Carnaval com a Sienna Turismo! 🎭" },

        // MARÇO
        { mes: 2, dia: 8, classe: "tema-dia-mulher", imagem: "", color: "#FF69B4", decoration: "fa-solid fa-crown", texto: "Parabéns a todas as mulheres! (Dia Internacional da Mulher) 🌹" },
        { mes: 2, classe: "tema-pascoa", imagem: "", color: "#9370DB", decoration: "fa-solid fa-carrot", texto: "Feliz Páscoa! Tempo de renovação e viagens em família. 🐰" },

        // ABRIL
        { mes: 3, dia: 19, classe: "tema-dia-do-indio", imagem: "images/icon-theme-indigenous.png", color: "#8B4513", decoration: "fa-solid fa-feather-pointed", texto: "A Sienna Turismo apoia e valoriza a cultura indígena brasileira. (Dia do Índio) 🪶" },

        // MAIO
        { mes: 4, dia: 12, classe: "tema-dia-maes", imagem: "", color: "#FF1493", decoration: "fa-solid fa-heart", texto: "Mãe, você merece o mundo! (Dia das Mães) ❤️" },
        { mes: 4, classe: "tema-mes-das-noivas", imagem: "", color: "#F0F8FF", decoration: "fa-solid fa-gem", texto: "A Sienna Turismo celebra o amor e os momentos especiais. (Mês das Noivas) 💍" },

        // JUNHO
        { mes: 5, dia: 12, classe: "tema-namorados", imagem: "", color: "#DC143C", decoration: "fa-solid fa-heart", texto: "O amor está no ar! Viaje com seu amor. (Dia dos Namorados) 💘" },
        { mes: 5, classe: "tema-festa-junina", imagem: "", color: "#FFA500", decoration: "fa-solid fa-hat-cowboy", texto: "Pula a fogueira, iaiá! Viva as festas juninas! 🔥" },

        // JULHO
        { mes: 6, classe: "tema-ferias-inverno", imagem: "", color: "#00BFFF", decoration: "fa-solid fa-snowflake", texto: "Férias de Julho! O momento perfeito para curtir o frio ou fugir dele. ❄️" },

        // AGOSTO
        { mes: 7, dia: 11, classe: "tema-dia-pais", imagem: "", color: "#4682B4", decoration: "fa-solid fa-glasses", texto: "Pai, seu melhor presente é uma viagem! (Dia dos Pais) 👔" },

        // SETEMBRO
        { mes: 8, dia: 7, classe: "tema-independencia", imagem: "", color: "#009c3b", decoration: "fa-solid fa-flag", texto: "7 de Setembro! Viva a Independência do Brasil! 🇧🇷" },
        { mes: 8, classe: "tema-setembro-amarelo", imagem: "images/icone-setembro-amarelo.png", color: "#FFD700", decoration: "fa-solid fa-sun", texto: "A Sienna Turismo apoia a valorização da vida. (Setembro Amarelo) 💛" },

        // OUTUBRO
        { mes: 9, dia: 12, classe: "tema-dia-criancas", imagem: "", color: "#32CD32", decoration: "fa-solid fa-puzzle-piece", texto: "Ser criança é ser feliz! (Dia das Crianças) 🧸" },
        { mes: 9, dia: 31, classe: "tema-halloween", imagem: "", color: "#FF8C00", decoration: "fa-solid fa-hat-wizard", texto: "Gostosuras ou Travessuras? (Halloween) 🎃" },
        { mes: 9, classe: "tema-outubro-rosa", imagem: "images/icone-outubro-rosa.png", color: "#FF69B4", decoration: "fa-solid fa-ribbon", texto: "A Sienna Turismo apoia a prevenção ao câncer de mama. (Outubro Rosa) 🎗️" },

        // NOVEMBRO
        { mes: 10, dia: 20, classe: "tema-consciencia-negra", imagem: "images/icone-consciencia-negra.png", color: "#000000", decoration: "fa-solid fa-crown", texto: "A Sienna Turismo apoia a igualdade racial. (Dia da Consciência Negra) ✊" },
        { mes: 10, classe: "tema-novembro-azul", imagem: "images/icone-novembro-azul.png", color: "#1E90FF", decoration: "fa-solid fa-mars", texto: "A Sienna Turismo apoia a saúde masculina. (Novembro Azul) 💙" },

        // DEZEMBRO
        { mes: 11, classe: "tema-natal", imagem: "images/icone-natal.png", color: "#FF0000", decoration: "fa-solid fa-hat-santa", texto: "Boas Festas! A Sienna Turismo deseja um Natal mágico! 🎄" }
    ];

    const hoje = new Date();
    const mesAtual = hoje.getMonth();
    const diaAtual = hoje.getDate();

    // Prioridade para eventos de dia específico
    let eventoDeHoje = eventos.find(evento => evento.mes === mesAtual && evento.dia === diaAtual);

    // Se não houver evento de dia específico, procura evento do mês
    if (!eventoDeHoje) {
        eventoDeHoje = eventos.find(evento => evento.mes === mesAtual && !evento.dia);
    }

    // =================================================================
    // 2. ATIVAÇÃO DO TEMA E EFEITO MÍSTICA
    // =================================================================
    if (eventoDeHoje) {
        // Configura ícones e tooltip
        const setIcons = () => {
            if (eventoDeHoje.imagem) {
                themeIconLeft.src = eventoDeHoje.imagem;
                themeIconRight.src = eventoDeHoje.imagem;
                themeIconLeft.style.display = "inline-block";
                themeIconRight.style.display = "inline-block";
            } else {
                themeIconLeft.style.display = "none";
                themeIconRight.style.display = "none";
            }

            themeTooltip.textContent = eventoDeHoje.texto;
        };

        // Função para aplicar a decoração no "S"
        const applyDecoration = () => {
            if (!eventoDeHoje.decoration) return;

            const logoSienna = document.getElementById('logo-text-sienna');
            // O primeiro span dentro de logo-text-sienna é a letra "S" (após wrapLetters)
            const firstLetter = logoSienna.querySelector('span');

            if (firstLetter) {
                // Verifica se já tem decoração para não duplicar
                if (firstLetter.querySelector('.s-decoration')) return;

                const decoration = document.createElement('i');
                decoration.className = `${eventoDeHoje.decoration} s-decoration`;
                if (eventoDeHoje.color) {
                    decoration.style.color = eventoDeHoje.color;
                }

                firstLetter.style.position = 'relative';
                firstLetter.style.display = 'inline-block';
                firstLetter.appendChild(decoration);
            }
        };

        setIcons();

        // Função wrapper modificada para reinjetar a decoração
        const originalWrapLetters = wrapLetters;
        wrapLetters = function (element) {
            // Executa a lógica original de quebrar as letras
            const text = element.textContent;
            element.textContent = '';
            text.split('').forEach((char, index) => {
                const span = document.createElement('span');
                span.textContent = char === ' ' ? '\u00A0' : char;
                span.style.transitionDelay = `${index * 0.1}s`;
                span.classList.add('wave-letter');
                element.appendChild(span);
            });

            // Se for o logo Sienna, reaplica a decoração no S
            if (element.id === 'logo-text-sienna') {
                applyDecoration();
            }
        };

        // Inicializa animação de texto imediatamente
        wrapLetters(logoTextSienna);
        wrapLetters(logoTextTurismo);

        // Transição de Tema (Original - Sem Mystique)
        setTimeout(() => {
            body.classList.add("tema-ativo");
            body.classList.add(eventoDeHoje.classe);

            themeBadgeLeft.classList.add("active");
            themeBadgeRight.classList.add("active");

            // Re-executa animação das letras na troca de tema
            wrapLetters(logoTextSienna);
            wrapLetters(logoTextTurismo);

            console.log(`🎨 Tema ativado: ${eventoDeHoje.classe}`);
        }, 7000);

    } else {
        themeBadgeLeft.style.display = "none";
        themeBadgeRight.style.display = "none";
    }

    // Definição original da função (será sobrescrita acima se houver evento)
    function wrapLetters(element) {
        const text = element.textContent;
        element.textContent = '';
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.transitionDelay = `${index * 0.1}s`;
            span.classList.add('wave-letter');
            element.appendChild(span);
        });
    }
});
