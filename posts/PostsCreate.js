const postFormParentDiv = document.getElementById("create-post-form");
const postFormExpandButton = document.getElementById("expand-post-form");
let allUsers;

const createUserForm = `<div>
    <input id="create-post-text" placeholder="Post text">
    <label id="label" >Choose hashtag below</label>
    <select id="hashtag-dropdown"> 
    </select>  
    <label id="label" >Choose author below</label>
    <select id="author-dropdown"> 
    </select>  
    <button class="button" id="CancelButton"   onclick="removePostForm()">Cancel</button>
    <button class="button" id="CreateButton"  onclick="createPost()">Create A New Post</button>
</div>`;

fetch(localURL + "/users")
    .then(response => response.json())
    .then(users => {
        console.log("Users", users);
        allUsers = users;
    })

function showPostForm() {
    postFormExpandButton.style.display = "none";
    postFormParentDiv.innerHTML = createUserForm;
    allUsers.map(user => {
        const optionElement = document.createElement("option")
        optionElement.innerHTML = user.username
        optionElement.value = user.id
        optionElement.id = user.id
        document.getElementById("author-dropdown").appendChild(optionElement);
    })
    allHashtags.map(hashtag => {
        const optionElement2 = document.createElement("option")
        optionElement2.innerHTML = hashtag.hashtagName
        optionElement2.value = hashtag.id
        optionElement2.id = hashtag.id
        document.getElementById("hashtag-dropdown").appendChild(optionElement2);
    })
}

function removePostForm() {
    postFormExpandButton.style.display = "block";
    postFormParentDiv.innerHTML = "";
}

function createPost() {
    let selectedUser;
    allUsers.map(user => {
        if(parseInt(user.id) === parseInt( document.getElementById("author-dropdown").value)) {
            selectedUser = user;
        }
    })
    let selectedHashtag;
    allHashtags.map(hashtag => {
        if(parseInt(hashtag.id) === parseInt(document.getElementById("hashtag-dropdown").value)) {
            selectedHashtag = hashtag;
        }
    })
    const postToCreate = {
        hashtag: selectedHashtag,
        text: document.getElementById("create-post-text").value,
        user: selectedUser,
        date: new Date()
    };

    console.log("posttocreate", postToCreate);
    fetch(localURL + "/posts", {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify(postToCreate)
    }).then(response => response.json())
        .then(post => {
            removePostForm();
            addPostToDivList(post)
        }).catch(error => console.log(error));
}

document.getElementById("expand-post-form")
    .addEventListener("click", showPostForm);
