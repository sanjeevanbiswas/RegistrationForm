let RegistrationForm = (function() {
    const strength = {
        0: 'Invalid',
        1: 'Bad',
        2: 'Weak',
        3: 'Good',
        4: 'Strong'
    };

    const email = document.getElementById('email'),
          password = document.getElementById('password'),
          meter = document.getElementById('passwordStrengthMeter'),
          passwordStrengthContainer = document.getElementById('passwordStrengthContainer'),
          passwordStrengthText = document.getElementById('passwordStrengthText'),
          passwordErrDetail = document.getElementById('passwordErrDetail'),
          showDetailLink = document.getElementById('showDetailLink'),
          hideDetailLink = document.getElementById('hideDetailLink'),
          emailErrText = document.getElementById('emailErrText');

    password.addEventListener('input', () => {
        let val = password.value;
        if (val !== '') {
            meter.value = 0;
            let score = 0;
            if (_validatePassword(val)) {
                let result = zxcvbn(val);
                meter.value = result.score;
                score = result.score;
            }
            let scoreValue = strength[score];
            passwordStrengthContainer.classList.remove('hidden');
            passwordStrengthText.innerHTML = scoreValue;
            passwordStrengthText.className = `err${scoreValue}`;
            if (hideDetailLink.classList.contains('hidden') && !passwordErrDetail.classList.contains('hidden')){
                hideDetailLink.classList.remove('hidden');
            } else if (hideDetailLink.classList.contains('hidden')) {
                showDetailLink.classList.remove('hidden');
            }
        } else {
            _resetElementState();
        }
    });

    email.addEventListener('input', () => {
        emailErrText.classList.add('hidden');
    });

    let _resetElementState = () => {
        meter.value = 0;
        passwordStrengthText.innerHTML = '';
        passwordStrengthContainer.classList.add('hidden');
        showDetailLink.classList.add('hidden');
        hideDetailLink.classList.add('hidden');
        passwordErrDetail.classList.add('hidden');
    }

    let _validatePassword = (value=password.value) => {
        let charArr = value.split('');
        let result = {
            length: charArr.length >= 8,
            lowercase: false,
            uppercase: false,
            number: false,
            special: false,
        };

        charArr.forEach(char => {
            let charCode = char.charCodeAt();
            if (charCode >= 48 && charCode <= 57) { // 0 to 9
                result.number = true;
            } else if (charCode >= 65 && charCode <= 90) { // Uppercase Characters
                result.uppercase = true;
            } else if (charCode >= 97 && charCode <= 122) { // Lowercase Characters
                result.lowercase = true;
            } else {
                result.special = true;
            }
        });

        _renderPasswordStrengthInfo(result);
        return result.length && result.lowercase && result.uppercase && result.number && result.special;
    };

    let _renderPasswordStrengthInfo = result => {
        Object.keys(result).forEach(id => {
            _renderCheckmark(`err_${id}`, result[id]);
        });
    }

    let _renderCheckmark = (id, checked) => {
        let elemCheck = document.querySelector(`#${id} .checkmark`),
            elemClose = document.querySelector(`#${id} .close`);
        if (checked) {
            elemCheck.classList.remove('hidden');
            elemClose.classList.add('hidden');
        } else {
            elemCheck.classList.add('hidden');
            elemClose.classList.remove('hidden');
        }
    }

    let _togglePasswordErrorDetail = showDetail => {
        if (showDetail) {
            let val = password.value;
            if (password.value !== '') {
                showDetailLink.classList.add('hidden');
                hideDetailLink.classList.remove('hidden');
            }
            passwordErrDetail.classList.remove('hidden');
        } else {
            if (password.value !== '') {
                showDetailLink.classList.remove('hidden');
                hideDetailLink.classList.add('hidden');
            }
            passwordErrDetail.classList.add('hidden');
        }
    }

    let _validateEmail = str => str.match(/^[A-Z0-9._%+\-'!#$&*\/=?^`]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);

    let _submit = () => {
        if (!_validateEmail(email.value.trim())) {
            emailErrText.classList.remove('hidden');
            return false;
        } else if (!_validatePassword() || meter.value < 2) {
            _togglePasswordErrorDetail(true);
            return false;
        }    
        window.location.href = 'https://www.project-a.com/en';
    }

    return {
        submit: _submit,
        togglePasswordErrorDetail: _togglePasswordErrorDetail
    }
}());