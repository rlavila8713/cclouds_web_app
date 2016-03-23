/**
 * Created by reinier.leyva on 02/03/2016.
 */
'use strict';

app.controller('AdmModuloController', ['$scope', 'AdmModuloService', '$window', function ($scope, AdmModuloService, $window) {
    var self = this;
    self.entries = 10;
    self.tree = [];
    self.treeOptions = {
        nodeChildren: "children",
        dirSelectable: true,
        injectClasses: {
            ul: "a1",
            li: "a2",
            liSelected: "a7",
            iExpanded: "a3",
            iCollapsed: "a4",
            iLeaf: "a5",
            label: "a6",
            labelSelected: "a8"
        }
    }


    self.fetchTree = function () {
        AdmModuloService.fetchTree()
            .then(
                function (d) {
                    self.tree[0] = d.tree;
                },
                function (errResponse) {
                    console.error('Error while fetching Currencies');
                }
            );
    };

    self.fetchTree();

    self.showData = function () {
        self.curPage = 0;
        self.pageSize = self.entries;

        self.numberOfPages = function () {
            return Math.ceil(self.rols.rols.length / self.pageSize);
        };
    };


    self.reset = function () {

        $scope.RolForm.$setPristine(); //reset Form
    };

}]);


