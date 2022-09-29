const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductsList {
    constructor(container = '.products'){
        this.container = container;
        this.goods = [];//массив товаров из JSON документа
        this._getProducts()
            .then(data => { //data - объект js
                this.goods = data;
//                 console.log(data);
                this.render()
            });
    }
    _getProducts(){

        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });

    }
    render(){
        const block = document.querySelector(this.container);
        for (let product of this.goods){
            const productObj = new ProductItem(product);
//            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }

    }
}

class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150'){
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }
    render(){
        return `<div class="product-item">
                    <h3 class="titleProduct">${this.title}</h3>
                    <img class="imgProduct" src = "${this.img}" alt="NOT IMG">
                    <div>
                        <p class="priceProduct">${this.price} р</p>
                        <button class="buy-btn ${this.title}_buy-btn">Купить</button>
                    </div>
                </div>`
    }
}

class basketElement {
    constructor(product, img = 'https://via.placeholder.com/200x150'){
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
        this.quantity = product.quantity;
    }
    render(){
        return `<div class="basket-item">
                <h3 class="titleProduct">${this.title}</h3>
                <img class="imgProduct" src = "${this.img}" alt="NOT IMG">
                <div class="infProduct">
                    <p class="priceProduct">${this.price} р - 1 шт.</p>
                    <p class="priceProduct">${this.price*this.quantity} р за ${this.quantity} шт. в корзине</p>
                    <p class="quantityProduct">Количество: ${this.quantity} шт.</p>
                    <button class="out-btn ${this.title}_out-btn">Удалить</button>
                </div>
            </div>`
    }

}

class BasketProducts {
    constructor() {
        this.addProduct = []; //Продукты добавленные в корзину
        this._getBasket ()
            .then(data => {
                this.addProduct = data.contents;
                this.renderBasket();
            })
    }
    _getBasket() {
        return fetch(`${API}/getBasket.json`)
            .then(basket => basket.json())
            .catch(error => {
                console.log(error);
            });
    }

    outProductInBasket (product) {
        if (product.quantity > 1) {
            product.quantity = product.quantity - 1;
        } else {
            this.addProduct.splice(this.addProduct.indexOf(product), 1);
        }
    }

    totalPrice () {
        let totalPriceSum = 0;
        for (let i = 0;i < this.addProduct.length; i++) {
            totalPriceSum += this.addProduct[i].price*this.addProduct[i].quantity;
        }
        return totalPriceSum;
    }

    renderBasket() {
        const basketBlock = document.querySelector('.basketNotVision');
        const totalPriceVision = document.querySelector('.totalPriceVision');
        const btnCart = document.querySelector('.btn-cart').addEventListener('click', (e) => {
            if (basketBlock.className == 'basket') {
                basketBlock.className = 'basketNotVision';
            } else {
                basketBlock.className = 'basket';
            }
        });
            for (let i = 0;i < this.addProduct.length; i++) {
                let basketEl = this.addProduct[i];
                const basketObj = new basketElement(basketEl);
                basketBlock.insertAdjacentHTML('beforeend', basketObj.render());
                let outBtn = document.querySelector(`.${basketObj.title}_out-btn`).addEventListener('click', (e) => {
                    this.outProductInBasket(basketEl);
                    basketBlock.innerHTML = '';
                    for (let basketEl of this.addProduct) {
                        const basketObj = new basketElement(basketEl);
                        basketBlock.insertAdjacentHTML('beforeend', basketObj.render());
                        let outBtn = document.querySelector(`.${basketObj.title}_out-btn`).addEventListener('click', (e) => {
                            this.outProductInBasket(basketEl);
                            for (let basketEl of this.addProduct) {
                                const basketObj = new basketElement(basketEl);
                                basketBlock.insertAdjacentHTML('beforeend', basketObj.render());
                            }
                        });
                    }
                });
                totalPriceVision.textContent = `Общая стоимость: ${this.totalPrice()} р.`;
                /*let buyBtn = document.querySelector(`.${basketObj.title}_buy-btn`).addEventListener('click', () => {
                    basketObj.quantity += 1;
                    for (let basketEl of this.addProduct) {
                        const basketObj = new basketElement(basketEl);


                    }
                })*/

            }
    }
}



let list = new ProductsList();
let bask = new BasketProducts()