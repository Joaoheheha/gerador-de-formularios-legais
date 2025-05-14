
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CircleCheck } from "lucide-react";

interface IntroductionProps {
  theme: string;
  introduction: string;
  onStart: () => void;
}

const Introduction = ({ theme, introduction, onStart }: IntroductionProps) => {
  return (
    <div className="w-full max-w-3xl mx-auto animate-fade-in">
      <Card className="glass overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
          <h1 className="text-3xl font-bold text-white">
            Introdução: {theme}
          </h1>
        </div>
        
        <CardContent className="p-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-lg leading-relaxed whitespace-pre-line">
              {introduction}
            </p>
          </div>
          
          <div className="mt-10 flex justify-center">
            <Button 
              onClick={onStart} 
              className="px-8 py-6 text-lg group"
              size="lg"
            >
              Iniciar Questionário
              <CircleCheck className="ml-2 h-5 w-5 transition-transform group-hover:scale-110" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Introduction;
