/**
 * This function fetches chat messages from the server and returns them as a JSON object. 
 * It handles errors by throwing an exception if the response is not okay. 
 * @returns {Promise<any>} - A promise that resolves to the fetched chat messages in JSON format. 
 */
async function loadMessages() {

    try {
        // GET request to fetch messages from the server
        const response = await fetch('https://chat.devng.online/chats');

        // Check if the response is okay
        if (!response.ok) {
            // If it isn't true, throw an error with the status text
            throw new Error(`ERROR: Messages could not be fetched -> ${response.statusText}`);
        }

        // If the response is okay, parse the JSON data
        const messages = await response.json();
        return messages;
    
    } catch (error) {
        console.error('Failed to fetch messages:', error);
        return []; // Return an empty array in case of an error
    }
}

/**
 * This function sends a message to the server.
 * It takes a username and message as parameters and performs a POST request to send the message.
 * It handles errors by throwing an exception if the response is not okay.
 * @param {string} username - The username of the sender.
 * @param {string} message - The message to be sent.
 * @return {Promise<boolean>} - A promise that resolves to true if the message was sent successfully, false otherwise.
*/
async function sendMessage(username, message) {

    try {
        // POST request to send a new message to the server
        const response = await fetch('https://chat.devng.online/chats', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, message })
        });

        // Check if the response is okay
        if (!response.ok) {
            // If it isn't true, throw an error with the status text
            throw new Error(`ERROR: Message could not be sent -> ${response.statusText}`);
        }

        // If the response is okay, parse the JSON data
        const result = await response.json();
        console.log('Message sent successfully:', result);
        return True;

    } catch (error) {
        console.error('Failed to send message:', error);
        return False; // Return false in case of an error
    }
}

// The function sendMessage is called to send a message to the chat server
sendMessage('Tester', 'Pruebita')
    .then(result => {
        if (result) {
            console.log('Chat updates');
        } else {
            console.log('Failed to send message');
        }
    });

// The function fetchMessages is called to retrieve chat messages and log them
loadMessages().then(messages => {
    // For each message, log the details to the console
    messages.forEach(msg => {
        console.log(`ID: [${msg.id}], User: ${msg.username}, Message: ${msg.message}`);
    })
})