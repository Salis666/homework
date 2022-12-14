const products = [
    {id: 1, title: 'Notebook', price: 2000, img: 'pic/notebook.jpg'},
    {id: 2, title: 'Mouse', price: 20, img: 'pic/mouse.jpg'},
    {id: 3, title: 'Keyboard', price: 200, img: 'pic/keyboard.jpg'},
    {id: 4, title: 'Gamepad', price: 50, img: 'pic/gamepad.jpg'},
];
//Функция для формирования верстки каждого товара
//Добавить в выводе изображение
const renderProduct = (obj) => {
    return `<div class="product-item">
                <h3 class="titleProduct">${obj.title}</h3>
                <img class="imgProduct" src = ${obj.img}>
                <div>
                    <p class="priceProduct">${obj.price}$</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`
};
const renderPage = list => {
    const productsList = list.map(item => renderProduct(item));
    console.log(productsList);
    document.querySelector('.products').innerHTML = productsList.join(`\n`);
};

renderPage(products);