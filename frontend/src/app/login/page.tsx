"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Lock, Mail } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isRegister) {
        await api.register(email, password);
        const { token } = await api.login(email, password);
        localStorage.setItem("token", token);
      } else {
        const { token } = await api.login(email, password);
        localStorage.setItem("token", token);
      }
      router.push("/");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4 font-sans">
      <Card className="w-full max-w-md bg-slate-900 border-slate-800 shadow-2xl relative z-10">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-bold bg-linear-to-r text-slate-200 bg-clip-text">
            {isRegister ? "Create an account" : "Welcome Back"}
          </CardTitle>
          <CardDescription className="text-slate-400">
            {isRegister
              ? "Create an account to start organizing your life"
              : "Enter your credentials to access your tasks"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-200">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  className="pl-9 bg-slate-950 border-slate-700 text-slate-100 focus:border-indigo-500 placeholder:text-slate-600"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-200">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="pl-9 bg-slate-950 border-slate-700 text-slate-100 focus:border-indigo-500 placeholder:text-slate-600"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-md bg-red-900/20 border border-red-900/50">
                <p className="text-red-400 text-sm text-center font-medium">
                  {error}
                </p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 transition-all shadow-lg shadow-indigo-500/20"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : isRegister ? (
                "Create Account"
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter>
          <div className="w-full text-center space-y-2">
            <p className="text-xs text-slate-500">
              {isRegister
                ? "Already have an account?"
                : "Don't have an account?"}
            </p>
            <Button
              variant="link"
              className="text-indigo-400 hover:text-indigo-300 h-auto p-0"
              onClick={() => {
                setIsRegister(!isRegister);
                setError("");
              }}
            >
              {isRegister ? "Sign in instead" : "Create an account"}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
