
var admin = require("firebase-admin");
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

var serviceAccount = require("./creds.json");//Path to credentials file

admin.initializeApp({//Initialize the app
  credential: admin.credential.cert(serviceAccount)
});


const db = admin.firestore();//Initialize the database
console.log(db);

//console.log("App started");

//add data to the database
const RefDoc = db.collection('ingredients').doc('1');
//console.log(RefDoc);

//Get field value
//RefDoc.get().then(doc => {
//    console.log(doc.data());
//}
//).catch(err => {
//    console.log(err);
//}
//);
RefDoc.get().then(doc => {
    console.log(doc.data());
}
).catch(err => {
    console.log(err);
}
);
//Add data to the database