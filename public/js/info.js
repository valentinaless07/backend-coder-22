fetch("/getinfo")
    .then(res => res.json())
    .then(resp => {
        
        document.getElementById("argumentos").innerHTML = `Argumentos de entrada: Port ${resp.args}`;
        document.getElementById("node-version").innerHTML = `Version de node: ${resp.version}`;
        document.getElementById("plataforma").innerHTML = `Sistema operativo: ${resp.platform}`;
        document.getElementById("process-id").innerHTML = `Id del proceso: ${resp.pid}`;
        document.getElementById("carpeta-proyecto").innerHTML = `Carpeta del proyecto: ${resp.cwd}`;
        document.getElementById("path-ejecucion").innerHTML = `Path de ejecución: ${resp.execPath}`;
        document.getElementById("memoria-reservada").innerHTML = `Uso de la memoria: ${resp.memory}`;
        document.getElementById("numCpus").innerHTML = `Número CPUS: ${resp.numCPUs}`;
    })
    .catch(error => console.log(error));