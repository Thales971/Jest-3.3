// avancado.test.js
const {
  ehPalindromo,
  contarVogais,
  calcularFatorial,
  removerDuplicatas,
  agendarConsulta,
  formatarMoeda,
  validarCpfBasico,
  calcularIngresso,
  ContaBancaria,
  obterClima
} = require('./avancado');

describe('🚀 Suíte de Testes Unitários Avançados - Parte 2', () => {

  // 1. Palíndromo
  test('1. ehPalindromo: deve validar palavras de trás para frente ignorando maiúsculas', () => {
    expect(ehPalindromo('radar')).toBe(true);
    expect(ehPalindromo('Arara')).toBe(true);
    expect(ehPalindromo('javascript')).toBe(false);
    expect(ehPalindromo('')).toBe(false);
  });

  // 2. Contador de Vogais
  test('2. contarVogais: deve contar vogais com acentos e retornar 0 para palavras sem vogais', () => {
    expect(contarVogais('computador')).toBe(4);
    expect(contarVogais('programação')).toBe(5);
    expect(contarVogais('xyz')).toBe(0);
  });

  // 3. Fatorial com Exceção
  test('3. calcularFatorial: deve calcular fatoriais positivos e lançar erro para número negativo', () => {
    expect(calcularFatorial(5)).toBe(120);
    expect(calcularFatorial(0)).toBe(1);
    expect(calcularFatorial(1)).toBe(1);
    expect(() => calcularFatorial(-5)).toThrow('Não existe fatorial de número negativo');
  });

  // 4. Remover Duplicatas (toEqual para arrays)
  test('4. removerDuplicatas: deve retornar array contendo apenas valores únicos', () => {
    expect(removerDuplicatas([1, 1, 2, 3, 3, 4])).toEqual([1, 2, 3, 4]);
    expect(removerDuplicatas(['a', 'b', 'a'])).toEqual(['a', 'b']);
  });

  // 5. Validador de Agendamento (new Date)
  test('5. agendarConsulta: deve aprovar agendamento em dia útil e barrar em finais de semana', () => {
    const dataSegundaFeira = new Date(2026, 9, 26); // Segunda-feira
    const dataSabado = new Date(2026, 9, 24);       // Sábado
    const dataDomingo = new Date(2026, 9, 25);      // Domingo

    expect(agendarConsulta(dataSegundaFeira)).toBe('Consulta agendada com sucesso');
    expect(() => agendarConsulta(dataSabado)).toThrow('Clínica fechada aos finais de semana');
    expect(() => agendarConsulta(dataDomingo)).toThrow('Clínica fechada aos finais de semana');
  });

  // 6. Formatador de Moeda
  test('6. formatarMoeda: deve formatar números para padrão R$ com vírgula e tratar valores inválidos', () => {
    expect(formatarMoeda(100)).toBe('R$ 100,00');
    expect(formatarMoeda(15.5)).toBe('R$ 15,50');
    expect(() => formatarMoeda('abc')).toThrow('Valor inválido');
  });

  // 7. Validador de CPF Básico
  test('7. validarCpfBasico: deve validar tamanho de 11 dígitos e barrar CPFs com dígitos repetidos', () => {
    expect(validarCpfBasico('12345678901')).toBe(true);
    expect(validarCpfBasico('123.456.789-01')).toBe(true); // Com máscara
    expect(validarCpfBasico('11111111111')).toBe(false);   // Todos iguais
    expect(validarCpfBasico('12345')).toBe(false);         // Curto
  });

  // 8. Cálculo de Ingresso com Regras Não Cumulativas
  test('8. calcularIngresso: deve calcular meia-entrada (R$ 20) para estudante, idoso ou quarta-feira', () => {
    expect(calcularIngresso(25, false, 1)).toBe(40); // Inteira normal (segunda)
    expect(calcularIngresso(20, true, 1)).toBe(20);  // Estudante (segunda)
    expect(calcularIngresso(65, false, 1)).toBe(20); // Idoso (segunda)
    expect(calcularIngresso(25, false, 3)).toBe(20); // Quarta-feira (qualquer um)
    expect(calcularIngresso(70, true, 3)).toBe(20);  // Idoso + Estudante + Quarta (não acumula, máx 50%)
  });

  // 9. Classe ContaBancaria com beforeEach
  describe('9. Suíte da Classe ContaBancaria (Isolamento com beforeEach)', () => {
    let conta;

    beforeEach(() => {
      // Garante uma conta zerada e isolada para CADA teste abaixo
      conta = new ContaBancaria('Felipe Mamprim');
    });

    test('deve iniciar com saldo zero', () => {
      expect(conta.obterSaldo()).toBe(0);
    });

    test('deve depositar valor positivo e atualizar o saldo', () => {
      conta.depositar(150);
      expect(conta.obterSaldo()).toBe(150);
    });

    test('deve lançar erro ao tentar depositar valor menor ou igual a zero', () => {
      expect(() => conta.depositar(-50)).toThrow('Valor de depósito deve ser positivo');
    });

    test('deve sacar com sucesso quando houver saldo suficiente', () => {
      conta.depositar(200);
      conta.sacar(80);
      expect(conta.obterSaldo()).toBe(120);
    });

    test('deve lançar erro de saldo insuficiente ao tentar sacar mais do que possui', () => {
      conta.depositar(50);
      expect(() => conta.sacar(100)).toThrow('Saldo insuficiente');
    });
  });

  // 10. Consulta de Clima com Mock Assíncrono (jest.fn())
  describe('10. Suíte de Clima Assíncrono com Mock de API', () => {
    test('deve retornar mensagem formatada com temperatura quando o mock responder com sucesso', async () => {
      const servicoMock = {
        buscar: jest.fn().mockResolvedValue({ temperatura: 28 })
      };

      const resultado = await obterClima('São Paulo', servicoMock);

      expect(resultado).toBe('A temperatura em São Paulo é de 28°C');
      expect(servicoMock.buscar).toHaveBeenCalledWith('São Paulo');
      expect(servicoMock.buscar).toHaveBeenCalledTimes(1);
    });

    test('deve lançar erro tratado quando o serviço de clima falhar', async () => {
      const servicoMockComFalha = {
        buscar: jest.fn().mockRejectedValue(new Error('Network Offline'))
      };

      await expect(obterClima('Curitiba', servicoMockComFalha))
        .rejects
        .toThrow('Falha ao buscar dados climáticos');
    });
  });
});