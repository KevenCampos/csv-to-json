class CSVLineParser {
    content: string;

    constructor(content: string) {
        this.content = content;
    }

    public parse = () => {
        const lines = this.content.split("\n");
        const parsedLines = lines.map(line => this.parseLine(line));
        return parsedLines;
    }

    private parseLine = (line: string) => {
       return {
            name: this.formatName(line),
            cpf: this.formatCPF(line),
            state: this.formatState(line)
        } 
    }

    private formatName = (line: string) => {
        console.log(line)
        return "TODO: Formatar o nome"
    }

    private formatCPF = (line: string) => {
        return "TODO: Formatar o CPF"
    }

    private formatState = (line: string) => {
        return "TODO: Formatar o estado"
    }
}

export default CSVLineParser;