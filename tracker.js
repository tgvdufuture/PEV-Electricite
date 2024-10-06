// tracker.js

console.log('Script tracker.js chargé');

// Enregistrer le moment où l'utilisateur arrive sur la page
const startTime = Date.now();

// Récupérer le nom de la page pour savoir où l'utilisateur est allé
const pageName = document.title;

console.log('Page visitée :', pageName);

// Récupérer ou initialiser les données utilisateur
let userData = JSON.parse(localStorage.getItem('userData')) || {
    totalTimeSpent: 0,
    pages: {}, // Regrouper les actions par page
    uniqueVisitors: {} // Nouveau champ pour enregistrer les visiteurs uniques
};

// Convertir les secondes en minutes
const convertSecondsToMinutes = (seconds) => Math.round(seconds / 60);

// Gérer les visiteurs uniques
const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD
userData.uniqueVisitors[today] = (userData.uniqueVisitors[today] || 0) + 1; // Incrémenter le compteur de visiteurs uniques

// Initialiser les données pour la page actuelle si elle n'existe pas déjà
if (!userData.pages[pageName]) {
    userData.pages[pageName] = {
        timeSpent: 0,
        clickCount: 0 // Nouveau champ pour compter les clics
    };
}

// Capturer les clics sur toute la page
document.addEventListener('click', () => {
    userData.pages[pageName].clickCount++; // Incrémenter le compteur de clics
    localStorage.setItem('userData', JSON.stringify(userData)); // Enregistrer dans le localStorage
});

// Quand l'utilisateur quitte la page, enregistrer le temps passé
window.addEventListener('beforeunload', () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000); // Temps en secondes
    console.log('Temps passé sur la page :', timeSpent);

    // Ajouter le temps passé à la page actuelle (converti en minutes)
    userData.pages[pageName].timeSpent += convertSecondsToMinutes(timeSpent);

    // Mettre à jour le temps total
    userData.totalTimeSpent += convertSecondsToMinutes(timeSpent);

    // Sauvegarder les données mises à jour dans le localStorage
    localStorage.setItem('userData', JSON.stringify(userData));

    // Mettre à jour le graphique des visiteurs uniques
    if (Object.keys(userData.uniqueVisitors).length > 0) {
        drawVisitorsChart(); // Appeler la fonction pour dessiner le graphique
    }
});
