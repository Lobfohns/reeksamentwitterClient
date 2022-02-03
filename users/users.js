const userDiv = document.getElementById("user-names-list-tbody")

fetch(localURL + "/users")
    .then(response => response.json())
    .then(users => {
        console.log("Users", users);
        users.map(addUserToDivList);
    })

function addUserToDivList(user){
    const selectUserToDiv = document.createElement("tr");
    selectUserToDiv.id = user.id;
    userDiv.appendChild(selectUserToDiv);
    createUserTableRow(selectUserToDiv, user)
}

function createUserTableRow(divElement, user){
    console.log("divelement,", user);
    divElement.innerHTML = `
             <td>
                <p class="row-user-username">${escapeHTML(user.username)}</p>
            </td>    
            <td>
                <p class="row-user-description">${escapeHTML(user.userDescription)}</p>
            </td>     
              <td>
                <button class="button" id="update-button-${user.id}">Update</button>            
            </td> 
             <td>
                <button onclick="deleteUser(${user.id})">❌</button>            
            </td>
            
        `;
    document.getElementById(`update-button-${user.id}`)
        .addEventListener("click", () => updateUser(user));
}


function deleteUser(userId) {
    fetch(localURL + "/users/" + userId, {
        method: "DELETE"
    }).then(response => {
        if (response.status === 200) {
            document.getElementById(userId).remove();
        } else {
            console.log(response.status);
        }
    });
}

function searchFunction() {
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("username-search");
    filter = input.value.toUpperCase();
    table = document.getElementById("user-table");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}