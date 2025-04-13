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
      partyMap[party.PARTY_MNEMONIC] = party.PARTYNAME;});
  
      candidates.sort((a,b)=>{
        const surname1 =a.SURNAME.toLowerCase();
        const surname2 =b.SURNAME.toLowerCase();
        if (surname1 < surname2) return -1;
        if(surname1 > surname2) return 1;
        return 0;
      })
    fillFilters();
    createTable(candidates);
  });
}
  
function fillFilters() {
  partyFilter.empty();
  constituencyFilter.empty();
  const partySet = new Set();
  const constituencySet = new Set();
  let others = false;
  
  candidates.forEach(candidate => {
    if (candidate.PARTY_MNEMONIC) {
      if (partyMap[candidate.PARTY_MNEMONIC]) {
        partySet.add(candidate.PARTY_MNEMONIC);
      } else {
        others = true;
      }}
    if (candidate.CONSTITUENCY) {
      constituencySet.add(candidate.CONSTITUENCY);
    }});
  partyFilter.append(`<option value="All">All</option>`);
  [...partySet].sort().forEach(mnemonic => {
    const name = partyMap[mnemonic];
    partyFilter.append(`<option value="${mnemonic}">${name}</option>`);
  });
  
  if (others) {
    partyFilter.append(`<option value="Others">Others</option>`);
  }
  constituencyFilter.append(`<option value="All">All</option>`);
  [...constituencySet].sort().forEach(cons => {
    constituencyFilter.append(`<option value="${cons}">${cons}</option>`);
  });
}
  
function createTable(data) {
  
  tableBody.empty();
  data.forEach((candidate, index) => {
    const partyName = candidate.PARTY_MNEMONIC || "Unknown";
    tableBody.append(`
      <tr>
        <td>${index + 1}</td>
        <td>${candidate.SURNAME+", "+candidate.FIRSTNAME}</td>
        <td>${partyName}</td>
        <td>${candidate.CONSTITUENCY}</td>
      </tr>
    `);
  });}
  
function applyFilters() {
  const selectedParty = partyFilter.val();
  const selectedCons = constituencyFilter.val();
  
  const filtered = candidates.filter(c => {
    const isKnownParty = !!partyMap[c.PARTY_MNEMONIC];
    const matchParty = selectedParty === "All" ||(selectedParty === "Others" && !isKnownParty) || (c.PARTY_MNEMONIC === selectedParty && isKnownParty);
    const matchCons = selectedCons === "All" || c.CONSTITUENCY === selectedCons;
    return matchParty && matchCons;
  });
  
  createTable(filtered);
}
  
partyFilter.on("change", applyFilters);
constituencyFilter.on("change", applyFilters);
  
fetchCandidates();
});