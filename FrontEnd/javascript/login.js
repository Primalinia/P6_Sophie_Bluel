const errorConnexion = document.createElement("div");
const loginForm = document.querySelector("form");
loginForm.appendChild(errorConnexion);





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





//* LOGIN //

const element = {
    password: document.querySelector("#password"),
    email: document.querySelector("#email"),
    submit: document.querySelector("#submitUserInfo"),
};
element.submit.addEventListener("click", (a) => {
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
                errorConnexion.innerHTML = "Erreur dans l\'identifiant ou le mot de passe";
                errorConnexion.style.visibility = "visible";
                errorConnexion.style.backgroundColor = "rgba(200, 0, 0, 0.5)";
                errorConnexion.style.marginTop = "20px";
                setTimeout(() => {
                    errorConnexion.style.visibility = "hidden"
                },3000)
            } else {
                sessionStorage.setItem("isConnected", JSON.stringify(true));
                window.location.replace("index.html");
            }
        })
});
