'use strict';
angular.module('sbAdminApp')
.directive('treeNode', function($compile) {
    return { 
        restrict: 'E',
        template: '<li >{{item.name}}</li>',
        link: function(scope, elm, attrs) {
        if (scope.item.nodes.length > 0) {
            var children = $compile('<tree nodes="item.nodes"></tree>')(scope);
            elm.append(children);
        }
    }
    };
});