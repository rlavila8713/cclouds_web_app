/**
 * Created by reinier.leyva on 02/03/2016.
 */
'use strict';

app.factory('RolService', ['$http', '$q', function ($http, $q) {
    return {
        fetchAllRols: function () {
            return $http.get('../admin/rol/')
                .then(
                function (response) {
                    return response.data;
                },
                function (errResponse) {
                    console.error('Error while fetching rols');
                    return $q.reject(errResponse);
                }
            );
        },

        getRolById: function (idRol) {
            return $http.get('../admin/rol/id='+idRol)
                .then(
                    function (response) {
                        return response.data;
                    },
                    function (errResponse) {
                        console.error('Error while fetching rol');
                        return $q.reject(errResponse);
                    }
                );
        },

        createRol: function (rol) {
            return $http({
                method: 'POST',
                url: '../admin/rol/',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function (rol) {
                    var str = [];
                    var flag = true;
					
                    for (var r in rol) {
                        if (!flag ) {
                            str.push(encodeURIComponent(r) + "=" + encodeURIComponent(rol[r]));
							
                        }
                        else {
                            flag = !flag;
                        }
                    }
					
                    return str.join("&");
                },
                data: rol
            })
                .then(
                function (response) {
                    return response.data;
                },
                function (errResponse) {
                    console.error('Error while creating rol');
                    return $q.reject(errResponse);
                }
            );
        },

        updateRol: function (rol, id) {
            return $http({
                method: 'POST',
                url: '../admin/rol/' + id,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function (rol) {
                    var str = [];
                    var flag = true;
					var count = 1;
                    for (var r in rol)
                    {
						 if (!flag && count<=2) 
						{
							str.push(encodeURIComponent(r) + "=" + encodeURIComponent(rol[r]));
							count++;
						}
						else{
							flag = !flag;
                        }
                    }
					var aa = str.join("&");
					console.log(aa);
                    return str.join("&");
                },
                data: rol
            })
                .then(
                function (response) {
                    return response.data;
                },
                function (errResponse) {
                    console.error('Error while updating Rol');
                    return $q.reject(errResponse);
                }
            );
        },

        deleteRol: function (id) {
            return $http.delete('../admin/rol/' + id)
                .then(
                function (response) {
                    return response.data;
                },
                function (errResponse) {
                    console.error('Error while deleting rol');
                    return $q.reject(errResponse);
                }
            );
        }
    };

}]);



