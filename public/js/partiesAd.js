$(document).ready(function(){
    $.get("http://localhost:3000/parties", function(data){
        var tableBody = $("#adminTable");
        tableBody.empty();

        data.forEach(function(party){
            var table =`
            <tr>
            <td class="mnemonic">${party.PARTY_MNEMONIC}</td>
            <td contenteditable="true" class="editable">${party.PARTYNAME}</td>
            <td><button class="update">Update</button></td>
            </tr>
            `;
            tableBody.append(table);
        })
    })

    $("#adminTable").on("click", ".update", function(){
        var row = $(this).closest("tr");
        var mnemonic = row.find(".mnemonic").text();
        var updatedName = row.find(".editable").text();

        $.ajax({
            url: "http://localhost:3000/parties/update",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                PARTY_MNEMONIC: mnemonic,
                PARTYNAME: updatedName
            }),
        });
    });
});