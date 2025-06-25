function sendMessage() {
    // Get the button element
    const button = document.getElementById('submitButton');
    
    // Replace the button with a paragraph
    button.outerHTML = '<p id="submitMessage" aria-live="polite" class="submit-message">Message sent! ✅</p>';
    
    // Get the home link element and add focus to it
    
}

// Here's your challenge:
// 1. Update the code so that pressing the submit button 'politely' announces the new revealed sumbit message.