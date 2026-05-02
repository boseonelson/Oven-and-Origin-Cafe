<script>
let members = JSON.parse(localStorage.getItem("members")) || [];

function displayMembers() {
    let container = document.getElementById("members");
    container.innerHTML = "";

    members.forEach(m => {
        container.innerHTML += `
            <div class="card">
                <img src="${m.image}">
                <h3>${m.name}</h3>
                <p>${m.position}</p>
            </div>
        `;
    });
}

function addMember() {
    let name = document.getElementById("name").value;
    let image = document.getElementById("image").value;
    let position = document.getElementById("position").value;

    if (!name || !image || !position) {
        alert("Fill all fields!");
        return;
    }

    members.push({ name, image, position });
    localStorage.setItem("members", JSON.stringify(members));

    displayMembers();
}

displayMembers();
</script>