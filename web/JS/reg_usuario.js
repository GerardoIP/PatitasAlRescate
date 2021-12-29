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

//AGREGAR DATOS
function guardar() {
    var nombre = document.getElementById('nombre').value;
    var papellido = document.getElementById('papellido').value;
    var sapellido = document.getElementById('sapellido').value;
    var numtel = document.getElementById('numtel').value;
    var email = document.getElementById('email').value;
    var pass = document.getElementById('pass').value;
    //El .add agrega un ID automático
    //Dentro de collection, ponemos la colección a la que vamos a agregar el registro
    db.collection("usuariosComunidad").add({
        //Los primeros datos son el nombre de las columnas en la BD, después de los 2 puntos es el valor que recibe.
        Nombre: nombre,
        Papellido: papellido,
        Sapellido: sapellido,
        Password: pass,
        correoElectronico: email,
        numTelefono: numtel
    })
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
                Swal.fire(
                        '¡Registro Exitoso!',
                        '',
                        'success'
                        );
                document.getElementById('nombre').value = "";
                document.getElementById('papellido').value = "";
                document.getElementById('sapellido').value = "";
                document.getElementById('numtel').value = "";
                document.getElementById('email').value = "";
                document.getElementById('pass').value = "";
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });

}
