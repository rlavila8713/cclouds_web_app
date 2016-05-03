/**
 * Created by Reinier on 06/03/2016.
 */
'use strict';

app.controller('EmpresaController', ['$scope', 'EmpresaService', '$window', '$filter', function ($scope, EmpresaService, $window, $filter) {
    var self = this;
    var flag = false;
    self.empresa = {
        idEmpresa: null,
        nombreEmpresa: '',
        observacionEmpresa: '',
        idRepresentante: '',
        rupEmpresa: '',
        fechaConstitucionEmpresa: '',
        esloganEmpresa: '',
        imagenEmpresa: ''
    };
    self.empresas = [];
    self.entries = 10;
    self.empresasName = [];
    self.searchEmpresa = '';
    self.sortType     = 'nombreEmpresa'; // set the default sort type
    self.sortReverse  = false;  // set the default sort order

    self.fetchAllEmpresas = function () {
        EmpresaService.fetchAllEmpresas()
            .then(
                function (data) {
                    self.empresas = data;

                    for (var i = 0; i < data.empresas.length; i++) {
                        self.empresasName[data.empresas[i].idEmpresa]=data.empresas[i].nombreEmpresa;
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
            return Math.ceil(self.empresas.empresas.length / self.pageSize);
        };
		
		self.cantCurrentPage = function()
		{
			return self.curPage<(Math.ceil(self.empresas.empresas.length / self.pageSize))-1? self.entries: self.empresas.empresas.length % self.pageSize
		}
    };

    self.createEmpresa = function (empresa) {
        EmpresaService.createEmpresa(empresa)
            .then(function (data) {
                    swal({
                            title: 'Nueva Empresa',
                            text: "La Empresa ha sido adicionada satisfactoriamente",
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
                    swal("Error...", "Ha ocurrido un error mientras se creaba la empresa.! " + errResponse.data.message, "error");
                    console.error('Error while creating Empresa.');
                }
            );
    };

    self.updateEmpresa = function (empresa, id) {
        EmpresaService.updateEmpresa(empresa, id)
            .then(function (data) {
                    swal({
                            title: 'Empresa',
                            text: "Los datos de la empresa han sido modificados satisfactoriamente",
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
                    swal("Error...", "Ha ocurrido un error mientras se actualizaban los datos de la empresa! "+errResponse.data.message, "error");
                    console.error('Error while updating Empresa.');
                }
            );
    };

    self.deleteEmpresa = function (id) {
        swal({
                title: 'Esta Ud. seguro?',
                text: "Se borrara toda la informacion referente a la empresa",
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
                                swal("Eliminado!", "Los datos de la empresa han sido eliminados.", "success");
                                self.fetchAllEmpresas();
                            },
                            function (errResponse) {
                                swal("Error...", "Ha ocurrido un error mientras se eliminaban los datos de la empresa.! "+errResponse.data.message, "error");
                                console.error('Error while deleting Empresa.');
                            }
                        );
                }
                else {
                    swal("Cancelado", "Los datos de la empresa estan seguros", "error");
                }
            });
    };

    self.submit = function () {
        self.empresa.fechaConstitucionEmpresa = $filter('date')(self.empresa.fechaConstitucionEmpresa, 'yyyy/MM/dd');
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

        for (var i = 0; i < self.empresas.empresas.length; i++) {
            if (self.empresas.empresas[i].idEmpresa === id) {
                self.empresa = angular.copy(self.empresas.empresas[i]);
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
        self.empresa = {
            idEmpresa: null,
            nombreEmpresa: '',
            observacionEmpresa: '',
            idRepresentante: '',
            rupEmpresa: '',
            fechaConstitucionEmpresa: '',
            esloganEmpresa: '',
            imagenEmpresa: ''
        };
        $scope.empresaForm.$setPristine(); //reset Form
    };

    self.valuationDate = new Date();
    self.valuationDatePickerIsOpen = false;

    self.valuationDatePickerOpen = function () {
        this.valuationDatePickerIsOpen = true;
    };

}]);

