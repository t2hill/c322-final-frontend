function isCarted() {
    if(localStorage.getItem("cart")) {
        let cart = document.getElementById("cart") 
        cart.nodeValue = 1;
        return true;
    } else {
        let cart = document.getElementById("cart") 
        cart.nodeValue = 0;
        return false;
    }
}

function getTheCart() {
    return localStorage.getItem("cart");
}

function saveTheCart(cart) {
    localStorage.setItem("cart", cart);
    updateTheNavigationBar();
}

function removeTheCart() {
    localStorage.removeItem("cart");
    updateTheNavigationBar();
}
