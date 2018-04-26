const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    //Funcion writeFile('Path(Ruta)',datos a grabar, error)
    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    });
}

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
}

const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer;

}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();
    //otra forma es con filter quita o filtra un elemento en particular regresando un nuevo array
    //regresando los elementos que no coincidan con esa descripcion siendo ese el elemento a borrar
    /*
    let newList = listadoPorHacer.filter(tarea=> tarea.descripcion !== descripcion);
    if(listadoPorHacer.length === newList.length){
        return false;
    }else{
        listadoPorHacer=newList;
        guardarDB();
        return true
    }
    */
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >= 0) {
        //El método splice() cambia el contenido de un array eliminando 
        //elementos existentes y/o agregando nuevos elementos.
        listadoPorHacer.splice(index, 1);
        guardarDB();
        return true;
    } else {
        return false;
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}