(function () {
    const form = document.getElementById('contact-form');
    const btn = document.getElementById('send');
    const progressbar = document.getElementById('progressbar');
    let firstPress = true;
    let nameIsValidated = false;
    let emailIsValidated = false;

    let nameInput = document.querySelector('input[name="name"]');
    let emailInput = document.querySelector('input[name="email"]');
    
    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function nameCheck() {
        if (nameInput.checkValidity()) {
            nameInput.className = "valid"
            nameIsValidated = true;
        } else {
            nameInput.className = "invalid";
        }
    }

    function emailCheck() {
        if (validateEmail(emailInput.value)) {    
            emailInput.className = "valid"
            emailIsValidated = true;
        } else {
            emailInput.className = "invalid";
        }
    }

    function sendForm(field1, field2) {
        const dataToSend = new FormData();
        const url = form.getAttribute('action');
        const method = form.getAttribute('method');

        [field1, field2].forEach(el => dataToSend.append(el.name, el.value));
        fetch(url, {
                method: method,
                body: dataToSend
            })
            .then(res => res.json())
            .then(res => {
                if (res.status === 'ok') {
                    M.toast({
                        html: 'Wiadomość została wysłana!',
                        classes: 'teal '
                    });
                }
                if (res.status === 'error') {
                    M.toast({
                        html: 'Wiadomość nie została wysłana!',
                        classes: 'red '
                    });
                }
            })
            .catch(function (err) {
                console.error('Coś poszło nie tak', err);
                M.toast({
                    html: 'Wiadomość nie została wysłana!',
                    classes: 'red '
                });
            })
            .finally(function () {
                setTimeout(function () {
                    progressbar.classList.add('hide');
                    btn.classList.remove("disabled");
                }, 1000)

            });
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        nameIsValidated = false;
        emailIsValidated = false;
        nameCheck();
        emailCheck();
        if (firstPress) { 
            nameInput.addEventListener('change', nameCheck);
            emailInput.addEventListener('change', emailCheck);
        }
        firstPress = false;
        if (nameIsValidated && emailIsValidated) {
            progressbar.classList.remove('hide');
            btn.classList.add("disabled");
            sendForm(nameInput, emailInput);
        } else {
            return false;
        }
    });
})();