$(document).ready(() => {
  // Getting references to our form and input
  // console.log('something')
  let signUpForm = $(".signupbtn");
  let emailInput = $("#email-input");
  let passwordInput = $("#password-input");

  // close the modal by just clicking outside of the modal
  var modal = document.getElementById("id01");

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
  var radioValue = "volunteer";
  // Role selection
  $("input[type='radio']").click(function () {
    radioValue = $("input[name='role']:checked").val();
    console.log(radioValue);
  });

  signUpForm.on("click", (event) => {
    console.log(radioValue);
    event.preventDefault();
    let userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
    };

    if (!userData.email || !userData.password) {
      return;
    }
    console.log(userData);
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password) {
    // If role is volunteer create volunteer role
    if (radioValue === "volunteer") {
      $.post("/api/volunteer", {
        email: email,
        password: password,
      })
        .then((data) => {
          window.location.replace("/login");
          // If there's an error, handle it by throwing up a bootstrap alert
        })
        .catch(handleLoginErr);
      return;
    }
    // Else if role is coordinator create a coordinator role
    $.post("/api/coordinator", {
      email: email,
      password: password,
    })
      .then((data) => {
        window.location.replace("/login");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }
});
