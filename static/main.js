let RegistrationForm = (function() {
    const strength = {
        0: 'Invalid',
        1: 'Bad',
        2: 'Weak',
        3: 'Good',
        4: 'Strong'
    };

    const emailElem = document.getElementById('email'),
          passwordElem = document.getElementById('password'),
          meterElem = document.getElementById('passwordStrengthMeter'),
          passwordStrengthContainer = document.getElementById('passwordStrengthContainer'),
          passwordStrengthText = document.getElementById('passwordStrengthText'),
          passwordErrDetail = document.getElementById('passwordErrDetail'),
          showDetailLink = document.getElementById('showDetailLink'),
          hideDetailLink = document.getElementById('hideDetailLink'),
          emailErrText = document.getElementById('emailErrText');

    emailElem.addEventListener('input', () => {
        let val = emailElem.value.trim();
        if (val !== '' && !_validateEmail(val)) {
            emailErrText.classList.remove('hidden');
        } else {
            emailErrText.classList.add('hidden');
        }
    });

    passwordElem.addEventListener('input', () => {
        let val = passwordElem.value;
        if (val !== '') {
            let {isValidPassword, score, acceptanceCriteria} = _validatePassword(val);
            if (isValidPassword) {
                meterElem.value = score;
            } else{
                score = 0;
                meterElem.value = 0;
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
            _resetPasswordErrElementState();
        }
    });

    let _resetPasswordErrElementState = () => {
        meterElem.value = 0;
        passwordStrengthText.innerHTML = '';
        passwordStrengthContainer.classList.add('hidden');
        showDetailLink.classList.add('hidden');
        hideDetailLink.classList.add('hidden');
        passwordErrDetail.classList.add('hidden');
    }

    let _validatePassword = (value=passwordElem.value) => {
        let charArr = value.split('');
        let acceptanceCriteria = {
            length: charArr.length >= 8,
            lowercase: false,
            uppercase: false,
            number: false,
            special: false,
            strength: meterElem.value >= 2
        };

        charArr.forEach(char => {
            let charCode = char.charCodeAt();
            if (charCode >= 48 && charCode <= 57) { // 0 to 9
                acceptanceCriteria.number = true;
            } else if (charCode >= 65 && charCode <= 90) { // Uppercase Characters
                acceptanceCriteria.uppercase = true;
            } else if (charCode >= 97 && charCode <= 122) { // Lowercase Characters
                acceptanceCriteria.lowercase = true;
            } else {
                acceptanceCriteria.special = true;
            }
        });

        let result = zxcvbn(value);
        let score = result.score;
        acceptanceCriteria.strength = score >= 2;
        let isValidPassword = acceptanceCriteria.length && acceptanceCriteria.lowercase && acceptanceCriteria.uppercase && acceptanceCriteria.number && acceptanceCriteria.special;
        if (!isValidPassword) {
            score = 0;
        }
        
        _renderPasswordStrengthInfo(acceptanceCriteria);
        return {
            isValidPassword,
            score,
            acceptanceCriteria
        };
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
            let val = passwordElem.value;
            if (passwordElem.value !== '') {
                showDetailLink.classList.add('hidden');
                hideDetailLink.classList.remove('hidden');
            }
            passwordErrDetail.classList.remove('hidden');
        } else {
            if (passwordElem.value !== '') {
                showDetailLink.classList.remove('hidden');
                hideDetailLink.classList.add('hidden');
            }
            passwordErrDetail.classList.add('hidden');
        }
    }

    let _validateEmail = str => str.match(/^[A-Z0-9._%+\-'!#$&*\/=?^`]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);

    let _submit = () => {
        let {isValidPassword, score, acceptanceCriteria} = _validatePassword();
        if (!_validateEmail(emailElem.value.trim())) {
            emailErrText.classList.remove('hidden');
            return false;
        } else if (!isValidPassword || score < 2) {
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