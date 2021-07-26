const { Storage } = require("@google-cloud/storage");
const Multer = require("multer");
const config = require("config");
const uuid = require("uuid");
const { format } = require("util");

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
});

const storage = new Storage({
  projectId: config.get("project_id"),
  keyFilename: "config/ServiceAccountCredentials.json",
});

const bucket = storage.bucket(config.get("GCLOUD_STORAGE_BUCKET"));

async function uploadFile(file, createPost) {
  if (!file) {
    return new Error("No file uploaded.");
  }

  const fileName = uuid.v4();

  const letters = file.originalname.split(".");
  const blob = bucket.file(`${fileName}.${letters[letters.length - 1]}`);

  const blobStream = blob.createWriteStream();

  blobStream.on("error", (err) => {
    return new Error(err);
  });

  blobStream.on("finish", () => {
    const imageUrl = format(`https://storage.googleapis.com/${bucket.name}/${fileName}`);
    createPost(imageUrl)
  });

  blobStream.end(file.buffer);
};

module.exports = uploadFile;
