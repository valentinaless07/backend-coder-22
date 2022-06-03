document.getElementById("to_register").addEventListener
('click', (e) => {
    e.preventDefault()
    fetch("/register")
        .then(response => response.json())
        .finally(() => {
            window.location.href = "/register";
        })
})    

