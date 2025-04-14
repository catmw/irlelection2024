$(document).ready(function () {
    const mapContainer = d3.select("#map");

    $.ajax({
        url: "http://localhost:3000/constituencies",
        method: "GET",
        success: function (data) {
            const $table = $("#conTable");

            data.forEach(constituency => {
                $table.append(`
                    <tr>
                        <td><a href="consDetail.html?constituency=${constituency.CONSTITUENCY}">${constituency.NAME}</a></td>
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

    function drawConstituencyMap(constituencies) {
        mapContainer.selectAll("*").remove();

        const svg = mapContainer.append("svg")
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("viewBox", "500 0 200 200");

        constituencies.forEach(constituency => {
            svg.append("path")
                .attr("d", constituency.PATH)
                .attr("fill", "#808080")
                .attr("stroke", "#222422")
                .attr("stroke-width", 0.2)
                .attr("data-name", constituency.NAME)
                .on("click", function () {
                    //window.location.href = `/candidates/constituency/${constituency.CONSTITUENCY}`;
                    window.location.href = `consDetail.html?constituency=${constituency.CONSTITUENCY}`;
                });
        });
    }
});