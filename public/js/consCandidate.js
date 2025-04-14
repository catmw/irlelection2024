$(document).ready(function () {

    $.ajax({
        url: "http://localhost:3000/constituencies",
        method: "GET",
        success: function (data) {
            const $table = $("#conCanTable");

            data.forEach(constituency => {
                $table.append(`
                    <tr>
                        <td>${constituency.NAME}</td>
                        <td>${constituency.NOSEATS}</td>
                        <td>${constituency.NOCANDIDATES}</td>
                        <td>${constituency.ELECTORATE}</td>
                        <td>${constituency.QUOTA}</td>
                        <td>${constituency.PERCENTTURNOUT}%</td>
                    </tr>
                `);
            });
            drawConstituencyMap(data);
        },
        error: function (err) {
            console.error("Error fetching constituencies:", err);
        }
    });
});