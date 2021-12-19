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

//LEER DATOS
var nombre = document.getElementById('nombreUsuario');
var nombreCompleto = document.getElementById('nombreCompleto');
var Telefono = document.getElementById('telefono');
var Email = document.getElementById('correo');
var Pass = document.getElementById('contra');
var div = document.getElementById('botones');
db.collection("usuariosComunidad").where("correoElectronico", "==", "g.picazo03@hotmail.com").where("Password", "==", "Gerardo").onSnapshot((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        //Con doc.data regresa toda la información del registro, si se quiere algo en especial, se puede poner:
        //doc.data().NombreDelCampo
        console.log(`${doc.id} => ${doc.data()}`);
        nombre.innerHTML = `¡Hola ` + `${doc.data().Nombre}` + `!`;
        nombreCompleto.innerHTML = `Nombre Completo: ` + `${doc.data().Nombre} ${doc.data().Papellido} ${doc.data().Sapellido}`;
        Telefono.innerHTML = `Teléfono: ` + `${doc.data().numTelefono}`;
        Email.innerHTML = `Correo electrónico: ` + `${doc.data().correoElectronico}`;
        Pass.innerHTML = `Contraseña: ` + `${doc.data().Password}`;
        div.innerHTML = `<button type="button" class="btn btn-primary" onclick="editar('${doc.id}','${doc.data().Nombre}',
        '${doc.data().Papellido}','${doc.data().Sapellido}','${doc.data().numTelefono}','${doc.data().correoElectronico}','${doc.data().Password}')">Modificar Información </button><br><br>
                    
            <button type="button" class="btn btn-primary" onclick="eliminar('${doc.id}','${doc.data().Nombre}',
        '${doc.data().Papellido}','${doc.data().Sapellido}')">Eliminar Cuenta</button>`;
    });
});


//ACTUALIZAR DATOS
function editar(id, nombre, papellido, sapellido, telefono, correo, pass) {
    //VA A PONER EL VALOR DE CADA COLUMNA EN LOS CAMPOS
    $('#modalUsuarios').modal('show');
    document.getElementById('nombreCompletoModal').value = nombre;
    document.getElementById('paModal').value = papellido;
    document.getElementById('saModal').value = sapellido;
    document.getElementById('telModal').value = telefono;
    document.getElementById('correoModal').value = correo;
    document.getElementById('passModal').value = pass;
    //CAMBIA EL TEXTO DEL BOTON
    var boton = document.getElementById('boton');
    boton.onclick = function () {
        var washingtonRef = db.collection("usuariosComunidad").doc(id);
//OBTIENES EL NUEVO VALOR DE LOS CAMPOS
        var A = document.getElementById('nombreCompleto').value;
        var B = document.getElementById('pa').value;
        var C = document.getElementById('sa').value;
        var D = document.getElementById('tel').value;
        var E = document.getElementById('correoModal').value;
        var F = document.getElementById('pass').value;
//SE HACEN LOS CAMBIOS A LOS CAMPOS
        return washingtonRef.update({
            Nombre: A,
            Papellido: B,
            Sapellido: C,
            numTelefono: D,
            correoElectronico: E,
            Password: F
        })
                .then(() => {
                    console.log("Document successfully updated!");
                    $('#modalUsuarios').modal('hide');
                })
                .catch((error) => {
                    // The document probably doesn't exist.
                    console.error("Error updating document: ", error);
                });
    };
}


//ELIMINAR DATOS
function eliminar(id, Nombre, PApellido, SApellido) {
    db.collection("usuariosComunidad").doc(id);
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
        if (result.value) {
            Swal.fire('¡Eliminado!', '', 'success');
            db.collection("usuariosComunidad").doc(id).delete().then(() => {
                console.log("Document successfully deleted!");
                window.location = "index.html";
                setTimeout(5000);
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
        } else {
            Swal.fire('¡Cancelado!', '', 'error');
        }
    });

}

