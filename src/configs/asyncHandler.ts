const asyncHandler = (handler: Function) => {
    return (req: any, res: any, next: any) => {
      return handler(req, res, next).catch(next);
    };
}

export default asyncHandler