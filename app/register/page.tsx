import AuthSplitLayout from "@/components/auth/AuthSplitLayout";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthSplitLayout
      title="Create Your Account"
      subtitle="Apply for WiEZ membership — an admin will review and activate your account."
    >
      <RegisterForm />
    </AuthSplitLayout>
  );
}
