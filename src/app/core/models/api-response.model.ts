export class ApiResponse {
    constructor (
        public code: number,
        public error: boolean,
        public message: string,
        public data: any
    ) {}
}