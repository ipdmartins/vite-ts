import { vi } from "vitest";
import apiConnection from "../../../services/apiCon";
import postNewActivation from "../apiDataManager/postNewActivation";

vi.mock("../../../../services/apiCon", () => ({
  default: {
    post: vi.fn(),
  },
}));

describe("postNewActivation", () => {
  it("calls the correct API endpoint with the email payload", async () => {
    const mockResponse = { data: { success: true } };

    (apiConnection.post as ReturnType<typeof vi.fn>).mockResolvedValueOnce(
      mockResponse
    );

    const email = "test@example.com";
    const result = await postNewActivation(email);

    expect(apiConnection.post).toHaveBeenCalledWith("/activateAccount", {
      email,
    });
    expect(result).toEqual(mockResponse.data);
  });

  it("handles API errors gracefully", async () => {
    const mockError = new Error("Network Error");
    (apiConnection.post as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      mockError
    );

    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const email = "test@example.com";
    const result = await postNewActivation(email);

    expect(result).toBeUndefined();
    expect(consoleSpy).toHaveBeenCalledWith(mockError);
    consoleSpy.mockRestore();
  });
});
