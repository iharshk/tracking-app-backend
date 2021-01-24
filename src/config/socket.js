
module.exports.socketConnect = function (io) {
	io.on('connection', (socket) => {
		console.log('a user connected');
		socket.on('userconnect', data => {
	 
			console.log(data);
			
		});
		
		socket.on('disconnect', () => {
		  console.log('user disconnected');
		});
	});
}