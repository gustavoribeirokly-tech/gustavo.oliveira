
import { MindMapNode } from './types';

export const mindMapData: MindMapNode = {
  name: "VARIAÇÃO DE HASTE DA SONDA NA TRA-75_02 ATINGINDO A CR-436 (TBSA)",
  children: [
    {
      name: "Descrição do Evento",
      children: [
        {
          name: "Local e Data",
          children: [
            { name: "Local: TRA-75_02, Juazeiro-BA" },
            { name: "Data/Hora: 15/12/2025, 08h20min" }
          ]
        },
        {
          name: "Ocorrência Principal",
          children: [
            { name: "Operador (José D. dos Santos Silva) limpava frente GAN-75-01" },
            { name: "Operava Carregadeira de pneus CR-436" },
            { name: "Manobra de ré na TRA-75_02" },
            { name: "Colisão com haste de sonda varada na galeria" },
            { name: "Dano: Parabrisa danificado, haste ultrapassou o vidro 30 cm" }
          ]
        },
        {
          name: "Classificação",
          children: [
            { name: "PG-5 (Danos Materiais)" },
            { name: "Atividade: Controlada" },
            { name: "Metodologia de Análise: Diagrama de Ishikawa, Árvore de Causas" }
          ]
        }
      ]
    },
    {
      name: "Causas Raiz (Análise 'Porquês')",
      children: [
        {
          name: "Causa Imediata: Colisão com Haste",
          children: [
            { name: "Haste estava suspensa no meio da galeria" },
            { name: "Carregadeira em manobra de ré em ponto operacional" }
          ]
        },
        {
          name: "Causa da Haste na Galeria (Perda de Confinamento)",
          children: [
            { name: "Perda de confinamento após desmonte" },
            { name: "Avanço da ferramenta da sonda (pescador) por dedução do sondador" },
            { name: "Furo (FVS-2230) atravessou frente desmontada (descontinuidade do maciço)" }
          ]
        },
        {
          name: "Causa de Programação (Falha de Validação)",
          children: [
            { name: "Programação de sondagem ajustada / incompleta (Complemento de furos)" },
            { name: "String do furo varado (FVS-2230) não enviada ao Planejamento para validação" },
            { name: "Ausência de protocolo formal (assinaturas/carimbo) para liberação" },
            { name: "Falha no processo de envio da string e liberação da programação" }
          ]
        },
        {
          name: "Fatores Humanos e Processuais",
          children: [
            { name: "Inexperiência do Geólogo Programador (45 dias em ambientação)" },
            { name: "Treinamento técnico insuficiente do programador" },
            { name: "Controle frágil de versões e validações cruzadas" },
            { name: "Furo atravessando frente carregada antes do desmonte" }
          ]
        }
      ]
    },
    {
      name: "Linha do Tempo (Eventos Críticos FVS-2230)",
      children: [
        {
          name: "10/Dez",
          children: [
            { name: "Envio incompleto da programação ao Planejamento (faltando 1 furo)" },
            { name: "Entrega da programação à Major antes da validação do Planejamento" }
          ]
        },
        {
          name: "11/Dez",
          children: [
            { name: "Planejamento valida programação (considerando apenas 4 furos)" }
          ]
        },
        {
          name: "12/Dez",
          children: [
            { name: "Furo FVS-2230 embocado" },
            { name: "Furo atravessava região com explosivo (frente carregada)" }
          ]
        },
        {
          name: "13/Dez",
          children: [
            { name: "Desmonte da TRA-75_02 no final do turno (interceptou o furo)" },
            { name: "Sonda parou por falta d'água (48,22 m de profundidade)" }
          ]
        },
        {
          name: "15/Dez (Dia do Acidente)",
          children: [
            { name: "00h-06h: Tentativa de saque do tubo interno sem sucesso" },
            { name: "00h-06h: Haste quebrada e barrilete identificados no furo" },
            { name: "06h-12h: Tentativa de pesca (inseridos 15m adicionais)" },
            { name: "06h-12h: Hastes arqueadas na galeria" },
            { name: "08h20min: Colisão da Carregadeira com haste suspensa" }
          ]
        }
      ]
    },
    {
      name: "Ações Imediatas",
      children: [
        { name: "Comunicação à liderança (ERO, TBSA)" },
        { name: "Segurança do Trabalho informada imediatamente" },
        { name: "Local preservado" },
        { name: "Registro fotográfico (Equipe Geologia e Segurança ERO)" },
        { name: "Bafometria e Toxicológico (Envolvidos Major Drilling e Toniolo)" }
      ]
    },
    {
      name: "Outras Ocorrências de Varação (Visão Consolidada)",
      children: [
        { name: "Total de 12 ocorrências registradas" },
        { name: "Natureza predominante: Varação de furo de sondagem" },
        { name: "3 registros classificados como Quase Acidente" },
        { name: "Ambiente Crítico: Galerias e níveis operacionais ativos" },
        { name: "Risco Associado: Interferência operacional, dano a ativos" }
      ]
    }
  ]
};
