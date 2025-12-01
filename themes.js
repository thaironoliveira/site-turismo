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
        { mes: 0, dia: 1, classe: "tema-anonovo", icone: "images/icon-theme-new-year.png", texto: "Feliz Ano Novo! A Sienna Turismo deseja um 2025 cheio de viagens incríveis! 🎉" },

        // FEVEREIRO / MARÇO (Carnaval - Data Móvel, fixado aqui para exemplo ou lógica complexa necessária)
        // Carnaval 2025 é em Março, mas vamos deixar um genérico para Fevereiro
        { mes: 1, classe: "tema-carnaval", icone: "images/icon-theme-carnival.png", texto: "Alegria e Folia! Aproveite o Carnaval com a Sienna Turismo! 🎭" },

        // MARÇO
        { mes: 2, dia: 8, classe: "tema-dia-mulher", icone: "images/icon-theme-womens-day.png", texto: "Parabéns a todas as mulheres! (Dia Internacional da Mulher) 🌹" },
        { mes: 2, classe: "tema-pascoa", icone: "images/icon-theme-easter.png", texto: "Feliz Páscoa! Tempo de renovação e viagens em família. 🐰" }, // Março/Abril

        // ABRIL
        { mes: 3, dia: 19, classe: "tema-dia-do-indio", icone: "images/icon-theme-indigenous.png", texto: "A Sienna Turismo apoia e valoriza a cultura indígena brasileira. (Dia do Índio) 🪶" },

        // MAIO
        { mes: 4, dia: 12, classe: "tema-dia-maes", icone: "images/icon-theme-mothers-day.png", texto: "Mãe, você merece o mundo! (Dia das Mães) ❤️" }, // Data móvel, aprox
        { mes: 4, classe: "tema-mes-das-noivas", icone: "fa-solid fa-ring", texto: "A Sienna Turismo celebra o amor e os momentos especiais. (Mês das Noivas) 💍" },

        // JUNHO
        { mes: 5, dia: 12, classe: "tema-namorados", icone: "images/icon-theme-valentines.png", texto: "O amor está no ar! Viaje com seu amor. (Dia dos Namorados) 💘" },
        { mes: 5, classe: "tema-festa-junina", icone: "images/icon-theme-festa-junina.png", texto: "Pula a fogueira, iaiá! Viva as festas juninas! 🔥" },

        // JULHO
        { mes: 6, classe: "tema-ferias-inverno", icone: "images/icon-theme-winter.png", texto: "Férias de Julho! O momento perfeito para curtir o frio ou fugir dele. ❄️" },

        // AGOSTO
        { mes: 7, dia: 11, classe: "tema-dia-pais", icone: "images/icon-theme-fathers-day.png", texto: "Pai, seu melhor presente é uma viagem! (Dia dos Pais) 👔" }, // Data móvel

        // SETEMBRO
        { mes: 8, dia: 7, classe: "tema-independencia", icone: "images/icon-theme-independence.png", texto: "7 de Setembro! Viva a Independência do Brasil! 🇧🇷" },
        { mes: 8, classe: "tema-setembro-amarelo", icone: "images/icon-theme-september.png", texto: "A Sienna Turismo apoia a valorização da vida. (Setembro Amarelo) 💛" },

        // OUTUBRO
        { mes: 9, dia: 12, classe: "tema-dia-criancas", icone: "images/icon-theme-childrens-day.png", texto: "Ser criança é ser feliz! (Dia das Crianças) 🧸" },
        { mes: 9, dia: 31, classe: "tema-halloween", icone: "images/icon-theme-halloween.png", texto: "Gostosuras ou Travessuras? (Halloween) 🎃" },
        { mes: 9, classe: "tema-outubro-rosa", icone: "images/icon-theme-october.png", texto: "A Sienna Turismo apoia a prevenção ao câncer de mama. (Outubro Rosa) 🎗️" },

        // NOVEMBRO
        { mes: 10, dia: 20, classe: "tema-consciencia-negra", icone: "images/icon-theme-black-consciousness.png", texto: "A Sienna Turismo apoia a igualdade racial. (Dia da Consciência Negra) ✊" },
        { mes: 10, classe: "tema-novembro-azul", icone: "images/icon-theme-november.png", texto: "A Sienna Turismo apoia a saúde masculina. (Novembro Azul) 💙" },

        // DEZEMBRO
        { mes: 11, classe: "tema-natal", icone: "images/icon-theme-christmas.png", texto: "Boas Festas! A Sienna Turismo deseja um Natal mágico! 🎄" }
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
        // Configura ícones e tooltip (inicialmente ocultos ou padrão)
        const setIcons = () => {
            if (eventoDeHoje.icone.startsWith("fa-")) {
                themeIconLeft.className = eventoDeHoje.icone;
                themeIconRight.className = eventoDeHoje.icone;
                themeIconLeft.removeAttribute('src');
                themeIconRight.removeAttribute('src');
            } else {
                themeIconLeft.className = '';
                themeIconRight.className = '';
                themeIconLeft.src = eventoDeHoje.icone;
                themeIconRight.src = eventoDeHoje.icone;
            }
            themeIconLeft.style.display = "inline-block";
            themeIconRight.style.display = "inline-block";
            themeTooltip.textContent = eventoDeHoje.texto;
        };

        setIcons();

        // Trigger Mystique Effect após 7 segundos
        setTimeout(() => {
            if (typeof MystiqueEffect !== 'undefined') {
                MystiqueEffect.trigger(eventoDeHoje.classe, () => {
                    // Callback executado no meio da animação (quando as escamas cobrem a tela)
                    body.classList.add("tema-ativo");
                    body.classList.add(eventoDeHoje.classe);

                    themeBadgeLeft.classList.add("active");
                    themeBadgeRight.classList.add("active");

                    wrapLetters(logoTextSienna);
                    wrapLetters(logoTextTurismo);

                    console.log(`🎨 Tema ativado com Efeito Mística: ${eventoDeHoje.classe}`);
                });
            } else {
                // Fallback se o script do efeito falhar
                body.classList.add("tema-ativo");
                body.classList.add(eventoDeHoje.classe);
                themeBadgeLeft.classList.add("active");
                themeBadgeRight.classList.add("active");
            }
        }, 7000);

    } else {
        themeBadgeLeft.style.display = "none";
        themeBadgeRight.style.display = "none";
    }

    function wrapLetters(element) {
        const text = element.textContent;
        element.textContent = '';
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.transitionDelay = `${index * 0.1}s`; // Mais rápido para acompanhar o efeito
            span.classList.add('wave-letter');
            element.appendChild(span);
        });
    }
});
