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
        candids
            .filter(candid => candid.NOVOTES > 0)
            .forEach((candid) => {
                $table.append(`
                    <tr>
                        <td>${candid.PARTY_MNEMONIC}</td>
                        <td>${candid.SURNAME}, ${candid.FIRSTNAME}</td>
                        <td>${candid.NOVOTES}</td>
                    </tr>`);
            });
    }
});