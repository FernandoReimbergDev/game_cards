document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card");
    const playButton = document.getElementById("play-button");
    const shuffleSound = new Audio('shuffle.wav'); 
    let activeCard = null; 

    // Função para posicionar os cards em suas posições iniciais
    function positionCards() {
        cards.forEach((card, index) => {
            const row = Math.floor(index / 4);
            const col = index % 4;

            card.style.top = `${row * 110}px`; 
            card.style.left = `${col * 110}px`; 
            card.classList.add("spread"); // Garante que os cards estejam em suas posições iniciais
        });
    }

    // Função para mover os cards para o centro
    function uniteCardsToCenter() {
        cards.forEach(card => {
            card.style.top = '';
            card.style.left = '';

            card.classList.remove("spread");
            card.classList.add("center");
        });
    }

    // Função para embaralhar os cards
    function shuffleCards() {
        const shuffledCards = Array.from(cards);
        shuffledCards.sort(() => Math.random() - 0.5); // Embaralha o array de cards
        return shuffledCards;
    }

    // Função para espalhar os cards de volta às suas posições aleatórias
    function spreadCards(shuffledCards) {
        shuffledCards.forEach((card, index) => {
            card.classList.remove("center");
            card.classList.add("spread");

            const row = Math.floor(index / 4);
            const col = index % 4;

            card.style.top = `${row * 110}px`; 
            card.style.left = `${col * 110}px`; 
        });
    }

    // Função para virar todos os cards para baixo
    function flipAllCardsDown() {
        cards.forEach(card => {
            card.classList.add("flipped"); // Remove classes de flip e active
            card.classList.remove("active"); // Remove classes de flip e active
        });
    }

    playButton.addEventListener("click", () => {
        // Toca o áudio de embaralhamento
        shuffleSound.play();

        // Passo 1: Virar todos os cards para baixo
        flipAllCardsDown();

        // Passo 2: Mover os cards para o centro
        uniteCardsToCenter();

        // Passo 3: Embaralhar os cards enquanto estão no centro
        const shuffledCards = shuffleCards();

        // Passo 4: Após 1 segundo, espalhar os cards para suas novas posições
        setTimeout(() => {
            spreadCards(shuffledCards);

            // Parar o áudio após 2 segundos (ajuste conforme necessário)
            setTimeout(() => {
                shuffleSound.pause();
                shuffleSound.currentTime = 0; // Reinicia o áudio para a próxima vez
            }, 1000); // Tempo de duração para a separação dos cards
        }, 1000);
    });

    // Posiciona os cards inicialmente
    positionCards();

    // Adiciona evento de clique para centralizar e ampliar o card
    cards.forEach(card => {
        card.addEventListener("click", () => {
            // Se houver um card ativo anteriormente, vire-o de volta
            if (activeCard && activeCard !== card) {
                activeCard.classList.add("flipped");
                activeCard.classList.remove("active");
            }

            // Vira o card atual e o centraliza
            card.classList.remove("flipped");
            card.classList.add("active");

            // Atualiza a referência do card ativo
            activeCard = card;
        });
    });
});
