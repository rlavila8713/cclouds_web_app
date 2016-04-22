/**
 * Created by reinier.leyva on 02/03/2016.
 */
'use strict';

app.controller('AdmModuloController', ['$scope', 'AdmModuloService', 'RolService', '$window',
    function ($scope, AdmModuloService, RolService, $window) {
        var self = this;
        self.rolId='';
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
                labelSelected: "a8",
                selectedNodes:self.selectedNodes
            }
        }
        self.selectedN = [];
        self.selectedNodes = [];
        self.modules = [];
        self.fetchListOfModules = function(idRol){
            RolService.getOptionsOfRol(idRol).then(function (d){
                var options = d;
                console.log(options);
                AdmModuloService.fetchListOfModules()
                    .then(
                    function (d) {
                        self.modules = d;
                        self.selectedN = [];
                        for(var i =0;i < options.length;i++){
                            for(var j=0;j< self.modules.length;j++){
                                if(options[i]==self.modules[j].id)
                                    self.selectedN.push(self.modules[j]);
                            }
                        }
                    },
                    function (errResponse) {
                        console.error('Error while fetching Currencies');
                    });
            });

        };

        self.test = function () {
            if(self.rolId=='')
                swal("Error...", 'No ha seleccionado un rol', "error");
            else
                RolService.addOptionsToRol(self.rolId,self.selectedNodes);
            console.log(self.selectedNodes);
        }
        self.toogleOption = function (id) {
            console.log(id);
            var pos = -1;
            for (var i = 0; i < self.selectedNodes.length; i++) {
                if (self.selectedNodes[i] == id) {
                    pos = i;
                    break;
                }
            }
            if (pos === -1) {
                self.selectedNodes.push(id);
            } else {
                self.selectedNodes.splice(pos, 1);
                if(self.rolId!='')
                    RolService.deleteRolOption(self.rolId,id);
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


