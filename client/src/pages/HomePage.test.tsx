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

  it("shows connected when the API and database are healthy", async () => {
    mockedAxios.get.mockResolvedValue({ data: { ok: true, uptimeSeconds: 12, database: "connected" } });
    renderWithQuery(<HomePage />);
    expect(await screen.findByText("connected (uptime 12s)")).toBeInTheDocument();
    expect(screen.getByText("connected")).toBeInTheDocument();
    expect(mockedAxios.get).toHaveBeenCalledWith("/api/health", expect.anything());
  });

  it("shows the database as unreachable when the API reports it down", async () => {
    mockedAxios.get.mockResolvedValue({ data: { ok: false, uptimeSeconds: 3, database: "unreachable" } });
    renderWithQuery(<HomePage />);
    expect(await screen.findByText("connected (uptime 3s)")).toBeInTheDocument();
    expect(screen.getByText("unreachable")).toBeInTheDocument();
  });

  it("shows an error when the API is unreachable", async () => {
    mockedAxios.get.mockRejectedValue(new Error("Network Error"));
    renderWithQuery(<HomePage />);
    expect(await screen.findByText("unreachable")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveTextContent("Could not reach the API");
  });
});
