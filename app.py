from flask import Flask, render_template, request, jsonify
from parser import parse_string

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/parse", methods=["POST"])
def parse():

    data = request.get_json()

    string = data.get("string", "")

    tree = parse_string(string)

    if tree:
        return jsonify({
            "valid": True,
            "message": "String is valid!",
            "tree": tree.to_dict()
        })

    return jsonify({
        "valid": False,
        "message": "String cannot be generated using the given CFG.",
        "tree": None
    })


if __name__ == "__main__":
    app.run(debug=True)