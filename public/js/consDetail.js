$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const constituencyName = urlParams.get('constituency');
    $("#countyName").text("Results for " + constituencyName);
    $.ajax({
        url:`http://localhost:3000/constituency/${constituencyName}`,
        method: "GET" ,
        dataType: "json",
        success: function(counts){
             displayCounts(counts);
             

        },
        error: function(err){
            console.error("error gettting data: ",err);
        }
    });
    function displayCounts(counts){
        const $table = $("#detailsTable");
        const svg = document.getElementById("barChart");
        const chartHeight = 300;
        const barWidth = 30;
        const barSpacing = 20;
        const maxPerc = 100;
        counts.forEach((count, i) =>{
            $table.append(`
                <tr>
                    <td>${count.Party}</td>
                    <td>${count.Votes}</td>
                    <td>${count.Percentage}</td>
                </tr>`)

                const barHeight = (count.Percentage/maxPerc) * (chartHeight-50);
                const x = i * (barWidth + barSpacing)+50;
                const y = chartHeight - barHeight - 20;

                const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                rect.setAttribute("x", x);
                rect.setAttribute("y", y);
                rect.setAttribute("width", barWidth);
                rect.setAttribute("height", barHeight);
                rect.setAttribute("fill", "#999");
                svg.appendChild(rect);

                const percText = document.createElementNS("http://www.w3.org/2000/svg", "text");
                percText.setAttribute("x", x + barWidth / 2);
                percText.setAttribute("y", y - 5);
                percText.setAttribute("text-anchor", "middle");
                percText.setAttribute("font-size", "13");
                percText.setAttribute("font-weight", "bold");
                percText.textContent = count.Percentage;
                svg.appendChild(percText);

                const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
                label.setAttribute("x", x + barWidth / 2);
                label.setAttribute("y", chartHeight - 5);
                label.setAttribute("text-anchor", "middle");
                label.setAttribute("font-size", "14");
                label.textContent = count.Party;
                svg.appendChild(label);
        })
    }
});