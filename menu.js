

function search() {
    let filter= document.getElementById('find').value.toUpperCase();
    let item = document.querySelectorAll('.card');
    let l = document.getElementsByTagName('p');
    

    for(var i = 0;i<=l.length;i++)
    { 
        let a = item[i].getElementsByTagName('p')[0];
        let value = a.innerHTML || a.innerText || a.textContent;
        if (value.toUpperCase().indexOf(filter) > -1) { 
            item[i].style.display=""; 
        }
        else
        {
            item[i].style.display="none";  
        }  
    }

    const myH1Tags = document.querySelector('h1'); 
    myH1Tags.style.display = 'none';


}

var slideImg=document.getElementById("slideImg");
var images = new Array(
                "/images/m2.jpeg",
                "/images/m1.jpeg",
                "/images/m4.jpeg",
                "/images/m3.jpeg"
);
var len = images.length;
var i = 0;

function slider(){
    if(i > len-1){
        i = 0;
    }
    slideImg.src = images[i];
    i++;
    setTimeout('slider()',3000);
}


/* Cart JS */

let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

cartIcon.onclick = () => {
    cart.classList.add("active");
};

closeCart.onclick = () => {
    cart.classList.remove("active");
};

if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded',ready);
} else{
    ready();
}

function ready(){
    var removecartbuttons = document.getElementsByClassName('cart-remove');
    console.log(removecartbuttons)
    for (var i = 0; i < removecartbuttons.length; i++){
        var button = removecartbuttons[i]
        button.addEventListener('click', removecartitems)
    }

    var quantityInput = document.getElementsByClassName("cart-quantity")
    for (var i = 0; i < quantityInput.length; i++){
        var input = quantityInput[i]
        input.addEventListener("change",quantityChanged);
    }

    var addCart = document.getElementsByClassName("submit")
    for (var i = 0; i < addCart.length; i++){
        var button = addCart[i]
        button.addEventListener("click",addCartClicked);
    }

    document.getElementsByClassName("btn-buy")[0].addEventListener("click", buyButtonClicked);

}

function buyButtonClicked(){
    alert("Your Order is Placed")
    var cartContent = document.getElementsByClassName("cart-content")[0]
    while (cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updatetotal();
}


function removecartitems(event){
    var buttonClicked = event.target
    buttonClicked.parentElement.remove();
    updatetotal();
}

function quantityChanged(event){
    var input = event.target
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1
    }
    updatetotal();
}

function addCartClicked(event){
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName('label-back')[0].innerText;
    var price = shopProducts.getElementsByClassName('price-back')[0].innerText;
    var productImg = shopProducts.getElementsByClassName('product-img')[0].src;
    addProductToCart(title,price,productImg);
    updatetotal();
}

function addProductToCart(title,price,productImg){
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    for (var i = 0; i < cartItemsNames.length; i++){
        if (cartItemsNames[i].innerText == title){
            alert("You have already added this item to cart");
            return;
        }
    }


var cartBoxContent = `
                        <img src="${productImg}" alt="" class="cart-img">
                        <div class="details-box">
                            <div class="cart-product-title">${title}</div>
                            <div class="cart-price">${price}</div>
                            <input type="number" value="1" class="cart-quantity">
                        </div>
                        <img src="/images/trash.png" class="cart-remove">`;

cartShopBox.innerHTML = cartBoxContent;
cartItems.append(cartShopBox);
cartShopBox
    .getElementsByClassName("cart-remove")[0]
    .addEventListener("click",removecartitems);

    cartShopBox
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("click",quantityChanged);
}

function updatetotal(){
    var cartContent = document.getElementsByClassName("cart-content")[0]
    var cartBoxes = cartContent.getElementsByClassName("cart-box")
    var total = 0;
    for (var i = 0; i < cartBoxes.length ; i++){
        var cartBox = cartBoxes[i]
        var priceElement = cartBox.getElementsByClassName("cart-price")[0]
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0]
        var price = parseFloat(priceElement.innerHTML.replace("₹",""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }
        document.getElementsByClassName("total-price")[0].innerHTML = "₹" + total;
        localStorage.setItem("total",total);
    
}



