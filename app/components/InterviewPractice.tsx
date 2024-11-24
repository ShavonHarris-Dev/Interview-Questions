"use client";
import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle2, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

interface Question {

    id: number;
    question: string;
    type: 'Behavioral' | 'Technical' | 'GitHub';
  }
  
  type QuestionType = 'All' | 'Behavioral' | 'Technical' | 'GitHub';

  type SavedAnswers = {
    [key: number]: string;
  };
  
  
  interface Tips {
    Behavioral: string[];
    Technical: string[];
    GitHub: string[];
  }
  
  const questionsData: Omit<Question, 'id'>[] = [
    // Behavioral Questions
    { question: "Tell me about yourself.", type: "Behavioral" as const },
    { question: "What is your greatest strength?", type: "Behavioral" as const },
    { question: "What is your greatest weakness?", type: "Behavioral" as const },
    { question: "Why do you want to work at GitHub?", type: "Behavioral" as const },
    { question: "Tell me about a time you showed leadership.", type: "Behavioral" as const },
    { question: "Tell me about a time you were successful on a team.", type: "Behavioral" as const },
    { question: "What would your co-workers say about you?", type: "Behavioral" as const },
    { question: "Tell me about a challenging project.", type: "Behavioral" as const },
    { question: "Tell me about something you're proud of.", type: "Behavioral" as const },
    { question: "What are your salary expectations?", type: "Behavioral" as const },
    { question: "What do you like to do outside of work?", type: "Behavioral" as const },
    { question: "Tell me about a time you had to manage conflicting priorities.", type: "Behavioral" as const },
    { question: "Where do you see yourself in 5 years?", type: "Behavioral" as const },
    { question: "Describe your leadership style.", type: "Behavioral" as const },
    { question: "Tell me about a time you failed or made a mistake.", type: "Behavioral" as const },
    { question: "Tell me about a time you worked with a difficult person.", type: "Behavioral" as const },
    { question: "Tell me about a time you had to persuade someone.", type: "Behavioral" as const },
    { question: "Tell me about a time you disagreed with someone.", type: "Behavioral" as const },
    { question: "Tell me about a time you created a goal and achieved it.", type: "Behavioral" as const },
    { question: "Tell me about a time you surpassed expectations.", type: "Behavioral" as const },
    { question: "Tell me about a time you had to handle pressure.", type: "Behavioral" as const },
    { question: "Tell me about a time you had to learn something quickly.", type: "Behavioral" as const },
    { question: "Tell me about your experience with remote work.", type: "Behavioral" as const },
    { question: "How do you approach work-life balance?", type: "Behavioral" as const },
    { question: "Do you have any questions for me?", type: "Behavioral" as const },

    // Technical Questions
    { question: "How do you optimize React application performance?", type: "Technical" as const },
    { question: "How do you ensure the health and quality of the systems you build?", type: "Technical" as const },
    { question: "Can you explain a technical solution you designed and implemented?", type: "Technical" as const },
    { question: "How do you approach testing and validating technical solutions?", type: "Technical" as const },
    { question: "How do you approach technical debt and refactoring?", type: "Technical" as const },
    { question: "How do you stay current with industry trends and developments?", type: "Technical" as const },
    { question: "How do you prioritize tasks and manage your time in a fast-paced environment?", type: "Technical" as const },
    { question: "How do you approach technical writing and documentation?", type: "Technical" as const },
    { question: "How do you communicate complex technical information to non-technical stakeholders?", type: "Technical" as const },
    { question: "Can you describe a project you worked on that required data analysis and visualization?", type: "Technical" as const },
    { question: "How do you design RESTful APIs for scalability and maintainability?", type: "Technical" as const },
    { question: "How do you implement authentication and authorization in applications?", type: "Technical" as const },
    { question: "How do you handle error handling in backend services?", type: "Technical" as const },
    { question: "How do you handle async operations?", type: "Technical" as const },
    { question: "How do you implement caching strategies across the stack?", type: "Technical" as const },
    { question: "How do you optimize database query performance?", type: "Technical" as const },
    { question: "Explain your approach to database schema design", type: "Technical" as const },
    { question: "How do you handle database transactions and concurrency?", type: "Technical" as const },
    { question: "How do you handle database backups and disaster recovery?", type: "Technical" as const },
    { question: "How do you implement caching with databases?", type: "Technical" as const },
    { question: "What's your experience with NoSQL databases?", type: "Technical" as const },
    { question: "How do you handle database security?", type: "Technical" as const },
    { question: "How do you identify and resolve frontend performance bottlenecks?", type: "Technical" as const },
    { question: "What strategies do you use for code splitting and lazy loading?", type: "Technical" as const },
    { question: "How do you handle memory management and leaks?", type: "Technical" as const },
    { question: "How do you implement performance monitoring and alerts?", type: "Technical" as const },
    { question: "What's your approach to optimizing API performance?", type: "Technical" as const },
    { question: "How do you handle high-concurrency scenarios?", type: "Technical" as const },
    { question: "Explain Kafka's architecture and when you would use it", type: "Technical" as const },
    { question: "How do you handle data pipeline failures and recovery?", type: "Technical" as const },
    { question: "How do you ensure data consistency in distributed systems?", type: "Technical" as const },
    { question: "How do you handle data transformation and ETL processes?", type: "Technical" as const },
    { question: "What's your experience with message queuing systems?", type: "Technical" as const },
    { question: "How do you handle data schema evolution?", type: "Technical" as const },
    { question: "Describe your approach to data validation and quality", type: "Technical" as const },
    { question: "Can you explain the importance of customer obsession in software development?", type: "Technical" as const },
    { question: "How do you prioritize features and create a product roadmap?", type: "Technical" as const },
    { question: "Can you describe a situation where you had to make a difficult technical decision?", type: "Technical" as const },
    { question: "Can you explain the importance of growth mindset in software development?", type: "Technical" as const },
    { question: "How do you handle ambiguity and uncertainty in technical requirements?", type: "Technical" as const },

    // GitHub-Specific Questions
    { question: "How would you approach scaling a system to handle planetary-scale requirements?", type: "GitHub" as const },
    { question: "Can you describe your experience with Git workflows and branching strategies?", type: "GitHub" as const },
    { question: "What experience do you have with open source contribution and collaboration?", type: "GitHub" as const },
    { question: "How do you ensure security in collaborative development environments?", type: "GitHub" as const },
    { question: "Can you describe your experience with remote-first development practices?", type: "GitHub" as const },
    { question: "How do you approach building features that will be used by millions of developers?", type: "GitHub" as const },
    { question: "How do you handle code reviews and providing feedback to peers?", type: "GitHub" as const },
    { question: "How do you approach CI/CD and automated deployment?", type: "GitHub" as const },
    { question: "How do you describe your experience with distributed teams and async communication?", type: "GitHub" as const },
    { question: "How do you approach documentation for open source projects?", type: "GitHub" as const },
    { question: "How do you handle feature flags and gradual rollouts at scale?", type: "GitHub" as const },
    { question: "How do you approach API design for developer tools?", type: "GitHub" as const },
    { question: "How do you ensure backwards compatibility in widely-used APIs?", type: "GitHub" as const },
    { question: "How do you handle dependency management in large-scale projects?", type: "GitHub" as const },
    { question: "How do you approach building developer-friendly tools and interfaces?", type: "GitHub" as const }
];
  
  const allQuestions: Question[] = questionsData.map((q, index) => ({
    ...q,
    id: index + 1
  }));

