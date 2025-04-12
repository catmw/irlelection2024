$(document).ready(function () {
    $.ajax({
        url: "http://localhost:3000/summary/withcolours",
        method: "GET",
        success: function (data) {
            console.log("Received data:", data);
            const $boxes = $("#summaryBoxes");
            const $table = $("#summaryTable");

            data.sort((a, b) => b.SEATS_WON_2024 - a.SEATS_WON_2024);

            data.forEach(party => {
                const bgColour = party.PARTYCOLOUR;

                $boxes.append(`
                    <div class="col-md-1 text-center text-white m-1 p-2 rounded" style="background-color: ${bgColour};">
                        <h6>${party.PARTY_MNEMONIC}</h6>
                        <p>${party.SEATS_WON_2024}</p>
                        <h6>Seats</h6>
                    </div>
                `);

                $table.append(`
                    <tr>
                        <td>${party.PARTY_MNEMONIC}</td>
                        <td>${Number(party.FIRST_PREFERENCE_VOTES_2024).toLocaleString()}</td>
                        <td>${party.SEATS_WON_2024}</td>
                    </tr>
                `);
            });
        },
        error: function (err) {
            console.error("Error fetching summary:", err);
        }
    });
});