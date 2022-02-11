console.log('javascript connected')

const form = document.querySelector('#form')


form.addEventListener("submit", function(event){
    event.preventDefault()
    console.log('Button was clicked!')
    const formData = new FormData(event.target)
    const asString = new URLSearchParams(formData).toString('');
    console.log(asString)
    let url = (`https://itunes.apple.com/search?${asString}&entity=song&limit=1`)
    
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
                document.querySelector('#results-div').innerHTML += `<div>${data.results[i].artistName}</div>`
            }
        })
}) 

// https://itunes.apple.com/seartch?term=jack+johnson&limit=1