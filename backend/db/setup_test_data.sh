mongosh admin --eval "db.createUser({user: 'ripes_server', pwd: 'a_real_password', roles: ['userAdminAnyDatabase']})"
mongoimport --db ripes --collection experiments --file test_data.json --mode upsert --jsonArray
