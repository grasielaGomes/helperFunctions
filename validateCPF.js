function CPFValidation(cpf) {
  Object.defineProperty(this, "cleanedCPF", {
    get: function () {
      return cpf.replace(/[^\d]+/g, "");
    }
  });
}

CPFValidation.prototype.isValid = function () {
  if (typeof this.cleanedCPF !== "string") return false;
  if (this.cleanedCPF.length !== 11) return false;
  if (this.isSequency()) return false;

  const partialCPF = this.cleanedCPF.substring(0, 9);

  const firstDigit = this.getDigit(partialCPF);
  const secondDigit = this.getDigit(partialCPF + firstDigit);
  return this.cleanedCPF === partialCPF + firstDigit + secondDigit;
};

CPFValidation.prototype.getDigit = function (partialCPF) {
  const arrayCPF = partialCPF.split("");
  let regressiveIndex = arrayCPF.length + 1;
  const sum = arrayCPF.reduce((acc, curr) => {
    acc += parseInt(curr) * regressiveIndex;
    regressiveIndex--;
    return acc;
  }, 0);
  const rest = 11 - (sum % 11);
  return rest > 9 ? 0 : rest;
};

CPFValidation.prototype.isSequency = function () {
  return this.cleanedCPF[0].repeat(this.cleanedCPF.length) === this.cleanedCPF;
}

const cpf2 = new CPFValidation("705.484.450-52");
const cpf3 = new CPFValidation("222.222.222-22");


console.log(cpf2.isValid());
console.log(cpf3.isValid());
