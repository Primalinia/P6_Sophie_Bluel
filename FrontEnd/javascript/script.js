const gallery = document.querySelector(".gallery")
const categoriesContainer = document.querySelector(".categories")
const log = document.querySelector(".loginDisplay")
const modifier = document.querySelector(".modifier")
let allWorks = []// initialisation du tableau
let allCategories = [];

//MODE Edition////
// Sélectionne le header HTML
const header = document.querySelector("header");

// Permet de masquer dynamiquement le "Mode édition"
function adjustHeaderMargin() {
    // Si la variable isConnect est définie à false (l'utilisateur n'est pas connecté), on applique un display:none sur le header
    if (!isConnect) {
        header.style.display = "none";
        return;
    }
    // Sinon, on applique un style spécifique au header
    header.style.margin = "97px 0 0 0";
    console.log( adjustHeaderMargin);
}

// Crée la div "mode Edition"
const modeEdition = document.createElement("div");

// Défini l'ID et le style de la div
modeEdition.setAttribute("id", "modeEdition");
modeEdition.style.display = "none";
modeEdition.style.flexDirection = "row-reverse";
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

// Ajoute du texte à la div
const modeEditionText = document.createElement("span");
modeEditionText.textContent = "Mode édition";
modeEditionText.style.display = "flex";
modeEditionText.style.alignItems = "center";
modeEditionText.style.width = "129px";
modeEditionText.style.height = "19px";
modeEditionText.style.justifyContent = "center";
modeEdition.appendChild(modeEditionText);

// Crée l'icône "modifier"
const modifierIcon = document.createElement("img");
modifierIcon.src = "./assets/icons/modifier.svg";
modifierIcon.alt = "modifier";
modifierIcon.style.display = "flex";
modifierIcon.style.color = "white";
modeEdition.appendChild(modifierIcon);

// Ajoute la div à la page web
document.body.appendChild(modeEdition);

// Déterminera si l'utilisateur est connecté ou pas
const isConnect = true;

// Appelle la fonction pour ajuster le margin en fonction de l'état de connexion
adjustHeaderMargin();
console.log(isConnect ? "Utilisateur connecté" : "Utilisateur non connecté");

// Sélectionne l'élément ayant la classe CSS ".modifier"
const modifierSpan = document.querySelector(".modifier");

// Ajoute un écouteur d'événement pour détecter les clics sur l'élément
modifierSpan.addEventListener("click", () => {
    modeEdition.style.display = "flex";
});



// fonction asynchrone qui récupère les données de l'API via la méthode HTTP GET
const getWorks = async () => {
    try {//ouvre un bloc try qui permet de gérer une exception
        const response = await fetch('http://localhost:5678/api/works') //envoyer une requête pour récupérer les données de l'API
        const works = await response.json();
        console.log("Tous les works sont", works);
        allWorks = works;
        for (let work of allWorks) {
            const figure = createWorkFigure(work);
            gallery.appendChild(figure);
        }
    } catch (error) {//Si une erreur se produit, elle est enregistrée dans la console
        console.log('Erreur lors de la récupération des données :', error);
    }
}
getWorks()

// Je créer une représentation visuelle pour chaque travail (work) dans la galerie
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
        const data = await result.json();
        data.unshift({  //ajout de la categorie "Tous"
            id: 0,
            name: "Tous"
        })
        console.log(data);
        allCategories = data;
        console.log("La liste des categories est", allCategories);
        for (let category of data) {
            const button = document.createElement("button");
            button.innerHTML = category.name;
            button.setAttribute("categoryId", category.id);
            categoriesContainer.appendChild(button);
        }

    } catch (error) {
        console.error(error);
    }
};
getCategories()

// Afficher dans la galerie les travaux en fonction de la catégorie sélectionnée
const filterWorksByCategory = (categoryId) => {
    gallery.innerHTML = "";// on vide la gallerie pour commencer
    if (categoryId === 0) {
        //si la categorie selectionnée est "Tous", on affiche tous les travaux
        for (let work of allWorks) {
            const figure = createWorkFigure(work);
            gallery.appendChild(figure);
        }
    } else {
        const filteredWorks = allWorks.filter((work) => work.categoryId === categoryId);
        for (let work of filteredWorks) {
            const figure = createWorkFigure(work);
            gallery.appendChild(figure);
        }
    }
}
console.log(filterWorksByCategory);

categoriesContainer.addEventListener("click", (event) => {
    const buttons = document.querySelectorAll(".categories button");
    if (event.target.getAttribute("categoryId")) {
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

// Vérifie si une connexion existe, esi oui, affichera LOGOUT 
const token = sessionStorage.getItem("Token");
console.log("Le Token récupéré est", token);
let isConnected = true;

if (token) {
    isConnected = true;
}

if (isConnected) {
    log.innerHTML = "logout";
}
