
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { Search } from "lucide-react";

interface FormConfigProps {
  onSubmit: (config: {
    theme: string;
    pages: number;
    options: number;
  }) => void;
}

const FormConfig = ({ onSubmit }: FormConfigProps) => {
  const [theme, setTheme] = useState("");
  const [pages, setPages] = useState(3);
  const [options, setOptions] = useState(4);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!theme.trim()) {
      toast({
        title: "Tema necessário",
        description: "Por favor, insira um tema para as questões.",
        variant: "destructive",
      });
      return;
    }
    onSubmit({ theme, pages, options });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="glass p-8 rounded-2xl w-full max-w-lg mx-auto animate-fade-in"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gradient">
          Gerador de Formulários
        </h1>
        <p className="text-gray-600">
          Configure seu formulário personalizado para ser gerado por IA.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="theme" className="text-lg font-medium">
            Tema das questões
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
            <Input
              id="theme"
              placeholder="Ex: Inteligência Artificial, Sustentabilidade, etc."
              className="pl-10"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="pages" className="text-lg font-medium">
              Número de questões
            </Label>
            <span className="text-xl font-semibold text-primary">{pages}</span>
          </div>
          <Slider
            id="pages"
            defaultValue={[3]}
            min={1}
            max={10}
            step={1}
            onValueChange={(value) => setPages(value[0])}
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>1</span>
            <span>5</span>
            <span>10</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="options" className="text-lg font-medium">
              Alternativas por questão
            </Label>
            <span className="text-xl font-semibold text-primary">{options}</span>
          </div>
          <Slider
            id="options"
            defaultValue={[4]}
            min={2}
            max={6}
            step={1}
            onValueChange={(value) => setOptions(value[0])}
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>2</span>
            <span>4</span>
            <span>6</span>
          </div>
        </div>

        <Button type="submit" className="w-full text-lg py-6" size="lg">
          Gerar Formulário
        </Button>
      </div>
    </form>
  );
};

export default FormConfig;
