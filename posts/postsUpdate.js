function updatePost(post) {
    const tableRowToUpdate = document.getElementById(post.id);

    tableRowToUpdate.innerHTML = `
        <td>
            <input id="update-post-hashtag-${post.id}" value="${escapeHTML(post.hashtag.hashtagName)}">
        </td>
         <td>
            <input id="update-post-text-${post.id}" value="${escapeHTML(post.text)}">
        </td>
        </td>
       <td>
            <button class="button" id="cancel-update-${post.id}">Cancel</button>
            <button class="button" id="update-${post.id}">✅</button>
       </td>
       <td>
            <button onclick="deletePost(${post.id})">❌</button>
       </td>
    `;
    document.getElementById(`cancel-update-${post.id}`)
        .addEventListener("click", () => undoUpdateTableRow(post));
    document.getElementById(`update-${post.id}`)
        .addEventListener("click", () => updatePostInBackend(post));


}

function undoUpdateTableRow(post) {
    const postTableRow = document.getElementById(post.id);
    createPostTableRow(postTableRow, post);
}

function updatePostInBackend(post) {
    let chosenHashtag = null;
    const tableRowToUpdate = document.getElementById(post.id);
    console.log(post)

    allHashtags.map(hashtag => {
        if (document.getElementById(`update-post-hashtag-${post.id}`).value === hashtag.hashtagName) {
            chosenHashtag = hashtag;
        }
    })
    if (chosenHashtag === null) {
        console.log("hej")
        const hashtagToCreate = {
            hashtagName: document.getElementById(`update-post-hashtag-${post.id}`).value
        };
        fetch(localURL + "/hashtags",{
            method: "POST",
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify(hashtagToCreate)
        }).then(response => response.json())
            .then(hashtag => {
                chosenHashtag = hashtag;
                console.log("hejtest", chosenHashtag)
                const postToUpdate = {
                    id: post.id,
                    hashtag: chosenHashtag,
                    text: document.getElementById(`update-post-text-${post.id}`).value,
                    user: post.user,
                    date: post.date
                };

                console.log("det her er post to update", postToUpdate)
                fetch(localURL + "/posts/" + post.id, {
                    method: "PATCH",
                    headers: { "Content-type": "application/json; charset=UTF-8" },
                    body: JSON.stringify(postToUpdate)
                }).then(response => {
                    if (response.status === 200) {
                        createPostTableRow(tableRowToUpdate, postToUpdate);
                    }
                });
            })

    }
    const postToUpdate = {
        id: post.id,
        hashtag: chosenHashtag,
        text: document.getElementById(`update-post-text-${post.id}`).value,
        user: post.user,
        date: post.date
    };

    console.log("det her er post to update", postToUpdate)
    fetch(localURL + "/posts/" + post.id, {
        method: "PATCH",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify(postToUpdate)
    }).then(response => {
        if (response.status === 200) {
            createPostTableRow(tableRowToUpdate, postToUpdate);
        }
    });
}