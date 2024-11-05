const cloudinary = require('cloudinary').v2;
const {CloudinaryStorage}=require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: 'dzecbzrbp',
    api_key:'215463168278388',
    api_secret: 'aL6TxzPT_JjBohmN2Paa5FqO30Q'
});
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'wanderlust_DEV',
      allowedFormats:["png", "jpg", "jpeg"],
      public_id : (req,file)=> 'computed-filename-using-request',
    },
  });

  module.exports = {cloudinary,storage};