/**
 * Created by reinier.leyva on 02/03/2016.
 */
'use strict';

app.factory('ModuleService', ['$http', '$q', function ($http, $q) {
    return {
        fetchAllModule: function () {
            return $http.get('../admin/module/')
                .then(
                function (response) {
                    return response.data;
                },
                function (errResponse) {
                    console.error('Error while fetching modules');
                    return $q.reject(errResponse);
                }
            );
        },

        createModule: function (module) {
            return $http({
                method: 'POST',
                url: '../admin/module/',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function (module) {
                    var str = [];
                    var flag = true;
                    for (var r in module) {
                        if (!flag ) {
                            str.push(encodeURIComponent(r) + "=" + encodeURIComponent(module[r]));

                        }
                        else {
                            flag = !flag;
                        }
                    }
					
                    return str.join("&");
                },
                data: module
            })
                .then(
                function (response) {
                    return response.data;
                },
                function (errResponse) {
                    console.error('Error while creating module');
                    return $q.reject(errResponse);
                }
            );
        },

        updateModule: function (module, id) {
            return $http({
                method: 'POST',
                url: '../admin/module/' + id,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function (module) {
                    var str = [];
                    var flag = true;
					var count = 1;
                    for (var r in module)
                    {
						 if (!flag && count<=2) 
						{
							str.push(encodeURIComponent(r) + "=" + encodeURIComponent(module[r]));
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
                data: module
            })
                .then(
                function (response) {
                    return response.data;
                },
                function (errResponse) {
                    console.error('Error while updating Module');
                    return $q.reject(errResponse);
                }
            );
        },

        deleteModule: function (id) {
            return $http.delete('../admin/module/' + id)
                .then(
                function (response) {
                    return response.data;
                },
                function (errResponse) {
                    console.error('Error while deleting module');
                    return $q.reject(errResponse);
                }
            );
        }
    };

}]);



