/**
 * Created by Reinier on 06/03/2016.
 */
'use strict';

app.controller('CityController', ['$scope', 'CityService', '$window','NgTableParams', function ($scope, CityService, $window, NgTableParams) {
    var self = this;
    var flag = false;
    self.city = {idCity: null, idProvince: '', codeCity: '', nameCity: '', descriptionCity: ''};
    self.cities = [];
	self.entries = 10;
    self.citiesName = [];
    self.searchCity = '';
    self.sortType     = 'nameCity'; // set the default sort type
    self.sortReverse  = false;  // set the default sort order
    var citiesLength = 0;
	self.tableParams;
	var data = [];

    self.getCitiesByIdProvince = function (idProvince) {
        CityService.getCitiesByIdProvince(idProvince)
            .then(function (data) {
                    self.cities = data;

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
					self.tableParams = new NgTableParams({ count: 5}, { counts: [5, 10, 25], dataset: data['cities']});
                     citiesLength = self.cities.cities.length;
                    for (var i = 0; i < citiesLength; i++) {
                        self.citiesName[data.cities[i].idCity]=data.cities[i].nameCity;
                    }
                },
                function (errResponse) {
                    swal("Error...", "Ha ocurrido un error.! "+errResponse.data.message, "error");
                    console.error('Error while fetching Currencies');
                }
            );
    };

    self.fetchAllCity();

    self.showData = function () {
        self.curPage = 0;
        self.pageSize = self.entries;

        self.numberOfPages = function () {
            return Math.ceil(citiesLength / self.pageSize);
        };
		
		self.cantCurrentPage = function()
		{
			return self.curPage<(Math.ceil(citiesLength / self.pageSize))-1? self.entries: citiesLength % self.pageSize
		}
    };

    self.createCity = function (city) {
        CityService.createCity(city)
            .then(function (data) {
                    swal({
                            title: 'Nueva Ciudad',
                            text: "La ciudad ha sido adicionada satisfactoriamente",
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "success",
                            confirmButtonText: "Aceptar",
                            cancelButtonText: "Cancelar",
                            closeOnConfirm: true
                        },
                        function (clickedAction) {
                            if (clickedAction == true) {
                                self.fetchAllCity();
                            }
                            return false;
                        });
                }, function (errResponse) {
                    swal("Error...", "Ha ocurrido un error mientras se creaba la ciudad.! "+errResponse.data.message, "error");
                    console.error('Error while creating City.');
                }
            );
    };

    self.updateCity = function (city, id) {
        CityService.updateCity(city, id)
            .then(function (data) {
                    swal({
                            title: 'Ciudad',
                            text: "Los datos de ciudad han sido modificados satisfactoriamente",
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "success",
                            confirmButtonText: "Aceptar",
                            cancelButtonText: "Cancelar",
                            closeOnConfirm: true
                        },
                        function (clickedAction) {
                            if (clickedAction == true) {
                                self.fetchAllCity();
                            }
                            return false;
                        });
                }, function (errResponse) {
                    swal("Error...", "Ha ocurrido un error mientras se actualizaban los datos de ciudad! "+errResponse.data.message, "error");
                    console.error('Error while updating City.');
                }
            );
    };

    self.deleteCity = function (id) {
        swal({
                title: 'Esta Ud. seguro?',
                text: "Se borrara toda la informacion referente a la ciudad",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Si, eliminar!",
                cancelButtonText: "Cancelar",
                closeOnConfirm: true
            },
            function (isConfirm) {
                if (isConfirm) {
                    CityService.deleteCity(id)
                        .then(function (data) {
                                swal("Eliminada!", "Los datos de ciudad han sido eliminados.", "success");
                                self.fetchAllCity();
                            },
                            function (errResponse) {
                                swal("Error...", "Ha ocurrido un error mientras se eliminaban los datos de ciudad.! "+errResponse.data.message, "error");
                                console.error('Error while deleting City.');
                            }
                        );
                }
                else {
                    swal("Cancelado", "Los datos de ciudad estan seguros", "error");
                }
            });
    };

    self.submit = function () {
        if (self.city.idCity === null) {
            console.log('Saving New City', self.city);
            console.log(self.city);
            self.createCity(self.city);
        } else {
            self.updateCity(self.city, self.city.idCity);
            //console.log('City updated with id ', self.city.idCity);
        }
        self.reset();
    };

    self.edit = function (id) {
        //console.log('id to be edited', id);

        for (var i = 0; i < self.cities.cities.length; i++) {
            if (self.cities.cities[i].idCity === id) {
                self.city = angular.copy(self.cities.cities[i]);
                break;
            }
        }
    };

    self.remove = function (id) {
        //console.log('id to be deleted', id);
        if (self.city.idCity === id) {//clean form if the City to be deleted is shown there.
            self.reset();
        }
        self.deleteCity(id);
    };

    self.reset = function () {
        self.city = {
            idCity: null,
            idProvince: '',
            codeCity: '',
            nameCity: '',
            descriptionCity: ''
        };
        $scope.CitiesForm.$setPristine(); //reset Form
    };
}
]);

