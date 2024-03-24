from flask import Flask, request, jsonify, render_template
from sg import ChatBot

app = Flask(__name__)

# Initialize the chatbot
api_key = 'AIzaSyB-QjkHYyMXsXKQI8SfQTQioFHFSH2YjAQ' 
chatbot = ChatBot(api_key=api_key)
chatbot.start_conversation()

@app.route('/')
def index():
    return render_template('index.html')



@app.route('/get-response', methods=['POST'])
def get_response():
    user_message = request.json.get('message')
    if user_message:
        bot_response = chatbot.send_prompt(user_message)
        return jsonify({'text': bot_response})
    else:
        return jsonify({'text': 'Error: No message received'})

if __name__ == '__main__':
    app.run(debug=True)
