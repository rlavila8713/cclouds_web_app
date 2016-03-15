/**
 * Created by reinier.leyva on 02/03/2016.
 */
'use strict';

app.controller('RolController', ['$scope', 'RolService', '$window', function ($scope, RolService, $window) {
    var self = this;
    var flag = false;
    self.rol = {idRol: null, name: '', description: ''};
    self.rols = [];

    self.fetchAllRols = function () {
        RolService.fetchAllRols()
            .then(
                function (d) {
                    self.rols = d;
                },
                function (errResponse) {
                    console.error('Error while fetching Currencies');
                }
            );
    };

    self.fetchAllRols();

    self.showData = function () {
        self.curPage = 0;
        self.pageSize = 4;

        self.numberOfPages = function () {
            return Math.ceil(self.rols.rols.length / self.pageSize);
        };
    };

    self.getRolDescriptionByUserIdRol = function(id)
    {
        RolService.getRolById(id)
            .then(function (data) {
                self.rol.description = data.rol.description;
            }, function (errResponse) {
                console.error('Error while fetching Rol');
            });
    }

    self.createRol = function (rol) {
        RolService.createRol(rol)
            .then(
                swal({
                        title: 'New rol',
                        text: "The rol has been added successfully",
                        type: "success",
                        showCancelButton: false,
                        confirmButtonColor: "success",
                        confirmButtonText: "OK",
                        cancelButtonText: "Cancel",
                        closeOnConfirm: true
                    },
                    function (clickedAction) {
                        if (clickedAction == true) {
                            self.fetchAllRols();
                        }
                        return false;
                    }),
                function (errResponse) {
                    console.error('Error while creating Rol.');
                }
            );
    };

    self.updateRol = function (rol, id) {
        RolService.updateRol(rol, id)
            .then(
                swal({
                        title: 'Rol',
                        text: "The rol has been updated successfully",
                        type: "success",
                        showCancelButton: false,
                        confirmButtonColor: "success",
                        confirmButtonText: "OK",
                        cancelButtonText: "Cancel",
                        closeOnConfirm: true
                    },
                    function (clickedAction) {
                        if (clickedAction == true) {
                            self.fetchAllRols();
                        }
                        return false;
                    }),
                function (errResponse) {
                    console.error('Error while updating Rol.');
                }
            );
    };

    self.deleteRol = function (id) {
        swal({
                title: 'Are you sure?',
                text: "You will delete the rol and information",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "Cancel",
                closeOnConfirm: true
            },
            function (isConfirm) {
                if (isConfirm) {
                    RolService.deleteRol(id)
                        .then(function (data) {
                                swal("Deleted!", "Your rol has been deleted.", "success");
                                self.fetchAllRols();
                            },
                            function (errResponse) {
                                console.error('Error while deleting Rol.');
                            }
                        );
                } else {
                    swal("Cancelled", "Your rol is safe :)", "error");
                }
            });
    };

    self.submit = function () {
        if (self.rol.idRol === null) {
            console.log('Saving New Rol', self.rol);
            console.log(self.rol);
            self.createRol(self.rol);
        } else {
            self.updateRol(self.rol, self.rol.idRol);
            console.log('Rol updated with id ', self.rol.idRol);
        }
        self.reset();
    };

    self.edit = function (id) {
        console.log('id to be edited', id);

        for (var i = 0; i < self.rols.rols.length; i++) {
            if (self.rols.rols[i].idRol === id) {
                self.rol = angular.copy(self.rols.rols[i]);
                break;
            }
        }
    };

    self.remove = function (id) {
        console.log('id to be deleted', id);
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


