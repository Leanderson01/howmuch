import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import NavigationButton from '../ui/NavigationButton';

interface FinalProps {
  onNavigatePrev: () => void;
  onRestart: () => void;
}

const Final: React.FC<FinalProps> = ({ onNavigatePrev, onRestart }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Efeito para criar a animação do monte com a cruz
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Ajusta o tamanho do canvas para preencher a tela
    const setCanvasSize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Variáveis para a animação
    let animationFrameId: number;
    let particles: LightParticle[] = [];
    let animationProgress = 0;
    const startTime = Date.now();
    const clouds: Cloud[] = [];
    
    // Array de estrelas com posições fixas - definido apenas uma vez
    const stars: {
      x: number;
      y: number;
      baseRadius: number;
      twinkleSpeed: number;
      baseOpacity: number;
    }[] = [];
    
    // Inicializa posições das estrelas apenas uma vez
    const initStars = () => {
      const numStars = 200;
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * (canvas.height * 0.7),
          baseRadius: Math.random() * 1.5 + 0.5,
          twinkleSpeed: Math.random() * 0.0015 + 0.0005, // Velocidade de pulsação bem mais lenta
          baseOpacity: Math.random() * 0.3 + 0.7 // Opacidade base fixa por estrela
        });
      }
    };
    
    // Inicializa as estrelas
    initStars();
    
    // Classe para partículas de luz
    class LightParticle {
      x: number;
      y: number;
      size: number;
      speed: number;
      color: string;
      alpha: number;
      angle: number;
      
      constructor() {
        // Usar valores seguros verificando se canvas não é null
        const canvasWidth = canvas?.width || window.innerWidth;
        const canvasHeight = canvas?.height || window.innerHeight;
        
        // Partículas surgem principalmente perto da cruz
        const centerX = canvasWidth * 0.5;
        const topY = canvasHeight * 0.35; // Topo do monte onde ficará a cruz
        
        // Distribuição em torno da cruz
        const distance = Math.random() * 200;
        const angle = Math.random() * Math.PI * 2;
        
        this.x = centerX + Math.cos(angle) * distance;
        this.y = topY + Math.sin(angle) * distance;
        this.size = Math.random() * 2 + 1; // Partículas menores, mais delicadas
        this.speed = Math.random() * 0.7 + 0.3; // Velocidade reduzida
        this.alpha = Math.random() * 0.5 + 0.2; // Menos opaco para ser mais delicado
        this.angle = Math.random() * Math.PI * 2; // Direção aleatória
        
        // Cores mais suaves para efeito divino (variações de dourado e branco)
        const colors = [
          'rgba(255, 255, 255, 0.7)', // Branco suave
          'rgba(255, 253, 240, 0.6)', // Branco quente suave
          'rgba(255, 248, 225, 0.6)', // Âmbar muito claro suave
          'rgba(255, 249, 196, 0.5)', // Amarelo muito claro suave
          'rgba(255, 241, 118, 0.5)', // Amarelo dourado suave
        ];
        
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }
      
      update(progress: number) {
        // Movimento mais lento para cima
        this.x += Math.cos(this.angle) * this.speed * 0.1;
        this.y -= this.speed * 0.3; // Movimento principal para cima mais lento
        
        // Desvanecer gradualmente, mas mais lentamente
        this.alpha -= 0.003;
        
        // Tamanho constante para efeito mais suave
        this.size = Math.max(0.8, this.size + (progress * 0.005));
        
        // Retorna verdadeiro se a partícula ainda está viva
        return this.alpha > 0;
      }
      
      draw(ctx: CanvasRenderingContext2D) {
        ctx.globalAlpha = this.alpha;
        
        // Glow effect
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size * 2
        );
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Centro mais brilhante
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.globalAlpha = 1;
      }
    }
    
    // Classe para nuvens
    class Cloud {
      x: number;
      y: number;
      width: number;
      height: number;
      speed: number;
      cloudParts: { x: number, y: number, radius: number }[];
      
      constructor() {
        // Usar valores seguros verificando se canvas não é null
        const canvasWidth = canvas?.width || window.innerWidth;
        const canvasHeight = canvas?.height || window.innerHeight;
        
        this.width = Math.random() * 200 + 100;
        this.height = Math.random() * 60 + 30;
        this.x = Math.random() * (canvasWidth + 400) - 200;
        this.y = Math.random() * (canvasHeight * 0.5);
        this.speed = Math.random() * 0.15 + 0.05; // Velocidade reduzida
        
        // Criar partes da nuvem (círculos aglomerados)
        this.cloudParts = [];
        const numParts = Math.floor(Math.random() * 5) + 5;
        
        for (let i = 0; i < numParts; i++) {
          this.cloudParts.push({
            x: Math.random() * this.width,
            y: Math.random() * (this.height * 0.7),
            radius: Math.random() * 30 + 20
          });
        }
      }
      
      update() {
        // Usar valores seguros verificando se canvas não é null
        const canvasWidth = canvas?.width || window.innerWidth;
        const canvasHeight = canvas?.height || window.innerHeight;
        
        // Movimento lento horizontal
        this.x += this.speed;
        
        // Recicla nuvens que saíram da tela
        if (this.x - this.width > canvasWidth) {
          this.x = -this.width;
          this.y = Math.random() * (canvasHeight * 0.5);
        }
      }
      
      draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.translate(this.x, this.y);
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        
        for (const part of this.cloudParts) {
          ctx.beginPath();
          ctx.arc(part.x, part.y, part.radius, 0, Math.PI * 2);
          ctx.fill();
        }
        
        ctx.restore();
      }
    }
    
    // Inicializa nuvens
    for (let i = 0; i < 6; i++) {
      clouds.push(new Cloud());
    }
    
    // Desenha o céu com gradiente
    const drawSky = (progress: number) => {
      const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      
      // O céu muda de cor com o progresso da animação
      skyGradient.addColorStop(0, `rgba(15, 10, 60, ${0.8 + progress * 0.2})`); // Azul escuro
      skyGradient.addColorStop(0.5, `rgba(40, 20, 105, ${0.7 + progress * 0.3})`); // Roxo
      skyGradient.addColorStop(1, `rgba(80, 40, 120, ${0.5 + progress * 0.5})`); // Púrpura
      
      ctx.fillStyle = skyGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    
    // Desenha estrelas no céu - apenas com efeito de pulsação suave (bounce)
    const drawStars = (progress: number) => {
      // Desenha estrelas com efeito de pulsação
      for (const star of stars) {
        // Cálculo de pulsação suave
        const time = Date.now() * star.twinkleSpeed;
        const pulseEffect = Math.sin(time) * 0.2 + 0.8; // Valor entre 0.6 e 1.0 - pulsação mais sutil
        
        // Raio e opacidade variam sutilmente com a pulsação
        const radius = star.baseRadius * pulseEffect;
        const opacity = star.baseOpacity * pulseEffect * progress;
        
        // Estrela principal
        ctx.beginPath();
        ctx.arc(star.x, star.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
        
        // Brilho para estrelas maiores
        if (star.baseRadius > 1.2) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, radius * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.15})`;
          ctx.fill();
        }
      }
    };
    
    // Desenha o monte (silhueta)
    const drawMount = (progress: number) => {
      const centerX = canvas.width / 2;
      const baseY = canvas.height;
      const mountHeight = canvas.height * 0.6 * progress;
      const mountWidth = canvas.width * 0.7 * progress;
      
      // Cria montanha usando curvas
      ctx.beginPath();
      ctx.moveTo(centerX - mountWidth / 2, baseY);
      
      // Curva esquerda da montanha
      ctx.bezierCurveTo(
        centerX - mountWidth / 3, baseY - mountHeight * 0.3,
        centerX - mountWidth / 4, baseY - mountHeight * 0.7,
        centerX, baseY - mountHeight
      );
      
      // Curva direita da montanha
      ctx.bezierCurveTo(
        centerX + mountWidth / 4, baseY - mountHeight * 0.7,
        centerX + mountWidth / 3, baseY - mountHeight * 0.3,
        centerX + mountWidth / 2, baseY
      );
      
      ctx.closePath();
      
      // Gradiente para a montanha
      const mountGradient = ctx.createLinearGradient(
        centerX, baseY - mountHeight,
        centerX, baseY
      );
      mountGradient.addColorStop(0, 'rgba(30, 15, 35, 1)');
      mountGradient.addColorStop(0.6, 'rgba(50, 30, 60, 1)');
      mountGradient.addColorStop(1, 'rgba(20, 10, 30, 1)');
      
      ctx.fillStyle = mountGradient;
      ctx.fill();
    };
    
    // Desenha a cruz - CORRIGINDO ORIENTAÇÃO
    const drawCross = (progress: number) => {
      const centerX = canvas.width / 2;
      const mountTop = canvas.height - (canvas.height * 0.6 * progress);
      
      // Calcula tamanho da cruz baseado no progresso e tamanho da tela
      const crossHeight = canvas.height * 0.25 * progress;
      const crossWidth = crossHeight * 0.65;
      const thickness = crossWidth * 0.15;
      
      // Desenha a cruz com gradiente
      const crossGradient = ctx.createLinearGradient(
        centerX, mountTop - crossHeight,
        centerX, mountTop
      );
      
      crossGradient.addColorStop(0, 'rgba(120, 100, 80, 1)');
      crossGradient.addColorStop(0.5, 'rgba(100, 80, 60, 1)');
      crossGradient.addColorStop(1, 'rgba(80, 60, 40, 1)');
      
      ctx.fillStyle = crossGradient;
      
      // Pilar vertical - posicionado corretamente para ficar em pé
      ctx.fillRect(
        centerX - thickness / 2,
        mountTop - crossHeight, // Topo da cruz
        thickness,
        crossHeight
      );
      
      // Braço horizontal - posicionado no terço superior da cruz
      const horizontalPosition = mountTop - crossHeight * 0.7; // Agora mais para o topo (30% do topo)
      
      ctx.fillRect(
        centerX - crossWidth / 2,
        horizontalPosition,
        crossWidth,
        thickness
      );
      
      // Brilho ao redor da cruz se o progresso for alto
      if (progress > 0.7) {
        const glowIntensity = (progress - 0.7) / 0.3; // 0 a 1 baseado no progresso final
        
        // Desenha um brilho radial
        const glow = ctx.createRadialGradient(
          centerX, horizontalPosition, // Posição do centro da cruz
          0,
          centerX, horizontalPosition,
          crossWidth
        );
        
        glow.addColorStop(0, `rgba(255, 255, 200, ${glowIntensity * 0.6})`); // Menos intenso
        glow.addColorStop(0.5, `rgba(255, 255, 150, ${glowIntensity * 0.3})`); // Menos intenso
        glow.addColorStop(1, 'rgba(255, 255, 100, 0)');
        
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(centerX, horizontalPosition, crossWidth, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    
    // Animação principal
    const animate = () => {
      if (!ctx || !canvas) return;
      
      // Limpa o canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Calcula o progresso da animação (0 a 1 em 5 segundos)
      const elapsedTime = Date.now() - startTime;
      animationProgress = Math.min(1, elapsedTime / 5000);
      
      // Desenha o céu
      drawSky(animationProgress);
      
      // Desenha estrelas
      drawStars(animationProgress);
      
      // Desenha nuvens
      clouds.forEach(cloud => {
        cloud.update();
        cloud.draw(ctx);
      });
      
      // Desenha o monte
      drawMount(animationProgress);
      
      // Desenha a cruz
      drawCross(animationProgress);
      
      // Atualiza partículas de luz
      if (Math.random() < 0.3 && animationProgress > 0.7) {
        for (let i = 0; i < 3; i++) {
          particles.push(new LightParticle());
        }
      }
      
      // Desenha e atualiza todas as partículas
      particles = particles.filter(particle => {
        const isAlive = particle.update(animationProgress);
        if (isAlive) {
          particle.draw(ctx);
        }
        return isAlive;
      });
      
      // Continua a animação
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Inicia a animação
    animate();
    
    // Limpeza ao desmontar
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden flex flex-col items-center justify-center">
      {/* Canvas para animação do monte e cruz */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full z-0"
      />
      
      {/* Mensagem principal */}
      <motion.div 
        className="z-10 text-center p-8 bg-black bg-opacity-30 rounded-lg max-w-3xl text-white backdrop-blur-sm mt-40"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1.5 }}
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-6">Amor Infinito</h2>
        
        <motion.p 
          className="text-xl md:text-2xl italic mb-8 font-serif"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1.5 }}
        >
          &ldquo;O homem deve amar sua mulher assim como Cristo amou a igreja 
          e se entregou por ela.&rdquo;
        </motion.p>
        
        <p className="text-lg md:text-xl mb-6">
          Assim como Cristo demonstrou o maior amor possível ao se entregar pela igreja,
          meu amor por você vai além de qualquer medida terrena ou cósmica.
          É um amor que transcende o universo, que não conhece limites,
          que se renova a cada dia e que durará para sempre.
        </p>
        
        <motion.p 
          className="text-xl md:text-2xl font-bold mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4, duration: 1 }}
        >
          Eu te amo infinitamente.
        </motion.p>
      </motion.div>
      
      <div className="absolute bottom-10 flex space-x-10 z-20">
        <NavigationButton 
          direction="prev" 
          onClick={onNavigatePrev}
        />
        
        <NavigationButton 
          direction="restart" 
          onClick={onRestart}
        />
      </div>
    </div>
  );
};

export default Final; 