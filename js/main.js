class ProductList{
    constructor(container='.products'){
        this.container = container;
        this.goods = [];
        this._fetchProducts();//рекомендация, чтобы метод был вызван в текущем классе
        this.render();//вывод товаров на страницу
    }



    _fetchProducts(){
        this.goods = [
            {id: 1, title: 'Notebook', price: 2000, img: 'pic/notebook.jpg'},
            {id: 2, title: 'Mouse', price: 20, img: 'pic/mouse.jpg'},
            {id: 3, title: 'Keyboard', price: 200, img: 'pic/keyboard.jpg'},
            {id: 4, title: 'Gamepad', price: 50, img: 'pic/gamepad.jpg'},
        ];
    }

    render(){
        const block = document.querySelector(this.container);
        for(let product of this.goods){
            const item = new ProductItem(product);
            block.insertAdjacentHTML("beforeend",item.render());
//              block.innerHTML += item.render();
        }
    }
}

class ProductItem{
    constructor(product){
        this.title = product.title;
        this.id = product.id;
        this.price = product.price;
        this.img = product.img;
    }
    render(){
        return `<div class="product-item">
                <h3 class="titleProduct">${this.title}</h3>
                <img class="imgProduct" src = ${this.img} alt="NOT IMG">
                <div>
                    <p class="priceProduct">${this.price}$</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`
    }
}

let list = new ProductList();