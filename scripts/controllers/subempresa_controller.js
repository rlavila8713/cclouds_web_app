/**
 * Created by Reinier on 06/03/2016.
 */
'use strict';

app.controller('SubempresaController', ['$scope', 'SubEmpresaService', '$window','$filter', function ($scope, SubEmpresaService, $window, $filter) {
    var self = this;
    var flag = false;
    self.subempresa = {
        idSubBmpresa: null,
        idEmpresa: '',
        nombreSubEmpresa: '',
        observacionSubEmpresa: '',
        idTipoNegocioSubEmpresa: '',
        idRepresentante1SubEmpresa: '',
        idRepresentante2SubEmpresa: '',
        fechaConstitucionSubEmpresa: '',
        esloganSubEmpresa: '',
        imagenLogoSubEmpresa: ''
    };
    self.subempresas = [];
    self.entries = 10;
    self.subempresaName = [];
    self.searchSubempresa = '';
    self.sortType     = 'subempresaName'; // set the default sort type
    self.sortReverse  = false;  // set the default sort order

    self.getSubEmpresaByIdEmpresa = function (idEmpresa) {
        SubEmpresaService.getSubEmpresaByIdEmpresa(idEmpresa)
            .then(function (data) {
                    self.subempresa = data;
                },
                function (errResponse) {
                    console.error('Error while getting Subempresa');
                });
    };

    self.fetchAllSubEmpresa = function () {
        SubEmpresaService.fetchAllSubEmpresa()
            .then(
                function (data) {
                    self.subempresas = data;

                    for (var i = 0; i < data.subempresas.length; i++) {
                        self.subempresaName[data.subempresas[i].idSubBmpresa]=data.subempresas[i].nombreSubEmpresa;
                    }
                },
                function (errResponse) {
                    console.error('Error while fetching Currencies');
                }
            );
    };

    self.fetchAllSubEmpresa();

    self.showData = function () {
        self.curPage = 0;
        self.pageSize = self.entries;

        self.numberOfPages = function () {
            return Math.ceil(self.subempresas.subempresas.length / self.pageSize);
        };
    };

    self.createSubEmpresa = function (subempresa) {
        SubEmpresaService.createSubEmpresa(subempresa)
            .then(function (data) {
                    swal({
                            title: 'Nueva Subempresa',
                            text: "La subempresa ha sido adicionada satisfactoriamente",
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "success",
                            confirmButtonText: "Aceptar",
                            cancelButtonText: "Cancelar",
                            closeOnConfirm: true
                        },
                        function (clickedAction) {
                            if (clickedAction == true) {
                                self.fetchAllSubEmpresa();
                            }
                            return false;
                        });
                }, function (errResponse) {
                    swal("Error...", "Ha ocurrido un error mientras se creaba la subempresa.! "+errResponse.data.message, "error");
                    console.error('Error while creating Subempresa.');
                }
            );
    };

    self.updateSubEmpresa = function (subempresa, id) {
        SubEmpresaService.updateSubEmpresa(subempresa, id)
            .then(function (data) {
                    swal({
                            title: 'Subempresa',
                            text: "Los datos de la Subempresa han sido modificados satisfactoriamente",
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "success",
                            confirmButtonText: "Aceptar",
                            cancelButtonText: "Cancelar",
                            closeOnConfirm: true
                        },
                        function (clickedAction) {
                            if (clickedAction == true) {
                                self.fetchAllSubEmpresa();
                            }
                            return false;
                        });
                },
                function (errResponse) {
                    swal("Error...", "Ha ocurrido un error mientras se actualizaban los datos de la Subempresa.! "+errResponse.data.message, "error");
                    console.error('Error while updating Subempresa.');
                }
            );
    };

    self.deleteSubEmpresa = function (id) {
        swal({
                title: 'Esta Ud. seguro?',
                text: "Se borrara toda la informacion referente a la subempresa",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Si, eliminar!",
                cancelButtonText: "Cancelar",
                closeOnConfirm: true
            },
            function (isConfirm) {
                if (isConfirm) {
                    SubEmpresaService.deleteSubEmpresa(id)
                        .then(function (data) {
                                swal("Eliminada!", "Los datos de la subempresa han sido eliminados.", "success");
                                self.fetchAllProvince();
                            },
                            function (errResponse) {
                                swal("Error...", "Ha ocurrido un error mientras se eliminaban los datos de la subempresa. "+errResponse.data.message, "error");
                                console.error('Error while deleting Subempresa.');
                            }
                        );
                }
                else {
                    swal("Cancelado", "Los datos de la subempresa estan seguros", "error");
                }
            });
    };

    self.submit = function () {
        self.subempresa.fechaConstitucionSubEmpresa= $filter('date')(self.subempresa.fechaConstitucionSubEmpresa, 'yyyy/MM/dd');
        if (self.subempresa.idSubBmpresa=== null) {
            self.createSubEmpresa(self.subempresa);
        } else {
            self.updateSubEmpresa(self.subempresa, self.subempresa.idSubBmpresa);
        }
        self.reset();
    };

    self.edit = function (id) {
        for (var i = 0; i < self.subempresas.subempresas.length; i++) {
            if (self.subempresas.subempresas[i].idSubBmpresa === id) {
                self.subempresa = angular.copy(self.subempresas.subempresas[i]);
                break;
            }
        }
    };

    self.remove = function (id) {
        if (self.subempresa.idSubBmpresa === id) {//clean form if the Province to be deleted is shown there.
            self.reset();
        }
        self.deleteSubEmpresa(id);
    };

    self.reset = function () {
        self.subempresa = {
            idSubBmpresa: null,
            idEmpresa: '',
            nombreSubEmpresa: '',
            observacionSubEmpresa: '',
            idTipoNegocioSubEmpresa: '',
            idRepresentante1SubEmpresa: '',
            idRepresentante2SubEmpresa: '',
            fechaConstitucionSubEmpresa: '',
            esloganSubEmpresa: '',
            imagenLogoSubEmpresa: ''
        };
        $scope.SubempresaForm.$setPristine(); //reset Form
    };

    self.valuationDate = new Date();
    self.valuationDatePickerIsOpen = false;

    self.valuationDatePickerOpen = function () {
        this.valuationDatePickerIsOpen = true;
    };

}]);

