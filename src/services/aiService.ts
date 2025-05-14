
// Este é um serviço simulado para gerar conteúdo via IA
// Em uma aplicação real, você conectaria com uma API de IA como OpenAI

interface FormConfig {
  theme: string;
  pages: number;
  options: number;
}

export interface Question {
  id: number;
  question: string;
  options: string[];
}

export interface FormContent {
  introduction: string;
  questions: Question[];
}

// Função para simular um atraso na resposta da API
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const generateFormContent = async (config: FormConfig): Promise<FormContent> => {
  // Simulando um atraso para parecer que está fazendo uma chamada API
  await delay(2000);
  
  // Exemplos genéricos baseados no tema fornecido
  const introduction = `Bem-vindo a este questionário sobre "${config.theme}"!
  
Este formulário foi elaborado para explorar diversos aspectos relacionados a ${config.theme}. As questões a seguir abordarão conceitos fundamentais, tendências atuais e perspectivas futuras sobre este tema fascinante.

Ao responder as perguntas, reflita sobre seu conhecimento e opiniões pessoais. Não há respostas certas ou erradas - o objetivo é provocar reflexão e proporcionar uma análise personalizada ao final.

Prepare-se para uma jornada de descobertas sobre ${config.theme}!`;

  // Gera questões baseadas no tema
  const questions: Question[] = [];
  const questionTemplates = [
    `Qual é a sua opinião sobre o impacto de ${config.theme} na sociedade moderna?`,
    `Como você avalia a relação entre ${config.theme} e a sustentabilidade?`,
    `De que forma ${config.theme} influencia seu cotidiano?`,
    `Quais desafios você acredita que ${config.theme} enfrentará no futuro?`,
    `Como você vê a evolução de ${config.theme} nos próximos 10 anos?`,
    `Qual aspecto de ${config.theme} você considera mais relevante?`,
    `Como ${config.theme} se relaciona com questões de inclusão e diversidade?`,
    `Quais tecnologias você acredita que transformarão ${config.theme}?`,
    `Como você descreveria o estado atual de ${config.theme} em uma palavra?`,
    `Que mudanças em ${config.theme} você gostaria de ver implementadas?`
  ];

  for (let i = 0; i < config.pages; i++) {
    const questionIndex = i % questionTemplates.length;
    const options = [];
    
    // Gera opções para cada questão
    const optionTemplates = [
      `${config.theme} tem um impacto predominantemente positivo.`,
      `${config.theme} apresenta desafios significativos que precisam ser abordados.`,
      `${config.theme} está em constante evolução e adaptação.`,
      `${config.theme} requer maior atenção e investimento.`,
      `${config.theme} é fundamental para o desenvolvimento sustentável.`,
      `${config.theme} tem potencial inexplorado para transformação social.`
    ];
    
    for (let j = 0; j < config.options; j++) {
      const optionIndex = j % optionTemplates.length;
      options.push(optionTemplates[optionIndex]);
    }
    
    questions.push({
      id: i + 1,
      question: questionTemplates[questionIndex],
      options: options
    });
  }
  
  return { introduction, questions };
};

export const generateSummary = async (theme: string, answers: Record<number, string>): Promise<string> => {
  // Simulando um atraso para parecer que está processando
  await delay(2000);
  
  // Cria um resumo genérico baseado no tema e no número de respostas
  const answersCount = Object.keys(answers).length;
  
  return `Obrigado por completar este questionário sobre "${theme}"!

Baseado em suas ${answersCount} respostas, percebemos que você tem uma perspectiva interessante sobre ${theme}. Suas escolhas refletem uma compreensão nuançada deste tema e suas implicações.

Você demonstrou particular interesse em aspectos relacionados à evolução e ao impacto social de ${theme}, sugerindo uma visão equilibrada que considera tanto os benefícios quanto os desafios inerentes a este campo.

Algumas das alternativas que você selecionou indicam uma preferência por abordagens inovadoras e sustentáveis, o que é especialmente relevante no contexto atual de rápidas transformações tecnológicas e preocupações ambientais.

Esperamos que este questionário tenha proporcionado uma oportunidade de reflexão sobre ${theme} e talvez tenha apresentado novas perspectivas para você considerar.

Continue explorando este fascinante tema!`;
};
