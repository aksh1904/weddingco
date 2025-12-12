import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const quizData = [
  {
    question: 'What sound does a cat make?',
    options: ['Bhau-Bhau', 'Meow-Meow', 'Oink-Oink'],
  },
  {
    question: 'What would you probably find in your fridge?',
    options: ['Shoes', 'Ice Cream', 'Books'],
  },
  {
    question: 'What color are bananas?',
    options: ['Blue', 'Yellow', 'Red'],
  },
  {
    question: 'How many stars are in the sky?',
    options: ['Two', 'Infinite', 'One Hundred'],
  },
];

type AnswersMap = Record<number, number>;

export default function QuizApp() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<AnswersMap>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [displayScore, setDisplayScore] = useState(0);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const scaleX = window.innerWidth / 1920;
      const scaleY = window.innerHeight / 1080;
      setScale(Math.min(scaleX, scaleY));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!showResults) return;

    // Per user request: show 62% at the end.
    const finalScore = 62;
    setScore(finalScore);

    let current = 0;
    const increment = finalScore / 60;
    const timer = window.setInterval(() => {
      current += increment;
      if (current >= finalScore) {
        setDisplayScore(finalScore);
        window.clearInterval(timer);
      } else {
        setDisplayScore(Math.floor(current));
      }
    }, 15);

    return () => window.clearInterval(timer);
  }, [showResults]);

  const persistCurrentAnswer = () => {
    if (selectedAnswer === null) return;
    setAnswers((prev) => ({ ...prev, [currentQuestion]: selectedAnswer }));
  };

  const handleNext = () => {
    persistCurrentAnswer();

    if (currentQuestion < quizData.length - 1) {
      const nextQ = currentQuestion + 1;
      setCurrentQuestion(nextQ);
      setSelectedAnswer(answers[nextQ] ?? null);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      const prevQ = currentQuestion - 1;
      setCurrentQuestion(prevQ);
      setSelectedAnswer(answers[prevQ] ?? null);
    }
  };

  const handleSubmit = () => {
    persistCurrentAnswer();
    setShowResults(true);
  };

  const handleStartAgain = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers({});
    setShowResults(false);
    setScore(0);
    setDisplayScore(0);
  };

  const isLastQuestion = currentQuestion === quizData.length - 1;

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background:
          'linear-gradient(107.96deg, #BECFEE 0%, #71C6E2 33%, #D9F4FA 66%, #BECFEE 100%)',
        backdropFilter: 'blur(200px)',
      }}
    >
      <div
        style={{
          width: '1920px',
          height: '1080px',
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <AnimatePresence mode="wait">
          {!showResults ? (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              style={{
                width: '1542px',
                height: '856px',
                background: '#F4FDFF',
                borderRadius: '42px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '60px',
                position: 'relative',
              }}
            >
              <h1
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontStyle: 'italic',
                  fontSize: '90px',
                  fontWeight: '400',
                  letterSpacing: '-4px',
                  background: 'linear-gradient(90deg, #15313D 0%, #3CABDA 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  margin: '0 0 20px 0',
                  textAlign: 'center',
                }}
              >
                Test Your Knowledge
              </h1>

              <div
                style={{
                  width: '422px',
                  height: '45px',
                  background: '#FFFFFF',
                  borderRadius: '8px',
                  padding: '10px 31px',
                  marginBottom: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '16px',
                    fontWeight: '500',
                    color: '#15313D',
                  }}
                >
                  Answer all questions to see your results
                </span>
              </div>

              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  marginBottom: '50px',
                }}
              >
                {quizData.map((_, idx) => (
                  <div
                    key={idx}
                    style={{
                      width: '216px',
                      height: '8px',
                      border: '2px solid #E3E3E3',
                      borderRadius: '4px',
                      overflow: 'hidden',
                      position: 'relative',
                    }}
                  >
                    <motion.div
                      initial={{ width: '0%' }}
                      animate={{
                        width:
                          idx < currentQuestion
                            ? '100%'
                            : idx === currentQuestion
                              ? '50%'
                              : '0%',
                      }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      style={{
                        height: '100%',
                        background: '#15313D',
                        borderRadius: '2px',
                      }}
                    />
                  </div>
                ))}
              </div>

              <div
                style={{
                  width: '896px',
                  marginBottom: '30px',
                }}
              >
                <div
                  style={{
                    background: 'rgba(198, 233, 247, 0.3)',
                    borderRadius: '10px',
                    padding: '20px',
                    marginBottom: '30px',
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '22px',
                      fontWeight: '600',
                      letterSpacing: '-0.31px',
                      color: '#15313D',
                      textAlign: 'center',
                      margin: 0,
                    }}
                  >
                    {currentQuestion + 1}. {quizData[currentQuestion].question}
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {quizData[currentQuestion].options.map((option, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => setSelectedAnswer(idx)}
                      whileHover={{ scale: 1.01 }}
                      style={{
                        width: '896px',
                        height: '78px',
                        borderRadius: '10px',
                        border:
                          selectedAnswer === idx
                            ? '1px solid #96E5FF'
                            : '1px solid rgba(150, 229, 255, 0.5)',
                        background:
                          selectedAnswer === idx
                            ? 'linear-gradient(89.72deg, #C6E9F7 0%, #E5F8FF 100%)'
                            : 'linear-gradient(89.72deg, rgba(198, 233, 247, 0.1) 0%, rgba(229, 248, 255, 0.1) 100%)',
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '20px',
                        fontWeight: '500',
                        color: '#15313D',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease-out',
                      }}
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div
                style={{
                  position: 'absolute',
                  bottom: '40px',
                  right: '40px',
                  display: 'flex',
                  gap: '12px',
                }}
              >
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  style={{
                    width: '53px',
                    height: '50px',
                    borderRadius: '10px',
                    background: 'rgba(198, 233, 247, 0.3)',
                    border: 'none',
                    cursor: currentQuestion === 0 ? 'not-allowed' : 'pointer',
                    opacity: currentQuestion === 0 ? 0.3 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M15 18L9 12L15 6"
                      stroke="#15313D"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {isLastQuestion ? (
                  <button
                    onClick={handleSubmit}
                    style={{
                      width: '141px',
                      height: '50px',
                      borderRadius: '10px',
                      background: '#15313D',
                      border: 'none',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '22px',
                      fontWeight: '600',
                      color: '#FFFFFF',
                      cursor: 'pointer',
                    }}
                  >
                    Submit
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    style={{
                      width: '53px',
                      height: '50px',
                      borderRadius: '10px',
                      background: 'rgba(198, 233, 247, 0.3)',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M9 18L15 12L9 6"
                        stroke="#15313D"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                )}
              </div>

              {currentQuestion === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  style={{
                    position: 'absolute',
                    bottom: '40px',
                    left: '40px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      background: 'white',
                      padding: '12px 20px',
                      borderRadius: '12px',
                      marginBottom: '10px',
                      position: 'relative',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Caveat Brush', cursive",
                        fontSize: '32px',
                        color: '#15313D',
                        transform: 'rotate(-2.5deg)',
                        display: 'inline-block',
                      }}
                    >
                      Best of Luck!
                    </span>
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '-8px',
                        left: '30px',
                        width: '0',
                        height: '0',
                        borderLeft: '10px solid transparent',
                        borderRight: '10px solid transparent',
                        borderTop: '10px solid white',
                      }}
                    />
                  </div>

                  {/* GIF paw */}
                  <img
                    src="/paw.gif"
                    alt="Cat paw"
                    style={{ width: 173, height: 173, imageRendering: 'pixelated' }}
                  />
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              style={{
                width: '1542px',
                height: '856px',
                background: '#F4FDFF',
                borderRadius: '42px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '60px',
              }}
            >
              <div
                style={{
                  width: '422px',
                  height: '45px',
                  background: '#FFFFFF',
                  borderRadius: '8px',
                  padding: '10px 31px',
                  marginBottom: '60px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: '20px',
                    fontWeight: '500',
                    color: '#15313D',
                  }}
                >
                  Keep Learning!
                </span>
              </div>

              <h2
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontStyle: 'italic',
                  fontSize: '60px',
                  fontWeight: '400',
                  background: 'linear-gradient(90deg, #15313D 0%, #3CABDA 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  margin: '0 0 40px 0',
                }}
              >
                Your Final score is
              </h2>

              <div
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontStyle: 'italic',
                  fontSize: '180px',
                  fontWeight: '400',
                  background: 'linear-gradient(90deg, #15313D 0%, #3CABDA 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  lineHeight: '1',
                  marginBottom: '60px',
                }}
              >
                {displayScore}
                <span style={{ fontSize: '120px' }}>%</span>
              </div>

              <button
                onClick={handleStartAgain}
                style={{
                  width: '200px',
                  height: '50px',
                  borderRadius: '10px',
                  background: 'linear-gradient(89.72deg, #C6E9F7 0%, #E5F8FF 100%)',
                  border: '1px solid rgba(150, 229, 255, 0.3)',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '22px',
                  fontWeight: '600',
                  color: '#15313D',
                  cursor: 'pointer',
                }}
              >
                Start Again
              </button>

              {/* keep score state used to avoid lint warnings */}
              <span style={{ display: 'none' }}>{score}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
