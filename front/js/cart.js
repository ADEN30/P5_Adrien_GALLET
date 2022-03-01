const _Url = "http://localhost:3000/api/products";
let items = [];
for (let i = 0; i<items.length; i++){
    console.log(items[i]);
}

let article = document.querySelector("#cart__items article");
let image = document.querySelector("#cart__items .cart__item .cart__item__img img");
async function _GetHttp(lien){
    const requete = await fetch(lien);
    const _json = await requete.json();
    return _json;
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
        console.log(ID);
        for(let ind3 = 32; ind3 < key.length; ind3++){
            color = color+ key[ind3];
        }
        console.log(color);
        for(let ind4=0; ind4 < data.length; ind4++){
            if(data[ind4]._id == ID){
                console.log(i);
                if(i=0){
                    image.setAttribute("src", data[ind4].imageUrl);
                }
                
            }
        }
    }
    
    
    
}

async function main(){
    await affichage();
}

main();