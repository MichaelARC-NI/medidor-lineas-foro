const textInput = document.getElementById('text-input');
const simulatedParagraph = document.getElementById('simulated-paragraph');
const lineCountDisplay = document.getElementById('line-count');
const statusTextDisplay = document.getElementById('status-text');

function updateMetrics() {
    const text = textInput.value;
    simulatedParagraph.textContent = text || "";
    
    setTimeout(() => {
        const height = simulatedParagraph.offsetHeight;
        const lineHeight = parseFloat(window.getComputedStyle(simulatedParagraph).lineHeight);
        
        // Si el área de entrada está vacía, el contador marca 0 de forma limpia
        const lines = text.trim() === "" ? 0 : Math.round(height / lineHeight);
        
        lineCountDisplay.textContent = lines;
        
        if (lines === 0) {
            statusTextDisplay.textContent = "Vacío";
            statusTextDisplay.className = "value";
        } else if (lines >= 5 && lines <= 8) {
            statusTextDisplay.textContent = "VÁLIDO";
            statusTextDisplay.className = "value status-valid";
        } else {
            statusTextDisplay.textContent = "INVÁLIDO";
            statusTextDisplay.className = "value status-invalid";
        }
    }, 50);
}

// Vinculación de eventos interactivos
textInput.addEventListener('input', updateMetrics);
window.addEventListener('resize', updateMetrics);

// Inicializar el script en estado limpio
updateMetrics();

// Programación para el botón de copiar texto
const copyBtn = document.getElementById('copy-btn');

copyBtn.addEventListener('click', () => {
    if (textInput.value.trim() !== "") {
        navigator.clipboard.writeText(textInput.value)
            .then(() => {
                const originalText = copyBtn.innerHTML;
                copyBtn.innerHTML = "¡Copiado con éxito! ✓";
                copyBtn.style.backgroundColor = "#4ade80"; // Cambia a verde sutil
                copyBtn.style.color = "#0f172a";
                
                setTimeout(() => {
                    copyBtn.innerHTML = originalText;
                    copyBtn.style.backgroundColor = ""; // Restaura el color original
                    copyBtn.style.color = "";
                }, 2000);
            })
            .catch(err => {
                console.error("Error al copiar el texto: ", err);
            });
    }
});
