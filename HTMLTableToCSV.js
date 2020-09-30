function downloadLinkGenerator(csv, filename) {
    var csvFile;
    var downloadLink;
    // A new Blob instance of CSV type is created
    csvFile = new Blob([csv], {
        type: "text/csv"
    });
    // <a></a>
    downloadLink = document.createElement("a");
    // <a download={filename}></a>
    downloadLink.download = filename;
    // <a download={filename} href={csvFile}></a>
    downloadLink.href = window.URL.createObjectURL(csvFile);
    // <a download={filename} href={csvFile} style="display: none"></a>
    downloadLink.style.display = "none";
    // <a> element is added to the DOM
    document.body.appendChild(downloadLink);
    // Launch on click
    downloadLink.click();
}

function exportTableToCSV(html, filename) {
    var csv = [];
    var rows = document.querySelectorAll("table#table-1 tr");
    for (var i = 0; i < rows.length; i++) {
        var row = [];
        var cols = rows[i].querySelectorAll("td, th");
        for (var j = 0; j < cols.length; j++) {
            // If column content has a comma, it will be storaged into an aux variable
            if (cols[j].innerHTML.includes(',')){
                aux = '"' + cols[j].innerText + '"';
                row.push(aux);
                aux = '';
            } else {
                row.push(cols[j].innerText);
            }
        }
        csv.push(row.join(","));
    }
    // Call the function to download the CSV file
    downloadLinkGenerator(csv.join("\n"), filename);
}

// There you can change the id to reach your button
document.getElementById("download-button").addEventListener("click", function () {
    var html = document.querySelector("table").outerHTML;
    // There you can change the file name
    exportTableToCSV(html, `csv-${Date.now()}.csv`);
});