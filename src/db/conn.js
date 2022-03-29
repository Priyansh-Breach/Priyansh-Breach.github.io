const {MongoClient} = require('mongodb');

async function main(){
    const uri = "mongodb+srv://priyansh:priyansh@cluster0.3g3qs.mongodb.net/test?authSource=admin&replicaSet=atlas-vv5c4y-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";
 

    const client = new MongoClient(uri);
 
    try {
        await client.connect();
        console.log("Database connected");
        async function createListing(client, newListing){
            const result = await client.db("sampleDB").collection("registers").insertOne(newListing);
            console.log(`New listing created with the following id: ${result.insertedId}`);
        }
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);