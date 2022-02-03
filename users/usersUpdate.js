function updateUser(user) {
    const tableRowToUpdate = document.getElementById(user.id);

    tableRowToUpdate.innerHTML = `
        <td>
            <input id="update-user-description-${user.id}" value="${escapeHTML(user.description)}">
        </td>
        </td>
       <td>
            <button class="button" id="cancel-update-${user.id}">Cancel</button>
            <button class="button" id="update-${user.id}">✅</button>
       </td>
       <td>
            <button onclick="deleteUser(${user.id})">❌</button>
       </td>
    `;
    document.getElementById(`cancel-update-${user.id}`)
        .addEventListener("click", () => undoUpdateTableRow(user));
    document.getElementById(`update-${user.id}`)
        .addEventListener("click", () => updateUserInBackend(user));
}

function undoUpdateTableRow(user) {
    const userTableRow = document.getElementById(user.id);
    createUserTableRow(userTableRow, user);
}

function updateUserInBackend(user) {
    const tableRowToUpdate = document.getElementById(user.id);

    const userToUpdate = {
            username: user.username,
            userDescription: document.getElementById(`update-user-description-${user.id}`).value
        };
                console.log("det her er post to update", userToUpdate)
                fetch(localURL + "/users/" + user.id, {
                    method: "PATCH",
                    headers: { "Content-type": "application/json; charset=UTF-8" },
                    body: JSON.stringify(userToUpdate)
                }).then(response => {
                    if (response.status === 200) {
                        createUserTableRow(tableRowToUpdate, userToUpdate);
                    }
                });
}