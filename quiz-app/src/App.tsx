import React, { useState } from 'react';
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

const QuizApp = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [pawOpen, setPawOpen] = useState(false);

  // Animate paw
  React.useEffect(() => {
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
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuestion(currentQuestion - 1);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const handleSubmit = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setShowResults(true);
      setIsTransitioning(false);
    }, 800);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-cyan-200 to-blue-300 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"
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
          className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl"
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
      </div>

      <AnimatePresence mode="wait">
        {!showResults ? (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8 }}
            className="relative w-full max-w-4xl"
          >
            {/* Main Card */}
            <motion.div
              className="bg-white rounded-3xl shadow-2xl p-12 relative"
              style={{
                boxShadow: '0 30px 60px rgba(0, 0, 0, 0.15)'
              }}
            >
              {/* Border glow effect on last question */}
              {isLastQuestion && (
                <motion.div
                  className="absolute inset-0 rounded-3xl"
                  style={{
                    border: '3px solid transparent',
                    background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #3b82f6, #06b6d4) border-box',
                  }}
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(59, 130, 246, 0.3)',
                      '0 0 40px rgba(59, 130, 246, 0.6)',
                      '0 0 20px rgba(59, 130, 246, 0.3)',
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}

              {/* Content */}
              <div className="relative z-10">
                {/* Header */}
                <motion.div
                  className="text-center mb-8"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h1 className="text-5xl font-serif mb-2">
                    <span className="text-gray-800">Test Your </span>
                    <span className="text-cyan-600 italic">Knowledge</span>
                  </h1>
                  <p className="text-gray-600 text-sm">
                    Answer all questions to see your results
                  </p>
                </motion.div>

                {/* Progress Bar */}
                <div className="flex gap-2 mb-8 justify-center">
                  {quizData.map((_, index) => (
                    <motion.div
                      key={index}
                      className="h-2 rounded-full"
                      style={{
                        width: `${100 / quizData.length}%`,
                        maxWidth: '150px',
                        backgroundColor: index <= currentQuestion ? '#1e3a8a' : '#d1d5db'
                      }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: index * 0.1 }}
                    />
                  ))}
                </div>

                {/* Question */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentQuestion}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    {/* Question Text */}
                    <div className="bg-cyan-50 p-4 rounded-lg text-center">
                      <p className="text-lg font-medium text-gray-800">
                        {currentQuestion + 1}. {quizData[currentQuestion].question}
                      </p>
                    </div>

                    {/* Options */}
                    <div className="space-y-3">
                      {quizData[currentQuestion].options.map((option, index) => {
                        const isSelected = currentAnswer === option;
                        const isHovered = hoveredOption === option;

                        return (
                          <motion.button
                            key={option}
                            onClick={() => handleSelectAnswer(option)}
                            onHoverStart={() => setHoveredOption(option)}
                            onHoverEnd={() => setHoveredOption(null)}
                            className="w-full p-4 rounded-lg text-center font-medium transition-all relative"
                            style={{
                              backgroundColor: 'white',
                              border: `3px solid ${
                                isSelected ? '#fbbf24' : 
                                isHovered ? '#ec4899' : 
                                '#e5e7eb'
                              }`,
                              color: '#1f2937'
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
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
                <div className="flex justify-between items-center mt-8">
                  <motion.button
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                    className="p-3 rounded-full bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-700" />
                  </motion.button>

                  {isLastQuestion ? (
                    <motion.button
                      onClick={handleSubmit}
                      disabled={!currentAnswer}
                      className="px-8 py-3 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        backgroundColor: currentAnswer ? '#06b6d4' : '#e5e7eb',
                        color: currentAnswer ? 'white' : '#9ca3af'
                      }}
                      whileHover={currentAnswer ? { scale: 1.05 } : {}}
                      whileTap={currentAnswer ? { scale: 0.95 } : {}}
                    >
                      Submit
                    </motion.button>
                  ) : (
                    <motion.button
                      onClick={handleNext}
                      className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronRight className="w-5 h-5 text-gray-700" />
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Cat Paw Mascot - Only on first question */}
            {currentQuestion === 0 && (
              <motion.div
                className="absolute left-4 bottom-4"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="relative">
                  {/* Speech Bubble */}
                  <div className="bg-white px-4 py-2 rounded-lg shadow-lg mb-2 relative">
                    <p className="text-sm font-medium text-gray-800 whitespace-nowrap">
                      Best of Luck!
                    </p>
                    <div className="absolute bottom-0 left-4 transform translate-y-1/2">
                      <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white" />
                    </div>
                  </div>

                  {/* Cat Paw */}
                  <motion.div
                    className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center shadow-lg"
                    animate={{
                      scale: pawOpen ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative">
                      {/* Paw pad */}
                      <div className="w-8 h-10 bg-pink-300 rounded-full" />
                      {/* Toe beans */}
                      <motion.div
                        className="absolute -top-2 left-1/2 -translate-x-1/2 flex gap-1"
                        animate={{
                          y: pawOpen ? -2 : 0,
                        }}
                      >
                        <div className="w-3 h-4 bg-pink-300 rounded-full" />
                        <div className="w-3 h-4 bg-pink-300 rounded-full" />
                        <div className="w-3 h-4 bg-pink-300 rounded-full" />
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </motion.div>
        ) : (
          // Results Screen
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full h-screen flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #e0f2fe 0%, #ffffff 100%)',
            }}
          >
            <div className="text-center">
              <motion.p
                className="text-gray-600 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Keep Learning!
              </motion.p>
              <motion.h2
                className="text-4xl font-serif text-cyan-700 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Your Final score is
              </motion.h2>
              <motion.div
                className="text-9xl font-bold text-cyan-700"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  delay: 0.7,
                  type: "spring",
                  stiffness: 200,
                  damping: 15
                }}
              >
                {calculateScore()}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuizApp;