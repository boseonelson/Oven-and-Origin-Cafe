const defaultAdmin = {
    name: "Admin Staff",
    email: "admin@ovenorigin.com"
};

const defaultSuperAdmin = {
    name: "Super Admin",
    email: "superadmin@ovenorigin.com"
};

const sampleProducts = [
    { name: "Signature Latte", category: "Hot Coffee", price: 350, status: "Available" },
    { name: "Cappuccino", category: "Hot Coffee", price: 330, status: "Available" },
    { name: "Americano", category: "Hot Coffee", price: 330, status: "Available" },
    { name: "Affogato", category: "Hot Coffee", price: 410, status: "Available" },
    { name: "Iced Mocha", category: "Iced Coffee", price: 300, status: "Available" },
    { name: "Iced Coffee", category: "Iced Coffee", price: 250, status: "Available" },
    { name: "Irish Ice Coffee", category: "Iced Coffee", price: 550, status: "Available" },
    { name: "Vietnamese Ice Coffee", category: "Iced Coffee", price: 350, status: "Available" },
    { name: "Cookies & Cream", category: "Milk tea", price: 300, status: "Available" },
    { name: "Dark Chocolate", category: "Milk tea", price: 350, status: "Available" },
    { name: "Matcha", category: "Milk tea", price: 410, status: "Available" },
    { name: "Taro", category: "Milk tea", price: 400, status: "Available" },
    { name: "Butter Croissant", category: "Pastries", price: 320, status: "Available" },
    { name: "Dark Chocolate", category: "Pastries", price: 350, status: "Available" },
    { name: "Artisan Breads", category: "Pastries", price: 290, status: "Available" },
    { name: "Chocolate Cookies", category: "Pastries", price: 280, status: "Available" },
    { name: "Creamy Carbonara", category: "Pasta", price: 160, status: "Available" },
    { name: "Pesto Linguine", category: "Pasta", price: 210, status: "Available" },
    { name: "Seafood Pasta", category: "Pasta", price: 190, status: "Available" },
    { name: "Spaghetti Bolognese", category: "Pasta", price: 160, status: "Available" }
];

const sampleUsers = [
    { name: "Cafe Guest", email: "guest@email.com", role: "Customer", status: "Active" },
    { name: "Admin Staff", email: "admin@ovenorigin.com", role: "Admin Staff", status: "Active" },
    { name: "Super Admin", email: "superadmin@ovenorigin.com", role: "Super Admin", status: "Active" }
];

const defaultAccounts = [
    {
        username: "user",
        password: "user123",
        role: "user",
        name: "Cafe User",
        email: "user@ovenorigin.com",
        status: "Active",
        page: "user-menu.html"
    },
    {
        username: "admin",
        password: "admin123",
        role: "admin",
        name: "Admin Staff",
        email: "admin@ovenorigin.com",
        status: "Active",
        page: "admin-staff-order.html"
    },
    {
        username: "superadmin",
        password: "super123",
        role: "super-admin",
        name: "Super Admin",
        email: "superadmin@ovenorigin.com",
        status: "Active",
        page: "super-user-management.html"
    }
];

let purchaseHistory = JSON.parse(localStorage.getItem("purchaseHistory")) || [];
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || defaultAdmin;
let products = JSON.parse(localStorage.getItem("adminProducts")) || sampleProducts;
let managedAccounts = JSON.parse(localStorage.getItem("managedAccounts")) || defaultAccounts;

function peso(value) {
    return "P" + Number(value).toLocaleString("en-PH");
}

function setAdminInfo(defaultProfile) {
    const sidebarName = document.getElementById("sidebarName");
    const heroName = document.getElementById("heroName");

    if (sidebarName) {
        sidebarName.textContent = defaultProfile.name;
    }

    if (heroName) {
        heroName.textContent = defaultProfile.name;
    }
}

function logout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "Log in.html";
}

