let parametre = new URLSearchParams(window.location.search);
let Ncommande = parametre.get("id");
localStorage.clear();
document.getElementById("orderId").innerText = Ncommande;

