/**
 * Created by Reinier on 06/03/2016.
 */
'use strict';

app.controller('CountryController', ['$scope', 'CountryService', '$window', function ($scope, CountryService, $window) {
    var self = this;
    var flag = false;
    self.country = { name: '', description: ''};
    self.countries = [];

    self.fetchAllCountry = function () {
        CountryService.fetchAllCountry()
            .then(
            function (data) {
                self.countries = data;
            },
            function (errResponse) {
                console.error('Error while fetching Currencies');
            }
        );
    };

    self.createCountry = function (country) {
        CountryService.createCountry(country)
            .then(
            self.fetchAllCountry,
            function (errResponse) {
                console.error('Error while creating Country.');
            }
        );
    };

    self.updateCountry = function (country, id) {
        CountryService.updateCountry(country, id)
            .then(
            self.fetchAllCountry,
            function (errResponse) {
                console.error('Error while updating Country.');
            }
        );
    };

    self.deleteCountry = function (id) {
        var confirm = $window.confirm('Are you absolutely sure you want to delete the Country?');
        if (confirm) {
            CountryService.deleteCountry(id)
                .then(
                self.fetchAllCountry,
                function (errResponse) {
                    console.error('Error while deleting Country.');
                }
            );
        }
    };

    self.submit = function () {
        if (self.idCountry===null) {
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

        for (var i = 0; i < self.countries.counties.length; i++) {
            if (self.countries.counties[i].idCountry === id) {
                self.country = angular.copy(self.countries.counties[i]);
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
        self.country = {idCountry: null, name: '', description: ''};
        $scope.myForm.$setPristine(); //reset Form
    };

    self.fetchAllCountry();



}]);

