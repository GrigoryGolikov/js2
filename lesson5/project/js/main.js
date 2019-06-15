const API = `https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses`;

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: `/catalogData.json`,
        cartUrl: `/getBasket.json`,
        products: [],
        carts: [],
        textFilter: "",
        cartVisibility: false,

        imgCatalog: `https://placehold.it/200x150`,
        imgCart: `https://placehold.it/100x75`,

    },
    computed: {
        filter() {
            const regexp = new RegExp(this.textFilter, 'i');
            return this.products.filter(el => regexp.test(el.product_name))
        },

        cartSum() {
            console.log(1);
            let sum = 0;
            for (let item of this.carts) {
                sum += item.price * item.quantity;
            }
            return sum;
        },
        cartQuantity() {
            console.log(1);
            let sum = 0;
            for (let item of this.carts) {
                sum += item.quantity;
            }
            return sum;
        },

    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => console.log(error))
        },
        getItem(id) {
            return this.carts.find(el => el.id_product === id);
        },
        addProduct(product) {
            this.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    let found = this.getItem(+product.id_product);

                    if (found) {
                        found.quantity++;
                    } else {
                        this.carts.push(product);
                        Vue.set(product, 'quantity', 1);
                    }
                })
        },
        remProduct(product) {
            this.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    let found = this.getItem(+product.id_product);
                    found.quantity--;
                    if (found.quantity === 0) {
                        let index = this.carts.indexOf(found);
                        if (index >= 0) {
                            this.carts.splice(index, 1);
                        }
                    }
                })

        },
        clearProduct(product) {

            let found = this.getItem(+product.id_product);
            let index = this.carts.indexOf(found);
            if (index >= 0) {
                this.carts.splice(index, 1);
            }
        },

    },
    mounted() {
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
            });
        this.getJson(`getProducts.json`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
            })

        this.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for (let el of data.contents) {
                    this.carts.push(el);
                }
            });
    }
})