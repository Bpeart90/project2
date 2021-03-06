$(document).ready(() => {
  //The reference to the form below and input
  let addOpportunityForm = $(".addOpportunitybtn");
  let nameInput = $("#name-input");
  let phoneNumberInput = $("#phoneNumber-input");
  let emailInput = $("#email-input");
  let areaInput = $("#areaOfNeed-input");
  let volunteerId = 1;
  claimOpportunity = (id) => {
    console.log(id);
    //make a request to the server to assign the opportunity with the id that you passing to this user
    $.ajax({
      url: "/api/volunteer/claimOpportunity",
      type: "PUT",
      data: {
        id: id,
      },
    }).then(function (data) {
      console.log(data);
    });
    window.location.reload();
  };

  addOpportunityForm.on("click", (event) => {
    event.preventDefault();
    let opportunityData = {
      name: nameInput.val().trim(),
      number: phoneNumberInput.val().trim(),
      email: emailInput.val().trim(),
      areaOfNeed: areaInput.val().trim(),
    };
    if (
      !opportunityData.name ||
      !opportunityData.number ||
      !opportunityData.email ||
      !opportunityData.areaOfNeed
    ) {
      return;
    }
    addOpportunity(
      opportunityData.name,
      opportunityData.number,
      opportunityData.email,
      opportunityData.areaOfNeed,
      volunteerId
    );
  });

  function addOpportunity(name, number, email, areaOfNeed, volunteerId) {
    $.post("/opportunity/api", {
      name: name,
      number: number,
      email: email,
      areaOfNeed: areaOfNeed,
      volunteerId: volunteerId,
    });
    location.reload();
  }

  // function searchOpportunity() {
  //   // If role is volunteer create volunteer role
  //   $.get("/opportunity", {
  //     email: email,
  //     password: password,
  //   })
  //     .then((data) => {
  //       // window.location.replace("/members");
  //       // If there's an error, handle it by throwing up a bootstrap alert
  //     })
  //     .catch(handleLoginErr);
  // }
});
