"use client";
import React, { useCallback, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "apps/nouvelles/src/components/ui/form";
import { Input } from "apps/nouvelles/src/components/ui/input";
import {
  Button,
  buttonVariants,
} from "apps/nouvelles/src/components/ui/button";
import { Icons } from "apps/nouvelles/src/components/icons";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PAGE_ENDPOINTS } from "apps/nouvelles/src/constants/constants";
import { cn } from "apps/nouvelles/src/utils/utils";

const formSchema = z.object({
  email: z.string().email(),
});

type FormFields = z.infer<typeof formSchema>;

export default function SignInForm() {
  const [isLoading, setLoading] = useState(false);

  const router = useRouter();

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = useCallback(
    async (input: FormFields) => {
      console.log(input);
    },
    [router]
  );

  const onKakoLogin = useCallback(async () => {
    setLoading(true);
    try {
      const resp = await signIn("kakao", {
        redirect: false,
      });

      if (resp) {
        if (!resp.error && resp?.ok) {
          router.replace(PAGE_ENDPOINTS.ROOT);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [router]);

  return (
    <div className="grid gap-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="이메일"
                      autoCapitalize="none"
                      autoComplete="email"
                      dir="ltr"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isLoading}
              aria-disabled={isLoading}
            >
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              로그인
            </Button>
          </div>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">또는</span>
        </div>
      </div>

      <button
        type="button"
        className={cn(buttonVariants({ variant: "outline" }))}
        onClick={onKakoLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.kakao className="h-10 w-10" />
        )}
        카카오로 로그인
      </button>
    </div>
  );
}
