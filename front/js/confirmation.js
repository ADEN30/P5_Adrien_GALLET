let parametre = window.location.search;
let id = "";
for(let i = 4; i< parametre.length; i++){
    id = id + parametre[i];
}
document.getElementById("orderId").innerText = id;

