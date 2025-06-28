import React, { useState, useEffect } from 'react';

function Home() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [confetti, setConfetti] = useState([]);

    const createConfetti = () => {
        const newConfetti = [];
        for (let i = 0; i < 50; i++) {
            newConfetti.push({
                id: Date.now() + i,
                left: Math.random() * 100,
                backgroundColor: getRandomColor(),
                animationDelay: Math.random() * 3,
                animationDuration: Math.random() * 3 + 2
            });
        }
        setConfetti(newConfetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            setConfetti([]);
        }, 5000);
    };

    const getRandomColor = () => {
        const colors = ['#4CAF50', '#8BC34A', '#FFC107', '#FF9800', '#795548', '#009688'];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    const celebrate = () => {
        createConfetti();
        setTimeout(() => {
            alert('🚜 Parabéns! Que sua colheita seja sempre abundante! 🌾✨');
        }, 500);
    };

    const playMusic = () => {
        if (isPlaying) {
            setIsPlaying(false);
            return;
        }

        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            playHappyBirthday(audioContext);
            setIsPlaying(true);
            
            setTimeout(() => {
                setIsPlaying(false);
            }, 8000);
        } catch (error) {
            alert('🎵 Parabéns pra você! 🎵\nNesta data querida\nMuitas felicidades\nMuitos anos de vida! 🎂\n\n🚜 Que sua vida seja como uma boa colheita: próspera e abundante! 🌾');
        }
    };

    const playHappyBirthday = (audioContext) => {
        const notes = [
            {freq: 261.63, duration: 0.5}, // C
            {freq: 261.63, duration: 0.5}, // C
            {freq: 293.66, duration: 1},   // D
            {freq: 261.63, duration: 1},   // C
            {freq: 349.23, duration: 1},   // F
            {freq: 329.63, duration: 2},   // E
            
            {freq: 261.63, duration: 0.5}, // C
            {freq: 261.63, duration: 0.5}, // C
            {freq: 293.66, duration: 1},   // D
            {freq: 261.63, duration: 1},   // C
            {freq: 392.00, duration: 1},   // G
            {freq: 349.23, duration: 2},   // F
        ];

        let currentTime = audioContext.currentTime;
        
        notes.forEach((note) => {
            const osc = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            osc.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            osc.frequency.value = note.freq;
            osc.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.3, currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, currentTime + note.duration);
            
            osc.start(currentTime);
            osc.stop(currentTime + note.duration);
            
            currentTime += note.duration;
        });
    };

    // Auto confetti on load
    useEffect(() => {
        const timer = setTimeout(() => {
            const autoConfetti = [];
            for (let i = 0; i < 20; i++) {
                setTimeout(() => {
                    autoConfetti.push({
                        id: Date.now() + i,
                        left: Math.random() * 100,
                        backgroundColor: getRandomColor(),
                        animationDelay: 0,
                        animationDuration: 3
                    });
                }, i * 100);
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const styles = {
        body: {
            margin: 0,
            padding: 0,
            fontFamily: 'Arial, sans-serif',
            background: 'linear-gradient(135deg, #4CAF50 0%, #8BC34A 50%, #FFC107 100%)',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflowX: 'hidden',
            backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)'
        },
        container: {
            textAlign: 'center',
            padding: '40px',
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '20px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
            backdropFilter: 'blur(10px)',
            maxWidth: '600px',
            width: '90%',
            position: 'relative',
            animation: 'slideIn 1s ease-out',
            border: '3px solid rgba(76, 175, 80, 0.3)'
        },
        title: {
            fontSize: '2.5rem',
            color: '#2E7D32',
            marginBottom: '20px',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
            animation: 'bounce 2s infinite',
            fontWeight: 'bold'
        },
        subtitle: {
            fontSize: '1.3rem',
            color: '#558B2F',
            marginBottom: '25px',
            fontStyle: 'italic',
            fontWeight: '500'
        },
        emojis: {
            fontSize: '3rem',
            margin: '25px 0',
            animation: 'pulse 2s infinite'
        },
        message: {
            fontSize: '1.2rem',
            color: '#33691E',
            margin: '25px 0',
            lineHeight: '1.8',
            fontWeight: '500'
        },
        inspirationalQuote: {
            fontSize: '1.1rem',
            color: '#4CAF50',
            fontStyle: 'italic',
            margin: '20px 0',
            padding: '15px',
            background: 'rgba(76, 175, 80, 0.1)',
            borderRadius: '10px',
            borderLeft: '4px solid #4CAF50'
        },
        celebrationBtn: {
            background: 'linear-gradient(45deg, #4CAF50, #66BB6A)',
            color: 'white',
            border: 'none',
            padding: '15px 30px',
            fontSize: '1.1rem',
            borderRadius: '50px',
            cursor: 'pointer',
            margin: '15px 10px',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)',
            fontWeight: 'bold'
        },
        musicBtn: {
            background: 'linear-gradient(45deg, #FF9800, #FFB74D)',
            color: 'white',
            border: 'none',
            padding: '15px 30px',
            fontSize: '1.1rem',
            borderRadius: '50px',
            cursor: 'pointer',
            margin: '15px 10px',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(255, 152, 0, 0.3)',
            fontWeight: 'bold'
        },
        tractors: {
            position: 'absolute',
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            overflow: 'hidden'
        },
        tractor: {
            position: 'absolute',
            fontSize: '2rem',
            animation: 'drive 8s ease-in-out infinite'
        },
        confetti: {
            position: 'fixed',
            width: '12px',
            height: '12px',
            animation: 'confetti-fall 3s linear infinite',
            pointerEvents: 'none',
            zIndex: 1000,
            borderRadius: '2px'
        },
        heart: {
            color: '#4CAF50',
            fontSize: '1.5rem',
            display: 'inline-block',
            animation: 'heartbeat 1.5s ease-in-out infinite'
        }
    };

    return (
        <div style={styles.body}>
            <style>
                {`
                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translateY(50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes bounce {
                    0%, 20%, 50%, 80%, 100% {
                        transform: translateY(0);
                    }
                    40% {
                        transform: translateY(-10px);
                    }
                    60% {
                        transform: translateY(-5px);
                    }
                }

                @keyframes pulse {
                    0% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(1.1);
                    }
                    100% {
                        transform: scale(1);
                    }
                }

                @keyframes drive {
                    0%, 100% {
                        transform: translateX(0) rotate(0deg);
                    }
                    50% {
                        transform: translateX(30px) rotate(2deg);
                    }
                }

                @keyframes confetti-fall {
                    0% {
                        transform: translateY(-100vh) rotate(0deg);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(100vh) rotate(360deg);
                        opacity: 0;
                    }
                }

                @keyframes heartbeat {
                    0% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(1.2);
                    }
                    100% {
                        transform: scale(1);
                    }
                }

                button:hover {
                    transform: translateY(-3px) scale(1.05) !important;
                }

                @media (max-width: 600px) {
                    .title {
                        font-size: 2rem !important;
                    }
                    
                    .container {
                        padding: 30px 20px !important;
                    }
                    
                    button {
                        padding: 12px 25px !important;
                        font-size: 1rem !important;
                        margin: 10px 5px !important;
                    }
                }
                `}
            </style>

            <div style={styles.tractors}>
                <div style={{
                    ...styles.tractor,
                    left: '5%',
                    top: '20%',
                    animationDelay: '0s'
                }}>🚜</div>
                <div style={{
                    ...styles.tractor,
                    left: '15%',
                    top: '70%',
                    animationDelay: '2s'
                }}>🌾</div>
                <div style={{
                    ...styles.tractor,
                    right: '5%',
                    top: '30%',
                    animationDelay: '4s'
                }}>🚜</div>
                <div style={{
                    ...styles.tractor,
                    right: '15%',
                    top: '80%',
                    animationDelay: '6s'
                }}>🌽</div>
            </div>

            <div style={styles.container}>
                <h1 style={styles.title}>Feliz Aniversário Mamãe!</h1>
                
                <p style={styles.subtitle}>
                    "Como um campo bem cultivado, sua vida floresce em abundância"
                </p>
                
                <div style={styles.emojis}>🚜 🌾 🎂 🌽 🎉</div>
                
                <div style={styles.inspirationalQuote}>
                    "Assim como o agricultor planta com esperança e colhe com gratidão, 
                    que sua vida seja sempre repleta de boas sementes e colheitas abençoadas!"
                </div>
                
                <div style={styles.message}>
                    <p>Hoje celebramos não apenas mais um ano de vida, <span style={styles.heart}>💚</span></p>
                    <p>mas também todos os frutos do seu amor e dedicação!</p>
                    <p>Que este novo ciclo seja como uma safra próspera: cheia de alegrias, saúde e realizações!</p>
                </div>

                <button style={styles.celebrationBtn} onClick={celebrate}>
                    🌾 Celebrar a Colheita! 🌾
                </button>

                <button style={styles.musicBtn} onClick={playMusic}>
                    {isPlaying ? '🔇 Parar Música' : '🎵 Parabéns pra Você! 🎵'}
                </button>
            </div>

            {/* Render confetti */}
            {confetti.map(particle => (
                <div
                    key={particle.id}
                    style={{
                        ...styles.confetti,
                        left: `${particle.left}vw`,
                        backgroundColor: particle.backgroundColor,
                        animationDelay: `${particle.animationDelay}s`,
                        animationDuration: `${particle.animationDuration}s`
                    }}
                ></div>
            ))}
        </div>
    );
}

export default Home;