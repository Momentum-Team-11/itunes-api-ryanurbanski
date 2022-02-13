console.log('javascript connected')

const form = document.querySelector('#form')
const resultContainer = document.querySelector('#results-container')
const audioPreviewUrl = ""

form.addEventListener("submit", function (event) {
    event.preventDefault()

    
    
    console.log('Button was clicked!')
    console.log('The value of event.target is: ', event.target)
    
    const searchString = document.getElementById("searchBox").value
    console.log(searchString);
    document.getElementById("resultsHeaderLabel").innerHTML = "Search Results for: '" + searchString + "' ";

    const formData = new FormData(event.target)
    console.log(formData);
    const asString = new URLSearchParams(formData).toString('');
    console.log(asString)
    let url = (`https://proxy-itunes-api.glitch.me/search?${asString}&entity=song&limit=20`)

                // Clear previous results
                document.querySelector('#results-div').innerHTML = ""


    fetch(url)
        .then((response) => response.json())
        // .then(function (response) {
        //     console.log(response)
        //     return response.json()
        // })
        .then(function (data) {
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
        
        // Reset the form for the next search
        form.reset()
})


resultContainer.addEventListener("click", function(event) {
    event.preventDefault()

    let songId = event.target.id
    let url = (`https://proxy-itunes-api.glitch.me/lookup?id=${songId}`)

    fetch(url)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            let artistName = data.results[0].artistName
            let songName = data.results[0].trackName

            if(event.target.tagName === 'A') {
                console.log("The link to play was clicked.")
                document.getElementById("player").src = event.target.href
                document.getElementById("now-playing").innerHTML += `
                    <strong>${songName}</strong>
                    <text> - ${artistName}</text>
                `
            }
        })
})

// https://itunes.apple.com/seartch?term=jack+johnson&limit=1