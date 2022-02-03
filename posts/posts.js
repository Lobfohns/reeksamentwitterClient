const postDiv = document.getElementById("post-names-list-tbody")
let allHashtags;

fetch(localURL + "/posts")
    .then(response => response.json())
    .then(posts => {
        console.log("Posts", posts);
        posts.map(addPostToDivList);

        fetch(localURL + "/hashtags")
            .then(response => response.json())
            .then(hashtags => {
                console.log("Hashtags", hashtags);
                allHashtags = hashtags;
            })
    })


function addPostToDivList(post){
    const selectPostToDiv = document.createElement("tr");
    selectPostToDiv.id = post.id;
    postDiv.appendChild(selectPostToDiv);
    createPostTableRow(selectPostToDiv, post)
}

function createPostTableRow(divElement, post){
    console.log("divelement,", post);
    divElement.innerHTML = `
             <td>
                <p class="row-post-hashtag">${escapeHTML(post.hashtag.hashtagName)}</p>
            </td>
             <td>
                <p class="row-post-text">${escapeHTML(post.text)}</p>
            </td>
             <td>
                <p class="row-post-author">${escapeHTML(post.user.username)}</p>
            </td>
             <td>
                <p class="row-post-date">${new Date(post.date).toLocaleDateString() + " " + new Date(post.date).toLocaleTimeString()}</p>
            </td>
             <td>
                <button class="button" id="update-button-${post.id}">Update</button>            
            </td>          
             <td>
                <button onclick="deletePost(${post.id})">❌</button>            
            </td>
        `;
    document.getElementById(`update-button-${post.id}`)
        .addEventListener("click", () => updatePost(post));
}


function deletePost(postId) {
    fetch(localURL + "/posts/" + postId, {
        method: "DELETE"
    }).then(response => {
        if (response.status === 200) {
            document.getElementById(postId).remove();
        } else {
            console.log(response.status);
        }
    });
}

function searchFunction() {
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("hashtag-search");
    filter = input.value.toUpperCase();
    table = document.getElementById("post-table");
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