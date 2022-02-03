const hashtagDiv = document.getElementById("hashtag-names-list-tbody")

fetch(localURL + "/hashtags")
    .then(response => response.json())
    .then(hashtags => {
        console.log("Hashtags", hashtags);
        hashtags.map(addHashtagToDivList);
    })

function addHashtagToDivList(hashtag){
    const selectHashtagToDiv = document.createElement("tr");
    selectHashtagToDiv.id = hashtag.id;
    hashtagDiv.appendChild(selectHashtagToDiv);
    createHashtagTableRow(selectHashtagToDiv, hashtag)
}

function createHashtagTableRow(divElement, hashtag){
    console.log("divelement,", hashtag);
    divElement.innerHTML = `
             <td>
                <p class="row-post-hashtag">${escapeHTML(hashtag.hashtagName)}</p>
            </td>        
             <td>
                <button onclick="deleteHashtag(${hashtag.id})">❌</button>            
            </td>
        `;
}

function deleteHashtag(hashtagId) {
    fetch(localURL + "/hashtags/" + hashtagId, {
        method: "DELETE"
    }).then(response => {
        if (response.status === 200) {
            document.getElementById(hashtagId).remove();
        } else {
            console.log(response.status);
        }
    });
}

function searchFunction() {
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("hashtag-search");
    filter = input.value.toUpperCase();
    table = document.getElementById("hashtag-table");
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