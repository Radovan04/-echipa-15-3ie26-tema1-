document.addEventListener('DOMContentLoaded', function() {
    initHamburgerMenu();
    initContactForm();
    initSmoothScroll();
});

function initHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnHamburger = hamburger.contains(event.target);

            if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

function initContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            clearErrors();

            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');

            let isValid = true;

            if (!name.value.trim()) {
                showError('name', 'Numele este obligatoriu');
                isValid = false;
            } else if (name.value.trim().length < 2) {
                showError('name', 'Numele trebuie să conțină cel puțin 2 caractere');
                isValid = false;
            }

            if (!email.value.trim()) {
                showError('email', 'Email-ul este obligatoriu');
                isValid = false;
            } else if (!isValidEmail(email.value.trim())) {
                showError('email', 'Te rugăm să introduci o adresă de email validă');
                isValid = false;
            }

            if (!subject.value.trim()) {
                showError('subject', 'Subiectul este obligatoriu');
                isValid = false;
            } else if (subject.value.trim().length < 5) {
                showError('subject', 'Subiectul trebuie să conțină cel puțin 5 caractere');
                isValid = false;
            }

            if (!message.value.trim()) {
                showError('message', 'Mesajul este obligatoriu');
                isValid = false;
            } else if (message.value.trim().length < 10) {
                showError('message', 'Mesajul trebuie să conțină cel puțin 10 caractere');
                isValid = false;
            }

            if (isValid) {
                submitForm(name.value, email.value, subject.value, message.value);
            }
        });

        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    this.classList.remove('error');
                    const errorElement = document.getElementById(this.id + 'Error');
                    if (errorElement) {
                        errorElement.textContent = '';
                    }
                }
            });

            input.addEventListener('blur', function() {
                validateField(this);
            });
        });
    }
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + 'Error');

    if (field && errorElement) {
        field.classList.add('error');
        errorElement.textContent = message;
        field.focus();
    }
}

function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => {
        error.textContent = '';
    });

    const errorFields = document.querySelectorAll('.error');
    errorFields.forEach(field => {
        field.classList.remove('error');
    });

    const successMessage = document.getElementById('successMessage');
    const errorMessageBox = document.getElementById('errorMessage');

    if (successMessage) {
        successMessage.style.display = 'none';
    }
    if (errorMessageBox) {
        errorMessageBox.style.display = 'none';
    }
}

function validateField(field) {
    const fieldId = field.id;
    const value = field.value.trim();

    if (fieldId === 'name') {
        if (!value) {
            showError(fieldId, 'Numele este obligatoriu');
            return false;
        } else if (value.length < 2) {
            showError(fieldId, 'Numele trebuie să conțină cel puțin 2 caractere');
            return false;
        }
    } else if (fieldId === 'email') {
        if (!value) {
            showError(fieldId, 'Email-ul este obligatoriu');
            return false;
        } else if (!isValidEmail(value)) {
            showError(fieldId, 'Te rugăm să introduci o adresă de email validă');
            return false;
        }
    } else if (fieldId === 'subject') {
        if (!value) {
            showError(fieldId, 'Subiectul este obligatoriu');
            return false;
        } else if (value.length < 5) {
            showError(fieldId, 'Subiectul trebuie să conțină cel puțin 5 caractere');
            return false;
        }
    } else if (fieldId === 'message') {
        if (!value) {
            showError(fieldId, 'Mesajul este obligatoriu');
            return false;
        } else if (value.length < 10) {
            showError(fieldId, 'Mesajul trebuie să conțină cel puțin 10 caractere');
            return false;
        }
    }

    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function submitForm(name, email, subject, message) {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    const errorMessageBox = document.getElementById('errorMessage');

    const formData = {
        name: name,
        email: email,
        subject: subject,
        message: message,
        timestamp: new Date().toISOString()
    };

    console.log('Form submitted:', formData);

    try {
        if (successMessage) {
            successMessage.style.display = 'flex';
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        if (contactForm) {
            contactForm.reset();
        }

        setTimeout(() => {
            if (successMessage) {
                successMessage.style.display = 'none';
            }
        }, 8000);

    } catch (error) {
        console.error('Error submitting form:', error);
        if (errorMessageBox) {
            errorMessageBox.style.display = 'flex';
            errorMessageBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        setTimeout(() => {
            if (errorMessageBox) {
                errorMessageBox.style.display = 'none';
            }
        }, 8000);
    }
}

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href === '#' || href === '') {
                return;
            }

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');

    if (header) {
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    }
});
