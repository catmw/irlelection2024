$(document).ready(function () {
    $.ajax({
        url: "http://localhost:3000/parties/ordered",
        method: "GET",
        success: function (data) {
            const $table = $("#partyTable");

            data.forEach(party => {
                $table.append(`
                    <tr>
                        <td>${party.PARTY_MNEMONIC}</td>
                        <td>${party.PARTYNAME}</td>
                    </tr>
                `);
            });
        },
        error: function (err) {
            console.error("Error fetching parties:", err);
        }
    });
});