import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import NavigationButton from '../ui/NavigationButton';

interface UniverseProps {
  onNavigateNext: () => void;
  onNavigatePrev: () => void;
}

const Universe: React.FC<UniverseProps> = ({ onNavigateNext, onNavigatePrev }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [, setAnimationStage] = useState(0);
  const [showText, setShowText] = useState(false);
  
  // Efeito para criar animação do universo com sequência de cenas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Ensure the canvas fills the entire viewport immediately
    const setCanvasSize = () => {
      if (!canvas) return;
      
      // Set to window's inner dimensions instead of just the container
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Force a redraw after resize
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
    
    // Call immediately to set the initial size
    setCanvasSize();
    
    let animationFrameId: number;
    let particles: Particle[] = [];
    let asteroids: Asteroid[] = [];
    let stars: Star[] = [];
    let nebulaParticles: NebulaParticle[] = [];
    let zoomLevel = 1;
    let currentStage = 0;
    let stageStartTime = Date.now();
    let transitioningStage = false;
    
    // Ajusta o tamanho do canvas para preencher a tela
    const handleResize = () => {
      setCanvasSize();
      
      // Redimensiona e recria os elementos visuais quando o tamanho muda
      initializeScene();
    };
    
    // Classes para os diferentes elementos visuais
    class Star {
      x: number;
      y: number;
      z: number;
      size: number;
      color: string;
      originalZ: number;
      
      constructor() {
        // Safe check for canvas nullability - use safe defaults if null
        const width = canvas?.width || window.innerWidth;
        const height = canvas?.height || window.innerHeight;
        
        this.x = (Math.random() - 0.5) * width * 3;
        this.y = (Math.random() - 0.5) * height * 3;
        this.z = Math.random() * 2000 + 1000;
        this.originalZ = this.z;
        this.size = Math.random() * 2 + 0.5;
        
        // Variedade de cores para as estrelas
        const colors = [
          '#FFFFFF', // Branco
          '#FFFAFA', // Branco neve
          '#F8F8FF', // Branco fantasma
          '#F0F8FF', // Azul Alice
          '#E6E6FA', // Lavanda
          '#FFD700', // Amarelo ouro
          '#FFA500', // Laranja
          '#87CEFA', // Azul claro
        ];
        
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }
      
      draw() {
        if (!ctx || !canvas) return;
        
        // Calcula a posição projetada com base na perspectiva
        const scale = 800 / (this.z * zoomLevel);
        const x2d = canvas.width / 2 + this.x * scale;
        const y2d = canvas.height / 2 + this.y * scale;
        
        // Só desenha se estiver dentro da tela
        if (x2d > 0 && x2d < canvas.width && y2d > 0 && y2d < canvas.height) {
          const scaledSize = this.size * scale * 2;
          
          // Brilho das estrelas
          ctx.globalAlpha = Math.min(1, 0.8 * scale * 2);
          const glow = ctx.createRadialGradient(x2d, y2d, 0, x2d, y2d, scaledSize * 2);
          glow.addColorStop(0, this.color);
          glow.addColorStop(0.4, `${this.color}80`);
          glow.addColorStop(1, 'transparent');
          
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(x2d, y2d, scaledSize * 2, 0, Math.PI * 2);
          ctx.fill();
          
          // Núcleo da estrela
          ctx.globalAlpha = 1;
          ctx.fillStyle = this.color;
          ctx.beginPath();
          ctx.arc(x2d, y2d, scaledSize / 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      
      update() {
        // Movimento de viagem pelo espaço, ajustando a profundidade da estrela
        if (transitioningStage) {
          this.z -= 15;
        } else {
          this.z -= 2; // Movimento mais lento quando não está em transição
        }
        
        // Se a estrela ficou muito próxima, reposiciona-a ao fundo
        if (this.z < 1) {
          // Safe check for canvas nullability
          const width = canvas?.width || window.innerWidth;
          const height = canvas?.height || window.innerHeight;
          
          this.x = (Math.random() - 0.5) * width * 3;
          this.y = (Math.random() - 0.5) * height * 3;
          this.z = 2000;
        }
      }
    }
    
    class NebulaParticle {
      x: number;
      y: number;
      z: number;
      size: number;
      color: string;
      alpha: number;
      
      constructor() {
        if (!canvas) {
          this.x = 0;
          this.y = 0;
          this.z = 0;
          this.size = 0;
          this.color = '';
          this.alpha = 0;
          return;
        }
        
        // Posiciona as partículas da nebulosa em um disco ou forma distorcida
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 250 + 50;
        
        this.x = Math.cos(angle) * radius;
        this.y = Math.sin(angle) * radius;
        this.z = Math.random() * 1000 + 500;
        
        this.size = Math.random() * 50 + 10;
        
        // Cores de nebulosa
        const colors = [
          '#FF416C', // Rosa
          '#904e95', // Roxo
          '#330867', // Azul escuro
          '#6A0572', // Roxo escuro
          '#22c1c3', // Ciano
          '#1a2a6c', // Azul Navy
          '#FF0080', // Rosa choque
          '#3F2B96'  // Azul púrpura
        ];
        
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.alpha = Math.random() * 0.7 + 0.3;
      }
      
      draw() {
        if (!ctx || !canvas) return;
        
        // Calcula a posição projetada
        const scale = 500 / (this.z * zoomLevel);
        const x2d = canvas.width / 2 + this.x * scale;
        const y2d = canvas.height / 2 + this.y * scale;
        
        // Tamanho escalado com base na profundidade
        const scaledSize = this.size * scale;
        
        // Só desenha se estiver dentro da tela e for grande o suficiente
        if (x2d > -scaledSize && x2d < canvas.width + scaledSize && 
            y2d > -scaledSize && y2d < canvas.height + scaledSize && 
            scaledSize > 0.5) {
          
          // Desenha a partícula da nebulosa como um gradiente suave
          const gradient = ctx.createRadialGradient(x2d, y2d, 0, x2d, y2d, scaledSize);
          gradient.addColorStop(0, `${this.color}${Math.floor(this.alpha * 255).toString(16).padStart(2, '0')}`);
          gradient.addColorStop(0.6, `${this.color}40`); // Baixa opacidade
          gradient.addColorStop(1, 'transparent');
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(x2d, y2d, scaledSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      
      update() {
        // As partículas da nebulosa têm um movimento mais lento
        if (transitioningStage) {
          this.z -= 6;
        } else {
          this.z -= 0.5;
        }
        
        // Reposiciona as partículas que ficaram muito próximas
        if (this.z < 1) {
          const angle = Math.random() * Math.PI * 2;
          const radius = Math.random() * 250 + 50;
          
          this.x = Math.cos(angle) * radius;
          this.y = Math.sin(angle) * radius;
          this.z = 1000;
        }
      }
    }
    
    class Asteroid {
      x: number;
      y: number;
      z: number;
      size: number;
      rotationSpeed: number;
      rotation: number;
      vertices: {x: number, y: number}[];
      
      constructor() {
        if (!canvas) {
          this.x = 0;
          this.y = 0;
          this.z = 0;
          this.size = 0;
          this.rotationSpeed = 0;
          this.rotation = 0;
          this.vertices = [];
          return;
        }
        
        // Posição inicial dos asteroides, mais distante na fase 2
        this.x = (Math.random() - 0.5) * canvas.width * 2;
        this.y = (Math.random() - 0.5) * canvas.height * 2;
        this.z = Math.random() * 1000 + 2000; // Começam mais longe
        
        this.size = Math.random() * 30 + 10;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        this.rotation = Math.random() * Math.PI * 2;
        
        // Cria vértices para forma irregular
        this.vertices = [];
        const numVertices = Math.floor(Math.random() * 5) + 5;
        for (let i = 0; i < numVertices; i++) {
          const angle = (i / numVertices) * Math.PI * 2;
          const radius = this.size * (0.7 + Math.random() * 0.3);
          this.vertices.push({
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius
          });
        }
      }
      
      draw() {
        if (!ctx || !canvas) return;
        
        // Calcula a posição projetada
        const scale = 800 / (this.z * zoomLevel);
        const x2d = canvas.width / 2 + this.x * scale;
        const y2d = canvas.height / 2 + this.y * scale;
        
        // Tamanho escalado com base na profundidade
        const scaledSize = this.size * scale;
        
        // Só desenha se estiver dentro da tela e for grande o suficiente
        if (x2d > -scaledSize && x2d < canvas.width + scaledSize && 
            y2d > -scaledSize && y2d < canvas.height + scaledSize && 
            scaledSize > 0.5) {
          
          ctx.save();
          ctx.translate(x2d, y2d);
          ctx.rotate(this.rotation);
          
          // Desenha a forma irregular do asteroide
          ctx.beginPath();
          if (this.vertices.length > 0) {
            ctx.moveTo(this.vertices[0].x * scale, this.vertices[0].y * scale);
            for (let i = 1; i < this.vertices.length; i++) {
              ctx.lineTo(this.vertices[i].x * scale, this.vertices[i].y * scale);
            }
            ctx.closePath();
            
            // Gradiente para dar profundidade ao asteroide
            const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, scaledSize);
            gradient.addColorStop(0, '#555555');
            gradient.addColorStop(0.5, '#333333');
            gradient.addColorStop(1, '#111111');
            
            ctx.fillStyle = gradient;
            ctx.fill();
            
            // Borda para definir melhor a forma
            ctx.strokeStyle = '#666666';
            ctx.lineWidth = 1;
            ctx.stroke();
            
            // Adiciona alguns "crateras" ao asteroide
            for (let i = 0; i < 5; i++) {
              const craterX = (Math.random() - 0.5) * scaledSize * 0.8;
              const craterY = (Math.random() - 0.5) * scaledSize * 0.8;
              const craterSize = Math.random() * scaledSize * 0.2 + scaledSize * 0.05;
              
              ctx.beginPath();
              ctx.arc(craterX, craterY, craterSize, 0, Math.PI * 2);
              ctx.fillStyle = '#222222';
              ctx.fill();
            }
          }
          
          ctx.restore();
        }
      }
      
      update() {
        // Movimento de viagem pelo espaço
        if (transitioningStage) {
          this.z -= 25;
        } else {
          this.z -= 5;
        }
        
        // Rotação do asteroide
        this.rotation += this.rotationSpeed;
        
        // Reposiciona os asteroides que ficaram muito próximos
        if (this.z < 1) {
          // Safe check for canvas nullability
          const width = canvas?.width || window.innerWidth;
          const height = canvas?.height || window.innerHeight;
          
          this.x = (Math.random() - 0.5) * width * 2;
          this.y = (Math.random() - 0.5) * height * 2;
          this.z = 3000;
        }
      }
    }
    
    class Particle {
      x: number;
      y: number;
      z: number;
      size: number;
      speed: number;
      color: string;
      angle: number; // Ângulo para variar a direção das partículas
      
      constructor() {
        if (!canvas) {
          this.x = 0;
          this.y = 0;
          this.z = 0;
          this.size = 0;
          this.speed = 0;
          this.color = '#FFFFFF';
          this.angle = 0;
          return;
        }
        
        // Distribui as partículas aleatoriamente
        this.x = (Math.random() - 0.5) * canvas.width * 3;
        this.y = (Math.random() - 0.5) * canvas.height * 3;
        this.z = Math.random() * 1000 + 500;
        
        this.size = Math.random() * 1.5 + 0.5; // Reduzir o tamanho das partículas
        this.speed = Math.random() * 5 + 3;
        
        // Adiciona um ângulo aleatório para variar a direção do movimento
        this.angle = Math.random() * Math.PI * 0.25 - Math.PI * 0.125; // +/- 22.5 graus
        
        // Cores para as partículas com menor opacidade
        const colors = [
          'rgba(255, 255, 255, 0.6)', // Branco
          'rgba(200, 200, 200, 0.5)', // Cinza claro
          'rgba(170, 170, 255, 0.5)', // Azul claro
          'rgba(255, 170, 170, 0.5)', // Vermelho claro
          'rgba(255, 255, 170, 0.5)', // Amarelo claro
        ];
        
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }
      
      draw() {
        if (!ctx || !canvas) return;
        
        // Calcula a posição projetada
        const scale = 600 / (this.z * zoomLevel);
        const x2d = canvas.width / 2 + this.x * scale;
        const y2d = canvas.height / 2 + this.y * scale;
        
        // Desenha a partícula como uma linha em ângulo para evitar linhas retas horizontais
        const length = this.speed * scale * 3; // Reduzir o comprimento
        
        // Calcula o ponto final com base no ângulo
        const endX = x2d - length * Math.cos(this.angle);
        const endY = y2d - length * Math.sin(this.angle);
        
        // Desenha com gradiente para suavizar
        ctx.beginPath();
        ctx.moveTo(x2d, y2d);
        ctx.lineTo(endX, endY);
        
        // Usar gradiente para a linha
        const gradient = ctx.createLinearGradient(x2d, y2d, endX, endY);
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, 'transparent');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = this.size * scale;
        ctx.stroke();
      }
      
      update() {
        // Movimento rápido para frente
        if (transitioningStage) {
          this.z -= this.speed * 3;
        } else {
          this.z -= this.speed;
        }
        
        // Reposiciona as partículas que ficaram muito próximas
        if (this.z < 1) {
          // Safe check for canvas nullability
          const width = canvas?.width || window.innerWidth;
          const height = canvas?.height || window.innerHeight;
          
          this.x = (Math.random() - 0.5) * width * 3;
          this.y = (Math.random() - 0.5) * height * 3;
          this.z = 1000;
        }
      }
    }
    
    // Inicializa a cena com os elementos visuais
    const initializeScene = () => {
      if (!canvas) return;
      
      stars = [];
      nebulaParticles = [];
      asteroids = [];
      particles = [];
      
      // Cria estrelas para todas as fases
      for (let i = 0; i < 800; i++) {
        stars.push(new Star());
      }
      
      // Cria partículas de nebulosa para fases 1 e 3
      for (let i = 0; i < 100; i++) {
        nebulaParticles.push(new NebulaParticle());
      }
      
      // Cria asteroides para fase 2
      for (let i = 0; i < 50; i++) {
        asteroids.push(new Asteroid());
      }
      
      // Cria partículas de movimento para todas as fases - REDUZIDO PARA MINIMIZAR LINHAS
      for (let i = 0; i < 60; i++) {
        particles.push(new Particle());
      }
    };
    
    // Função para gerenciar transições entre fases da animação
    const manageStages = () => {
      const currentTime = Date.now();
      const timeInStage = currentTime - stageStartTime;
      
      // Tempos para cada estágio (em milissegundos)
      const stage1Duration = 6000;  // 6 segundos na nebulosa distante
      const stage2Duration = 5000;  // 5 segundos no campo de asteroides
      
      // Variáveis para suavização de transição
      const transitionDuration = 1500; // 1.5 segundos para transições
      
      // Lógica para transição entre estágios
      if (currentStage === 0 && timeInStage > stage1Duration) {
        // Começa a transição para o estágio 1
        currentStage = 1;
        stageStartTime = currentTime;
        transitioningStage = true;
        
        // Sem setTimeout para evitar travamentos
        // Atualiza o estado React imediatamente
        setAnimationStage(1);
      } 
      else if (currentStage === 1 && timeInStage > stage2Duration) {
        // Começa a transição para o estágio 2
        currentStage = 2;
        stageStartTime = currentTime;
        transitioningStage = true;
        
        // Atualiza o estado React imediatamente
        setAnimationStage(2);
        
        // Mostrar o texto após um pouco de tempo no estágio final
        if (!showText && timeInStage > 1000) {
          setShowText(true);
        }
      }
      
      // Calcula o progresso da transição (0 a 1)
      const transProgress = transitioningStage ? 
        Math.min(1, timeInStage / transitionDuration) : 0;
      
      // Finaliza a transição após o tempo definido
      if (transitioningStage && timeInStage > transitionDuration) {
        transitioningStage = false;
      }
      
      // Ajusta o zoom baseado no estágio atual com transições mais suaves
      if (transitioningStage) {
        // Durante a transição, interpola entre os valores de zoom
        if (currentStage === 1) {
          // De 1.0 para 1.5
          zoomLevel = 1.0 + (0.5 * transProgress);
        } else if (currentStage === 2) {
          // De 1.5 para 2.0
          zoomLevel = 1.5 + (0.5 * transProgress);
        }
      } else {
        // Fora da transição, usa efeito de pulso suave
        if (currentStage === 0) {
          zoomLevel = 1.0 + Math.sin(timeInStage / 1500) * 0.05; // Pulso mais sutil
        } else if (currentStage === 1) {
          zoomLevel = 1.5 + Math.sin(timeInStage / 1500) * 0.05; // Pulso mais sutil
        } else if (currentStage === 2) {
          zoomLevel = 2.0 + Math.sin(timeInStage / 1500) * 0.1; // Pulso um pouco mais forte
        }
      }
    };
    
    // Desenha o fundo específico para cada estágio
    const drawBackground = () => {
      if (!canvas || !ctx) return;
      
      // Limpa o canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Fundo base que muda de cor conforme o estágio
      let bgGradient;
      
      if (currentStage === 0) {
        // Estágio 1: Nebulosa distante (tons mais escuros/azulados)
        bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        bgGradient.addColorStop(0, '#000814');
        bgGradient.addColorStop(0.5, '#001440');
        bgGradient.addColorStop(1, '#000814');
      } else if (currentStage === 1) {
        // Estágio 2: Campo de asteroides (tons mais cinzas/azulados)
        bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        bgGradient.addColorStop(0, '#000814');
        bgGradient.addColorStop(0.5, '#1a1a2e');
        bgGradient.addColorStop(1, '#000814');
      } else {
        // Estágio 3: Cena cósmica intensa (tons avermelhados/púrpura)
        bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        bgGradient.addColorStop(0, '#1a0033');
        bgGradient.addColorStop(0.5, '#330033');
        bgGradient.addColorStop(1, '#3a0033');
      }
      
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    
    // Função de animação principal
    const animate = () => {
      if (!canvas || !ctx) return;
      
      // Gerencia as transições entre estágios
      manageStages();
      
      // Desenha o fundo
      drawBackground();
      
      // Atualiza e desenha os elementos com base no estágio atual
      
      // Estrelas em todos os estágios
      stars.forEach(star => {
        star.update();
        star.draw();
      });
      
      // Partículas de movimento em todos os estágios
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      // Nebulosa nas fases 1 e 3
      if (currentStage === 0 || currentStage === 2) {
        nebulaParticles.forEach(particle => {
          particle.update();
          particle.draw();
        });
      }
      
      // Asteroides apenas na fase 2
      if (currentStage === 1) {
        asteroids.forEach(asteroid => {
          asteroid.update();
          asteroid.draw();
        });
      }
      
      // Continua a animação
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Inicializa os eventos e inicia a animação
    window.addEventListener('resize', handleResize);
    initializeScene();
    animate();
    
    // Limpa quando o componente é desmontado
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [showText]);
  
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden">
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
      />
      
      {showText && (
        <motion.div 
          className="z-10 absolute inset-0 flex items-center justify-center text-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-wider mb-4">
              <span className="text-cyan-400">ATRAVÉS</span> THE UNIVERSE
            </h1>
            <h2 className="text-2xl md:text-3xl text-white">
              TAKES YOU <span className="text-cyan-400">ON A COSMIC JOURNEY.</span>
            </h2>
          </div>
        </motion.div>
      )}
      
      <div className="absolute bottom-10 w-full flex justify-center space-x-10 z-20">
        <NavigationButton
          direction="prev"
          onClick={onNavigatePrev}
        />
        
        <NavigationButton
          direction="next"
          onClick={onNavigateNext}
        />
      </div>
    </div>
  );
};

export default Universe; 