const defaultUser = {
    name: "Cafe Guest",
    email: "guest@email.com",
    favorite: "Signature Latte"
};

let currentUser = JSON.parse(localStorage.getItem("currentUser")) || defaultUser;
let cart = JSON.parse(localStorage.getItem("cart")) || [];
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

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function renderCart() {
    const orderList = document.getElementById("orderList");
    const cartTotal = document.getElementById("cartTotal");
    const total = cart.reduce((sum, item) => sum + Number(item.price), 0);

    cartTotal.textContent = peso(total);

    if (!cart.length) {
        orderList.innerHTML = `
            <div class="empty-state">
                Your order list is empty. Pick your coffee, pastry, milk tea, or pasta from the menu.
            </div>
        `;
        return;
    }

    orderList.innerHTML = cart.map((item, index) => `
        <article class="order-item">
            <div>
                <h4>${index + 1}. ${item.name}</h4>
                <p>Ready to place with your cafe account.</p>
            </div>
            <div class="order-controls">
                <span class="price">${peso(item.price)}</span>
                <button class="remove-order" type="button" data-index="${index}">Remove</button>
            </div>
        </article>
    `).join("");
}

function removeCartItem(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
}

function placeOrder() {
    if (!cart.length) {
        alert("Your order list is empty.");
        return;
    }

    let currentUser = JSON.parse(localStorage.getItem("currentUser")) || {
        name: "Cafe Guest",
        email: "guest@email.com"
    };

    const total = cart.reduce((sum, item) => sum + Number(item.price), 0);

    const order = {
        customer: currentUser.name,   
        email: currentUser.email,
        date: new Date().toLocaleString("en-PH", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit"
        }),
        items: cart,
        total
    };

    purchaseHistory.unshift(order);
    localStorage.setItem("purchaseHistory", JSON.stringify(purchaseHistory));

    localStorage.removeItem("cart");
    cart = [];

    alert("Order placed successfully!");
    window.location.href = "user-history.html";
}

function logout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "Log in.html";
}

requireLogin();
setUserInfo();
renderCart();

document.getElementById("orderList").addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-order")) {
        removeCartItem(Number(event.target.dataset.index));
    }
});

document.getElementById("checkoutBtn").addEventListener("click", placeOrder);
document.getElementById("logoutBtn").addEventListener("click", logout);
