const { MongoClient, ObjectId } = require("mongodb");

const connectionUrl = "mongodb://127.0.0.1/27017";

const dbName = "taskly";

((connectionUrl, options, dbName) => {
      MongoClient.connect(connectionUrl, options)
            .then((result) => {
                  const db = result.db(dbName);

                  // CRUD

                  // insertOne

                  // db.collection("users")
                  //       .insertOne({ name: "Ade", age: 24 })
                  //       .then((res) => {
                  //             console.log("response =>", res);
                  //       })
                  //       .catch(({ message }) => {
                  //             console.log("Error =>", message);
                  //       });

                  // updateOne

                  // const updatePromise = db.collection("users").updateOne(
                  //       { _id: new ObjectId("618cc72c5896aedb074a3d92") },
                  //       // { name: "Shade" },
                  //       {
                  //             $inc: {
                  //                   age: 1,
                  //             },
                  //       },
                  //       { upsert: false }
                  // );
                  // updatePromise
                  //       .then((res) => console.log(res))
                  //       .catch(({ message }) => console.log(message));

                  // UpdateMany

                  // const updateManyPromise = db.collection("tasks").updateMany(
                  //       { completed: false },
                  //       {
                  //             $set: {
                  //                   completed: true,
                  //             },
                  //       }
                  // );
                  // updateManyPromise
                  //       .then((res) => console.log(res))
                  //       .catch(({ message }) => console.log(message));

                  // deleteMany

                  // const deleteManyPromise = db
                  //       .collection("users")
                  //       .deleteMany({ age: 24 });
                  // deleteManyPromise
                  //       .then((res) => {
                  //             if (res.deletedCount > 1) {
                  //                   console.log(res);
                  //                   console.log("Users deleted successfully");
                  //             }
                  //       })
                  //       .catch((err) => {
                  //             console.log(err.message);
                  //       });

                  // deleteOne
                  db.collection("tasks")
                        .deleteOne({ description: "Walk the dog" })
                        .then((res) => {
                              if (res.deletedCount === 1) {
                                    console.log("Successfully deleted a record");
                              }
                        })
                        .catch(({ message }) => {
                              console.log(message);
                        });
            })
            .catch(({ message }) => {
                  console.log("Error:", message);
            });
})(connectionUrl, { useNewUrlParser: true }, dbName);
