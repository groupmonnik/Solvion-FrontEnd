import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

interface ParticleAnimationProps {
  className?: string;
}

export function ParticleAnimation({ className = '' }: ParticleAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef({ x: 0, y: 0, radius: 150, prevX: 0 });
  const animationFrameId = useRef<number | undefined>(undefined);
  const lastMouseMoveTime = useRef<number>(Date.now());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configurar tamanho do canvas
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initParticles();
    };

    // Inicializar partículas
    const initParticles = () => {
      particles.current = [];
      const numberOfParticles = Math.floor((canvas.width * canvas.height) / 15000);

      for (let i = 0; i < numberOfParticles; i++) {
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.2,
          vy: -(Math.random() * 0.3 + 0.2), // Velocidade negativa para subir
          radius: Math.random() * 2 + 1,
        });
      }
    };

    // Atualizar posição do mouse
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.prevX = mouse.current.x;
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      lastMouseMoveTime.current = Date.now();
    };

    const handleMouseLeave = () => {
      mouse.current.x = -1000;
      mouse.current.y = -1000;
      mouse.current.prevX = -1000;
    };

    // Animar partículas
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Calcular direção do movimento do mouse
      const mouseDeltaX = mouse.current.x - mouse.current.prevX;
      const timeSinceLastMove = Date.now() - lastMouseMoveTime.current;
      const isIdle = timeSinceLastMove > 2000; // 2 segundos

      particles.current.forEach((particle) => {
        // Atualizar posição
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Se o mouse está se movendo, aplicar força na direção oposta
        if (Math.abs(mouseDeltaX) > 0.1 && !isIdle) {
          // Movimento do mouse para esquerda (negativo) -> partículas vão para direita (positivo)
          // Movimento do mouse para direita (positivo) -> partículas vão para esquerda (negativo)
          particle.vx += -mouseDeltaX * 0.015;

          // Limitar velocidade horizontal máxima para evitar aceleração excessiva
          const maxVx = 0.3;
          particle.vx = Math.max(-maxVx, Math.min(maxVx, particle.vx));
        }

        // Se está ocioso, retornar gradualmente para a direção inicial (vx = 0)
        if (isIdle) {
          particle.vx *= 0.9; // Desacelerar mais rapidamente
        } else {
          // Aplicar atrito normal no eixo X
          particle.vx *= 0.97;
        }

        // Manter velocidade de subida constante
        if (particle.vy > -0.2) particle.vy = -(Math.random() * 0.3 + 0.2);

        // Limites horizontais - efeito de espaço infinito (wrap around)
        if (particle.x < -10) {
          particle.x = canvas.width + 10;
        } else if (particle.x > canvas.width + 10) {
          particle.x = -10;
        }

        // Reiniciar partícula quando sai do topo
        if (particle.y < -10) {
          particle.y = canvas.height + 10;
          particle.x = Math.random() * canvas.width;
          particle.vx = (Math.random() - 0.5) * 0.2;
          particle.vy = -(Math.random() * 0.3 + 0.2);
        }

        // Desenhar partícula
        ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Resetar prevX após processar todas as partículas
      mouse.current.prevX = mouse.current.x;

      animationFrameId.current = requestAnimationFrame(animate);
    };

    // Inicializar
    resizeCanvas();
    animate();

    // Event listeners
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: -1 }}
    />
  );
}
