"use client";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { OctagonAlert, OctagonAlertIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle } from "@/components/ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Signika } from "next/font/google";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input"; // Assuming Input is from shadcn/ui
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

// Sign in Scheme validation
const formSchema = z.object({
  email: z
    .string()
    .min(2, { message: "Email is required" })
    .email("Not a valid email"),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});
const signInView = () => {
  // Routing and error state
  const router = useRouter();
  const [error, setError] = React.useState<string | null>(null);
  const [pending, setPending] = React.useState(false);
  // Sign in view
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // on Submit function
  const onSubmit =  (data: z.infer<typeof formSchema>) => {
    
    setError(null);
    setPending(true);

    // Call your sign-in API here
    // If successful, redirect or show a success message
    authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: (data) => {
          setPending(false);
          router.push("/");
        },
        onError: ({ error }) => {
          setPending(false);
          setError(error.message);
        },
      }
    );
  };
  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <CardContent className="p-0 grid md:grid-cols-2">
          <Form {...form} >
            <form
              className="p-6 md:p-8"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Welcome Back</h1>
                  <p className="text-balance text-muted-foreground">
                    Sign in to your account
                  </p>
                </div>
                {/* Form Fields */}
                {/* Email */}
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Call@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Password */}
                </div>
                {/* Message */}
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="••••••"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Button */}
                  {!!error && (
                    <Alert className="bg-destructive/10 border-none">
                      <OctagonAlertIcon className="h-4 w-4 text-destructive" />
                      <AlertTitle>{error}</AlertTitle>
                    </Alert>
                  )}
                  <Button type="submit" disabled={pending} className="w-full">
                    Sign in
                  </Button>
                  <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                    <span className="bg-background px-2 text-muted-foreground z-10 relative">
                      Or continue with
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" type="button" className="w-full">
                      Google
                    </Button>
                    <Button variant="outline" type="button" className="w-full">
                      GitHub
                    </Button>
                  </div>

                  <div className="text-center text-sm">
                    Don't have an account?{" "}
                    <Link
                      href="/sign-up"
                      className="underline underline-offset-4"
                    >
                      Sign Up
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </Form>
          <div className="bg-radial from-blue-700 text-blue-700 to-blue-900 relative hidden md:flex flex-col gap-y-4 items-center justify-center">
            <img src="/logo.svg" alt="image" className="h-[92px] w-[92px]" />
            <p className="text-2xl font-semibold text-white">Call.Crafter</p>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Terms and conditions */}
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking "Sign In" you agree to our{" "}
        <Link href="#">Terms of services </Link> and{" "}
        <Link href="#">Privacy Policy</Link>
      </div>
    </div>
  );
};

export default signInView;
