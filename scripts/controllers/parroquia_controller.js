/**
 * Created by Reinier on 06/03/2016.
 */
'use strict';

app.controller('ParroquiaController', ['$scope', 'ParroquiaService', '$window', function ($scope, ParroquiaService, $window) {
    var self = this;
    var flag = false;
    self.parroquia = {idParroquia: null, idCity: '', codeParroquia: '', nameParroquia: '', descriptionParroquia: ''};
    self.parroquias = [];

    self.getParroquiasByIdProvince = function (idCity) {
        ParroquiaService.getParroquiaByIdCity(idCity)
            .then(function (data) {
                    self.province = data;
                },
                function (errResponse) {
                    console.error('Error while getting Parroquias');
                });
    };

    self.fetchAllParroquia = function () {
        ParroquiaService.fetchAllParroquia()
            .then(
                function (data) {
                    self.parroquias = data;
                },
                function (errResponse) {
                    console.error('Error while fetching Currencies');
                }
            );
    };

    self.fetchAllParroquia();

    self.showData = function () {
        self.curPage = 0;
        self.pageSize = 10;

        self.numberOfPages = function () {
            return Math.ceil(self.parroquias.parroquias.length / self.pageSize);
        };
    };

    self.createParroquia = function (parroquia) {
        ParroquiaService.createParroquia(parroquia)
            .then(function (data) {
                    swal({
                            title: 'New Parroquia',
                            text: "The parroquia has been added successfully",
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "success",
                            confirmButtonText: "OK",
                            cancelButtonText: "Cancel",
                            closeOnConfirm: true
                        },
                        function (clickedAction) {
                            if (clickedAction == true) {
                                self.fetchAllParroquia();
                            }
                            return false;
                        });
                }, function (errResponse) {
                    swal("Error...", "Error while creating Parroquia.!", "error");
                    console.error('Error while creating Parroquia.');
                }
            );
    };

    self.updateParroquia = function (parroquia, id) {
        ParroquiaService.updateParroquia(parroquia, id)
            .then(function (data) {
                    swal({
                            title: 'Parroquia',
                            text: "The parroquia has been updated successfully",
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "success",
                            confirmButtonText: "OK",
                            cancelButtonText: "Cancel",
                            closeOnConfirm: true
                        },
                        function (clickedAction) {
                            if (clickedAction == true) {
                                self.fetchAllParroquia();
                            }
                            return false;
                        });
                }, function (errResponse) {
                    swal("Error...", "Error while updating Parroquia.!", "error");
                    console.error('Error while updating Parroquia.');
                }
            );
    };

    self.deleteParroquia = function (id) {
        swal({
                title: 'Are you sure?',
                text: "You will delete the parroquia and information",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "Cancel",
                closeOnConfirm: true
            },
            function (isConfirm) {
                if (isConfirm) {
                    ParroquiaService.deleteParroquia(id)
                        .then(function (data) {
                                swal("Deleted!", "The parroquia has been deleted.", "success");
                                self.fetchAllParroquia();
                            },
                            function (errResponse) {
                                swal("Error...", "Error while deleting parroquia.!", "error");
                                console.error('Error while deleting parroquia.');
                            }
                        );
                }
                else {
                    swal("Cancelled", "The parroquia is safe :)", "error");
                }
            });
    };

    self.submit = function () {
        if (self.parroquia.idParroquia === null) {
            //console.log('Saving New Parroquia', self.parroquia);
            //console.log(self.parroquia);
            self.createParroquia(self.parroquia);
        } else {
            self.updateParroquia(self.parroquia, self.parroquia.idParroquia);
            //console.log('Parroquia updated with id ', self.parroquia.idParroquia);
        }
        self.reset();
    };

    self.edit = function (id) {
        //console.log('id to be edited', id);

        for (var i = 0; i < self.parroquias.parroquias.length; i++) {
            if (self.parroquias.parroquias[i].idParroquia === id) {
                self.parroquia = angular.copy(self.parroquias.parroquias[i]);
                break;
            }
        }
    };

    self.remove = function (id) {
        //console.log('id to be deleted', id);
        if (self.parroquia.idParroquia === id) {//clean form if the Parroquia to be deleted is shown there.
            self.reset();
        }
        self.deleteParroquia(id);
    };

    self.reset = function () {
        self.parroquia = {
            idParroquia: null,
            idCity: '',
            codeParroquia: '',
            nameParroquia: '',
            descriptionParroquia: ''
        };

        $scope.ParroquiasForm.$setPristine(); //reset Form
    };
}]);

