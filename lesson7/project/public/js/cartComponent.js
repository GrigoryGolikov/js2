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
            let find = this.getItem(+product.id_product);
            if(find){
                this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: 1})
                .then(data => {
                    if(data.result){
                        find.quantity++
                    }
                })
            } else {
                let prod = Object.assign({quantity: 1}, product);
                this.$parent.postJson(`/api/cart`, prod)
                    .then(data => {
                        if(data.result){
                            this.carts.push(prod);
                        }
                    })
            }       
        },
        remProduct(product) {
            let find = this.getItem(+product.id_product);
            if(find.quantity >1){
                this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: -1})
                .then(data => {
                    if(data.result){
                        find.quantity--
                    }
                })
            } else {
                
                this.$parent.deleteJson(`/api/cart/${find.id_product}`, {quantity: -1})
                    .then(data => {
                        let index = this.carts.indexOf(find);
                        if (index >= 0) {
                            this.carts.splice(index, 1);
                        }
                    })
            }     

        },
        clearProduct(product) {
            let find = this.getItem(+product.id_product);
            this.$parent.deleteJson(`/api/cart/${find.id_product}`, {quantity: - find.quantity })
            .then(data => {
                let index = this.carts.indexOf(find);
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
        this.$parent.getJson(`/api/cart`)
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