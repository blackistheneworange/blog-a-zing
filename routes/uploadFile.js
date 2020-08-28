const {Storage} = require('@google-cloud/storage');
const path = require('path');

const keyPath=path.resolve(__dirname,"../config/credentials/serviceAccountKey.json");

const storage = new Storage({
  projectId: "blog-app-ionic",
  keyFilename: keyPath
});

const bucket = storage.bucket("gs://blog-app-ionic.appspot.com");


module.exports = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject('No image file');
    }
    let newFileName = `${file.originalname}_${Date.now()}`;

    let fileUpload = bucket.file(newFileName);

    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype
      }
    });

    blobStream.on('error', (error) => {
	    console.log(error)
      reject('Something is wrong! Unable to upload at the moment.');
    });

    blobStream.on('finish', () => {
      fileUpload.makePublic()
      .then(()=>{
	      const url = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;
	      resolve(url);
      })
    });

    blobStream.end(file.buffer);
  });
}


