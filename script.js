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

        document.getElementById('contactForm').addEventListener('submit', function(event) {
            event.preventDefault(); // Empêche le rechargement de la page

            // Récupération des valeurs des champs
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Envoi de l'email
            emailjs.send("cRNrr9oBnRnO29dcR", "NCEKSGkJlS1HUDS2o7Att", {
                name: name,
                phone: phone,
                email: email,
                message: message
            })
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                alert('Message envoyé avec succès !');
            }, function(error) {
                console.log('FAILED...', error);
                alert('Échec de l\'envoi du message.');
            });
        });