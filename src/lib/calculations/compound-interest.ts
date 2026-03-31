export function calculateCompoundInterest(
  principal: number,
  annualRate: number,
  years: number,
  monthlyContribution: number
): Array<{
  year: number;
  balance: number;
  contributed: number;
  interest: number;
}> {
  const result = [];
  const monthlyRate = annualRate / 100 / 12;
  let balance = principal;
  let totalContributed = principal;

  for (let year = 1; year <= years; year++) {
    for (let month = 1; month <= 12; month++) {
      balance = balance * (1 + monthlyRate) + monthlyContribution;
      totalContributed += monthlyContribution;
    }

    result.push({
      year,
      balance: Math.round(balance * 100) / 100,
      contributed: Math.round(totalContributed * 100) / 100,
      interest: Math.round((balance - totalContributed) * 100) / 100,
    });
  }

  return result;
}
