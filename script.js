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

            // Création du message formaté
            const formattedMessage = `${message}`;

            // Envoi de l'email via EmailJS
            emailjs.send("service_ox72fyx", "template_wjhq78i", {
                name: name,
                phone: phone,
                mail: email, // Assurez-vous que le champ est nommé "mail" dans votre modèle EmailJS
                message: formattedMessage
            })
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                alert('Message envoyé avec succès !');
            }, function(error) {
                console.log('FAILED...', error);
                alert('Échec de l\'envoi du message.');
            });
        });

        // Initialisation d'EmailJS avec la clé publique correcte
        (function(){
            emailjs.init("cRNrr9oBnRnO29dcR"); // Remplacez par votre nouvelle clé publique
        })();