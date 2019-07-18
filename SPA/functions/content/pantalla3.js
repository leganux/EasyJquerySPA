console.log('Ejetuta e iniciliza las funciones de la pantalla 3');

var referenciasSHome = contentController.getRefernces();

$('#' + referenciasSHome.regresar_home).click(function () {
    alert('voy a home')
    contentController.loadScreen('home', paramsScreens);

});

var html = "<br><br><br><br> <h3>&copy; leganux.com 2019 </h3>"

var components = [{
    'matchs': 'footer',
    'content': html
}];

/* De una forma muy parecida a la que trabaja react se podran crear componentes HTML que permitan reusarse una infinidad de veces  y podran ejecutarse funciones callback cuando termine de cargar la siguente pantalla*/

footerController.loadScreen('footer', paramsScreens, components, function () {
    console.log('Soy el CALLBACK que informa - Termino de cargar el footer GRACIAS!!');
});