/**
 * Created by Reinier on 06/03/2016.
 */
'use strict';

app.controller('CountryController', ['$scope', 'CountryService', '$window', function ($scope, CountryService, $window) {
    var self = this;
    var flag = false;
    self.country = {idCountry: null, codeCountry: '', nameCountry: '', descriptionCountry: ''};
    self.countries = [];
    self.entries = 10;
    self.searchCountry = '';
    self.sortType     = 'nameCountry'; // set the default sort type
    self.sortReverse  = false;  // set the default sort order

    self.fetchAllCountry = function () {
        CountryService.fetchAllCountry()
            .then(
                function (data) {
                    self.countries = data;
                    //console.log(data);
                },
                function (errResponse) {
                    console.error('Error while fetching Currencies');
                }
            );
    };
    self.fetchAllCountry();

    self.showData = function () {
        self.curPage = 0;
        self.pageSize = self.entries;

        self.numberOfPages = function () {
            return Math.ceil(self.countries.countries.length / self.pageSize);
        };
    };

    self.createCountry = function (country) {
        CountryService.createCountry(country)
            .then(function (data) {
                    swal({
                            title: 'Nuevo Pais',
                            text: "El pais ha sido adicionado satisfactoriamente",
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "success",
                            confirmButtonText: "Aceptar",
                            cancelButtonText: "Cancelar",
                            closeOnConfirm: true
                        },
                        function (clickedAction) {
                            if (clickedAction == true) {
                                self.fetchAllCountry();
                            }
                            return false;
                        });
                }, function (errResponse) {
					console.log(errResponse);
                    swal("Error...", "Ha ocurrido un error mientras se creaba el pais.! " + errResponse.data.message, "error");
                    console.error('Error while creating Country.');
                }
            );
    };

    self.updateCountry = function (country, id) {
        CountryService.updateCountry(country, id)
            .then(function (data) {
                    swal({
                            title: 'Pais',
                            text: "Los datos de pais han sido modificados satisfactoriamente",
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "success",
                            confirmButtonText: "Aceptar",
                            cancelButtonText: "Cancelar",
                            closeOnConfirm: true
                        },
                        function (clickedAction) {
                            if (clickedAction == true) {
                                self.fetchAllCountry();
                            }
                            return false;
                        });
                }, function (errResponse) {
                    swal("Error...", "Ha ocurrido un error mientras se actualizaban los datos de pais!", "error");
                    console.error('Error while updating Country.');
                }
            );
    };

    self.deleteCountry = function (id) {
        swal({
                title: 'Esta Ud. seguro?',
                text: "Se borrara toda la informacion referente al pais",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Si, eliminar!",
                cancelButtonText: "Cancelar",
                closeOnConfirm: true
            },
            function (isConfirm) {
                if (isConfirm) {
                    CountryService.deleteCountry(id)
                        .then(function (data) {
                                swal("Eliminado!", "Los datos de pais han sido eliminados.", "success");
                                self.fetchAllCountry();
                            },
                            function (errResponse) {
                                swal("Error...", "Ha ocurrido un error mientras se eliminaban los datos de pais.!", "error");
                                console.error('Error while deleting Country.');
                            }
                        );
                }
                else {
                    swal("Cancelado", "Los datos de pais estan seguros", "error");
                }
            });
    };

    self.submit = function () {
        if (self.country.idCountry === null) {
            //console.log('Saving New Country', self.country);
            //console.log(self.country);
            self.createCountry(self.country);
        } else {
            self.updateCountry(self.country, self.country.idCountry);
            //console.log('Country updated with id ', self.country.idCountry);
        }
        self.reset();
    };

    self.edit = function (id) {
        //console.log('id to be edited', id);

        for (var i = 0; i < self.countries.countries.length; i++) {
            if (self.countries.countries[i].idCountry === id) {
                self.country = angular.copy(self.countries.countries[i]);
                break;
            }
        }
    };

    self.remove = function (id) {
        //console.log('id to be deleted', id);
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

