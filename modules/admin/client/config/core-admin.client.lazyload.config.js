// lazyload config
(function() {
    'use strict';
    angular.module('core.admin')
        .constant('MODULE_CONFIG', [
            /*
              {
                  name: 'ui.select',
                  module: true,
                  files: [
                      '/lib/angular-ui-select/dist/select.min.js',
                      '/lib/angular-ui-select/dist/select.min.css'
                  ]
              },

              {
                  name: 'textAngular',
                  module: true,
                  files: [
                      '/lib/textAngular/dist/textAngular-sanitize.min.js',
                      '/lib/textAngular/dist/textAngular.min.js'
                  ]
              },
              */
            {
                name: 'vr.directives.slider',
                module: true,
                files: [
                    '/lib/venturocket-angular-slider/build/angular-slider.min.js',
                    '/lib/venturocket-angular-slider/angular-slider.css'
                ]
            }, {
                name: 'angularBootstrapNavTree',
                module: true,
                files: [
                    '/lib/angular-bootstrap-nav-tree/dist/abn_tree_directive.js',
                    '/lib/angular-bootstrap-nav-tree/dist/abn_tree.css'
                ]
            },
            /*
            {
                name: 'angularFileUpload',
                module: true,
                files: [
                    '/lib/angular-file-upload/angular-file-upload.js'
                ]
            },
            */
            {
                name: 'ngImgCrop',
                module: true,
                files: [
                    '/lib/ng-img-crop/compile/minified/ng-img-crop.js',
                    '/lib/ng-img-crop/compile/minified/ng-img-crop.css'
                ]
            }, {
                name: 'smart-table',
                module: true,
                files: [
                    '/lib/angular-smart-table/dist/smart-table.min.js'
                ]
            }, {
                name: 'ui.map',
                module: true,
                files: [
                    '/lib/angular-ui-map/ui-map.js'
                ]
            }, {
                name: 'ngGrid',
                module: true,
                files: [
                    '/lib/ng-grid/build/ng-grid.min.js',
                    '/lib/ng-grid/ng-grid.min.css',
                    '/lib/ng-grid/ng-grid.bootstrap.css'
                ]
            }, {
                name: 'ui.grid',
                module: true,
                files: [
                    '/lib/angular-ui-grid/ui-grid.min.js',
                    '/lib/angular-ui-grid/ui-grid.min.css',
                    '/lib/angular-ui-grid/ui-grid.bootstrap.css'
                ]
            }, {
                name: 'xeditable',
                module: true,
                files: [
                    '/lib/angular-xeditable/dist/js/xeditable.min.js',
                    '/lib/angular-xeditable/dist/css/xeditable.css'
                ]
            }, {
                name: 'smart-table',
                module: true,
                files: [
                    '/lib/angular-smart-table/dist/smart-table.min.js'
                ]
            }, {
                name: 'dataTable',
                module: false,
                files: [
                    '/exlib/datatables/media/js/jquery.dataTables.min.js',
                    '/exlib/plugins/integration/bootstrap/3/dataTables.bootstrap.js',
                    '/exlib/plugins/integration/bootstrap/3/dataTables.bootstrap.css'
                ]
            }, {
                name: 'footable',
                module: false,
                files: [
                    '/exlib/footable/dist/footable.all.min.js',
                    '/exlib/footable/css/footable.core.css'
                ]
            }, {
                name: 'easyPieChart',
                module: false,
                files: [
                    '/exlib/jquery.easy-pie-chart/dist/jquery.easypiechart.fill.js'
                ]
            }, {
                name: 'sparkline',
                module: false,
                files: [
                    '/exlib/jquery.sparkline/dist/jquery.sparkline.retina.js'
                ]
            }, {
                name: 'plot',
                module: false,
                files: [
                    '/exlib/flot/jquery.flot.js',
                    '/exlib/flot/jquery.flot.resize.js',
                    '/exlib/flot/jquery.flot.pie.js',
                    '/exlib/flot.tooltip/js/jquery.flot.tooltip.min.js',
                    '/exlib/flot-spline/js/jquery.flot.spline.min.js',
                    '/exlib/flot.orderbars/js/jquery.flot.orderBars.js'
                ]
            }, {
                name: 'vectorMap',
                module: false,
                files: [
                    '/exlib/bower-jvectormap/jquery-jvectormap-1.2.2.min.js',
                    '/exlib/bower-jvectormap/jquery-jvectormap.css',
                    '/exlib/bower-jvectormap/jquery-jvectormap-world-mill-en.js',
                    '/exlib/bower-jvectormap/jquery-jvectormap-us-aea-en.js'
                ]
            }, {
                name: 'moment',
                module: false,
                files: [
                    '/exlib/moment/moment.js'
                ]
            }
        ]);
    /*
      .config(['$ocLazyLoadProvider', 'MODULE_CONFIG', function($ocLazyLoadProvider, MODULE_CONFIG) {
          $ocLazyLoadProvider.config({
              debug: false,
              events: false,
              modules: MODULE_CONFIG
          });
      }]);
    */

}());
