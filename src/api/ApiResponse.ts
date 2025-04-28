export default interface ApiResponse <T>{
    status: number;
    data?: T;
    dataError?: string;
    success: boolean;
}