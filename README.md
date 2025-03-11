# Quanto Eu Te Amo?

Um site interativo e romântico que leva sua namorada por uma jornada visual e sonora, demonstrando a imensidão do seu amor através de uma experiência imersiva que passa por diferentes escalas do universo.

## Visão Geral

Este projeto é uma experiência interativa que começa com a pergunta "Quanto Eu Te Amo?" e leva o usuário por uma jornada através de diferentes escalas do universo:

1. **Terra**: O início da jornada, mostrando que o amor é maior que nosso planeta
2. **Sistema Solar**: Expandindo para mostrar que o amor é maior que todo o sistema solar
3. **Via Láctea**: Ampliando ainda mais para mostrar que o amor é maior que nossa galáxia
4. **Universo**: Mostrando que o amor é tão vasto quanto todo o universo
5. **Final**: Uma cena inspirada em Cristo, com o versículo que reforça o amor do homem pela mulher

## Tecnologias Utilizadas

- **Next.js**: Framework React para renderização e roteamento
- **Tailwind CSS**: Estilização e responsividade
- **Framer Motion**: Animações e transições suaves
- **Howler.js**: Efeitos sonoros e música de fundo
- **Canvas API**: Animações de partículas e efeitos visuais

## Estrutura do Projeto

```
/howmuch
  /app
    /components
      /scenes
        Opening.tsx
        Earth.tsx
        SolarSystem.tsx
        MilkyWay.tsx
        Universe.tsx
        Final.tsx
      /controllers
        SceneController.tsx
        AudioController.tsx
    /types
      media.d.ts
    page.tsx
    layout.tsx
    globals.css
  /public
    /assets
      /images
      /sounds
      /videos
```

## Como Executar

1. Clone o repositório
2. Instale as dependências:
   ```bash
   bun install
   ```
3. Execute o servidor de desenvolvimento:
   ```bash
   bun dev
   ```
4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## Recursos Adicionais

- **Easter Eggs**: O site contém mensagens e interações ocultas que podem ser descobertas
- **Controle de Som**: Botão para ativar/desativar o som
- **Navegação Intuitiva**: Botões para navegar entre as cenas
- **Animações Responsivas**: Experiência otimizada para diferentes dispositivos

## Personalização

Você pode personalizar o site adicionando:

- Fotos do casal em diferentes cenas
- Mensagens personalizadas
- Sons e músicas específicas
- Referências a datas e momentos especiais

## Licença

Este projeto é para uso pessoal e não possui licença específica.

---

Feito com ❤️ para demonstrar um amor que é maior que o universo.
