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
    var nombreAlbergue = document.getElementById('nombreAlbergue').value;
    var habitantes = document.getElementById('habitantes').value;
    var calle = document.getElementById('calle').value;
    var colonia = document.getElementById('colonia').value;
    var alcaldia = document.getElementById('alcaldia').value;
    var cp = document.getElementById('cp').value;
    var numext = document.getElementById('numext').value;
    var numint = document.getElementById('numint').value;
    var numtel = document.getElementById('numtel').value;
    var email = document.getElementById('email').value;
    var pass = document.getElementById('pass').value;
    //El .add agrega un ID automático
    //Dentro de collection, ponemos la colección a la que vamos a agregar el registro
    db.collection("usuariosAlbergue").add({
        //Los primeros datos son el nombre de las columnas en la BD, después de los 2 puntos es el valor que recibe.
        Alcaldia: alcaldia,
        CP: cp,
        Calle: calle,
        Colonia: colonia,
        Password: pass,
        correoElectronico: email,
        nombreAlbergue: nombreAlbergue,
        numExt: numext,
        numInt: numint,
        numTelefono: numtel,
        Habitantes: habitantes
    })
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
                document.getElementById('nombreAlbergue').value="";
                document.getElementById('habitantes').value="";
                document.getElementById('calle').value="";
                document.getElementById('colonia').value="";
                document.getElementById('alcaldia').value="";
                document.getElementById('cp').value="";
                document.getElementById('numext').value="";
                document.getElementById('numint').value="";
                document.getElementById('numtel').value="";
                document.getElementById('email').value="";
                document.getElementById('pass').value="";
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });

}