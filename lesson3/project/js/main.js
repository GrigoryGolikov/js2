const API = `https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses`;

// Класс каталог
class ProductsList {
    constructor(container = '.products') {

        this.container = container;
        this.data = [];
        this.allProducts = [];
        this._getProducts()
            .then(() => this._render());
    }
    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .then(data => {
                this.data = [...data];
            })
            .catch(error => console.log('error'));
    }

    _render() {
        const block = document.querySelector(this.container);
        for (let item of this.data) {
            const product = new ProductItem(item);
            this.allProducts.push(product);
            block.insertAdjacentHTML('beforeend', product.render());
        }
    }

    // Метод, определяет суммарную стоимость всех товаров.
    productsSum() {
        let sum = 0;
        for (let item of this.allProducts) {
            sum += item.price;
        }
        return sum;
    }
}

// Класс элемент каталога
class ProductItem {
    constructor(product, img = `https://placehold.it/200x150`) {
        this.id_product = product.id_product;
        this.product_name = product.product_name;
        this.price = product.price;
        this.img = img;
    }
    render() {
        return `<div class="product-item">
                    <img src="${this.img}" alt="${this.title}">
                    <div class="desc">
                        <h3>${this.product_name}</h3>
                        <p class  = "price-text">${this.price} руб. </p>
                        <button class="buy-btn" onclick='cart.addProduct(${this.id_product})'>Купить</button>
                    </div>    
                </div>`;
    }
}

// Класс корзина
class Cart {
    constructor(container = '.drop-cart') {
        this.cartProducts = []; // массив добавленных в корзину товаров
        this.data = [];
        this.container = container; // расположение корзины на странице
        this._getCart()
            .then(() => this._render());

    }

    _getCart() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .then(data => {
                this.data = [...data.contents];
            })
            .catch(error => console.log('error'));
    }

    cartText() { } // возвращает текущее представление корзины, например "Корзина пуста", "В корзине n товаров на s рублей"

    seeCart(){
        let block = document.querySelector(".drop-cart");
         
    }

    //  сумма корзины
    cartPrice() {
        let sum = 0;
        for (let item of this.cartProducts) {
            sum += item.price * item.quantity;;
        }
        let block = document.querySelector(".drop-cart-total").textContent = sum + " руб";
    }

    // возвращает количество товарв в корзине
    сartCount() { }

    // добавляет товар в корзину, на вход id товара и количество
    addProduct(id_product, quantity = 1) {

        // ищем товар в корзине
        var foundProduct = this.cartProducts.find(x => x.id_product == id_product);
        // если в корзине нет нужного товара то добавляем его
        if (foundProduct === undefined) {
            var foundProduct = products.allProducts.find(x => x.id_product == id_product);
            const product = new CartItem(foundProduct);
            this.cartProducts.push(product);
            const block = document.querySelector(this.container);
            block.insertAdjacentHTML('afterBegin', product.render());

            const prod = document.querySelector(".drop-cart-product");
            // если товар уже есть в корзине, то добавляем к найденой позиции количество (count + 1)
        } else {
            ++foundProduct.quantity;
            for (let item of document.querySelectorAll("drop-cart-product, .drop-cart-p")) {
                if (item.dataset.id == id_product) {
                    item.textContent = foundProduct.quantity + " x " + foundProduct.price;
                }
            }
        }
        this.cartPrice();
    }
    // удаляет товар из корзины, на вход id товара и количество
    removeProduct(id_product, quantity = 1) {

        var foundProduct = this.cartProducts.find(x => x.id_product == id_product);
        if (foundProduct != undefined) {
            --foundProduct.quantity;
            if (foundProduct.quantity === 0) {
                // удалим из корзины
                var index = this.cartProducts.indexOf(foundProduct);
                if (index >= 0) {
                    this.cartProducts.splice(index, 1);
                    // удалим div из корзины
                    event.currentTarget.remove();
                }
            } else {
                for (let item of document.querySelectorAll("drop-cart-product, .drop-cart-p")) {
                    if (item.dataset.id == id_product) {
                        item.textContent = foundProduct.quantity + " x " + foundProduct.price;
                    }
                }
            }
        }
        this.cartPrice();
    }

    // удаляет товар из корзины 
    ClearProduct(id_product) {
        var foundProduct = this.cartProducts.find(x => x.id_product == id_product);
        var index = this.cartProducts.indexOf(foundProduct);
        if (index >= 0) {
            this.cartProducts.splice(index, 1);
            // удалим div из корзины
            event.currentTarget.remove();
        }
        this.cartPrice();

    }

    // рендерит содержимое корзины
    _render() {
        const block = document.querySelector(this.container);
        for (let item of this.data) {
            const product = new CartItem(item);

            this.cartProducts.push(product);
            block.insertAdjacentHTML('afterBegin', product.render());

            const prod = document.querySelector(".drop-cart-product");

            //           prod.addEventListener('click', this.handleCartsClick);
        }

        block.insertAdjacentHTML('beforeend', `<div class="drop-cart-under">
                                                <p class="drop-cart-total-text">TOTAL</p>
                                                <p class="drop-cart-total"> руб. </p>
                                             </div>`);

        this.cartPrice();

    }

    //  обработки события клика по корзине
    handleCartsClick() {

        // проверяем что нажали на кнопку
        if (event.target.tagName === "BUTTON") {
            var id_product = event.currentTarget.dataset.id;
            if (event.target.textContent === "-") {
                this.removeProduct(id_product, 1, event)

            } else if (event.target.textContent === "+") {
                this.addProduct(id_product, 1, event)
            } else if (event.target.textContent === "X") {
                this.ClearProduct(id_product)
            }
            var foundProduct = this.cartProducts.find(x => x.id_product == id_product);
            //   event.currentTarget.querySelector(".drop-cart-p").textContent = foundProduct.quantity + " x " + foundProduct.price;
        }
    }
}

// Класс элемент корзины
class CartItem {
    constructor(product, img = `https://placehold.it/100x75`, quantity = 1) {
        this.quantity = quantity; // количество товара
        this.id_product = product.id_product;// идентификатор товара
        this.product_name = product.product_name;// наименование товара
        this.price = product.price;// стоимость товара
        this.img = img;// картинка товара
    }

    // рендерит элемент корзины
    render() {
        return `<div class="drop-cart-product" data-id = ${this.id_product} onclick='cart.handleCartsClick(${this.id_product})'> 
                    <div class="drop-cart-div-img">
                        <a href="SinglePage.html"> <img class="drop-cart_img" src="${this.img}"></a>
                    </div>
                    <div class="drop-cart-details">
                        <h3 class="drop-cart-h3">${this.product_name}</h3>
                        <p class="drop-cart-p" data-id = ${this.id_product} >${this.quantity} x ${this.price}</p>
                    </div>
                    <div class="drop-cart-action-box">
                        <button class="productButtonRem">-</button>
                        <button class="productButtonAdd">+</button>
                        <button class="productButtonDel">X</button>                  
                          </div>
                </div>`;
    }

}

const products = new ProductsList;

const cart = new Cart;
