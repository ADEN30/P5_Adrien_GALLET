let parametre = window.location.search;
let id = "";
for(let i = 4; i< parametre.length; i++){
    id = id + parametre[i];
}
localStorage.clear();
document.getElementById("orderId").innerText = id;

