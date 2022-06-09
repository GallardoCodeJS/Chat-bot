app.factory('CheckoutService', function () {
	return{
		Saludo: function(){
			var saludo = ['a','ola','Hola','Hey','buenas','saludos','buen','dia'];
			return saludo;
		},
		Compra: function(){
			var compra = ['compr','compra','comprar','compras'];
			return compra;
		},
		Consulta: function(){
			var consulta = ['a','consulta','consu','consult','consulta','consultar','contacto'];
			return consulta;
		},
		Confirma: function(){
			var consulta = ['s','si'];
			return consulta;
		}
	}
});