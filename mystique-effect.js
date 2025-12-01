const MystiqueEffect = {
    overlay: null,
    rows: 10,
    cols: 10,
    isAnimating: false,

    init: function () {
        // Create overlay if it doesn't exist
        if (!document.getElementById('mystique-overlay')) {
            this.overlay = document.createElement('div');
            this.overlay.id = 'mystique-overlay';
            document.body.appendChild(this.overlay);
            this.createGrid();

            // Re-create grid on resize to maintain scale size
            window.addEventListener('resize', () => {
                this.createGrid();
            });
        } else {
            this.overlay = document.getElementById('mystique-overlay');
        }
    },

    createGrid: function () {
        this.overlay.innerHTML = '';
        const width = window.innerWidth;
        const height = window.innerHeight;

        // Calculate number of scales based on screen size
        // We want scales to be roughly 50px
        const scaleSize = 50;
        this.cols = Math.ceil(width / scaleSize);
        this.rows = Math.ceil(height / (scaleSize * 0.85)); // Hexagon height ratio

        this.overlay.style.display = 'grid';
        this.overlay.style.gridTemplateColumns = `repeat(${this.cols}, 1fr)`;
        this.overlay.style.gridTemplateRows = `repeat(${this.rows}, 1fr)`;

        const totalScales = this.cols * this.rows;

        for (let i = 0; i < totalScales; i++) {
            const scale = document.createElement('div');
            scale.classList.add('mystique-scale');
            this.overlay.appendChild(scale);
        }
    },

    trigger: function (newThemeClass, callback) {
        if (this.isAnimating) return;
        this.isAnimating = true;

        const scales = Array.from(this.overlay.children);
        const totalScales = scales.length;

        // Shuffle scales for random ripple effect or use geometric order
        // Let's do a wave from top-left to bottom-right

        scales.forEach((scale, index) => {
            const row = Math.floor(index / this.cols);
            const col = index % this.cols;
            const delay = (row + col) * 20; // 20ms delay per step

            // 1. Appear
            setTimeout(() => {
                scale.style.opacity = '1';
                scale.style.transform = 'scale(1.1)';
            }, delay);

            // 2. Flip and Change Color (Midway)
            setTimeout(() => {
                scale.classList.add('flipping');
                // We need to know the new color. 
                // Since we can't easily get the variable before applying the class,
                // we'll rely on the callback to apply the class to the BODY, 
                // and the scales will inherit or we set a temp variable.
                // For this effect, we'll cheat slightly: 
                // The scales start with current color, flip to new color.
            }, delay + 200);
        });

        // Calculate total time
        const maxDelay = (this.rows + this.cols) * 20;
        const totalDuration = maxDelay + 400; // + animation time

        // 3. Apply Theme Change to Body (Mid-animation)
        setTimeout(() => {
            if (callback) callback();

            // Update scales to new color immediately after body change so they match when fading out
            // Actually, CSS variables will handle this if we set them right.
        }, maxDelay / 2);

        // 4. Fade Out
        setTimeout(() => {
            scales.forEach((scale, index) => {
                const row = Math.floor(index / this.cols);
                const col = index % this.cols;
                const delay = (row + col) * 20; // Reverse wave or same wave?

                setTimeout(() => {
                    scale.style.opacity = '0';
                    scale.style.transform = 'scale(0)';
                    scale.classList.remove('flipping');
                }, delay);
            });

            // Reset flag
            setTimeout(() => {
                this.isAnimating = false;
            }, maxDelay + 400);

        }, maxDelay + 500); // Wait for full appearance before fading out
    }
};
