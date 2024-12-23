const axios = require('axios');

// Asterisk ARI configuration
const ariServer = "http://192.168.180.7:3033";
const username = "pejman";
const password = "7799";

// Call details
const endpoint = "PJSIP/7000";
const callerId = "7799";
const app = "my_app"; // ARI Application name

// ARI endpoint to originate a call
const url = `${ariServer}/ari/channels`;

// Payload for originating the call
const callData = {
    endpoint: endpoint,
    app: app,  // Make sure app matches the one in your Asterisk config
    callerId: callerId,
};

// Function to originate a call
async function originateCall() {
    try {
        const response = await axios.post(url, callData, {
            auth: {
                username: username,
                password: password
            },
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('Call originated successfully:', response.data);

        const channelId = response.data.id; // Get the channelId from the response
        await answerCall(channelId); // Wait for the StasisStart event, then answer
        await playAudio(channelId, 'queue-thankyou'); // Play an audio file after answering

    } catch (error) {
        console.error('Failed to originate call:', error.response?.status, error.response?.data || error.message);
    }
}

// Function to answer the call
async function answerCall(channelId) {
    try {
        const answerUrl = `${ariServer}/ari/channels/${channelId}/answer`;
        const response = await axios.post(answerUrl, {}, {
            auth: {
                username: username,
                password: password
            }
        });
        console.log('Call answered successfully:', response.data);
    } catch (error) {
        console.error('Failed to answer the call:', error.response?.status, error.response?.data || error.message);
    }
}

// Function to play audio
async function playAudio(channelId, audioFile) {
    try {
        const playUrl = `${ariServer}/ari/channels/${channelId}/play`;
        const playData = {
            media: `sound:${audioFile}`  // Path to the audio file
        };
        const response = await axios.post(playUrl, playData, {
            auth: {
                username: username,
                password: password
            }
        });
        console.log('Audio played successfully:', response.data);
    } catch (error) {
        console.error('Failed to play audio:', error.response?.status, error.response?.data || error.message);
    }
}

// Execute the call function
originateCall();
