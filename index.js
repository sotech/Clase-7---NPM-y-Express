const express = require('express')
const fs = require('fs');

const app = express();
const rutaProductos = "./productos.txt";

app.use(express.json());

let visitas = {
    items: 0,
    item: 0
};

//API

app.get('/items',async(req,res) => {
    visitas.items++;
    try {
        let archivo = await fs.promises.readFile(rutaProductos, "utf-8");
        let productos = JSON.parse(archivo);
        let cantidadProductos = productos.length;
        let items = {
            items: productos,
            cantidad: cantidadProductos
        };
        res.send(items);
    } catch(e) {
        console.log("Ocurrio un error al leer el archivo: " + e);
    }    
});

app.get('/item-random', async (req, res) => {
    visitas.item++;
    try {
        let archivo = await fs.promises.readFile(rutaProductos, "utf-8");
        let listaProductos = JSON.parse(archivo);
        let item = {
            item: listaProductos[Math.floor(Math.random() * (listaProductos.length))]
        };
        res.send(item);
    } catch (e) {
        console.log("Ocurrio un error al leer el archivo: " + e);
    }
});

app.get('/visitas', (req, res) => {
    let respuestaVisitas = {
        visitas : visitas
    };
    res.send(respuestaVisitas);
});

//INICIAR SERVIDOR
const puerto = 3000;

app.listen(puerto,() => {
    console.log("Servidor iniciado en el puerto " + puerto);
});