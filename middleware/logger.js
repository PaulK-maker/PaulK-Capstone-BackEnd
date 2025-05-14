
export const logger = (req, res, next) => {
    const now = new Date().toISOString();
    const method = req.method;
    const url = req.url;
    const status = res.statusCode;
    console.log(`[${now}] ${method} ${url} ${status}`);
    next();
};