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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/trpc/react";
import { Slider } from "@/components/ui/slider";
import { SmallSpinner } from "@/components/core/SmallSpinner";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { ResultsBlock } from "./ResultsBlock";

const formSchema = z.object({
  concept: z.string().min(2, {
    message: "Concept must be at least 2 characters.",
  }),
  prompt: z.string(),
  temperature: z.number().min(0).max(100),
});

export function ELI5Form() {
  const queryClient = useQueryClient();
  const key = getQueryKey(api.credit.getCredit, undefined, "query");

  const chatMutation = api.ai.completion.useMutation({
    onSuccess: async () => {
      void queryClient.refetchQueries({ queryKey: key });
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      concept: "",
      prompt: "Explain like I am 5 years old the concept of",
      temperature: 0.5,
    },
  });

  function updatePrompt(value: string) {
    form.setValue(
      "prompt",
      `Explain like I am 5 years old the concept of ${value}`,
    );
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    if (chatMutation.isPending) {
      return;
    }
    try {
      await chatMutation.mutateAsync({
        query: values.prompt,
        temperature: values.temperature,
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="concept"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Concept</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g Blackholes"
                    autoFocus
                    {...field}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      updatePrompt(e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Accordion type="multiple">
            <AccordionItem value="prompt">
              <AccordionTrigger>Prompt</AccordionTrigger>
              <AccordionContent className="px-1 pb-4 pt-1">
                <FormField
                  control={form.control}
                  name="prompt"
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel>Concept</FormLabel> */}
                      <FormControl>
                        <Textarea
                          placeholder="Write a prompt to precede the value of the concept."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="temperature">
              <AccordionTrigger>Temperature</AccordionTrigger>
              <AccordionContent className="px-1 pb-4 pt-2">
                <FormField
                  control={form.control}
                  name="temperature"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <>
                          <p>{field.value}</p>
                          <Slider
                            min={0.0}
                            max={1.0}
                            step={0.01}
                            onValueChange={(value) => field.onChange(value[0])}
                            value={[field.value]}
                          />
                        </>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Button type="submit" value="Submit" className="w-20">
            {!chatMutation.isPending && <p>Submit</p>}
            {chatMutation.isPending && (
              <div className="grid w-full place-items-center">
                <SmallSpinner />
              </div>
            )}
          </Button>
        </form>
      </Form>
      <hr />
      {chatMutation.data && (
        <ResultsBlock
          isLoading={chatMutation.isPending}
          data={{ result: chatMutation.data?.message ?? undefined }}
          copyable={true}
        />
      )}
      {chatMutation.error && (
        <div className="rounded-md bg-red-100 p-4 text-red-900">
          {chatMutation.error.message}
        </div>
      )}
    </>
  );
}
