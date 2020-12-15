const youtube = require('youtube-api');
const credentials = require('../static/js/credentials.json');

const oAuth = youtube.authenticate({
    type: 'oauth',
    client_id: credentials.web.client_id,
    client_secret: credentials.web.client_secret,
    redirect_uri: credentials.web.redirect_uris[0]
})

const upload = async (video) => {
    const {name, title} = video;
    debugger
    open(oAuth.generateAuthUrl({
        access_type: 'offline',
        scope: 'https://www.googleapis.com/auth/youtube.upload',
        state: JSON.stringify({
            name, title
        })
    }))

    
}