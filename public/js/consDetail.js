$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const constituencyName = urlParams.get('constituency');
    $("#countyName").text("Results for: " + Region);
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
        counts.forEach(count =>{
            $table.append(`
                <tr>
                    <td>${count.Party}</td>
                    <td>${count.Votes}</td>
                    <td>${count.Percentage}</td>
                </tr>`)
        })
    }
});