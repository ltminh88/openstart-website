(function() {
    'use strict';

    // config
    var adminModule = angular.module('core.admin');

    angular.module('core.admin')
        .config(
            ['$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
                function($controllerProvider, $compileProvider, $filterProvider, $provide) {
                    jQuery('header').css('display', 'none');

                    // lazy controller, directive and service
                    adminModule.controller = $controllerProvider.register;
                    adminModule.directive = $compileProvider.directive;
                    adminModule.filter = $filterProvider.register;
                    adminModule.factory = $provide.factory;
                    adminModule.service = $provide.service;
                    adminModule.constant = $provide.constant;
                    adminModule.value = $provide.value;

                }
            ]);
    /*
    .config(['$translateProvider', function($translateProvider) {
        // Register a loader for the static files
        // So, the module will search missing translation tables under the specified urls.
        // Those urls are [prefix][langKey][suffix].
        $translateProvider.useStaticFilesLoader({
            prefix: 'i18n/',
            suffix: '.json'
        });
        // Tell the module what language to use by default
        $translateProvider.preferredLanguage('en');
        // Tell the module to store the language in the local storage
        $translateProvider.useLocalStorage();
    }]);
    */
}());
