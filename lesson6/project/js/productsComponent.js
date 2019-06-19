Vue.component('products', {
    data(){
        return{
            catalogUrl: `/catalogData.json`,
            products: [],
            filtered: [],
            error: false,
            errorText: "",
            imgCatalog: `https://placehold.it/200x150`,
    
        }
    },
    mounted() {
        this.$parent.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                    this.errorText = "";
                    this.error = false;
                }
            })
            .catch(error => {
                console.log( error);
                this.error = true;
                this.errorText = "ERROR ! " + error;
            });

        this.$parent.getJson(`getProducts.json`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });


    },

    methods: {
        filter(textFilter) {
            
            const regexp = new RegExp(textFilter, 'i');
            this.filtered =  this.products.filter(el => regexp.test(el.product_name))
            console.log(this.filtered);

        },
    },

    template:
    `
    <div class="products">
        <error v-if="error"         
        :error-text = "errorText"
        ></error>
        <product-item
        v-for="product of filtered"
        :key="product.id_product"
        :img-product = "imgCatalog"
        :product-item = "product"
        ></product-item>     
    </div>`,
})

Vue.component("productItem", {
    props: ['productItem', 'imgProduct'],
    template:
    `<div class="product-item" >
        <img :src="imgProduct" alt="productItem.product_name">
        <div class="desc">
            <h3>{{productItem.product_name}}</h3>
            <p class="price-text">{{productItem.price}} руб. </p>
            <button class="buy-btn" @click="$root.$refs.cart.addProduct(productItem)">Купить</button>
        </div>
    </div>`

})
