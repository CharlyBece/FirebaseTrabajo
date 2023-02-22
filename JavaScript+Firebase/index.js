var firebaseConfig = {


    apiKey: "AIzaSyC9rAh1P0FV0T9LA2YiIYWEHCrsFvNFecY",
    authDomain: "programacion-we.firebaseapp.com",
    databaseURL: "https://programacion-we-default-rtdb.firebaseio.com",
    projectId: "programacion-we",
    storageBucket: "programacion-we.appspot.com",
    messagingSenderId: "189776592097",
    appId: "1:189776592097:web:c6c74e4e1a8b6f8a40cba0",
    measurementId: "G-XRWGP2NT4P"
    
    //apiKey: "AIzaSyCLqcAcu83_wbwBvR3_P1WMKJvtLeMYKcM",
    //authDomain: "proyecto-firebase-13c7d.firebaseapp.com",
    //databaseURL: "https://proyecto-firebase-13c7d-default-rtdb.firebaseio.com",
    //projectId: "proyecto-firebase-13c7d",
    //storageBucket: "proyecto-firebase-13c7d.appspot.com",
    //messagingSenderId: "532977409236",
    //appId: "1:532977409236:web:1737146845795cf177ef41",
    //measurementId: "G-Q67XNBB5ZZ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


function resetFields(){
    document.getElementById("Input1").value='';
    document.getElementById("Input2").value='';
    document.getElementById("Input3").value='';
    document.getElementById("Input4").value='selecciona';
    document.getElementById("Input5").value='';
    document.getElementById("Input6").value='';
    document.getElementById("Input7").value='selecciona';
}
function createR() {
    document.getElementById("Input1").disabled = false;
    //Guardo los datos capturados usando el id de cada control
    var id = document.getElementById("Input1").value;
    var nombre = document.getElementById("Input2").value;
    var pelicula = document.getElementById("Input3").value;
    var categoria = document.getElementById("Input4").value;
    var idioma = document.getElementById("Input5").value;
    var costo = document.getElementById("Input6").value;
    var pago = document.getElementById("Input7").value;

    //validaciones
    if (id.length > 0) {
        //creo un objeto que guarda los datos
        var renta = {
            id, //usuario:id
            nombre,
            pelicula,
            categoria,
            idioma,
            costo,
            pago,
        }

        //console.log(renta);

        firebase.database().ref('Peliculas/' + id).update(renta).then(() => {
           resetFields();
        }).then(()=>{
           read();
        });

        swal("Listo!", "Agregado correctamente", "success");

        
    } 
    else {
        swal("Error", "Llena todos los campos","warning");
    }

    document.getElementById("Input1").disabled = false;
        //firebase.database().ref('users/' + userId).set({
    //    username: name,
    //    email: email,
    //    profile_picture : imageUrl
    //  });
    //https://firebase.google.com/docs/database/web/read-and-write?hl=es

  
    //Esto se usa cuando no tienen un id/matricula y Firebase les genera una
    //automaticamente
    //const key = firebase.database().ref().child('Alumnos').push().key;
    //data[`Alumnos/${key}`]= alumno;
    //firebase.database().ref().update(data).then(()=>{
    //  alert('Agregado exitosamente');
    //})
}

function read(){
    document.getElementById("Table1").innerHTML='';

    var ref = firebase.database().ref('Peliculas');
/**   
   ref.on('value', function(snapshot) {
        snapshot.forEach(row=>{
            printRow(row.val());
        })
    });
 */
   
    ref.on("child_added", function(snapshot) {
        printRow(snapshot.val());
    });

}

function printRow(renta){
    
    if(renta!=null){
        var table = document.getElementById("Table1"); 

        //creamos un nuevo elemento en la tabla en la ultima posicion
        var row = table.insertRow(-1);

        //Insertamos cada una de las celdas/columnas del registro
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        var cell8 = row.insertCell(7);
        var cell9 = row.insertCell(8);
        
        //Agregamos la informacion a cada una de las columnas del registro
        cell1.innerHTML = renta.id;
        cell2.innerHTML = renta.nombre; 
        cell3.innerHTML = renta.pelicula;
        cell4.innerHTML = renta.categoria; 
        cell5.innerHTML = renta.idioma; 
        cell6.innerHTML = renta.costo; 
        cell7.innerHTML = renta.pago; 
        cell8.innerHTML = `<button type="button" class="btn btn-danger" onClick="deleteR(${renta.id})">Eliminar</button>`;
        cell9.innerHTML = '<button type="button" class="btn btn-success" onClick="seekR('+renta.id+')">Modificar</button>';
    }
}

function deleteR(id){
    firebase.database().ref('Peliculas/' + id).set(null).then(() => {
      read();
    }).then(()=>{
       swal("Listo!", "Eliminado correctamente", "success");
    });
}

function seekR(id){
    var ref = firebase.database().ref('Peliculas/' + id);
    ref.on('value', function(snapshot) {
      updateR(snapshot.val());
    });
}

function updateR(renta){
    if(renta!=null)
    {
        document.getElementById("Input1").value=renta.id;
        document.getElementById("Input1").disabled = true;
        document.getElementById("Input2").value=renta.nombre;
        document.getElementById("Input3").value=renta.pelicula;
        document.getElementById("Input4").value=renta.categoria;
        document.getElementById("Input5").value=renta.idioma;
        document.getElementById("Input6").value=renta.costo;
        document.getElementById("Input7").value=renta.pago;
    }
}


//Para consulta de categorias
function readQ(){
    document.getElementById("Table2").innerHTML='';
    var c = document.getElementById("Input8").value;

    var ref = firebase.database().ref("Peliculas");
    ref.orderByChild("categoria").equalTo(c).on("child_added", function(snapshot) {
        printRowQ(snapshot.val());
    });

}


function printRowQ(renta){

    var table = document.getElementById("Table2"); 
    
    //creamos un nuevo elemento en la tabla en la ultima posicion
    var row = table.insertRow(-1);

    //Insertamos cada una de las celdas/columnas del registro
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);
    
    //Agregamos la informacion a cada una de las columnas del registro
    cell1.innerHTML = renta.id;
    cell2.innerHTML = renta.nombre; 
    cell3.innerHTML = renta.pelicula;
    cell4.innerHTML = renta.categoria; 
    cell5.innerHTML = renta.idioma; 
    cell6.innerHTML = renta.costo; 
    cell7.innerHTML = renta.pago; 
   
}