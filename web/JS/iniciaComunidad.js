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
    
    db.collection("usuariosComunidad").where("correoElectronico", "==", correo).where("Password", "==", pass).onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            //Con doc.data regresa toda la información del registro, si se quiere algo en especial, se puede poner:
            //doc.data().NombreDelCampo
            console.log(`${doc.id} => ${doc.data()}`);
            Swal.fire(
                    '¡Bienvenido ' + `${doc.data().Nombre}` + "!",
                    '',
                    'success',
                    location.href = 'miCuentaUsuario.html'
                    );
        });
    });
}

    




