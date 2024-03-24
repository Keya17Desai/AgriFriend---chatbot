document.addEventListener('DOMContentLoaded', function () {
    const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-btn');

  
    sendButton.addEventListener('click', function () {
      sendMessage();
    });
  
    userInput.addEventListener('keypress', function (event) {
      if (event.key === 'Enter') {
        sendMessage();
      }
    });
  
    function sendMessage() {
      const userMessage = userInput.value.trim();
      if (userMessage !== '') {
        appendUserMessage(userMessage);
        fetchResponse(userMessage);
        userInput.value = '';
      }
    }
  
    function appendUserMessage(message) {
      const messageElement = document.createElement('div');
      messageElement.classList.add('user-message');
      messageElement.innerHTML = message.replace(/\n/g, '<br>'); // Replace newline characters with HTML line breaks
      chatBox.appendChild(messageElement);
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  
    function appendBotMessage(message) {
      const messageElement = document.createElement('div');
      messageElement.classList.add('bot-message');
      messageElement.innerHTML = message.replace(/\n/g, '<br>'); // Replace newline characters with HTML line breaks
      chatBox.appendChild(messageElement);
      chatBox.scrollTop = chatBox.scrollHeight;
    }

   
  
    function fetchResponse(userMessage) {
      fetch('/get-response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userMessage })
      })
      .then(response => response.json())
      .then(data => {
        const botResponse = data.text;
        appendBotMessage(botResponse);
      })
      .catch(error => {
        console.error('Error fetching response:', error);
      });
    }
  });
  