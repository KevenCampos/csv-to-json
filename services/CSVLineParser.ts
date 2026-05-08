class CSVLineParser {
    content: string;

    constructor(content: string) {
        this.content = content;
    }

    public parse = () => {
        const linesWithoutHeader = this.content.split('\n').slice(1);
        const parsedLines = linesWithoutHeader.map(line => this.parseLine(line));
        return parsedLines;
    }
   
    private parseLine = (line: string) => {
       return {
            name: this.formatName(line),
            cpf: this.formatCPF(line),
            state: this.formatState(line)
        } 
    }

    /*
        Maisa
    */
    private formatName = (line: string) => {
        /**
         * Vamos pegar a parte do nome, que por via de regra é a primeira parte da linha, usando o pipe como separador
         * Usamos split('|') para dividir a linha em partes, e pegamos a primeira parte com index 0
         * Se por algum motivo não encontrar a parte do nome, retornamos uma string vazia
         */
        const namePart = line.split('|')[0]; 

        /**
         * Aqui, vamos remover os espaços extras no inicio e no final do nome usando a função trim()
         */
        const trimmed = namePart.trim(); 

        /**
         * Aqui, vamos substituir os múltiplos espaços entre as palavras por um único espaço usando uma expressão regular
         * E por fim, retornar o nome formatado
         */
        const formatted = trimmed.replace(/\s+/g, ' '); 
        return formatted;
    }

    /*
        Maria
    */
    private formatCPF = (line: string) => {

        // Através do pipe, vamos pegar a parte do CPF, que por via de regra é a segunda parte da linha (index 1)
        const cpfPart = line.split('|')[1] || '';
        
        // Vamos filtrar apenas os digitos do CPF, removendo tudo que não é número pra ter um padrão a ser trabalhado
        const digitsOnly = cpfPart.replace(/\D/g, '');

        /**
         * Vamos validar se o CPF tem 11 dígitos, que é o formato esperado.
         * Se não tiver, vamos logar um aviso e retornar o CPF original sem formatação, mas com espaços removidos.
         */
        if (digitsOnly.length !== 11) {
            console.warn(`CPF inválido encontrado: ${cpfPart}. Esperado 11 dígitos, mas encontrado ${digitsOnly.length}. Linha original: ${line}`);
            return cpfPart.trim(); // Retorna o CPF original sem formatação, mas com espaços removidos
        }

        /**
         Aqui formatamos no padrão nnn.nnn.nnn-nn como solicitado, 
         usando uma regex para inserir os pontos e o hífen nos lugares corretos
        */
        const formatted = digitsOnly.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        return formatted;
    }

    /*
        Elton
    */
    private formatState = (line: string) => {
        /**
         * Pega a parte após o último '|', que por via de regra é o estado
         * Usamos pop() para pegar a última parte, e trim() para remover espaços extras
         * E também usamos toLowerCase() para facilitar a comparação com o mapa de estados. 
         * Se por algum motivo não encontrar a parte do estado, retornamos uma string vazia.
         */
        const statePart = line.split('|').pop()?.trim().toLowerCase() || '';

        /**
         * Aqui nesse objeto temos o mapeamento dos nomes de estado e suas siglas
         * A chave está em minuscula porque usamos o toLowerCase() na comparação, e o valor é a sigla correspondente
         * Assim, quando formos formatar o estado, vamos comparar a parte do estado com as chaves desse mapa, e retornar a sigla correspondente 
         */
        const stateMap: Record<string, string> = {
            'acre': 'AC',
            'alagoas': 'AL',
            'amapá': 'AP',
            'amazonas': 'AM',
            'bahia': 'BA',
            'ceará': 'CE',
            'distrito federal': 'DF',
            'espírito santo': 'ES',
            'goiás': 'GO',
            'maranhão': 'MA',
            'mato grosso': 'MT',
            'mato grosso do sul': 'MS',
            'minas gerais': 'MG',
            'pará': 'PA',
            'paraíba': 'PB',
            'paraná': 'PR',
            'pernambuco': 'PE',
            'piauí': 'PI',
            'rio de janeiro': 'RJ',
            'rio grande do norte': 'RN',
            'rio grande do sul': 'RS',
            'rondônia': 'RO',
            'roraima': 'RR',
            'santa catarina': 'SC',
            'são paulo': 'SP',
            'sergipe': 'SE',
            'tocantins': 'TO',
        };

        /**
         * Aqui vamos retornar a sigla do estado usando o mapa
         * Caso não encontrar, vamos retornar a parte do estado original em maiúsculas
         */
        return stateMap[statePart] || statePart.toUpperCase();
    }
}

export default CSVLineParser;