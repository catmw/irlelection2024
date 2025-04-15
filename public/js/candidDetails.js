$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const constituencyName = urlParams.get('constituency');
    $("#countyName").text("Results for " + constituencyName);

    $.ajax({
        url: `http://localhost:3000/candidates/counts/${constituencyName}`,
        method: "GET",
        dataType: "json",
        success: function (candids) {
            displayCandids(candids);
        },
        error: function (err) {
            console.error("Error getting data: ", err);
        }
    });
    function displayCandids(candids) {
        const $table = $("#detailsTable");
        const svg = document.getElementById("barChart");
        const chartWidth = 1200;
        const barHeight = 30;
        const barSpacing = 20;

        candids
            .filter(candid => candid.NOVOTES > 0)
            .forEach((candid, i) => {
                $table.append(`
                    <tr>
                        <td>${candid.PARTY_MNEMONIC}</td>
                        <td>${candid.SURNAME}, ${candid.FIRSTNAME}</td>
                        <td>${candid.NOVOTES}</td>
                    </tr>`);

                const barWidth = (candid.NOVOTES/20);
                const y = i * (barHeight + barSpacing) + 20;

                const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                rect.setAttribute("x", 50);
                rect.setAttribute("y", y);
                rect.setAttribute("width", barWidth);
                rect.setAttribute("height", barHeight);
                rect.setAttribute("fill", "#999");
                svg.appendChild(rect);

                const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
                label.setAttribute("y", y );
                label.setAttribute("x", 40);
                label.textContent = candid.SURNAME + ", " + candid.FIRSTNAME;
                label.setAttribute("font-size", "13");
                svg.appendChild(label);

                const totalText = document.createElementNS("http://www.w3.org/2000/svg", "text");
                totalText.setAttribute("x", barWidth);
                totalText.setAttribute("y", y);
                totalText.textContent = candid.NOVOTES;
                label.setAttribute("font-size", "13");
                svg.appendChild(totalText);
            });
    
    }
});