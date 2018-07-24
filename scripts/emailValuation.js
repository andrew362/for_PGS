(function () {


    const form = document.getElementById('contact-form');
    const btn = document.getElementById('send');
    const progressbar = document.getElementById('progressbar');
    let firstPress = true;
    let nameIsValidated = false;
    let emailIsValidated = false;
    let nameInput = document.querySelector('input[name="name"]');
    let emailInput = document.querySelector('input[name="email"]');
    
    form.setAttribute('novalidate', true);

    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function imie() {
        if (nameInput.checkValidity()) {
            nameIsValidated = true;
            nameInput.className = "valid"
        } else {
            nameInput.className = "invalid";
        }
    }

    function email() {
        if (validateEmail(emailInput.value)) {
            emailIsValidated = true;
            console.log(emailIsValidated);
            emailInput.className = "valid"
        } else {
            emailInput.className = "invalid";
        }
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        formIsValidated = true;
        nameInput.addEventListener('input', imie);
        emailInput.addEventListener('input', email);
        if (firstPress) {
            imie();
            email();
        }
        firstPress = false;
        console.log(nameIsValidated, emailIsValidated);
        if (nameIsValidated && emailIsValidated) {
            progressbar.classList.remove('hide');
            this.submit();
            btn.classList.toggle("disabled");
        } else {
            return false;
        }

    });







})();