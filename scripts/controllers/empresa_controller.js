/**
 * Created by Reinier on 06/03/2016.
 */
'use strict';

app.controller('EmpresaController', ['$scope', 'EmpresaService', '$window', function ($scope, EmpresaService, $window) {
    var self = this;
    var flag = false;
    self.empresa = {idEmpresa: null, codeEmpresa: '', nameEmpresa: '', descriptionEmpresa: ''};
    self.countries = [];
    self.entries = 10;
    self.countriesName = [];
    self.searchEmpresa = '';
    self.sortType     = 'nameEmpresa'; // set the default sort type
    self.sortReverse  = false;  // set the default sort order

    self.fetchAllEmpresas = function () {
        EmpresaService.fetchAllEmpresas()
            .then(
                function (data) {
                    self.countries = data;

                    for (var i = 0; i < data.countries.length; i++) {
                        self.countriesName[data.countries[i].idEmpresa]=data.countries[i].nameEmpresa;
                    }
                },
                function (errResponse) {
                    console.error('Error while fetching Currencies');
                }
            );
    };
    self.fetchAllEmpresas();

    self.showData = function () {
        self.curPage = 0;
        self.pageSize = self.entries;

        self.numberOfPages = function () {
            return Math.ceil(self.countries.countries.length / self.pageSize);
        };
    };

    self.createEmpresa = function (empresa) {
        EmpresaService.createEmpresa(empresa)
            .then(function (data) {
                    swal({
                            title: 'Nuevo Pais',
                            text: "El pais ha sido adicionado satisfactoriamente",
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "success",
                            confirmButtonText: "Aceptar",
                            cancelButtonText: "Cancelar",
                            closeOnConfirm: true
                        },
                        function (clickedAction) {
                            if (clickedAction == true) {
                                self.fetchAllEmpresas();
                            }
                            return false;
                        });
                }, function (errResponse) {
					console.log(errResponse);
                    swal("Error...", "Ha ocurrido un error mientras se creaba el pais.! " + errResponse.data.message, "error");
                    console.error('Error while creating Empresa.');
                }
            );
    };

    self.updateEmpresa = function (empresa, id) {
        EmpresaService.updateEmpresa(empresa, id)
            .then(function (data) {
                    swal({
                            title: 'Pais',
                            text: "Los datos de pais han sido modificados satisfactoriamente",
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "success",
                            confirmButtonText: "Aceptar",
                            cancelButtonText: "Cancelar",
                            closeOnConfirm: true
                        },
                        function (clickedAction) {
                            if (clickedAction == true) {
                                self.fetchAllEmpresas();
                            }
                            return false;
                        });
                }, function (errResponse) {
                    swal("Error...", "Ha ocurrido un error mientras se actualizaban los datos de pais! "+errResponse.data.message, "error");
                    console.error('Error while updating Empresa.');
                }
            );
    };

    self.deleteEmpresa = function (id) {
        swal({
                title: 'Esta Ud. seguro?',
                text: "Se borrara toda la informacion referente al pais",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Si, eliminar!",
                cancelButtonText: "Cancelar",
                closeOnConfirm: true
            },
            function (isConfirm) {
                if (isConfirm) {
                    EmpresaService.deleteEmpresa(id)
                        .then(function (data) {
                                swal("Eliminado!", "Los datos de pais han sido eliminados.", "success");
                                self.fetchAllEmpresas();
                            },
                            function (errResponse) {
                                swal("Error...", "Ha ocurrido un error mientras se eliminaban los datos de pais.! "+errResponse.data.message, "error");
                                console.error('Error while deleting Empresa.');
                            }
                        );
                }
                else {
                    swal("Cancelado", "Los datos de pais estan seguros", "error");
                }
            });
    };

    self.submit = function () {
        if (self.empresa.idEmpresa === null) {
            //console.log('Saving New Empresa', self.empresa);
            //console.log(self.empresa);
            self.createEmpresa(self.empresa);
        } else {
            self.updateEmpresa(self.empresa, self.empresa.idEmpresa);
            //console.log('Empresa updated with id ', self.empresa.idEmpresa);
        }
        self.reset();
    };

    self.edit = function (id) {
        //console.log('id to be edited', id);

        for (var i = 0; i < self.countries.countries.length; i++) {
            if (self.countries.countries[i].idEmpresa === id) {
                self.empresa = angular.copy(self.countries.countries[i]);
                break;
            }
        }
    };

    self.remove = function (id) {
        //console.log('id to be deleted', id);
        if (self.empresa.idEmpresa === id) {//clean form if the Empresa to be deleted is shown there.
            self.reset();
        }
        self.deleteEmpresa(id);
    };

    self.reset = function () {
        self.empresa = {idEmpresa: null, codeEmpresa: '', nameEmpresa: '', descriptionEmpresa: ''};
        $scope.empresaForm.$setPristine(); //reset Form
    };

}]);

