document.addEventListener('DOMContentLoaded', () => {
    const lengthInput = document.getElementById('length');
    const lengthValue = document.getElementById('length-value');
    const generateButton = document.getElementById('generate-button');
    const passwordDisplay = document.getElementById('password-display');
    const passwordStrength = document.getElementById('password-strength');
  
    lengthInput.addEventListener('input', () => {
      lengthValue.textContent = lengthInput.value;
    });
  
    generateButton.addEventListener('click', async () => {
      const length = lengthInput.value;
      const uppercase = document.getElementById('uppercase').checked;
      const lowercase = document.getElementById('lowercase').checked;
      const numbers = document.getElementById('numbers').checked;
      const symbols = document.getElementById('symbols').checked;
  
      try {
        const response = await fetch(`/generate-password?length=${length}&uppercase=${uppercase}&lowercase=${lowercase}&numbers=${numbers}&symbols=${symbols}`);
        const data = await response.json();
  
        if (response.ok) {
          passwordDisplay.textContent = data.password;
          displayPasswordStrength(data.password);
        } else {
          alert(data.error);
        }
      } catch (error) {
        alert('Erro ao gerar senha. Tente novamente.');
      }
    });
  
    function displayPasswordStrength(password) {
      const strengthLevels = ['Muito fraca', 'Fraca', 'Boa', 'Forte', 'Muito forte'];
      const score = Math.min(4, Math.floor(password.length / 4));
      passwordStrength.textContent = `Força: ${strengthLevels[score]}`;
    }
  });
  