const kanap = fetch("http://localhost:3000/api/products")//appel GET de l'api
    .then(function(res){
        if(res.ok){
            return res.json();
        }
    })
    .then(function (data){
        Print(data);
        console.log("OK");
    })
    .catch(function(){
        console.log("error de l'appel de l'API");
        
    });

    
function Id(){
let id = document.querySelector("#items a").getAttribute("href");
console.log(id);
return id;
}

function Print (items){ //création des cards 
            
    for(let i = 0; i<items.length; i++){
        if(i==0){ // si c'est la première card alors on complète les blocs déjà créés.
            document.getElementById("productName").innerText = items[0].name;
            document.getElementById("productDescription").innerText = items[0].description;
            document.querySelector("#items a article img").setAttribute("src", items[0].imageUrl);
            document.querySelector("#items a").setAttribute("href", "./front/html/product.html?id=" +items[0]._id);
        }
        else{ // sinon on créé de nouveaux blocs
            let p = document.createElement("p");
            let article = document.createElement("article");
            let h3 = document.createElement("h3");
            let a = document.createElement("a");
            let image = document.createElement("img");
            document.getElementById("items").appendChild(a);
            a.setAttribute("href","./front/html/product.html?id=" + items[i]._id);
            image.setAttribute("src", items[i].imageUrl);
            h3.innerText = items[i].name;
            p.innerText = items[i].description;
            a.appendChild(article);
            article.appendChild(image);
            article.appendChild(h3);
            article.appendChild(p);
        }
        
    }
    


/*défilement des canapé sur une seul case*/
    /*  let i = 0;
        setInterval(function(){
        if (i == items.length){
            i =0;
        }
        document
            .querySelector("#items a")
            .setAttribute("href", "./product.html?id=" + items[i]._id);
             let valeur = document.querySelector("#items a").getAttribute("href");
        document
            .querySelector(".items  article  img")
            .setAttribute("src", items[i].imageUrl);
        setTimeout(function(){
            document
            .getElementById("productName")
            .innerHTML = items[i].name;
        document
            .getElementById("productDescription")
            .innerText = items[i].description;
            i++;
        }, 110);
    }, 2000); */       
}


   



