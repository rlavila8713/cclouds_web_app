/**
 * Created by Reinier on 06/03/2016.
 */

'use strict';

app.factory('EmpresaService', ['$http', '$q', function ($http, $q) {
    return {
        fetchAllEmpresas: function () {
            return $http.get('../admin/empresa/')
                .then(
                function (response) {
                    return response.data;
                },
                function (errResponse) {
                    console.error('Error while fetching Empresas');
                    return $q.reject(errResponse);
                }
            );
        },

        createEmpresa: function (empresa) {
         console.log(empresa);
            return $http.post('../admin/empresa/',empresa)
                .then(
                    function (response) {
                        return response.data;
                    },
                    function (errResponse) {
                        console.error('Error while creating Empresa');
                        return $q.reject(errResponse);
                    }
                );
        },

        updateEmpresa: function (empresa, id) {
            return $http.post('../admin/empresa/'+id,empresa)
                .then(
                    function (response) {
                        return response.data;
                    },
                    function (errResponse) {
                        console.error('Error while updating Empresa');
                        return $q.reject(errResponse);
                    }
                );
        },

        deleteEmpresa: function (id) {
            return $http.delete('../admin/empresa/' + id)
                .then(
                function (response) {
                    return response.data;
                },
                function (errResponse) {
                    console.error('Error while deleting Empresa');
                    return $q.reject(errResponse);
                }
            );
        }
    };

}]);


