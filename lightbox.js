
document.addEventListener('DOMContentLoaded', function () {
    // Cria o elemento do lightbox
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="close-lightbox">&times;</span>
            <img id="lightbox-img" src="" alt="Imagem Ampliada">
            <div id="lightbox-caption"></div>
        </div>
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.close-lightbox');

    // Seleciona todos os itens da galeria
    const galleryItems = document.querySelectorAll('.galeria-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', function () {
            const img = this.querySelector('img');
            const overlayTitle = this.querySelector('.galeria-item-overlay strong');
            const overlayDesc = this.querySelector('.galeria-item-overlay p');

            if (img) {
                lightboxImg.src = img.src;

                // Monta a legenda
                let captionText = '';
                if (overlayTitle) captionText += `<strong>${overlayTitle.textContent}</strong><br>`;
                if (overlayDesc) captionText += overlayDesc.textContent;

                lightboxCaption.innerHTML = captionText;

                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden'; // Impede rolagem do fundo
            }
        });
    });

    // Fechar lightbox
    closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Fechar ao clicar fora da imagem
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Fechar com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});
