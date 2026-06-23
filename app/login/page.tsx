import { Suspense } from "react";
import AuthSplitLayout from "@/components/auth/AuthSplitLayout";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <AuthSplitLayout
      title="Welcome Back"
      subtitle="Sign in to access your WiEZ member portal."
    >
      <Suspense>
        <LoginForm />
      </Suspense>
    </AuthSplitLayout>
  );
}
