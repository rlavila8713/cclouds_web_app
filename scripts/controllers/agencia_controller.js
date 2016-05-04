/**
 * Created by Reinier on 06/03/2016.
 */
'use strict';

app.controller('AgenciaController', ['$scope', 'AgenciaService', '$window', function ($scope, AgenciaService, $window) {
    var self = this;
    var flag = false;
    self.agencia = {
        idAgencia: null,
        idSucursal: '',
        nombreAgencia: '',
        observacionAgencia: '',
        idRepresentanteAgencia: ''
    };
    self.agencias = [];
    self.entries = 10;
    self.searchAgencia= '';
    self.sortType     = 'nombreAgencia'; // set the default sort type
    self.sortReverse  = false;  // set the default sort order
    var agenciasLength = 0;

    self.getAgenciasByIdSucursal = function (idSucursal) {
        AgenciaService.getAgenciasByIdSucursal(idSucursal)
            .then(function (data) {
                    self.agencias = data;
                },
                function (errResponse) {
                    console.error('Error while getting Agencias');
                });
    };

    self.fetchAllAgencias = function () {
        AgenciaService.fetchAllAgencias()
            .then(
                function (data) {
                    self.agencias = data;
                    agenciasLength = self.agencias.agencias.length;
                },
                function (errResponse) {
                    console.error('Error while fetching Currencies');
                }
            );
    };

    self.fetchAllAgencias();

    self.showData = function () {
        self.curPage = 0;
        self.pageSize = self.entries;

        self.numberOfPages = function () {
            return Math.ceil(agenciasLength / self.pageSize);
        };
		
		self.cantCurrentPage = function()
		{
			return self.curPage<(Math.ceil(agenciasLength / self.pageSize))-1? self.entries: agenciasLength % self.pageSize
		}
    };

    self.createAgencia = function (agencia) {
        AgenciaService.createAgencia(agencia)
            .then(function (data) {
                    swal({
                            title: 'Nueva Agencia',
                            text: "La agencia ha sido adicionada satisfactoriamente",
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "success",
                            confirmButtonText: "Aceptar",
                            cancelButtonText: "Cancelar",
                            closeOnConfirm: true
                        },
                        function (clickedAction) {
                            if (clickedAction == true) {
                                self.fetchAllAgencias();
                            }
                            return false;
                        });
                }, function (errResponse) {
                    swal("Error...", "Ha ocurrido un error mientras se creaba la agencia.! "+errResponse.data.message, "error");
                    console.error('Error while creating Agencia.');
                }
            );
    };

    self.updateAgencia = function (agencia, id) {
        AgenciaService.updateAgencia(agencia, id)
            .then(function (data) {
                    swal({
                            title: 'Agencia',
                            text: "Los datos de la agencia han sido modificados satisfactoriamente",
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "success",
                            confirmButtonText: "Aceptar",
                            cancelButtonText: "Cancelar",
                            closeOnConfirm: true
                        },
                        function (clickedAction) {
                            if (clickedAction == true) {
                                self.fetchAllAgencias();
                            }
                            return false;
                        });
                }, function (errResponse) {
                    swal("Error...", "Ha ocurrido un error mientras se actualizaban los datos de la agencia.! "+errResponse.data.message, "error");
                    console.error('Error while updating Agencia.');
                }
            );
    };

    self.deleteAgencia = function (id) {
        swal({
                title: 'Esta Ud. seguro?',
                text: "Se borrara toda la informacion referente a la agencia",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Si, eliminar!",
                cancelButtonText: "Cancelar",
                closeOnConfirm: true
            },
            function (isConfirm) {
                if (isConfirm) {
                    AgenciaService.deleteAgencia(id)
                        .then(function (data) {
                                swal("Eliminada!", "Los datos de la agencia han sido eliminados.", "success");
                                self.fetchAllAgencias();
                            },
                            function (errResponse) {
                                swal("Error...", "Ha ocurrido un error mientras se eliminaban los datos de la agencia.! "+errResponse.data.message, "error");
                                console.error('Error while deleting Agencia.');
                            }
                        );
                }
                else {
                    swal("Cancelado", "Los datos de la agencia estan seguros", "error");
                }
            });
    };

    self.submit = function () {
        if (self.agencia.idAgencia === null) {
            //console.log(self.parroquia);
            //console.log('Saving New Parroquia', self.parroquia);
            //console.log(self.parroquia);
            self.createAgencia(self.agencia);
        } else {
            self.updateAgencia(self.agencia, self.agencia.idAgencia);
            //console.log('Parroquia updated with id ', self.parroquia.idParroquia);
        }
        self.reset();
    };

    self.edit = function (id) {
        for (var i = 0; i < self.agencias.agencias.length; i++) {
            if (self.agencias.agencias[i].idAgencia === id) {
                self.agencia = angular.copy(self.agencias.agencias[i]);
                break;
            }
        }
    };

    self.remove = function (id) {
        //console.log('id to be deleted', id);
        if (self.agencia.idAgencia === id) {//clean form if the Parroquia to be deleted is shown there.
            self.reset();
        }
        self.deleteAgencia(id);
    };

    self.reset = function () {
        self.agencia = {
            idAgencia: null,
            idSucursal: '',
            nombreAgencia: '',
            observacionAgencia: '',
            idRepresentanteAgencia: ''
        };
        //$scope.ParroquiasForm.$setPristine(); //reset Form
    };
}
]);

