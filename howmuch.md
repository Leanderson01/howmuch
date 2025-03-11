# Projeto: Quanto Eu Te Amo?

## Objetivo
Criar um site interativo e romântico que leve sua namorada por uma jornada visual e sonora, demonstrando a imensidão do seu amor. A experiência inicia com uma mensagem central “Quanto Eu Te Amo?” e, a cada clique, revela um novo cenário – passando da Terra, pelo sistema solar, via láctea, universo – até chegar em uma cena final inspirada em Cristo, com o versículo que reforça o amor do homem pela mulher, à semelhança do amor de Jesus pela igreja.

## Tecnologias Utilizadas
- **Next.js:** Estrutura e renderização do site.
- **Tailwind CSS:** Estilização e responsividade.
- **Framer Motion:** Animações e transições suaves (zoom out, parallax, fade).
- **Howler.js (ou similar):** Efeitos sonoros.
- **Mantine (opcional):** Componentes adicionais e estilizados.

## Estrutura Geral do Projeto
- **Componentes:** Cada “cena” será um componente React separado.
- **Estado Global:** Utilize hooks (como `useState`) para gerenciar a cena ativa.
- **Assets:** Imagens, sons e ícones serão armazenados na pasta `public/assets`.

## Passo a Passo

### 1. Cena Inicial – Abertura
- **Conteúdo:**
  - Texto centralizado: “Quanto Eu Te Amo?”
  - Uma seta para baixo animada (pulsante ou com efeito de deslize).
- **Transições e Animações:**
  - **Fade-in:** O texto e a seta devem aparecer com um efeito de fade.
  - **Zoom/Parallax:** Pequeno efeito de profundidade para dar dinamismo à tela.
- **Efeitos Sonoros:**
  - Toque um som suave na abertura da página.
  - Som de clique ao pressionar a seta.

### 2. Cena Terra – Escala Planetária
- **Conteúdo:**
  - Background com imagem ou animação da Terra (pode ser uma foto estilizada ou um desenho vetorizado).
  - Texto que contextualiza a ideia de “tamanho” e a base do amor.
- **Transições e Animações:**
  - **Zoom Out:** A transição da cena inicial para a Terra deve ser feita com um zoom out suave.
  - **Fade:** Transição gradual entre as cenas.
- **Efeitos Sonoros:**
  - Sons ambientes que remetam à natureza ou ao planeta.

### 3. Cena Sistema Solar
- **Conteúdo:**
  - Exibição dos planetas, possivelmente com uma animação que os revela progressivamente.
  - Mensagem que amplifica a ideia de que o amor é tão vasto quanto o sistema solar.
- **Transições e Animações:**
  - **Parallax:** Movimentos de fundo e elementos que se deslocam a diferentes velocidades.
  - **Zoom Out e Fade:** Continuar a sensação de expansão.

### 4. Cena Via Láctea
- **Conteúdo:**
  - Um fundo estrelado, simulando a Via Láctea com partículas animadas.
  - Mensagem reforçando a imensidão e a beleza do universo.
- **Transições e Animações:**
  - **Fade In/Out:** As estrelas podem surgir gradualmente.
  - **Parallax:** Elementos de fundo se movendo lentamente para criar profundidade.

### 5. Cena Universo
- **Conteúdo:**
  - Exibição de um universo em expansão, com nebulosas e estrelas distantes.
  - Mensagem que enfatiza a vastidão infinita do amor.
- **Transições e Animações:**
  - **Zoom Out Contínuo:** Transição para uma visão ultra ampla.
  - **Efeito de Dissolução:** Elementos que se misturam e se revelam.

### 6. Cena Final – Estética de Cristo
- **Conteúdo:**
  - Fundo com elementos visuais que remetam à fé (ex.: cruz estilizada, luz suave, halos).
  - Exibição impactante do versículo “o homem tem que amar a mulher tal qual Jesus amou a igreja.”

## Easter Eggs
### Ideias e Implementação
- **Mensagem Oculta ao Hover:** Revelar um texto secreto ao passar o mouse.
- **Clique Secreto:** Mensagem especial ao clicar várias vezes em um elemento.
- **Ativação por Sequência de Teclas:** Ao digitar “amor”, revelar uma animação especial.

## Dicas Finais
- **Consistência Visual:** Mantenha a harmonia dos efeitos de transição e temas visuais.
- **Responsividade:** Teste o site em diferentes dispositivos.
- **Acessibilidade:** Adicione controles de som e garanta legibilidade.
