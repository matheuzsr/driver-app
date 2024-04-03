import { BusinessError } from './BusinessError';


export class PermissionError extends BusinessError {
  constructor(message: string) {
    super(message);
    this.name = 'PermissionError';
  }
}
