const preventSubmit = () => {
  const submit = document.querySelector(".submit");

  submit.addEventListener("click", (e) => {
    if (emailValidity.email.value === "") {
      emailValidity.emailError.className = "error";
      emailValidity.emailContainer.append(emailValidity.emailError);
      emailValidity.emailError.textContent =
        "Please enter a valid email address!";
      e.preventDefault();
    } else if (selectCountry.select.value === "") {
      selectCountry.select.className = "error";
      selectCountry.selectContainer.append(selectCountry.selectError);
      selectCountry.selectError.textContent = "Please select a country!";
      selectCountry.select.classList.toggle("invalid");
      e.preventDefault();
    } else if (zipCodeValidity.zipCode.value === "") {
      zipCodeValidity.zipCode.className = "error";
      zipCodeValidity.zipContainer.append(zipCodeValidity.zipError);
      zipCodeValidity.zipError.textContent = "Please enter a valid zip code!";
      zipCodeValidity.zipCode.classList.toggle("invalid");
      e.preventDefault();
    } else if (passwordValidity.password.value === "") {
      passwordValidity.password.className = "error";
      passwordValidity.passwordContainer.append(passwordValidity.pwError);
      passwordValidity.pwError.textContent = "Enter a valid password";
      passwordValidity.password.classList.toggle("invalid");
      e.preventDefault();
    } else if (confirmPassword.confirmPw.value === "") {
      confirmPassword.confirmPw.className = "error";
      confirmPassword.confirmPwContainer.append(confirmPassword.confirmError);
      confirmPassword.confirmError.textContent = "Enter a valid password";
      confirmPassword.confirmPw.classList.toggle("invalid");
      e.preventDefault();
    }
  });
};

export const emailValidity = (() => {
  const email = document.querySelector("#email");
  const emailContainer = document.querySelector(".container:nth-child(1)");
  const emailValidityStatus = email.validity;
  const emailError = document.createElement("div");
  emailError.className = "error";

  const hasWhiteSpace = (s) => /\s/.test(s);

  const endsValid = (s) =>
    /^\S+@\S+\.(com|net|org|edu|gov|int|mil|arpa|aero|biz|coop|info|museum|name|pro|travel|[a-z]{2})$/i.test(
      s
    );

  preventSubmit();

  email.addEventListener("focusout", () => {
    if (emailValidityStatus.typeMismatch) {
      emailContainer.appendChild(emailError);
      if (hasWhiteSpace(email.value)) {
        emailError.textContent =
          "The email address must not contain whitespace";
      }
      emailError.textContent =
        "The email address must contain a single '@' symbol.";
    } else if (!endsValid(email.value)) {
      emailError.textContent =
        "The email address must end in '.com', '.net', '.edu' etc.";
    } else {
      emailError.textContent = "";
    }
  });

  return { email, emailError, emailContainer };
})();

export const selectCountry = (() => {
  const select = document.querySelector("select");
  const selectContainer = document.querySelector(".container:nth-child(2)");
  const selectValidity = select.validity;
  const selectError = document.createElement("div");
  selectError.className = "error";

  select.addEventListener("focusout", () => {
    if (!selectValidity.valueMissing) {
      selectError.textContent = "";
      select.classList.remove("invalid");
    }
  });

  return { select, selectContainer, selectError };
})();

export const zipCodeValidity = (() => {
  const zipCode = document.querySelector("#zipCode");
  const zipContainer = document.querySelector(".container:nth-child(3)");
  const zipError = document.createElement("div");
  zipError.className = "error";

  const isValidZip = (s) =>
    /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i.test(
      s
    );

  zipCode.addEventListener("focusout", () => {
    if (!isValidZip(zipCode.value)) {
      zipError.textContent = "Invalid postal code";
      //   zipError.reportValidity();

      zipContainer.append(zipError);
    } else {
      zipError.textContent = "";
      zipCode.classList.remove("invalid");
    }
  });

  return { zipCode, zipContainer, zipError };
})();

export const passwordValidity = (() => {
  const password = document.querySelector("#password");
  const passwordContainer = document.querySelector(".container:nth-child(4)");
  const pwValidity = password.validity;
  const pwError = document.createElement("div");
  pwError.className = "error";

  passwordContainer.append(pwError);
  password.addEventListener("focusout", () => {
    if (pwValidity.tooShort) {
      pwError.textContent =
        "Password must length must be longer than 5 characters!";
    } else {
      pwError.textContent = "";
      password.classList.remove("invalid");
    }
  });

  return { password, passwordContainer, pwError };
})();

export const confirmPassword = (() => {
  const confirmPw = document.querySelector("#pwConfirm");
  const confirmPwContainer = document.querySelector(".container:nth-child(5)");
  const confirmPwValidity = confirmPw.validity;
  const confirmError = document.createElement("div");
  confirmError.className = "error";

  confirmPw.addEventListener("focusout", () => {
    confirmPwContainer.append(confirmError);
    if (confirmPw.value !== passwordValidity.password.value) {
      confirmError.textContent = "Passwords do not match!";
    } else if (confirmPwValidity.tooShort) {
      confirmError.textContent =
        "Password must length must be longer than 5 characters and match!";
    } else {
      confirmError.textContent = "";
      confirmPw.classList.remove("invalid");
    }
  });

  return { confirmPw, confirmPwContainer, confirmError };
})();
