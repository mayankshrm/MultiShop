"use client";

import { useWixClient } from "@/hooks/useWixClient";
import { LoginState } from "@wix/sdk";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

enum MODE {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  RESET_PASSWORD = "RESET_PASSWORD",
  EMAIL_VERIFICATION = "EMAIL_VERIFICATION",
}

/* ── Tiny canvas particles hook ── */
function useParticles(canvasRef: React.RefObject<HTMLCanvasElement>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const COUNT = 110;
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2.4 + 1.8,
      dx: (Math.random() - 0.5) * 0.25,
      dy: (Math.random() - 0.5) * 0.25,
      o: Math.random() * 0.35 + 0.08,
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(243,92,122,${p.o})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [canvasRef]);
}

/* ── Mouse glow hook ── */
function useMouseGlow(ref: React.RefObject<HTMLDivElement>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--mx", `${x}%`);
      el.style.setProperty("--my", `${y}%`);
    };
    el.addEventListener("mousemove", handler);
    return () => el.removeEventListener("mousemove", handler);
  }, [ref]);
}

/* ── Shared sub-components ── */
const EyeIcon = ({ open }: { open: boolean }) =>
  open ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );

const Field = ({
  label, type, value, placeholder, onChange, autoComplete, suffix,
}: {
  label: string; type: string; value: string; placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string; suffix?: React.ReactNode;
}) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[10px] font-bold text-white/35 uppercase tracking-widest">
      {label}
    </label>
    <div className="relative">
      <input
        type={type} value={value} placeholder={placeholder}
        autoComplete={autoComplete || "off"} onChange={onChange}
        className="w-full bg-white/8 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white/90 placeholder:text-white/20 focus:outline-none focus:border-lama focus:ring-2 focus:ring-lama/20 transition-all duration-150 pr-10 backdrop-blur-sm"
      />
      {suffix && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors">
          {suffix}
        </div>
      )}
    </div>
  </div>
);

/* ── Mobile-only field (white bg) ── */
const FieldLight = ({
  label, type, value, placeholder, onChange, autoComplete, suffix,
}: {
  label: string; type: string; value: string; placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string; suffix?: React.ReactNode;
}) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[10px] font-bold text-ink/40 uppercase tracking-widest">
      {label}
    </label>
    <div className="relative">
      <input
        type={type} value={value} placeholder={placeholder}
        autoComplete={autoComplete || "off"} onChange={onChange}
        className="w-full bg-white border border-ink/10 rounded-lg px-3.5 py-2.5 text-sm text-ink placeholder:text-ink/20 focus:outline-none focus:border-lama focus:ring-2 focus:ring-lama/15 transition-all duration-150 pr-10"
      />
      {suffix && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/30 hover:text-ink/60 transition-colors">
          {suffix}
        </div>
      )}
    </div>
  </div>
);

