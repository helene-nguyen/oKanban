const appList = {
    //^------------------------------ Variables
    URL: 'http://localhost:4100',
    allList: '/lists',
    //^------------------------------ Init
    init() {
        this.fetchAllLists();
        this.createForm();
    },
    //^------------------------------ Methods
    //~fetch all lists
    async fetchAllLists() {
        const urlAllList = this.URL + this.allList;
        const response = await fetch(urlAllList);

        console.log(await response.json());

        if (response.ok) {
            // const lists = await response.json();
        }
    },
    //~create form
    createForm() {
        //
        const formElement = document.createElement('form');
        formElement.setAttribute('action', this.allList);
        formElement.setAttribute('method', 'POST');
        formElement.classList.add('form-list-box');

        const dashboard = document.querySelector('#dashboard');
        dashboard.appendChild(formElement);

        const inputs = ['title', 'description'];

        for (let input of inputs) {
            const inputElement = document.createElement('input');

            inputElement.setAttribute('type', 'text');
            inputElement.setAttribute('name', `${input}`);
            inputElement.setAttribute('id', `${input}`);
            inputElement.setAttribute('placeholder', `${input.charAt(0).toUpperCase() + input.slice(1)}`);

            formElement.appendChild(inputElement);
        }

        const btnAddList = document.createElement('input');
        btnAddList.setAttribute('type', 'submit');
        btnAddList.setAttribute('value', 'Add');
        formElement.appendChild(btnAddList);

    },
    //~create list
    createList() {

    }
    //appendchild dans dashboard => queryselector dashboard
    //fetch http:// 1 liste
    //create liste
    //trouver 1 liste
    //affichage liste

};

export {
    appList
};