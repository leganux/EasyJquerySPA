/*
 *
 * Plugin de renderizado de pantallas dinamicas  para desarrollos jQUERY
 * Desarrollado Por Angel Erick Cruz Olivera
 * V 3.0.3 Abril. 2018
 *
 * *************************************************************  */


var JScreenQueryL = function (urID, Container, options) {
    this.makeID = function () {
        var text = "";
        var text2 = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_";
        for (var i = 0; i < 11; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        for (var i = 0; i < 11; i++)
            text2 += possible.charAt(Math.floor(Math.random() * possible.length));
        return text + 'l3GaNuX_CoM' + text2 + 'YnkgQW5nZWxFcmlja0NydXpPLg';
    };
    this.El_id = urID;
    this.idContainer = Container;
    this.SharedVars = 'e30=';
    this.options = {};
    this.historic = [];
    this.JSON_IDS = {};
    this.JSONLANG = {};
    if (urID) {
        this.El_id = urID;
    } else {
        this.El_id = this.makeID();
    }
    if (options.Language) {
        this.options.language = options.Language;
    } else {
        this.options.language = 'es-ES';
    }
    if (options.LanguageRoute) {
        this.options.LanguageRoute = options.LanguageRoute;
    } else {
        this.options.LanguageRoute = false;
    }
    if (options.LanguagebyParam) {
        this.options.LanguagebyParam = options.LanguagebyParam;
    } else {
        this.options.LanguagebyParam = false;
    }
    if (options.ViewsRoute) {
        this.options.ViewsRoute = options.ViewsRoute;
    } else {
        this.options.ViewsRoute = false;
    }
    if (options.ViewsType) {
        this.options.ViewsType = options.ViewsType;
    } else {
        this.options.ViewsType = '.html';
    }
    if (options.FunctionsRoute) {
        this.options.FunctionsRoute = options.FunctionsRoute;
    } else {
        this.options.FunctionsRoute = false;
    }
    this.options.MyId = this.El_id;
    this.options.container = this.idContainer;
    this.SetScript = function (options, EL) {
        if (options.FunctionsRoute) {
            $.getScript(options.FunctionsRoute + options.name + '.js', function () {
                f_ = options.F_;
                if ($.isFunction(f_)) {
                    f_();
                }
            });
        } else {
            f_ = options.F_;
            if ($.isFunction(f_)) {
                f_();
            }
        }
    };
    this.PrintData = function (options, EL) {


        var re = new RegExp('{{(.*?)}}', "g");
        var Obj = options.html.match(re);

        var OBJJSONRETURN = {};
        var NoRepeat = [];

        if (!Obj) {
            $(options.container).html(options.html);

            // Mr_Scroller_33_3(options.idContainer);
            EL.JSON_IDS = OBJJSONRETURN;
            EL.SetScript(options, EL);
        } else {
            $.each(Obj, function (i, item) {

                item = item.replace('{{', '');
                item = item.replace('}}', '');
                var reex = new RegExp('{{' + item + '}}', "g");
                var newID = EL.makeID();
                while (NoRepeat.includes(newID)) {
                    newID = EL.makeID();
                }
                options.html = options.html.replace(reex, newID);
                OBJJSONRETURN[item] = newID;
                NoRepeat.push(newID);

                if ((i + 1) === Obj.length) {
                    $(options.container).html(options.html);

                    // Mr_Scroller_33_3(options.idContainer);
                    EL.JSON_IDS = OBJJSONRETURN;
                    EL.SetScript(options, EL);

                }

            });

        }

    };
    this.SetLanguageIt = function (options, lang, EL) {
        $.each(lang, function (i, item) {
            var nombre = item.label;
            var re = new RegExp('{L=' + nombre + '=}', "g");
            options.html = options.html.replace(re, item.data);
            if ((i + 1) === lang.length) {
                EL.PrintData(options, EL);
            }
        });
    };
    this.SetLanguage = function (options, EL) {
        if (!options.LanguagebyParam) {
            $.getJSON(options.LanguageRoute + options.language + '.json?v=_' + EL.makeID(), {}, function (lang) {
                EL.SetLanguageIt(options, lang, EL);
                EL.JSONLANG = lang;
            });
        } else {
            $.getJSON(options.LanguageRoute, {langParameter: options.language}, function (lang) {
                EL.SetLanguageIt(options, lang, EL);
                EL.JSONLANG = lang;
            });
        }
    };
    this.SetComponents = function (options, EL) {
        $.each(options.components, function (i, item) {
            var nombre = item.matchs;

            var re = new RegExp('<' + nombre + '/>', "g");
            options.html = options.html.replace(re, item.content);
            if ((i + 1) === options.components.length) {
                if (options.LanguageRoute) {
                    EL.SetLanguage(options, EL);
                } else {
                    EL.PrintData(options, EL);
                }

            }
        });
    };
    this.SetParams = function (options, EL) {
        $.each(options.params, function (i, item) {
            var nombre = item.name;
            var re = new RegExp('{=' + nombre + '=}', "g");
            options.html = options.html.replace(re, item.param);
            if ((i + 1) === options.params.length) {
                if (options.components) {
                    EL.SetComponents(options, EL);
                } else if (options.LanguageRoute) {
                    EL.SetLanguage(options, EL);
                } else {
                    EL.PrintData(options, EL);
                }

            }
        });
    };
    this.loadScreen = function (name, params, components, f_) {
        var options = this.options;
        var El = this;
        if (params) {
            options.params = params;
        }
        if (components) {
            options.components = components;
        }
        if (name) {

            options.name = name;
        } else {
            var msg = 'Imposible cargar la pantalla si no existe nombre';
            console.log(msg);
            return msg;
        }
        if (f_) {
            options.F_ = f_;
        }
        if (!options.ViewsRoute) {
            var msg = 'Imposible cargar la pantalla si no existe alguna ruta de vistas';
            console.log(msg);
            return msg;
        }

        $.ajax({
            url: options.ViewsRoute + name + options.ViewsType + '?_=' + El.makeID(),
            type: 'GET',
            dataType: "text",
            success: function (data) {
                options.html = data;
                if (params) {
                    El.SetParams(options, El);
                }
                else if (options.components) {
                    El.SetComponents(options, El);
                } else if (options.LanguageRoute) {
                    El.SetLanguage(options, El);
                } else {
                    El.PrintData(options, El);
                }
            },
            error: function (xhr, status, error) {
                return xhr + ' ' + error;
            }

        });

    };
    this.getID = function () {
        return this.El_id;
    };
    this.getVar = function (name) {
        var SharedVars = this.SharedVars;
        var data = window.atob(SharedVars);
        data = JSON.parse(data);
        return data[name];
    };
    this.setVar = function (name, content) {
        var SharedVars = this.SharedVars;
        var data = window.atob(SharedVars);
        data = JSON.parse(data);
        data[name] = content;
        data = JSON.stringify(data);
        SharedVars = window.btoa(data);
        this.SharedVars = SharedVars;
    };
    this.getRefernces = function () {
        return this.JSON_IDS;
    };
};


function Mr_Scroller_33_3(ID_Elemento) {
    $('html, body').animate({
        scrollTop: ($(ID_Elemento).offset().top) - 200
    }, 1000);
}