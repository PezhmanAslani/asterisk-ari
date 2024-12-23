const AriClient = require('ari-client'); // Use ari-client module for Node.js

const ariServer = "http://192.168.180.7:3033";
const username = "pejman";
const password = "7799";
const app = "my_app";  // The same app name defined in ari.conf

// Connect to ARI
AriClient.connect(ariServer, username, password, (error, client) => {
    if (error) {
        console.error('Error connecting to ARI:', error);
        return;
    }

    console.log('Connected to ARI');

    // Register the event listener for StasisStart
    client.on('StasisStart', (event, channel) => {
        console.log(`Channel ${channel.id} entered Stasis application ${app}`);

        // Answer the call when it enters Stasis
        channel.answer((error) => {
            if (error) {
                console.error('Error answering the call:', error);
                return;
            }
            console.log('Call answered');

            // Play an audio file once the call is answered
            channel.play({media: 'sound:queue-thankyou'}, (error) => {
                if (error) {
                    console.error('Error playing audio:', error);
                    return;
                }
                console.log('Audio played successfully');
            });
        });
    });
    client.start(app);
});
