console.log('javascript connected')

const form = document.querySelector('#form')
const resultContainer = document.querySelector('#results-container')
const audioPreviewUrl = ""

form.addEventListener("submit", function (event) {
    event.preventDefault()
    console.log('Button was clicked!')
    const formData = new FormData(event.target)
    const asString = new URLSearchParams(formData).toString('');
    console.log(asString)
    let url = (`https://itunes.apple.com/search?${asString}&entity=song&limit=20`)

    fetch(url)
        .then(function (response) {
            console.log(response)
            return response.json()
        })
        .then(function (data) {
            console.log(data)

            for (let i = 0; i < data.results.length; i++) {
                console.log('the value of i is:', i)
                console.log('the artist name is', data.results[i].artistName)
                document.querySelector('#results-div').innerHTML += `
                    <div class="column is-one-quarter">
                        <div class="card" id="result-card">
                            <div class="card-image">
                                <figure class="image">
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
                                    <span><a href="${data.results[i].previewUrl}">Play preview</a></span>     
                                </span>
                            </div>
                        </div>
                    </div>
                `
            }
        })
})

resultContainer.addEventListener("click", function(event) {
    event.preventDefault()
    console.log(event.target)
    console.log('Card was clicked, get ready to play!')
    if(event.target.tagName === 'A') {
        console.log("it is an a!!!")
        document.getElementById("player").src = event.target.href
    }
})

// https://itunes.apple.com/seartch?term=jack+johnson&limit=1