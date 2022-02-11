console.log('javascript connected')
const form = document.querySelector('#form')

//Global Variables
// let formIsValid

form.addEventListener("submit", function(event){
    event.preventDefault()
    console.log('Button was clicked')
    const formData = new FormData(event.target)
    const asString = new URLSearchParams(formData).toString('');
    console.log(asString)
    let url = ('https://itunes.apple.com/seartch?term=jack+johnson&limit=1')
fetch(url)
.then(function(response){
    return response.json
})
.then(function(data){
    console.log(data)
})
})


// https://itunes.apple.com/seartch?term=jack+johnson&limit=1