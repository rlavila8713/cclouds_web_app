/**
 * Created by Reinier on 06/03/2016.
 */
'use strict';

app.controller('SubempresaController', ['$scope', 'SubEmpresaService', '$window','$filter','NgTableParams', function ($scope, SubEmpresaService, $window, $filter, NgTableParams) {
    var self = this;
    var flag = false;
    self.subempresa = {
        idSubEmpresa: null,
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
    self.sortType     = 'nombreSubEmpresa'; // set the default sort type
    self.sortReverse  = false;  // set the default sort order
    var subempresasLength = 0;
	self.tableParams;
	var data = [];

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
                    subempresasLength = self.subempresas.subempresas.length;
					self.tableParams = new NgTableParams({ count: 5}, { counts: [5, 10, 25], dataset: data['subempresas']});

                    for (var i = 0; i < subempresasLength; i++) {
                        self.subempresaName[data.subempresas[i].idSubEmpresa]=data.subempresas[i].nombreSubEmpresa;
                    }
                },
                function (errResponse) {
                    swal("Error...", "Ha ocurrido un error.! "+errResponse.data.message, "error");
                    console.error('Error while fetching Currencies');
                }
            );
    };

    self.fetchAllSubEmpresa();

    self.showData = function () {
        self.curPage = 0;
        self.pageSize = self.entries;

        self.numberOfPages = function () {
            return Math.ceil(subempresasLength / self.pageSize);
        };
		self.cantCurrentPage = function()
		{
			return self.curPage<(Math.ceil(subempresasLength / self.pageSize))-1? self.entries: subempresasLength % self.pageSize
		}
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
                                self.fetchAllSubEmpresa();
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
        if (self.subempresa.idSubEmpresa=== null) {
            self.createSubEmpresa(self.subempresa);
        } else {
            self.updateSubEmpresa(self.subempresa, self.subempresa.idSubEmpresa);
        }
        self.reset();
    };

    self.edit = function (id) {
        for (var i = 0; i < self.subempresas.subempresas.length; i++) {
            if (self.subempresas.subempresas[i].idSubEmpresa === id) {
                self.subempresa = angular.copy(self.subempresas.subempresas[i]);
                break;
            }
        }
    };

    self.remove = function (id) {
        if (self.subempresa.idSubEmpresa === id) {//clean form if the Province to be deleted is shown there.
            self.reset();
        }
        self.deleteSubEmpresa(id);
    };

    self.reset = function () {
        self.subempresa = {
            idSubEmpresa: null,
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

