"use client";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import type { PreTrainedTokenizer } from "@xenova/transformers";
import { type DebouncedFunc, debounce } from "lodash";
import { useEffect, useRef, useState } from "react";
import {
	type ControllerRenderProps,
	useForm,
} from "react-hook-form";
import { z } from "zod";
import {
	type AIModelPricing,
	aiModelPricings,
} from "../model-pricing-tracker/data";

const typeEnum = z.enum(["prompt", "tokens"]);

const formSchema = z.discriminatedUnion("type", [
	z.object({
		promptInput: z.string().min(0),
		promptOutput: z.string().min(0),
		type: typeEnum.extract(["prompt"]),
		inputCostPerMillion: z.number().min(0),
		outputCostPerMillion: z.number().min(0),
		tokenizer: z.string(),
	}),
	z.object({
		inputTokens: z.number().min(0),
		outputTokens: z.number().min(0),
		type: typeEnum.extract(["tokens"]),
		inputCostPerMillion: z.number().min(0),
		outputCostPerMillion: z.number().min(0),
		tokenizer: z.string(),
	}),
]);

export function CalculatorForm() {
	const [totalCost, setTotalCost] = useState({
		inputCost: 0.0,
		outputCost: 0.0,
		totalCost: 0.0,
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			type: "prompt",
			tokenizer: "xenova/gpt-4o",
			promptInput: "",
			promptOutput: "",
			inputCostPerMillion: undefined,
			outputCostPerMillion: undefined,
		},
	});

	const tokenizer = useRef<PreTrainedTokenizer | undefined>(undefined);

	useEffect(() => {
		const initTokenizer = async () => {
			const { AutoTokenizer, env } = await import("@xenova/transformers");
			env.allowLocalModels = false;
			tokenizer.current = await AutoTokenizer.from_pretrained(
				form.getValues("tokenizer"),
			);
		};
		void initTokenizer();
	}, [form.watch("tokenizer")]); // eslint-disable-line react-hooks/exhaustive-deps

	// init tokenizer from file
	async function onSubmit(values: z.infer<typeof formSchema>) {
		let inputCost = 0.0;
		let outputCost = 0.0;

		if (values.type === "prompt") {
			const inputTokens =
				tokenizer?.current?.encode(values.promptInput).length ?? 0;
			const outputTokens =
				tokenizer?.current?.encode(values.promptOutput).length ?? 0;

			inputCost = (inputTokens / 1_000_000) * values.inputCostPerMillion;
			outputCost = (outputTokens / 1_000_000) * values.outputCostPerMillion;
		} else {
			inputCost = (values.inputTokens / 1_000_000) * values.inputCostPerMillion;
			outputCost =
				(values.outputTokens / 1_000_000) * values.outputCostPerMillion;
		}
		setTotalCost({
			inputCost: inputCost,
			outputCost: outputCost,
			totalCost: inputCost + outputCost,
		});
	}

	const modelsGroupedByCompany = aiModelPricings.reduce(
		(acc, cur) => {
			acc[cur.company] ??= [];
			acc[cur.company]?.push(cur);
			return acc;
		},
		{} as Record<string, AIModelPricing[]>,
	);

	const companies = ["OpenAI", "Anthropic", "Mistral", "Cohere", "Google"];

	const currencyFormatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 2,
		maximumFractionDigits: 5,
	});

	const [promptCount, setPromptCount] = useState({
		inputWords: 0,
		outputWords: 0,
		inputTokens: 0,
		outputTokens: 0,
	});

	const debouncedCount = useRef<
		DebouncedFunc<
			({ input, output }: { input: string; output: string }) => void
		>
	>(
		debounce(({ input, output }) => {
			setPromptCount({
				inputWords: input.trim().split(/\s+/).filter(Boolean).length,
				outputWords: output.trim().split(/\s+/).filter(Boolean).length,
				inputTokens: tokenizer?.current?.encode(input).length ?? 0,
				outputTokens: tokenizer?.current?.encode(output).length ?? 0,
			});
		}, 300),
	).current;

	useEffect(() => {
		return () => {
			debouncedCount.cancel();
		};
	}, [debouncedCount]);

	return (
		<>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="w-full space-y-8"
				>
					<Tabs
						defaultValue="prompt"
						onValueChange={(v: string) =>
							form.setValue("type", typeEnum.parse(v))
						}
					>
						<TabsList className="border-[1px]">
							<TabsTrigger value="prompt">Prompt</TabsTrigger>
							<TabsTrigger value="tokens">Tokens</TabsTrigger>
						</TabsList>
						<TabsContent value="prompt">
							<div className="flex flex-col gap-4">
								<FormField
									control={form.control}
									name="promptInput"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Input</FormLabel>
											<FormControl>
												<Textarea
													placeholder="Input prompt goes here..."
													rows={5}
													autoFocus
													{...field}
													onChange={(event) => {
														field.onChange(event.target.value);
														debouncedCount({
															input: event.target.value,
															output: form.getValues("promptOutput"),
														});
													}}
												/>
											</FormControl>
											<FormDescription className="text-right">
												{promptCount.inputWords} word
												{promptCount.inputWords === 1 ? "" : "s"},{" "}
												{promptCount.inputTokens} token
												{promptCount.inputTokens === 1 ? "" : "s"}
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="promptOutput"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Output</FormLabel>
											<FormControl>
												<Textarea
													placeholder="LLM output goes here..."
													rows={5}
													{...field}
													onChange={(event) => {
														field.onChange(event.target.value);
														debouncedCount({
															input: form.getValues("promptInput"),
															output: event.target.value,
														});
													}}
												/>
											</FormControl>
											<FormDescription className="text-right">
												{promptCount.outputWords} word
												{promptCount.outputWords === 1 ? "" : "s"},{" "}
												{promptCount.outputTokens} token
												{promptCount.outputTokens === 1 ? "" : "s"}
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</TabsContent>
						<TabsContent value="tokens">
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
													type="float"
													min={0.0}
													autoFocus
													{...field}
													onChange={(event) =>
														field.onChange(+event.target.value)
													}
												/>
											</FormControl>
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
													type="float"
													min={0.0}
													{...field}
													onChange={(event) =>
														field.onChange(+event.target.value)
													}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</TabsContent>
					</Tabs>

					<div className="grid gap-4 sm:grid-cols-2">
						<FormField
							control={form.control}
							name="inputCostPerMillion"
							render={({
								field,
							}: {
								field: ControllerRenderProps<
									z.infer<typeof formSchema>,
									"inputCostPerMillion"
								>;
							}) => (
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
							render={({
								field,
							}: {
								field: ControllerRenderProps<
									z.infer<typeof formSchema>,
									"outputCostPerMillion"
								>;
							}) => (
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
					<div className="flex items-center gap-4">
						<Select
							onValueChange={(value: string) => {
								const model = aiModelPricings.find((m) => m.model === value);
								if (model) {
									form.setValue("inputCostPerMillion", model.inputCost);
									form.setValue("outputCostPerMillion", model.outputCost);
									form.setValue("tokenizer", model.tokenizer);
								}
								if (form.getValues("type") === "prompt") {
									debouncedCount({
										input: form.getValues("promptInput"),
										output: form.getValues("promptOutput"),
									});
								}
							}}
						>
							<SelectTrigger className="w-[250px]">
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
						<div className="grow" />
						{form.getValues("type") === "prompt" && (
							<p className="text-sm text-zinc-400">
								Estimated using{" "}
								<a
									href={`https://huggingface.co/${form.getValues("tokenizer")}`}
									className="underline"
									target="_blank"
									rel="noreferrer noopener"
								>
									{form.getValues("tokenizer")}
								</a>
							</p>
						)}
					</div>

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
