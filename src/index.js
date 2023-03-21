import './style.css';

const ValidateForm = (() => {
  const emailInput = document.getElementById('email');
  const countryInput = document.getElementById('country');
  const zipInput = document.getElementById('zip');
  const passInput = document.getElementById('password');
  const passConInput = document.getElementById('password-confirm');
  const submitButton = document.querySelector('.submit-form');

  const validateEmail = () => {
    const emailReg = /^.+\@.+\.com$/;
    const isValid = emailReg.test(emailInput.value);
    const span = emailInput.nextElementSibling;
    emailInput.setCustomValidity('');
    if (isValid) {
      emailInput.setCustomValidity('');
      span.classList.remove('active');
      span.textContent = '';
    } else {
      emailInput.setCustomValidity('Expect name@domain.com');
      span.classList.add('active');
      span.textContent = 'Expect name@domain.com';
    }
  };

  const validateCountry = () => {
    const countries = [
      'romania',
      'uk',
      'france',
      'albania',
      'morocco',
      'japan',
    ];
    const span = countryInput.nextElementSibling;

    countryInput.setCustomValidity('');

    if (countries.includes(countryInput.value.toLowerCase())) {
      countryInput.setCustomValidity('');
      span.textContent = '';
      span.classList.remove('active');
    } else {
      countryInput.setCustomValidity(
        'Services only available in Romania, UK, France, Albania, Morocco, Japan'
      );
      span.textContent =
        'Services only available in Romania, UK, France, Albania, Morocco, Japan';
      span.classList.add('active');
    }
  };

  const validateZip = () => {
    const zipReg = /^\d{6}$/;

    const span = zipInput.nextElementSibling;

    const isValid = zipReg.test(zipInput.value);
    zipInput.setCustomValidity('');

    if (isValid) {
      zipInput.setCustomValidity('');
      span.textContent = '';
      span.classList.remove('active');
    } else {
      zipInput.setCustomValidity('Zip must be exactly 6 numbers');
      span.textContent = 'Zip must be exactly 6 numbers';
      span.classList.add('active');
    }
  };

  const validatePass = (password) => {
    const passReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    const span = password.nextElementSibling;
    password.setCustomValidity('');

    const matchesReg = passReg.test(password.value);
    if (!matchesReg) {
      password.setCustomValidity('Password format not respected');
      span.innerHTML =
        'Password must:<br>- be minimum 8 characters long<br>- include a lowercase letter<br>-include a uppercase letter<br>-include a number<br>-include a special character';
      span.classList.add('active');
    } else if (passInput.value !== passConInput.value) {
      password.setCustomValidity('Passwords different');
      span.innerHTML = 'Password and Confirm password must be the same';
      span.classList.add('active');
    } else {
      password.setCustomValidity('');
      span.innerHTML = '';
      span.textContent = '';
      span.classList.remove('active');
    }
  };

  emailInput.addEventListener('input', validateEmail);
  countryInput.addEventListener('input', validateCountry);
  zipInput.addEventListener('input', validateZip);
  passInput.addEventListener('input', () => {
    validatePass(passInput);
  });
  passConInput.addEventListener('input', () => {
    validatePass(passConInput);
    validatePass(passInput);
  });

  submitButton.addEventListener('click', () => {
    event.preventDefault();
    if (
      emailInput.checkValidity() &&
      countryInput.checkValidity() &&
      zipInput.checkValidity() &&
      passInput.checkValidity() ** passConInput.checkValidity()
    ) {
      alert('congrats!!!');
    }
  });
})();
