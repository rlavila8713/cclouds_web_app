/**
 * Created by reinier.leyva on 02/03/2016.
 */
'use strict';

app.controller('RolController', ['$scope', 'RolService', '$window', function ($scope, RolService,$window) {
    var self = this;
    var flag = false;
    self.rol = {idRol: null, name: '', description: ''};
    self.rols = [];
    self.rolDescriptions=[];
	self.entries = 10;
    self.searchRole = '';
    self.sortType     = 'name'; // set the default sort type
    self.sortReverse  = false;  // set the default sort order

    self.fetchAllRols = function () {
        RolService.fetchAllRols()
            .then(
                function (d) {
                    self.rols = d;

                    for (var i = 0; i < d.rols.length; i++) {
                        console.log(d.rols[i]);
                        self.rolDescriptions[d.rols[i].idRol]=d.rols[i].description;
                    }
                },
                function (errResponse) {
                    console.error('Error while fetching Currencies');
                }
            );
    };

    self.fetchAllRols();

    self.showData = function () {
        self.curPage = 0;
        self.pageSize = self.entries;

        self.numberOfPages = function () {
            return Math.ceil(self.rols.rols.length / self.pageSize);
        };
    };

    self.getRolDescriptionByUserIdRol = function (id) {
        RolService.getRolById(id)
            .then(function (data) {
                self.rol.description = data.rol.description;
                console.log(data.rol.description);
                return data.rol.description;
            }, function (errResponse) {
                console.error('Error while fetching Rol');
            });
    }

    self.createRol = function (rol) {
        RolService.createRol(rol)
            .then(function (data) {
                    swal({
                            title: 'Nuevo Rol',
                            text: "El Rol ha sido adicionado satisfactoriamente",
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "success",
                            confirmButtonText: "Aceptar",
                            cancelButtonText: "Cancelar",
                            closeOnConfirm: true
                        },
                        function (clickedAction) {
                            if (clickedAction == true) {
                                self.fetchAllRols();
                            }
                            return false;
                        });
                }, function (errResponse) {
                    swal("Error...","Ha ocurrido un error creando el rol.! "+errResponse.data.message, "error");
                    console.error('Error while creating Rol.');
                }
            );
    };

    self.updateRol = function (rol, id) {
        RolService.updateRol(rol, id)
            .then(function (data) {
                    swal({
                            title: 'Rol',
                            text: "Los datos del rol han sido modificados satisfactoriamente",
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "success",
                            confirmButtonText: "Aceptar",
                            cancelButtonText: "Cancelar",
                            closeOnConfirm: true
                        },
                        function (clickedAction) {
                            if (clickedAction == true) {
                                self.fetchAllRols();
                            }
                            return false;
                        });
                }, function (errResponse) {
                    swal("Error...", "Ha ocurrido un error mientras se actualizaban los datos del rol.! "+errResponse.data.message, "error");
                    console.error('Error while updating Rol.');
                }
            );
    };

    self.deleteRol = function (id) {
        swal({
                title: 'Esta Ud. seguro?',
                text: "Se borrara toda la informacion referente al rol",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Si, eliminar!",
                cancelButtonText: "Cancelar",
                closeOnConfirm: true
            },
            function (isConfirm) {
                if (isConfirm) {
                    RolService.deleteRol(id)
                        .then(function (data) {
                                swal("Eliminado!", "Los datos del rol han sido eliminados.", "success");
                                self.fetchAllRols();
                            },
                            function (errResponse) {
                                swal("Error...", "Ha ocurrido un error mientras se eliminaban los datos del rol.! "+errResponse.data.message, "error");
                                console.error('Error while deleting Rol.');
                            }
                        );
                } else {
                    swal("Cancelado", "Los datos del rol estan seguros", "error");
                }
            });
    };

    self.submit = function () {
        if (self.rol.idRol === null) {
            //console.log('Saving New Rol', self.rol);
            //console.log(self.rol);
            self.createRol(self.rol);
        } else {
            self.updateRol(self.rol, self.rol.idRol);
            //console.log('Rol updated with id ', self.rol.idRol);
        }
        self.reset();
    };

    self.edit = function (id) {
        //console.log('id to be edited', id);

        for (var i = 0; i < self.rols.rols.length; i++) {
            if (self.rols.rols[i].idRol === id) {
                self.rol = angular.copy(self.rols.rols[i]);
                break;
            }
        }
    };

    self.remove = function (id) {
        //console.log('id to be deleted', id);
        if (self.rol.idRol === id) {//clean form if the rol to be deleted is shown there.
            self.reset();
        }
        self.deleteRol(id);
    };

    self.reset = function () {
        self.rol = {idRol: null, name: '', description: ''};
        $scope.RolForm.$setPristine(); //reset Form
    };

}]);


