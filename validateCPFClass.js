class CPF {
  constructor(input) {
    this.cpf = input.replace(/[^\d]+/g, "");
  }

  isValid() {
    if (typeof this.cpf !== "string") return false;
    if (this.cpf.length !== 11) return false;
    if (this.isSequency()) return false;

    const partialCPF = this.cpf.substring(0, 9);

    const firstDigit = this.getDigit(partialCPF);
    const secondDigit = this.getDigit(partialCPF + firstDigit);
    return this.cpf === partialCPF + firstDigit + secondDigit;
  }
  getDigit(partialCPF) {
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

const cpf = new CPF("705.484.450-52");
const cpf2 = new CPF("222.222.222-22");

console.log(cpf.isValid());
console.log(cpf2.isValid());
