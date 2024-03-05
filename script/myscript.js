// HOMEPAGE
function clearCondiments() {
    localStorage.setItem("condiments", JSON.stringify(""));
    localStorage.setItem("beverage", "");
}

// BEVERAGES
function setBeverage(buttonValue) {
    localStorage.setItem("beverage", buttonValue);
}

// CONDIMENTS
function addCondiment(buttonValue) {
    let condiments = JSON.parse(localStorage.getItem("condiments"))  || [];
    condiments.push(buttonValue);
    console.log(condiments);
    localStorage.setItem("condiments", JSON.stringify(condiments));
}
function removeCondiment(buttonValue) {
    let condiments = JSON.parse(localStorage.getItem("condiments"))  || [];
    const index = condiments.indexOf(buttonValue);
    if (index > -1) {
        condiments.splice(index, 1);
    }
    localStorage.setItem("condiments", JSON.stringify(condiments));
}

function setElements() {
    // Beverage
    let order = document.getElementById("orderMenu");
    order.innerHTML = "";
    let bevLink = document.createElement("a");
    bevLink.setAttribute("href", "selectBeverage.html");
    let bevButton = document.createElement("button");
    let bevName = document.createTextNode(localStorage.getItem("beverage"));
    bevButton.appendChild(bevName);
    bevLink.appendChild(bevButton);
    order.appendChild(bevLink);
    console.log(localStorage.getItem("beverage"));
    console.log(localStorage.getItem("condiments"));

    // Condiments
    for (let cond of JSON.parse(localStorage.getItem("condiments"))) {
        let conLink = document.createElement("a");
        conLink.setAttribute("href", "addCondiment.html");
        let conButton = document.createElement("button");
        let func = "removeCondiment('" + cond + "')";
        conButton.setAttribute("onclick", func);
        let conName = document.createTextNode(cond);
        conButton.appendChild(conName);
        conLink.appendChild(conButton);
        order.appendChild(conLink);
    }
}

async function addReceipt() {
    // let host = "http://localhost:8080";
    let host = "https://coffee-order-kgpi.onrender.com";
    let message = "";
    let orderData = {beverage: localStorage.getItem("beverage"), 
                    condiments: JSON.parse(localStorage.getItem("condiments"))};
    console.log(JSON.stringify(orderData));


    // build request
    let request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData)
    };

    try {
        let response = await fetch(host + "/orders", request);
        if (response.status == 201) {
                message = "The receipt was added to the system \n\n" + JSON.stringify(orderData);
            } 
    } catch (error) {
        message = "The following error occurred:\n" + error + "\n\nPlease try again or contact the customer support team";
    }
    alert(message);   
    console.log(message)
    // Change the page
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace("addCondiment.html", "orderStatus.html");
    setTimeout(() => {
        window.location.href = newPath;
        }, 1500);
    
}

// ORDER STATUS
async function getReceipt() {
    // let host = "http://localhost:8080";
    let host = "https://coffee-order-kgpi.onrender.com";
    let request = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    };
    let url = host + "/orders";
    try {
        let response = await fetch(url, request);
        let result = await response.json();
        console.log(result);

        // Order Placed: 
        let receipt = document.getElementById("getReceipt");
        receipt.innerHTML = "";
        let title = document.createElement("h2");
        let titleVal = document.createTextNode("Order Placed:");
        title.appendChild(titleVal);
        receipt.appendChild(title);

        let id = document.createElement("h2");
        let idVal = document.createTextNode("Order id: " + result.id);  // Would link to backend and grab this value
        id.appendChild(idVal);
        receipt.appendChild(id);

        let cond = document.createElement("h2");
        let condVal = document.createTextNode(result.description)
        cond.appendChild(condVal);
        receipt.appendChild(cond);

        let total = document.createElement("h2");
        let totalVal = document.createTextNode("Total: $" + result.cost);
        total.appendChild(totalVal);
        receipt.appendChild(total);

    } catch (error) {
        let message = "The following error occurred:\n" + error + "\n\nPlease try again or contact the customer support team";
        alert(message);
    }
}


// When to load pages
if (document.getElementById('orderMenu')) {
    window.onload = setElements;
}
if (document.getElementById('getReceipt')) {
    window.onload = getReceipt;
}
// || 'https://t2hill.github.io/coffee-order-ui/index.html'
if (window.location.href === 'file:///C:/Users/toohi/Documents/C322/coffee-order-ui/index.html' || window.location.href == 'https://t2hill.github.io/coffee-order-ui/index.html') {
    localStorage.setItem("condiments", "");
}