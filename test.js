import assert from'assert';
import zxcvbn from './node_modules/zxcvbn/dist/zxcvbn.js';
import RegistrationForm from './static/main.js';


describe('Validate Email', () => {
    it('sanjeevanbiswas@gmail.com --> true', () => {
        assert.equal(RegistrationForm.validateEmail('sanjeevanbiswas@gmail.com'), true);
    });

    it('a@a.co --> true', () => {
        assert.equal(RegistrationForm.validateEmail('a@a.co'), true);
    });

    it('sanjeevanbiswas.gmail.com --> false', () => {
        assert.equal(RegistrationForm.validateEmail('a.a.co'), false);
    });

    it('"" --> false', () => {
        assert.equal(RegistrationForm.validateEmail(''), false);
    });

    it('sanjeevanbiswas.gmail@com --> false', () => {
        assert.equal(RegistrationForm.validateEmail('sanjeevanbiswas.gmail@com'), false);
    });

    it('sanjeevanbiswas --> false', () => {
        assert.equal(RegistrationForm.validateEmail('sanjeevanbiswas.gmail@com'), false);
    });

    it('" sanjeevanbiswas@gmail.com " --> true', () => {
        assert.equal(RegistrationForm.validateEmail('sanjeevanbiswas@gmail.com '), true);
    });
});


describe('Validate Empty Password: ""', () => {
    let {isValidPassword, score, acceptanceCriteria} = RegistrationForm.validatePassword('', zxcvbn);
    
    it('isValidPassword --> false', () => {
        assert.equal(isValidPassword, false);
    });

    it('score --> 0', () => {
        assert.equal(score, 0);
    });

    it('Password should be of 8+ characters. --> false', () => {
        assert.equal(acceptanceCriteria.length, false);
    });

    it('Password should contain atleast 1 lowercase character. --> false', () => {
        assert.equal(acceptanceCriteria.lowercase, false);
    });

    it('Password should contain atleast 1 uppercase character. --> false', () => {
        assert.equal(acceptanceCriteria.uppercase, false);
    });

    it('Password should contain atleast 1 number. --> false', () => {
        assert.equal(acceptanceCriteria.number, false);
    });

    it('Password should contain atleast 1 special character. --> false', () => {
        assert.equal(acceptanceCriteria.special, false);
    });

    it('Password strength should not be invalid or bad. --> false', () => {
        assert.equal(acceptanceCriteria.strength, false);
    });
});

describe('Validate all number Password: "12345678"', () => {
    let {isValidPassword, score, acceptanceCriteria} = RegistrationForm.validatePassword('12345678', zxcvbn);
    
    it('isValidPassword --> false', () => {
        assert.equal(isValidPassword, false);
    });

    it('score --> 0', () => {
        assert.equal(score, 0);
    });

    it('Password should be of 8+ characters. --> false', () => {
        assert.equal(acceptanceCriteria.length, true);
    });

    it('Password should contain atleast 1 lowercase character. --> false', () => {
        assert.equal(acceptanceCriteria.lowercase, false);
    });

    it('Password should contain atleast 1 uppercase character. --> false', () => {
        assert.equal(acceptanceCriteria.uppercase, false);
    });

    it('Password should contain atleast 1 number. --> true', () => {
        assert.equal(acceptanceCriteria.number, true);
    });

    it('Password should contain atleast 1 special character. --> false', () => {
        assert.equal(acceptanceCriteria.special, false);
    });

    it('Password strength should not be invalid or bad. --> false', () => {
        assert.equal(acceptanceCriteria.strength, false);
    });
});

describe('Validate Password with length less than 8: "A_eIoU0"', () => {
    let {isValidPassword, score, acceptanceCriteria} = RegistrationForm.validatePassword('A_eIoU0', zxcvbn);
    
    it('isValidPassword --> false', () => {
        assert.equal(isValidPassword, false);
    });

    it('score --> 0', () => {
        assert.equal(score, 0);
    });

    it('Password should be of 8+ characters. --> false', () => {
        assert.equal(acceptanceCriteria.length, false);
    });

    it('Password should contain atleast 1 lowercase character. --> true', () => {
        assert.equal(acceptanceCriteria.lowercase, true);
    });

    it('Password should contain atleast 1 uppercase character. --> true', () => {
        assert.equal(acceptanceCriteria.uppercase, true);
    });

    it('Password should contain atleast 1 number. --> true', () => {
        assert.equal(acceptanceCriteria.number, true);
    });

    it('Password should contain atleast 1 special character. --> true', () => {
        assert.equal(acceptanceCriteria.special, true);
    });

    it('Password strength should not be invalid or bad. --> true', () => {
        assert.equal(acceptanceCriteria.strength, true);
    });
});

