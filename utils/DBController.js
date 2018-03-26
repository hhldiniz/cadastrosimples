const MongoClient = require('mongodb').MongoClient;

class DBController
{
    constructor(host='localhost', port=27017, dbuser="", password="", dbname="test")
    {
        this.host = host;
        this.port = port;
        this.dbuser = dbuser;
        this.password = password;
        this.dbname = dbname;
        this.connectionDB = null;
        this.url = `mongodb://${this.host}:${this.port}`;
    }

    setConnection(db)
    {
        this.connectionDB = db;
    }

    connect(callback)
    {
        if(this.connectionDB == null)
        {
            MongoClient.connect(this.url,(err, db)=>{
                if(err) throw err;
                this.setConnection(db);
                callback();
            });
        }
        else
        {
            callback();
        }
    }

    disconnect()
    {
        this.connectionDB.disconnect();
    }

    select(callback, collection, filter)
    {
        this.connectionDB.db(this.dbname).collection(collection).find(filter).toArray((err, docs)=>{
            if(err) throw err;
            callback(docs);
        });
    }

    insert(callback, collection, data)
    {
        this.connectionDB.db(this.dbname).collection(collection).insertOne(data, (err, r)=>{
            if(err) throw err;
            callback(r);
        });
    }

    delete(collection, filter)
    {

    }

    update(collection, filter, data)
    {

    }
}

module.exports = DBController;