const app = {
    //^init
    init() {
        this.setRegionTitle();
        this.getRegions();
    },

    async getRegions() {
        // je viens interroger mon API
        const response = await fetch("https://ghibliapi.herokuapp.com/films/58611129-2dbc-4a81-a72f-77ddfc1b1b49");

        // je teste si la réponse est OK
   /*      if (response.ok) {*/
           

            // je vais récupérer mon parent UL
            /* const regionsHTML = document.getElementById("regions");
            // je récupère l'ensemble des régions
            const regionsJSON = await response.json();

            for (const region of regionsJSON) {
                let li = document.createElement('li');
                li.textContent = region.nom;
                regionsHTML.appendChild(li);
            } */ 
        /* } else {
            console.log(response);
        } */
    },

    async setRegionTitle() {
        const para = document.getElementById("test");
        let p = document.createElement('p');
        p.textContent = 'LISTE DES REGIONS';
        para.appendChild(p);
    }
};

app.init();