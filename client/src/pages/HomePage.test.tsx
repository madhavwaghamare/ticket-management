import { screen } from "@testing-library/react";
import axios from "axios";
import HomePage from "@/pages/HomePage.tsx";
import { renderWithQuery } from "@/test/render.tsx";

vi.mock("axios");
const mockedAxios = vi.mocked(axios, { deep: true });

describe("HomePage", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it("shows connected when the API is healthy", async () => {
    mockedAxios.get.mockResolvedValue({ data: { ok: true, uptimeSeconds: 12 } });
    renderWithQuery(<HomePage />);
    expect(await screen.findByText("connected (uptime 12s)")).toBeInTheDocument();
    expect(mockedAxios.get).toHaveBeenCalledWith("/api/health");
  });

  it("shows an error when the API is unreachable", async () => {
    mockedAxios.get.mockRejectedValue(new Error("Network Error"));
    renderWithQuery(<HomePage />);
    expect(await screen.findByText("unreachable")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveTextContent("Could not reach the API");
  });
});
