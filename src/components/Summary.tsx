
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CircleCheck } from "lucide-react";

interface SummaryProps {
  theme: string;
  summary: string;
  onRestart: () => void;
}

const Summary = ({ theme, summary, onRestart }: SummaryProps) => {
  return (
    <div className="w-full max-w-3xl mx-auto animate-fade-in">
      <Card className="glass overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
          <h1 className="text-3xl font-bold text-white">
            Resultado: {theme}
          </h1>
        </div>
        
        <CardContent className="p-8">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 text-green-700 rounded-full p-4">
              <CircleCheck className="h-12 w-12" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-center mb-6">
            Análise Concluída!
          </h2>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-lg leading-relaxed whitespace-pre-line">
              {summary}
            </p>
          </div>
          
          <div className="mt-10 flex justify-center">
            <Button 
              onClick={onRestart} 
              className="px-8 py-6 text-lg"
              size="lg"
            >
              Criar Novo Formulário
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Summary;
