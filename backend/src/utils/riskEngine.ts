import { IRule } from '../rules/rule.service';

export const calculateRiskScore = (transaction: any, rules: IRule[]): number => {
  let totalScore = 0;

  rules.forEach(rule => {
    // Basic logic evaluation (for demo purposes)
    // In a real system, this would be a more robust expression evaluator
    try {
      if (rule.name === 'Large Transaction' && transaction.amount > 5000) {
        totalScore += rule.weight;
      }
      if (rule.name === 'Rapid Sequence' && transaction.metadata?.recentCount > 5) {
        totalScore += rule.weight;
      }
      // Add more dummy logic matching the PRD examples
    } catch (e) {
      console.error(`Error evaluating rule ${rule.name}:`, e);
    }
  });

  return Math.min(totalScore, 100); // Cap at 100
};
