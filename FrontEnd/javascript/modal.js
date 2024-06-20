//MODAL//

const modal = document.querySelector('#modal');
const modalContent = document.querySelector('#modal-content');
const modalPhoto = document.querySelector('#modal-photo');
const modalClose = document.querySelector('#modal-close');
const showModal = () => (modal.style.display = 'block');
const hideModal = () => (modal.style.display = 'none');


modalClose.addEventListener('click', hideModal);

modal.addEventListener('click', hideModal);





//&* Affiche la Modale au click sur " modifier ""
modifier.addEventListener("click", showModal);

fetch('http://localhost:5678/api/works')
    .then((response) => response.json())
    .then((data) => {  // traitement des données
        data.forEach((work) => {
            const figure = createModalWorkFigure(work);
            imagesModalContainer.appendChild(figure);
        });
    });

//&*  Ajout des images modal 1 //
const imagesModalContainer = document.querySelector('.gallery-modal')

function createModalWorkFigure(work) {
    const figure = document.createElement('figure')
    const figureImage = document.createElement('img')
    const deleteIcon = document.createElement('i')

    console.log(`Image chargée avec l'URL source : ${work.imageUrl}`);

    figureImage.src = work.imageUrl
    figureImage.alt = work.title
    figure.setAttribute('data-id', work.id); // Ajoute un attribut data-id pour stocker l'ID de travail
    deleteIcon.className = "fa-regular fa-trash-can"

    figure.appendChild(figureImage)

    figure.appendChild(deleteIcon)


    
    // Ajoute une fonctionnalité de suppression d'événement lors du clic sur l'icône "supprimer"
    deleteIcon.addEventListener('click', (event) => {
        event.preventDefault();
        deleteWorkById(work.id);
    });

    return figure;
}

//!Supprimer les images//
function deleteWorkById(workId) {
    const token = sessionStorage.getItem("Token");
    const confirmation = confirm("Êtes-vous sûr de vouloir supprimer cette image ?");
    if (confirmation) {
        fetch(`http://localhost:5678/api/works/${workId}`, {
            method: 'DELETE',
            headers: {
                "Accept": 'application/json',
                "Authorization": `Bearer ${token}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new error('La supression de l\'image à echoué.');
                }
                const modalWorkToRemove = document.querySelector(`figure[data-id="${workId}"]`);
                if (modalWorkToRemove) {
                    modalWorkToRemove.remove();

                    const galleryWorkToRemove = document.querySelector(`figure[data-id="${workId}"]`);
                    if (galleryWorkToRemove) {
                        galleryWorkToRemove.remove();
                    } else {
                        console.error('Élément à supprimer non trouvé dans la galerie principale');
                    }
                } else {
                    console.error('Élément à supprimer non trouvé dans la modale');
                }
            })
            .catch(error => console.error(error));
    }
}



//--------- MODAL 2 //

const newPhotoBtn = document.querySelector('#new-photo'); //Ajoute le bouton photo//
const returnBtn = document.querySelector('#modal-return');
const modalPhotoClose = document.querySelector('#modal-photo-close');

// Changement de modal 1 --> modal 2
newPhotoBtn.addEventListener('click', function () {
    modalContent.style.display = 'none';
    modalPhoto.style.display = 'block';
    selectedCategory();
});

newPhotoBtn.addEventListener("click", () => showModal(modalPhoto));

modalContent.addEventListener('click', (e) => e.stopPropagation());

modalPhoto.addEventListener('click', (e) => e.stopPropagation());




//&* Contrôle si le formulaire est rempli//

const titleInput = document.getElementById('modal-photo-title');
const categorySelected = document.getElementById('modal-photo-category');
const imageInput = document.getElementById('image');
const submitButton = document.getElementById('modal-valider');

// vérifie si les trois entrées ont une valeur non vide
function checkForm() { 
    //Si tous les champs ont une valeur non vide
    if (titleInput.value !== '' && categorySelected.value !== '' && imageInput.value !== '') { 
        // Définir la couleur de fond du bouton de soumission
        submitButton.style.backgroundColor = '#1D6154'; 
    } else { 
        // Sinon, définir la couleur de fond du bouton de soumission sur une valeur vide
        submitButton.style.backgroundColor = '';
    }
}

titleInput.addEventListener('input', checkForm);
categorySelected.addEventListener('change', checkForm);
imageInput.addEventListener('change', checkForm);



//*Ajoute une nouvelle image //
const selectedCategory = () => {
    categorySelected.innerHTML = ""; //On verifie que la balise select est vide
    let option = document.createElement("option");
    categorySelected.appendChild(option); // On ajoute une option vide par defaut dans la balise select
    const allCategoriesWithoutTous = allCategories.filter((el) => el.id !== 0);
    allCategoriesWithoutTous.forEach((category) => {
        let option = document.createElement("option"); // On créé une nouvelle option pour chaque categorie
        option.value = category.name;
        option.innerHTML = category.name;
        option.id = category.id;
        categorySelected.appendChild(option);
    })
}
const addNewWork = (event) => {
    event.preventDefault();

    const token = sessionStorage.getItem("Token");

    const title = document.getElementById("modal-photo-title").value;
    const category = document.getElementById("modal-photo-category").value;
    const image = document.getElementById("image").files[0];


    if (!title || !category || !image) {
        alert('Veuillez remplir tous les champs du formulaire.')
        return;
    }

    //Vérifie si l'image ne dépasse pas 4 Mo//
    if (image.size > 4 * 1024 * 1024) {
        alert("La taille de l'image ne doit pas dépasser 4 Mo.");
        return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("image", image);

    fetch("http://localhost:5678/api/works", {
        method: "POST",
        body: formData,
        headers: {
            "Accept": 'application/json',
            "Authorization": `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(work => {
            //ccréer une nouvelle œuvre et l'ajouter à la galerie//
            const figure = createWorkFigure(work);
            const gallery = document.querySelector('.gallery');
            gallery.appendChild(figure);

            //créer une nouvelle œuvre et l'ajouter à la modal gallery//
            const figureModal = createModalWorkFigure(work);
            const galleryModal = document.querySelector('.gallery-modal');
            galleryModal.appendChild(figureModal);

            alert('La photo a été ajoutée avec succès.');
        })
        .catch(error => console.error(error));
}

const btnValider = document.getElementById("modal-valider");
btnValider.addEventListener("click", addNewWork);

//&* Aperçu de l'image//
const inputImage = document.getElementById("image");
const labelImage = document.getElementById("label-image");
const pImage = document.querySelector("#form-photo-div > p");
const iconeImage = document.querySelector("#iModalImage");

inputImage.addEventListener("change", function () {
    const selectedImage = inputImage.files[0];

    const imgPreview = document.createElement("img");
    imgPreview.src = URL.createObjectURL(selectedImage);
    imgPreview.style.maxHeight = "100%";
    imgPreview.style.width = "auto";
        // Cache les éléments existants
    labelImage.style.display = "none";
    pImage.style.display = "none";
    inputImage.style.display = "none";
    iModalImage.style.display = "none";
        // Ajoute la prévisualisation de l'image en tant que nouvel enfant de #form-photo-div 
    document.getElementById("form-photo-div").appendChild(imgPreview);
});