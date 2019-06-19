Vue.component('cart', {
    data() {
        return {
            cartUrl: `/getBasket.json`,
            carts: [],
            imgCart: `https://placehold.it/100x75`,
            cartVisibility: false,
        }
    },

    methods: {
        addProduct(product) {

            this.$parent.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    let found = this.getItem(+product.id_product);

                    if (found) {
                        found.quantity++;
                    } else {
                        let el = Object.assign({ quantity: 1 }, product);
                        this.carts.push(el);
                        // Vue.set(product, 'quantity', 1);
                    }
                })
        },
        remProduct(product) {
            console.log(1);
            this.$parent.getJson(`${API}/deleteFromBasket.json`)
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
            this.$parent.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    let found = this.getItem(+product.id_product);
                    let index = this.carts.indexOf(found);
                    if (index >= 0) {
                        this.carts.splice(index, 1);
                    }
                })

        },
        cartSum() {
            let sum = 0;
            for (let item of this.carts) {
                sum += item.price * item.quantity;
            }
            return sum;
        },
        cartQuantity() {
            let sum = 0;
            for (let item of this.carts) {
                sum += item.quantity;
            }
            return sum;
        },

        getItem(id) {
            return this.carts.find(el => el.id_product === id);
        },
    },

    mounted() {
        this.$parent.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for (let el of data.contents) {
                    this.carts.push(el);
                }
            });
    },

    template:
    `<div>
        <div class="logo">
            <button class="btn-cart" type="button"
                @click="cartVisibility = !cartVisibility">Корзина ({{cartQuantity()}})</button>
        </div>
        <div class="drop-cart" id="cart" v-if="cartVisibility">
            <p v-if="!cartQuantity()" class="drop-cart-total-text">Корзина пуста</p>

            <cart-item 
            v-for="item of carts" 
            :key="item.id_product"
            :img-cart="imgCart"
            :cart-item="item"
            @remProduct="remProduct"
            @addProduct="addProduct"
            @clearProduct="clearProduct"></cart-item>

            <div class="drop-cart-under">
                <p class="drop-cart-total-text">TOTAL</p>
                <p class="drop-cart-total"> {{cartSum()}} руб. </p>
            </div>
        </div>
    </div>`
})

Vue.component("cartItem", {
    props: ['cartItem', 'imgCart'],
    template:
    `<div v-else class="drop-cart-product">
        <div class="drop-cart-div-img">
            <img class="drop-cart_img" :src="imgCart" alt="product.product_name">
        </div>
        <div class="drop-cart-details">
            <h3>{{cartItem.product_name}}</h3>
            <p class="drop-cart-p"> {{cartItem.quantity}} x {{cartItem.price}}</p>
        </div>
        <div class="drop-cart-action-box">
            <button class="productButtonRem btn-cart-smile" @click="$emit('remProduct', cartItem)">-</button>
            <button class="productButtonAdd btn-cart-smile" @click="$emit('addProduct', cartItem)">+</button>
            <button class="productButtonDel btn-cart-smile" @click="$emit('clearProduct', cartItem)">x</button>
        </div>
    </div>`
})