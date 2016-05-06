/**
 * Created by reinier.leyva on 02/03/2016.
 */
'use strict';

app.controller('ModuleController', ['$scope', 'ModuleService', '$window', function ($scope, ModuleService, $window) {
    var self = this;
    var flag = false;
    self.module = {idModule: null, name: '', description: ''};
    self.modules = [];
	self.entries = 10;
    self.searchModule = '';
    self.sortType     = 'name'; // set the default sort type
    self.sortReverse  = false;  // set the default sort order
    var modulesLength = 0;

    self.fetchAllModule = function () {
        ModuleService.fetchAllModule()
            .then(
                function (d) {
                    self.modules = d;
                    modulesLength = self.modules.modules.length;

                },
                function (errResponse) {
                    swal("Error...", "Ha ocurrido un error.! "+errResponse.data.message, "error");
                    console.error('Error while fetching Currencies');
                }
            );
    };

    self.fetchAllModule();

    self.showData = function () {
        self.curPage = 0;
        self.pageSize = self.entries;

        self.numberOfPages = function () {
            return Math.ceil(modulesLength / self.pageSize);
        };
		self.cantCurrentPage = function()
		{
			return self.curPage<(Math.ceil(modulesLength / self.pageSize))-1? self.entries: modulesLength % self.pageSize
		}
    };

    self.createModule = function (module) {
        ModuleService.createModule(module)
            .then(function (data) {
                    swal({
                            title: 'Nuevo modulo',
                            text: "El modulo ha sido adicionado satisfactoriamente",
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "success",
                            confirmButtonText: "Aceptar",
                            cancelButtonText: "Cancelar",
                            closeOnConfirm: true
                        },
                        function (clickedAction) {
                            if (clickedAction == true) {
                                self.fetchAllModule()
                            }
                            return false;
                        });
                }, function (errResponse) {
					console.log(errResponse);
                    swal("Error...","Ha ocurrido un error adicionando el modulo!" +errResponse.data.message, "error");
                    console.error('Error while creating Module.');
                }
            );
    };

    self.updateModule = function (module, id) {
        ModuleService.updateModule(module, id)
            .then(function (data) {
                    swal({
                            title: 'Modulo',
                            text: "Los datos del modulo han sido modificados satisfactoriamente",
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "success",
                            confirmButtonText: "Aceptar",
                            cancelButtonText: "Cancelar",
                            closeOnConfirm: true
                        },
                        function (clickedAction) {
                            if (clickedAction == true) {
                                self.fetchAllModule()
                            }
                            return false;
                        });
                }, function (errResponse) {
                    swal("Error...", "Ha ocurrido un error mientras se actualizaban los datos del modulo! "+errResponse.data.message, "error");
                    console.error('Error while updating Module.');
                }
            );
    };

    self.deleteModule = function (id) {
        swal({
                title: 'Esta Ud. seguro?',
                text: "Se borrara toda la informacion referente al modulo",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Si, eliminar!",
                cancelButtonText: "Cancelar",
                closeOnConfirm: false,
                closeOnCancel: false
            },
            function (isConfirm) {
                if (isConfirm) {
                    ModuleService.deleteModule(id)
                        .then(function (data) {
                                swal("Eliminado!", "Los datos del modulo han sido eliminados.", "success");
                                self.fetchAllModule();
                            },
                            function (errResponse) {
                                swal("Error...", "Ha ocurrido un error mientras se eliminaban los datos del modulo.! "+errResponse.data.message, "error");
                                console.error('Error while deleting Module.');
                            }
                        );
                } else {
                    swal("Cancelado", "Los datos del modulo estan seguros", "error");
                }
            });
    };

    self.submit = function () {
        if (self.module.idModule === null) {
            //console.log('Saving New Module', self.module);
            //console.log(self.module);
            self.createModule(self.module);
        } else {
            self.updateModule(self.module, self.module.idModule);
            //console.log('Module updated with id ', self.module.idModule);
        }
        self.reset();
    };

    self.edit = function (id) {
        //console.log('id to be edited', id);

        for (var i = 0; i < self.modules.modules.length; i++) {
            if (self.modules.modules[i].idModule === id) {
                self.module = angular.copy(self.modules.modules[i]);
                break;
            }
        }
    };

    self.remove = function (id) {
        //console.log('id to be deleted', id);
        if (self.module.idModule === id) {//clean form if the module to be deleted is shown there.
            self.reset();
        }
        self.deleteModule(id);
    };

    self.reset = function () {
        self.module = {idModule: null, name: '', description: ''};
        $scope.ModuleForm.$setPristine(); //reset Form
    };

    self.fetchAllModule();


}]);


