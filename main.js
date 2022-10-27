$(document).ready(function() {
var user_id, opcion;
opcion = 4;
    
tablaUsuarios = $('#tablaUsuarios').DataTable({  
    "ajax":{            
        "url": "bd/crud.php", 
        "method": 'POST', //nous utilisons la méthode POST
        "data":{opcion:opcion}, //nous avons envoyé l’option 4 pour faire un SELECT
        "dataSrc":""
    },
    "columns":[
        {"data": "user_id"},
        {"data": "username"},
        {"data": "first_name"},
        {"data": "last_name"},
        {"data": "gender"},
        {"data": "password"},
        {"data": "status"},
        {"data": "menu"},
        {"defaultContent":"<div class='text-center'><div class='btn-group'><button class='btn btn-primary btn-sm btnUnite'>Par unité</button><button class='btn btn-danger btn-sm btnValeur'>Par valeur</button></div></div>"}
    ]
});     

var fila; //capture la ligne, pour modifier ou supprimer
//soumettre pour Le Haut et La Mise à jour 
//lorsqu'on clique sur e bouton generer
$('#formUsuarios').submit(function(e){                         
    e.preventDefault(); //évite le comportement normal de soumettre-friendly, c’est-à-dire recharger pleine page
    username = $.trim($('#username').val());    
    first_name = $.trim($('#first_name').val());
    last_name = $.trim($('#last_name').val());    
    gender = $.trim($('#gender').val());    
    password = $.trim($('#password').val());
    status = $.trim($('#status').val());                            
        $.ajax({
          url: "bd/crud.php",
          type: "POST",
          datatype:"json",    
          data:  {user_id:user_id, username:username, first_name:first_name, last_name:last_name, gender:gender, password:password ,status:status ,opcion:opcion},    
          success: function(data) {
            tablaUsuarios.ajax.reload(null, false);
           }
        });			        
    $('#modalCRUD').modal('hide');											     			
});
        
 


//Edit       
$(document).on("click", ".btnUnite", function(){           
    opcion = 2;//Modifier
    fila = $(this).closest("tr");         
    user_id = parseInt(fila.find('td:eq(0)').text()); //Je capture l’ID              
    username = fila.find('td:eq(1)').text();
    first_name = fila.find('td:eq(2)').text();
    last_name = fila.find('td:eq(3)').text();
    gender = fila.find('td:eq(4)').text();
    password = fila.find('td:eq(5)').text();
    status = fila.find('td:eq(6)').text();
    $("#username").val(username);
    $("#first_name").val(first_name);
    $("#last_name").val(last_name);
    $("#gender").val(gender);
    $("#password").val(password);
    $("#status").val(status);
    $(".modal-header").css("background-color", "#007bff");
    $(".modal-header").css("color", "white" );
    $(".modal-title").text("Info vente");   
    $('#modalCRUD').modal('show');       
});

//btnValeur
$(document).on("click", ".btnValeur", function(){
    fila = $(this);           
    user_id = parseInt($(this).closest('tr').find('td:eq(0)').text()) ;		
    opcion = 3; //Retirer        
    var respuesta = confirm("¿Está seguro de borrar el registro "+user_id+"?");                
    if (respuesta) {            
        $.ajax({
          url: "bd/crud.php",
          type: "POST",
          datatype:"json",    
          data:  {opcion:opcion, user_id:user_id},    
          success: function() {
              tablaUsuarios.row(fila.parents('tr')).remove().draw();                  
           }
        });	
    }
 });
     
});    