const tips: Tips = {
  "Behavioral": [
    "Use the STAR method (Situation, Task, Action, Result)",
    "Keep responses under 2-3 minutes",
    "Focus on positive outcomes",
    "Be specific with examples",
    "Align with GitHub's values"
  ],
  "Technical": [
    "Use concrete examples from your experience",
    "Explain your thought process",
    "Focus on scalability and maintainability",
    "Highlight collaborative aspects",
    "Discuss trade-offs and decisions"
  ],
  "GitHub": [
    "Focus on large-scale systems experience",
    "Emphasize open source collaboration",
    "Discuss security and reliability",
    "Highlight distributed team experience",
    "Mention relevant GitHub features"
  ]
};

const InterviewPractice: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [showTimer, setShowTimer] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(120);
  const [practiced, setPracticed] = useState<Set<number>>(new Set());
  const [mode, setMode] = useState<'question' | 'tips'>('question');
  const [questionType, setQuestionType] = useState<QuestionType>('All');
  const [answers, setAnswers] = useState<SavedAnswers>({});

  const filteredQuestions = questionType === 'All' 
  ? allQuestions 
  : allQuestions.filter(q => q.type === questionType);

  useEffect(() => {
    const savedAnswers = localStorage.getItem('interviewAnswers');
    const savedPracticed = localStorage.getItem('practicedQuestions');
    
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
    }
    
    if (savedPracticed) {
      setPracticed(new Set(JSON.parse(savedPracticed)));
    }
  }, []);

  // Save answers to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('interviewAnswers', JSON.stringify(answers));
  }, [answers]);

  // Save practiced questions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('practicedQuestions', JSON.stringify([...practiced]));
  }, [practiced]);

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };


  const startTimer = (): void => {
    setShowTimer(true);
    setTimeLeft(120);
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const markAsPracticed = (): void => {
    setPracticed(prev => new Set([...prev, filteredQuestions[currentQuestion].id]));
  };

  const resetPracticed = (): void => {
    setPracticed(new Set());
    setAnswers({});
    localStorage.removeItem('interviewAnswers');
    localStorage.removeItem('practicedQuestions');
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Interview Practice</h1>
          {showTimer && (
            <span className={`text-xl ${timeLeft < 30 ? 'text-red-500' : ''}`}>
              {formatTime(timeLeft)}
            </span>
          )}
        </div>
        <div className="flex gap-2 flex-wrap">
          {['All', 'Behavioral', 'Technical', 'GitHub'].map(type => (
            <button
              key={type}
              onClick={() => {
                setQuestionType(type as typeof questionType);
                setCurrentQuestion(0);
              }}
              className={`px-4 py-2 rounded-md transition-colors ${
                questionType === type 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div className="min-h-32 bg-gray-50 p-4 rounded-lg">
          <div className="text-xl mb-4 text-gray-900">
            {filteredQuestions[currentQuestion].question}
          </div>
          
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Answer:
            </label>
            <textarea
              value={answers[filteredQuestions[currentQuestion].id] || ''}
              onChange={(e) => handleAnswerChange(filteredQuestions[currentQuestion].id, e.target.value)}
              className="w-full h-32 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900 text-lg"
              placeholder="Type your answer here..."
            />
          </div>
          
          {mode === 'tips' && (
            <div className="mt-4 space-y-2 text-gray-900">
              <div className="font-semibold">Tips:</div>
              <ul className="list-disc pl-6">
                {tips[filteredQuestions[currentQuestion].type].map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <div className="flex justify-center space-x-2">
          {!showTimer ? (
            <button
              onClick={startTimer}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Start Timer
            </button>
          ) : (
            <button
              onClick={() => setShowTimer(false)}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Stop Timer
            </button>
          )}
          <button
            onClick={() => setMode(mode === 'question' ? 'tips' : 'question')}
            className="px-4 py-2 bg-gray-100 text-gray-900 rounded-md hover:bg-gray-200 transition-colors"
          >
            {mode === 'question' ? 'Show Tips' : 'Hide Tips'}
          </button>
          <button
            onClick={markAsPracticed}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            Mark Complete
          </button>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
            disabled={currentQuestion === 0}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Previous
          </button>
          
          <div className="flex items-center space-x-2">
            {practiced.has(filteredQuestions[currentQuestion].id) ? (
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            ) : (
              <AlertCircle className="w-5 h-5 text-yellow-500" />
            )}
            <button
              onClick={resetPracticed}
              className="flex items-center px-3 py-1 text-sm bg-gray-100 text-gray-900 rounded-md hover:bg-gray-200 transition-colors"
            >
              <RotateCcw className="w-4 h-4 mr-1" /> Reset Progress
            </button>
          </div>

          <button
            onClick={() => setCurrentQuestion(prev => Math.min(filteredQuestions.length - 1, prev + 1))}
            disabled={currentQuestion === filteredQuestions.length - 1}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>

      <div className="flex justify-between text-sm text-gray-600 mt-6">
        <div>Question {currentQuestion + 1} of {filteredQuestions.length}</div>
        <div>
          Progress: {practiced.size}/{filteredQuestions.length} questions practiced
        </div>
      </div>
    </div>
  );
};

export default InterviewPractice;