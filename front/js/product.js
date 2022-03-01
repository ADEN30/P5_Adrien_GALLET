let tab = window.location.search;
const id = tab.split("=");
const _Url = "http://localhost:3000/api/products";


console.log(tab);
console.log(id[1]);

async function _GetHttp(lien){
    const requete = await fetch(lien);
    const _json = await requete.json();
    return _json;
}

async function AffichagePage(){
    const data = await _GetHttp(_Url);
    for(let i = 0; i< data.length; i++){
        if(data[i]._id == id[1]){
            document.getElementById("image").setAttribute("src",data[i].imageUrl);
            document.getElementById("title").innerText = data[i].name;
            document.getElementById("price").innerText = data[i].price;
            document.getElementById("description").innerText = data[i].description;
            await getColors(i);
        }
    }

}


function AddOption(){
    const option = document.createElement("option");
    const newElement = document.getElementById("colors").appendChild(option);
    return newElement;
}
async function getColors(i){
    const data = await _GetHttp(_Url);
    console.log(data[i].colors);
    const child = document.querySelector("#colors").childElementCount;
    console.log(child);
    
    document.querySelector("#colors").childElementCount;
    console.log(document.querySelector("#colors").children[2].value);
    for(let ind1 = 1; ind1 < 3; ind1++){ 
        document.getElementById("colors").children[ind1].setAttribute("value",data[i].colors[ind1-1]);
        document.getElementById("colors").children[ind1].innerText = data[i].colors[ind1-1];
       
    }
    if(data[i].colors.length >= 3){
        for (let ind2= child; ind2 <data[i].colors.length +1; ind2++ ){
        const element = AddOption();
        element.setAttribute("value",data[i].colors[ind2-1]);
        element.innerText = data[i].colors[ind2-1];
        }
    }
    
}
async function listenSend(){
    document.getElementById("addToCart").addEventListener("click", function(e){
        
        
        let sel = document.querySelector("select");
        let button = document.querySelector("#quantity");
        let object = {
            identifiant : id[1],
            quantite : button.value,
            color : sel.value
        };

        let valeur = localStorage.getItem((id[1] + object.color));
        console.log(valeur);
        if(valeur != null){
            let PastObject = JSON.parse(valeur);
            console.log(PastObject.quantite);

            for( item in localStorage){
                if(item  == id[1] + sel.value){
                    object.quantite = parseInt(button.value) + parseInt(PastObject.quantite);
                }
            }
        }
        let article = JSON.stringify(object);
        localStorage.setItem( id[1] + object.color, article);
    });
}


async function main(){
    
    await AffichagePage();
    await listenSend();
}
main();