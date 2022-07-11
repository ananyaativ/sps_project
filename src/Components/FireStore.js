
var admin = require("firebase-admin");
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

var serviceAccount = require("./creds.json");//Path to credentials file

admin.initializeApp({//Initialize the app
  credential: admin.credential.cert(serviceAccount)
});


const db = admin.firestore();//Initialize the database
//console.log(db);

//console.log("App started");




/*
documentData = db.collection('ingredients')
const ingredients = [];
//get all documents
documentData.get()
    .then(snapshot => {
        snapshot.forEach(doc => {
            //ingredients.push(doc.data());
            //console.log(doc.data()['name']);
            //console.log(typeof(doc.data()));
            ///Map the data to an array
            ingredients.push(doc.data());

        });
    })
    .catch(err => {
        console.log('Error getting documents', err);
    }
    );

//using useState to store the ingredients
const [ingredientsList, setIngredientsList] = useState(ingredients);
//console.log(ingredientsList);


*/
/*
ingredientsList = [
documentData = db.collection('ingredients').get().then(doc => {
    doc.forEach(doc => {
        //console.log(doc.data());
        ingredientsList.push(doc.data());
    }
    )
}
).catch(err => {
    console.log('Error getting documents', err);
}
)
]

    
console.log(ingredientsList);
*/










/*
//add data to the database
const RefDoc = db.collection('ingredients').doc('1');
//Get all documents from collection
RefDoc.get().then(doc => {
    if (!doc.exists) {
        console.log('No such document!');
    } else {
        console.log('Document data:', doc.data());
    }
}
).catch(err => {
    console.log('Error getting document', err);
}
);

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


*/