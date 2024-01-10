let currentPageUrl = 'https://swapi.dev/api/people/';

window.onload = async () => {
    try {
        await loadCharacters(currentPageUrl);
    } catch(error) {
        console.log(error);
        alert('Erro ao carregar cards');
    }

    const nextButton = document.getElementById('next-button');
    const backButton = document.getElementById('back-button');

    nextButton.addEventListener('click', loadNextPage);
    backButton.addEventListener('click', loadPreviousPage);
};

async function loadCharacters(url) {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = ''; // LIMPAR OS RESULTADOS ANTERIORES

    try {

        const response = await fetch(url);
        const responseJson = await response.json();

        responseJson.results.forEach((character) => {

            //CRIANDO OS CARDS
            const card = document.createElement("div");
            card.style.backgroundImage = 
            `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg')`;
            card.className = "cards";

            const characterNameBG = document.createElement("div");
            characterNameBG.className = "character-name-bg";

            const characterName = document.createElement("span");
            characterName.className = "character-name";
            characterName.innerText = `${character.name}`

            characterNameBG.appendChild(characterName);
            card.appendChild(characterNameBG);

            //CRIANDO O MODAL
            card.onclick = () => {
                //criando modal
                const modal = document.getElementById('modal');
                modal.style.visibility = "visible";

                //criando o conteudo do modal
                const modalContent = document.getElementById("modal-content");
                modalContent.innerHTML = '';

                //imagem do modal
                const characterImage = document.createElement("div");
                characterImage.style.backgroundImage = 
                `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg')`;
                characterImage.className = "character-image";   
                
                //criando os detalhes do modal, com SPAN
                const name = document.createElement("span");
                name.className = "character-details";
                name.innerText = `Nome: ${character.name}`;

                const characterHeight = document.createElement("span");
                characterHeight.className = "character-details";
                characterHeight.innerText = `Altura: ${character.height}`;

                const mass = document.createElement("span");
                mass.className = "character-details";
                mass.innerText = `Massa: ${character.mass}`;

                const hairColor = document.createElement("span");
                hairColor.className = "character-details";
                hairColor.innerText = `Cor do cabelo: ${character.hair_color}`;

                const eyeColor = document.createElement("span");
                eyeColor.className = "character-details";
                eyeColor.innerText = `Cor dos olhos: ${character.eye_color}`;

                const birthYear = document.createElement("span");
                birthYear.className = "character-details";
                birthYear.innerText = `Ano de nascimento: ${character.birth_year}`;

                //acrescentando(append) a imagem e os SPAN's dentro do modal
                modalContent.appendChild(characterImage)
                modalContent.appendChild(name)
                modalContent.appendChild(characterHeight)
                modalContent.appendChild(mass)
                modalContent.appendChild(hairColor)
                modalContent.appendChild(eyeColor)
                modalContent.appendChild(birthYear)
            };

            mainContent.appendChild(card);
        });

        const nextButton = document.getElementById('next-button');
        const backButton = document.getElementById('back-button');

        nextButton.disabled = !responseJson.next;
        backButton.disabled = !responseJson.previous;

        backButton.style.visibility = responseJson.previous? "visible" : "hidden";

        currentPageUrl = url;

    } catch(error) {
        alert('Erro ao carregar os personagens');
        console.log(error);
    }
}

async function loadNextPage() {
    if (!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl);
        const responseJson = await response.json();

        await loadCharacters(responseJson.next);

    } catch(error) {
        console.log(error);
        alert('Erro ao carregar a próxima página');
    }
}

async function loadPreviousPage() {
    if (!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl);
        const responseJson = await response.json();

        await loadCharacters(responseJson.previous);

    } catch(error) {
        console.log(error);
        alert('Erro ao carregar a página anterior');
    }
}

function hideModal() {
    const modal = document.getElementById("modal");
    modal.style.visibility = "hidden";
}