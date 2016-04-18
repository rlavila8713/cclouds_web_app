/**
 * Created by Reinier on 06/03/2016.
 */

'use strict';

app.factory('SucursalService', ['$http', '$q', function ($http, $q) {
    return {

        getSucursalesByIdSubEmpresa: function (idSubEmpresa) {
            return $http.get('../admin/sucursal/from_sub_empresa=' + idSubEmpresa)
                .then(function (response) {
                        return response.data;
                    },
                    function (errResponse) {
                        console.error('Error while getting Sucursales');
                        return $q.reject(errResponse);
                    });
        },

        fetchAllSucursales: function () {
            return $http.get('../admin/sucursal/')
                .then(
                    function (response) {
                        return response.data;
                    },
                    function (errResponse) {
                        console.error('Error while fetching Sucursales');
                        return $q.reject(errResponse);
                    }
                );
        },

        fetchAllFromSucursal: function (id) {
            return $http.get('../admin/sucursal/detailed/id='+id)
                .then(
                    function (response) {
                        return response.data;
                    },
                    function (errResponse) {
                        console.error('Error while fetching Sucursales');
                        return $q.reject(errResponse);
                    }
                );
        },

        createSucursal: function (sucursal) {
            return $http.post('../admin/sucursal/', sucursal)
                .then(
                    function (response) {
                        return response.data;
                    },
                    function (errResponse) {
                        console.error('Error while creating Sucursal');
                        return $q.reject(errResponse);
                    }
                );
        },

        updateSucursal: function (sucursal, id) {
            return $http.post('../admin/sucursal/' + id, sucursal)
                .then(
                    function (response) {
                        return response.data;
                    },
                    function (errResponse) {
                        console.error('Error while updating Sucursal');
                        return $q.reject(errResponse);
                    }
                );
        },

        deleteSucursal: function (id) {
            return $http.delete('../admin/sucursal/' + id)
                .then(
                    function (response) {
                        return response.data;
                    },
                    function (errResponse) {
                        console.error('Error while deleting Sucursal');
                        return $q.reject(errResponse);
                    }
                );
        }
    };

}]);


