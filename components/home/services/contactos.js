app.factory('ContactoService', function () {
	return{
		Contacto: function(){
			var datos = [{
				"name":"Empresa de lentes",
				"correo":"lentes@lentes.com",
				"telefono":"123456789",
				"url":"https://lexartlabs.com/"
				}];
			return datos;
		}
	}
});