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

var albergue = document.getElementById("nombreSecreto").value;
//LEER DATOS
var card = document.getElementById('cardBody');
db.collection("Mascotas").where("Albergue", "==", albergue).onSnapshot((querySnapshot) => {
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
                    </div>
        </div>
        `;
    });
});

