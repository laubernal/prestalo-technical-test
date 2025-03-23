import {LoanApplication} from "@/types/loanApplication";
import {Offer} from "@/types/offer";
import {LoanApplicationResponse} from "@/types/loanApplicationResponse";
import {ApiResponse} from "@/types/apiResponse";
import {HttpMethods} from "@/types/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const fetchLoanApplications = async (): Promise<LoanApplicationResponse[]> => {
    try {
        const response: Response = await fetch(`${API_URL}/loans`, {method: HttpMethods.GET})

        const apiResponse: ApiResponse = await response.json();

        return apiResponse.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Error fetching requests");
    }
}

export const createLoanApplication = async (loanApplication: LoanApplication): Promise<Offer[]> => {
    try {
        const response: Response = await fetch(`${API_URL}/loans`, {
            method: HttpMethods.POST,
            body: JSON.stringify(loanApplication),
            headers: {
                'Content-Type': 'application/json',
            }
        })

        const apiResponse: ApiResponse = await response.json();

        return apiResponse.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Error fetching requests");
    }
}