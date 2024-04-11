"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type AIModelPricing, aiModelPricings } from "../model/data";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableRow,
} from "@/components/ui/table";

const formSchema = z.object({
  inputTokens: z.number().min(0),
  outputTokens: z.number().min(0),
  inputCostPerMillion: z.number().min(0),
  outputCostPerMillion: z.number().min(0),
});

export function CalculatorForm() {
  const [totalCost, setTotalCost] = useState({
    inputCost: 0.0,
    outputCost: 0.0,
    totalCost: 0.0,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      inputTokens: undefined,
      outputTokens: undefined,
      inputCostPerMillion: undefined,
      outputCostPerMillion: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const inputCost =
      (values.inputTokens / 1_000_000) * values.inputCostPerMillion;
    const outputCost =
      (values.outputTokens / 1_000_000) * values.outputCostPerMillion;

    setTotalCost({
      inputCost: inputCost,
      outputCost: outputCost,
      totalCost: inputCost + outputCost,
    });
  }

  const modelsGroupedByCompany = aiModelPricings.reduce(
    (acc, cur) => {
      if (!acc[cur.company]) {
        acc[cur.company] = [];
      }
      if (acc[cur.company]) {
        acc[cur.company]!.push(cur);
      }
      return acc;
    },
    {} as Record<string, AIModelPricing[]>,
  );

  // const companies = Object.keys(modelsGroupedByCompany).sort();
  const companies = ["OpenAI", "Anthropic", "Mistral", "Cohere", "Google"];

  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 5,
  });

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="inputTokens"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Input Tokens</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      type="number"
                      min={0}
                      autoFocus
                      {...field}
                      onChange={(event) => field.onChange(+event.target.value)}
                    />
                  </FormControl>
                  {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="outputTokens"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Output Tokens</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      type="number"
                      min={0}
                      {...field}
                      onChange={(event) => field.onChange(+event.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="inputCostPerMillion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Input $/MTok</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      type="currency"
                      min={0}
                      {...field}
                      onChange={(event) => field.onChange(+event.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="outputCostPerMillion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Output $/MTok</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      type="currency"
                      min={0}
                      {...field}
                      onChange={(event) => field.onChange(+event.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Select
            onValueChange={(value) => {
              const model = aiModelPricings.filter((m) => m.model === value)[0];
              if (model) {
                form.setValue("inputCostPerMillion", model.inputCost);
                form.setValue("outputCostPerMillion", model.outputCost);
              }
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a Model..." />
            </SelectTrigger>
            <SelectContent>
              {companies.map((key) => (
                <SelectGroup key={key}>
                  <SelectLabel>{key}</SelectLabel>
                  {modelsGroupedByCompany[key]?.map((model) => (
                    <SelectItem key={model.model} value={model.model}>
                      {model.model}
                    </SelectItem>
                  ))}
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>

          <Button type="submit" value="Submit" className="w-20">
            <p>Submit</p>
          </Button>
        </form>
      </Form>
      <hr />
      <div className="rounded-md border bg-white">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Input</TableCell>
              <TableCell className="text-right">
                {currencyFormatter.format(totalCost.inputCost)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Output</TableCell>
              <TableCell className="text-right">
                {currencyFormatter.format(totalCost.outputCost)}
              </TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>Total</TableCell>
              <TableCell className="text-right">
                {currencyFormatter.format(totalCost.totalCost)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      {/* <hr />
      <p>100x calls: {currencyFormatter.format(100.0 * totalCost.totalCost)}</p>
      <p>
        1000x calls: {currencyFormatter.format(1000.0 * totalCost.totalCost)}
      </p> */}
    </>
  );
}
