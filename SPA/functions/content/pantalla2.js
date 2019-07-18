console.log('Ejetuta e iniciliza las funciones de la pantalla 2');

var referenciasSHome = contentController.getRefernces();

$('#' + referenciasSHome.regresar_home).click(function () {
    alert('voy a home')

    contentController.loadScreen('home', paramsScreens);

});

var x = contentController.getVar('guardaParametro')
var y = contentController.getVar('guardaParametro2')

console.log('Muestra parametros compartidos entre pantallas', x, y)