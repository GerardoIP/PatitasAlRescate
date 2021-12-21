const firebaseConfig = {
    apiKey: "AIzaSyAF5ELTmK6ApKmLpJ28QHVkmibpF2Zj_aw",
    authDomain: "patitas-al-rescate-229e1.firebaseapp.com",
    projectId: "patitas-al-rescate-229e1",
    storageBucket: "patitas-al-rescate-229e1.appspot.com",
    messagingSenderId: "1051619555224",
    appId: "1:1051619555224:web:0b5f468e1a22faf4d99ded"
};

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();


//INFORMACIÓN DEL ALBERGUE

function iniciaSesion() {
    var correo = document.getElementById("email").value;
    var pass = document.getElementById("pass").value;
    
    db.collection("usuariosAlbergue").where("correoElectronico", "==", correo).where("Password", "==", pass).onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            //Con doc.data regresa toda la información del registro, si se quiere algo en especial, se puede poner:
            //doc.data().NombreDelCampo
            console.log(`${doc.id} => ${doc.data()}`);
            Swal.fire(
                    '¡Bienvenido ' + `${doc.data().nombreAlbergue}` + "!",
                    '',
                    'success',
                    location.href = 'miCuentaAlbergue.html'
                    );
        });
    });
}

//ESTA PARTE ES PARA LEER DATOS, PARA QUE SE PRESENTEN EN PANTALLA
var correo2 = document.getElementById("emailSecreto").value;
var pass2 = document.getElementById("passSecreto").value;
//ABAJO CREO VARIABLES QUE SE REFIEREN A LOS ELEMENTOS DEL HTML EN BASE AL ID
var nombre = document.getElementById('nombreUsuario');
var nombreCompleto = document.getElementById('A');
var dir = document.getElementById('B');
var tel = document.getElementById('C');
var Email = document.getElementById('D');
var Pass = document.getElementById('E');
var mascotas = document.getElementById('F');
var div = document.getElementById('botones');
//DB.COLLECTION SE REFIERE A LA COLEXION DE FIREBASE A LA QUE ESTAS HACIENDO REFERENCIA
//.WHERE ES PARA REALIZAR CONSULTA, IGUAL QUE EN MYSQL, PARA BUSCAR ALGO EN ESPECÍFICO
//.ONSNAPSHOT SIRVE PARA QUE TODOS LOS CAMBIOS QUE OCURRAN SE HAGAN Y MUESTREN EN TIEMPO REAL, ESO NO SE CAMBIA
db.collection("usuariosAlbergue").where("correoElectronico", "==", correo2).where("Password", "==", pass2).onSnapshot((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        //Con doc.data regresa toda la información del registro, si se quiere algo en especial, se puede poner:
        //doc.data().NombreDelCampo
        //CONSOLE.LOG TE VA A MOSTRAR EN CONSOLA EL ID Y DATO AL QUE SE REFIERE SIRVE PARA VER QUE SE HIZO BIEN LA CONSULTA
        console.log(`${doc.id} => ${doc.data()}`);
        //APARTIR DE AQUÍ, EMPECÉ A MODIFICAR EL HTML CON JAVASCRIPT PARA TENER LOS DATOS DE FIREBASE
        //PARA ESO PUSE LAS VARIABLES DEL PRINCIPIO Y MODIFICO CON .INNERHTML
        //CON `${DOC.DATA().NOMBRE_DEL_CAMPO_DE_LA_BASE}` CONSULTAS LO QUE QUIERAS, ABAJO POR EJEMPLO, ESTOY PIDIENDO ÚNICAMENTE EL NOMBRE
        nombre.innerHTML = `¡Hola ` + `${doc.data().nombreAlbergue}` + `!`;
        nombreCompleto.innerHTML = `Nombre del Albergue: ` + `${doc.data().nombreAlbergue}`;
        dir.innerHTML = `Direccion: ` + `Calle ${doc.data().Calle} num. Ext. ${doc.data().numExt}, num. Int. ${doc.data().numInt} Colonia ${doc.data().Colonia}`;
        tel.innerHTML = `Telefono: ` + `${doc.data().numTelefono}`;
        Email.innerHTML = `Correo Electrónico: ` + `${doc.data().correoElectronico}`;
        Pass.innerHTML = `Contraseña: ` + `${doc.data().Password}`;
        mascotas.innerHTML = `Número de mascotas: ` + `${doc.data().Habitantes}`;
        //BOTÓN PARA MODIFICAR INFORMACIÓN Y ABAJITO PARA ELIMINAR INFORMACIÓN
        div.innerHTML = `<button type="button" class="btn btn-primary" onclick="editar('${doc.id}','${doc.data().Nombre}',
        '${doc.data().Papellido}','${doc.data().Sapellido}','${doc.data().numTelefono}','${doc.data().correoElectronico}','${doc.data().Password}')">Modificar Información </button><br><br>
                    
            <button type="button" class="btn btn-primary" onclick="eliminar('${doc.id}','${doc.data().Nombre}',
        '${doc.data().Papellido}','${doc.data().Sapellido}')">Eliminar Cuenta</button>`;
    });
});


