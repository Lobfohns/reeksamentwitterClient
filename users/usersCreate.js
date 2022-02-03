const userFormParentDiv = document.getElementById("create-user-form");
const userFormExpandButton = document.getElementById("expand-user-form");

const createUserForm = `<div>
    <input id="create-user-name" placeholder="User name">
    <input id="create-user-description" placeholder="User description">
    <button class="button" id="CancelButton"   onclick="removeUserForm()">Cancel</button>
    <button class="button" id="CreateButton"  onclick="createUser()">Create A New User</button>
</div>`;

function showUserForm() {
    userFormExpandButton.style.display = "none";
    userFormParentDiv.innerHTML = createUserForm;
}

function removeUserForm() {
    userFormExpandButton.style.display = "block";
    userFormParentDiv.innerHTML = "";
}

function createUser() {
    const userToCreate = {
        username: document.getElementById("create-user-name").value,
        userDescription: document.getElementById("create-user-description").value
    };

    fetch(localURL + "/users/", {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify(userToCreate)
    }).then(response => response.json())
        .then(user => {
            removeUserForm();
            addUserToDivList(user)
        }).catch(error => console.log(error));
}

document.getElementById("expand-user-form")
    .addEventListener("click", showUserForm);
