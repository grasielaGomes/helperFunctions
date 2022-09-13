class CadastroPessoaFisica {
  cpf: string;
  
  constructor(input: string) {
    this.cpf = input.replace(/[^\d]+/g, "");
  }

  isValid() {
    if (this.cpf.length !== 11) return false;
    if (this.isSequency()) return false;

    const partialCPF = this.cpf.substring(0, 9);
    const firstDigit = this.getDigit(partialCPF);
    const secondDigit = this.getDigit(partialCPF + firstDigit);
    
    return this.cpf === partialCPF + firstDigit + secondDigit;
  }
  getDigit(partialCPF: string) {
    const arrayCPF = partialCPF.split("");
    let regressiveIndex = arrayCPF.length + 1;
    const sum = arrayCPF.reduce((acc, curr) => {
      acc += parseInt(curr) * regressiveIndex;
      regressiveIndex--;
      return acc;
    }, 0);
    const rest = 11 - (sum % 11);
    return rest > 9 ? 0 : rest;
  }
  isSequency() {
    return this.cpf[0].repeat(this.cpf.length) === this.cpf;
  }
}

const userCPF = new CadastroPessoaFisica("705.484.450-52");
const userCPF2 = new CadastroPessoaFisica("222.222.222-22");

console.log(userCPF.cpf);
console.log(userCPF.isValid());
console.log(userCPF2.isValid());
