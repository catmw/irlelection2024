function nav(){

    let loggedIn = sessionStorage.getItem("login") === "true";

    var navOutPut = `
    <nav style="display: flex; align-items: center; gap: 20px; padding: 10px; background-color: black; color: white;">
    <img src="images/logo2.png" width="17%" style="border-radius: 35%;">
    <div id="navbar">
    <a href="routes.html" class="me-3" style="color: white; text-decoration: none;">Routes</a>
    <a href="summary.html" class="me-3" style="color: white; text-decoration: none;">Summary</a>
    <a href="parties.html" class="me-3" style="color: white; text-decoration: none;">Parties</a>
    <a href="candidates.html" class="me-3" style="color: white; text-decoration: none;">Candidates</a>
    <a href="conParty.html" class="me-3" style="color: white; text-decoration: none;">Constituency>Party</a>
    <a href="consCandidate.html" class="me-3" style="color: white; text-decoration: none;">Constituency>Candidate</a>`

    if(loggedIn){navOutPut +=`
        <a href="partiesAd.html" class="me-3" style="color: white; text-decoration: none;">Admin</a>
        <a href="#" id="logout" class="me-3" style="color: white; text-decoration: none;">Logout</a>`
    } else{navOutPut +=`
        <a href="login.html" class="me-3" style="color: white; text-decoration: none;">Login</a>`

    }
    navOutPut +=`
    </div>
    </nav>`;
    document.getElementById("nav").innerHTML = navOutPut;

    if(loggedIn){
        document.getElementById("logout").addEventListener("click", function(e){
            sessionStorage.removeItem("login");
            location.reload();
        });
    }

}

window.onload = nav;