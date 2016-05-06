/**
 * Created by Reinier on 06/03/2016.
 */
'use strict';

app.controller('SucursalController', ['$scope', 'SucursalService', '$window', function ($scope, SucursalService, $window) {
    var self = this;
    var flag = false;
    self.sucursal = {
        idSucursal: null,
        idSubEmpresa: '',
        nombreSucursal: '',
        observacionSucursal: '',
        idRepresentanteSucursal: ''
    };
    self.sucursales = [];
    self.entries = 10;
    self.sucursalesName = [];
    self.searchSucursal = '';
    self.sortType = 'nombreSucursal'; // set the default sort type
    self.sortReverse = false;  // set the default sort order
    var sucursalesLength = 0;

    self.getSucursalesByIdSubEmpresa = function (idSubEmpresa) {
        SucursalService.getSucursalesByIdSubEmpresa(idSubEmpresa)
            .then(function (data) {
                    self.sucursales = data;
                },
                function (errResponse) {
                    console.error('Error while getting Sucursales');
                });
    };

    self.fetchAllSucursales = function () {
        SucursalService.fetchAllSucursales()
            .then(
                function (data) {
                    self.sucursales = data;
                    sucursalesLength = self.sucursales.sucursales.length;
                    for (var i = 0; i < sucursalesLength; i++) {
                        self.sucursalesName[data.sucursales[i].idSucursal] = data.sucursales[i].nombreSucursal;
                    }
                },
                function (errResponse) {
                    swal("Error...", "Ha ocurrido un error.! "+errResponse.data.message, "error");
                    console.error('Error while fetching Currencies');
                }
            );
    };

    self.fetchAllSucursales();

    self.showData = function () {
        self.curPage = 0;
        self.pageSize = self.entries;

        self.numberOfPages = function () {
            return Math.ceil(sucursalesLength / self.pageSize);
        };
		self.cantCurrentPage = function()
		{
			return self.curPage<(Math.ceil(sucursalesLength / self.pageSize))-1? self.entries: sucursalesLength % self.pageSize
		}
    };

    self.createSucursal = function (sucursal) {
        SucursalService.createSucursal(sucursal)
            .then(function (data) {
                    swal({
                            title: 'Nueva Sucursal',
                            text: "La sucursal ha sido adicionada satisfactoriamente",
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "success",
                            confirmButtonText: "Aceptar",
                            cancelButtonText: "Cancelar",
                            closeOnConfirm: true
                        },
                        function (clickedAction) {
                            if (clickedAction == true) {
                                self.fetchAllSucursales();
                            }
                            return false;
                        });
                }, function (errResponse) {
                    swal("Error...", "Ha ocurrido un error mientras se creaba la sucursal.! " + errResponse.data.message, "error");
                    console.error('Error while creating Sucursal.');
                }
            );
    };

    self.updateSucursal = function (sucursal, id) {
        SucursalService.updateSucursal(sucursal, id)
            .then(function (data) {
                    swal({
                            title: 'Sucursal',
                            text: "Los datos de la sucursal han sido modificados satisfactoriamente",
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "success",
                            confirmButtonText: "Aceptar",
                            cancelButtonText: "Cancelar",
                            closeOnConfirm: true
                        },
                        function (clickedAction) {
                            if (clickedAction == true) {
                                self.fetchAllSucursales();
                            }
                            return false;
                        });
                }, function (errResponse) {
                    swal("Error...", "Ha ocurrido un error mientras se actualizaban los datos de la sucursal!" + errResponse.data.message, "error");
                    console.error('Error while updating Sucursal.');
                }
            );
    };

    self.deleteSucursal = function (id) {
        swal({
                title: 'Esta Ud. seguro?',
                text: "Se borrara toda la informacion referente a la sucursal",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Si, eliminar!",
                cancelButtonText: "Cancelar",
                closeOnConfirm: true
            },
            function (isConfirm) {
                if (isConfirm) {
                    SucursalService.deleteSucursal(id)
                        .then(function (data) {
                                swal("Eliminada!", "Los datos de sucursal han sido eliminados.", "success");
                                self.fetchAllSucursales();
                            },
                            function (errResponse) {
                                swal("Error...", "Ha ocurrido un error mientras se eliminaban los datos de la sucursal.! " + errResponse.data.message, "error");
                                console.error('Error while deleting Sucursal.');
                            }
                        );
                }
                else {
                    swal("Cancelado", "Los datos de la sucursal estan seguros", "error");
                }
            });
    };

    self.submit = function () {
        if (self.sucursal.idSucursal === null) {
            console.log('Saving New Sucursal', self.sucursal);
            console.log(self.sucursal);
            self.createSucursal(self.sucursal);
        } else {
            self.updateSucursal(self.sucursal, self.sucursal.idSucursal);
        }
        self.reset();
    };

    self.edit = function (id) {
        for (var i = 0; i < self.sucursales.sucursales.length; i++) {
            if (self.sucursales.sucursales[i].idSucursal === id) {
                self.sucursal = angular.copy(self.sucursales.sucursales[i]);
                break;
            }
        }
    };

    self.remove = function (id) {
        //console.log('id to be deleted', id);
        if (self.sucursal.idSucursal === id) {//clean form if the City to be deleted is shown there.
            self.reset();
        }
        self.deleteSucursal(id);
    };

    self.reset = function () {
        self.sucursal = {
            idSucursal: null,
            idSubEmpresa: '',
            nombreSucursal: '',
            observacionSucursal: '',
            idRepresentanteSucursal: ''
        };
        $scope.SucursalesForm.$setPristine(); //reset Form
    };
}
]);

