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
        div.innerHTML = `<button type="button" class="btn btn-primary" onclick="editar('${doc.id}','${doc.data().nombreAlbergue}',
        '${doc.data().Calle}','${doc.data().numExt}','${doc.data().numInt}','${doc.data().Colonia}','${doc.data().Alcaldia}','${doc.data().cp}','${doc.data().numTelefono}','${doc.data().correoElectronico}'
        ,'${doc.data().Password}','${doc.data().Habitantes}')">Modificar Información </button><br><br>
                    
            <button type="button" class="btn btn-primary" onclick="eliminar('${doc.id}','${doc.data().nombreAlbergue}',
            '${doc.data().Calle}','${doc.data().numExt}','${doc.data().numInt}','${doc.data().Colonia}','${doc.data().numTelefono}','${doc.data().correoElectronico}'
            ,'${doc.data().Password}','${doc.data().Habitantes}')">Eliminar Cuenta</button>`;
    });
});


//ESTA FUNCIÓN SIRVE PARA ACTUALIZAR DATOS, LE PASA LO QUE ESTÁ DENTRO DEL PARÉNTESIS QUE LO RECIBE DEL BOTON DE ARRIBITA
function editar(id,nombreAlbergue,calle,numext,numint,colonia,alcaldia,cp,telefono,correo,pass,habitantes) {
    //VA A PONER EL VALOR DE CADA COLUMNA EN LOS CAMPOS
    //MUESTRA EL MODAL QUE SE CREA EN EL HTML
    $('#modalAlbergues').modal('show');
    //A LOS ELEMENTOS DEL HTML LES PONGO EL VALOR QUE RECIBEN DE LA PARTE DE LEER DATOS, LA DE ARRIBA
    document.getElementById('nombreAlbergue').value = nombreAlbergue;
    document.getElementById('callemodal').value = calle;
    document.getElementById('coloniamodal').value = colonia;
    document.getElementById('cpmodal').value = cp;
    document.getElementById('alcaldiamodal').value = alcaldia;
    document.getElementById('numextmodal').value = numext;
    document.getElementById('numintodal').value = numint;
    document.getElementById('correomodal').value = correo;
    document.getElementById('telmodal').value = telefono;
    document.getElementById('passmodal').value = pass;
    document.getElementById('habitantesmodal').value = habitantes;
    //DENTRO DEL MODAL HAY UN BOTON AL QUE ESTOY HACIENDO REFERENCIA
    var boton = document.getElementById('boton');
    //AL DAR CLICK EN ESE BOTON, SE EJECUTA LA SIGUIENTE FUNCION, POR ESO DICE BOTON.ONCLICK
    boton.onclick = function () {
        //VAR WASHINGTON LA DEJÉ ASÍ PORQUE ASÍ VIENE LA DOCUMENTACIÓN DE FIREBASE Y ME DIÓ FLOJERA CMABIAR LA VARIABLE JAJA
        //ESA VARIABLE HACE REFERENCIA A LA COLECCIÓN E IDENTIFICADOR
        var washingtonRef = db.collection("usuariosAlbergue").doc(id);
        //CRE NUEVAS VARIABLES Y OBTENGO EL NUEVO VALOR DE LOS CAMPOS
        var A = document.getElementById('nombrealberguemodal').value;
        var B = document.getElementById('callemodal').value;
        var C = document.getElementById('coloniamodal').value;
        var D = document.getElementById('cpmodal').value;
        var E = document.getElementById('alcaldiamodal').value;
        var F = document.getElementById('numextmodal').value;
        var G = document.getElementById('numintodal').value;
        var H = document.getElementById('telmodal').value;
        var I = document.getElementById('correomodal').value;
        var J = document.getElementById('passmodal').value;
        var K = document.getElementById('habitantesmodal').value;
        //EN ESTA PARTE SE HACEN LOS CAMBIOS A LOS CAMPOS CON .UPDATE
        return washingtonRef.update({
            //LO PRIMERO ES EL NOMBRE QUE SE TIENE EN FIREBASE, LO SEGUNDO ES LA VARIABLE DE ARRIBA QUE ESTÁ OBTENIENDO LO QUE SE ESCRIBIÓ EN EL CAMPO
            //NOMBRE -> ESTÁ EN LA COLECCIÓN DE FIREBASE, A -> ES LA VARIABLE DE ARRIBA, POR EJEMPLO
            nombreAlbergue: A,
            Calle: B,
            Colonia: C,
            CP: D,
            Alcaldia: E,
            numExt: F,
            numInt: G,
            numTelefono: H,
            correoElectronico: I,
            Password: J,
            Habitantes: K
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
                    $('#modalAlbergues').modal('hide');
                })
                //SI HUBO ALGÚN ERROR, ESCRIBE ESO EN CONSOLA
                .catch((error) => {
                    // The document probably doesn't exist.
                    console.error("Error updating document: ", error);
                });
    };
}


//ESTA PARTE ES PARA ELIMINAR DATOS, LE PASA LO QUE ESTÁ DENTRO DEL PARÉNTESIS QUE LO RECIBE DEL BOTON DE ARRIBITA
function eliminar(id,nombreAlbergue) {
    //HACE REFERENCIA A LA COLECCIÓN Y ID
    db.collection("usuariosAlbergue").doc(id);
    //MENSAJITO DE CONFIRMACIÓN
    Swal.fire({
        title: '¿Está seguro de eliminar su cuenta ' + nombreAlbergue + '?',
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
            db.collection("usuariosAlbergue").doc(id).delete().then(() => {
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






