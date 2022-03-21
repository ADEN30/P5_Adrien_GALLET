let params = new URLSearchParams(window.location.search)
const id = params.get("id");
console.log(id);
const _Url = "http://localhost:3000/api/products";

let titre = document.querySelector("head title");
let sel = document.querySelector("select");
let button = document.querySelector("#quantity");
let addPanier = document.getElementById("addToCart");
let article = document.querySelector("article");
let div = document.createElement("div");
let validé = article.appendChild(div);

let couleur ="";
let NbRegex = /^([1-9]|[1-9][0-9]|100)$/;


sel.addEventListener("change", function(){ //écoute du bouton "choisir sa couleur"
    if(NbRegex.test(button.value) && sel.value != ""){ // vérification à l'aide des regex si les données sont dans les boutons sont corrects
        addPanier.style.display = "block";
        console.log("Ajout au pannier possible");
        validé.remove();
    }
    else{
        console.log("Ajout au pannier impossible");
        validé.remove();
        addPanier.style.display = "none";
    }
});
button.addEventListener("change", function(){ //écoute du bouton "nombre de produit"
    if(NbRegex.test(button.value) && sel.value != ""){
        addPanier.style.display = "block";
        validé.remove();
        console.log("Ajout au pannier possible");
    }
    else{
        console.log("Ajout au pannier impossible");
        validé.remove();
        addPanier.style.display = "none";
    }
    
});

async function _GetHttp(lien){ // requête GET sur l'API
    const requete = await fetch(lien);
    const _json = await requete.json();

    return _json;
}

async function AffichagePage(){ // Affiche le produit
    
    const data = await _GetHttp(_Url);
    for(let i = 0; i< data.length; i++){
        if(data[i]._id == id){ // on vérifie dans l'appel API l'id qui correspond à l'id placé dans l'URL puis on créer l'élément
            document.getElementById("image").setAttribute("src",data[i].imageUrl);
            document.getElementById("image").setAttribute("alt", data[i].altTxt);
            document.getElementById("title").innerText = data[i].name;
            titre.innerText = data[i].name;
            document.getElementById("price").innerText = data[i].price;
            document.getElementById("description").innerText = data[i].description;
            await getColors(i);
            console.log("trouvé");
        }
    }

}


function AddOption(){ // permet de créer de nouveau bloc "option" pour la couleur
    const option = document.createElement("option");
    const newElement = document.getElementById("colors").appendChild(option);
    return newElement;
}

async function getColors(i){ //récupère les couleurs sous form de tableau d'un produit et les place dans les options que l'on a créer
    const data = await _GetHttp(_Url);
    console.log(data[i].colors);
    const child = document.querySelector("#colors").childElementCount;
    
    document.querySelector("#colors").childElementCount;
    console.log(document.querySelector("#colors").children[2].value);
    for(let ind1 = 1; ind1 < 3; ind1++){ // on remplis les options qui sont déjà présent t"ne que le nombre de couleur
        document.getElementById("colors").children[ind1].setAttribute("value",data[i].colors[ind1-1]);
        document.getElementById("colors").children[ind1].innerText = data[i].colors[ind1-1];
       
    }
    if(data[i].colors.length >= 3){ // On regarde la taille du tableau de couleur est si il est >= 3 alors on créé de nouveau blocs option et on les remplis avec les couleurs suivante
        for (let ind2= child; ind2 <data[i].colors.length +1; ind2++ ){ // Permet de créer les nouveaux options de couleurs
        const element = AddOption();
        element.setAttribute("value",data[i].colors[ind2-1]);
        element.innerText = data[i].colors[ind2-1];
        }
    }
    
}
async function listenAndSend(){ // Pemet de gérer l'ajout au panier
    addPanier.style.display = "none";
    
        addPanier.addEventListener("click", function(e){ //  écoute du bouton création de l'objet à envoyer et sauvegarde dans le locale storage
            validé = article.appendChild(div);
            let object = {
                identifiant : id,
                quantite : button.value,
                color : sel.value
            };
            let valeur = localStorage.getItem((id + object.color));
            console.log(valeur);
            let PastObject = JSON.parse(valeur);
            
            if(valeur != null){
                for( item in localStorage){
                    if(item  == id + sel.value){
                        
                        object.quantite = parseInt(object.quantite) + parseInt(PastObject.quantite);
                        
                    }
                }
            }
            let articles = JSON.stringify(object);
            localStorage.setItem( id + object.color, articles);
            validé.innerText = "Ajouté au panier !";
            validé.style.fontWeight = "bold";
            validé.style.color = "green";
            validé.style.paddingTop = "20px";
            console.log("Le produit a été ajouté au panier")
        });
}


function main(){ // appel des principales fonctions
    
    AffichagePage();
    listenAndSend();
}
main();
