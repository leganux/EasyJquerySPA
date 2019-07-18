console.log('Ejetuta e iniciliza las funciones de la pantalla home');


/*con la funcion get references se obtinen todos los elementos dinamicos previamente asignados*/

var referenciasSHome = contentController.getRefernces();

/*para evitar perdida de informacion entre pantallas, si se desea conpartir informacion entre una y otra se utilizan los metodos setVar y getVar*/

contentController.setVar('guardaParametro','ErickCruz');
contentController.setVar('guardaParametro2', 11 );


/*Con las referencias podran ejecutarse las consultas al dom para realizar acciones*/
$('.' + referenciasSHome.btnGoToScreen3).click(function () {
    alert('voy a la pantalla 3')
    contentController.loadScreen('pantalla3',paramsScreens);

});

$('#' + referenciasSHome.btnGoToScreen2).click(function () {
    alert('voy a la pantalla 2')
    contentController.loadScreen('pantalla2',paramsScreens);

});