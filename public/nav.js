function nav(){
    var navOutPut = `
    <nav style="display: flex; align-items: center; gap: 20px; padding: 10px; background-color: black; color: white;">
    <img src="images/logo2.png" width="17%" style="border-radius: 35%;">
    <div id="navbar">
    <a href="routes.html" style="color: white; text-decoration: none;">Routes</a>
    <a href="summary.html" style="color: white; text-decoration: none;">Summary</a>
    <a href="parties.html" style="color: white; text-decoration: none;">Parties</a>
    <a href="candidates.html" style="color: white; text-decoration: none;">Candidates</a>
    </nav>
    `;
    document.getElementById("nav").innerHTML = navOutPut;
}

window.onload = nav;