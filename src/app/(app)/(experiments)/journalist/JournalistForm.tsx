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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/trpc/react";
import { SmallSpinner } from "@/components/core/SmallSpinner";
import { Switch } from "@/components/ui/switch";
import { redirect } from "next/navigation";

const formSchema = z.object({
  topic: z.string().min(2, {
    message: "Topic must be at least 2 characters.",
  }),
  editMode: z.boolean(),
});

export function JournalistForm() {
  const articleMutation = api.article.request.useMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
      editMode: true,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    if (articleMutation.isPending) {
      return;
    }
    try {
      const result = await articleMutation.mutateAsync({
        topic: values.topic,
        editMode: values.editMode,
      });
      redirect(`/journalist/articles/${result.articleId}`);
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
            name="topic"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Topic</FormLabel>
                <FormControl>
                  <Input placeholder="e.g GPT-5 Rumours" autoFocus {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="editMode"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Edit Mode</FormLabel>
                  <FormDescription>
                    After the initial draft, do you want an automatic edit?
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" value="Submit" className="w-20">
            {!articleMutation.isPending && <p>Submit</p>}
            {articleMutation.isPending && (
              <div className="grid w-full place-items-center">
                <SmallSpinner />
              </div>
            )}
          </Button>
        </form>
      </Form>
      <hr />
      {articleMutation.error && (
        <div className="rounded-md bg-red-100 p-4 text-red-900">
          {articleMutation.error.message}
        </div>
      )}
    </>
  );
}
