// @vitest-environment jsdom
import type { ColumnDef } from "@tanstack/react-table";
import { fireEvent, render, screen } from "@testing-library/react";
import { DataTable } from "./data-table";

type Model = { model: string; company: string };

const columns: ColumnDef<Model>[] = [
  { accessorKey: "model", header: "Model" },
  { accessorKey: "company", header: "Company" },
];

const data: Model[] = [
  { model: "GPT-4o", company: "OpenAI" },
  { model: "Claude Sonnet", company: "Anthropic" },
  { model: "Gemini Flash", company: "Google" },
];

describe("DataTable", () => {
  it("renders the title, headers and every row", () => {
    render(<DataTable title="Models" columns={columns} data={data} />);

    expect(screen.getByRole("heading", { name: "Models" })).toBeInTheDocument();
    expect(screen.getByText("Company")).toBeInTheDocument();
    expect(screen.getByText("GPT-4o")).toBeInTheDocument();
    expect(screen.getByText("Claude Sonnet")).toBeInTheDocument();
    expect(screen.getByText("Gemini Flash")).toBeInTheDocument();
  });

  it("fuzzy-filters rows across all columns", () => {
    render(<DataTable title="Models" columns={columns} data={data} />);

    fireEvent.change(screen.getByPlaceholderText("Search all columns..."), {
      target: { value: "anthro" },
    });

    expect(screen.getByText("Claude Sonnet")).toBeInTheDocument();
    expect(screen.queryByText("GPT-4o")).not.toBeInTheDocument();
    expect(screen.queryByText("Gemini Flash")).not.toBeInTheDocument();
  });

  it("shows an empty state when nothing matches", () => {
    render(<DataTable title="Models" columns={columns} data={data} />);

    fireEvent.change(screen.getByPlaceholderText("Search all columns..."), {
      target: { value: "zzzzzz" },
    });

    expect(screen.getByText("No results.")).toBeInTheDocument();
  });
});
