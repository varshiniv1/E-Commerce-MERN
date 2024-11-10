import { transactionService } from '../services';
import { Transaction } from '../models/transaction';
const transactionController = {
  async addTransaction(req, res, next) {
    try {
      const data = await transactionService.addTransaction(req);
      res.json(data);
    } catch (error) {
      next(error);
    }
  },
};

export default transactionController;
