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
                    <div class="col-md-1 text-center m-1 p-0">
                        <svg width="100%" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <rect width="100" height="100" rx="10" fill="${bgColour}" />
                            <text x="50" y="35" text-anchor="middle" fill="white" font-size="12" font-weight="bold">${party.PARTY_MNEMONIC}</text>
                            <text x="50" y="55" text-anchor="middle" fill="white" font-size="14">${party.SEATS_WON_2024}</text>
                            <text x="50" y="75" text-anchor="middle" fill="white" font-size="12">Seats</text>
                        </svg>
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