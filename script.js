const chatBody = document.getElementById('chatBody');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const chatWindow = document.getElementById('chatWindow');
const chatButton = document.getElementById('chatButton');
const closeChat = document.getElementById('closeChat');

let isOpen = false;

// Abrir e fechar o chat
chatButton.addEventListener('click', () => {
    isOpen = true;
    chatWindow.style.display = 'flex';
});

closeChat.addEventListener('click', () => {
    chatWindow.style.display = 'none';
    isOpen = false;
});

// Adicionar mensagem
function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender}`;
    msgDiv.innerHTML = text;
    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

// Respostas do bot
function getBotResponse(text) {
    const t = text.toLowerCase();

    // Saudação
    if (t.includes("oi") || t.includes("olá") || t.includes("bom dia") || t.includes("boa tarde")) 
        return "Olá! Bem-vindo à <strong>Z&Z Peixaria</strong> 🐟<br>Como posso te ajudar hoje?";

    // Preços gerais (mais fácil de acionar)
    if (t.includes("preço") || t.includes("quanto") || t.includes("valor") || t.includes("preços")) 
        return "Nossos preços atuais:<br><br>" +
               "• Filé de Tilápia → R$ 52,00 / kg<br>" +
               "• Filé de Tilápia Empanado → R$ 52,00 / 1kg<br>" +
               "• Lambari → R$ 30,00 / 1kg<br>" +
               "• Traíra Inteira → R$ 35,00 / kg<br>" +
               "• Bolinho de Bacalhau → R$ 28,00 / 300g";

    // Respostas simples para cada produto (sem exigir digitação perfeita)
    if (t.includes("tilápia") || t.includes("tilapia")) 
        return "O **Filé de Tilápia** é nosso principal produto!<br>" +
               "Preço: <strong>R$ 52,00 por kg</strong><br>" +
               "Fresco, sem espinha e limpo.";

    if (t.includes("empanado")) 
        return "O **Filé de Tilápia Empanado** é prático e saboroso!<br>" +
               "Preço: <strong>R$ 52,00 por 1kg</strong><br>" +
               "Pronto pra fritar ou assar.";

    if (t.includes("lambari")) 
        return "O **Lambari** é ótimo para petisco!<br>" +
               "Preço: <strong>R$ 30,00 por 1kg</strong><br>" +
               "Ideal para acompanhar uma cervejinha.";

    if (t.includes("traíra") || t.includes("traira") || t.includes("traeira")) 
        return "A **Traíra Inteira** está disponível!<br>" +
               "Preço: <strong>R$ 35,00 por kg</strong><br>" +
               "Boa para churrasco ou fritura.";

    if (t.includes("bolinho") || t.includes("bacalhau")) 
        return "O **Bolinho de Bacalhau** é um dos mais pedidos!<br>" +
               "Preço: <strong>R$ 28,00 por 300g</strong><br>" +
               "Crocante por fora e macio por dentro! 😋";

    // Endereço
    if (t.includes("endereço") || t.includes("fica") || t.includes("localização") || t.includes("onde")) 
        return "📍 Rua Guilherme Wietzke, 659<br>Bairro Copetti - Sobradinho/RS";

    // Contato
    if (t.includes("contato") || t.includes("telefone") || t.includes("whatsapp") || t.includes("número")) 
        return '📞 <strong>(51) 99804-1915</strong><br><br>' +
               '<a href="https://wa.me/555198041915" target="_blank">💬 Falar diretamente no WhatsApp</a>';

    // Horário
    if (t.includes("horário") || t.includes("atende") || t.includes("funciona")) 
        return "🕒 Horário de atendimento:<br>" +
               "Segunda a Sábado: 08h às 18h<br>" +
               "Domingo: 08h às 12h";

    // Resposta padrão
    return "Desculpe, não entendi bem 😊<br><br>" +
           "Você pode perguntar sobre:<br>" +
           "• Preços<br>" +
           "• Filé de Tilápia<br>" +
           "• Filé Empanado<br>" +
           "• Lambari<br>" +
           "• Traíra<br>" +
           "• Bolinho de Bacalhau<br>" +
           "• Endereço<br>" +
           "• Contato / WhatsApp";
}

// Enviar mensagem
function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    addMessage(text, 'user');
    userInput.value = '';

    setTimeout(() => {
        const response = getBotResponse(text);
        addMessage(response, 'bot');
    }, 600);
}

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

// Mensagem de boas-vindas ao abrir
chatButton.addEventListener('click', () => {
    if (chatBody.children.length === 0) {
        setTimeout(() => {
            addMessage("Olá! Sou o assistente virtual da <strong>Z&Z Peixaria</strong> 🐟<br>Em que posso te ajudar hoje?", 'bot');
        }, 500);
    }
}, { once: true });