'use strict';
/**
 * @ngdoc overview
 * @name sbAdminApp
 * @description
 * # sbAdminApp
 *
 * Main module of the application.
 */
var app = angular
    .module('sbAdminApp', [
        'oc.lazyLoad',
        'ui.router',
        'ui.bootstrap',
        'angular-loading-bar',
		'treeControl'

    ])
    .factory('retryInterceptor',['$q','$log','$rootScope', function($q,$log,$rootScope){
        $log.debug('$log is here to show you that this is a regular factory with injection');
        var retryInterceptor = {
            response: function (response) {
                if (response.status === 207) {
                    //return $injector.get('$http')(errResponse.config);
                    $rootScope.$broadcast('go_to_login_page');
                    return $q.reject(response);
                } else {
                    return response;
                }
            }

        };
        return retryInterceptor;
    }])
    .config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', '$httpProvider',
        function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $httpProvider) {

        $httpProvider.interceptors.push('retryInterceptor');
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];


        $ocLazyLoadProvider.config({
            debug: false,
            events: true,
        });

        $urlRouterProvider.otherwise('/dashboard/home');

        $stateProvider
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'views/dashboard/main.html',
                resolve: {
                    loadMyDirectives: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(
                            {
                                name: 'sbAdminApp',
                                files: [
                                    'scripts/directives/header/header.js',
                                    'scripts/directives/header/header-notification/header-notification.js',
                                    'scripts/directives/sidebar/sidebar.js',
                                    'scripts/directives/sidebar/sidebar-search/sidebar-search.js'
                                ]
                            }),
                            $ocLazyLoad.load(
                                {
                                    name: 'toggle-switch',
                                    files: ["js/angular-toggle-switch.min.js",
                                        "css/angular-toggle-switch.css"
                                    ]
                                }),
                            $ocLazyLoad.load(
                                {
                                    name: 'ngAnimate',
                                    files: ['js/angular-animate.js']
                                }),
                            $ocLazyLoad.load(
                                {
                                    name: 'ngCookies',
                                    files: ['js/angular-cookies.js']
                                }),
                            $ocLazyLoad.load(
                                {
                                    name: 'ngResource',
                                    files: ['js/angular-resource.js']
                                }),
                            $ocLazyLoad.load(
                                {
                                    name: 'ngSanitize',
                                    files: ['js/angular-sanitize.js']
                                }),
                            $ocLazyLoad.load(
                                {
                                    name: 'ngTouch',
                                    files: ['js/angular-touch.js']
                                })
                    }
                }
            })
            .state('dashboard.home', {
                url: '/home',
                controller: 'MainCtrl',
                templateUrl: 'views/dashboard/home.html',
                resolve: {
                    loadMyFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'sbAdminApp',
                            files: [
                                'scripts/controllers/main.js',
                                'scripts/directives/timeline/timeline.js',
                                'scripts/directives/notifications/notifications.js',
                                'scripts/directives/chat/chat.js',
                                'scripts/directives/dashboard/stats/stats.js'
                            ]
                        })
                    }
                }
            })
            .state('dashboard.form', {
                templateUrl: 'views/form.html',
                url: '/form'
            })
            .state('dashboard.blank', {
                templateUrl: 'views/pages/blank.html',
                url: '/blank'
            })
            .state('login', {
                templateUrl: 'views/pages/login.html',
                url: '/login'
            })
            .state('dashboard.chart', {
                templateUrl: 'views/chart.html',
                url: '/chart',
                controller: 'ChartCtrl',
                resolve: {
                    loadMyFile: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'chart.js',
                            files: [
                                'js/angular-chart.min.js',
                                'css/angular-chart.css'
                            ]
                        }),
                            $ocLazyLoad.load({
                                name: 'sbAdminApp',
                                files: ['scripts/controllers/chartContoller.js']
                            })
                    }
                }
            })
            .state('dashboard.table', {
                templateUrl: 'views/table.html',
                url: '/table'
            })
            .state('dashboard.panels-wells', {
                templateUrl: 'views/ui-elements/panels-wells.html',
                url: '/panels-wells'
            })
            .state('dashboard.buttons', {
                templateUrl: 'views/ui-elements/buttons.html',
                url: '/buttons'
            })
            .state('dashboard.notifications', {
                templateUrl: 'views/ui-elements/notifications.html',
                url: '/notifications'
            })
            .state('dashboard.typography', {
                templateUrl: 'views/ui-elements/typography.html',
                url: '/typography'
            })
            .state('dashboard.icons', {
                templateUrl: 'views/ui-elements/icons.html',
                url: '/icons'
            })
            .state('dashboard.grid', {
                templateUrl: 'views/ui-elements/grid.html',
                url: '/grid'
            })
            .state('dashboard.usuarios', {
                templateUrl: 'views/modules/administracion/usuarios/usuarios.html',
                url: '/usuarios'
            })
            .state('dashboard.roles', {
                templateUrl: 'views/modules/administracion/roles/roles.html',
                url: '/roles'			
            })
            .state('dashboard.menus', {
                templateUrl: 'views/modules/administracion/menus/menus.html',
                url: '/menus'
            })
            .state('dashboard.permisos', {
                templateUrl: 'views/modules/administracion/permisos/permisos.html',
                url: '/permisos',
				resolve: {
                    loadMyFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'sbAdminApp',
                            files: [
                                'scripts/directives/tree/tree-node/tree-node.js',
                                'scripts/directives/tree/tree.js'
                            ]
                        })
                    }
                }
            })
            .state('dashboard.modulos', {
                templateUrl: 'views/modules/administracion/modulos/modulos.html',
                url: '/modulos'
            })
            .state('dashboard.countries', {
                templateUrl: 'views/modules/administracion/direccion/countries.html',
                url: '/countries'
            })
            .state('dashboard.cities', {
                templateUrl: 'views/modules/administracion/direccion/cities.html',
                url: '/cities'
            })
            .state('dashboard.provinces', {
                templateUrl: 'views/modules/administracion/direccion/provinces.html',
                url: '/provinces'
            })
            .state('dashboard.parroquias', {
                templateUrl: 'views/modules/administracion/direccion/parroquias.html',
                url: '/parroquias'
            })
    }])
    .filter('pagination', function () {
        return function (input, start) {
            start = +start;
            if(input!=null)
                return input.slice(start);
        };
    });

    
