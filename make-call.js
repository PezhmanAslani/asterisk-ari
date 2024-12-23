
const axios = require('axios');

// Asterisk ARI configuration
const ariServer = "http://192.168.2.4:3033";
const username = "pejman";
const password = "7799";

// Call details
const endpoint = "PJSIP/1002"; // Example: SIP/1002
const callerId = "7799"; // Example: 1001
const context = "default"; // Dialplan context
const priority = "1";      // Dialplan priority
const app = "my_app"; // Your ARI application name

// ARI endpoint to originate a call
const url = `${ariServer}/ari/channels`;

const callData = {
    endpoint: endpoint,
    extension: "1002", // Destination extension
    context: context,
    priority: priority,
    callerId: callerId,
    app: app
};

// Function to originate call
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
    } catch (error) {
        console.error('Failed to originate call:', error.response?.status, error.response?.data || error.message);
    }
}

// Execute the call function
originateCall();
