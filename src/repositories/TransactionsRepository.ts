import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    // TODO
    return this.transactions;
  }

  public getBalance(): Balance {
    // TODO
    const income: number = this.transactions
      .filter(transaction => transaction.type === 'income')
      .map(transaction => transaction.value)
      .reduce(function (a, b) { return a + b; }, 0);

    const outcome: number = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .map(transaction => transaction.value)
      .reduce(function (a, b) { return a + b; }, 0);

    const total: number = income - outcome;

    const balance: Balance = {
      income,
      outcome,
      total,
    }

    return balance;
  }

  public create({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    const createdTransaction = new Transaction({ title, value, type });
    
    this.transactions.push(createdTransaction);

    return createdTransaction;
  }
}

export default TransactionsRepository;
