const products = [
    {id: 1, title: 'Notebook', price: 2000},
    {id: 2, title: 'Mouse', price: 30},
    {id: 3, title: 'Keyboard', price: 55},
    {id: 4, title: 'Gamepad', price: 75},
    {id: 1, title: 'Notebook', price: 2000},
    {id: 2, title: 'Mouse', price: 30},
    {id: 3, title: 'Keyboard', price: 55},
    {id: 4, title: 'Gamepad', price: 75},
    {id: 1, title: 'Notebook', price: 2000},
    {id: 2, title: 'Mouse', price: 30},
];

// добавил значения по умолчанию title = "no name", price = 0
const renderProduct = (title = "no name", price = 0) => {
    return `<div class="product-item">
                <h3>${title}</h3>
                <p class  = "price-text">${price} руб. </p>
                <button class="buy-btn">Купить</button>
            </div>`
};

const renderPage = list => {
    const productsList = list.map(item => renderProduct(item.title, item.price));

    // Изначально после каждого товара на странице выводилась запятая.
    // Это происходило из-за того, что строковое предстваление массива [a,b,c] имеет следующий вид "a,b,c"
    // Для того чтобы избавиться от запятых воспользуеимся методом join. 
    // Для нагладности каждый блок бкдем разбивать переносом строки "/n". 
    //document.querySelector('.products').innerHTML = productsList;
    document.querySelector('.products').innerHTML = productsList.join("\n");
};

// По повподу упрощения 
// Возможно имеет смысл переписать функцию renderPage следующим образом:
// убрать переменную const productsList
// функция будет иметь вид
const renderPage_1 = list => {
    document.querySelector('.products').innerHTML = list.map(item => renderProduct(item.title, item.price)).join("\n");
};
// или даже так
const renderPage_2 = list => document.querySelector('.products').innerHTML = list.map(item => renderProduct(item.title, item.price)).join("\n");


renderPage(products);  

// тест сокращенных функций
//renderPage_1(products);       
//renderPage_2(products);       