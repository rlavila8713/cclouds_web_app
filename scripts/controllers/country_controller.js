/**
 * Created by Reinier on 06/03/2016.
 */
'use strict';

app.controller('CountryController', ['$scope', 'CountryService', '$window', function ($scope, CountryService, $window) {
    var self = this;
    var flag = false;
    self.country = {idCountry: null, codeCountry: '', nameCountry: '', descriptionCountry: ''};
    self.countries = [];

    self.fetchAllCountry = function () {
        CountryService.fetchAllCountry()
            .then(
                function (data) {
                    self.countries = data;
                    console.log(data);
                },
                function (errResponse) {
                    console.error('Error while fetching Currencies');
                }
            );
    };
    self.fetchAllCountry();

    self.showData = function () {
        self.curPage = 0;
        self.pageSize = 4;

        self.numberOfPages = function () {
            return Math.ceil(self.countries.countries.length / self.pageSize);
        };
    };

    self.createCountry = function (country) {
        CountryService.createCountry(country)
            .then(function (data) {
                    swal({
                            title: 'New Country',
                            text: "The country has been added successfully",
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "success",
                            confirmButtonText: "OK",
                            cancelButtonText: "Cancel",
                            closeOnConfirm: true
                        },
                        function (clickedAction) {
                            if (clickedAction == true) {
                                self.fetchAllCountry();
                            }
                            return false;
                        });
                }, function (errResponse) {
                    swal("Error...", "Error while creating Country.!", "error");
                    console.error('Error while creating Country.');
                }
            );
    };

    self.updateCountry = function (country, id) {
        CountryService.updateCountry(country, id)
            .then(function (data) {
                    swal({
                            title: 'Country',
                            text: "The country has been updated successfully",
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "success",
                            confirmButtonText: "OK",
                            cancelButtonText: "Cancel",
                            closeOnConfirm: true
                        },
                        function (clickedAction) {
                            if (clickedAction == true) {
                                self.fetchAllCountry();
                            }
                            return false;
                        });
                }, function (errResponse) {
                    swal("Error...", "Error while updating Country.!", "error");
                    console.error('Error while updating Country.');
                }
            );
    };

    self.deleteCountry = function (id) {
        swal({
                title: 'Are you sure?',
                text: "You will delete the country and information",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "Cancel",
                closeOnConfirm: true
            },
            function (isConfirm) {
                if (isConfirm) {
                    CountryService.deleteCountry(id)
                        .then(function (data) {
                                swal("Deleted!", "Your country has been deleted.", "success");
                                self.fetchAllCountry();
                            },
                            function (errResponse) {
                                swal("Error...", "Error while deleting Country.!", "error");
                                console.error('Error while deleting Country.');
                            }
                        );
                }
                else {
                    swal("Cancelled", "Your country is safe :)", "error");
                }
            });
    };

    self.submit = function () {
        if (self.country.idCountry === null) {
            console.log('Saving New Country', self.country);
            console.log(self.country);
            self.createCountry(self.country);
        } else {
            self.updateCountry(self.country, self.country.idCountry);
            console.log('Country updated with id ', self.country.idCountry);
        }
        self.reset();
    };

    self.edit = function (id) {
        console.log('id to be edited', id);

        for (var i = 0; i < self.countries.countries.length; i++) {
            if (self.countries.countries[i].idCountry === id) {
                self.country = angular.copy(self.countries.countries[i]);
                break;
            }
        }
    };

    self.remove = function (id) {
        console.log('id to be deleted', id);
        if (self.country.idCountry === id) {//clean form if the Country to be deleted is shown there.
            self.reset();
        }
        self.deleteCountry(id);
    };

    self.reset = function () {
        self.country = {idCountry: null, codeCountry: '', nameCountry: '', descriptionCountry: ''};
        $scope.countryForm.$setPristine(); //reset Form
    };

}]);

