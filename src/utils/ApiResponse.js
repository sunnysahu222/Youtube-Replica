class ApiResponse {
    constructor(statuscode, data, message = "success"){
        this.message =message,
        this.statuscode = statuscode,
        this.data = null,
        this.status = statuscode < 400
    }
}
export {ApiResponse};