describe('Validate Password with no lowercases: "NO_LOWER_CASES-1"', () => {
    let {isValidPassword, score, acceptanceCriteria} = RegistrationForm.validatePassword('NO_LOWER_CASES-1', zxcvbn);
    
    it('isValidPassword --> false', () => {
        assert.equal(isValidPassword, false);
    });

    it('score --> 0', () => {
        assert.equal(score, 0);
    });

    it('Password should be of 8+ characters. --> true', () => {
        assert.equal(acceptanceCriteria.length, true);
    });

    it('Password should contain atleast 1 lowercase character. --> false', () => {
        assert.equal(acceptanceCriteria.lowercase, false);
    });

    it('Password should contain atleast 1 uppercase character. --> true', () => {
        assert.equal(acceptanceCriteria.uppercase, true);
    });

    it('Password should contain atleast 1 number. --> true', () => {
        assert.equal(acceptanceCriteria.number, true);
    });

    it('Password should contain atleast 1 special character. --> true', () => {
        assert.equal(acceptanceCriteria.special, true);
    });

    it('Password strength should not be invalid or bad. --> true', () => {
        assert.equal(acceptanceCriteria.strength, true);
    });
});

describe('Validate Password with no uppercase: "no_uppercase-1"', () => {
    let {isValidPassword, score, acceptanceCriteria} = RegistrationForm.validatePassword('no_uppercase-1', zxcvbn);
    
    it('isValidPassword --> false', () => {
        assert.equal(isValidPassword, false);
    });

    it('score --> 0', () => {
        assert.equal(score, 0);
    });

    it('Password should be of 8+ characters. --> true', () => {
        assert.equal(acceptanceCriteria.length, true);
    });

    it('Password should contain atleast 1 lowercase character. --> true', () => {
        assert.equal(acceptanceCriteria.lowercase, true);
    });

    it('Password should contain atleast 1 uppercase character. --> false', () => {
        assert.equal(acceptanceCriteria.uppercase, false);
    });

    it('Password should contain atleast 1 number. --> true', () => {
        assert.equal(acceptanceCriteria.number, true);
    });

    it('Password should contain atleast 1 special character. --> true', () => {
        assert.equal(acceptanceCriteria.special, true);
    });

    it('Password strength should not be invalid or bad. --> true', () => {
        assert.equal(acceptanceCriteria.strength, true);
    });
});

describe('Validate Password with no number: "NO_Number-case"', () => {
    let {isValidPassword, score, acceptanceCriteria} = RegistrationForm.validatePassword('NO_Number-case', zxcvbn);
    
    it('isValidPassword --> false', () => {
        assert.equal(isValidPassword, false);
    });

    it('score --> 0', () => {
        assert.equal(score, 0);
    });

    it('Password should be of 8+ characters. --> true', () => {
        assert.equal(acceptanceCriteria.length, true);
    });

    it('Password should contain atleast 1 lowercase character. --> true', () => {
        assert.equal(acceptanceCriteria.lowercase, true);
    });

    it('Password should contain atleast 1 uppercase character. --> true', () => {
        assert.equal(acceptanceCriteria.uppercase, true);
    });

    it('Password should contain atleast 1 number. --> false', () => {
        assert.equal(acceptanceCriteria.number, false);
    });

    it('Password should contain atleast 1 special character. --> true', () => {
        assert.equal(acceptanceCriteria.special, true);
    });

    it('Password strength should not be invalid or bad. --> true', () => {
        assert.equal(acceptanceCriteria.strength, true);
    });
});

describe('Validate Password with no special char: "NoSpecialChar1"', () => {
    let {isValidPassword, score, acceptanceCriteria} = RegistrationForm.validatePassword('NoSpecialChar1', zxcvbn);
    
    it('isValidPassword --> false', () => {
        assert.equal(isValidPassword, false);
    });

    it('score --> 0', () => {
        assert.equal(score, 0);
    });

    it('Password should be of 8+ characters. --> true', () => {
        assert.equal(acceptanceCriteria.length, true);
    });

    it('Password should contain atleast 1 lowercase character. --> true', () => {
        assert.equal(acceptanceCriteria.lowercase, true);
    });

    it('Password should contain atleast 1 uppercase character. --> true', () => {
        assert.equal(acceptanceCriteria.uppercase, true);
    });

    it('Password should contain atleast 1 number. --> true', () => {
        assert.equal(acceptanceCriteria.number, true);
    });

    it('Password should contain atleast 1 special character. --> false', () => {
        assert.equal(acceptanceCriteria.special, false);
    });

    it('Password strength should not be invalid or bad. --> true', () => {
        assert.equal(acceptanceCriteria.strength, true);
    });
});

