import { ErrorResponseSchema } from "../../fixtures/api/schemas";
import { ErrorResponse } from "../../fixtures/api/types-guards";
import { test, expect } from "../../fixtures/pom/test-options";
import invalidCredentials from "../../test-data/invalidCredentials.json";

test.describe("Verify API Validation for Log In / Sign Up", () => {
  test(
    "Verify API Validation for Log In",
    { tag: "@Api" },
    async ({ apiRequest }) => {
      const { status, body } = await apiRequest<ErrorResponse>({
        method: "POST",
        url: "User/Authentication",
        baseUrl: process.env.API_URL,
        body: {
          email: invalidCredentials.invalidEmails[2],
          password: invalidCredentials.invalidPasswords[2],
        },
      });

      expect(status).toBe(400);
      expect(ErrorResponseSchema.parse(body)).toBeTruthy();
    }
  );
});
