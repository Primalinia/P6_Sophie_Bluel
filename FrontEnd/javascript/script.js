
let allWorks =[]// initialisation du tableau

const getWorks = () => {
    try{

    }catch(error)
}



//LOGIN ADMINISTRATOR//

const loginStatus = document.getElementById("login")
const logoutStatus = document.getElementById("logout")
const adminStatus = document.getElementById("admin-logged")
const figureModify = document.getElementById("figure-modify")
const description = document.getElementById("figure-modify-a")
const portfolioModify = document.getElementById("portfolio-l-modify")
const filtreModify = document.querySelector('.filtre')

//displays the administrator elements//

if (JSON.parse(sessionStorage.getItem("isConnected"))) {
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

//Reset user's connexion state//
logoutStatus.addEventListener("click", (event) => {
    event.preventDefault();
    sessionStorage.removeItem("Token");
    sessionStorage.removeItem("isConnected");
    window.location.replace("index.html");
});
