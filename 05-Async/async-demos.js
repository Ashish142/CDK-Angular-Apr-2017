var app = (function(){
	function addSync(x,y){
		console.log('	[Service] processing ', x , ' and ', y);
		var result = x + y;
		console.log('	[Service] returning result');
		return result;
	}

	function addSyncClient(x,y){
		console.log('[Client] triggering addSync');
		var result = addSync(x,y);
		console.log('[Client] result = ', result);
	}

	function addAsync(x,y, callback){
		console.log('	[Service] processing ', x , ' and ', y);
		setTimeout(function(){
			var result = x + y;
			console.log('	[Service] returning result');
			//return result;
			if (typeof callback === 'function')
				callback(result);
		}, 5000);
	}

	function addAsyncClient(x,y){
		console.log('[Client] triggering addAsync');
		addAsync(x,y, function(result){
			console.log('[Client] result = ', result);
		});
	}

	var addAsyncEvents = (function(){
		var _subscribers = [];
		function subscribe(callback){
			if (typeof callback === 'function')
				_subscribers.push(callback);
		}
		function add(x,y){
			console.log('	[Service] processing ', x , ' and ', y);
			setTimeout(function(){
				var result = x + y;
				console.log('	[Service] returning result');
				_subscribers.forEach(function(callback){
					callback(result);
				});
			}, 5000);
		}

		return {
			subscribe : subscribe,
			add : add
		}
	})();

	function addAsyncPromise(x,y){
		var promise = new Promise(function(resolveFn, rejectFn){
			console.log('	[Service] processing ', x , ' and ', y);
			setTimeout(function(){
				var result = x + y;
				console.log('	[Service] returning result');
				resolveFn(result);
			}, 5000);
		});
		return promise;
	}



	return {
		addSyncClient : addSyncClient,
		addAsyncClient : addAsyncClient,
		addAsyncEvents : addAsyncEvents,
		addAsyncPromise : addAsyncPromise
	}

})();