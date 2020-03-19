import { Request, Response } from 'express';
import { Router } from 'express';
import { Controller } from '@/typings/controller.typing';
import { UsersService } from './users.service';
import { HttpStatus } from '@/common/enums/http-status.enum';

export class UsersController implements Controller {
  public router: Router = Router();
  public route: string = '/users';
  private usersService!: UsersService;

  constructor() {
    this.usersService = new UsersService();
    this.initRoutes();
  }

  /**
   * important: use .bind(this) in all methods that you use
   */
  public initRoutes() {
    this.router.get('/', this.index.bind(this));
    this.router.post('/', this.createUser.bind(this));
  }

  public index(req: Request, res: Response) {
    return res.json({ message: this.usersService.getAll() });
  }

  public async createUser({ body }: Request, res: Response) {
    try {
      const { code, message } = await this.usersService.save(body);
      res.status(code).json(message);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
  }
}
