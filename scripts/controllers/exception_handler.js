/**
 * Created by reinier.leyva on 02/03/2016.
 */
'use strict';

app.factory('Handler', ['$scope','$window', function ($scope, $window) {
    var self = this;
	
	return {
	
	evaluateException: function(errResponse)
	{
		switch(errResponse.status)
		{
			case 409:
				swal("Error...",errResponse.statusText, "error");
			break;
		}
	}
	}	
}]);

