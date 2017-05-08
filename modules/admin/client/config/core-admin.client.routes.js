(function() {
    'use strict';

    /**
     * @ngdoc function
     * @name app.config:uiRouter
     * @description
     * # Config
     * Config for the router
     */
    angular.module('core.admin.routes')
        .run(
            ['$rootScope', '$state', '$stateParams',
                function($rootScope, $state, $stateParams) {
                    $rootScope.$state = $state;
                    $rootScope.$stateParams = $stateParams;
                }
            ]
        )
        .config(
            ['$stateProvider', '$urlRouterProvider', 'MODULE_CONFIG',
                function($stateProvider, $urlRouterProvider, MODULE_CONFIG) {
                    console.log("Config admin routes");
                    /*
                    $urlRouterProvider
                        .otherwise('/admin/dashboard');
                    */
                    $stateProvider
                        .state('admin', {
                            abstract: true,
                            url: '/admin',
                            views: {
                                '': {
                                    templateUrl: '/modules/admin/client/views/admin.dashboard.client.view.html'
                                },
                                
                                'aside': {
                                    templateUrl: '/modules/admin/client/views/aside.html'
                                },
                                'content': {
                                    templateUrl: '/modules/admin/client/views/content.html'
                                }
                                
                            }
                        })
                        .state('admin.dashboard', {
                            url: '/dashboard',
                            templateUrl: '/modules/admin/client/views/pages/dashboard.html',
                            data: { title: 'Dashboard', folded: true },
                            /*
                            resolve: load([
                            //    '/modules/admin/client/controllers/lazy/chart.js', 
                            //    '/modules/admin/client/controllers/lazy/vectormap.js'
                                ])
                                */
                        })
                        .state('admin.analysis', {
                            url: '/analysis',
                            templateUrl: '/modules/admin/client/views/pages/dashboard.analysis.html',
                            data: { title: 'Analysis' },
                            resolve: load(['/modules/admin/client/controllers/lazy/chart.js', '/modules/admin/client/controllers/lazy/vectormap.js'])
                        })
                        .state('admin.wall', {
                            url: '/wall',
                            templateUrl: '/modules/admin/client/views/pages/dashboard.wall.html',
                            data: { title: 'Wall', folded: true }
                        })
                        /*
                        .state('admin.todo', {
                            url: '/todo',
                            templateUrl: 'apps/todo/todo.html',
                            data: { title: 'Todo', theme: { primary: 'indigo-800' } },
                            controller: 'TodoCtrl',
                            resolve: load('apps/todo/todo.js')
                        })
                        .state('admin.todo.list', {
                            url: '/{fold}'
                        })
                        .state('admin.note', {
                            url: '/note',
                            templateUrl: 'apps/note/main.html',
                            data: { theme: { primary: 'blue-grey' } }
                        })
                        .state('admin.note.list', {
                            url: '/list',
                            templateUrl: 'apps/note/list.html',
                            data: { title: 'Note' },
                            controller: 'NoteCtrl',
                            resolve: load(['apps/note/note.js', 'moment'])
                        })
                        .state('admin.note.item', {
                            url: '/{id}',
                            views: {
                                '': {
                                    templateUrl: 'apps/note/item.html',
                                    controller: 'NoteItemCtrl',
                                    resolve: load(['apps/note/note.js', 'moment'])
                                },
                                'navbar@': {
                                    templateUrl: 'apps/note/navbar.html',
                                    controller: 'NoteItemCtrl'
                                }
                            },
                            data: { title: '', child: true }
                        })

                        .state('admin.inbox', {
                            url: '/inbox',
                            templateUrl: 'apps/inbox/inbox.html',
                            data: { title: 'Inbox', folded: true },
                            resolve: load(['apps/inbox/inbox.js', 'moment'])
                        })
                        .state('admin.inbox.list', {
                            url: '/inbox/{fold}',
                            templateUrl: 'apps/inbox/list.html'
                        })
                        .state('admin.inbox.detail', {
                            url: '/{id:[0-9]{1,4}}',
                            templateUrl: 'apps/inbox/detail.html'
                        })
                        .state('admin.inbox.compose', {
                            url: '/compose',
                            templateUrl: 'apps/inbox/new.html',
                            resolve: load(['textAngular', 'ui.select'])
                        })
                        */
                        .state('ui', {
                            url: '/ui',
                            abstract: true,
                            views: {
                                '': {
                                    templateUrl: '/modules/admin/client/views/admin.dashboard.client.view.html'
                                },
                                'aside': {
                                    templateUrl: '/modules/admin/client/views/aside.html'
                                },
                                'content': {
                                    templateUrl: '/modules/admin/client/views/content.html'
                                }
                            }
                        })

                    /*
                    // components router
                    .state('ui.component', {
                        url: '/component',
                        abstract: true,
                        template: '<div ui-view></div>'
                    })
                    .state('ui.component.arrow', {
                        url: '/arrow',
                        templateUrl: '/modules/admin/client/views/ui/component/arrow.html',
                        data: { title: 'Arrows' }
                    })
                    .state('ui.component.badge-label', {
                        url: '/badge-label',
                        templateUrl: '/modules/admin/client/views/ui/component/badge-label.html',
                        data: { title: 'Badges & Labels' }
                    })
                    .state('ui.component.button', {
                        url: '/button',
                        templateUrl: '/modules/admin/client/views/ui/component/button.html',
                        data: { title: 'Buttons' }
                    })
                    .state('ui.component.color', {
                        url: '/color',
                        templateUrl: '/modules/admin/client/views/ui/component/color.html',
                        data: { title: 'Colors' }
                    })
                    .state('ui.component.grid', {
                        url: '/grid',
                        templateUrl: '/modules/admin/client/views/ui/component/grid.html',
                        data: { title: 'Grids' }
                    })
                    .state('ui.component.icon', {
                        url: '/icons',
                        templateUrl: '/modules/admin/client/views/ui/component/icon.html',
                        data: { title: 'Icons' }
                    })
                    .state('ui.component.list', {
                        url: '/list',
                        templateUrl: '/modules/admin/client/views/ui/component/list.html',
                        data: { title: 'Lists' }
                    })
                    .state('ui.component.nav', {
                        url: '/nav',
                        templateUrl: '/modules/admin/client/views/ui/component/nav.html',
                        data: { title: 'Navs' }
                    })
                    .state('ui.component.progressbar', {
                        url: '/progressbar',
                        templateUrl: '/modules/admin/client/views/ui/component/progressbar.html',
                        data: { title: 'Progressbars' }
                    })
                    .state('ui.component.streamline', {
                        url: '/streamline',
                        templateUrl: '/modules/admin/client/views/ui/component/streamline.html',
                        data: { title: 'Streamlines' }
                    })
                    .state('ui.component.timeline', {
                        url: '/timeline',
                        templateUrl: '/modules/admin/client/views/ui/component/timeline.html',
                        data: { title: 'Timelines' }
                    })
                    .state('ui.component.uibootstrap', {
                        url: '/uibootstrap',
                        templateUrl: '/modules/admin/client/views/ui/component/uibootstrap.html',
                        resolve: load('/modules/admin/client/controllers/lazy/bootstrap.js'),
                        data: { title: 'UI Bootstrap' }
                    })


                    // material routers
                    .state('ui.material', {
                        url: '/material',
                        template: '<div ui-view></div>',
                        resolve: load('/modules/admin/client/controllers/lazy/material.js')
                    })
                    .state('ui.material.button', {
                        url: '/button',
                        templateUrl: '/modules/admin/client/views/ui/material/button.html',
                        data: { title: 'Buttons' }
                    })
                    .state('ui.material.color', {
                        url: '/color',
                        templateUrl: '/modules/admin/client/views/ui/material/color.html',
                        data: { title: 'Colors' }
                    })
                    .state('ui.material.icon', {
                        url: '/icon',
                        templateUrl: '/modules/admin/client/views/ui/material/icon.html',
                        data: { title: 'Icons' }
                    })
                    .state('ui.material.card', {
                        url: '/card',
                        templateUrl: '/modules/admin/client/views/ui/material/card.html',
                        data: { title: 'Card' }
                    })
                    .state('ui.material.form', {
                        url: '/form',
                        templateUrl: '/modules/admin/client/views/ui/material/form.html',
                        data: { title: 'Form' }
                    })
                    .state('ui.material.list', {
                        url: '/list',
                        templateUrl: '/modules/admin/client/views/ui/material/list.html',
                        data: { title: 'List' }
                    })
                    .state('ui.material.ngmaterial', {
                        url: '/ngmaterial',
                        templateUrl: '/modules/admin/client/views/ui/material/ngmaterial.html',
                        data: { title: 'NG Material' }
                    })
                    // form routers
                    .state('ui.form', {
                        url: '/form',
                        template: '<div ui-view></div>'
                    })
                    .state('ui.form.layout', {
                        url: '/layout',
                        templateUrl: '/modules/admin/client/views/ui/form/layout.html',
                        data: { title: 'Layouts' }
                    })
                    .state('ui.form.element', {
                        url: '/element',
                        templateUrl: '/modules/admin/client/views/ui/form/element.html',
                        data: { title: 'Elements' }
                    })
                    .state('ui.form.validation', {
                        url: '/validation',
                        templateUrl: '/modules/admin/client/views/ui/form/validation.html',
                        data: { title: 'Validations' }
                    })
                    .state('ui.form.select', {
                        url: '/select',
                        templateUrl: '/modules/admin/client/views/ui/form/select.html',
                        data: { title: 'Selects' },
                        controller: 'SelectCtrl',
                        resolve: load(['ui.select', '/modules/admin/client/controllers/lazy/select.js'])
                    })
                    .state('ui.form.editor', {
                        url: '/editor',
                        templateUrl: '/modules/admin/client/views/ui/form/editor.html',
                        data: { title: 'Editor' },
                        controller: 'EditorCtrl',
                        resolve: load(['textAngular', '/modules/admin/client/controllers/lazy/editor.js'])
                    })
                    .state('ui.form.slider', {
                        url: '/slider',
                        templateUrl: '/modules/admin/client/views/ui/form/slider.html',
                        data: { title: 'Slider' },
                        controller: 'SliderCtrl',
                        resolve: load('/modules/admin/client/controllers/lazy/slider.js')
                    })
                    .state('ui.form.tree', {
                        url: '/tree',
                        templateUrl: '/modules/admin/client/views/ui/form/tree.html',
                        data: { title: 'Tree' },
                        controller: 'TreeCtrl',
                        resolve: load('/modules/admin/client/controllers/lazy/tree.js')
                    })
                    .state('ui.form.file-upload', {
                        url: '/file-upload',
                        templateUrl: '/modules/admin/client/views/ui/form/file-upload.html',
                        data: { title: 'File upload' },
                        controller: 'UploadCtrl',
                        resolve: load(['angularFileUpload', '/modules/admin/client/controllers/lazy/upload.js'])
                    })
                    .state('ui.form.image-crop', {
                        url: '/image-crop',
                        templateUrl: '/modules/admin/client/views/ui/form/image-crop.html',
                        data: { title: 'Image Crop' },
                        controller: 'ImgCropCtrl',
                        resolve: load(['ngImgCrop', '/modules/admin/client/controllers/lazy/imgcrop.js'])
                    })
                    .state('ui.form.editable', {
                        url: '/editable',
                        templateUrl: '/modules/admin/client/views/ui/form/xeditable.html',
                        data: { title: 'Xeditable' },
                        controller: 'XeditableCtrl',
                        resolve: load(['xeditable', '/modules/admin/client/controllers/lazy/xeditable.js'])
                    })
                    // table routers
                    .state('ui.table', {
                        url: '/table',
                        template: '<div ui-view></div>'
                    })
                    .state('ui.table.static', {
                        url: '/static',
                        templateUrl: '/modules/admin/client/views/ui/table/static.html',
                        data: { title: 'Static', theme: { primary: 'blue' } }
                    })
                    .state('ui.table.smart', {
                        url: '/smart',
                        templateUrl: '/modules/admin/client/views/ui/table/smart.html',
                        data: { title: 'Smart' },
                        controller: 'TableCtrl',
                        resolve: load(['smart-table', '/modules/admin/client/controllers/lazy/table.js'])
                    })
                    .state('ui.table.datatable', {
                        url: '/datatable',
                        data: { title: 'Datatable' },
                        templateUrl: '/modules/admin/client/views/ui/table/datatable.html'
                    })
                    .state('ui.table.footable', {
                        url: '/footable',
                        data: { title: 'Footable' },
                        templateUrl: '/modules/admin/client/views/ui/table/footable.html'
                    })
                    .state('ui.table.nggrid', {
                        url: '/nggrid',
                        templateUrl: '/modules/admin/client/views/ui/table/nggrid.html',
                        data: { title: 'NG Grid' },
                        controller: 'NGGridCtrl',
                        resolve: load(['ngGrid', '/modules/admin/client/controllers/lazy/nggrid.js'])
                    })
                    .state('ui.table.uigrid', {
                        url: '/uigrid',
                        templateUrl: '/modules/admin/client/views/ui/table/uigrid.html',
                        data: { title: 'UI Grid' },
                        controller: "UiGridCtrl",
                        resolve: load(['ui.grid', '/modules/admin/client/controllers/lazy/uigrid.js'])
                    })
                    .state('ui.table.editable', {
                        url: '/editable',
                        templateUrl: '/modules/admin/client/views/ui/table/editable.html',
                        data: { title: 'Editable' },
                        controller: 'XeditableCtrl',
                        resolve: load(['xeditable', '/modules/admin/client/controllers/lazy/xeditable.js'])
                    })
                    // chart
                    .state('ui.chart', {
                        url: '/chart',
                        templateUrl: '/modules/admin/client/views/ui/chart/chart.html',
                        data: { title: 'Charts' },
                        resolve: load('/modules/admin/client/controllers/lazy/chart.js')
                    })
                    // map routers
                    .state('ui.map', {
                        url: '/map',
                        template: '<div ui-view></div>'
                    })
                    .state('ui.map.google', {
                        url: '/google',
                        templateUrl: '/modules/admin/client/views/ui/map/google.html',
                        data: { title: 'Gmap' },
                        controller: 'GoogleMapCtrl',
                        resolve: load(['ui.map', '/modules/admin/client/controllers/lazy/load-google-maps.js', '/modules/admin/client/controllers/lazy/googlemap.js'], function() {
                            return loadGoogleMaps();
                        })
                    })
                    .state('ui.map.vector', {
                        url: '/vector',
                        templateUrl: '/modules/admin/client/views/ui/map/vector.html',
                        data: { title: 'Vector' },
                        controller: 'VectorMapCtrl',
                        resolve: load('/modules/admin/client/controllers/lazy/vectormap.js')
                    })
*/
                    .state('page', {
                            url: '/page',
                            views: {
                                '': {
                                    templateUrl: '/modules/admin/client/views/layout.html'
                                },
                                'aside': {
                                    templateUrl: '/modules/admin/client/views/aside.html'
                                },
                                'content': {
                                    templateUrl: '/modules/admin/client/views/content.html'
                                }
                            }
                        })
                        .state('page.profile', {
                            url: '/profile',
                            templateUrl: '/modules/admin/client/views/pages/profile.html',
                            data: { title: 'Profile', theme: { primary: 'green' } }
                        })
                        .state('page.settings', {
                            url: '/settings',
                            templateUrl: '/modules/admin/client/views/pages/settings.html',
                            data: { title: 'Settings' }
                        })
                        .state('page.blank', {
                            url: '/blank',
                            templateUrl: '/modules/admin/client/views/pages/blank.html',
                            data: { title: 'Blank' }
                        })
                        .state('page.document', {
                            url: '/document',
                            templateUrl: '/modules/admin/client/views/pages/document.html',
                            data: { title: 'Document' }
                        })
                        .state('404', {
                            url: '/404',
                            templateUrl: '/modules/admin/client/views/pages/404.html'
                        })
                        .state('505', {
                            url: '/505',
                            templateUrl: '/modules/admin/client/views/pages/505.html'
                        })
                        .state('access', {
                            url: '/access',
                            template: '<div class="indigo bg-big"><div ui-view class="fade-in-down smooth"></div></div>'
                        })
                        .state('access.signin', {
                            url: '/signin',
                            templateUrl: '/modules/admin/client/views/pages/signin.html'
                        })
                        .state('access.signup', {
                            url: '/signup',
                            templateUrl: '/modules/admin/client/views/pages/signup.html'
                        })
                        .state('access.forgot-password', {
                            url: '/forgot-password',
                            templateUrl: '/modules/admin/client/views/pages/forgot-password.html'
                        })
                        .state('access.lockme', {
                            url: '/lockme',
                            templateUrl: '/modules/admin/client/views/pages/lockme.html'
                        });


                    function load(srcs, callback) {
                        return {
                            deps: ['$ocLazyLoad', '$q',
                                function($ocLazyLoad, $q) {
                                    var deferred = $q.defer();
                                    var promise = false;
                                    srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
                                    if (!promise) {
                                        promise = deferred.promise;
                                    }
                                    angular.forEach(srcs, function(src) {
                                        promise = promise.then(function() {
                                            angular.forEach(MODULE_CONFIG, function(module) {
                                                if (module.name == src) {
                                                    if (!module.module) {
                                                        name = module.files;
                                                    } else {
                                                        name = module.name;
                                                    }
                                                } else {
                                                    name = src;
                                                }
                                            });
                                            return $ocLazyLoad.load(name);
                                        });
                                    });
                                    deferred.resolve();
                                    return callback ? promise.then(function() {
                                        console.log("Load finish promise.then");
                                        return callback();
                                    }) : promise;
                                }
                            ]
                        }
                    }
                }
            ]
        );

}());
