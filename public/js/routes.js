$(document).ready(function(){
    const $getSummaryButton = $("#getSummary");
    const $getPartiesButton = $("#getParties");
    const $getCandidatesButton = $("#getCandidates");
    const $getCandidatesMNButton = $("#getCandidatesMN");
    const $getCandidatesConsButton = $("#getCandidatesCons");
    const $outputTextArea = $("TextArea");

    $getSummaryButton.on("click", function () {
        $.ajax({
            url: "http://localhost:3000/summary",
            method: "GET",
            dataType: "json",
            success: function (data) {
                $outputTextArea.text(JSON.stringify(data, null, 2));
            },
            error: function (xhr, status, error) {
                console.error("Error fetching summary:", error);
                $outputTextArea.text("Failed to fetch data.");
            }
        });
    });

    $getPartiesButton.on("click", function () {
        $.ajax({
            url: "http://localhost:3000/parties",
            method: "GET",
            dataType: "json",
            success: function (data) {
                $outputTextArea.text(JSON.stringify(data, null, 2));
            },
            error: function (xhr, status, error) {
                console.error("Error fetching parties:", error);
                $outputTextArea.text("Failed to fetch data.");
            }
        });
    });

    $getCandidatesButton.on("click", function () {
        $.ajax({
            url: "http://localhost:3000/candidates",
            method: "GET",
            dataType: "json",
            success: function (data) {
                $outputTextArea.text(JSON.stringify(data, null, 2));
            },
            error: function (xhr, status, error) {
                console.error("Error fetching candidates:", error);
                $outputTextArea.text("Failed to fetch data.");
            }
        });
    });

    $getCandidatesMNButton.on("click", function () {
        $.ajax({
            url: "http://localhost:3000/candidates/party/FF",
            method: "GET",
            dataType: "json",
            success: function (data) {
                $outputTextArea.text(JSON.stringify(data, null, 2));
            },
            error: function (xhr, status, error) {
                console.error("Error fetching candidates:", error);
                $outputTextArea.text("Failed to fetch data.");
            }
        });
    });

    $getCandidatesConsButton.on("click", function () {
        $.ajax({
            url: "http://localhost:3000/candidates/constituency/C09",
            method: "GET",
            dataType: "json",
            success: function (data) {
                $outputTextArea.text(JSON.stringify(data, null, 2));
            },
            error: function (xhr, status, error) {
                console.error("Error fetching candidates:", error);
                $outputTextArea.text("Failed to fetch data.");
            }
        });
    });

})