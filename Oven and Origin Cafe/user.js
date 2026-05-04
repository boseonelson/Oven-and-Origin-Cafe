const navButtons = document.querySelectorAll(".side-link[data-page]");
const panels = document.querySelectorAll(".panel");
const logoutBtn = document.getElementById("logoutBtn");
const checkoutBtn = document.getElementById("checkoutBtn");
const accountForm = document.getElementById("accountForm");
const openMenuButtons = document.querySelectorAll("[data-open-menu]");

const menuItems = [
    {
        category: "Hot Coffee",
        items: [
            { name: "Signature Latte", price: 350, image: "Signature Latte.png", description: "Perfectly crafted with rich espresso and velvety steamed milk" },
            { name: "Cappuccino", price: 330, image: "Cappuccino.webp", description: "Classic Italian espresso with foamed milk and cocoa dust" },
            { name: "Americano", price: 330, image: "Americano.webp", description: "Espresso diluted with hot water" },
            { name: "Affogato", price: 410, image: "Affogato.jpg", description: "Hot espresso poured over cold vanilla ice cream" }
        ]
    },
    {
        category: "Iced Coffee",
        items: [
            { name: "Iced Mocha", price: 300, image: "ice mocha.jpg", description: "Rich chocolate and espresso over ice with whipped cream" },
            { name: "Iced Coffee", price: 250, image: "Iced coffee.webp", description: "Cold brew perfection served over ice, smooth and refreshing" },
            { name: "Irish Ice Coffee", price: 550, image: "Irish Iced Coffee.webp", description: "Iced coffee with Irish cream and a touch of whiskey flavor" },
            { name: "Vietnamese Ice Coffee", price: 350, image: "vietnamese iced coffee.jpg", description: "Strong coffee with sweetened condensed milk over ice" }
        ]
    },
    {
        category: "Milk tea",
        items: [
            { name: "Cookies & Cream", price: 300, image: "cookies and cream.webp", description: "Creamy milk tea blended with crushed Oreo cookies and whipped cream" },
            { name: "Dark Chocolate", price: 350, image: "dark chocolate.jpg", description: "Rich dark chocolate blended with milk tea and boba pearls" },
            { name: "Matcha", price: 410, image: "matcha.jpg", description: "Premium Japanese green tea with silky milk" },
            { name: "Taro", price: 400, image: "taro.jpg", description: "Creamy purple delight with sweet taro flavor" }
        ]
    },
    {
        category: "Pastries",
        items: [
            { name: "Butter Croissant", price: 320, image: "Butter Croissant.jpg", description: "Flaky, buttery layers of French pastry perfection" },
            { name: "Dark Chocolate", price: 350, image: "Dark Chocolat.jpg", description: "Premium dark chocolate cube dessert, rich and indulgent" },
            { name: "Artisan Breads", price: 290, image: "Artisan Breads.jpg", description: "Freshly baked daily with premium ingredients" },
            { name: "Chocolate Cookies", price: 280, image: "Chocolate Cookies.jpg", description: "Rich chocolate cookies, perfect with coffee" }
        ]
    },
    {
        category: "Pasta",
        items: [
            { name: "Creamy Carbonara", price: 160, image: "Carbonara.jpg", description: "Classic Roman pasta with pancetta, egg, and pecorino" },
            { name: "Pesto Linguine", price: 210, image: "Pesto.jpg", description: "Fresh basil pesto with pine nuts and parmesan" },
            { name: "Seafood Pasta", price: 190, image: "Seafood.jpg", description: "Fresh clams and mussels in white wine sauce" },
            { name: "Spaghetti Bolognese", price: 160, image: "Spaghetti.jpg", description: "Traditional Italian meat sauce with rich tomato and herbs" }
        ]
    }
];

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

function saveUser() {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
}

function setUserInfo() {
    document.getElementById("sidebarName").textContent = currentUser.name;
    document.getElementById("heroName").textContent = currentUser.name;
    document.getElementById("accountName").value = currentUser.name;
    document.getElementById("accountEmail").value = currentUser.email;
    document.getElementById("accountFavorite").value = currentUser.favorite || "";
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

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function renderMenu() {
    const userMenuGrid = document.getElementById("userMenuGrid");

    userMenuGrid.innerHTML = menuItems.map((group) => `
        <div class="menu-category">
            <h4>${group.category}</h4>
            <div class="menu-card-grid">
                ${group.items.map((item) => `
                    <article class="menu-card">
                        <div class="menu-card-image">
                            <img src="${item.image}" alt="${item.name}">
                            <span>${peso(item.price)}</span>
                        </div>
                        <div class="menu-card-info">
                            <h5>${item.name}</h5>
                            <p>${item.description}</p>
                            <button class="add-menu-item" type="button" data-name="${item.name}" data-price="${item.price}">Add Order</button>
                        </div>
                    </article>
                `).join("")}
            </div>
        </div>
    `).join("");
}

function addMenuItem(name, price) {
    cart.push({ name, price: Number(price) });
    saveCart();
    renderCart();
    showPanel("orders");
}

function removeCartItem(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
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

function showPanel(pageId) {
    panels.forEach((panel) => {
        panel.classList.toggle("active", panel.id === pageId);
    });

    navButtons.forEach((button) => {
        button.classList.toggle("active", button.dataset.page === pageId);
    });
}

navButtons.forEach((button) => {
    button.addEventListener("click", () => showPanel(button.dataset.page));
});

openMenuButtons.forEach((button) => {
    button.addEventListener("click", () => showPanel("menu"));
});

document.getElementById("userMenuGrid").addEventListener("click", (event) => {
    if (!event.target.classList.contains("add-menu-item")) {
        return;
    }

    addMenuItem(event.target.dataset.name, event.target.dataset.price);
});

document.getElementById("orderList").addEventListener("click", (event) => {
    if (!event.target.classList.contains("remove-order")) {
        return;
    }

    removeCartItem(Number(event.target.dataset.index));
});

checkoutBtn.addEventListener("click", () => {
    if (!cart.length) {
        alert("Your order list is empty.");
        return;
    }

    const total = cart.reduce((sum, item) => sum + Number(item.price), 0);
    const order = {
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

    renderCart();
    renderHistory();
    showPanel("history");
    alert("Order placed successfully!");
});

accountForm.addEventListener("submit", (event) => {
    event.preventDefault();

    currentUser = {
        name: document.getElementById("accountName").value.trim() || defaultUser.name,
        email: document.getElementById("accountEmail").value.trim() || defaultUser.email,
        favorite: document.getElementById("accountFavorite").value.trim()
    };

    saveUser();
    setUserInfo();
    alert("Account details saved.");
});

logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("loggedIn");
    window.location.href = "Log in.html";
});

if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "Log in.html";
}

setUserInfo();
renderMenu();
renderCart();
renderHistory();
