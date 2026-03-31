export function calculateMonthlyPayment(
  principal: number,
  annualRate: number,
  months: number
): number {
  if (annualRate === 0) {
    return principal / months;
  }
  const monthlyRate = annualRate / 100 / 12;
  return (
    (principal * (monthlyRate * Math.pow(1 + monthlyRate, months))) /
    (Math.pow(1 + monthlyRate, months) - 1)
  );
}

export function generateAmortizationTable(
  principal: number,
  annualRate: number,
  monthlyPayment: number
): Array<{
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}> {
  const table = [];
  let balance = principal;
  const monthlyRate = annualRate / 100 / 12;
  let month = 1;

  while (balance > 0.01 && month <= 600) {
    const interest = balance * monthlyRate;
    const principalPaid = Math.min(monthlyPayment - interest, balance);
    balance = balance - principalPaid;

    table.push({
      month,
      payment: principalPaid + interest,
      principal: principalPaid,
      interest,
      balance: Math.max(0, balance),
    });

    month++;

    if (balance <= 0) break;
  }

  return table;
}

export function calculatePayoffMonths(
  balance: number,
  annualRate: number,
  monthlyPayment: number
): number {
  if (annualRate === 0) {
    return Math.ceil(balance / monthlyPayment);
  }
  const monthlyRate = annualRate / 100 / 12;
  if (monthlyPayment <= balance * monthlyRate) {
    return Infinity;
  }
  return Math.ceil(
    Math.log(monthlyPayment / (monthlyPayment - balance * monthlyRate)) /
      Math.log(1 + monthlyRate)
  );
}
