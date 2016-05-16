/**
 * Created by reinier.leyva on 02/03/2016.
 */
'use strict';

app.controller('AdmModuloController', ['$scope', 'AdmModuloService', 'RolService','ivhTreeviewMgr','ivhTreeviewBfs', '$window',
    function ($scope, AdmModuloService, RolService, ivhTreeviewMgr,ivhTreeviewBfs,$window) {
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
        self.permissionTree = null;

        self.ivhTreeOptions = {
            twistieCollapsedTpl: '<span class="fa fa-plus-circle"></span>',
            twistieExpandedTpl: '<span class="fa fa-minus-circle"></span>',
            twistieLeafTpl: '<span class="fa fa-leaf"></span>',
            idAttribute: 'id',
            labelAttribute: 'name',
            useCheckboxes: true,
            expandToDepth: 2,

        }
        self.setPermissionTree = function(tree){
            self.permissionTree=tree;
            console.log("tree1:")
            console.log(tree);
        }

        self.permissionsAssignments = function(node,isChecked,tree){
            if(!node.leaf) //es un padre, por lo tanto asignar todos los permisos de los hijos recursively
            {
                           
            }
        };

        self.changeCallback = function(node,checked, tree) {
           self.lastChangedNode = node;
            //asignar permisos en caso de que se seleccione un padre
           if(!node.leaf) //es un padre, por lo tanto asignar todos los permisos de los hijos recursively
           {
                console.log("padre selected");
           }

            console.log(node);
        };


        self.fetchListOfModules = function(idRol,tree){
            RolService.getOptionsOfRol(idRol).then(function (d){
                var options = d;
                //console.log(options);
                AdmModuloService.fetchListOfModules()
                    .then(
                    function (d) {
                        self.modules = d;
                        self.selectedN = [];
                        ivhTreeviewMgr.deselectAll(self.tree);
                        for(var i =0;i < options.length;i++){
                            for(var j=0;j< self.modules.length;j++){
                                if(options[i]==self.modules[j].id) {
                                    ivhTreeviewMgr.select(self.tree, self.modules[j].id);//this line is to update the new tree
                                    self.selectedN.push(self.modules[j]);
                                }
                            }
                        }
                        console.log("set");
                    },
                    function (errResponse) {
                        console.error('Error while fetching Currencies');
                    });
            });

        };

        self.test = function () {
            if(self.rolId=='')
                swal("Error...", 'No ha seleccionado un rol', "error");
            else{
                var sNodes = [];
                ivhTreeviewBfs(self.tree,function(node, parents){
                    if(node.leaf && node.selected)
                        sNodes.push(node.id);
                });
                RolService.addOptionsToRol(self.rolId,sNodes);
            }
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


