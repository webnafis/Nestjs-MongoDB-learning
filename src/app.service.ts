import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getResponse(): string {
    return 'Ahlan! from nest_mongodb api';
  }
}
