/**
 * Created by Reinier on 06/03/2016.
 */

'use strict'

app.controller('AddressController', ['$scope', 'CountryService', 'ProvinceService', 'CityService', 'ParroquiaService',
    function ($scope, CountryService, ProvinceService, CityService, ParroquiaService) {
        var self = this;
        self.country = {idCountry: null, codeCountry: '', nameCountry: '', descriptionCountry: ''};
        self.province = {idProvince: null, codeProvince: '', nameProvince: '', descriptionProvince: ''};
        self.city = {idCity: null, codeCity: '', nameCity: '', descriptionCity: ''};
        self.parroquia = {idParroquia: null, codeParroquia: '', nameParroquia: '', descriptionParroquia: ''};
        self.provinces = [];
        self.cities = [];
        self.countries = [];
        self.parroquias = [];

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

        self.getProvinceByIdCountry = function (id) {
            ProvinceService.getProvinceByIdCountry(id)
                .then(function (data) {
                    self.provinces = data;
                },
                function (errResponse) {
                    console.error('Error while fetching Provinces');
                });
        };

        self.getCitiesByIdProvince = function (id) {
            CityService.getCitiesByIdProvince(id)
                .then(function (data) {
                    self.cities = data;
                },
                function (errResponse) {
                    console.error('Error while fetching Cities');
                });
        };
        self.getParroquiasByIdCity = function (id) {
            ParroquiaService.getParroquiaByIdCity(id)
                .then(function (data) {
                    self.parroquias = data;
                },
                function (errResponse) {
                    console.error('Error while fetching Parroquias');
                });
        };
        self.reset = function (){
            self.city = {}
            self.province = {}
            self.country = {}
        }
        self.fetchAllCountry();
    }]);

