import { render, screen } from "@testing-library/react";
import ErrorMessage from "@/components/ErrorMessage.tsx";

describe("ErrorMessage", () => {
  it("renders the message", () => {
    render(<ErrorMessage message="Name is required" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Name is required");
  });

  it("renders nothing without a message", () => {
    const { container } = render(<ErrorMessage />);
    expect(container).toBeEmptyDOMElement();
  });
});
