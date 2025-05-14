
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowUp, ArrowDown, CircleCheck } from "lucide-react";

export interface QuestionData {
  id: number;
  question: string;
  options: string[];
}

interface QuestionProps {
  data: QuestionData;
  currentPage: number;
  totalPages: number;
  onAnswer: (questionId: number, selectedOption: string) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const Question = ({
  data,
  currentPage,
  totalPages,
  onAnswer,
  onNext,
  onPrevious,
}: QuestionProps) => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleChange = (value: string) => {
    setSelected(value);
    onAnswer(data.id, value);
  };

  return (
    <div className="w-full max-w-3xl mx-auto animate-fade-in">
      <Card className="glass overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-medium text-white">
              Questão {currentPage} de {totalPages}
            </h2>
            <div className="bg-white/20 rounded-full px-3 py-1">
              <span className="text-white text-sm font-medium">{Math.floor((currentPage / totalPages) * 100)}%</span>
            </div>
          </div>
        </div>

        <CardContent className="p-8">
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-6">{data.question}</h3>
            
            <RadioGroup
              onValueChange={handleChange}
              className="space-y-4"
            >
              {data.options.map((option, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-2 p-4 rounded-lg border hover:border-primary transition-all duration-200 cursor-pointer"
                >
                  <RadioGroupItem
                    value={option}
                    id={`option-${data.id}-${index}`}
                    className="mt-1"
                  />
                  <Label
                    htmlFor={`option-${data.id}-${index}`}
                    className="flex-grow cursor-pointer text-base leading-relaxed"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={onPrevious}
              disabled={currentPage === 1}
              className="flex items-center gap-2"
            >
              <ArrowDown className="h-4 w-4" />
              Anterior
            </Button>

            <Button
              onClick={onNext}
              disabled={!selected}
              className="flex items-center gap-2"
            >
              {currentPage === totalPages ? (
                <>
                  Finalizar
                  <CircleCheck className="h-4 w-4" />
                </>
              ) : (
                <>
                  Próxima
                  <ArrowUp className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Question;
