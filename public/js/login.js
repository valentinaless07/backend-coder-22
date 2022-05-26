
fetch("/getuser")
    .then(res => res.json())
    .then(resp => {

        document.getElementById("message_name").innerHTML = resp;
    })
    .catch(error => console.log(error));

    setTimeout(() => {
        window.location.href = "/";
    }, 3000);