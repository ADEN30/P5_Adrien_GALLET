const _Url = "http://localhost:3000/api/products";

let NbRegex = /^([1-9]|[1-9][0-9]|100)$/;
let nameRegex = /^([A-Z][a-z]+([ ]?[a-z]?['-]?[A-Z][a-z]+)*)$/;
let adressRegex = /^([1-9][0-9]*(?:-[1-9][0-9]*)*)[\s,-]+(?:(bis|ter|qua)[\s,-]+)?([\w]+[\-\w]*)[\s,]+([-\w].+)$/;
let cityRegex = /^[a-zA-Z\s]+$/;
let emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let address = document.getElementById("address");
let city = document.getElementById("city");
let email = document.getElementById("email");
let order = document.getElementById("order");

function Elements(element){ // création des blocs pour les cards dans le panier
    switch(element){
        case 1: {let section = document.getElementById("cart__items"); return section; break;}
        case 2 : {let article = document.createElement("article"); return article; break;}
        case 3 : {let div = document.createElement("div"); return div; break;}
        case 4 : {let image = document.createElement("img"); return image; break;}
        case 5 : {let h2 = document.createElement("h2"); return h2; break;}
        case 6 : {let p = document.createElement("p"); return p; break;}
        case 7 : {let input = document.createElement("input"); return input; break;}
    }

}


async function _GetHttp(lien){
    const requete = await fetch(lien);
    const _json = await requete.json();
    return _json;
} 
let data = await _GetHttp(_Url);

function TurnQuantite(cle){ // Avec une cle, elle retourne la quantite d'un élément du localeStorage sous le format d'un nombre
    let Produit = localStorage.getItem(cle);
    let objet = JSON.parse(Produit);
    return parseInt(objet.quantite);
    
}


let totalprix = 0; // total prix
let nb =0 ; // total article

function Total_priceArticle(donnee){
    totalprix = 0;
    nb = 0;
    if(donnee.length >0){
        for(let i = 0; i< localStorage.length; i++){ // On itère les éléments du localeStorage
            let key = localStorage.key([i]); 
            let objet = JSON.parse(localStorage.getItem(key));
            nb = nb + TurnQuantite(key);
            for (let ind1 = 0; ind1< donnee.length; ind1++){ // On itère  les produits retournés par l'API
                if(donnee[ind1]._id == objet.identifiant){ // Si l'id un produit du localeStorage et de l'API sont similaires alors on récupère la quantité du produit dans le localeStorage
                    totalprix = totalprix + donnee[ind1].price * TurnQuantite(key);
                }
            }
        }
    }
    document.getElementById("totalQuantity").innerText = nb;
    document.getElementById("totalPrice").innerText = totalprix;
}

function listenInput(button, id, couleur, valeur){ // Permet de calculer le ombre de total d'article et le montant total du panier

    button.addEventListener("change",function(){ // écoute les boutons pour ajouter des quantité
            
            let object = { // création d'un objet
                identifiant : id,
                quantite : button.value,
                color : couleur
            }
            
            let article = JSON.stringify(object);
            localStorage.setItem( id + object.color, article);
        
        if(NbRegex.test(button.value)){ // on test la valeur entrée par l'utilisateur
            button.style.boxShadow = "0px 0px 0px transparent";
            Total_priceArticle(valeur);
        }
        else{
            button.style.boxShadow = "0px 0px 0px 5px red";
            Total_priceArticle(0);
        }
        BtnEnvois(nameRegex.test(firstName.value),nameRegex.test(lastName.value), adressRegex.test(address.value), cityRegex.test(city.value), emailRegex.test(email.value));
    });
    Total_priceArticle(valeur);
}

function supprimer(element, valeur){ // Permet de gérer la suppression d'un article
        
    element.addEventListener("click", function(){ // écoute du bouton supprimer
        let element_delete = element.parentElement.parentElement.parentElement.parentElement;
        let element_delete_id = element_delete.getAttribute("data-id");
        let element_delete_color = element_delete.getAttribute("data-color");
        localStorage.removeItem(element_delete_id+element_delete_color);
        element_delete.remove();
        console.log(element_delete_id+element_delete_color);
        Total_priceArticle(valeur);
        BtnEnvois(nameRegex.test(firstName.value),nameRegex.test(lastName.value), adressRegex.test(address.value), cityRegex.test(city.value), emailRegex.test(email.value));
    });
}



function affichage(){ // Permet d'afficher tout les articles
    if(localStorage.length == 0){
        let article = document.querySelector("article");
        article.style.display = "none"
        Total_priceArticle(0);
    }
    for(let i = 0; i < localStorage.length; i++){ // récupère l'id et la couleur des produits dans le localStorage + création des cards
        let key = localStorage.key([i]);
        let objet = JSON.parse(localStorage.getItem(key));
        let ID = objet.identifiant;
        let color= objet.color;

        for(let ind4=0; ind4<data.length; ind4++){ // Récupère le prix des articles
            if(data[ind4]._id==ID){
                let prix = data[ind4].price;
                if(i==0){ // place le premier élément dans les blocs qui sont déjà créés
                    let cart = document.querySelector("#cart__items .cart__item");
                    cart.setAttribute("data-id", data[ind4]._id);
                    cart.setAttribute("data-color", color);
                    let canap = document.querySelector("#cart__items .cart__item .cart__item__img img");
                    canap.setAttribute("src", data[ind4].imageUrl);
                    canap.setAttribute("alt", data[ind4].altTxt);

                    let description = document.querySelector("#cart__items .cart__item__content .cart__item__content__description");
                    description.children[0].innerText = data[ind4].name;
                    description.children[1].innerText = color;
                    description.children[2].innerText = data[ind4].price;

                    let setting_quantity = document.querySelector("#cart__items .cart__item__content .cart__item__content__settings .cart__item__content__settings__quantity");
                    setting_quantity.children[1].value = TurnQuantite(key);

                    let setting_delete = document.querySelector("#cart__items .cart__item__content .cart__item__content__settings .cart__item__content__settings__delete .deleteItem");
                    supprimer(setting_delete, data);
                    listenInput(setting_quantity.children[1], ID, color, data);
                    }

                else{ // créer de nouvelles cards
                    let cart_item = Elements(1).appendChild( Elements(2));
                    cart_item.setAttribute("class","cart__item");
                    cart_item.setAttribute("data-id", data[ind4]._id);
                    cart_item.setAttribute("data-color", color);
                    
                    let cart_item_img = cart_item.appendChild(Elements(3));
                    cart_item_img.setAttribute("class", "cart__item__img");

                    let canap = cart_item_img.appendChild(Elements(4));
                    canap.setAttribute("src", data[ind4].imageUrl);
                    canap.setAttribute("alt", data[ind4].altTxt)

                    let cart_item_content = cart_item.appendChild(Elements(3));
                    cart_item_content.setAttribute("class", "cart__item__content");

                    let cart_item_content_description = cart_item_content.appendChild(Elements(3));
                    cart_item_content_description.setAttribute("class", "cart__item__content__description");
                    cart_item_content_description.appendChild(Elements(5)).innerText = data[ind4].name;
                    cart_item_content_description.appendChild(Elements(6)).innerText = color;
                    cart_item_content_description.appendChild(Elements(6)).innerText = data[ind4].price;

                    let cart_item_content_settings = cart_item_content.appendChild(Elements(3));
                    cart_item_content_settings.setAttribute("class","cart__item__content__settings");

                    let cart_item_content_settings_quantity = cart_item_content_settings.appendChild(Elements(3));
                    cart_item_content_settings_quantity.setAttribute("class", "cart__item__content__settings__quantity");
                    cart_item_content_settings_quantity.appendChild(Elements(6)).innerText = "Qté : ";

                    let itemQuantity = cart_item_content_settings_quantity.appendChild(Elements(7));
                    itemQuantity.setAttribute("type", "number");
                    itemQuantity.setAttribute("class", "itemQuantity");
                    itemQuantity.setAttribute("name", "itemQuantity");
                    itemQuantity.setAttribute("min", "1");
                    itemQuantity.setAttribute("max", "100");
                    itemQuantity.setAttribute("value", TurnQuantite(key));

                    let cart_item_content_settings_delete = cart_item_content_settings.appendChild(Elements(3));
                    cart_item_content_settings_delete.setAttribute("class", "cart__item__content__settings__delete ");

                    let deleteItem = cart_item_content_settings_delete.appendChild(Elements(6));
                    deleteItem.setAttribute("class", "deleteItem")
                    deleteItem.innerText = "Supprimer";
                    console.log(data[ind4]._id);
                    supprimer(deleteItem, data);
                    listenInput(itemQuantity, ID, color, data);
                     
                }

            }
            
        }
        
    }
     
}

function VerificationForm(){ // vérifiaction du formulaire à l'aide des regex

    firstName.addEventListener("input", function(){
        if(nameRegex.test(firstName.value)){ // vérifie la valeur entrée dans le champ
        firstName.style.boxShadow = "0px 0px 0px 3px green";
        document.getElementById("firstNameErrorMsg").style.display = "none";
        }
        else if(firstName.value == ""){
            document.getElementById("firstNameErrorMsg").style.display = "none";
            firstName.style.boxShadow = "0px 0px 0px 0px transparent";
        }
        else{
            document.getElementById("firstNameErrorMsg").style.display = "block";
            firstName.style.boxShadow = "0px 0px 0px 3px red";
            document.getElementById("firstNameErrorMsg").innerText = " Minimum : 2 lettres,  Exemple : Jean";
        }
        BtnEnvois(nameRegex.test(firstName.value),nameRegex.test(lastName.value), adressRegex.test(address.value), cityRegex.test(city.value), emailRegex.test(email.value))
        });
    lastName.addEventListener("input", function(){
        if(nameRegex.test(lastName.value)){
            document.getElementById("lastNameErrorMsg").style.display = "none";
        lastName.style.boxShadow = "0px 0px 0px 3px green";
        }
        else if(lastName.value == ""){
            document.getElementById("lastNameErrorMsg").style.display = "none";
            lastName.style.boxShadow = "0px 0px 0px 0px transparent";
        }
        else{
            document.getElementById("lastNameErrorMsg").style.display = "block";
            lastName.style.boxShadow = "0px 0px 0px 3px red";
            document.getElementById("lastNameErrorMsg").innerText = "Minimum : 2 lettres, Exemple : Bodin";
        }
        BtnEnvois(nameRegex.test(firstName.value),nameRegex.test(lastName.value), adressRegex.test(address.value), cityRegex.test(city.value), emailRegex.test(email.value))
        });
    address.addEventListener("input", function(){
        if(adressRegex.test(address.value)){
            document.getElementById("addressErrorMsg").style.display = "none";
        address.style.boxShadow = "0px 0px 0px 3px green";
        }
        else if(address.value == ""){
            document.getElementById("addressErrorMsg").style.display = "none";
            address.style.boxShadow = "0px 0px 0px 0px transparent";
        }
        else{
            document.getElementById("addressErrorMsg").style.display = "block";
            address.style.boxShadow = "0px 0px 0px 3px red";
            document.getElementById("addressErrorMsg").innerText = "Format adresse : 13 rue/route nom de la rue";
        }
        BtnEnvois(nameRegex.test(firstName.value),nameRegex.test(lastName.value), adressRegex.test(address.value), cityRegex.test(city.value), emailRegex.test(email.value))
        });
    city.addEventListener("input", function(){
        if(cityRegex.test(city.value)){
            document.getElementById("cityErrorMsg").style.display = "none";
        city.style.boxShadow = "0px 0px 0px 3px green";
        }
        else if(city.value == ""){
            document.getElementById("cityErrorMsg").style.display = "none";
            city.style.boxShadow = "0px 0px 0px 0px transparent";
        }
        else{
            city.style.boxShadow = "0px 0px 0px 3px red";
            document.getElementById("cityErrorMsg").style.display = "block";
            document.getElementById("cityErrorMsg").innerText = "Nombre et caractères spéciaux sont interdits.";
        }
        BtnEnvois(nameRegex.test(firstName.value),nameRegex.test(lastName.value), adressRegex.test(address.value), cityRegex.test(city.value), emailRegex.test(email.value))
        });
    email.addEventListener("input", function(){
        if(emailRegex.test(email.value)){
            document.getElementById("emailErrorMsg").style.display = "none";
            email.style.boxShadow = "0px 0px 0px 3px green";
        }
        else if(email.value == ""){
            email.style.boxShadow = "0px 0px 0px 0px transparent";
            document.getElementById("emailErrorMsg").style.display = "none";
        }
        else{
            email.style.boxShadow = "0px 0px 0px 3px red";
            document.getElementById("emailErrorMsg").style.display = "block";
            document.getElementById("emailErrorMsg").innerText = "Ecrire une adresse mail valide.";
        }
        BtnEnvois(nameRegex.test(firstName.value),nameRegex.test(lastName.value), adressRegex.test(address.value), cityRegex.test(city.value), emailRegex.test(email.value))
    });

    BtnEnvois(nameRegex.test(firstName.value),nameRegex.test(lastName.value), adressRegex.test(address.value), cityRegex.test(city.value), emailRegex.test(email.value));
    
}

 function BtnEnvois(prenom, nom, adresse, ville, email){ // Affichage du bouton envoyer
    let order = document.getElementById("order");
    if(prenom && nom && adresse && ville && email && nb != 0){ // vérififcation des conditions nécessaire pour l'envois du formulaire
        order.style.display = "block";
        order.addEventListener("click", function(e){
            e.preventDefault();
            sendForm();
            console.log("Tout est bon");
        });
        
    }
    else{
        order.style.display = "none";
        console.log("un problème a lieu dans le formulaire ou dans la quantite total des produit = 0");
    }

}
function get_Panier_ID(){ // On ajoute les id des produits présent dans le panier, dans un tableau et on retourne ce tableau
    let ID = [];
    for(let i = 0; i<localStorage.length; i++){
        let key = localStorage.key([i]);
        let article_json = localStorage.getItem(key);
        let article_objet = JSON.parse(article_json);
        for(let i1 = 0; i1< data.length; i1++){
            if(article_objet.identifiant == data[i1]._id){
                ID.push(article_objet.identifiant);
                console.log(article_objet.identifiant);
            }
        }
    }
    return ID;
}
function userData(){ // créé l'objet client avec ses données
    let client = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    email: document.getElementById("email").value,
}
return client;
}  
     
  function sendForm(){ // Envois le formulaire à l'API 
     console.log(JSON.stringify({contact : userData(), products : get_Panier_ID(data)}));
    
    fetch(_Url + "/order", {
        method : "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }, 
        body : JSON.stringify(
            { contact: userData(),
             products: get_Panier_ID()}
            )
    })
    .then(function(reponse){
        if(reponse.ok){
        return reponse.json();
        }
        
    })
    .then(function(donnee){
        location.assign("./confirmation.html?id="+donnee.orderId);
        console.log("Succès : "+donnee.orderId);
    })
    .catch(()=> console.log("échec"));
}

async function main(){ // appel des fonctions 
    affichage();
    VerificationForm();
}

main();