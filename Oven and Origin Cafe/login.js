const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const nameInput = document.getElementById("name");
    const passwordInput = document.getElementById("password");
    const username = nameInput.value.trim().toLowerCase();
    const password = passwordInput.value.trim();
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
    const accounts = JSON.parse(localStorage.getItem("managedAccounts")) || defaultAccounts;
    const account = accounts.find((item) => item.username === username && item.password === password);

    if (!account) {
        alert("Incorrect username or password. Check the login guide.");
        return;
    }

    if (account.status !== "Active") {
        alert("This account is currently kicked or disabled.");
        return;
    }

    localStorage.setItem("managedAccounts", JSON.stringify(accounts));

    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("userRole", account.role);
    localStorage.setItem("currentUser", JSON.stringify({
        name: account.name,
        email: account.email,
        favorite: "Signature Latte"
    }));

    window.location.href = account.page;
});
