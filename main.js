console.log('javascript connected')

const form = document.querySelector('#form')


form.addEventListener("submit", function(event){
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
                        <div class="card">
                            <div class="card-image">
                                <figure class="image">
                                    <img src="${data.results[i].artworkUrl100}">                
                                </figure>
                            </div>
                            <div class="card-content">
                                <p class="subtitle is-5">${data.results[i].artistName}</p> 
                                <p class="title is-4">${data.results[i].trackName}</p> <!-- Add Band Name from javascript -->
                            </div>
                        </div>
                    </div>
                `
            }
        })
}) 

// https://itunes.apple.com/seartch?term=jack+johnson&limit=1