import axios from "axios";


// Extracts a human-readable error message from an Axios error or unknown error.
export function handleApiError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (error.response && error.response.data) {
      const apiError = error.response.data as { success: boolean; message: string; data: unknown };
      return apiError.message || "An unexpected error occurred.";
    }
    return error.message || "An unexpected network error occurred.";
  }

  return "An unknown error occurred.";
}
