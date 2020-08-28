const admin = require("firebase-admin");                                                                                                    const serviceAccount = require("../config/credentials/serviceAccountKey.json");
admin.initializeApp({                                                   credential: admin.credential.cert(serviceAccount),                    databaseURL: "https://blog-app-ionic.firebaseio.com"
});

module.exports=admin;
