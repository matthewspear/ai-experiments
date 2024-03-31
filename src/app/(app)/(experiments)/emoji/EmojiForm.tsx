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
import { EmojiButton } from "./EmojiButton";
import { SmallSpinner } from "@/components/core/SmallSpinner";

const formSchema = z.object({
  topic: z.string().min(2, {
    message: "Topic must be at least 2 characters.",
  }),
  number: z.number().min(1),
  prompt: z.string(),
  temperature: z.number().min(0).max(100),
});

export function EmojiForm() {
  const chatMutation = api.ai.emoji.useMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
      number: 5,
      prompt:
        "Pick an emoji to represent a topic. Provide a JSON object with a key called emojis with an array of 5 emojis suitable, ordered from most to least suitable.",
      temperature: 0,
    },
  });

  function updatePromptForNumber(number: number) {
    form.setValue(
      "prompt",
      `Pick an emoji to represent a topic. Provide a JSON object with a key called emojis with an array of ${number} emojis suitable, ordered from most to least suitable.`,
    );
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    if (chatMutation.isPending) {
      return;
    }
    await chatMutation.mutateAsync({
      prompt: values.prompt,
      query: "Topic: " + values.topic,
      temperature: values.temperature,
      model: "gpt-4-turbo-preview",
      maxTokens: 512,
      jsonMode: true,
    });
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="topic"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Topic</FormLabel>
                <FormControl>
                  <Input placeholder="e.g Magic" autoFocus {...field} />
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
            name="number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number</FormLabel>
                <FormControl>
                  <>
                    <p>{field.value}</p>
                    <Slider
                      min={0.0}
                      max={50.0}
                      step={5}
                      onValueChange={(value) => {
                        field.onChange(value[0]);
                        if (value[0]) {
                          updatePromptForNumber(value[0]);
                        }
                      }}
                      defaultValue={[field.value]}
                    />
                  </>
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
        <div className="flex flex-wrap gap-2">
          {chatMutation.data.emojis.map((emoji: string) => (
            <EmojiButton key={emoji} emoji={emoji} />
          ))}
        </div>
      )}
      {/* <DropdownBlocks
        prompt={latestPrompt}
        result={promptMutation.data?.result ?? ""}
        temperature={temperature}
        setTemperature={setTemperature}
      />
      <ResultsBlock
        isLoading={promptMutation.isLoading}
        data={promptMutation.data}
      /> */}
    </>
  );
}