//ESTA FUNCIÓN SIRVE PARA ACTUALIZAR DATOS, LE PASA LO QUE ESTÁ DENTRO DEL PARÉNTESIS QUE LO RECIBE DEL BOTON DE ARRIBITA
function editar(id, nombre, papellido, sapellido, telefono, correo, pass) {
    //VA A PONER EL VALOR DE CADA COLUMNA EN LOS CAMPOS
    //MUESTRA EL MODAL QUE SE CREA EN EL HTML
    $('#modalUsuarios').modal('show');
    //A LOS ELEMENTOS DEL HTML LES PONGO EL VALOR QUE RECIBEN DE LA PARTE DE LEER DATOS, LA DE ARRIBA
    document.getElementById('nombreCompletoModal').value = nombre;
    document.getElementById('paModal').value = papellido;
    document.getElementById('saModal').value = sapellido;
    document.getElementById('telModal').value = telefono;
    document.getElementById('correoModal').value = correo;
    document.getElementById('passModal').value = pass;
    //DENTRO DEL MODAL HAY UN BOTON AL QUE ESTOY HACIENDO REFERENCIA
    var boton = document.getElementById('boton');
    //AL DAR CLICK EN ESE BOTON, SE EJECUTA LA SIGUIENTE FUNCION, POR ESO DICE BOTON.ONCLICK
    boton.onclick = function () {
        //VAR WASHINGTON LA DEJÉ ASÍ PORQUE ASÍ VIENE LA DOCUMENTACIÓN DE FIREBASE Y ME DIÓ FLOJERA CMABIAR LA VARIABLE JAJA
        //ESA VARIABLE HACE REFERENCIA A LA COLECCIÓN E IDENTIFICADOR
        var washingtonRef = db.collection("usuariosComunidad").doc(id);
        //CRE NUEVAS VARIABLES Y OBTENGO EL NUEVO VALOR DE LOS CAMPOS
        var A = document.getElementById('nombreCompletoModal').value;
        var B = document.getElementById('paModal').value;
        var C = document.getElementById('saModal').value;
        var D = document.getElementById('telModal').value;
        var E = document.getElementById('correoModal').value;
        var F = document.getElementById('passModal').value;
        //EN ESTA PARTE SE HACEN LOS CAMBIOS A LOS CAMPOS CON .UPDATE
        return washingtonRef.update({
            //LO PRIMERO ES EL NOMBRE QUE SE TIENE EN FIREBASE, LO SEGUNDO ES LA VARIABLE DE ARRIBA QUE ESTÁ OBTENIENDO LO QUE SE ESCRIBIÓ EN EL CAMPO
            //NOMBRE -> ESTÁ EN LA COLECCIÓN DE FIREBASE, A -> ES LA VARIABLE DE ARRIBA, POR EJEMPLO
            Nombre: A,
            Papellido: B,
            Sapellido: C,
            numTelefono: D,
            correoElectronico: E,
            Password: F
        })
        //YA QUE SE HIZO TODO ESO, .THEN ES PARA LO QUE PARA DESPUÉS 
                .then(() => {
                    //PINTA EN CONSOLA QUE SE HIZO CORRECTAMENTE EL CAMBIO, SOLO PARA COMPROBAR
                    console.log("Document successfully updated!");
                    //SWAL ES EL MENSAJITO DE QUE TODO SALIÓ BIEN
                    Swal.fire(
                            '¡Datos Actualizados!',
                            '',
                            'success'
                            );
                    //OCULTA EL MODAL
                    $('#modalUsuarios').modal('hide');
                })
                //SI HUBO ALGÚN ERROR, ESCRIBE ESO EN CONSOLA
                .catch((error) => {
                    // The document probably doesn't exist.
                    console.error("Error updating document: ", error);
                });
    };
}


