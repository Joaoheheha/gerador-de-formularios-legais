
import React, { useState } from "react";
import FormConfig from "@/components/FormConfig";
import Introduction from "@/components/Introduction";
import Question, { QuestionData } from "@/components/Question";
import Summary from "@/components/Summary";
import LoadingState from "@/components/LoadingState";
import { generateFormContent, generateSummary } from "@/services/aiService";

type FormStage = "config" | "loading-content" | "introduction" | "questions" | "loading-summary" | "summary";

const Index = () => {
  const [stage, setStage] = useState<FormStage>("config");
  const [theme, setTheme] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [summary, setSummary] = useState("");

  const handleConfigSubmit = async (config: { theme: string; pages: number; options: number }) => {
    setTheme(config.theme);
    setStage("loading-content");
    
    try {
      const content = await generateFormContent(config);
      setIntroduction(content.introduction);
      setQuestions(content.questions);
      setStage("introduction");
    } catch (error) {
      console.error("Erro ao gerar conteúdo:", error);
      // Em uma aplicação real, você lidaria com o erro de forma mais elegante
      setStage("config");
    }
  };

  const handleStartQuestions = () => {
    setStage("questions");
  };

  const handleAnswer = (questionId: number, selectedOption: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: selectedOption }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      generateFinalSummary();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const generateFinalSummary = async () => {
    setStage("loading-summary");
    
    try {
      const generatedSummary = await generateSummary(theme, answers);
      setSummary(generatedSummary);
      setStage("summary");
    } catch (error) {
      console.error("Erro ao gerar resumo:", error);
      // Em uma aplicação real, você lidaria com o erro de forma mais elegante
      setStage("questions");
    }
  };

  const handleRestart = () => {
    setStage("config");
    setTheme("");
    setIntroduction("");
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setSummary("");
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-center mb-2 text-gradient">
            Formulário Inteligente
          </h1>
          <p className="text-center text-gray-600">
            Crie questionários personalizados gerados por IA
          </p>
        </div>

        {stage === "config" && (
          <FormConfig onSubmit={handleConfigSubmit} />
        )}

        {stage === "loading-content" && (
          <LoadingState message="Gerando seu formulário personalizado..." />
        )}

        {stage === "introduction" && (
          <Introduction 
            theme={theme} 
            introduction={introduction} 
            onStart={handleStartQuestions} 
          />
        )}

        {stage === "questions" && questions[currentQuestionIndex] && (
          <Question
            data={questions[currentQuestionIndex]}
            currentPage={currentQuestionIndex + 1}
            totalPages={questions.length}
            onAnswer={handleAnswer}
            onNext={handleNextQuestion}
            onPrevious={handlePreviousQuestion}
          />
        )}

        {stage === "loading-summary" && (
          <LoadingState message="Analisando suas respostas..." />
        )}

        {stage === "summary" && (
          <Summary 
            theme={theme} 
            summary={summary} 
            onRestart={handleRestart} 
          />
        )}
      </div>
    </div>
  );
};

export default Index;
