const kanap = fetch("http://localhost:3000/api/products")
    .then(function(res){
        if(res.ok){
            return res.json();
        }
    })
    .then(function (data){
        Print(data);
    })
    .catch(function(){
        console.log("error");
        
    });
    function Id(){
    let id = document.querySelector("#items a").getAttribute("href");
    console.log(id);
    return id;
}
async function Print (items){
    
            
    for(let i = 0; i<items.length; i++){
        if(i==0){
            document.getElementById("productName").innerText = items[0].name;
            document.getElementById("productDescription").innerText = items[0].description;
            document.querySelector("#items a article img").setAttribute("src", items[0].imageUrl);
            document.querySelector("#items a").setAttribute("href", "./product.html?id=" +items[0]._id);
        }
        else{
            let p = document.createElement("p");
            let article = document.createElement("article");
            let h3 = document.createElement("h3");
            let a = document.createElement("a");
            let image = document.createElement("img");
            document.getElementById("items").appendChild(a);
            a.setAttribute("href","./product.html?id=" + items[i]._id);
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


   



