let _registrationForm = (function() {
    const strength = {
        0: 'Invalid',
        1: 'Bad',
        2: 'Weak',
        3: 'Good',
        4: 'Strong'
    };

    let _init = () => {
        this.emailElem = document.getElementById('email');
        this.passwordElem = document.getElementById('password');
        this.meterElem = document.getElementById('passwordStrengthMeter');
        this.passwordStrengthContainer = document.getElementById('passwordStrengthContainer');
        this.passwordStrengthText = document.getElementById('passwordStrengthText');
        this.passwordErrDetail = document.getElementById('passwordErrDetail');
        this.showDetailLink = document.getElementById('showDetailLink');
        this.hideDetailLink = document.getElementById('hideDetailLink');
        this.emailErrText = document.getElementById('emailErrText');

        this.emailElem.addEventListener('input', () => {
            let val = this.emailElem.value.trim();
            if (val !== '' && !_validateEmail(val)) {
                this.emailErrText.classList.remove('hidden');
            } else {
                this.emailErrText.classList.add('hidden');
            }
        });

        this.passwordElem.addEventListener('input', () => {
            let val = this.passwordElem.value;
            if (val !== '') {
                let {isValidPassword, score, acceptanceCriteria} = _validatePassword(val);
                _renderPasswordStrengthInfo(acceptanceCriteria);
                if (isValidPassword) {
                    this.meterElem.value = score;
                } else{
                    score = 0;
                    this.meterElem.value = 0;
                }
                let scoreValue = strength[score];
                this.passwordStrengthContainer.classList.remove('hidden');
                this.passwordStrengthText.innerHTML = scoreValue;
                this.passwordStrengthText.className = `err${scoreValue}`;
                if (this.hideDetailLink.classList.contains('hidden') && !this.passwordErrDetail.classList.contains('hidden')){
                    this.hideDetailLink.classList.remove('hidden');
                } else if (this.hideDetailLink.classList.contains('hidden')) {
                    this.showDetailLink.classList.remove('hidden');
                }
            } else {
                _resetPasswordErrElementState();
            }
        });
    }

    let _resetPasswordErrElementState = () => {
        this.meterElem.value = 0;
        this.passwordStrengthText.innerHTML = '';
        this.passwordStrengthContainer.classList.add('hidden');
        this.showDetailLink.classList.add('hidden');
        this.hideDetailLink.classList.add('hidden');
        this.passwordErrDetail.classList.add('hidden');
    }

    let _validatePassword = (value=this.passwordElem.value, _zxcvbn=zxcvbn) => {
        let charArr = value.split('');
        let acceptanceCriteria = {
            length: charArr.length >= 8,
            lowercase: false,
            uppercase: false,
            number: false,
            special: false,
            strength: false
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
                acceptanceCriteria.special = true; // special character .. Considering everything else on the ascii table as special char.
            }
        });

        let result = _zxcvbn(value);
        let score = result.score;
        acceptanceCriteria.strength = score >= 2;
        let isValidPassword = acceptanceCriteria.length && acceptanceCriteria.lowercase && acceptanceCriteria.uppercase && acceptanceCriteria.number && acceptanceCriteria.special;
        if (!isValidPassword) {
            score = 0;
        }
        
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
            let val = this.passwordElem.value;
            if (this.passwordElem.value !== '') {
                this.showDetailLink.classList.add('hidden');
                this.hideDetailLink.classList.remove('hidden');
            }
            this.passwordErrDetail.classList.remove('hidden');
        } else {
            if (this.passwordElem.value !== '') {
                this.showDetailLink.classList.remove('hidden');
                this.hideDetailLink.classList.add('hidden');
            }
            this.passwordErrDetail.classList.add('hidden');
        }
    }

    let _validateEmail = str => !!str.trim().match(/^[A-Z0-9._%+\-'!#$&*\/=?^`]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);

    let _submit = () => {
        let {isValidPassword, score, acceptanceCriteria} = _validatePassword();
        _renderPasswordStrengthInfo(acceptanceCriteria);
        if (!_validateEmail(this.emailElem.value.trim())) {
            this.emailErrText.classList.remove('hidden');
            return false;
        } else if (!isValidPassword || score < 2) {
            _togglePasswordErrorDetail(true);
            return false;
        }    
        window.location.href = 'https://www.project-a.com/en';
    }

    return {
        init: _init,
        submit: _submit,
        togglePasswordErrorDetail: _togglePasswordErrorDetail,
        validatePassword: _validatePassword,
        validateEmail: _validateEmail
    }
});

let RegistrationForm = new _registrationForm();

export default RegistrationForm;
