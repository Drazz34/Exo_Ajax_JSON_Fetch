let nav = document.querySelector('nav');
let info_users = document.querySelector('header');
let main = document.querySelector('main');

// Affichage des users

function listUsers(jsonObj) {
    for (let i = 0; i < jsonObj.length; i++) {
        let icon = '<i class="fa-solid fa-user"></i>';
        let nom = jsonObj[i].name;

        let user = document.createElement('li');
        // user.id = "user" + i; // créé un id unique à chaque li
        user.innerHTML = icon + nom;
        nav.appendChild(user);

        // Affichage infos des users dans le header

        user.addEventListener('click', () => {
            
            fetch('https://jsonplaceholder.typicode.com/posts?userId=' + jsonObj[i].id)

                .then(function (response) {
                    response.json()
                        .then(function (contenu) {
                            publicationUsers(contenu);
                        })
                });
            info_users.innerHTML = "";

            // Ajouter une classe 'selected' à l'élément cliqué
            user.classList.add('selected');

            // Retirer la classe 'selected' de tous les autres éléments de la liste
            let allUsers = document.querySelectorAll('nav li');
            for (let j = 0; j < allUsers.length; j++) {
                if (allUsers[j] !== user) {
                    allUsers[j].classList.remove('selected');
                }
            }

            // Affichage partie gauche

            let username = jsonObj[i].username;
            let email = jsonObj[i].email;
            let phone = jsonObj[i].phone;

            let divGauche = document.createElement('div');
            let divGContenu = document.createElement('div');
            let iconUser = document.createElement('p');
            let nameUser = document.createElement('h1');
            let emailUser = document.createElement('h3');
            let phoneUser = document.createElement('h3');
            let span = document.createElement('span');

            divGauche.classList.add('divGauche');
            divGContenu.classList.add('divGcontenu');

            iconUser.innerHTML = icon;
            span.textContent = ` (${username})`;
            nameUser.innerHTML = nom;
            nameUser.appendChild(span);
            emailUser.textContent = email;
            phoneUser.textContent = phone;

            divGauche.appendChild(iconUser);
            divGContenu.appendChild(nameUser);
            divGContenu.appendChild(emailUser);
            divGContenu.appendChild(phoneUser);

            divGauche.appendChild(divGContenu);

            info_users.appendChild(divGauche);

            // Affichage partie droite

            let suite = jsonObj[i].address.suite;
            let street = jsonObj[i].address.street;
            let zip = jsonObj[i].address.zipcode;
            let city = jsonObj[i].address.city;
            let website = jsonObj[i].website;

            let divDroite = document.createElement('div');
            let divDFLign = document.createElement('p');
            let divDSLign = document.createElement('p');
            let divDTLign = document.createElement('p');
            divDroite.appendChild(divDFLign);
            divDroite.appendChild(divDSLign);
            divDroite.appendChild(divDTLign);
            divDFLign.textContent = suite + " ";
            divDFLign.textContent += street;
            divDSLign.textContent = zip + " ";
            divDSLign.textContent += city;
            divDTLign.textContent = website;

            divDroite.classList.add('divDroite');

            info_users.appendChild(divDroite);
        });
    }
}

/** Afficher les publications de chaque utilisateurs
 * 
 * @param {JSON} jsonObj
 */

function publicationUsers(jsonObj) {
    let userLis = document.querySelectorAll('nav li');
    main.innerHTML = "";

    //    let userId = i + 1; // Les IDs des utilisateurs dans jsonObj commencent à 1, pas 0
    // let userPosts = jsonObj.filter(post => post.userId === userId);
    for (let j = 0; j < jsonObj.length; j++) {
        let post = jsonObj[j];

        let title = post.title;
        let body = post.body;

        let div = document.createElement('div');
        let divTitle = document.createElement('div');
        let divBody = document.createElement('div');
        let titleUser = document.createElement('p');
        let bodyUser = document.createElement('p');

        div.classList.add('user-comment');
        divTitle.classList.add('title');
        divBody.classList.add('body');

        titleUser.textContent = title;
        bodyUser.textContent = body;

        divTitle.appendChild(titleUser);
        divBody.appendChild(bodyUser);
        div.appendChild(divTitle);
        div.appendChild(divBody);
        main.appendChild(div);

    }
}

let p = fetch('https://jsonplaceholder.typicode.com/users')

    .then(function (response) {
        response.json()
            .then(function (contenu) {
                listUsers(contenu);
            })
    });

