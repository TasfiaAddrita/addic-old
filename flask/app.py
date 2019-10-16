from flask import Flask, request

app = Flask(__name__)

@app.route('/')
def index():
    return "hello"

@app.route('/receivejson', methods=["POST"])
def get_json():
    nodeList = request.get_json()
    print(nodeList)
    return nodeList

if __name__ == '__main__':
    app.run(debug=True)