/**
 * Created by Reinier on 06/03/2016.
 */
'use strict';

app.controller('LogController', ['$scope', 'LogService', '$window', '$filter', function ($scope, LogService, $window, $filter) {
    var self = this;

    self.log = {
        idLog: null,
        lastDate: '',
        idUser: '',
        accion: '',
        tableName: '',
    };
    self.logs = [];
    self.entries = 10;
    self.searchEmpresa = '';
    self.sortType     = 'tableName'; // set the default sort type
    self.sortReverse  = false;  // set the default sort order
    var logsLength = 0;

    self.fetchAllLogs = function () {
        LogService.fetchAllLogs()
            .then(
                function (data) {
                    self.logs = data;
                    logsLength = self.logs.logs.length;

                    /*for (var i = 0; i < data.empresas.length; i++) {
                        self.empresasName[data.empresas[i].idEmpresa]=data.empresas[i].nombreEmpresa;
                    }*/
                },
                function (errResponse) {
                    console.error('Error while fetching Currencies');
                }
            );
    };
    self.fetchAllLogs();

    self.showData = function () {
        self.curPage = 0;
        self.pageSize = self.entries;

        self.numberOfPages = function () {
            return Math.ceil(logsLength / self.pageSize);
        };
		
		self.cantCurrentPage = function()
		{
			return self.curPage<(Math.ceil(logsLength / self.pageSize))-1? self.entries: logsLength % self.pageSize
		}
    };

    self.deleteLog = function (id) {
        swal({
                title: 'Esta Ud. seguro?',
                text: "Se borrara toda la informacion referente al Log",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Si, eliminar!",
                cancelButtonText: "Cancelar",
                closeOnConfirm: true
            },
            function (isConfirm) {
                if (isConfirm) {
                    LogService.deleteLog(id)
                        .then(function (data) {
                                swal("Eliminado!", "Los datos del log han sido eliminados.", "success");
                                self.fetchAllLogs();
                            },
                            function (errResponse) {
                                swal("Error...", "Ha ocurrido un error mientras se eliminaban los datos del log.! "+errResponse.data.message, "error");
                                console.error('Error while deleting Empresa.');
                            }
                        );
                }
                else {
                    swal("Cancelado", "Los datos del log estan seguros", "error");
                }
            });
    };

    self.remove = function (id) {
        //console.log('id to be deleted', id);
        if (self.log.idLog === id) {//clean form if the Empresa to be deleted is shown there.
            self.reset();
        }
        self.deleteLog(id);
    };
}]);

