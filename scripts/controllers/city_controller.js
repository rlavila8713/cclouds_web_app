/**
 * Created by Reinier on 06/03/2016.
 */
'use strict';

app.controller('CityController', ['$scope', 'CityService', '$window', function ($scope, CityService, $window) {
    var self = this;
    var flag = false;
    self.city = { name: '', description: ''};
    self.cities = [];

    self.getCitiesByIdProvince = function (idProvince) {
        CityService.getCitiesByIdProvince(idProvince)
            .then(function (data) {
                self.province = data;
            },
            function (errResponse) {
                console.error('Error while getting Cities');
            });
    };

    self.fetchAllCity = function () {
        CityService.fetchAllCity()
            .then(
            function (data) {
                self.cities = data;
            },
            function (errResponse) {
                console.error('Error while fetching Currencies');
            }
        );
    };

    self.createCity = function (city) {
        CityService.createCity(city)
            .then(
            self.fetchAllCity,
            function (errResponse) {
                console.error('Error while creating City.');
            }
        );
    };

    self.updateCity = function (city, id) {
        CityService.updateCity(city, id)
            .then(
            self.fetchAllCity,
            function (errResponse) {
                console.error('Error while updating City.');
            }
        );
    };

    self.deleteCity = function (id) {
        var confirm = $window.confirm('Are you absolutely sure you want to delete the City?');
        if (confirm) {
            CityService.deleteCity(id)
                .then(
                self.fetchAllCity,
                function (errResponse) {
                    console.error('Error while deleting City.');
                }
            );
        }
    };

    self.submit = function () {
        if (self.idCity===null) {
            console.log('Saving New City', self.city);
            console.log(self.city);
            self.createCity(self.city);
        } else {
            self.updateCity(self.city, self.city.idCity);
            console.log('City updated with id ', self.city.idCity);
        }
        self.reset();
    };

    self.edit = function (id) {
        console.log('id to be edited', id);

        for (var i = 0; i < self.cities.cities.length; i++) {
            if (self.cities.cities[i].idCity === id) {
                self.city = angular.copy(self.cities.cities[i]);
                break;
            }
        }
    };

    self.remove = function (id) {
        console.log('id to be deleted', id);
        if (self.city.idCity === id) {//clean form if the City to be deleted is shown there.
            self.reset();
        }
        self.deleteCity(id);
    };

    self.reset = function () {
        self.city = {idCity: null, name: '', description: ''};
        $scope.myForm.$setPristine(); //reset Form
    };

    self.fetchAllCity();



}]);

