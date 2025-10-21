const required_field = document.querySelectorAll(".required-field");
const success_message = document.querySelector("#success-message");
const form = document.querySelector("form");
const close_popup = document.querySelector(".close-popup");

const email_regEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/;
const fullname_regEx = /^[a-zA-Z'-]+ [a-zA-Z'-]+(?: [a-zA-Z'-]+)*$/;

const check_input_validity = (e, condition, errorElement, message) => {
  if (condition) {
    errorElement.textContent = "";
    errorElement.style.display = "none";
    e.target.setCustomValidity("");
    e.target.style.outline = "revert";
  } else {
    errorElement.style.display = "block";
    errorElement.textContent = message;
    e.target.setCustomValidity(message);
    e.target.style.outline = "1px solid red";
  }
};

// Input validation
form.addEventListener("input", (e) => {
  if (e.target.classList.contains("required-field")) {
    const aria_described_by = e.target.getAttribute("aria-describedby");
    console.log(aria_described_by);
    const error_element = document.getElementById(aria_described_by);
    const is_valid = e.target.validity.valid;
    e.target.value = e.target.value.trimStart();

    if (is_valid) {
      error_element.style.display = "none";
      error_element.textContent = "";
      e.target.style.outline = "revert";
    } else {
      error_element.style.display = "block";
      e.target.style.outline = "1px solid red";
      error_element.textContent = `Please enter at least ${e.target.minLength} characters`;
    }
    if (e.target.id === "full-name") {
      const name = e.target.value;
      const is_name_valid = fullname_regEx.test(name);
      check_input_validity(
        e,
        is_name_valid,
        error_element,
        "Please enter your full name"
      );
    }
    if (e.target.id === "email") {
      const email = e.target.value;
      const is_email_valid = email_regEx.test(email);
      check_input_validity(
        e,
        is_email_valid,
        error_element,
        "Enter a valid email e.g jane@jane.com"
      );
    }
  }
});

// Form submission after validation
form.addEventListener("submit", (e) => {
  e.preventDefault();

  required_field.forEach((field) => {
    field.value.trimEnd();
    // Double checking that all fields are valid
    if (!field.validity.valid) {
      return;
    }
  });

  const popup = success_message.parentElement.parentElement;
  popup.style.display = "flex";
  success_message.textContent =
    "Your message has been sent. We will get back to you shortly.";
  required_field.forEach((field) => (field.value = ""));
  document.body.style.overflow = "hidden";
});

close_popup.addEventListener("click", (e) => {
  const popup = e.target.parentElement.parentElement;
  popup.style.display = "none";
  document.body.style.overflow = "auto";
});
