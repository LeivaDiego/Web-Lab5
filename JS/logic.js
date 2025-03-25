/**
 * This function fetches chat messages from the server and returns them as a JSON object. 
 * It handles errors by throwing an exception if the response is not okay. 
 * @returns {Promise<any>} - A promise that resolves to the fetched chat messages in JSON format. 
 */
async function fetchMessages() {

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


// The function fetchMessages is called to retrieve chat messages and log them
fetchMessages().then(messages => {
    // For each message, log the details to the console
    messages.forEach(msg => {
        console.log(`ID: [${msg.id}], User: ${msg.username}, Message: ${msg.message}`);
    })
})