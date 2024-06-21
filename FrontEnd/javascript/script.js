const gallery = document.querySelector(".gallery")
const categoriesContainer = document.querySelector(".categories")
const log = document.querySelector(".loginDisplay")
const modifier = document.querySelector(".modifier")
let allWorks = []// initialisation du tableau
let allCategories = [];

//----- MODE Edition------ //
const header = document.querySelector("header");

    // Masque dynamiquement le "Mode édition"
let isConnect = true;
const modif = document.querySelector("h3.modifier");
modifier.addEventListener("click", function () {
    if (isConnect) {
        isConnect = true;
        console.log("Mode édition : connecté");
    } else {
        isConnect = false;
    }
    adjustHeaderMargin();
});

function adjustHeaderMargin() {
    if (isConnect) {
        header.style.margin = "97px 0 0 0";
    } else {
        header.style.margin = "50px 0 0 0";
    }
}

// La Div "Mode édition" disparait 
const span1 = document.getElementById("modal-close");
const span2 = document.getElementById("modal-photo-close");
// Modal 1
span1.addEventListener("click", function () {
    modeEdition.style.display = "none";
    isConnect = false;    console.log("Mode édition Modal 1 : déconnecté");
    });
// Modal 2
span2.addEventListener("click", function () {
    modeEdition.style.display = "none";
    isConnect = false;    console.log("Mode édition Modal 2: déconnecté");
    });   
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

    // Ajout du texte à la div
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
document.body.appendChild(modeEdition);// Ajoute la div à la page web
adjustHeaderMargin();// Ajuste le margin en fonction de l'état de connexion
const modifierSpan = document.querySelector(".modifier");
modifierSpan.addEventListener("click", () => {
    modeEdition.style.display = "flex";
});



//&*   Je récupère les données de l'API via la méthode GET //
const getWorks = async () => {
    try {//ouvre un bloc try qui permet de gérer une exception
        const response = await fetch('http://localhost:5678/api/works') //envoyer une requête pour récupérer les données de l'API
        const works = await response.json();
        console.log("Tous les works sont:", works);
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

// Je créer une représentation visuelle pour chaque img (work) dans la galerie
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
//&* On récupère toutes les categories de l'API //
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
        console.log("La liste des categories est:", allCategories);
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

//&* FILTRE - Affichage des images en fonction de la catégorie sélectionnée
const filterWorksByCategory = (categoryId) => {
    gallery.innerHTML = "";// on vide la gallerie pour commencer
    if (categoryId === 0) {
        //si la categorie selectionnée est "Tous", on affiche tous les travaux
        for (let work of allWorks) {
            const figure = createWorkFigure(work);
            gallery.appendChild(figure);
        }
    } else {
        // Sinon, la fonction filtre uniquement les travaux qui correspondent à la catégorie sélectionnée
        const filteredWorks = allWorks.filter((work) => work.categoryId === categoryId);
        for (let work of filteredWorks) {
            const figure = createWorkFigure(work);
            gallery.appendChild(figure);
            console.log('Affiche les images par catégorie');
        }
    }
}

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


//&*   LOGIN <---> LOGOUT 
const token = sessionStorage.getItem("Token");
console.log("Le Token récupéré est", token);
let isConnected = false;

if (token) {
    isConnected = true;
}

if (isConnected) {
    log.innerHTML = "logout";
} else {
    log.innerHTML = "login";
}
console.log("Login :", isConnected);
