import { LoginForm } from "@/features/auth/ui/LoginForm";
import { Logo } from "@/shared/ui/Logo";

export function LoginPage() {
  return (
    <main className="grid min-h-screen grid-cols-1 lg:grid-cols-[1.1fr_1fr]">
      <section className="relative hidden overflow-hidden bg-primary-900 text-base-100 lg:block">
        <div className="absolute inset-0 bg-grid opacity-40" aria-hidden />
        <div
          className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary-900 via-primary-900/80 to-transparent"
          aria-hidden
        />

        <div className="relative flex h-full flex-col items-end justify-between p-10 text-right">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-base-700">
              ai performance console /
            </span>
            <Logo size={36} invertOnDark={false} className="invert" />
          </div>

          <div className="flex max-w-md flex-col items-end gap-6">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] uppercase tracking-widest text-accent-300">
                Enterprise Build · v0.1
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-accent-400" />
            </div>
            <h2 className="text-3xl font-semibold leading-tight tracking-tight">
              배포된 AI Agent의 퍼포먼스를
              <br />
              실시간으로 진단합니다.
            </h2>
            <p className="text-sm leading-relaxed text-base-600">
              프로젝트별 커스텀 지표, 이상치 감지, 세션 추적. 고객사 운영
              현장에 도입된 모든 에이전트를 한 콘솔에서 관측하세요.
            </p>

            <dl className="mt-4 grid w-full grid-cols-3 gap-6 border-t border-primary-700 pt-6 text-right font-mono">
              <Stat label="projects" value="—" />
              <Stat label="agents" value="—" />
              <Stat label="uptime" value="99.99%" />
            </dl>
          </div>

          <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-base-800">
            © {new Date().getFullYear()} Int · turing internal build
          </p>
        </div>
      </section>

      <section className="flex items-center justify-center bg-[var(--color-bg)] px-6 py-16">
        <div className="w-full max-w-[360px]">
          <div className="mb-8 flex items-center gap-2 lg:hidden">
            <Logo size={28} />
          </div>

          <div className="mb-8 flex flex-col gap-1">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-[var(--color-fg-subtle)]">
              sign in
            </span>
            <h1 className="text-xl font-semibold tracking-tight text-[var(--color-fg)]">
              사내 계정으로 로그인
            </h1>
          </div>

          <LoginForm />

          <p className="mt-8 border-t border-[var(--color-border)] pt-4 font-mono text-[11px] text-[var(--color-fg-subtle)]">
            계정은 운영 담당자가 발급합니다. 문의:{" "}
            <a
              href="mailto:jinoo0306@gmail.com"
              className="text-[var(--color-fg-muted)] hover:text-accent-500"
            >
              jinoo0306@gmail.com
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-end gap-0.5">
      <dt className="text-[10.5px] uppercase tracking-[0.2em] text-base-700">
        {label}
      </dt>
      <dd className="text-lg font-semibold text-base-100">{value}</dd>
    </div>
  );
}
