const Socket = io.connect()



Socket.on('messages', function (data){
    console.log(data)
    
    const autoresSchema = new normalizr.schema.Entity('authors')
    const msjsSchema = new normalizr.schema.Entity('messages', { author: autoresSchema }, { idAttribute: '_id' })
    const fileSchema = [msjsSchema]
    const denormalized = normalizr.denormalize(data.result, fileSchema, data.entities)
   
    
    render(denormalized)
})


function render(data) {
    
    let html = data.map(function(elem, index){
        
      const f = new Date(elem._doc.date)
      
      const date = f.getDate() + "/"+ (f.getMonth() +1) + "/" +f.getFullYear();
      const hour = f.getHours() < 10 ? '0'+f.getHours() : f.getHours()
      const minutes = f.getMinutes() < 10 ? '0'+f.getMinutes() : f.getMinutes()
      const seconds = f.getSeconds() < 10 ? '0'+f.getSeconds() : f.getSeconds()
      const hours = hour + ':' + minutes + ':' + seconds
        return(`<div class='text-justify mt-2'>
            <strong class="text-primary fw-bold">${elem._doc.author.nombre} <span class='text-dark '>[<span class='text-danger'>${date} ${hours}</span>]</span></strong>:
            <em class='text-success'>${elem._doc.text}</em> </div>`)
    }).join(" ")
    document.getElementById('messages').innerHTML = html
}



const buttonSubmit = document.getElementById("button_submit");
const messagesContainer = document.getElementById("messages_container");

buttonSubmit.addEventListener('click', (e) => {
    e.preventDefault()
    const mensaje = {
        author: {
            id: messagesContainer.children.email.value,
            nombre: messagesContainer.children.username.value,
            apellido: messagesContainer.children.apellido.value,
            edad: messagesContainer.children.edad.value,
            alias: messagesContainer.children.alias.value,
            avatar: messagesContainer.children.avatar.value,
        },
        text: messagesContainer.children.texto.value,
        date: new Date
    }
    Socket.emit('new-message', mensaje)
    document.getElementById('texto').value = ''
    document.getElementById('texto').focus()

    
    
})


fetch("/api/productos-test")
    .then(res => res.json())
    .then(products => {
        renderProducts(products);
    })
    .catch(error => console.log(error));

function renderProducts(products) {
    const container = document.getElementById("productos");
    products.forEach(el => {
        
        const tr = document.createElement("tr");
        tr.classList.add("border","border-4","border-light","text-white","rounded")
        const title = document.createElement("td");
        title.innerHTML = el.title;
        title.classList.add("p-3")
        const price = document.createElement("td");
        price.classList.add("p-3")
        price.innerHTML = el.price;
        const thumbnail = document.createElement("td");
        thumbnail.classList.add("p-3", "d-flex", "justify-content-center")
        const img = document.createElement("img");
        img.classList.add("w-50", "h-75", "p-3")
        img.src = el.thumbnail;
        thumbnail.appendChild(img);
        tr.appendChild(title);
        tr.appendChild(price);
        tr.appendChild(thumbnail);
        container.appendChild(tr);
    });
}

