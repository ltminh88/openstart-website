(function(app) {
    'use strict';

    app.registerModule('core.admin', ['core',
        'ngAria',
        'ngMaterial',
        'ngStore',
//        'ui.utils',
//        'ui.bootstrap',
//        'ui.load',
//        'ui.jp',
        'pascalprecht.translate',
//        'angular-loading-bar'
    ]);
    app.registerModule('core.admin.routes', ['ui.router']);

}(ApplicationConfiguration));
