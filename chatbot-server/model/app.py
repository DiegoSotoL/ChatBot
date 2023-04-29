from flask import Flask, request, jsonify
app = Flask(__name__)
from LogisticRegression import predict


@app.route('/predict', methods=['GET'])
def predictService():
    args = request.args.to_dict()
    print("Args recibidos:", args)
    
    prompt = request.args.get('prompt', default='', type=str)
    predicted_intent , prediction_scores = predict(prompt)
    
    return jsonify({'predict': predicted_intent, 'acurracy': prediction_scores})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
