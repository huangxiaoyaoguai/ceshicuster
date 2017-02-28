var express = require('express');
var app = express();
var cluster = require ( 'cluster' ) ;

var numCPUs = require ( 'os' ) . cpus ( ) . length

console.log(numCPUs);
// console.log(cluster)
if (cluster.isMaster) {
	for (var i = 0; i < numCPUs; i++) {
	        //为CPU的每核创建一个分支进程
	        cluster.fork();
	    }
	// cluster.fork() ;
	 cluster.on('death', function(worker) {
	        console.log('Worker ' + worker.pid + ' died.');
	    });
	}else{




app.all('/',function(req,res){

	res.sendfile('./index.html')
})



app.listen(3000,function(){
	console.log('http://localhost:3000')

})
}
