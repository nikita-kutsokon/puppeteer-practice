import { Request, Response, NextFunction } from 'express';

const ErrorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(error)
    const errorResponse = {
        code: 500,
        name: 'Server error',
        message: error.message,
    };
    
    return res.status(500).json({ error: errorResponse });
};

export default ErrorHandler;