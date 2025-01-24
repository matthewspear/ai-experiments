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
import { ResultsBlock } from "../eli5/ResultsBlock";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useRef, useState } from "react";
import { debounce, type DebouncedFunc } from "lodash";

// TODO: Update prompt to use system + user message

enum Mode {
  tldr = "Tl;dr",
  summary = "Summary",
  bullet = "Bullet Points",
}

const formSchema = z.object({
  text: z.string().min(2, {
    message: "Text must be at least 2 characters.",
  }),
  prompt: z.string(),
  mode: z.nativeEnum(Mode),
  temperature: z.number().min(0).max(100),
});

export function SummaryForm() {
  const queryClient = useQueryClient();
  const key = getQueryKey(api.credit.getCredit, undefined, "query");

  const chatMutation = api.ai.completion.useMutation({
    onSuccess: async () => {
      void queryClient.refetchQueries({ queryKey: key });
    },
  });

  const [wordCount, setWordCount] = useState(0);

  const debouncedCount = useRef<DebouncedFunc<(text: string) => void>>(
    debounce((text: string) => {
      const count = text.trim().split(/\s+/).filter(Boolean).length;
      setWordCount(count);
    }, 300),
  ).current;

  useEffect(() => {
    return () => {
      debouncedCount.cancel();
    };
  }, [debouncedCount]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
      mode: Mode.tldr,
      prompt: "Tl;dr",
      temperature: 0.0,
    },
  });

  function updatePrompt({
    modeValue,
    textValue,
  }: {
    modeValue?: Mode;
    textValue?: string;
  }) {
    const mode = modeValue ?? form.getValues("mode");
    const text = textValue ?? form.getValues("text");

    let command = "";

    switch (mode) {
      case Mode.tldr:
        command = "Tl;dr";
        break;
      case Mode.summary:
        command = "summarize";
        break;
      case Mode.bullet:
        command = `summarize as bullet points

- `;
        break;
    }

    form.setValue(
      "prompt",
      `<text>
${text}
</text>

${command}`,
    );
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    if (chatMutation.isPending) {
      return;
    }
    try {
      await chatMutation.mutateAsync({
        task: "summary",
        query: values.prompt,
        temperature: values.temperature,
        maxTokens: 512,
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
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Text</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder=""
                    rows={5}
                    autoFocus
                    {...field}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      updatePrompt({ textValue: e.target.value });
                      debouncedCount(e.target.value);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  {wordCount} word{wordCount == 1 ? "" : "s"}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mode</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    updatePrompt({ modeValue: value as Mode });
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-[250px]">
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={Mode.tldr}>Tl;dr</SelectItem>
                    <SelectItem value={Mode.summary}>Summary</SelectItem>
                    <SelectItem value={Mode.bullet}>Bullet Points</SelectItem>
                  </SelectContent>
                </Select>
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
