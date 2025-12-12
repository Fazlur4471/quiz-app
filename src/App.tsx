import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Quiz data
const quizData = [
  {
    id: 1,
    question: "What sound does a cat make?",
    options: ["Bhau-Bhau", "Meow-Meow", "Oink-Oink"],
    correctAnswer: "Meow-Meow"
  },
  {
    id: 2,
    question: "What would you probably find in your fridge?",
    options: ["Shoes", "Ice Cream", "Books"],
    correctAnswer: "Ice Cream"
  },
  {
    id: 3,
    question: "What color are bananas?",
    options: ["Blue", "Yellow", "Red"],
    correctAnswer: "Yellow"
  },
  {
    id: 4,
    question: "How many stars are in the sky?",
    options: ["Two", "Infinite", "One Hundred"],
    correctAnswer: "Infinite"
  }
];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [pawOpen, setPawOpen] = useState(false);

  // Animate paw opening and closing
  useEffect(() => {
    const interval = setInterval(() => {
      setPawOpen(prev => !prev);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const handleSelectAnswer = (answer: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answer;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const handlePlayAgain = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
  };

  const calculateScore = () => {
    let score = 0;
    quizData.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const isLastQuestion = currentQuestion === quizData.length - 1;
  const currentAnswer = selectedAnswers[currentQuestion];

  return (
    <div 
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #bfdbfe 0%, #a5f3fc 50%, #bfdbfe 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Animated background elements */}
      <motion.div
        style={{
          position: 'absolute',
          top: '40px',
          left: '40px',
          width: '384px',
          height: '384px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          filter: 'blur(80px)'
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        style={{
          position: 'absolute',
          bottom: '40px',
          right: '40px',
          width: '500px',
          height: '500px',
          background: 'rgba(103, 232, 249, 0.2)',
          borderRadius: '50%',
          filter: 'blur(80px)'
        }}
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <AnimatePresence mode="wait">
        {!showResults ? (
          <motion.div
            key="quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '1200px'
            }}
          >
            {/* Main Card with proper shadow and border */}
            <div 
              style={{
                background: 'white',
                borderRadius: '40px',
                padding: '64px',
                position: 'relative',
                boxShadow: '0 40px 80px rgba(0, 0, 0, 0.12), 0 20px 40px rgba(0, 0, 0, 0.08)',
                border: isLastQuestion ? '4px solid #3b82f6' : 'none'
              }}
            >
              {/* Content */}
              <div style={{ position: 'relative', zIndex: 10 }}>
                {/* Header */}
                <motion.div
                  style={{ textAlign: 'center', marginBottom: '40px' }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h1 style={{ 
                    fontSize: '60px', 
                    fontFamily: 'Playfair Display, Georgia, serif',
                    marginBottom: '12px',
                    lineHeight: 1.2
                  }}>
                    <span style={{ color: '#111827' }}>Test Your </span>
                    <span style={{ color: '#0891b2', fontStyle: 'italic' }}>Knowledge</span>
                  </h1>
                  <p style={{ color: '#4b5563', fontSize: '16px' }}>
                    Answer all questions to see your results
                  </p>
                </motion.div>

                {/* Progress Bar */}
                <div style={{ display: 'flex', gap: '12px', marginBottom: '40px', justifyContent: 'center' }}>
                  {quizData.map((_, index) => (
                    <motion.div
                      key={index}
                      style={{
                        height: '8px',
                        width: '120px',
                        borderRadius: '4px',
                        backgroundColor: index <= currentQuestion ? '#1e3a8a' : '#d1d5db'
                      }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    />
                  ))}
                </div>

                {/* Question with fade transition */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentQuestion}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    style={{ marginTop: '24px' }}
                  >
                    {/* Question Text */}
                    <div style={{
                      background: '#ecfeff',
                      padding: '20px',
                      borderRadius: '12px',
                      textAlign: 'center',
                      marginBottom: '32px'
                    }}>
                      <p style={{ fontSize: '18px', fontWeight: 500, color: '#1f2937' }}>
                        {currentQuestion + 1}. {quizData[currentQuestion].question}
                      </p>
                    </div>

                    {/* Options */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {quizData[currentQuestion].options.map((option, index) => {
                        const isSelected = currentAnswer === option;
                        const isHovered = hoveredOption === option;

                        return (
                          <motion.button
                            key={option}
                            onClick={() => handleSelectAnswer(option)}
                            onMouseEnter={() => setHoveredOption(option)}
                            onMouseLeave={() => setHoveredOption(null)}
                            style={{
                              width: '100%',
                              padding: '20px',
                              borderRadius: '12px',
                              textAlign: 'center',
                              fontWeight: 500,
                              background: 'white',
                              cursor: 'pointer',
                              border: `3px solid ${
                                isSelected ? '#fbbf24' : 
                                isHovered ? '#ec4899' : 
                                '#e5e7eb'
                              }`,
                              color: '#1f2937',
                              transition: 'all 0.2s ease-in-out',
                              fontSize: '16px'
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ 
                              scale: 1.02,
                              boxShadow: isSelected 
                                ? '0 8px 20px rgba(251, 191, 36, 0.3)' 
                                : '0 8px 20px rgba(236, 72, 153, 0.3)'
                            }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {option}
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '40px' }}>
                  <motion.button
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                    style={{
                      padding: '12px',
                      borderRadius: '50%',
                      background: '#cffafe',
                      border: 'none',
                      cursor: currentQuestion === 0 ? 'not-allowed' : 'pointer',
                      opacity: currentQuestion === 0 ? 0.3 : 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    whileHover={{ scale: currentQuestion === 0 ? 1 : 1.1 }}
                    whileTap={{ scale: currentQuestion === 0 ? 1 : 0.9 }}
                  >
                    <ChevronLeft style={{ width: '24px', height: '24px', color: '#374151' }} />
                  </motion.button>

                  {isLastQuestion ? (
                    <motion.button
                      onClick={handleSubmit}
                      disabled={!currentAnswer}
                      style={{
                        padding: '12px 40px',
                        borderRadius: '12px',
                        fontWeight: 600,
                        border: 'none',
                        cursor: currentAnswer ? 'pointer' : 'not-allowed',
                        backgroundColor: currentAnswer ? '#06b6d4' : '#e5e7eb',
                        color: currentAnswer ? 'white' : '#9ca3af',
                        fontSize: '16px'
                      }}
                      whileHover={currentAnswer ? { scale: 1.05 } : {}}
                      whileTap={currentAnswer ? { scale: 0.95 } : {}}
                    >
                      Submit
                    </motion.button>
                  ) : (
                    <motion.button
                      onClick={handleNext}
                      style={{
                        padding: '12px',
                        borderRadius: '50%',
                        background: '#cffafe',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronRight style={{ width: '24px', height: '24px', color: '#374151' }} />
                    </motion.button>
                  )}
                </div>
              </div>
            </div>

            {/* Cat Paw Mascot - Only on first question */}
            {currentQuestion === 0 && (
              <motion.div
                style={{
                  position: 'absolute',
                  left: '-80px',
                  bottom: '40px',
                  zIndex: 100
                }}
                initial={{ opacity: 0, x: -50, y: 50 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.5, type: "spring" }}
              >
                <div style={{ position: 'relative' }}>
                  {/* Speech Bubble */}
                  <div style={{
                    background: 'white',
                    padding: '14px 24px',
                    borderRadius: '20px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                    marginBottom: '16px',
                    position: 'relative'
                  }}>
                    <p style={{ 
                      fontSize: '18px', 
                      fontWeight: 700, 
                      color: '#1f2937',
                      whiteSpace: 'nowrap',
                      margin: 0
                    }}>
                      Best of Luck!
                    </p>
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      left: '30px',
                      transform: 'translateY(50%)',
                      width: 0,
                      height: 0,
                      borderLeft: '12px solid transparent',
                      borderRight: '12px solid transparent',
                      borderTop: '12px solid white'
                    }} />
                  </div>

                  {/* Cat Paw Container */}
                  <div style={{
                    position: 'relative',
                    width: '160px',
                    height: '160px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {/* Outer pink glow */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'radial-gradient(circle, rgba(251, 207, 232, 0.6) 0%, rgba(251, 207, 232, 0) 70%)',
                      borderRadius: '50%'
                    }} />

                    {/* Main Large Paw Pad (bottom center) */}
                    <motion.div
                      style={{
                        position: 'absolute',
                        bottom: '15px',
                        left: '50%',
                        transform: 'translateX(-50%)'
                      }}
                      animate={{
                        scale: pawOpen ? 1.03 : 1,
                      }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                      <div style={{
                        width: '55px',
                        height: '65px',
                        background: '#f9a8d4',
                        borderRadius: '45% 45% 50% 50%',
                        boxShadow: '0 4px 12px rgba(249, 168, 212, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.3)',
                        position: 'relative'
                      }}>
                        {/* Inner highlight for depth */}
                        <div style={{
                          position: 'absolute',
                          top: '8px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: '30px',
                          height: '20px',
                          background: 'rgba(255, 255, 255, 0.2)',
                          borderRadius: '50%',
                          filter: 'blur(4px)'
                        }} />
                      </div>
                    </motion.div>

                    {/* Toe Beans Container - Animated Opening/Closing */}
                    <motion.div
                      style={{
                        position: 'absolute',
                        top: '8px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        gap: '6px',
                        alignItems: 'flex-end'
                      }}
                      animate={{
                        y: pawOpen ? -6 : 0,
                      }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                      {/* Left Toe Bean */}
                      <motion.div
                        animate={{
                          rotate: pawOpen ? -12 : 0,
                          x: pawOpen ? -2 : 0,
                        }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                      >
                        <div style={{
                          width: '22px',
                          height: '32px',
                          background: '#f9a8d4',
                          borderRadius: '50% 50% 45% 45%',
                          boxShadow: '0 3px 8px rgba(249, 168, 212, 0.4), inset 0 2px 3px rgba(255, 255, 255, 0.25)',
                          position: 'relative'
                        }}>
                          {/* Highlight */}
                          <div style={{
                            position: 'absolute',
                            top: '5px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '10px',
                            height: '12px',
                            background: 'rgba(255, 255, 255, 0.2)',
                            borderRadius: '50%',
                            filter: 'blur(2px)'
                          }} />
                        </div>
                      </motion.div>

                      {/* Center Toe Bean (tallest) */}
                      <motion.div
                        animate={{
                          y: pawOpen ? -4 : 0,
                        }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                      >
                        <div style={{
                          width: '24px',
                          height: '36px',
                          background: '#f9a8d4',
                          borderRadius: '50% 50% 45% 45%',
                          boxShadow: '0 3px 10px rgba(249, 168, 212, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.3)',
                          position: 'relative'
                        }}>
                          {/* Highlight */}
                          <div style={{
                            position: 'absolute',
                            top: '6px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '12px',
                            height: '14px',
                            background: 'rgba(255, 255, 255, 0.25)',
                            borderRadius: '50%',
                            filter: 'blur(2px)'
                          }} />
                        </div>
                      </motion.div>

                      {/* Right Toe Bean */}
                      <motion.div
                        animate={{
                          rotate: pawOpen ? 12 : 0,
                          x: pawOpen ? 2 : 0,
                        }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                      >
                        <div style={{
                          width: '22px',
                          height: '32px',
                          background: '#f9a8d4',
                          borderRadius: '50% 50% 45% 45%',
                          boxShadow: '0 3px 8px rgba(249, 168, 212, 0.4), inset 0 2px 3px rgba(255, 255, 255, 0.25)',
                          position: 'relative'
                        }}>
                          {/* Highlight */}
                          <div style={{
                            position: 'absolute',
                            top: '5px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '10px',
                            height: '12px',
                            background: 'rgba(255, 255, 255, 0.2)',
                            borderRadius: '50%',
                            filter: 'blur(2px)'
                          }} />
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        ) : (
          // Results Screen
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{
              width: '100%',
              height: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              top: 0,
              left: 0,
              background: 'linear-gradient(135deg, #e0f2fe 0%, #ffffff 50%, #e0f2fe 100%)'
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <motion.p
                style={{ color: '#4b5563', fontSize: '18px', marginBottom: '24px' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Keep Learning!
              </motion.p>
              <motion.h2
                style={{
                  fontSize: '48px',
                  fontFamily: 'Playfair Display, Georgia, serif',
                  color: '#0e7490',
                  marginBottom: '32px',
                  fontStyle: 'italic'
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Your Final score is
              </motion.h2>
              <motion.div
                style={{
                  fontSize: '180px',
                  fontWeight: 700,
                  color: '#0e7490',
                  lineHeight: 1,
                  marginBottom: '48px'
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  delay: 0.8,
                  type: "spring",
                  stiffness: 150,
                  damping: 12
                }}
              >
                {calculateScore()}
              </motion.div>

              {/* Play Again Button */}
              <motion.button
                onClick={handlePlayAgain}
                style={{
                  padding: '16px 40px',
                  background: 'linear-gradient(to right, #0891b2, #2563eb)',
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '18px',
                  borderRadius: '12px',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.15)'
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 20px 40px rgba(6, 182, 212, 0.4)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                Play Again
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;