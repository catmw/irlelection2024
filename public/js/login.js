$(document).ready(function () {
    $("#formbody").append(`
      <div class="mb-3">
          <label class="form-label" for="email">Email</label>
          <input class="form-control" type="email" id="email" name="email" placeholder="thomas.devine@atu.com" required>
      </div>
        <div class="mb-3">
          <label class="form-label" for="password">Password</label>
          <input class="form-control" type="password" id="password" name="password" required>
      </div>
      <button class="btn btn-primary" id="login">Login</button>`);
  
    $(document).on("click", "#login", function (e) {
      e.preventDefault();
  
      let email = $("#email").val();
      let password = $("#password").val();
  
      $.post("/login", { email, password }, function (response) {
        if (response.success) {
          sessionStorage.setItem("login", "true");
          nav();
        } else {
          alert("Login failed");
        }
      });
    });
  });