$(document).ready(function () {
    const tableBody = $("#summaryTable");
    const partyFilter = $("#partyFilter");
    const constituencyFilter = $("#constituencyFilter");
  
    let candidates = [];
    let partyMap = {};
  
    function fetchCandidates() {
      $.get("http://localhost:3000/candidates", function (data) {
        candidates = data;
        fetchParties();
      });
    }
  
    function fetchParties() {
      $.get("http://localhost:3000/parties", function (data) {
        data.forEach(party => {
          partyMap[party.PARTY_MNEMONIC] = party.PARTYNAME;
        });
  
        fillFilters();
        createTable(candidates);
      });
    }
  
    function fillFilters() {
      const partySet = new Set();
      const constituencySet = new Set();
  
      candidates.forEach(candidate => {
        if (candidate.PARTY_MNEMONIC) {
          partySet.add(candidate.PARTY_MNEMONIC);
        }
        if (candidate.CONSTITUENCY) {
          constituencySet.add(candidate.CONSTITUENCY);
        }
      });

      partyFilter.append(`<option value="All">All</option>`);
      [...partySet].sort().forEach(mnemonic => {
        const name = partyMap[mnemonic] || mnemonic;
        partyFilter.append(`<option value="${mnemonic}">${name}</option>`);
      });
  
      constituencyFilter.append(`<option value="All">All</option>`);
      [...constituencySet].sort().forEach(cons => {
        constituencyFilter.append(`<option value="${cons}">${cons}</option>`);
      });
    }
  
    function createTable(data) {
      tableBody.empty();
      data.forEach((candidate, index) => {
        tableBody.append(`
          <tr>
            <td>${index + 1}</td>
            <td>${candidate.FIRSTNAME}</td>
            <td>${candidate.PARTY_MNEMONIC || ""}</td>
            <td>${candidate.CONSTITUENCY}</td>
          </tr>
        `);
      });
    }
  
    function applyFilters() {
      const selectedParty = partyFilter.val();
      const selectedCons = constituencyFilter.val();
  
      const filtered = candidates.filter(c => {
        const matchParty = selectedParty === "All" || c.PARTY_MNEMONIC === selectedParty;
        const matchCons = selectedCons === "All" || c.CONSTITUENCY === selectedCons;
        return matchParty && matchCons;
      });
  
      createTable(filtered);
    }
  
    partyFilter.on("change", applyFilters);
    constituencyFilter.on("change", applyFilters);
  
    fetchCandidates();
  });