function renderAdminOrders() {
    const tableBody = document.getElementById("adminOrderRows");
    const orderCount = document.getElementById("orderCount");
    const revenueTotal = document.getElementById("revenueTotal");
    const total = purchaseHistory.reduce((sum, order) => sum + Number(order.total), 0);

    if (orderCount) {
        orderCount.textContent = purchaseHistory.length;
    }

    if (revenueTotal) {
        revenueTotal.textContent = peso(total);
    }

    if (!tableBody) {
        return;
    }

    if (!purchaseHistory.length) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="4">No customer orders yet.</td>
            </tr>
        `;
        return;
    }

    tableBody.innerHTML = purchaseHistory.map((order, index) => `
        <tr>
            <td>#${index + 1}</td>
            <td>${order.items.map((item) => item.name).join(", ")}</td>
            <td>${peso(order.total)}</td>
            <td><span class="status-pill">Placed</span></td>
        </tr>
    `).join("");
}

function renderCustomerReport() {
    const tableBody = document.getElementById("customerRows");
    const customerName = currentUser.name || "Cafe Guest";
    const orderTotal = purchaseHistory.length;
    const spentTotal = purchaseHistory.reduce((sum, order) => sum + Number(order.total), 0);

    document.getElementById("customerCount").textContent = orderTotal ? "1" : "0";
    document.getElementById("customerOrders").textContent = orderTotal;

    tableBody.innerHTML = orderTotal ? `
        <tr>
            <td>${customerName}</td>
            <td>${currentUser.email || "guest@email.com"}</td>
            <td>${orderTotal}</td>
            <td>${peso(spentTotal)}</td>
        </tr>
    ` : `
        <tr>
            <td colspan="4">No customer report data yet.</td>
        </tr>
    `;
}

function renderProducts() {
    const tableBody = document.getElementById("productRows");

    if (!products.length) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="5">No products yet. Add one using the form above.</td>
            </tr>
        `;
        return;
    }

    tableBody.innerHTML = products.map((product, index) => `
        <tr>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>${peso(product.price)}</td>
            <td><span class="status-pill">${product.status}</span></td>
            <td>
                <button class="delete-product" type="button" data-index="${index}">Delete</button>
            </td>
        </tr>
    `).join("");
}

function saveProducts() {
    localStorage.setItem("adminProducts", JSON.stringify(products));
}

function addProduct(event) {
    event.preventDefault();

    const nameInput = document.getElementById("productName");
    const categoryInput = document.getElementById("productCategory");
    const priceInput = document.getElementById("productPrice");
    const statusInput = document.getElementById("productStatus");

    products.push({
        name: nameInput.value.trim(),
        category: categoryInput.value.trim(),
        price: Number(priceInput.value),
        status: statusInput.value
    });

    saveProducts();
    renderProducts();
    event.target.reset();
}

function deleteProduct(index) {
    products.splice(index, 1);
    saveProducts();
    renderProducts();
}

function renderUsers() {
    const tableBody = document.getElementById("userRows");
    const visibleUsers = managedAccounts.map((account) => ({
        name: account.name,
        email: account.email,
        role: account.role === "user" ? "Customer" : account.role === "admin" ? "Admin Staff" : "Super Admin",
        status: account.status
    }));

    tableBody.innerHTML = visibleUsers.map((user) => `
        <tr>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td><span class="status-pill">${user.status}</span></td>
        </tr>
    `).join("");
}

function renderFinancials() {
    const orderTotal = purchaseHistory.length;
    const revenue = purchaseHistory.reduce((sum, order) => sum + Number(order.total), 0);

    document.getElementById("financialOrders").textContent = orderTotal;
    document.getElementById("financialRevenue").textContent = peso(revenue);
    document.getElementById("financialAverage").textContent = orderTotal ? peso(revenue / orderTotal) : peso(0);
}

function saveManagedAccounts() {
    localStorage.setItem("managedAccounts", JSON.stringify(managedAccounts));
}

