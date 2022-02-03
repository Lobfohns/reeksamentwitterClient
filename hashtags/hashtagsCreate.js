const hashtagFormParentDiv = document.getElementById("create-hashtag-form");
const hashtagFormExpandButton = document.getElementById("expand-hashtag-form");

const createHashtagForm = `<div>
    <input id="create-hashtag-name" placeholder="Hashtag name">
    <button class="button" id="CancelButton"   onclick="removeHashtagForm()">Cancel</button>
    <button class="button" id="CreateButton"  onclick="createHashtag()">Create A Hashtag</button>
</div>`;

function showHashtagForm() {
    hashtagFormExpandButton.style.display = "none";
    hashtagFormParentDiv.innerHTML = createHashtagForm;
}

function removeHashtagForm() {
    hashtagFormExpandButton.style.display = "block";
    hashtagFormParentDiv.innerHTML = "";
}

function createHashtag() {
    const hashtagToCreate = {
        hashtagName: document.getElementById("create-hashtag-name").value,
    };

    fetch(localURL + "/hashtags", {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify(hashtagToCreate)
    }).then(response => response.json())
        .then(hashtag => {
            removeHashtagForm();
            addHashtagToDivList(hashtag)
        }).catch(error => console.log(error));
}

document.getElementById("expand-hashtag-form")
    .addEventListener("click", showHashtagForm);
