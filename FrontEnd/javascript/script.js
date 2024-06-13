const gallery = document.querySelector(".gallery")
const categoriesContainer = document.querySelector(".categories")
const log = document.querySelector(".loginDisplay")
const modifier = document.querySelector(".modifier")
let allWorks =[]// initialisation du tableau


/// Vérifier l'état de connexion


 // Sélectionner le header HTML
const header = document.querySelector("header");

 // Définir la fonction pour ajuster le margin-bottom en fonction de l'état de connexion
function adjustHeaderMargin() {
   //Si la variable isConnect est définie à false (l'utilisateur n'est pas connecté), on applique un display:none sur le header
    if (!isConnect) {
        header.style.display = "none";
        return;
}
// Sinon on applique un style spécifique au header
    header.style.marginBottom = "97px";
    console.log("Margin de l'entête modifié");
}

// Créer la div "mode Edition"
const modeEdition = document.createElement("div");

// Définir l'ID et le style de la div
modeEdition.setAttribute("id", "modeEdition");
modeEdition.style.display = "none";
modeEdition.style.height = "59px";
modeEdition.style.justifyContent = "center";
modeEdition.style.alignItems = "center";
modeEdition.style.backgroundColor = "black";
modeEdition.style.color = "white";
modeEdition.style.width = "100%";
modeEdition.style.position = "fixed";
modeEdition.style.top = "0px";
modeEdition.style.left = "0px";
modeEdition.style.zIndex = "999";

 // Ajouter du texte à la div
const modeEditionText = document.createElement("span");
modeEditionText.textContent = "Mode édition";
modeEditionText.style.display = "flex";
modeEditionText.style.alignItems = "center";
modeEditionText.style.width = "129px";
modeEditionText.style.height = "19px";
modeEditionText.style.justifyContent = "center";
modeEdition.appendChild(modeEditionText);

// Créer l'icône "modifier"
const modifierIcon = document.createElement("img");
modifierIcon.src = "./assets/icons/modifier.svg";
modifierIcon.alt = "modifier";
modifierIcon.style.display = "none";
modifierIcon.style.color = "white";
modeEdition.appendChild(modifierIcon);

 // Ajouter la div à la page web
document.body.appendChild(modeEdition);

 // Défini la variable qui déterminera si l'utilisateur est connecté ou non
const isConnect = true;

 // Appeler la fonction pour ajuster le margin-bottom en fonction de l'état de connexion
adjustHeaderMargin();
console.log(isConnect ? "Utilisateur connecté" : "Utilisateur non connecté");



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
        data.unshift({  //ajout de la categorie "Tous"
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

const filterWorksByCategory = (categoryId) => {
    gallery.innerHTML = "";// on vide la gallerie pour commencer
    if (categoryId === 0){
        //si la categorie selectionnée est "tous", on affiche tous les travaux
        for (let work of allWorks){
            const figure = createWorkFigure(work);
            gallery.appendChild(figure);
        }
    }else {
        const filteredWorks = allWorks.filter((work) => work.categoryId === categoryId);
        for(let work of filteredWorks){
            const figure = createWorkFigure(work);
            gallery.appendChild(figure);
        }
    }
}

categoriesContainer.addEventListener("click",(event) => {
    const buttons = document.querySelectorAll(".categories button");
    if (event.target.getAttribute("categoryId")){
    //supprime la classe active filter de tous les boutons
        buttons.forEach((button) => {
            button.classList.remove("active-filter");

        })
        const categoryId = parseInt(event.target.getAttribute("categoryId"));
        //on ajoute la classe filter-active au boutton cliqué
        event.target.classList.add("active-filter");
        filterWorksByCategory(categoryId);
    }
})

const token = sessionStorage.getItem("Token");
console.log("Le Token récupéré est",token);
let isConnected = false;

if(token){
    isConnected = true;
}

if(isConnected){
    log.innerHTML = "logout";
}