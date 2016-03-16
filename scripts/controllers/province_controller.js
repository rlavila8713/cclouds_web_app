/**
 * Created by Reinier on 06/03/2016.
 */
'use strict';

app.controller('ProvinceController', ['$scope', 'ProvinceService', '$window', function ($scope, ProvinceService, $window) {
    var self = this;
    var flag = false;
    self.province = {idProvince: null, codeProvince: '', nameProvince: '', descriptionProvince: ''};
    self.provinces = [];

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
                },
                function (errResponse) {
                    console.error('Error while fetching Currencies');
                }
            );
    };

    self.fetchAllProvince();

    self.showData = function () {
        self.curPage = 0;
        self.pageSize = 4;

        self.numberOfPages = function () {
            return Math.ceil(self.provinces.provinces.length / self.pageSize);
        };
    };

    self.createProvince = function (province) {
        ProvinceService.createProvince(province)
            .then(function (data) {
                    swal({
                            title: 'New Province',
                            text: "The province has been added successfully",
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "success",
                            confirmButtonText: "OK",
                            cancelButtonText: "Cancel",
                            closeOnConfirm: true
                        },
                        function (clickedAction) {
                            if (clickedAction == true) {
                                self.fetchAllProvince();
                            }
                            return false;
                        });
                }, function (errResponse) {
                    swal("Error...", "Error while creating Province.!", "error");
                    console.error('Error while creating Province.');
                }
            );
    };

    self.updateProvince = function (province, id) {
        ProvinceService.updateProvince(province, id)
            .then(function (data) {
                    swal({
                            title: 'New Province',
                            text: "The province has been updated successfully",
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "success",
                            confirmButtonText: "OK",
                            cancelButtonText: "Cancel",
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
                    swal("Error...", "Error while creating Province.!", "error");
                    console.error('Error while updating Province.');
                }
            );
    };

    self.deleteProvince = function (id) {
        swal({
                title: 'Are you sure?',
                text: "You will delete the province and information",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "Cancel",
                closeOnConfirm: true
            },
            function (isConfirm) {
                if (isConfirm) {
                    ProvinceService.deleteProvince(id)
                        .then(function (data) {
                                swal("Deleted!", "Your province has been deleted.", "success");
                                self.fetchAllProvince();
                            },
                            function (errResponse) {
                                swal("Error...", "Error while deleting Province.!", "error");
                                console.error('Error while deleting Province.');
                            }
                        );
                }
                else {
                    swal("Cancelled", "Your province is safe :)", "error");
                }
            });
    };

    self.submit = function () {
        if (self.province.idProvince === null) {
            console.log('Saving New Province', self.province);
            console.log(self.province);
            self.createProvince(self.province);
        } else {
            self.updateProvince(self.province, self.province.idProvince);
            console.log('Province updated with id ', self.province.idProvince);
        }
        self.reset();
    };

    self.edit = function (id) {
        console.log('id to be edited', id);

        for (var i = 0; i < self.provinces.provinces.length; i++) {
            if (self.provinces.provinces[i].idProvince === id) {
                self.province = angular.copy(self.provinces.provinces[i]);
                break;
            }
        }
    };

    self.remove = function (id) {
        console.log('id to be deleted', id);
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

