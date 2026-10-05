async function generateTree() {

    const input = document.getElementById("inputString").value;

    const result = document.getElementById("result");

    const treeContainer = document.getElementById("treeContainer");

    const jsonContainer = document.getElementById("jsonContainer");

    if (input.trim() === "") {

        result.className = "invalid";

        result.innerHTML = "Please enter a string.";

        treeContainer.innerHTML = "";

        jsonContainer.innerHTML = "";

        return;
    }

    const response = await fetch("/parse", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            string: input
        })

    });

    const data = await response.json();

    if (data.valid) {

        result.className = "valid";

        result.innerHTML = "✅ Valid String";

        treeContainer.innerHTML =
            "<h2>Parse Tree</h2>" +
            createTree(data.tree);

        jsonContainer.innerHTML =
            "<h2>Nested JSON</h2>" +
            "<pre>" +
            JSON.stringify(data.tree, null, 2) +
            "</pre>";

    } else {

        result.className = "invalid";

        result.innerHTML =
            "❌ Invalid String<br>" +
            data.message;

        treeContainer.innerHTML = "";

        jsonContainer.innerHTML = "";
    }
}


function createTree(node) {

    let html = `
        <div class="tree-node">
            <div class="node">
                ${node.symbol}
            </div>
    `;

    if (node.children && node.children.length > 0) {

        html += `<div class="children">`;

        node.children.forEach(child => {

            html += createTree(child);

        });

        html += `</div>`;
    }

    html += `</div>`;

    return html;
}


function clearResult() {

    document.getElementById("inputString").value = "";

    document.getElementById("result").innerHTML = "";

    document.getElementById("treeContainer").innerHTML = "";

    document.getElementById("jsonContainer").innerHTML = "";
}