const token = sessionStorage.getItem('token');

document.addEventListener('DOMContentLoaded', () => {
// Pour la soumission du formulaire
const loginOk = document.querySelector('#submit');
if (loginOk) {
loginOk.addEventListener('click', async (event) => {
  event.preventDefault(); // Empêche le rechargement de la page pour traiter toute la fonction 
  // Récupération des valeurs des champs email et mot de passe
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Envoi des données au serveur + Async pour attendre la réponse de la requête fetch 
  try {
    const response = await fetch('http://localhost:5678/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    });

    if (response.ok) {
      // Connexion réussie
      const data = await response.json();
      // Récupérer le token d'authentification
      const token = data.token;
      console.log(token); // Affiche la valeur du token dans la console
      // Stocker le token- sessionStorage pour déconnexion lors de la fermeture onglet/fenêtre
      sessionStorage.setItem('token', token);
      // Redirection vers la page d'accueil
      window.location.href = 'index.html';
      // Après l'authentification réussie, afficher le contenu d'édition
    }
    else {
      let errorMsg = document.getElementById('error-message'); // Si connexion n'est pas correcte alors message d'erreur 
      errorMsg.textContent = 'Erreur dans l’identifiant ou le mot de passe';
    }
  } catch (error) {
    console.error('Erreur dans l’identifiant ou le mot de passe', error);
  }
  
});
}
});