function renderAccountTools() {
    const adminRows = document.getElementById("adminAccountRows");
    const userRows = document.getElementById("userAccountRows");
    const auditSummary = document.getElementById("auditSummary");

    const adminAccounts = managedAccounts.filter((account) => account.role === "admin");
    const userAccounts = managedAccounts.filter((account) => account.role === "user");
    const activeAccounts = managedAccounts.filter((account) => account.status === "Active").length;

    adminRows.innerHTML = adminAccounts.length ? adminAccounts.map((account) => renderAccountRow(account)).join("") : `
        <tr>
            <td colspan="4">No admin staff accounts.</td>
        </tr>
    `;

    userRows.innerHTML = userAccounts.length ? userAccounts.map((account) => renderAccountRow(account)).join("") : `
        <tr>
            <td colspan="4">No user accounts.</td>
        </tr>
    `;

    auditSummary.textContent = `${managedAccounts.length} total accounts, ${activeAccounts} active, ${purchaseHistory.length} orders, and ${products.length} products saved in localStorage.`;
}

function renderAccountRow(account) {
    const kickText = account.status === "Active" ? "Kick" : "Restore";

    return `
        <tr>
            <td>${account.name}</td>
            <td>${account.username}</td>
            <td><span class="status-pill">${account.status}</span></td>
            <td>
                <div class="account-actions">
                    <button class="kick-account" type="button" data-username="${account.username}">${kickText}</button>
                    <button class="delete-account" type="button" data-username="${account.username}">Delete</button>
                </div>
            </td>
        </tr>
    `;
}

function addAdminAccount(event) {
    event.preventDefault();

    const name = document.getElementById("adminDisplayName").value.trim();
    const username = document.getElementById("adminUsername").value.trim().toLowerCase();
    const password = document.getElementById("adminPassword").value.trim();

    if (managedAccounts.some((account) => account.username === username)) {
        alert("Username already exists.");
        return;
    }

    managedAccounts.push({
        username,
        password,
        role: "admin",
        name,
        email: `${username}@ovenorigin.com`,
        status: "Active",
        page: "admin-staff-order.html"
    });

    saveManagedAccounts();
    renderAccountTools();
    event.target.reset();
}

function toggleAccountStatus(username) {
    const account = managedAccounts.find((item) => item.username === username);

    if (!account) {
        return;
    }

    account.status = account.status === "Active" ? "Kicked" : "Active";
    saveManagedAccounts();
    renderAccountTools();
}

function deleteAccount(username) {
    managedAccounts = managedAccounts.filter((account) => account.username !== username);
    saveManagedAccounts();
    renderAccountTools();
}

document.getElementById("logoutBtn").addEventListener("click", logout);

const page = document.body.dataset.page;

if (page && page.startsWith("super")) {
    setAdminInfo(defaultSuperAdmin);
} else {
    setAdminInfo(defaultAdmin);
}

if (page === "admin-orders") {
    renderAdminOrders();
}

if (page === "customer-report") {
    renderCustomerReport();
}

if (page === "product-management") {
    renderProducts();

    document.getElementById("productForm").addEventListener("submit", addProduct);
    document.getElementById("productRows").addEventListener("click", (event) => {
        if (event.target.classList.contains("delete-product")) {
            deleteProduct(Number(event.target.dataset.index));
        }
    });
}

if (page === "super-users") {
    renderUsers();
}

if (page === "super-financial") {
    renderFinancials();
}

if (page === "super-tools") {
    renderAccountTools();

    document.getElementById("adminAccountForm").addEventListener("submit", addAdminAccount);
    document.getElementById("adminAccountRows").addEventListener("click", (event) => {
        if (event.target.classList.contains("kick-account")) {
            toggleAccountStatus(event.target.dataset.username);
        }

        if (event.target.classList.contains("delete-account")) {
            deleteAccount(event.target.dataset.username);
        }
    });
    document.getElementById("userAccountRows").addEventListener("click", (event) => {
        if (event.target.classList.contains("kick-account")) {
            toggleAccountStatus(event.target.dataset.username);
        }

        if (event.target.classList.contains("delete-account")) {
            deleteAccount(event.target.dataset.username);
        }
    });
}
