//LOGIN ADMINISTRATOR//

const loginStatus = document.getElementById("login") // obtient une référence de l'élément de la page ayant l'identifiant "login"
const logoutStatus = document.getElementById("logout")
const adminStatus = document.getElementById("admin-logged")
const figureModify = document.getElementById("figure-modify")
const description = document.getElementById("figure-modify-a")
const portfolioModify = document.getElementById("portfolio-l-modify")
const filtreModify = document.querySelector('.filtre')

//*FOOTER
// Sélection des éléments de pied de page
var footer = document.querySelector('footer');
var listItem = footer.querySelector('ul li');
// Définition `font-size` 
listItem.style.fontSize = '14px';

//* SELECTION DES LIENS DU HEADER  (MODIFICATION ESPACE ET FONT) //
const links = document.querySelectorAll("header ul a");
links.forEach(link => {
    link.setAttribute("style", "margin-right: 44px; font-size: 16px; text-decoration: none;");
});

const elements = document.querySelectorAll('.connexionForm, .submitBtn');
elements.forEach(el => el.setAttribute("style", "font-size: 14px;"));

//* CONNEXION //
const connexionSection = document.getElementById("connexion");
connexionSection.setAttribute("style", "display: flex; flex-direction: column; align-items: center; margin: 0 auto;");

const userInfo = {
    email: document.getElementById("email"),
    password: document.getElementById("password"),
    connexion: document.getElementById("submitUserInfo")
};
Object.values(userInfo).forEach(element => {
    element.setAttribute("style", "display: flex; flex-direction: column; align-items: flex-start;");
});


//* AFICHAGE DES ELEMENTS ADMINISTRATEUR //
if (JSON.parse(sessionStorage.getItem("isConnected"))) {//Cette condition vérifie si l'utilisateur est connecté
    loginStatus.style.display = 'none'
    logoutStatus.style.display = 'block'
    adminStatus.style.display = 'flex'
    figureModify.style.display = 'flex'
    portfolioModify.style.display = 'flex'
    filtreModify.style.display = 'none'
    description.style.display = 'flex' 
} else {
    loginStatus.style.display = 'block'
    logoutStatus.style.display = 'none'
    adminStatus.style.display = 'none'
    figureModify.style.display = 'none'
    portfolioModify.style.display = 'none'
    filtreModify.style.display = 'flex'
    description.style.display = 'none'
}

//*REINITIALISE L'ETAT DE CONNEXION DE L'UTILISATEUR//
logoutStatus.addEventListener("click", (event) => {//écouteur d'événements au bouton de déconnexion
    event.preventDefault();//empêche le comportement par défaut de l'événement
    sessionStorage.removeItem("Token");
    sessionStorage.removeItem("isConnected");
    window.location.replace("index.html");// redirection vers la page "index.html"
});

//* LOGIN //

const element = {
    password: document.querySelector("#password"),
    email: document.querySelector("#email"),
    submit: document.querySelector("#submitUserInfo"),
};
let boutonLogin = element.submit.addEventListener("click", (a) => {
    a.preventDefault();

    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: element.email.value,
            password: element.password.value,
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            sessionStorage.setItem("Token", data.token);

            if (data.message || data.error) {
                alert("Erreur dans l\'identifiant ou le mot de passe");
            } else {
                sessionStorage.setItem("isConnected", JSON.stringify(true));
                window.location.replace("index.html");
            }
        })
});
