// ------ DevNG Chat Application ------

// --- Constants and Variables ---
// Username for the chat
const devng_user = "Mr. Puxter";

// Last Message ID
let lastRenderedMessageId = 0;

// Current Theme
let currentTheme = localStorage.getItem('devng_chat_theme') || 'light'; // Default to light theme

// Messages array
let messages = [];



// --- Devng Chat GUI Elements ---
const header = document.createElement('div');               // Header container
const title = document.createElement('span');               // Title of the chat
const themeSwitch = document.createElement('div');          // Theme switch container
const themeThumb = document.createElement('div');           // Theme switch thumb
const chat = document.createElement('div');                 // Main chat container
const messageList = document.createElement('div');          // List of messages
const inputContainer = document.createElement('div');       // Input section
const inputField = document.createElement('input');         // Input field to type messages
const sendButton = document.createElement('button');        // Button to send messages
const scrollButton = document.createElement('button');       // Button to scroll to the bottom of the chat
const themeIcon = document.createElement('span');           // Theme icon for the switch


// --- Custom Fonts ---
const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=Galindo&family=Poppins:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&display=swap';
fontLink.rel = 'stylesheet';
document.head.appendChild(fontLink);



// --- Custom Animations ---

// Fade-in animation for new messages or scroll button
const fadeInStyle = document.createElement('style');
fadeInStyle.textContent = `
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(5px); }
    to { opacity: 1; transform: translateY(0); }
}
.fade-in {
    animation: fadeIn 0.3s ease-out;
}
`;
document.head.appendChild(fadeInStyle);


// Fade-out animation for scroll button when not needed
const fadeOutStyle = document.createElement('style');
fadeOutStyle.textContent = `
@keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
}
.fade-out {
    animation: fadeOut 0.3s ease-out forwards;
}
`;
document.head.appendChild(fadeOutStyle);



// --- Color Palette ---
const colors = {
    // Primary Dark
    richBlack: '#0A1513',
    darkGreen: '#032221',
    bangladeshGreen: '#03624C',
    darkGray: '#737373',
    // Primary Light
    mountainMeadow: '#2CC295',
    caribbeanGreen: '#00DF81',
    antiFlashWhite: '#F1F7F6',
    // Secondary Dark
    pine: '#06302B',
    basil: '#0B453A',
    forest: '#095544',
    stone: '#707D7D',
    black: '#000000',
    // Secondary Light
    frog: '#17876D',
    mint: '#2FA98C',
    pistachio: '#AAC8C4',
    lightPistachio: '#CBF2ED'
}


// --- Theme Switch Functionality ---
function applyTheme(theme) {
    // Check if the theme is dark or light
    const isDark = theme === 'dark';
    
    // Move the thumb to the left or right based on the theme
    themeThumb.style.transform = isDark ? 'translateX(25px)' : 'translateX(3px)';

    // Change the background color of the theme switch
    themeSwitch.style.backgroundColor = isDark ? colors.richBlack : colors.frog;

    // Change the icon
    themeIcon.textContent = isDark ? '☾' : '☀︎'; // Moon icon for dark theme, sun icon for light theme
    themeIcon.style.color = isDark ? colors.antiFlashWhite : colors.lightPistachio; // Change icon color based on theme
    themeIcon.style.left = isDark ? '6px' : 'unset'; // Adjust icon position based on theme
    themeIcon.style.right = isDark ? 'unset' : '6px'; // Adjust icon position based on theme

    // Apply the selected theme colors to the interface elements
    // The document
    document.body.style.backgroundColor = isDark ? colors.richBlack : colors.antiFlashWhite; // Set background color
    
    // The chat container
    chat.style.backgroundColor = isDark ? colors.richBlack : colors.antiFlashWhite; // Set chat background color
    
    // The header container
    header.style.backgroundColor = isDark ? colors.pine : colors.caribbeanGreen; // Set header background color
    
    // The title style
    title.style.color = isDark ? colors.basil : colors.caribbeanGreen; // Set title text color

    // The message list box
    messageList.style.backgroundColor = isDark ? colors.darkGreen : colors.antiFlashWhite; // Set message list background color

    // The input container and field
    inputContainer.style.backgroundColor = isDark ? colors.forest : colors.lightPistachio; // Set input container background color
    inputContainer.style.borderTop = `1px solid ${isDark ? colors.richBlack : colors.forest}`; // Set input container border color
    inputField.style.backgroundColor = isDark ? colors.pine : colors.antiFlashWhite; // Set input field background color
    inputField.style.color = isDark ? colors.antiFlashWhite : colors.darkGreen; // Set input field text color
    inputField.style.border = `1px solid ${isDark ? colors.mint : colors.darkGreen}`; // Set input field border color

    // The send button
    sendButton.style.backgroundColor = isDark ? colors.frog : colors.caribbeanGreen; // Set send button background color
    sendButton.style.color = isDark ? colors.lightPistachio : colors.darkGreen; // Set send button text color
    sendButton.style.border = `1px solid ${isDark ? colors.richBlack : colors.forest}`; // Set send button border color

    // The scroll button
    scrollButton.style.backgroundColor = isDark ? colors.mountainMeadow : colors.lightPistachio; // Set scroll button background color
    scrollButton.style.color = isDark ? colors.antiFlashWhite : colors.darkGreen; // Set scroll button text color
    scrollButton.style.border = `1px solid ${isDark ? colors.forest : colors.darkGreen}`; // Set scroll button border color
}

