from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/rsvp', methods=['POST'])
def handle_rsvp():
    if request.method == 'POST':
        data = request.form
        name = data.get('name')
        email = data.get('email')
        attending = data.get('attending')
        guests = int(data.get('guests'))

        # Process and store the RSVP data as needed
        # Example:
        # save_rsvp(name, email, attending, guests)

        # Respond with a success message (optional)
        response = {'message': 'RSVP received successfully!'}
        return jsonify(response), 200

    # Handle other HTTP methods
    return 'Method Not Allowed', 405

if __name__ == '__main__':
    app.run(debug=True)
