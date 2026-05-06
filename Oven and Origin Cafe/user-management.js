const defaultUser = {
    name: "Cafe Guest",
    email: "guest@email.com",
    favorite: "Signature Latte"
};

function getUser() {
    return JSON.parse(localStorage.getItem("currentUser")) || defaultUser;
}

function requireLogin() {
    if (localStorage.getItem("loggedIn") !== "true") {
        window.location.href = "Log in.html";
    }
}

function setUserInfo() {
    const currentUser = getUser();

    const sidebarName = document.getElementById("sidebarName");
    const heroName = document.getElementById("heroName");

    const nameInput = document.getElementById("accountName");
    const favoriteInput = document.getElementById("accountFavorite");

    if (sidebarName) sidebarName.textContent = currentUser.name;
    if (heroName) heroName.textContent = currentUser.name;

    if (nameInput) nameInput.value = currentUser.name;
    if (favoriteInput) favoriteInput.value = currentUser.favorite;
}

function saveUser() {
    const currentUser = getUser();

    const updatedUser = {
        name: document.getElementById("accountName").value.trim() || currentUser.name,
        email: currentUser.email,
        favorite: document.getElementById("accountFavorite").value.trim() || currentUser.favorite
    };

    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    setUserInfo();
    alert("Account details saved.");
}

function logout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "Log in.html";
}

document.addEventListener("DOMContentLoaded", () => {
    requireLogin();
    setUserInfo();

    const form = document.getElementById("accountForm");
    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            saveUser();
        });
    }

    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", logout);
    }
});