//ESTA PARTE ES PARA ELIMINAR DATOS, LE PASA LO QUE ESTÁ DENTRO DEL PARÉNTESIS QUE LO RECIBE DEL BOTON DE ARRIBITA
function eliminar(id, Nombre, PApellido, SApellido) {
    //HACE REFERENCIA A LA COLECCIÓN Y ID
    db.collection("usuariosComunidad").doc(id);
    //MENSAJITO DE CONFIRMACIÓN
    Swal.fire({
        title: '¿Está seguro de eliminar su cuenta ' + Nombre + ' ' + PApellido + " " + SApellido + '?',
        text: "¡Está operación no se puede revertir!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#0f8009',
        cancelButtonColor: '#094B81',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        //SI ACEPTA PASA ESTO
        if (result.value) {
            Swal.fire('¡Eliminado!', '', 'success');
            //HACE REFERENCIA A LA COLECCIÓN QUE ESTAMOS USANDO, CON .DELETE() LO ELIMINA
            db.collection("usuariosComunidad").doc(id).delete().then(() => {
                //PINTA EN CONSOLA QUE SE ELIMINÓ, SOLO PARA COMPROBAR
                console.log("Document successfully deleted!");
                //EN ESTE CASO, LO REDIRECCIONO AL INDEX
                window.location = "index.html";
                setTimeout(5000);
            }).catch((error) => {
                //EN CASO DE QUE HAYA SALIDO ALGO MAL, PINTA ESTO EN CONSOLA
                console.error("Error removing document: ", error);
            });
        } else {
            //SI DECIDIÓ NO ELIMINAR, PINTA ESTE MENSAJE
            Swal.fire('¡Cancelado!', '', 'error');
        }
    });

}


function verModal() {
    $('#Mascotas').modal('show');
}

function cerrarModal() {
    $('#Mascotas').modal('hide');
}

function ValidarDatos() {
    if (document.getElementById('nombreModal').value === "") {
        Swal.fire(
                'Ingresa el nombre de la mascota',
                '',
                'error'
                );
    } else if (document.getElementById('edadModal').value === "") {
        Swal.fire(
                'Ingresa la edad en meses de la mascota',
                '',
                'error'
                );
    } else if (document.getElementById('razaModal').value === "") {
        Swal.fire(
                'Ingresa la raza de la mascota',
                '',
                'error'
                );
    } else if (document.getElementById('obsModal').value === "") {
        Swal.fire(
                'Ingresa alguna observación de la mascota',
                '',
                'error'
                );
    } else if (document.getElementById('albModal').value === "") {
        Swal.fire(
                'Ingresa el albergue en donde se encuentra la mascota',
                '',
                'error'
                );
    } else {
        guardar();
    }
}

//AGREGAR DATOS
function guardar() {
    var A = document.getElementById('nombreModal').value;
    var B = document.getElementById('edadModal').value;
    var C = document.getElementById('razaModal').value;
    var D = document.getElementById('obsModal').value;
    var E = document.getElementById('albModal').value;
    //El .add agrega un ID automático
    //Dentro de collection, ponemos la colección a la que vamos a agregar el registro
    db.collection("Mascotas").add({
        //Los primeros datos son el nombre de las columnas en la BD, después de los 2 puntos es el valor que recibe.
        Nombre: A,
        Edad: B,
        Raza: C,
        Observaciones: D,
        Albergue: E
    })
            .then((docRef) => {
                Swal.fire(
                            '¡Registro Exitoso!',
                            '',
                            'success'
                            );
                $('#Mascotas').modal('hide');
                console.log("Document written with ID: ", docRef.id);
                document.getElementById('nombreModal').value = "";
                document.getElementById('edadModal').value = "";
                document.getElementById('razaModal').value = "";
                document.getElementById('obsModal').value = "";
                document.getElementById('albModal').value = "";
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });

}


//LEER DATOS
//var tabla = document.getElementById('tablaMascota');
//db.collection("Mascotas").onSnapshot((querySnapshot) => {
//    tabla.innerHTML = '';
//    querySnapshot.forEach((doc) => {
//        //Con doc.data regresa toda la información del registro, si se quiere algo en especial, se puede poner:
//        //doc.data().NombreDelCampo
//        console.log(`${doc.id} => ${doc.data()}`);
//        tabla.innerHTML += `
//        <tr>
//        <td>${doc.data().Nombre}</td>
//        <td>${doc.data().Edad}</td>
//        <td>${doc.data().Raza}</td>
//        <td>${doc.data().Observaciones}</td>
//        <td>${doc.data().Albergue}</td>
//        <td><button class="btn btn-success" onclick="editar('${doc.id}','${doc.data().Nombre}',
//'${doc.data().Edad}','${doc.data().Raza}','${doc.data().Observaciones}','${doc.data().Albergue}')">Modificar</button>&nbsp;&nbsp;&nbsp;
//<button class="btn btn-danger" onclick="eliminar('${doc.id}','${doc.data().Nombre}')">Dar de Baja</button></td>
//        </tr>
//        `;
//    });
//});