/* ══════════════════════════════════════════════
   Main page
══════════════════════════════════════════════ */
const LoginPage = () => {
  const wixClient = useWixClient();
  const router = useRouter();
  const isLoggedIn = wixClient.auth.loggedIn();
  if (isLoggedIn) router.push("/");

  const [mode, setMode] = useState(MODE.LOGIN);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const bgRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useParticles(canvasRef);
  useMouseGlow(bgRef);

  const switchMode = (next: MODE) => { setError(""); setMessage(""); setMode(next); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      let response;
      switch (mode) {
        case MODE.LOGIN:
          response = await wixClient.auth.login({ email, password }); break;
        case MODE.REGISTER:
          response = await wixClient.auth.register({ email, password, profile: { nickname: username } }); break;
        case MODE.RESET_PASSWORD:
          response = await wixClient.auth.sendPasswordResetEmail(email, window.location.href);
          setMessage("Check your inbox — a reset link is on its way."); break;
        case MODE.EMAIL_VERIFICATION:
          response = await wixClient.auth.processVerification({ verificationCode: emailCode }); break;
        default: break;
      }
      switch (response?.loginState) {
        case LoginState.SUCCESS:
          setMessage("Signed in! Taking you home…");
          const tokens = await wixClient.auth.getMemberTokensForDirectLogin(response.data.sessionToken!);
          Cookies.set("refreshToken", JSON.stringify(tokens.refreshToken), { expires: 2 });
          wixClient.auth.setTokens(tokens);
          router.push("/"); break;
        case LoginState.FAILURE:
          if (response.errorCode === "invalidEmail" || response.errorCode === "invalidPassword") setError("Invalid email or password.");
          else if (response.errorCode === "emailAlreadyExists") setError("An account with this email already exists.");
          else if (response.errorCode === "resetPassword") setError("Please reset your password to continue.");
          else setError("Something went wrong. Please try again."); break;
        case LoginState.EMAIL_VERIFICATION_REQUIRED: setMode(MODE.EMAIL_VERIFICATION); break;
        case LoginState.OWNER_APPROVAL_REQUIRED: setMessage("Your account is pending approval."); break;
        default: break;
      }
    } catch { setError("Something went wrong. Please try again."); }
    finally { setIsLoading(false); }
  };

  const heading: Record<MODE, { title: string; sub: string }> = {
    [MODE.LOGIN]:              { title: "Sign in",          sub: "Welcome back to Zopmart" },
    [MODE.REGISTER]:           { title: "Create account",   sub: "Join Zopmart — it's free" },
    [MODE.RESET_PASSWORD]:     { title: "Forgot password?", sub: "We'll email you a reset link" },
    [MODE.EMAIL_VERIFICATION]: { title: "Check your email", sub: "Enter the code we just sent you" },
  };
  const btnLabel: Record<MODE, string> = {
    [MODE.LOGIN]: "Sign in", [MODE.REGISTER]: "Create account",
    [MODE.RESET_PASSWORD]: "Send reset link", [MODE.EMAIL_VERIFICATION]: "Verify code",
  };

  const switcherText = (dark: boolean) => {
    const cls = dark
      ? "font-semibold text-white/60 hover:text-white transition-colors"
      : "font-semibold text-ink/60 hover:text-lama transition-colors";
    return (
      <p className={`text-center text-xs ${dark ? "text-white/30" : "text-ink/40"}`}>
        {mode === MODE.LOGIN && (<>New to Zopmart?{" "}<button type="button" onClick={() => switchMode(MODE.REGISTER)} className={cls}>Create an account</button></>)}
        {mode === MODE.REGISTER && (<>Already have an account?{" "}<button type="button" onClick={() => switchMode(MODE.LOGIN)} className={cls}>Sign in</button></>)}
        {(mode === MODE.RESET_PASSWORD || mode === MODE.EMAIL_VERIFICATION) && (
          <button type="button" onClick={() => switchMode(MODE.LOGIN)} className={cls}>← Back to sign in</button>
        )}
      </p>
    );
  };

  const submitBtn = (
    <button type="submit" disabled={isLoading}
      className="mt-1 w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-all duration-200 active:scale-[0.98] disabled:opacity-55 disabled:cursor-not-allowed"
      style={{ background: isLoading ? "rgba(243,92,122,0.5)" : "#F35C7A" }}>
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          </svg>
          Please wait…
        </span>
      ) : btnLabel[mode]}
    </button>
  );

  const errorBanner = error && (
    <div className="flex items-center gap-2 rounded-lg bg-red-500/15 border border-red-400/20 px-3 py-2.5 text-xs font-medium text-red-300">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      {error}
    </div>
  );

  const successBanner = message && (
    <div className="flex items-center gap-2 rounded-lg bg-green-500/15 border border-green-400/20 px-3 py-2.5 text-xs font-medium text-green-300">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
      {message}
    </div>
  );

  return (
    <>
      {/* ══════════════════════════════════════════
          DESKTOP — full animated background
      ══════════════════════════════════════════ */}
      <div
        ref={bgRef}
        className="hidden lg:flex login-noise min-h-[calc(100vh-80px)] items-center justify-center relative overflow-hidden"
        style={{
          background: "#f8e7ea",
          /* cursor glow applied via mousemove */
        }}
      >
        {/* CSS variable cursor glow */}
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            background: "radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%), rgba(243,92,122,0.07), transparent 70%)",
          }}
        />

        {/* Mesh blob 1 — pink */}
        <div className="mesh-blob-1 absolute top-[-15%] left-[-10%] w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(243,92,122,0.20) 0%, transparent 65%)", filter: "blur(72px)" }} />
        {/* Mesh blob 2 — purple */}
        <div className="mesh-blob-2 absolute bottom-[-18%] right-[-8%] w-[560px] h-[560px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.16) 0%, transparent 65%)", filter: "blur(68px)" }} />
        {/* Mesh blob 3 — indigo */}
        <div className="mesh-blob-3 absolute top-[25%] right-[12%] w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.13) 0%, transparent 65%)", filter: "blur(60px)" }} />
        {/* Mesh blob 4 — deep pink */}
        <div className="mesh-blob-4 absolute bottom-[10%] left-[15%] w-[360px] h-[360px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(217,74,104,0.12) 0%, transparent 65%)", filter: "blur(55px)" }} />

        {/* Particle canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-[2]"
        />

        {/* Floating card — z above everything */}
        <div
          className="relative z-10 flex w-full max-w-[860px] mx-6 rounded-3xl overflow-hidden"
          style={{
            boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 32px 80px rgba(0,0,0,0.6), 0 0 120px rgba(243,92,122,0.12)",
          }}
        >
          {/* Left dark panel */}
          <div className="w-[40%] flex flex-col justify-between px-10 py-10 relative overflow-hidden"
            style={{ background: "rgba(14,14,22,0.95)", backdropFilter: "blur(12px)" }}>
            <div className="absolute -bottom-12 -right-12 w-56 h-56 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(243,92,122,0.12) 0%, transparent 70%)", filter: "blur(28px)" }} />

            <Link href="/" className="text-lg font-bold tracking-tight z-10">
              <span className="text-white">Zop</span>
              <span style={{ color: "#F35C7A" }}>mart</span>
            </Link>

            <div className="flex flex-col gap-6 z-10">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3"
                  style={{ color: "rgba(243,92,122,0.45)" }}>
                  Why Zopmart
                </p>
                <h2 className="text-[22px] font-bold text-white leading-snug">
                  Smarter shopping<br />
                  <span style={{ color: "#F35C7A" }}>starts here.</span>
                </h2>
              </div>
              <div className="flex flex-col gap-3.5">
                {[
                  ["Free delivery",   "On orders above ₹499"],
                  ["Up to 70% off",   "On thousands of products"],
                  ["Secure checkout", "Your data is always safe"],
                  ["Easy returns",    "7-day no-questions policy"],
                ].map(([title, desc]) => (
                  <div key={title} className="flex items-start gap-2.5">
                    <div className="w-1 h-1 rounded-full mt-[7px] shrink-0" style={{ background: "#F35C7A" }} />
                    <div>
                      <p className="text-white/75 text-[13px] font-semibold leading-none mb-0.5">{title}</p>
                      <p className="text-white/30 text-[11px]">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-white/15 text-[11px] z-10">© 2025 Zopmart</p>
          </div>

          {/* Right form panel — glass */}
          <div className="flex-1 flex flex-col justify-center px-10 py-10"
            style={{ background: "rgba(18,18,28,0.88)", backdropFilter: "blur(16px)" }}>
            <div className="mb-6">
              <h1 className="text-xl font-bold text-white mb-1">{heading[mode].title}</h1>
              <p className="text-sm text-white/35">{heading[mode].sub}</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
              {mode === MODE.REGISTER && (
                <Field label="Username" type="text" value={username} placeholder="johndoe"
                  onChange={(e) => setUsername(e.target.value)} />
              )}
              {mode !== MODE.EMAIL_VERIFICATION ? (
                <Field label="Email" type="email" value={email} placeholder="you@example.com"
                  autoComplete="email" onChange={(e) => setEmail(e.target.value)} />
              ) : (
                <Field label="Verification code" type="text" value={emailCode} placeholder="6-digit code"
                  onChange={(e) => setEmailCode(e.target.value)} />
              )}
              {(mode === MODE.LOGIN || mode === MODE.REGISTER) && (
                <Field label="Password" type={showPassword ? "text" : "password"}
                  value={password} placeholder="••••••••"
                  autoComplete={mode === MODE.LOGIN ? "current-password" : "new-password"}
                  onChange={(e) => setPassword(e.target.value)}
                  suffix={
                    <button type="button" tabIndex={-1} onClick={() => setShowPassword((v) => !v)}>
                      <EyeIcon open={showPassword} />
                    </button>
                  }
                />
              )}
              {mode === MODE.LOGIN && (
                <div className="flex justify-end -mt-0.5">
                  <button type="button" onClick={() => switchMode(MODE.RESET_PASSWORD)}
                    className="text-[11px] font-semibold text-lama hover:text-lama-dark transition-colors">
                    Forgot password?
                  </button>
                </div>
              )}
              {errorBanner}
              {successBanner}
              {submitBtn}
              <div className="flex items-center gap-3 mt-1">
                <div className="flex-1 h-px bg-white/8" />
                <span className="text-[10px] font-medium text-white/20 uppercase tracking-widest">or</span>
                <div className="flex-1 h-px bg-white/8" />
              </div>
              {switcherText(true)}
            </form>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          MOBILE — clean white card
      ══════════════════════════════════════════ */}
      <div className="flex lg:hidden min-h-[calc(100vh-80px)] items-center justify-center bg-[#f7f6f4] px-4 py-10">
        <div className="w-full max-w-[400px] bg-white rounded-2xl shadow-[0_2px_24px_rgba(0,0,0,0.07)] border border-black/[0.05] px-7 py-8">
          <Link href="/" className="block text-lg font-bold text-ink mb-6">
            Zop<span className="text-lama">mart</span>
          </Link>
          <div className="mb-5">
            <h1 className="text-xl font-bold text-ink mb-1">{heading[mode].title}</h1>
            <p className="text-sm text-ink/40">{heading[mode].sub}</p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            {mode === MODE.REGISTER && (
              <FieldLight label="Username" type="text" value={username} placeholder="johndoe"
                onChange={(e) => setUsername(e.target.value)} />
            )}
            {mode !== MODE.EMAIL_VERIFICATION ? (
              <FieldLight label="Email" type="email" value={email} placeholder="you@example.com"
                autoComplete="email" onChange={(e) => setEmail(e.target.value)} />
            ) : (
              <FieldLight label="Verification code" type="text" value={emailCode} placeholder="6-digit code"
                onChange={(e) => setEmailCode(e.target.value)} />
            )}
            {(mode === MODE.LOGIN || mode === MODE.REGISTER) && (
              <FieldLight label="Password" type={showPassword ? "text" : "password"}
                value={password} placeholder="••••••••"
                autoComplete={mode === MODE.LOGIN ? "current-password" : "new-password"}
                onChange={(e) => setPassword(e.target.value)}
                suffix={
                  <button type="button" tabIndex={-1} onClick={() => setShowPassword((v) => !v)}>
                    <EyeIcon open={showPassword} />
                  </button>
                }
              />
            )}
            {mode === MODE.LOGIN && (
              <div className="flex justify-end -mt-0.5">
                <button type="button" onClick={() => switchMode(MODE.RESET_PASSWORD)}
                  className="text-[11px] font-semibold text-lama hover:text-lama-dark transition-colors">
                  Forgot password?
                </button>
              </div>
            )}
            {error && (
              <div className="flex items-center gap-2 rounded-lg bg-red-50 border border-red-100 px-3 py-2.5 text-xs font-medium text-red-600">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {error}
              </div>
            )}
            {message && (
              <div className="flex items-center gap-2 rounded-lg bg-green-50 border border-green-100 px-3 py-2.5 text-xs font-medium text-green-700">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {message}
              </div>
            )}
            {submitBtn}
            <div className="flex items-center gap-3 mt-1">
              <div className="flex-1 h-px bg-ink/8" />
              <span className="text-[10px] font-medium text-ink/25 uppercase tracking-widest">or</span>
              <div className="flex-1 h-px bg-ink/8" />
            </div>
            {switcherText(false)}
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
