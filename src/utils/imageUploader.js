const cloudinary = require('cloudinary/lib/cloudinary');
cloudinary.config({
  cloud_name: "dmdtwsdi7",
  api_key: "234357432693483",
  api_secret: "TwFF2N3JWQFPWtgaSsx-4yulN1Y",
});

const upload = async (image) => {
  try {
    return await cloudinary.uploader.upload(image);
  } catch (error) {
    return { error: error.message };
  }
};

export default upload;