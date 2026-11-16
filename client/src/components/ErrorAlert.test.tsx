import { render, screen } from "@testing-library/react";
import ErrorAlert from "@/components/ErrorAlert.tsx";

describe("ErrorAlert", () => {
  it("shows a static message", () => {
    render(<ErrorAlert message="Failed to load data" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Failed to load data");
  });

  it("shows the API error message from an Axios error", () => {
    const error = { response: { data: { error: "Email already in use" } } };
    render(<ErrorAlert error={error} fallback="Failed to save" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Email already in use");
  });

  it("falls back when the error has no API message", () => {
    render(<ErrorAlert error={new Error("Network Error")} fallback="Failed to save" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Failed to save");
  });
});
