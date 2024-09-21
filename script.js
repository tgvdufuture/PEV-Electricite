const burgerMenu = document.querySelector('.burger-menu');
        const body = document.body;

        burgerMenu.addEventListener('click', () => {
            body.classList.toggle('menu-open');
        });
        const scrollTopBtn = document.getElementById("scrollTopBtn");

        window.onscroll = function() {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                scrollTopBtn.classList.add("show");
            } else {
                scrollTopBtn.classList.remove("show");
            }
        };

        scrollTopBtn.onclick = function() {
            scrollToTop(1000); // 1000ms = 1 seconde pour l'animation
        };

        function scrollToTop(duration) {
            const start = window.pageYOffset;
            const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

            function scroll() {
                const now = 'now' in window.performance ? performance.now() : new Date().getTime();
                const time = Math.min(1, ((now - startTime) / duration));
                
                window.scrollTo(0, Math.ceil((1 - time) * start));
                
                if (time < 1) {
                    requestAnimationFrame(scroll);
                }
            }

            requestAnimationFrame(scroll);
        }