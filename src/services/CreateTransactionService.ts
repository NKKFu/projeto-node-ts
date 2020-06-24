import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
import { uuid } from 'uuidv4';

interface Request {
  title: string,
  value: number,
  type: 'income' | 'outcome'
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    if (type === 'outcome' && this.transactionsRepository.getBalance().total < value)
      throw { message: 'Não é possível sacar a quantidade desejada' };

    const createdTransaction = this.transactionsRepository.create({ title, value, type });

    return createdTransaction;
  }
}

export default CreateTransactionService;
