/**
 * Created by Reinier on 06/03/2016.
 */
'use strict';

app.controller('ProvinceController', ['$scope', 'ProvinceService', '$window', function ($scope, ProvinceService, $window) {
    var self = this;
    var flag = false;
    self.province = {idProvince: null, codeProvince: '', nameProvince: '', descriptionProvince: ''};
    self.provinces = [];
    self.entries = 10;
    self.provincesName = [];
    self.searchProvince = '';
    self.sortType     = 'nameProvince'; // set the default sort type
    self.sortReverse  = false;  // set the default sort order

    self.getProvinceByIdCountry = function (idCountry) {
        ProvinceService.getProvinceByIdCountry(idCountry)
            .then(function (data) {
                    self.province = data;
                },
                function (errResponse) {
                    console.error('Error while getting Province');
                });
    };

    self.fetchAllProvince = function () {
        ProvinceService.fetchAllProvince()
            .then(
                function (data) {
                    self.provinces = data;

                    for (var i = 0; i < data.provinces.length; i++) {
                        self.provincesName[data.provinces[i].idProvince]=data.provinces[i].nameProvince;
                    }
                },
                function (errResponse) {
                    console.error('Error while fetching Currencies');
                }
            );
    };

    self.fetchAllProvince();

    self.showData = function () {
        self.curPage = 0;
        self.pageSize = self.entries;

        self.numberOfPages = function () {
            return Math.ceil(self.provinces.provinces.length / self.pageSize);
        };
    };

    self.createProvince = function (province) {
        ProvinceService.createProvince(province)
            .then(function (data) {
                    swal({
                            title: 'Nueva Provincia',
                            text: "La provincia ha sido adicionada satisfactoriamente",
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "success",
                            confirmButtonText: "Aceptar",
                            cancelButtonText: "Cancelar",
                            closeOnConfirm: true
                        },
                        function (clickedAction) {
                            if (clickedAction == true) {
                                self.fetchAllProvince();
                            }
                            return false;
                        });
                }, function (errResponse) {
                    swal("Error...", "Ha ocurrido un error mientras se creaba la provincia.!", "error");
                    console.error('Error while creating Province.');
                }
            );
    };

    self.updateProvince = function (province, id) {
        ProvinceService.updateProvince(province, id)
            .then(function (data) {
                    swal({
                            title: 'Provincia',
                            text: "Los datos de la provincia han sido modificados satisfactoriamente",
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "success",
                            confirmButtonText: "Aceptar",
                            cancelButtonText: "Cancelar",
                            closeOnConfirm: true
                        },
                        function (clickedAction) {
                            if (clickedAction == true) {
                                self.fetchAllProvince();
                            }
                            return false;
                        });
                },
                function (errResponse) {
                    swal("Error...", "Ha ocurrido un error mientras se actualizaban los datos de la provincia.!", "error");
                    console.error('Error while updating Province.');
                }
            );
    };

    self.deleteProvince = function (id) {
        swal({
                title: 'Esta Ud. seguro?',
                text: "Se borrara toda la informacion referente a la provincia",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Si, eliminar!",
                cancelButtonText: "Cancelar",
                closeOnConfirm: true
            },
            function (isConfirm) {
                if (isConfirm) {
                    ProvinceService.deleteProvince(id)
                        .then(function (data) {
                                swal("Eliminada!", "Los datos de la provicia han sido eliminados.", "success");
                                self.fetchAllProvince();
                            },
                            function (errResponse) {
                                swal("Error...", "Ha ocurrido un error mientras se eliminaban los datos de la provincia.", "error");
                                console.error('Error while deleting Province.');
                            }
                        );
                }
                else {
                    swal("Cancelado", "Los datos de la parroquia estan seguros", "error");
                }
            });
    };

    self.submit = function () {
        if (self.province.idProvince === null) {
            //console.log('Saving New Province', self.province);
            //console.log(self.province);
            self.createProvince(self.province);
        } else {
            self.updateProvince(self.province, self.province.idProvince);
            //console.log('Province updated with id ', self.province.idProvince);
        }
        self.reset();
    };

    self.edit = function (id) {
        //console.log('id to be edited', id);

        for (var i = 0; i < self.provinces.provinces.length; i++) {
            if (self.provinces.provinces[i].idProvince === id) {
                self.province = angular.copy(self.provinces.provinces[i]);
                break;
            }
        }
    };

    self.remove = function (id) {
        //console.log('id to be deleted', id);
        if (self.province.idProvince === id) {//clean form if the Province to be deleted is shown there.
            self.reset();
        }
        self.deleteProvince(id);
    };

    self.reset = function () {
        self.province = {idProvince: null, codeProvince: '', nameProvince: '', descriptionProvince: ''};
        $scope.ProvincesForm.$setPristine(); //reset Form
    };


}]);

