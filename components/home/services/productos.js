app.factory('LenteService', ['$http', function ($http) {
	var servicio = {
		//toma los datos de la api
		obtenerLentes: function (cb){
			$http.get(API).then( function (res){
				var rx = {"error": "No existen los lentes"};
				if(res.data.response){
					rx = res.data.response;
				}
				cb(rx);
			});
		}
	};
	return servicio;
}])