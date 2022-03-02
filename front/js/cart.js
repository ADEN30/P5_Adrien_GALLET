const _Url = "http://localhost:3000/api/products";

function Elements(element){
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
function TurnQuantite(cle){
    let Produit = localStorage.getItem(cle);
    let objet = JSON.parse(Produit);
    return parseInt(objet.quantite);
    
}



 function listenInput(button, id, couleur, valeur){
    let totalprix = 0;
    let nb =0;
    for(let i = 0; i< localStorage.length; i++){
        let key = localStorage.key([i]);
        let objet = JSON.parse(localStorage.getItem(key));
        nb = nb + TurnQuantite(key);
        for (let ind1 = 0; ind1< valeur.length; ind1++){
            if(valeur[ind1]._id == objet.identifiant){
                totalprix = totalprix + valeur[ind1].price * TurnQuantite(key);
            }
        }
        
        
    }

    document.getElementById("totalQuantity").innerText = nb;
    document.getElementById("totalPrice").innerText = totalprix;

    button.addEventListener("change",function(){
        nb = 0;
        totalprix = 0;
        let object = {
            identifiant : id,
            quantite : button.value,
            color : couleur
        };

        let article = JSON.stringify(object);
        localStorage.setItem( id + object.color, article);

        for(let i = 0; i< localStorage.length; i++){
            let key = localStorage.key([i]);
            let objet = JSON.parse(localStorage.getItem(key));
            nb = nb + TurnQuantite(key);
            for (let ind1 = 0; ind1< valeur.length; ind1++){
                if(valeur[ind1]._id == objet.identifiant){
                    totalprix = totalprix + valeur[ind1].price * TurnQuantite(key);
                }
            }
        }
        document.getElementById("totalQuantity").innerText = nb;
        document.getElementById("totalPrice").innerText = totalprix;
    });
    
}

async function supprimer(cle,couleur, element, valeur){
    element.addEventListener("click", function(e){
        localStorage.removeItem(cle+couleur);
        let element_delete = element.parentElement.parentElement.parentElement.parentElement;
        let element_delete_id = element_delete.getAttribute("data-id");
        let element_delete_color = element_delete.getAttribute("data-color");
        if(element_delete_id == cle && element_delete_color == couleur){
            element_delete.style.display = "none";
        }
        let nb =0;
        let totalprix = 0;
        for(let i = 0; i< localStorage.length; i++){
            let key = localStorage.key([i]);
            let objet = JSON.parse(localStorage.getItem(key));
            nb = nb + TurnQuantite(key);
            for (let ind1 = 0; ind1< valeur.length; ind1++){
                if(valeur[ind1]._id == objet.identifiant){
                    totalprix = totalprix + valeur[ind1].price * TurnQuantite(key);
                }
            }
        }
        document.getElementById("totalQuantity").innerText = nb;
        document.getElementById("totalPrice").innerText = totalprix;
    });
}



async function affichage(){
    let data = await _GetHttp(_Url);

    for(let i = 0; i < localStorage.length; i++){
        let key = localStorage.key([i]);
        let ID = "";
        let color= "";
        for(let ind2 = 0; ind2 < 32; ind2++){
           ID= ID+ key[ind2];
        }
        for(let ind3 = 32; ind3 < key.length; ind3++){
            color = color+ key[ind3];
        }

        for(let ind4=0; ind4<data.length; ind4++){
            if(data[ind4]._id==ID){
                let prix = data[ind4].price;
                if(i==0){
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
                    await supprimer(data[ind4]._id,color, setting_delete, data);
                    listenInput(setting_quantity.children[1], ID, color, data);
                    }

                else{
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
                    await supprimer(data[ind4]._id,color, deleteItem, data);
                    listenInput(itemQuantity, ID, color, data);
                     
                }
                
                
            }
            
        }
        
    } 
}

function VerifiactionForm(){
    
}

async function main(){
    setInterval(await affichage());
}

main();