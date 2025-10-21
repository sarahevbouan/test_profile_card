const required_field = document.querySelectorAll(".required-field");
const success_message = document.querySelector("#success-message");
const form = document.querySelector("form");
const close_popup = document.querySelector(".close-popup");

const email_regEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const check_input_validity = (e, condition, element, message) => {
  if (condition) {
    element.textContent = "";
    element.style.display = "none";
    e.target.setCustomValidity("");
    e.target.style.outline = "revert";
  } else {
    element.style.display = "block";
    element.textContent = message;
    e.target.setCustomValidity(message);
    e.target.style.outline = "1px solid red";
  }
};

form.addEventListener("input", (e) => {
  if (e.target.classList.contains("required-field")) {
    const aria_described_by = e.target.getAttribute("aria-describedBy");
    const error_element = document.getElementById(aria_described_by);
    const is_valid = e.target.validity.valid;
    e.target.value = e.target.value.trimStart();

    if (is_valid) {
      error_element.style.display = "none";
      error_element.textContent = "";
      e.target.style.outline = "revert";
    } else {
      error_element.style.display = "block";
      e.target.id === "message"
        ? (error_element.textContent =
            "Message must be at least 10 characters long")
        : (error_element.textContent = "Required");
      e.target.style.outline = "1px solid red";
    }
    if (e.target.id === "email") {
      const email = e.target.value;
      const is_email_valid = email_regEx.test(email);
      check_input_validity(
        e,
        is_email_valid,
        error_element,
        "Input a valid email e.g jane@jane.com"
      );
    }
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  required_field.forEach((field) => field.value.trimEnd());

  const popup = success_message.parentElement.parentElement;
  popup.style.display = "flex";
  success_message.textContent = "Your message has been sent";
  required_field.forEach((field) => (field.value = ""));
  document.body.style.overflow = "hidden";
});

close_popup.addEventListener("click", (e) => {
  const popup = e.target.parentElement.parentElement;
  popup.style.display = "none";
  document.body.style.overflow = "auto";
});
