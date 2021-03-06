import { UseInterceptors, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance  } from 'class-transformer';

interface ClassContructor {
    new (...args: any[]): {}
}
export function Serialize(dto: ClassContructor) {
    return UseInterceptors(new SerializeInterceptor(dto))
} 

export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: ClassContructor) {

    }

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {       
        return next.handle().pipe(
            map((data: any) => plainToInstance(this.dto, data, { excludeExtraneousValues: true }))
        );
    }
}