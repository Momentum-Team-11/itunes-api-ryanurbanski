console.log('javascript connected')

const form = document.querySelector('#form')
const resultContainer = document.querySelector('#results-container')
const audioPreviewUrl = ""

form.addEventListener("submit", function (event) {
    event.preventDefault()

    // Search
    const searchString = document.getElementById("searchBox").value
    document.getElementById("resultsHeaderLabel").innerHTML = "Search Results for: '" + searchString + "' ";
    const formData = new FormData(event.target)
    const asString = new URLSearchParams(formData).toString('');
    let url = (`https://proxy-itunes-api.glitch.me/search?${asString}&entity=song&limit=20`)

    // Clear Results
    document.querySelector('#results-div').innerHTML = ""

    // Retrieve and Print Results
    fetch(url)
        .then((response) => {
            console.log(response);
            return response.json()
        })
        .then((data) => {
            console.log(data)
            for (let i = 0; i < data.results.length; i++) {
                document.querySelector('#results-div').innerHTML += `
                    <div class="column is-one-quarter">
                        <div class="card" id="result-card">
                            <div class="card-image has-text-centered">
                                <figure class="image is-128x128 is-inline-block mt-5">
                                    <img src="${data.results[i].artworkUrl100}">                
                                </figure>
                            </div>
                            <div class="card-content">
                                <p class="subtitle is-5">${data.results[i].artistName}</p> 
                                <p class="title is-4">${data.results[i].trackName}</p> 
                                <span class="icon-text">
                                    <span class="icon">
                                        <i class="fas fa-music"></i>
                                    </span>
                                    <span><a href="${data.results[i].previewUrl}" id="${data.results[i].trackId}">Play preview</a></span>     
                                </span>
                            </div>
                        </div>
                    </div>
                `
            }
        })
        
        // Reset form for next search
        form.reset()
})

// Play Preview
resultContainer.addEventListener("click", function(event) {
    event.preventDefault()

    let songId = event.target.id
    let url = (`https://proxy-itunes-api.glitch.me/lookup?id=${songId}`)

    fetch(url)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            let artistName = data.results[0].artistName
            let songName = data.results[0].trackName

            if(event.target.tagName === 'A') {
                console.log("The link to play was clicked.")
                document.getElementById("player").src = event.target.href
                document.getElementById("now-playing").innerHTML = ""
                document.getElementById("now-playing").innerHTML += `
                    <strong>${songName}</strong>
                    <text> - ${artistName}</text>
                `
            }
        })
})



// // Simple function definition
// function add(a,b) {
//     return a + b
// }

// // Another function definition
// let add = function(a,b) {
//     return a + b
// }

// // Arrow function definition
// let add = (a,b) => {
//     return a + b
// }

// // Arrow function if there is only a single return line
// let add = (a,b) => a + b

// ------------------------------------------------------------------------------
// Basic fetch
// .then()










// https://itunes.apple.com/seartch?term=jack+johnson&limit=1