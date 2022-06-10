const randomnums = (data) => {
    
    let numsrandom = {}

    let cantidadnum = data ? Number(data) : 100000000

    for (let i = 0; i <= cantidadnum; i++) {

        let random = Math.floor((Math.random() * (1000 - 1 + 1)) + 1);

        if(numsrandom[random] ){
            numsrandom[random] = numsrandom[random] + 1
        }
        else{
            numsrandom[random] = 1
        }

        
    }
    return numsrandom
}

process.on('message', req => {
    process.send("start")
    process.send(randomnums(req))
    process.exit()
})

export default randomnums