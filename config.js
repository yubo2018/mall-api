'use strict';

module.exports = {
	port: 8006,
	url: 'mongodb://localhost:27017/mall',
	session: {
		name: 'SID',
		secret: 'SID',
		cookie: {
			httpOnly: true,
		    secure:   false,
		    maxAge:  365 * 24 * 60 * 60 * 1000,
		}
	}
}
// mongod --dbpath "D:/MongoDB/Server/3.4/data" --logpath "D:/MongoDB/Server/3.4/log" --serviceName "mongodb" --serviceDisplayName "mongodb" --install
// db.createUser({user:'root',pwd :'root',roles: [{role:'userAdminAnyDatabase',db:'admin'},'readWriteAnyDatabase']})


// db.adminCommand({  shutdown:1 })