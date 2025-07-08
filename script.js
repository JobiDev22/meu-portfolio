// Animação de palavras no título principal
const palavrasAnimadas = ['CODE RISE', 'TECNOLOGIA', 'INOVAÇÃO'];
let palavraAtual = 0;
let intervaloAnimacao = null;

function trocarPalavra() {
    const elemento = document.querySelector('.palavra-animada');
    if (!elemento) return;

    // Fade out
    elemento.style.transition = 'opacity 0.5s, transform 0.5s';
    elemento.style.opacity = '0';
    elemento.style.transform = 'translateY(-20px)';

    setTimeout(() => {
        // Troca o texto quando estiver invisível
        palavraAtual = (palavraAtual + 1) % palavrasAnimadas.length;
        elemento.textContent = palavrasAnimadas[palavraAtual];
        // Fade in
        elemento.style.opacity = '1';
        elemento.style.transform = 'translateY(0)';
    }, 500);
}

function iniciarAnimacao() {
    const elemento = document.querySelector('.palavra-animada');
    if (!elemento) return;
    elemento.textContent = palavrasAnimadas[0];
    elemento.style.opacity = '1';
    elemento.style.transform = 'translateY(0)';
    clearInterval(intervaloAnimacao);
    intervaloAnimacao = setInterval(trocarPalavra, 4000);
}

// Função de teste para verificar se a animação funciona
function testarAnimacao() {
    console.log('Teste manual iniciado');
    
    const elemento = document.querySelector('.palavra-animada');
    if (!elemento) {
        console.log('Elemento não encontrado no teste');
        return;
    }
    
    console.log('Texto atual:', elemento.textContent);
    console.log('Próxima palavra:', palavrasAnimadas[palavraAtual]);
    
    // Muda imediatamente
    elemento.textContent = palavrasAnimadas[palavraAtual];
    palavraAtual = (palavraAtual + 1) % palavrasAnimadas.length;
    
    console.log('Texto após mudança:', elemento.textContent);
}

// Inicialização quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado, aguardando 2 segundos para iniciar animação...');
    
    // Aguarda 2 segundos e inicia a animação
    setTimeout(iniciarAnimacao, 2000);
    
    // Smooth scroll para os links de navegação
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Adiciona efeito de scroll suave para todas as seções
    const sections = document.querySelectorAll('.section');
    
    // Função para adicionar classe ativa ao link de navegação
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove classe ativa de todos os links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Adiciona classe ativa ao link correspondente
                const activeLink = document.querySelector(`[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    // Adiciona listener para scroll
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Chama a função uma vez para definir o estado inicial
    updateActiveNavLink();
});

// Adiciona efeitos de hover nos cards de projeto
document.addEventListener('DOMContentLoaded', function() {
    const projetoCards = document.querySelectorAll('.projeto-card');
    
    projetoCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Funções do Carrossel
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');

function showSlide(n) {
    // Remove a classe active de todos os slides e dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Adiciona a classe active ao slide e dot atual
    if (slides[n]) {
        slides[n].classList.add('active');
    }
    if (dots[n]) {
        dots[n].classList.add('active');
    }
}

function changeSlide(direction) {
    currentSlide += direction;
    
    // Loop para o início/fim
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }
    if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }
    
    showSlide(currentSlide);
}

function currentSlide(n) {
    currentSlide = n - 1;
    showSlide(currentSlide);
}

// Auto-play do carrossel
function autoPlay() {
    changeSlide(1);
}

// Inicia o auto-play quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    // Auto-play a cada 4 segundos
    setInterval(autoPlay, 4000);
});

// Função para enviar mensagem para WhatsApp
document.getElementById('contatoForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const mensagem = document.getElementById('mensagem').value;
    
    if (!nome || !mensagem) {
        alert('Por favor, preencha todos os campos!');
        return;
    }
    
    // Formatar a mensagem para WhatsApp
    const mensagemFormatada = `Olá! Sou ${nome} e gostaria de entrar em contato com você.

Mensagem:
${mensagem}`;
    
    // Número do WhatsApp (1194827-4569)
    const numeroWhatsApp = '11948274569';
    
    // Criar URL do WhatsApp
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagemFormatada)}`;
    
    // Abrir WhatsApp em nova aba
    window.open(urlWhatsApp, '_blank');
    
    // Limpar formulário
    document.getElementById('contatoForm').reset();
    
    // Mostrar mensagem de sucesso
    alert('Redirecionando para o WhatsApp...');
});
