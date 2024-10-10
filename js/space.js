// fetch function
let getNASAData = (URL) =>{
    return fetch(URL)
    .then(response =>{
        if (!response.ok){
            throw new Error(response.statusText); 
        }else{
            return response.json();
        }
    })
    .then(response => {
        // let searchItems = response.collection.items
        return response
    })
    .catch(error => console.log(error));
};


let createNASACards = (image,title,date_created,description) =>{
    document.getElementById('contenedor').innerHTML+=`
        <div class="card" style="width: 18rem;">
            <img src="${image}" class="card-img-top img-thumbnail image" alt="${title}">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${description}</p>
            </div>
            <div class="card-footer">
                <p class="card-text">Date: ${date_created}</p>
            </div>
        </div>
    `
}

document.addEventListener('DOMContentLoaded', () =>{
    document.getElementById('btnBuscar').addEventListener('click', ()=>{
        document.getElementById('contenedor').innerHTML='';

        let input = document.getElementById('inputBuscar').value;
        
        if(input){
            getNASAData(`https://images-api.nasa.gov/search?q=${input}`)
            .then(response => {
                let searchItems = response.collection.items
                searchItems.forEach(element => {
                    let {href, data:[{title,date_created,description}]} = element
                    let searchImage = ''
                    getNASAData(href)
                    .then(response => {
                        searchImage = response[0];
                        createNASACards(searchImage,title,date_created,description);
                    })
                    
                });
            })
            }else{
                document.getElementById('contenedor').innerHTML=`
                    <div class="alert alert-info" role="alert">
                        Debe ingresar algo :)
                    </div>
                `
            }
        }
        
    )  
})
     
