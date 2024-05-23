const gallery = document.querySelector(".gallery")
const categoriesContainer = document.querySelector(".categories")

let allWorks =[]// initialisation du tableau

const getWorks = async () => {
    try{//ouvre un bloc try qui permet de gérer une exception
        const response = await fetch('http://localhost:5678/api/works') //envoyer une requête pour récupérer les données de l'API
        const works = await response.json();
        console.log("Tous les works sont",works);
        allWorks = works;
        for(let work of allWorks){
            const figure = createWorkFigure(work);
            gallery.appendChild(figure);
        }
    }catch(error){//Si une erreur se produit, elle est enregistrée dans la console
        console.log('Erreur lors de la récupération des données :', error);  
    }
}
getWorks()

const createWorkFigure = (work) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    img.src = work.imageUrl;
    img.alt = work.title;
    figure.appendChild(img);
    const figcaption = document.createElement("figcaption");
    figcaption.textContent = work.title;
    figure.appendChild(figcaption);
    return figure;
}
// Accent grave : `
// On récupère toutes les categories de l'API
const API = 'http://localhost:5678/api/categories'
const getCategories = async () => {
    try {
        const result = await fetch(`${API}`);
        const data =await result.json();
        data.unshift({//ajout de la categorie "Tous"
            id:0,
            name:"Tous"
        })
        console.log(data);
        for(let category of data){
            const button = document.createElement("button");
            button.innerHTML = category.name;
            button.setAttribute("categoryId",category.id);
            categoriesContainer.appendChild(button);
        }
       
    }catch (error) {
        console.error (error);
    }
};
getCategories()

const filterWorksByCategory = () => {
    
}