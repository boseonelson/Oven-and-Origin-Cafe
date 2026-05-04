const defaultUser = {
    name: "Cafe Guest",
    email: "guest@email.com",
    favorite: "Signature Latte"
};

let currentUser = JSON.parse(localStorage.getItem("currentUser")) || defaultUser;

function requireLogin() {
    if (localStorage.getItem("loggedIn") !== "true") {
        window.location.href = "Log in.html";
    }
}

function setUserInfo() {
    document.getElementById("sidebarName").textContent = currentUser.name;
    document.getElementById("heroName").textContent = currentUser.name;
    document.getElementById("accountName").value = currentUser.name;
    document.getElementById("accountEmail").value = currentUser.email;
    document.getElementById("accountFavorite").value = currentUser.favorite || "";
}

function saveUser() {
    currentUser = {
        name: document.getElementById("accountName").value.trim() || defaultUser.name,
        email: document.getElementById("accountEmail").value.trim() || defaultUser.email,
        favorite: document.getElementById("accountFavorite").value.trim()
    };

    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    setUserInfo();
    alert("Account details saved.");
}

function logout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "Log in.html";
}

requireLogin();
setUserInfo();

document.getElementById("accountForm").addEventListener("submit", (event) => {
    event.preventDefault();
    saveUser();
});

document.getElementById("logoutBtn").addEventListener("click", logout);
