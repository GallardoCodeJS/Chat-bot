//Define la app 'HomeCtrol' dentro del index
app.controller('HomeCtrl',['$scope','$timeout','$http','LenteService','ContactoService','CheckoutService', function($scope,$timeout,$http,LenteService,ContactoService,CheckoutService){
	
	//$Scope toma las variables del index
	//Define el titulo 
	$scope.titulo = "Bienvenidos.";
	//Tiempo de respuesta del bot
	$time = 1000;
	//Estado inicial
	$state = 0;
	$coincide = 0;
	$error = false;
	$consulta = false;

	//Listado
	$scope.producto = [];
	$scope.contacto = [];
	$scope.saludo 	= [];
	$scope.compra 	= [];
	$scope.confirma = [];
	//Listado de producto seleccionado
	$scope.selectproduct = [];
	$scope.datosusuario	 = [{
		"name":"",
		"city":"",
		"address":"",
		"cel":"",
		"tdc":""
	}];

	//Toma los datos de los servicios
	$scope.saludo 	= CheckoutService.Saludo();
	$scope.compra 	= CheckoutService.Compra();
	$scope.consulta = CheckoutService.Consulta();
	$scope.confirma = CheckoutService.Confirma();
	$scope.contacto = ContactoService.Contacto();

	//Carga los lentes desde get
	LenteService.obtenerLentes( function (lentes){
		if(!lentes.error){
			$scope.producto = lentes;
		}
	});
	
	//Variables de chat
	$scope.model 	= {};
	$scope.uiAction = {};
	
	//El modelado del chat
	$scope.model.chats = [];

	//Estructura de estados
	$scope.replyBot 	= function (){
		switch ($state){
			//Bienvenida			
			case 0:
				if($error == false){
					$timeout( function (){
						var botChat = {
							"tipo":"BOT",
							"classes":"bot",
							"msg":"Buen día.",
							"img":"",
							"name":"Asistente virtual"
						}
						$scope.model.chats.push(botChat);								
					}, $time);
				}else{
					$timeout( function (){
						var botChat = {
							"tipo":"BOT",
							"classes":"bot",
							"msg":"Creo que deberias saludar de forma cordial. Vuelve a intentarlo! :D",
							"img":"",
							"name":"Asistente virtual"
						}
						$scope.model.chats.push(botChat);
					}, $time);
				}
			break;

			//Pregunta que hacer
			case 1:
				if($error == false){
					$timeout( function (){
						var botChat = {
							"tipo":"BOT",
							"classes":"bot",
							"msg":"\n"+"Comprar/Contacto"+"\n"+"¿Que desea realizar?.",
							"img":"",
							"name":"Asistente virtual"
						}
						$scope.model.chats.push(botChat);								
					}, $time);
				}else{					
					$timeout( function (){
						var botChat = {
							"tipo":"BOT",
							"classes":"bot",
							"msg":"Opcion no permitida. Vuelve a intentarlo! :D"+"\n"+"Comprar/Contacto"+"\n"+"¿Que desea realizar?.",
							"img":"",
							"name":"Asistente virtual"
						}
						$scope.model.chats.push(botChat);
					}, $time);
				}
			break;

			//Muestra los articulos en pantalla
			case 2:
				if($error == false){
					if($consulta == false){
						$timeout( function (){
							for(var i=0;i<$scope.producto.length;i++){						
								var botChat = {
									"tipo":"BOT",
									"classes":"bot",
									"msg":"",
									"img":$scope.producto[i]['fotos'][i],
									"id":"ID: "+$scope.producto[i]['id'],
									"marca":"Marca: \n"+$scope.producto[i]['marca']+"Modelo: \n"+$scope.producto[i]['modelo'],
									"medida":"Medida: \n"+$scope.producto[i]['medida']+"Precio: \n"+$scope.producto[i]['moneda']+": \n"+$scope.producto[i]['precio'],
									"name":"Asistente virtual"
								}
								$scope.model.chats.push(botChat);							
							}
							var botChat2 = {
								"tipo":"BOT",
								"classes":"bot",
								"msg":"Elija un modelo...",
								"img":"",
								"name":"Asistente virtual"
							}
							$scope.model.chats.push(botChat2);		
						}, 2000);
					}else if($consulta == true){
						//Resta un estado para volver a cero
						$state--;
						$timeout( function (){		
							var botChat = {
								"tipo":"BOT",
								"classes":"bot",
								"msg":$scope.contacto[0]['name']+"\n"+$scope.contacto[0]['correo']+"\n"+$scope.contacto[0]['telefono'],
								"url":$scope.contacto[0]['url'],
								"img":"",
								"name":"Asistente virtual"
							}
							var botChat2 = {
								"tipo":"BOT",
								"classes":"bot",
								"msg":"\n"+"Comprar/Contacto"+"\n"+"¿Que desea realizar?.",
								"img":"",
								"name":"Asistente virtual"
							}
							$scope.model.chats.push(botChat);
							$scope.model.chats.push(botChat2);										
						}, $time);					
					}
					//Fin error
				}else{
					$timeout( function (){
						var botChat = {
							"tipo":"BOT",
							"classes":"bot",
							"msg":"Opcion no permitida, vuelva a intentar!",
							"img":"",
							"name":"Asistente virtual"
						}
						$scope.model.chats.push(botChat);
					},$time);
			}
			break;

			//Muestra el producto seleccionado
			case 3:
				//console.log('caso3');
				$timeout( function (){
					var botChat = {
						"tipo":"BOT",
						"classes":"bot",
						"msg":"A seleccionado el producto: ",
						"img":$scope.selectproduct['fotos'],
						"id":"ID: "+$scope.selectproduct['id'],
						"marca":"Marca: \n"+$scope.selectproduct['marca']+"Modelo: \n"+$scope.selectproduct['modelo'],
						"medida":"Medida: \n"+$scope.selectproduct['medida']+"Precio: \n"+$scope.selectproduct['moneda']+": \n"+$scope.selectproduct['precio'],
						"name":"Asistente virtual"
					}
					var botChat2 = {
						"tipo":"BOT",
						"classes":"bot",
						"msg":"¿Confirma su compra?. Si / No",
						"name":"Asistente virtual"
					}
					$scope.model.chats.push(botChat);
					$scope.model.chats.push(botChat2);
				}, $time);
			break;

			//Confirma pago y solicitado nombre y apellido
			case 4:
				if($error == false){
					$timeout( function (){
						var botChat = {
							"tipo":"BOT",
							"classes":"bot",
							"msg":"Confirmado! -Por favor"+"\n"+"Ingrese su nombre y apellido completo: ",
							"name":"Asistente virtual"
						}
						$scope.model.chats.push(botChat);
					}, $time);
				}else{
					$timeout( function (){
						var botChat = {
							"tipo":"BOT",
							"classes":"bot",
							"msg":"No hay problema!, vuelva a elegir otro...",
							"name":"Asistente virtual"
						}
						$scope.model.chats.push(botChat);
						//Vuelve al estado anterior
						$state = 2;
					}, $time);
				}
			break;

			//Muestra nombre y apellido y pide ciudad
			case 5:
				$timeout( function (){
					var botChat = {
						"tipo":"BOT",
						"classes":"bot",
						"msg":"Muy bien, "+$scope.datosusuario[0]['name']+"!",
						"marca":"Ahora ingrese su ciudad.",
						"name":"Asistente virtual"
					}
					$scope.model.chats.push(botChat);					
				}, $time);
			break;

			//Muestra ciudad y pide direccion
			case 6:
				$timeout( function (){
					var botChat = {
						"tipo":"BOT",
						"classes":"bot",
						"msg":"Ciudad: "+$scope.datosusuario[0]['city'],
						"marca":"Ingrese su direccion.",
						"name":"Asistente virtual"
					}
					$scope.model.chats.push(botChat);					
				}, $time);
			break;

			case 7:
				$timeout( function (){
					var botChat = {
						"tipo":"BOT",
						"classes":"bot",
						"msg":"Direccion: "+$scope.datosusuario[0]['address'],
						"marca":"Ingrese su numero de telefono.",
						"name":"Asistente virtual"
					}
					$scope.model.chats.push(botChat);					
				}, $time);
			break;

			case 8:
				if($error == false){
					$timeout( function (){
						var botChat = {
							"tipo":"BOT",
							"classes":"bot",
							"msg":"Telefono: "+$scope.datosusuario[0]['cel'],
							"marca":"Ingrese los ultimos 4 digitos de su tarjeta (TDC).",
							"name":"Asistente virtual"
						}
						$scope.model.chats.push(botChat);					
					}, $time);
				}else{
					$timeout( function (){
						var botChat = {
							"tipo":"BOT",
							"classes":"bot",
							"msg":"Error de formato!, Vuelva a intentarlo.",
							"name":"Asistente virtual"
						}
						$scope.model.chats.push(botChat);					
					}, $time);
					$state = 7;
				}
			break;

			case 9:
				if($error == false){
					$timeout( function (){
						var botChat = {
							"tipo":"BOT",
							"classes":"bot",
							"msg":"TDC: "+$scope.datosusuario[0]['tdc'],
							"marca":"Genial, todos los datos estan completos.",							
							"name":"Asistente virtual"
						}
						$scope.model.chats.push(botChat);					
					}, $time);

					$timeout( function (){
						var botChat2 = {
							"tipo":"BOT",
							"classes":"bot",
							"msg":"FIN!",							
							"name":"Asistente virtual"
						}
						$scope.model.chats.push(botChat2);					
					}, 2000);
				}else{
					$timeout( function (){
						var botChat = {
							"tipo":"BOT",
							"classes":"bot",
							"msg":"Error de formato!, Vuelva a intentarlo.",
							"name":"Asistente virtual"
						}
						$scope.model.chats.push(botChat);					
					}, $time);
					$state = 8;
				}
			break;
		}
	};
	//Ejecuta por primera
	$scope.replyBot();
	
	$scope.pushMsg 	= function (){
		var chat = {
			"tipo":"USER",
			"classes":"usu",
			"msg": $scope.uiAction.msg,
			"img":"",
			"name":"Ignacio"
		}		
		$scope.model.chats.push(chat);
		//console.log($state);

		//Segun estado de programa
		switch($state){			
			//Controla saludo
			case 0:
				//Cuando hay un espacio agrega otro elemento al array			
				var nmsj = $scope.uiAction.msg.toLowerCase().split(" ");

				//convierte el texto a minuscula
				for (var b = 0; b < $scope.saludo.length; b++) {
				    $scope.saludo[b] = $scope.saludo[b].toLowerCase();				    
				}

				//Recorre el array comprovando si encuentra la clave
				for (var i = 0; i < $scope.saludo.length; i++) {
				//Si algunos de los elementos corresponde a la clave lo suma al contador
					for(var a = 0; a< $scope.saludo.length;a++){
						if(nmsj[a] == $scope.saludo[i]){				
					 		//console.log("Coincide");
					 		$coincide++;
						}	
					}					
				}

				if($coincide>0){			
				 	//Suma el estado
					$state=1;
					$error = false;
					$coincide=0;
					// Llama la respuesta del bot
				 	$scope.replyBot();
				}else{
					$error = true;
					$scope.replyBot();
				}
			break;

			//Decision entre Compra/Consulta
			case 1:
				//Cuando hay un espacio agrega otro elemento al array			
				var nmsj = $scope.uiAction.msg.toLowerCase().split(" ");

				//convierte el texto a minuscula
				for (var b = 0; b < $scope.compra.length; b++) {
				    $scope.compra[b] = $scope.compra[b].toLowerCase();				    
				}

				//Recorre el array comprovando si encuentra la clave
				for (var i = 0; i < $scope.compra.length; i++) {
				//Si algunos de los elementos corresponde a la clave lo suma al contador
					for(var a = 0; a < $scope.compra.length; a++){
						if(nmsj[a] == $scope.compra[i]){				
					 		//console.log("Coincide compra");
					 		$consulta=false;
					 		$coincide++;
						}
					}					
				}

				//Recorre el array comprovando si encuentra la clave
				for (var i = 0; i < $scope.consulta.length; i++) {
				//Si algunos de los elementos corresponde a la clave lo suma al contador
					for(var a = 0; a < $scope.consulta.length; a++){
						if(nmsj[a] == $scope.consulta[i]){				
					 		//console.log("Consulta");
					 		$coincide++;
					 		$consulta=true;
						}
					}					
				}
				
				if($coincide>0){			
				 	//Suma el estado
					$state=2;
					$error = false;
					$coincide=0;
					// Llama la respuesta del bot
				 	$scope.replyBot();
				}else{
					$error = true;
					$scope.replyBot();
				}
			break;

			//Selecciona un producto
			case 2:
				//Cuando hay un espacio agrega otro elemento al array			
				var nmsj = $scope.uiAction.msg.toLowerCase().split(" ");
				//console.log('Caso2');

				//Recorre el array comprovando si encuentra la clave
				for (var i = 0; i < $scope.producto.length; i++) {
					for(var a = 0; a < $scope.producto.length; a++){
						if(nmsj[a] == $scope.producto[i]['id']){				
					 		//console.log("El prodcuto es: "+$scope.producto[i]['id']);
					 		//Carga el producto Seleccionado
					 		$scope.selectproduct = {
					 			"id":$scope.producto[i]['id'],
					 			"marca":$scope.producto[i]['marca'],
					 			"medida":$scope.producto[i]['medida'],
					 			"precio":$scope.producto[i]['precio'],
					 			"modelo":$scope.producto[i]['modelo'],
					 			"moneda":$scope.producto[i]['moneda'],
					 			"fotos":$scope.producto[i]['fotos'][i],
					 		};
					 		$coincide++;
					 		//console.log($scope.selectproduct['fotos']);
						}
					}					
				}				
				if($coincide>0){			
				 	//Suma el estado
					$state=3;
					$error = false;
					$coincide=0;
					// Llama la respuesta del bot
				 	$scope.replyBot();
				}else{
					$error = true;
					$scope.replyBot();
				}
			break;

			//Confirma o no la compra del producto seleccionado
			case 3:
				//Cuando hay un espacio agrega otro elemento al array			
				var nmsj = $scope.uiAction.msg.toLowerCase().split(" ");

				//Recorre el array comprovando si encuentra la clave
				for (var i = 0; i < $scope.confirma.length; i++) {
				//Si algunos de los elementos corresponde a la clave lo suma al contador
					for(var a = 0; a < $scope.confirma.length; a++){
						if(nmsj[a] == $scope.confirma[i]){				
					 		console.log("Confirma!");
					 		$coincide++;
						}
					}					
				}

				if($coincide>0){			
				 	//Suma el estado
					$state 	  = 4;
					$error 	  = false;
					$coincide = 0;
					// Llama la respuesta del bot
				 	$scope.replyBot();
				}else{			
					$state 	  = 4;		
					$error = true;
					$scope.replyBot();
				}
			break;

			//Pide su nombre completo
			case 4:
				//Cuando hay un espacio agrega otro elemento al array			
				var nmsj = $scope.uiAction.msg;

				$scope.datosusuario[0]['name'] = nmsj;			

				console.log($scope.datosusuario);
				$state = 5;
				$scope.replyBot();		
			break;

			//Pide nombre de ciudad
			case 5:
				var nmsj = $scope.uiAction.msg;
				$scope.datosusuario[0]['city'] = nmsj;
				$state = 6;
				$scope.replyBot();
			break;

			//Pide la direccion
			case 6:
				var nmsj = $scope.uiAction.msg;
				$scope.datosusuario[0]['address'] = nmsj;
				$state = 7;
				$scope.replyBot();
			break;

			//Pide numero de telefono
			case 7:
				//Expresion regular que debe cumplir el numero
				var expreg = new RegExp(/^([0])?[0-9]{8,9}$/);
				var nmsj = $scope.uiAction.msg;

				if(expreg.test(nmsj)){
					//console.log('Cumple');
					$scope.datosusuario[0]['cel'] = nmsj;					
					$error = false;
					$state = 8;
					$scope.replyBot();
				}else{
					//console.log('NO Cumple');
					$state = 8;	
					$error = true;				
					$scope.replyBot();
				}				
			break;

			//Pide los 4 numeros (TDC)
			case 8:

				var expreg = new RegExp(/^[0-9]{4}$/);
				var nmsj = $scope.uiAction.msg;

				if(expreg.test(nmsj)){
					//console.log('Cumple');
					$scope.datosusuario[0]['tdc'] = nmsj;					
					$error = false;
					$state = 9;
					$scope.replyBot();
				}else{
					//console.log('NO Cumple');
					$state = 9;	
					$error = true;				
					$scope.replyBot();
				}

			break;

		}

	}	

}]);