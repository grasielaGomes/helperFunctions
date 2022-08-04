const cleanCPF = (cpf: string): string => {
  return cpf.replace(/\D+/g, "");
};

const isSequential = (cpf: string): boolean => {
  return cpf[0].repeat(11) === cpf;
};

const getDigit = (partialCpf: string): number => {
  let regressiveIndex = partialCpf.length + 1;
  const sum: number = Array.from(partialCpf).reduce(
    (acc: number, curr: string) => {
      acc += parseInt(curr) * regressiveIndex;
      regressiveIndex--;
      return acc;
    },
    0
  );
  const rest = 11 - (sum % 11);
  return rest > 9 ? 0 : rest;
};

const isValidCPF = (cpf: string): boolean => {
  const cleanedCPF = cleanCPF(cpf);
  if (cleanedCPF.length !== 11) return false;
  if (typeof cleanedCPF !== "string") return false;
  if (isSequential(cleanedCPF)) return false;

  const parcialCPF = cleanedCPF.slice(0, -2);
  const firstDigit = getDigit(parcialCPF);
  const secondDigit = getDigit(parcialCPF + firstDigit);

  return cleanedCPF === `${parcialCPF}${firstDigit}${secondDigit}`;
};


console.log(isValidCPF("111.111.111-11"));
console.log(isValidCPF("705.484.450-52"));
console.log(isValidCPF("705.484.450-51"));
