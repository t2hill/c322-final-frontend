const mode = 0;

const host_local = "http://localhost:8080";
const host_remote = "https://gim-hw8.onrender.com";

function getHost() {
    return (mode == 0) ? host_local : host_remote;
}

function isLoggedIn() {
    if(localStorage.getItem("token")) {
        return true;
    } else {
        return false;
    }
}

function getTheToken() {
    return localStorage.getItem("token");
}

function saveTheToken(token) {
    localStorage.setItem("token", token);
    updateTheNavigationBar();
}

function removeTheToken() {
    localStorage.removeItem("token");
    updateTheNavigationBar();
}

let configuration = {
    isLoggedIn: () => isLoggedIn(),
    host: () => getHost(),
    token: () => getTheToken()
};

async function login() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let customer = {email: email, password: password}
    let request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(customer)
    };
    try {
        let response = await fetch(getHost() + "/signin", request);
        if (response.status = 200) {
            alert("The login was successful!");
            const token = await response.text();
            saveTheToken(token);
            location.href = "index.html";
        } else {
            console.log(`response status:${response.status}`);
            removeTheToken();
            alert("Something went wrong!");
        }
    }
    catch(error) {
        console.log(error);
        removeTheToken();
        alert("Something went wrong!");
    }
}

async function signup() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let customer = {email:email, password: password}
    let request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(customer)
      };
      try {
        let response = await fetch(getHost() + "/signup", request);
        if(response.status == 200) {  
            alert("The registration was successful!")
            location.href = "index.html";

        } else {
            console.log(`response status:${response.status}`);            
            alert("Something went wrong!");
        }
      }
      catch(error) {
        console.log(error);        
        alert("Something went wrong!");
      }    
}