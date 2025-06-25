function sendMessage() {
    // Get the button element
    const button = document.getElementById('submitButton');
    
    // Replace the button with a paragraph
    button.outerHTML = '<p id="submitMessage" class="submit-message" aria-live="polite">Message sent! ✅</p>';
    
    // Get the home link element and add focus to it
    let home = document.getElementById("home").focus()
}

// Here's your challenge:
// 1. Update the code so that pressing the submit button 'politely' announces the new revealed sumbit message.
// 2. Add focus to the home link when the user submits a message by selecting the correct element and adding ".focus()" to it.