describe('Validate bad strength Password: "Password-1"', () => {
    let {isValidPassword, score, acceptanceCriteria} = RegistrationForm.validatePassword('Password-1', zxcvbn);
    
    it('isValidPassword --> true', () => {
        assert.equal(isValidPassword, true);
    });

    it('score --> 1', () => {
        assert.equal(score, 1);
    });

    it('Password should be of 8+ characters. --> true', () => {
        assert.equal(acceptanceCriteria.length, true);
    });

    it('Password should contain atleast 1 lowercase character. --> true', () => {
        assert.equal(acceptanceCriteria.lowercase, true);
    });

    it('Password should contain atleast 1 uppercase character. --> true', () => {
        assert.equal(acceptanceCriteria.uppercase, true);
    });

    it('Password should contain atleast 1 number. --> true', () => {
        assert.equal(acceptanceCriteria.number, true);
    });

    it('Password should contain atleast 1 special character. --> true', () => {
        assert.equal(acceptanceCriteria.special, true);
    });

    it('Password strength should not be invalid or bad. --> false', () => {
        assert.equal(acceptanceCriteria.strength, false);
    });
});

describe('Validate Weak strength Password: "Password-123"', () => {
    let {isValidPassword, score, acceptanceCriteria} = RegistrationForm.validatePassword('Password-123', zxcvbn);
    
    it('isValidPassword --> true', () => {
        assert.equal(isValidPassword, true);
    });

    it('score --> 2', () => {
        assert.equal(score, 2);
    });

    it('Password should be of 8+ characters. --> true', () => {
        assert.equal(acceptanceCriteria.length, true);
    });

    it('Password should contain atleast 1 lowercase character. --> true', () => {
        assert.equal(acceptanceCriteria.lowercase, true);
    });

    it('Password should contain atleast 1 uppercase character. --> true', () => {
        assert.equal(acceptanceCriteria.uppercase, true);
    });

    it('Password should contain atleast 1 number. --> true', () => {
        assert.equal(acceptanceCriteria.number, true);
    });

    it('Password should contain atleast 1 special character. --> true', () => {
        assert.equal(acceptanceCriteria.special, true);
    });

    it('Password strength should not be invalid or bad. --> true', () => {
        assert.equal(acceptanceCriteria.strength, true);
    });
});

describe('Validate Good strength Password: "Neverforget13/3/1997"', () => {
    let {isValidPassword, score, acceptanceCriteria} = RegistrationForm.validatePassword('Neverforget13/3/1997', zxcvbn);
    
    it('isValidPassword --> true', () => {
        assert.equal(isValidPassword, true);
    });

    it('score --> 3', () => {
        assert.equal(score, 3);
    });

    it('Password should be of 8+ characters. --> true', () => {
        assert.equal(acceptanceCriteria.length, true);
    });

    it('Password should contain atleast 1 lowercase character. --> true', () => {
        assert.equal(acceptanceCriteria.lowercase, true);
    });

    it('Password should contain atleast 1 uppercase character. --> true', () => {
        assert.equal(acceptanceCriteria.uppercase, true);
    });

    it('Password should contain atleast 1 number. --> true', () => {
        assert.equal(acceptanceCriteria.number, true);
    });

    it('Password should contain atleast 1 special character. --> true', () => {
        assert.equal(acceptanceCriteria.special, true);
    });

    it('Password strength should not be invalid or bad. --> true', () => {
        assert.equal(acceptanceCriteria.strength, true);
    });
});

describe('Validate Strong strength Password: "Mspt3st!F21#d"', () => {
    let {isValidPassword, score, acceptanceCriteria} = RegistrationForm.validatePassword('Mspt3st!F21#d', zxcvbn);
    
    it('isValidPassword --> true', () => {
        assert.equal(isValidPassword, true);
    });

    it('score --> 4', () => {
        assert.equal(score, 4);
    });

    it('Password should be of 8+ characters. --> true', () => {
        assert.equal(acceptanceCriteria.length, true);
    });

    it('Password should contain atleast 1 lowercase character. --> true', () => {
        assert.equal(acceptanceCriteria.lowercase, true);
    });

    it('Password should contain atleast 1 uppercase character. --> true', () => {
        assert.equal(acceptanceCriteria.uppercase, true);
    });

    it('Password should contain atleast 1 number. --> true', () => {
        assert.equal(acceptanceCriteria.number, true);
    });

    it('Password should contain atleast 1 special character. --> true', () => {
        assert.equal(acceptanceCriteria.special, true);
    });

    it('Password strength should not be invalid or bad. --> true', () => {
        assert.equal(acceptanceCriteria.strength, true);
    });
});