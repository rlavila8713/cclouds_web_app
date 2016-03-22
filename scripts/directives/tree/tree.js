'use strict';

angular.module('sbAdminApp')
.directive('tree', function() {
    return {
        template: '<ul><tree-node ng-repeat="item in items"></tree-node></ul>',
        restrict: 'E',
        replace: true,
        scope: {
            items: '=nodes',
        }
    };
});