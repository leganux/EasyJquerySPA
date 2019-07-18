//Definimos la opciones de cada uno de los controladores de contenido dinamico

var OptionsNav = {
    Language: 'es_ES',
    LanguageRoute: './lang/',
    LanguagebyParam: false,
    ViewsRoute: './views/nav/',
    ViewsType: '.html',
    FunctionsRoute: './functions/nav/'
};
var OptionsContent = {
    Language: 'es_ES',
    LanguageRoute: './lang/',
    LanguagebyParam: false,
    ViewsRoute: './views/content/',
    ViewsType: '.html',
    FunctionsRoute: './functions/content/'
};
var OptionsFooter = {
    Language: 'es_ES',
    LanguageRoute: './lang/',
    LanguagebyParam: false,
    ViewsRoute: './views/footer/',
    ViewsType: '.html',
    FunctionsRoute: './functions/footer/'
};

/*Declaramos y agregamos los parametros dinamicos a enviar a las vistas */
var paramsScreens = [];
var addParamScreen = function (nombre, parametro) {
    paramsScreens.push({
        name: nombre,
        param: parametro
    });
}
addParamScreen('ejemplo', 'Hola mundo!!');


/*Inicializamos nuestros objetos dinamicos*/

var navController = new JScreenQueryL(false, '#NaV', OptionsNav);
var contentController = new JScreenQueryL(false, '#Contenedor_', OptionsContent);
var footerController = new JScreenQueryL(false, '#Footer_', OptionsFooter);


/*Podemos obtener el id general asignado a los elementos mediante*/
const _N_ID_ = '#' + navController.getID();
const _C_ID_ = '#' + contentController.getID();
const _F_ID_ = '#' + footerController.getID();

console.log('NavControllerID', _N_ID_);
console.log('contentControllerID', _C_ID_);
console.log('footerControllerID', _F_ID_);


$(document).ready(function () {
    navController.loadScreen('menuP', paramsScreens);
    contentController.loadScreen('home', paramsScreens);
});