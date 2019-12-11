/**
 * @property {HTMLElement| null} pagination
 * @property {HTMLElement| null} content
 * @property {HTMLElement| null} sorting
 * @property {HTMLElement| null} form
 */


export  default class Filter {

    /**
     *
     * @param {HTMLElement|null} element
     */
    constructor(element){
        if(element === null){
            return
        }

        this.pagination = element.querySelector('.js-filter-pagination');
        this.content = element.querySelector('.js-filter-content');
        this.sorting = element.querySelector('.js-filter-sorting');
        this.form = element.querySelector('.js-filter-form');
        this.bindEvents();

    }


    /**
     * Ajoute les comportements aux different elements
     */
    bindEvents(){

        this.sorting.addEventListener('click' , e => {
            
            if(e.target.tagName === "A"){
                e.preventDefault();
                this.loadUrl(e.target.getAttribute('href'))

            }

        })
    }

    async loadUrl(url){

        const response = await fetch(url, {
            headers : {
                'X-Requested-With' : 'XMLHttpRequest'
            }
        })
        if(response.status >= 200 && response.status < 300){

            const data = await response.json();

            this.content.innerHTML = data.content;
            this.sorting.innerHTML = data.sorting;

            //------afficher l'url ajax de la recherche sur le lien
            history.replaceState({}, '' , url);

        } else {
            console.error(response);
        }

    }

}