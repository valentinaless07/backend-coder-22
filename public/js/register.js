
document.getElementById("to_login").addEventListener
('click', (e) => {
    e.preventDefault()
    fetch("/")
        .then(response => response.json())
        .finally(() => {
            window.location.href = "/";
        })
})    



