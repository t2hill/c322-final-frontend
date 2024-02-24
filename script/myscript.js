
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
    console.log(localStorage.getItem("condiments"));
}

if (document.getElementById('orderMenu')) {
    window.onload = setElements;
}

// ORDER STATUS
function getReceipt() {
    let host = "http://localhost:8080";
    let receipt = document.getElementById("getReceipt");
    receipt.innerHTML = "";
    let title = document.createElement("h2");
    let titleVal = document.createTextNode("Order Placed:");
    title.appendChild(titleVal);
    receipt.appendChild(title);

    let id = document.createElement("h2");
    let idVal = document.createTextNode("Order id: 1");  // Would link to backend and grab this value
    id.appendChild(idVal);
    receipt.appendChild(id);

    let cond = document.createElement("h2");
    let condiments = JSON.parse(localStorage.getItem("condiments"));
    let condStr = localStorage.getItem("beverage") + " with ";
    for (let c of condiments) {
        condStr += c + " and ";
    } 
    let condVal = document.createTextNode(condStr.slice(0, -5) + "!")
    cond.appendChild(condVal);
    receipt.appendChild(cond);

    let total = document.createElement("h2");
    let totalVal = document.createTextNode("Total: $X");
    total.appendChild(totalVal);
    receipt.appendChild(total);
}

if (document.getElementById('getReceipt')) {
    window.onload = getReceipt;
}