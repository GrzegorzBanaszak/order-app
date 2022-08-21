import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { MongoError } from 'mongodb';

@Catch()
export class MongoExeptionFilter implements ExceptionFilter {
    catch(exception: MongoError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        /**
         * @description Exception json response
         * @param message
         */
        const responseMessage = (message: string) => {
            response.status(status).json({
                statusCode: status,
                errorMessage: message,
            });
        };

        switch (exception.code) {
            case 11000:
                responseMessage('Email is occupied');
                break;
            default:
                responseMessage(exception.message);
                break;
        }
    }
}
