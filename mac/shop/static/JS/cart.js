cart_count = document.getElementById('cart_value').innerText
document.getElementById('cart').innerText = cart_count

var products_price = document.querySelectorAll('.product__price')
var products_count = document.querySelectorAll('._253qQJ')

for(var i = 0; i < products_price.length; i++){
//    console.log(products_price[i].innerHTML.substring(2) )
    products_price[i].innerHTML='&#8377; '+(parseInt(products_price[i].innerHTML.substring(2)) * parseInt(products_count[i].value));
}