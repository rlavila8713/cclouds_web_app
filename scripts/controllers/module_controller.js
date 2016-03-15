/**
 * Created by reinier.leyva on 02/03/2016.
 */
'use strict';

app.controller('ModuleController', ['$scope', 'ModuleService', '$window', function ($scope, ModuleService, $window) {
    var self = this;
    var flag = false;
    self.module = {idModule: null, name: '', description: ''};
    self.modules = [];


    self.fetchAllModule = function () {
        ModuleService.fetchAllModule()
            .then(
                function (d) {
                    self.modules = d;

                },
                function (errResponse) {
                    console.error('Error while fetching Currencies');
                }
            );
    };

    self.fetchAllModule();

    self.showData = function () {
        self.curPage = 0;
        self.pageSize = 5;

        self.numberOfPages = function () {
            return Math.ceil(self.modules.modules.length / self.pageSize);
        };
    };

    self.createModule = function (module) {
        ModuleService.createModule(module)
            .then(function (data) {
                    swal({
                            title: 'New module',
                            text: "The module has been added successfully",
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "success",
                            confirmButtonText: "OK",
                            cancelButtonText: "Cancel",
                            closeOnConfirm: true
                        },
                        function (clickedAction) {
                            if (clickedAction == true) {
                                self.fetchAllModule()
                            }
                            return false;
                        });
                }, function (errResponse) {
                    swal("Error...", "Error while creating Module.!", "error");
                    console.error('Error while creating Module.');
                }
            );
    };

    self.updateModule = function (module, id) {
        ModuleService.updateModule(module, id)
            .then(function (data) {
                    swal({
                            title: 'Module',
                            text: "The module has been updated successfully",
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "success",
                            confirmButtonText: "OK",
                            cancelButtonText: "Cancel",
                            closeOnConfirm: true
                        },
                        function (clickedAction) {
                            if (clickedAction == true) {
                                self.fetchAllModule()
                            }
                            return false;
                        });
                }, function (errResponse) {
                    swal("Error...", "Error while updating Module.!", "error");
                    console.error('Error while updating Module.');
                }
            );
    };

    self.deleteModule = function (id) {
        swal({
                title: 'Are you sure?',
                text: "You will delete the module and information",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "Cancel",
                closeOnConfirm: false,
                closeOnCancel: false
            },
            function (isConfirm) {
                if (isConfirm) {
                    ModuleService.deleteModule(id)
                        .then(function (data) {
                                swal("Deleted!", "Your module has been deleted.", "success");
                                self.fetchAllModule();
                            },
                            function (errResponse) {
                                swal("Error...", "Error while deleting Module.!", "error");
                                console.error('Error while deleting Module.');
                            }
                        );
                } else {
                    swal("Cancelled", "Your module is safe :)", "error");
                }
            });
    };

    self.submit = function () {
        if (self.module.idModule === null) {
            console.log('Saving New Module', self.module);
            console.log(self.module);
            self.createModule(self.module);
        } else {
            self.updateModule(self.module, self.module.idModule);
            console.log('Module updated with id ', self.module.idModule);
        }
        self.reset();
    };

    self.edit = function (id) {
        console.log('id to be edited', id);

        for (var i = 0; i < self.modules.modules.length; i++) {
            if (self.modules.modules[i].idModule === id) {
                self.module = angular.copy(self.modules.modules[i]);
                break;
            }
        }
    };

    self.remove = function (id) {
        console.log('id to be deleted', id);
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


