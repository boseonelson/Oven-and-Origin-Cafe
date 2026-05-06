const defaultUser = {
    name: "Cafe Guest",
    email: "guest@email.com",
    favorite: "Signature Latte"
};

const menuItems = [
    {
        category: "Hot Coffee",
        items: [
            { name: "Signature Latte", price: 140, image: "Signature Latte.png", description: "Perfectly crafted with rich espresso and velvety steamed milk" },
            { name: "Cappuccino", price: 127, image: "Cappuccino.webp", description: "Classic Italian espresso with foamed milk and cocoa dust" },
            { name: "Americano", price: 137, image: "Americano.webp", description: "Espresso diluted with hot water" },
            { name: "Affogato", price: 135, image: "Affogato.jpg", description: "Hot espresso poured over cold vanilla ice cream" }
        ]
    },
    {
        category: "Iced Coffee",
        items: [
            { name: "Iced Mocha", price: 120, image: "ice mocha.jpg", description: "Rich chocolate and espresso over ice with whipped cream" },
            { name: "Iced Coffee", price: 122, image: "Iced coffee.webp", description: "Cold brew perfection served over ice, smooth and refreshing" },
            { name: "Irish Ice Coffee", price: 142, image: "Irish Iced Coffee.webp", description: "Iced coffee with Irish cream and a touch of whiskey flavor" },
            { name: "Vietnamese Ice Coffee", price: 137, image: "vietnamese iced coffee.jpg", description: "Strong coffee with sweetened condensed milk over ice" }
        ]
    },
    {
        category: "Milk tea",
        items: [
            { name: "Cookies & Cream", price: 110, image: "cookies and cream.webp", description: "Creamy milk tea blended with crushed Oreo cookies and whipped cream" },
            { name: "Dark Chocolate", price: 105, image: "dark chocolate.jpg", description: "Rich dark chocolate blended with milk tea and boba pearls" },
            { name: "Matcha", price: 125, image: "matcha.jpg", description: "Premium Japanese green tea with silky milk" },
            { name: "Taro", price: 119, image: "taro.jpg", description: "Creamy purple delight with sweet taro flavor" }
        ]
    },
    {
        category: "Pastries",
        items: [
            { name: "Butter Croissant", price: 145, image: "Butter Croissant.jpg", description: "Flaky, buttery layers of French pastry perfection" },
            { name: "Dark Chocolate", price: 132, image: "Dark Chocolat.jpg", description: "Premium dark chocolate cube dessert, rich and indulgent" },
            { name: "Artisan Breads", price: 126, image: "Artisan Breads.jpg", description: "Freshly baked daily with premium ingredients" },
            { name: "Chocolate Cookies", price: 136, image: "Chocolate Cookies.jpg", description: "Rich chocolate cookies, perfect with coffee" }
        ]
    },
    {
        category: "Pasta",
        items: [
            { name: "Creamy Carbonara", price: 160, image: "Carbonara.jpg", description: "Classic Roman pasta with pancetta, egg, and pecorino" },
            { name: "Pesto Linguine", price: 150, image: "Pesto.jpg", description: "Fresh basil pesto with pine nuts and parmesan" },
            { name: "Seafood Pasta", price: 140, image: "Seafood.jpg", description: "Fresh clams and mussels in white wine sauce" },
            { name: "Spaghetti Bolognese", price: 160, image: "Spaghetti.jpg", description: "Traditional Italian meat sauce with rich tomato and herbs" }
        ]
    }
];

let currentUser = JSON.parse(localStorage.getItem("currentUser")) || defaultUser;
let cart = JSON.parse(localStorage.getItem("cart")) || [];

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
    if (!name || !price) return;

    let currentUser = JSON.parse(localStorage.getItem("currentUser")) || {
        name: "Cafe Guest"
    };

    cart.push({
        user: currentUser.name,  
        name: name,             
        price: Number(price)     
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`${name} added to order!`);
}

requireLogin();
setUserInfo();
renderMenu();

document.getElementById("userMenuGrid").addEventListener("click", (event) => {
    const btn = event.target.closest(".add-menu-item");
    if (!btn) return;

    event.preventDefault();

    addMenuItem(btn.dataset.name, btn.dataset.price);
});

document.addEventListener("DOMContentLoaded", () => {
    const logoutBtn = document.getElementById("logoutBtn");

    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("loggedIn"); 
            window.location.href = "Log in.html";
        });
    }
});
