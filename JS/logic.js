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
        return true;

    } catch (error) {
        console.error('Failed to send message:', error);
        return false; // Return false in case of an error
    }
}

// The function sendMessage is called to send a message to the chat server
sendMessage('Tester', 'Pruebita')
    .then(result => {
        if (result) {
            console.log('Chat updates');
        }
    });

// The function fetchMessages is called to retrieve chat messages and log them
loadMessages().then(messages => {
    // For each message, log the details to the console
    messages.forEach(msg => {
        console.log(`ID: [${msg.id}], User: ${msg.username}, Message: ${msg.message}`);
    })
})



// --- Devng Chat GUI Elements ---
const chat = document.createElement('div');                 // Main chat container
const messageList = document.createElement('div');          // List of messages
const inputContainer = document.createElement('div');       // Input section
const inputField = document.createElement('input');         // Input field to type messages
const sendButton = document.createElement('button');        // Button to send messages

// --- GUI Elements Styling ---
document.body.style.margin = '0';
document.body.style.padding = '0';
document.body.style.overflow = 'hidden';
document.body.style.boxSizing = 'border-box';

// Main chat container style
Object.assign(chat.style, {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'sans-serif',
    background: '#f0f0f0',
});


// Message list box style
Object.assign(messageList.style, {
    flex: '1',
    overflowY: 'auto',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
});

// Input container style
Object.assign(inputContainer.style, {
    display: 'flex',
    padding: '10px',
    borderTop: '1px solid #ccc',
    background: '#fff',
    position: 'sticky',
    bottom: '0',
    zIndex: '10'
});

// Input field style
Object.assign(inputField.style, {
    width: '100%',
    flex: '1',
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc'
});

// Send button style
Object.assign(sendButton.style, {
    marginLeft: '10px',
    padding: '10px 20px',
    fontSize: '1rem',
    border: '1px solidrgb(0, 49, 101)',
    borderRadius: '1px',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer'
});

// --- GUI Elements Content ---

// Set placeholder and max length for the input field
inputField.placeholder = 'Escribe tu mensaje (máx 140)';
inputField.maxLength = 140;
sendButton.textContent = 'Enviar';

// --- GUI Elements Structure ---
// Append the input field and send button to the input container
inputContainer.appendChild(inputField);
inputContainer.appendChild(sendButton);
chat.appendChild(messageList);
chat.appendChild(inputContainer);
document.body.appendChild(chat);