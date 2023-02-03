const newUserData = {
    "name": "fetch_user",
    "active": true
}

fetch("/users",{
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(newUserData) 
    })
    .then(response => response.json())
    .then(data => console.log(data))
