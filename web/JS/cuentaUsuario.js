//NO SE CAMBIA, ES LA CONEXIÓN CON FIREBASE
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
//HASTA AQUI SE DEJA EXACTAMENTE LO MISMO


//ESTA PARTE ES PARA LEER DATOS, PARA QUE SE PRESENTEN EN PANTALLA
//ABAJO CREO VARIABLES QUE SE REFIEREN A LOS ELEMENTOS DEL HTML EN BASE AL ID
var nombre = document.getElementById('nombreUsuario');
var nombreCompleto = document.getElementById('nombreCompleto');
var Telefono = document.getElementById('telefono');
var Email = document.getElementById('correo');
var Pass = document.getElementById('contra');
var div = document.getElementById('botones');
//DB.COLLECTION SE REFIERE A LA COLEXION DE FIREBASE A LA QUE ESTAS HACIENDO REFERENCIA
//.WHERE ES PARA REALIZAR CONSULTA, IGUAL QUE EN MYSQL, PARA BUSCAR ALGO EN ESPECÍFICO
//.ONSNAPSHOT SIRVE PARA QUE TODOS LOS CAMBIOS QUE OCURRAN SE HAGAN Y MUESTREN EN TIEMPO REAL, ESO NO SE CAMBIA
db.collection("usuariosComunidad").where("correoElectronico", "==", "g.picazo03@hotmail.com").where("Password", "==", "Gerardo").onSnapshot((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        //Con doc.data regresa toda la información del registro, si se quiere algo en especial, se puede poner:
        //doc.data().NombreDelCampo
        //CONSOLE.LOG TE VA A MOSTRAR EN CONSOLA EL ID Y DATO AL QUE SE REFIERE SIRVE PARA VER QUE SE HIZO BIEN LA CONSULTA
        console.log(`${doc.id} => ${doc.data()}`);
        //APARTIR DE AQUÍ, EMPECÉ A MODIFICAR EL HTML CON JAVASCRIPT PARA TENER LOS DATOS DE FIREBASE
        //PARA ESO PUSE LAS VARIABLES DEL PRINCIPIO Y MODIFICO CON .INNERHTML
        //CON `${DOC.DATA().NOMBRE_DEL_CAMPO_DE_LA_BASE}` CONSULTAS LO QUE QUIERAS, ABAJO POR EJEMPLO, ESTOY PIDIENDO ÚNICAMENTE EL NOMBRE
        nombre.innerHTML = `¡Hola ` + `${doc.data().Nombre}` + `!`;
        nombreCompleto.innerHTML = `Nombre Completo: ` + `${doc.data().Nombre} ${doc.data().Papellido} ${doc.data().Sapellido}`;
        Telefono.innerHTML = `Teléfono: ` + `${doc.data().numTelefono}`;
        Email.innerHTML = `Correo electrónico: ` + `${doc.data().correoElectronico}`;
        Pass.innerHTML = `Contraseña: ` + `${doc.data().Password}`;
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