//LEER DATOS - AQUI SE MODIFICA CON LA CONDICION
var card = document.getElementById('cardBody');
db.collection("Mascotas").onSnapshot((querySnapshot) => {
    card.innerHTML = '';
    querySnapshot.forEach((doc) => {
        //Con doc.data regresa toda la información del registro, si se quiere algo en especial, se puede poner:
        //doc.data().NombreDelCampo
        console.log(`${doc.id} => ${doc.data()}`);
        card.innerHTML += `
        <div class="card" style="margin-left: 4% !important; margin-right: 4% !important; margin-bottom: 10% !important;">
        <img class="card-img-top" src="Imagenes/PerritoBonito.jpg" alt="Card image cap">
                    <div class="card-body">
        <h4>¡Hola me llamo: ${doc.data().Nombre}!</h4><br>
        <h6>Edad: ${doc.data().Edad} meses</h6>
        <h6>Raza: ${doc.data().Raza}</h6>
        <h6>Observaciones: ${doc.data().Observaciones}</h6>
        <h6>Albergue: ${doc.data().Albergue}</h6><br>
        <h6><button class="btn btn-success" style="font-size: 100% !important;" onclick="editar('${doc.id}','${doc.data().Nombre}',
        '${doc.data().Edad}','${doc.data().Raza}','${doc.data().Observaciones}','${doc.data().Albergue}')">Modificar</button>&nbsp;&nbsp;&nbsp;
        <button class="btn btn-danger" style="font-size: 100% !important;" onclick="eliminar('${doc.id}','${doc.data().Nombre}')">Dar de Baja</button></p>
                    </div>
        </div>
        `;
    });
});


//BORRAR DATOS CON CONFIRMACION

function eliminar(id, Nombre) {
    db.collection("Mascotas").doc(id);
    Swal.fire({
        title: '¿Está seguro de eliminar a ' + Nombre + '?',
        text: "¡Está operación no se puede revertir!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#0f8009',
        cancelButtonColor: '#094B81',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.value) {
            Swal.fire('¡Eliminado!', '', 'success');
            db.collection("Mascotas").doc(id).delete().then(() => {
                console.log("Document successfully deleted!");
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
        } else {
            Swal.fire('¡Cancelado!', '', 'error');
        }
    });
}


function editar(id, nombre, edad, raza, observaciones, albergue) {

    //VA A PONER EL VALOR DE CADA COLUMNA EN LOS CAMPOS
    $('#Mascotas').modal('show');
    document.getElementById('nombreModal').value = nombre;
    document.getElementById('edadModal').value = edad;
    document.getElementById('razaModal').value = raza;
    document.getElementById('obsModal').value = observaciones;
    document.getElementById('albModal').value = albergue;
    //CAMBIA EL TEXTO DEL BOTON
    var boton = document.getElementById('boton');
    boton.innerHTML = 'Editar';

    boton.onclick = function () {
        var washingtonRef = db.collection("Mascotas").doc(id);
// Set the "capital" field of the city 'DC'

//OBTIENES EL NUEVO VALOR DE LOS CAMPOS
        var A = document.getElementById('nombreModal').value;
        var B = document.getElementById('edadModal').value;
        var C = document.getElementById('razaModal').value;
        var D = document.getElementById('obsModal').value;
        var E = document.getElementById('albModal').value;

//SE HACEN LOS CAMBIOS A LOS CAMPOS
        return washingtonRef.update({
            Nombre: A,
            Edad: B,
            Raza: C,
            Observaciones: D,
            Albergue: E
        })
                .then(() => {
                    console.log("Document successfully updated!");
                    Swal.fire(
                            '¡Datos Actualizados!',
                            '',
                            'success'
                            );
                    $('#Mascotas').modal('hide');
                    boton.innerHTML = 'Guardar';
                    document.getElementById('nombreModal').value = "";
                    document.getElementById('edadModal').value = "";
                    document.getElementById('razaModal').value = "";
                    document.getElementById('obsModal').value = "";
                    document.getElementById('albModal').value = "";
                    boton.onclick = function () {
                        guardar();
                    };
                })
                .catch((error) => {
                    // The document probably doesn't exist.
                    console.error("Error updating document: ", error);
                });
    };
}








