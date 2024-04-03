import { BusinessError } from './BusinessError';


export class InfraError extends BusinessError {
  constructor(message: string) {
    super(message);
    this.name = 'InfraError';
  }
}
