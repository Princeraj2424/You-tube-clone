import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

function SignIn() {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const [step, setStep] = React.useState("identifier");
  const [identifier, setIdentifier] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorText, setErrorText] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();

  const searchParams = new URLSearchParams(location.search);
  const nextPath = searchParams.get("next") || "/";

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(nextPath, { replace: true });
    }
  }, [isAuthenticated, navigate, nextPath]);

  const trimmedIdentifier = identifier.trim();
  const isEmail = emailPattern.test(trimmedIdentifier);
  const identifierValid = isEmail;
  const passwordValid = password.trim().length >= 6;

  const handleIdentifierSubmit = (event) => {
    event.preventDefault();
    if (!identifierValid) {
      setErrorText("Enter a valid email address.");
      return;
    }

    setErrorText("");
    setStep("password");
  };

  const handlePasswordSubmit = (event) => {
    event.preventDefault();
    if (!identifierValid) {
      setStep("identifier");
      setErrorText("Enter a valid email address.");
      return;
    }

    if (!passwordValid) {
      setErrorText("Wrong password. Try again.");
      return;
    }

    setIsSubmitting(true);

    const baseName = isEmail
      ? trimmedIdentifier.split("@")[0].replace(/[._-]+/g, " ").trim()
      : trimmedIdentifier;

    const displayName =
      baseName
        .split(" ")
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ") || "YouTube User";

    const email = trimmedIdentifier;

    setTimeout(() => {
      login({ name: displayName, email });
      setIsSubmitting(false);
      navigate(nextPath, { replace: true });
    }, 700);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-white to-gray-50 px-4 py-8 md:px-6 md:py-12">
      <div className="mx-auto flex w-full max-w-5xl items-start justify-center">
        <div className="grid w-full gap-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-xl md:grid-cols-[1.1fr_1fr] md:p-8">
          <section className="rounded-2xl bg-[radial-gradient(circle_at_top_right,#fdecec,#fff7f7_35%,#ffffff_80%)] p-6">
            <img src="/logo.png" alt="YouTube" className="w-28" />
            <h1 className="mt-6 text-2xl font-semibold text-gray-900 md:text-3xl">Sign in</h1>
            <p className="mt-2 text-sm text-gray-600 md:text-base">to continue to YouTube Clone</p>

            <div className="mt-8 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
              Secure sign-in experience with account persistence and redirect back to your page.
            </div>
          </section>

          <section className="p-2 md:p-4">
            {step === "identifier" ? (
              <form onSubmit={handleIdentifierSubmit} className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={identifier}
                  onChange={(event) => {
                    setIdentifier(event.target.value);
                    setErrorText("");
                  }}
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
                  autoFocus
                />

                {errorText && <p className="text-xs font-medium text-red-600">{errorText}</p>}

                <button type="button" className="text-sm font-medium text-blue-600 hover:underline">
                  Forgot email?
                </button>

                <p className="pt-3 text-sm text-gray-600">
                  Not your computer? Use Guest mode to sign in privately.
                </p>

                <div className="flex justify-end gap-2 pt-4">
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="rounded-full px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!identifierValid}
                    className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Next
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div className="inline-flex items-center rounded-full border border-gray-300 px-3 py-1 text-xs text-gray-700">
                  {identifier}
                </div>

                <label className="block text-sm font-medium text-gray-700">Enter your password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setErrorText("");
                  }}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
                  autoFocus
                />

                {errorText && <p className="text-xs font-medium text-red-600">{errorText}</p>}

                <button type="button" className="text-sm font-medium text-blue-600 hover:underline">
                  Forgot password?
                </button>

                <div className="flex justify-end gap-2 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setStep("identifier");
                      setPassword("");
                      setErrorText("");
                    }}
                    className="rounded-full px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={!passwordValid || isSubmitting}
                    className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? "Signing in..." : "Sign in"}
                  </button>
                </div>
              </form>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
