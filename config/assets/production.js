'use strict';

/* eslint comma-dangle:[0, "only-multiline"] */

module.exports = {
    client: {
        lib: {
           css: [
                // bower:css
                'public/lib/bootstrap/dist/css/bootstrap.css',
                'public/lib/bootstrap/dist/css/bootstrap-theme.css',
                'public/lib/components-font-awesome/css/font-awesome.css',

                'public/lib/angular-ui-notification/dist/angular-ui-notification.css',
                'public/lib/angular-ui-select/dist/select.css',
                'public/lib/angular-material/angular-material.css',
                'public/lib/angular-loading-bar/build/loading-bar.css',
                
                'public/lib/slick-1.6.0/slick/slick.css',
                'public/lib/slick-1.6.0/slick/slick-theme.css',
                'public/lib/videogular-themes-default/videogular.css',
                // endbower
            ],
            js: [
                // bower:js
                'public/lib/jquery/dist/jquery.js',
                'public/lib/jquery/dist/jquery-ui.min.js',

                'public/lib/angular/angular.js',
                'public/lib/oclazyload/dist/ocLazyLoad.js',
                'public/lib/angular-animate/angular-animate.js',
                'public/lib/angular-sanitize/angular-sanitize.js',
                'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
                'public/lib/angular-messages/angular-messages.js',
                'public/lib/angular-mocks/angular-mocks.js',
                'public/lib/angular-resource/angular-resource.js',
                'public/lib/angular-material/angular-material.js',
                'public/lib/angular-aria/angular-aria.js',
                'public/lib/angular-bowser/src/angular-bowser.js',

                'public/lib/angular-ui-notification/dist/angular-ui-notification.js',
                'public/lib/angular-ui-router/release/angular-ui-router.js',
                'public/lib/angular-ui-scroll/dist/ui-scroll.js',
                'public/lib/angular-ui-scroll/dist/ui-scroll-grid.js',
                'public/lib/angular-ui-scrollpoint/dist/scrollpoint.js',
                'public/lib/angular-ui-event/dist/event.js',
                'public/lib/angular-ui-mask/dist/mask.js',
                'public/lib/angular-ui-validate/dist/validate.js',
                'public/lib/angular-ui-uploader/dist/uploader.js',
                'public/lib/angular-ui-indeterminate/dist/indeterminate.js',
                'public/lib/angular-ui-utils/index.js',
                'public/lib/angular-ui-select/dist/select.js',
                'public/lib/ng-file-upload/ng-file-upload.js',
                'public/lib/ngstorage/ngStorage.js',
                'public/lib/angular-loading-bar/build/loading-bar.js',

                'public/lib/owasp-password-strength-test/owasp-password-strength-test.js',
//                'public/lib/angular-css/angular-css.min.js',
                'public/lib/angular-translate/angular-translate.js',
/*
                'public/lib/textAngular/dist/textAngular-sanitize.min.js',
                'public/lib/textAngular/dist/textAngular.min.js',
*/
                'public/lib/videogular/videogular.js',
                'public/lib/videogular-controls/vg-controls.js',
                'public/lib/videogular-poster/vg-poster.js',

                'public/lib/slick-1.6.0/slick/slick.js',
                'public/lib/soundManager2/soundmanager2.min.js',

                'public/lib/input/keypress-2.1.4.min.js'
                // endbower
            ]
        },
        css: 'public/dist/application*.min.css',
        js: 'public/dist/application*.min.js'
    }
};
