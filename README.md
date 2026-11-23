# 🚀 Atividade 3.3 - Testes Avançados no Jest

Projeto desenvolvido para a **Atividade 3.3 - Exercícios Jest (Parte 2): Desafios Avançados com Regex, Classes e Mocks**.

## 📋 O que foi implementado

O arquivo `avancado.js` contém as 10 funções e classes exigidas pela atividade:

| # | Função / Classe | Recurso testado |
|---|-----------------|-----------------|
| 1 | `ehPalindromo` | Palíndromo ignorando maiúsculas e espaços |
| 2 | `contarVogais` | **Regex** `/[aeiouáéíóúâêôãõ]/gi` |
| 3 | `calcularFatorial` | Tratamento de exceção para números negativos |
| 4 | `removerDuplicatas` | `Set` + matcher `.toEqual()` para arrays |
| 5 | `agendarConsulta` | **Objeto `Date`** (`.getDay()`), bloqueio de finais de semana |
| 6 | `formatarMoeda` | Formato brasileiro `R$ X,XX` + erro para valores inválidos |
| 7 | `validarCpfBasico` | **Regex** `/\D/g`, validação de 11 dígitos e repetidos |
| 8 | `calcularIngresso` | Meia-entrada não cumulativa (estudante, idoso, quarta-feira) |
| 9 | `ContaBancaria` | **Classe POO** com isolamento via `beforeEach()` |
| 10 | `obterClima` | **Mock assíncrono** `jest.fn()` com `mockResolvedValue` e `mockRejectedValue` |

## 🧪 Como rodar os testes

### 1. Instalar dependências
```bash
npm install
```

### 2. Executar a suíde de testes
```bash
npm test
```

Ou diretamente com Jest:
```bash
npx jest --verbose
```

### Resultado esperado
```
Test Suites: 1 passed, 1 total
Tests:       15 passed, 15 total
Snapshots:   0 total
Time:        ~1 s
```

## 📂 Estrutura do projeto

```
jest-3.3/
├── .gitignore
├── README.md
├── package.json
├── package-lock.json
├── avancado.js          # Código de produção (10 funções/classes)
├── avancado.test.js     # Suíte de testes Jest (15 testes)
└── node_modules/
```

## 🛠️ Principais conceitos aplicados

- **Regex**: validação de vogais acentuadas e limpeza de CPF (`/\D/g`)
- **Datas**: `new Date().getDay()` para regras de dias úteis
- **Exceções**: `.toThrow()` com arrow function para capturar erros
- **Arrays**: `.toEqual()` para comparação profunda de arrays
- **POO + `beforeEach()`**: instância virgem da classe `ContaBancaria` a cada teste (princípio Independent do F.I.R.S.T.)
- **Mocks assíncronos**: `jest.fn().mockResolvedValue()` e `.mockRejectedValue()` com `async/await` e `.rejects.toThrow()`

## 📤 Entrega

1. Tire um **screenshot** do terminal com todos os testes passando (`PASS`).
2. Suba os arquivos `avancado.js` e `avancado.test.js` no seu repositório GitHub.
3. Envie o screenshot e o link do repositório no Google Classroom.