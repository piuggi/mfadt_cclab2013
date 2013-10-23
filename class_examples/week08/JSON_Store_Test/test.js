var store = require('node-store')('test.json');

var obj = {id:1202,test:'hello world'}

store.add(obj,function(err){
	if(err) throw err;
})