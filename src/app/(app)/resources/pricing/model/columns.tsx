"use client";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { type ColumnDef } from "@tanstack/react-table";
import { type AIModelPricing } from "./data";

export const columns: ColumnDef<AIModelPricing>[] = [
  {
    accessorKey: "model",
    header: "Model",
  },
  {
    accessorKey: "company",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Company
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "inputCost",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Input Cost ($/MTok)
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount: number = parseFloat(row.getValue("inputCost"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "outputCost",
    // header: "Output Cost ($/MTok)",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Output Cost ($/MTok)
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount: number = parseFloat(row.getValue("outputCost"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "contextLength",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Context Length
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount: number = parseFloat(row.getValue("contextLength"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "decimal", // Change style to "decimal" for numeric formatting without currency
        // minimumFractionDigits: 0, // Optional: set minimum fraction digits
        // maximumFractionDigits: 2, // Optional: set maximum fraction digits
      }).format(amount);

      return <div className="font-medium">{formatted}</div>;
    },
  },
];
