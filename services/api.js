import { getAPIClient } from "./axios";

// API sem ctx, usar nas chamadas de browser
export const api = getAPIClient();
