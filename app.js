var express = require('express');
var app = express();
var cluster = require ( 'cluster' ) ;

var numCPUs = require ( 'os' ) . cpus ( ) . length

var spawn =require('child_process').spawn;



// console.log(numCPUs);
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


		var span = spawn('webpack',['--watch']);
		span.stdout.on('data',function(data){
			var datastring = data.toString();
			console.log(datastring)
		})

		span.on('exit',function(code,signal){
			console.log('jieshu')

		})
		console.log(span.pid);

		// console.log(process.pid,'1')
		// console.log(process.execPath,'2')
		// console.log(process.title,'3')

		// process.stdin.resume();
		// process.stdin.on('data',function(chunk){
		// 	process.stdout.write('进程接受数据:'+chunk)
		// })


		// process.memoryUsage();



}


// process.stdin.resume();
// 		process.stdin.on('data',function(chunk){
// 			process.stdout.write('进程接受数据:'+chunk)
// 		})