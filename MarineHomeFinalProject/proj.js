document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("signupForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let valid = true;
    const requiredFields = ["firstName", "lastName", "email", "password", "supportReason"];

   requiredFields.forEach(id => {
  const input = document.getElementById(id);
  const errorSpan = input.nextElementSibling;

  if (errorSpan && errorSpan.classList.contains("error")) {
    if (!input.value.trim()) {
      errorSpan.textContent = "Required";
      errorSpan.style.display = "inline";
      valid = false;
    } else {
      errorSpan.textContent = "";
      errorSpan.style.display = "none";
    }
  }
});


    const sex = document.querySelector("input[name='sex']:checked");
    const sexError = document.querySelector("input[name='sex']").parentElement.nextElementSibling;
    if (!sex) {
      sexError.textContent = "Required";
      sexError.style.display = "inline";
      valid = false;
    } else {
      sexError.textContent = "";
      sexError.style.display = "none";
    }

    if (valid) {
      localStorage.setItem("firstName", document.getElementById("firstName").value);
      localStorage.setItem("lastName", document.getElementById("lastName").value);
      localStorage.setItem("email", document.getElementById("email").value);
      localStorage.setItem("sex", sex.value);
      localStorage.setItem("supportReason", document.getElementById("supportReason").value);

      window.location.href = "proj_profile_yourlastname.html";
    }
  });
});
