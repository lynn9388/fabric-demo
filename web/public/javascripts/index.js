"use strict";

window.onload = function () {
    const id_input = document.getElementById("id_input");
    const value_input = document.getElementById("value_input");
    const output = document.getElementById("output");

    const axiosInstance = axios.create({
        baseURL: "http://localhost:3000/api/"
    });

    document.getElementById("read_button").addEventListener("click", readAsset);
    document.getElementById("delete_button").addEventListener("click", deleteAsset);
    document.getElementById("create_button").addEventListener("click", createAsset);
    document.getElementById("update_button").addEventListener("click", updateAsset);

    function printOutput(operation, result) {
        output.value += operation
            + "\n========================\n"
            + result
            + "\n\n";
        output.scrollTop = output.scrollHeight;
    }

    function readAsset() {
        const url = "/assets/" + id_input.value;
        axiosInstance.get(url)
            .then(function (respond) {
                console.log(respond);
                printOutput(`[Read Asset] GET ${url}`, respond.data.message);
            });
    }

    function deleteAsset() {
        const url = "/assets/" + id_input.value;
        axiosInstance.delete(url)
            .then(function (respond) {
                console.log(respond);
                printOutput(`[Delete Asset] DELETE ${url}`, respond.data.message);
            });
    }

    function createAsset() {
        const url = "/assets/" + id_input.value;
        axiosInstance.post(url, { asset_value: value_input.value })
            .then(function (respond) {
                console.log(respond);
                printOutput(`[Create Asset] POST ${url}`, respond.data.message);
            });
    }

    function updateAsset() {
        const url = "/assets/" + id_input.value;
        axiosInstance.put(url, { asset_value: value_input.value })
            .then(function (respond) {
                console.log(respond);
                printOutput(`[Update Asset] PUT ${url}`, respond.data.message);
            });
    }
}
