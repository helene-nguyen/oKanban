console.log('echo');

const appCard = {
    //^------------------------------ Variables
    body: document.querySelector('body'),

    //^------------------------------ Init
    init() {
        appCard.fetchAllCards();
    },

    //^------------------------------ Methods
    //~fetch all cards
    async fetchAllCards() {
        const url = `http://192.168.0.9:4100/cards`;
        const response = await fetch(url);

        if (response.ok) {
            const cards = await response.json();

            for (const card of cards) {
                appCard.createCard(card.title);
            }
        }
    },
    //~create card
    createCard(cardTitle) {
        
        const sectionCards = document.createElement('section');
        sectionCards.classList.add('cards');

        const cardElement = document.createElement('article');

        const cardTitleElement = document.createElement('h2');
        cardTitleElement.textContent = cardTitle;

        appCard.body.appendChild(sectionCards);
        sectionCards.appendChild(cardElement);
        cardElement.appendChild(cardTitleElement);
    }
};

export { appCard };