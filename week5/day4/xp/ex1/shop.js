const products = require('./products.js');
function getProducts(name) { 
    const product = products.find(product => product.name === name);
    console.log(product);
}
getProducts('Product 1');
getProducts('Product 2');