applyTheme(currentTheme);



// --- GUI Elements Styling ---
// Body style to remove default margin and padding
document.body.style.margin = '0';
document.body.style.padding = '0';
document.body.style.overflow = 'hidden';
document.body.style.boxSizing = 'border-box';

// Main chat container style
Object.assign(chat.style, {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Poppins, sans-serif',
    //background: colors.antiFlashWhite
});

// Header container style
Object.assign(header.style, {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 20px',
    position: 'sticky',
    top: '0',
    zIndex: '20',
    boxShadow: `0 2px 4px ${colors.darkGray}`
});

// Title style *custom font
Object.assign(title.style, {
    fontFamily: `'Galindo', sans-serif`,
    fontWeight: 'bold',
    fontSize: '1.5rem',
    backgroundColor: colors.frog,
    padding: '10px 10px',
    borderRadius: '20px',
    boxShadow: `0 1px 4px ${colors.darkGray}`,
    lineHeight: '1'
});

// Theme switch Style
Object.assign(themeSwitch.style, {
    width: '50px',
    height: '26px',
    //backgroundColor: colors.frog,
    borderRadius: '15px',
    position: 'relative',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    display: 'flex',
    alignItems: 'center',
    padding: '2px',
});

// Theme thumb style
Object.assign(themeThumb.style, {
    width: '22px',
    height: '22px',
    backgroundColor: colors.pistachio,
    borderRadius: '50%',
    transform: 'translateX(3px)',
    transition: 'transform 0.3s',
    boxShadow: `0 0 4px ${colors.darkGray}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    userSelect: 'none',
    lineHeight: '1'
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
    position: 'sticky',
    bottom: '0',
    zIndex: '10'
});

// Input field style
Object.assign(inputField.style, {
    fontFamily: 'Poppins, sans-serif',
    fontSize: '1rem',
    fontWeight: '400',
    width: '100%',
    flex: '1',
    padding: '10px',
    borderRadius: '6px',
});

// Send button style
Object.assign(sendButton.style, {
    marginLeft: '10px',
    padding: '10px 20px',
    fontFamily: 'Poppins, sans-serif',
    fontSize: '1rem',
    fontWeight: '500',
    borderRadius: '6px',
    cursor: 'pointer'
});

// Scroll Down button style
Object.assign(scrollButton.style, {
    position: 'fixed',
    bottom: '80px',
    right: '20px',
    padding: '10px',
    width: '40px',
    height: '40px',
    fontSize: '1rem',
    borderRadius: '50%',
    boxShadow: `0 2px 4px ${colors.darkGray}`,
    cursor: 'pointer',
    zIndex: '30',
    display: 'none',
    alignItems: 'center',
    justifyContent: 'center'
});

// Theme icon style
Object.assign(themeIcon.style, {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '14px',
    pointerEvents: 'none',
    userSelect: 'none',
    right: '6px'
});



// --- GUI Elements Content ---
// Set placeholder and max length for the input field
inputField.placeholder = 'Escribe tu mensaje (máx 140)';
inputField.maxLength = 140;
sendButton.textContent = 'Enviar';
title.textContent = 'DevNG Chat';
scrollButton.textContent = '⬇︎';
themeIcon.textContent = '☀︎'; // Sun icon for light theme


// --- GUI Elements Structure ---
header.appendChild(title);
themeSwitch.appendChild(themeIcon);
themeSwitch.appendChild(themeThumb);
header.appendChild(themeSwitch);
chat.appendChild(header);
chat.appendChild(messageList);
chat.appendChild(inputContainer);
inputContainer.appendChild(inputField);
inputContainer.appendChild(sendButton);
document.body.appendChild(chat);
document.body.appendChild(scrollButton);



// --- Functions ---
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


/**
 * This function checks if the user is at the bottom of the chat window.
 * It takes an optional threshold parameter to determine how close to the bottom the user needs to be.
 * @param {number} threshold - The threshold in pixels to check if the user is at the bottom.
 * @returns {boolean} - Returns true if the user is at the bottom, false otherwise.
 */
function isUserAtBottom(threshold = 5) {
    return messageList.scrollHeight - messageList.scrollTop <= messageList.clientHeight + threshold;
}


/**
 * This function updates the visibility of the scroll button based on the user's scroll position.
 * It hides the button if the user is at the bottom of the chat window, otherwise it shows it.
 */
function updateScrollButtonVisibility() {
    const isAtBottom = isUserAtBottom(10); // 10px threshold

    if (isAtBottom){
        // Check if the scroll button is visible and remove the fade-in class
        if (scrollButton.style.display !== 'none') {
            scrollButton.classList.remove('fade-in'); // Remove fade-in class
            scrollButton.classList.add('fade-out'); // Add fade-out class

            // Set a timeout to hide the button after the fade-out animation
            setTimeout(() => {
                scrollButton.style.display = 'none'; // Hide the button
                scrollButton.classList.remove('fade-out'); // Remove fade-out class
            }
            , 300); // Match the duration of the fade-out animation
        } 
    } else {
        // Show the scroll button if the user is not at the bottom
        if (scrollButton.style.display === 'none') {
            scrollButton.style.display = 'block'; // Show the button
            scrollButton.classList.add('fade-in'); // Add fade-in class
        }
    }
}


/**
 * This function renders the chat messages in the message list.
 * It clears the message list before rendering new messages.
 * @param {Array} messages - An array of message objects to be rendered.
 * Each message object should contain a username and message property.
 */
function renderMessages(messages){
    // Check if the user is at the bottom of the chat
    const isAtBottom = isUserAtBottom(10); // 10px threshold
    // Get the current theme
    const isDark = currentTheme === 'dark';

    // Clear the message list before rendering new messages
    messageList.innerHTML = '';

    // For each message, create a div "bubble" and append it to the message list
    messages.forEach(msg => {

        const {id, username, message} = msg; // Destructure the message object
        
        // Create a message bubble with the message text and username
        const msgBubble = document.createElement('div');
        const msgText = document.createElement('div');
        const msgUser = document.createElement('div');

        // Check if the message is from the current user
        const isCurrentUser = username === devng_user;

        // Set the content for the message bubble
        msgText.textContent = message;
        msgUser.textContent = isCurrentUser ? 'Tú' : username;  // Display "Tú" for the current user

        // Add the fade-in class for animation
        // and check if the message is the last one rendered
        if (id > lastRenderedMessageId) {
            msgBubble.classList.add('fade-in'); // Add fade-in animation class
            lastRenderedMessageId = id; // Update the last rendered message ID
        }

        // Set the colors for the message bubble based on the theme
        const userBg = isDark ? colors.bangladeshGreen : colors.mountainMeadow;
        const userText = isDark ? colors.antiFlashWhite : colors.darkGreen;
        const otherBg = isDark ? colors.darkGray : colors.lightPistachio;
        const otherText = isDark ? colors.antiFlashWhite : colors.darkGreen;
        
        // Set the styles for the message bubble
        // Message bubble style
        Object.assign(msgBubble.style, {
            maxWidth: '70%',
            padding: '10px',
            borderRadius: '10px',
            marginBottom: '5px',
            display: 'flex',
            flexDirection: 'column',
            alignSelf: isCurrentUser ? 'flex-end' : 'flex-start', // Align to the right for current user
            backgroundColor: isCurrentUser ? userBg : otherBg, // Different background color for current user
            color: isCurrentUser ? userText : otherText, // Different text color for current user
            boxShadow: '0 0 4px rgba(0,0,0,0.2)',
            fontSize: '1rem',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: '400'
        });

        // Set the styles for the message text
        Object.assign(msgText.style, {
            fontSize: '1rem',
            marginBottom: '5px',
            wordBreak: 'break-word',
            whiteSpace: 'pre-wrap',
        });

        // Set the styles for the username
        Object.assign(msgUser.style, {
            fontSize: '0.8rem',
            color: isDark ? colors.antiFlashWhite : colors.darkGreen,
            fontFamily: 'Poppins, sans-serif',
            fontWeight: '600',
            fontStyle: 'italic',
            textAlign: 'left'
        });

        // Append the message text and username to the message bubble
        msgBubble.appendChild(msgUser);
        msgBubble.appendChild(msgText);
        messageList.appendChild(msgBubble); // Append the message bubble to the message list
    });

    // If the user is at the bottom, scroll to the bottom of the message list
    if (isAtBottom) {
        messageList.scrollTop = messageList.scrollHeight; // Scroll to the bottom
    }
}


/**
 * This function handles sending a message when the send button is clicked or Enter key is pressed.
 * It checks if the message is empty or exceeds 140 characters before sending it.
 * @returns {Promise<void>} - A promise that resolves when the message is sent successfully.
 */
async function handleSendMessage() {
    const message = inputField.value.trim();

    // Check if the message is empty or exceeds 140 characters
    if (message.length === 0 || message.length > 140) return;

    // Send the message using the sendMessage function
    const success = await sendMessage(devng_user, message);
    if (success) {
        inputField.value = ''; // Clear the input field after sending the message
        const messages = await loadMessages(); // Load the messages again
        renderMessages(messages); // Render the messages in the chat window
    }
}



// --- Event Listeners ---

// Event listener for the send button
sendButton.addEventListener('click', handleSendMessage);

// Event listener for the input field to send message on Enter key press
inputField.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        e.preventDefault();
        handleSendMessage();
    }
});

// Event listener for the scroll button to scroll to the bottom of the chat
scrollButton.addEventListener('click', () => {
    messageList.scrollTop = messageList.scrollHeight;
});

// Event listener for the scroll event to update the visibility of the scroll button
messageList.addEventListener('scroll', updateScrollButtonVisibility);

// Event listener for the theme switch to toggle between light and dark themes
themeSwitch.addEventListener('click', () => {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light'; // Toggle theme
    localStorage.setItem('devng_chat_theme', currentTheme); // Store the selected theme in local storage
    applyTheme(currentTheme); // Apply the selected theme
    renderMessages(messages); // Re-render messages to apply theme changes
});



// --- Main section ---
/**
 * This function initializes the chat by loading and rendering messages.
 * It is called when the script is loaded.
 */
async function main() {
    applyTheme(currentTheme);
    messages = await loadMessages();
    renderMessages(messages);    
}

main(); // Call the main function to initialize the chat

// Message refresh interval
// This section sets an interval to refresh the messages every 5 seconds
setInterval(async () => {
    messages = await loadMessages();
    renderMessages(messages);
}, 5000); // Refresh messages every 5 seconds

// Scroll button visibility interval
setInterval(updateScrollButtonVisibility, 500);