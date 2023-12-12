#!/bin/bash
USERNAME=ripes_server
PWD=a_real_password

mongosh admin --eval "db.createUser({user: '${USERNAME}', pwd: '${PWD}', roles: ['userAdminAnyDatabase']})"
mongoimport -u $USERNAME -p $PWD --db ripes --collection experiments --file test_data.json --mode upsert --jsonArray --authenticationDatabase=admin
mongosh ripes -u $USERNAME -p $PWD --eval "db.experiments.createIndex({_id: 1})" --authenticationDatabase=admin


# mongo admin --eval "db.createUser({user: 'ripes_server', pwd:'a_real_password', roles:['userAdminAnyDatabase'], mechanisms:["SCRAM-SHA-1"]})"