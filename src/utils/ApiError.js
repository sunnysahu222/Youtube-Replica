class ApiError extends Error{
    constructor(msg ="something went wrong ", status = 400, data = {}, errors = [],stack = ""){
        super(msg),
        this.status = status,
        this.data  = null ,
        this.errors = errors ,
        this.success = false
    }
}
export {ApiError}