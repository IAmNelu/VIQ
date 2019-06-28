// Definizione della classe Quartiere.
class Quartiere {
    constructor(nome) {
        this.nome = nome;
        this.CAP = [];
        this.reati = [];
        this.numeroInfrazioni = 0;
        this.colore = ""
    }

    getNome() { return this.nome; }
    getCAP() { return this.CAP; }
    getNumberInfrazioni() { return this.numeroInfrazioni; }
    addCAP(CAP) { this.CAP.push(CAP) }
    addReato(reato) { this.reati.push(reato); }
    addInfrazione(reato) { this.numeroInfrazioni += parseInt(reato["Numero Verbali"]); }
    getColore() { return this.colore; }
    setColore(color) { this.colore = color; }
}