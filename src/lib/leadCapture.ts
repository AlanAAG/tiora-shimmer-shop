type SupabaseInsertResult = {
  error: {
    code?: string;
    message?: string;
  } | null;
};

export const isDuplicateLeadError = (result: PromiseSettledResult<SupabaseInsertResult>) =>
  result.status === "fulfilled" && result.value.error?.code === "23505";

export const isRlsInsertError = (result: PromiseSettledResult<SupabaseInsertResult>) =>
  result.status === "fulfilled" && result.value.error?.code === "42501";

export const hasBlockingSupabaseError = (result: PromiseSettledResult<SupabaseInsertResult>) =>
  result.status === "rejected" ||
  (result.status === "fulfilled" &&
    !!result.value.error &&
    !isDuplicateLeadError(result) &&
    !isRlsInsertError(result));