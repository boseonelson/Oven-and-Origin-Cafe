const defaultUser = {
    name: "Cafe Guest",
    email: "guest@email.com",
    favorite: "Signature Latte"
};

let currentUser = JSON.parse(localStorage.getItem("currentUser")) || defaultUser;
let purchaseHistory = JSON.parse(localStorage.getItem("purchaseHistory")) || [];

function peso(value) {
    return "P" + Number(value).toLocaleString("en-PH");
}

function requireLogin() {
    if (localStorage.getItem("loggedIn") !== "true") {
        window.location.href = "Log in.html";
    }
}

function setUserInfo() {
    document.getElementById("sidebarName").textContent = currentUser.name;
    document.getElementById("heroName").textContent = currentUser.name;
}

function renderHistory() {
    const historyList = document.getElementById("historyList");

    if (!purchaseHistory.length) {
        historyList.innerHTML = `
            <div class="empty-state">
                No purchase history yet. Once you place an order, it will appear here.
            </div>
        `;
        return;
    }

    historyList.innerHTML = purchaseHistory.map((order) => `
        <article class="history-item">
            <div>
                <h4>${order.items.length} item order</h4>
                <p>${order.date}</p>
                <p>${order.items.map((item) => item.name).join(", ")}</p>
            </div>
            <span class="price">${peso(order.total)}</span>
        </article>
    `).join("");
}

function logout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "Log in.html";
}

requireLogin();
setUserInfo();
renderHistory();

document.getElementById("logoutBtn").addEventListener("click", logout);
