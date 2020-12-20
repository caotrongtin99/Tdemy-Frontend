const cloudinary = require('cloudinary/lib/cloudinary');
cloudinary.config({
    cloud_name: "dmdtwsdi7",
    api_key: "234357432693483",
    api_secret: "TwFF2N3JWQFPWtgaSsx-4yulN1Y",
});

const upload = async (video) => {
    try {
        return await cloudinary.uploader.upload(video, {
            resource_type: "video",
            chunk_size: 6000000,
            eager: [
                { width: 300, height: 300, crop: "pad", audio_codec: "none" },
                { width: 160, height: 100, crop: "crop", gravity: "south", audio_codec: "none" }],
            eager_async: true,
            upload_large: true
        });
    } catch (error) {
        console.log("===============video upload service ===========", error)
        return { error: error.message };
    }
};

export default upload;