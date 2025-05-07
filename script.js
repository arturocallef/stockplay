document.addEventListener('DOMContentLoaded', () => {
    // Variables para almacenar datos del formulario
    let userData = {};

    // Elementos del DOM
    const step1Content = document.getElementById('step1-content');
    const step2Content = document.getElementById('step2-content');
    const step3Content = document.getElementById('step3-content');
    const confirmationMessage = document.getElementById('confirmation-message');

    const step1Indicator = document.getElementById('step1');
    const step2Indicator = document.getElementById('step2');
    const step3Indicator = document.getElementById('step3');

    const nextStep1Button = document.getElementById('next-step1');
    const prevStep2Button = document.getElementById('prev-step2');
    const nextStep2Button = document.getElementById('next-step2');
    const prevStep3Button = document.getElementById('prev-step3');

    // Inputs and Error elements for Step 1
    const nombreInput = document.getElementById('nombre');
    const apellidoInput = document.getElementById('apellido');
    const edadInput = document.getElementById('edad');
    const emailInput = document.getElementById('email');

    const nombreError = document.getElementById('nombre-error');
    const apellidoError = document.getElementById('apellido-error');
    const edadError = document.getElementById('edad-error');
    const emailError = document.getElementById('email-error');

    // Terms elements for Step 2
    const acceptTermsCheckbox = document.getElementById('accept-terms');
    const termsError = document.getElementById('terms-error');

    // Summary elements for Step 3
    const summaryName = document.getElementById('summary-name');
    const summaryEmail = document.getElementById('summary-email');
    const customField = document.getElementById('custom-field');
    const paypalForm = document.getElementById('paypal-form');

    function updateProgress(currentStep, nextStep, isForward) {
        currentStep.classList.remove('active');
        currentStep.removeAttribute('aria-current');

        if (isForward) {
            currentStep.classList.add('completed');
        } else {
            currentStep.classList.remove('completed');
        }

        if (nextStep) {
            nextStep.classList.add('active');
            nextStep.setAttribute('aria-current', 'step');
            if (!isForward) {
                nextStep.classList.remove('completed');
            }
        }
    }

    // Validación del paso 1
    nextStep1Button.addEventListener('click', () => {
        const nombre = nombreInput.value.trim();
        const apellido = apellidoInput.value.trim();
        const edad = edadInput.value; // String value
        const email = emailInput.value.trim();

        // Resetear errores
        nombreError.textContent = '';
        apellidoError.textContent = '';
        edadError.textContent = '';
        emailError.textContent = '';

        let isValid = true;

        if (!nombre) {
            nombreError.textContent = 'Por favor, ingresa tu nombre';
            isValid = false;
        }
        if (!apellido) {
            apellidoError.textContent = 'Por favor, ingresa tu apellido';
            isValid = false;
        }
        if (!edad || parseInt(edad, 10) < 18) {
            edadError.textContent = 'Debes ser mayor de 18 años para participar';
            isValid = false;
        }
        if (!email || !validateEmail(email)) {
            emailError.textContent = 'Por favor, ingresa un correo electrónico válido';
            isValid = false;
        }

        if (isValid) {
            userData = { nombre, apellido, edad, email };
            step1Content.classList.add('hidden');
            step2Content.classList.remove('hidden');
            updateProgress(step1Indicator, step2Indicator, true);
            acceptTermsCheckbox.focus(); // Focus management
        }
    });

    // Volver al paso 1
    prevStep2Button.addEventListener('click', () => {
        step2Content.classList.add('hidden');
        step1Content.classList.remove('hidden');
        updateProgress(step2Indicator, step1Indicator, false);
        nombreInput.focus(); // Focus management
    });

    // Validación del paso 2
    nextStep2Button.addEventListener('click', () => {
        termsError.textContent = '';
        if (!acceptTermsCheckbox.checked) {
            termsError.textContent = 'Debes aceptar los términos y condiciones para continuar';
            return;
        }

        summaryName.textContent = `${userData.nombre} ${userData.apellido}`;
        summaryEmail.textContent = userData.email;
        customField.value = JSON.stringify(userData);

        step2Content.classList.add('hidden');
        step3Content.classList.remove('hidden');
        updateProgress(step2Indicator, step3Indicator, true);
        // Focus on the PayPal button or the "Atrás" button if more appropriate
        prevStep3Button.focus();
    });

    // Volver al paso 2
    prevStep3Button.addEventListener('click', () => {
        step3Content.classList.add('hidden');
        step2Content.classList.remove('hidden');
        updateProgress(step3Indicator, step2Indicator, false);
        acceptTermsCheckbox.focus(); // Focus management
    });

    // Función para validar email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    // Note: The actual submission to PayPal and handling the 'gracias.html'
    // would typically involve server-side logic after PayPal processes the payment
    // and redirects back. The 'confirmationMessage' div is for a client-side mock-up
    // or if you handle the thank you page entirely on the client after redirect.
});