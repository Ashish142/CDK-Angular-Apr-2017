 
var utils = angular.module("utils", []);
utils.value('defaultTrimLength', 30);

utils.filter('trimText', function(defaultTrimLength){
	
	return function(data, trimLength){
		trimLength = trimLength || defaultTrimLength;
		return data.length > trimLength ? data.substr(0,trimLength) + '...' : data;
	}
});

utils.filter('elapsed', function(){
	return function(data){
		return moment(data).fromNow();
	};
});