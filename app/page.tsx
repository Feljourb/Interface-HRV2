import Link from "next/link";
import {
  ArrowRight, Briefcase, Building2, CalendarClock, CalendarDays, ChevronRight,
  ClipboardCheck, Clock, FileSignature, GraduationCap, TrendingUp,
  UserCheck, UserPlus, Users, type LucideIcon,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Design tokens                                                       */
/* ------------------------------------------------------------------ */

const surface =
  "rounded-xl border border-slate-200/70 bg-white shadow-sm shadow-slate-900/[0.04]";

const lift =
  "transition-all duration-200 ease-out hover:border-slate-300/80 hover:shadow-md hover:shadow-slate-900/[0.06] motion-safe:hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50";

const taskTones = {
  amber: {
    strip: "bg-amber-500",
    chip: "bg-amber-50 text-amber-600 ring-amber-100",
    badge: "bg-amber-50 text-amber-800 ring-amber-200",
    cta: "text-amber-700 group-hover:text-amber-800",
  },
  blue: {
    strip: "bg-blue-500",
    chip: "bg-blue-50 text-blue-600 ring-blue-100",
    badge: "bg-blue-50 text-blue-700 ring-blue-200",
    cta: "text-blue-700 group-hover:text-blue-800",
  },
  emerald: {
    strip: "bg-emerald-500",
    chip: "bg-emerald-50 text-emerald-600 ring-emerald-100",
    badge: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    cta: "text-emerald-700 group-hover:text-emerald-800",
  },
};

// Validated as a set (lightness band, CVD + normal-vision separation, ≥3:1 vs white).
const kpiTones = {
  violet: {
    chip: "bg-violet-50 text-violet-600 ring-violet-100",
    mark: "text-violet-600",
    soft: "fill-violet-200 hover:fill-violet-300",
    strong: "fill-violet-600",
    track: "bg-violet-100",
    fill: "bg-violet-600",
  },
  teal: {
    chip: "bg-teal-50 text-teal-600 ring-teal-100",
    mark: "text-teal-600",
    soft: "fill-teal-200 hover:fill-teal-300",
    strong: "fill-teal-600",
    track: "bg-teal-100",
    fill: "bg-teal-600",
  },
  orange: {
    chip: "bg-orange-50 text-orange-600 ring-orange-100",
    mark: "text-orange-600",
    soft: "fill-orange-200 hover:fill-orange-300",
    strong: "fill-orange-600",
    track: "bg-orange-100",
    fill: "bg-orange-600",
  },
  blue: {
    chip: "bg-blue-50 text-blue-600 ring-blue-100",
    mark: "text-blue-600",
    soft: "fill-blue-200 hover:fill-blue-300",
    strong: "fill-blue-600",
    track: "bg-blue-100",
    fill: "bg-blue-600",
  },
};

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

type PriorityTask = {
  title: string;
  description: string;
  badge: string;
  urgent?: boolean;
  tone: keyof typeof taskTones;
  icon: LucideIcon;
  cta: string;
  href: string;
};

type KpiViz =
  | { kind: "line"; data: number[]; labels: string[]; unit: string }
  | { kind: "bars"; data: number[]; labels: string[]; unit: string }
  | { kind: "meter"; value: number };

type Kpi = {
  id: string;
  label: string;
  value: string;
  detail: string;
  icon: LucideIcon;
  tone: keyof typeof kpiTones;
  trendUp?: boolean;
  viz: KpiViz;
};

const months = ["Nov 2025", "Déc 2025", "Jan 2026", "Fév 2026", "Mar 2026", "Avr 2026", "Mai 2026", "Juin 2026", "Juil 2026", "Août 2026", "Sep 2026", "Oct 2026"];
const workingDays = ["J-11", "J-10", "J-9", "J-8", "J-7", "J-6", "J-5", "J-4", "J-3", "J-2", "J-1", "Aujourd'hui"];

const priorityTasks: PriorityTask[] = [
  {
    title: "Double Vérification",
    description: "4 modifications de fiches collaborateurs sont en attente de votre validation (Principe Maker-Checker).",
    badge: "Action requise",
    urgent: true,
    tone: "amber",
    icon: UserCheck,
    cta: "Examiner les profils",
    href: "/employees",
  },
  {
    title: "Reçus Notes de Frais",
    description: "12 notes de frais validées par les managers nécessitent la collecte des reçus physiques originaux.",
    badge: "Logistique",
    tone: "blue",
    icon: FileSignature,
    cta: "Gérer la collecte",
    href: "/expenses",
  },
  {
    title: "Nouveaux Arrivants",
    description: "2 collaborateurs rejoignent l'entreprise cette semaine. Assurez-vous que la dotation est prête.",
    badge: "Intégration",
    tone: "emerald",
    icon: UserPlus,
    cta: "Préparer l'accueil",
    href: "/onboarding",
  },
];

// TODO: sparkline / bar series are sample data — wire to the HR API. The last point must equal `value`.
const kpis: Kpi[] = [
  {
    id: "headcount",
    label: "Effectif Actif Total",
    value: "142",
    detail: "+2 collaborateurs ce mois",
    icon: Users,
    tone: "violet",
    trendUp: true,
    viz: { kind: "line", data: [131, 132, 134, 133, 135, 136, 137, 138, 138, 139, 140, 142], labels: months, unit: "collaborateurs" },
  },
  {
    id: "absences",
    label: "Absences Aujourd'hui",
    value: "6",
    detail: "5 en congés, 1 maladie",
    icon: Clock,
    tone: "teal",
    viz: { kind: "bars", data: [4, 7, 5, 3, 6, 8, 5, 4, 7, 5, 3, 6], labels: workingDays, unit: "absences" },
  },
  {
    id: "open-positions",
    label: "Postes Ouverts",
    value: "3",
    detail: "Recrutements en cours",
    icon: Building2,
    tone: "orange",
    viz: { kind: "line", data: [2, 2, 3, 4, 4, 3, 2, 3, 5, 4, 4, 3], labels: months, unit: "postes" },
  },
  {
    id: "interviews",
    label: "Taux Entretiens",
    value: "85%",
    detail: "Campagne d'évaluation Q3",
    icon: ClipboardCheck,
    tone: "blue",
    viz: { kind: "meter", value: 85 },
  },
];

const quickActions = [
  { name: "Intégrer", icon: UserPlus, href: "/onboarding", chip: "bg-emerald-50 text-emerald-600 ring-emerald-100" },
  { name: "Congés", icon: CalendarClock, href: "/leaves", chip: "bg-blue-50 text-blue-600 ring-blue-100" },
  { name: "Notes de frais", icon: FileSignature, href: "/expenses", chip: "bg-indigo-50 text-indigo-600 ring-indigo-100" },
  { name: "Recrutement", icon: Briefcase, href: "/recruitment", chip: "bg-purple-50 text-purple-600 ring-purple-100" },
  { name: "Évaluations", icon: GraduationCap, href: "/evaluation-interview", chip: "bg-rose-50 text-rose-600 ring-rose-100" },
];

/* ------------------------------------------------------------------ */
/* Micro-charts (pure SVG, server-rendered; native <title> tooltips)   */
/* ------------------------------------------------------------------ */

const CHART_W = 96;
const CHART_H = 36;

function Sparkline({ id, data, labels, unit, className }: {
  id: string; data: number[]; labels: string[]; unit: string; className: string;
}) {
  const pad = 6;
  const min = Math.min(...data);
  const span = Math.max(...data) - min || 1;
  const step = (CHART_W - pad * 2) / (data.length - 1);
  const pts = data.map((v, i) => ({
    x: pad + i * step,
    y: pad + (1 - (v - min) / span) * (CHART_H - pad * 2),
  }));
  const line = pts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const area = `M ${pts[0].x} ${CHART_H} ${pts.map((p) => `L ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ")} L ${pts[pts.length - 1].x} ${CHART_H} Z`;
  const last = pts[pts.length - 1];

  return (
    <svg
      width={CHART_W}
      height={CHART_H}
      viewBox={`0 0 ${CHART_W} ${CHART_H}`}
      overflow="visible"
      className={`shrink-0 ${className}`}
      role="img"
      aria-label={`Tendance sur 12 mois : de ${data[0]} à ${data[data.length - 1]} ${unit}`}
    >
      <defs>
        <linearGradient id={`spark-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity={0.18} />
          <stop offset="100%" stopColor="currentColor" stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#spark-${id})`} />
      <polyline points={line} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={last.x} cy={last.y} r={4} fill="currentColor" stroke="white" strokeWidth={2} />
      {pts.map((p, i) => (
        <g key={i} className="group/pt">
          <circle cx={p.x} cy={p.y} r={3} fill="currentColor" stroke="white" strokeWidth={1.5} className="opacity-0 transition-opacity group-hover/pt:opacity-100" />
          <rect x={p.x - step / 2} y={0} width={step} height={CHART_H} fill="transparent">
            <title>{`${labels[i]} : ${data[i]} ${unit}`}</title>
          </rect>
        </g>
      ))}
    </svg>
  );
}

function MiniBars({ data, labels, unit, soft, strong }: {
  data: number[]; labels: string[]; unit: string; soft: string; strong: string;
}) {
  const gap = 2;
  const barW = (CHART_W - gap * (data.length - 1)) / data.length;
  const max = Math.max(...data) || 1;

  return (
    <svg
      width={CHART_W}
      height={CHART_H}
      viewBox={`0 0 ${CHART_W} ${CHART_H}`}
      className="shrink-0"
      role="img"
      aria-label={`${data[data.length - 1]} ${unit} aujourd'hui, ${data.length} derniers jours ouvrés`}
    >
      {data.map((v, i) => {
        const h = Math.max(2, (v / max) * CHART_H);
        return (
          <rect
            key={i}
            x={i * (barW + gap)}
            y={CHART_H - h}
            width={barW}
            height={h}
            rx={1.5}
            className={`transition-colors ${i === data.length - 1 ? strong : soft}`}
          >
            <title>{`${labels[i]} : ${v} ${unit}`}</title>
          </rect>
        );
      })}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Building blocks                                                     */
/* ------------------------------------------------------------------ */

function SectionHeader({ id, title, meta }: { id: string; title: string; meta?: string }) {
  return (
    <div className="mb-3 flex items-baseline justify-between gap-4">
      <h2 id={id} className="text-sm font-semibold text-slate-900">{title}</h2>
      {meta && <span className="text-xs font-medium text-slate-500">{meta}</span>}
    </div>
  );
}

function KpiCard({ kpi }: { kpi: Kpi }) {
  const t = kpiTones[kpi.tone];
  const { viz } = kpi;

  return (
    <div className={`${surface} flex flex-col p-5`}>
      <div className="flex items-center gap-2.5">
        <span className={`flex size-8 shrink-0 items-center justify-center rounded-lg ring-1 ring-inset ${t.chip}`}>
          <kpi.icon className="size-4" aria-hidden />
        </span>
        <p className="text-sm font-medium text-slate-600">{kpi.label}</p>
      </div>

      <div className="mt-4 flex items-end justify-between gap-3">
        <p className="text-3xl font-bold leading-none tracking-tight text-slate-900 tabular-nums">{kpi.value}</p>
        {viz.kind === "line" && (
          <Sparkline id={kpi.id} data={viz.data} labels={viz.labels} unit={viz.unit} className={t.mark} />
        )}
        {viz.kind === "bars" && (
          <MiniBars data={viz.data} labels={viz.labels} unit={viz.unit} soft={t.soft} strong={t.strong} />
        )}
      </div>

      {viz.kind === "meter" && (
        <div
          className={`mt-4 h-1.5 w-full overflow-hidden rounded-full ${t.track}`}
          role="meter"
          aria-label={kpi.label}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={viz.value}
        >
          <div className={`h-full rounded-full ${t.fill}`} style={{ width: `${viz.value}%` }} />
        </div>
      )}

      <p
        className={`mt-auto flex items-center gap-1 pt-3 text-xs font-medium ${
          kpi.trendUp ? "text-emerald-700" : "text-slate-500"
        }`}
      >
        {kpi.trendUp && <TrendingUp className="size-3.5" aria-hidden />}
        {kpi.detail}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Dashboard() {
  return (
    <div className="space-y-10">

      <header>
        <time
          dateTime="2026-10-24"
          className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-xs font-medium text-slate-600 shadow-sm shadow-slate-900/[0.04] ring-1 ring-slate-200/70"
        >
          <CalendarDays className="size-3.5 text-slate-400" aria-hidden />
          Mardi 24 Octobre 2026
        </time>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">
          Bonjour, Équipe RH 👋
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          Votre journée s'annonce chargée. Vous avez des tâches prioritaires nécessitant votre intervention, notamment des validations de profils (Double Check) et la récupération de reçus physiques.
        </p>
      </header>

      {/* Priority tasks */}
      <section aria-labelledby="priority-heading">
        <SectionHeader id="priority-heading" title="À traiter en priorité" meta={`${priorityTasks.length} tâches`} />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {priorityTasks.map((task) => {
            const t = taskTones[task.tone];
            return (
              <Link
                key={task.title}
                href={task.href}
                className={`group relative flex flex-col overflow-hidden p-5 pt-6 ${surface} ${lift} ${focusRing}`}
              >
                {/* Urgency strip: thicker for urgent items */}
                <span className={`absolute inset-x-0 top-0 ${task.urgent ? "h-1" : "h-0.5"} ${t.strip}`} aria-hidden />

                <div className="flex items-start justify-between gap-3">
                  <span className={`flex size-10 items-center justify-center rounded-lg ring-1 ring-inset ${t.chip}`}>
                    <task.icon className="size-5" aria-hidden />
                  </span>
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${t.badge}`}>
                    {task.urgent && (
                      <span className="relative flex size-1.5" aria-hidden>
                        <span className="absolute inline-flex size-full rounded-full bg-amber-400 opacity-75 motion-safe:animate-ping" />
                        <span className="relative inline-flex size-1.5 rounded-full bg-amber-500" />
                      </span>
                    )}
                    {task.badge}
                  </span>
                </div>

                <h3 className="mt-4 text-[15px] font-semibold text-slate-900">{task.title}</h3>
                <p className="mb-5 mt-1 text-sm leading-6 text-slate-600">{task.description}</p>

                <span className={`mt-auto flex items-center gap-1.5 border-t border-slate-100 pt-4 text-sm font-semibold ${t.cta}`}>
                  {task.cta}
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* KPIs */}
      <section aria-labelledby="kpi-heading">
        <SectionHeader id="kpi-heading" title="Indicateurs de Performance" meta="Mois en cours" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((kpi) => (
            <KpiCard key={kpi.id} kpi={kpi} />
          ))}
        </div>
      </section>

      {/* Quick access */}
      <section aria-labelledby="quick-heading">
        <SectionHeader id="quick-heading" title="Accès Rapides" />
        <nav aria-labelledby="quick-heading" className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className={`group flex items-center gap-3 p-3 pr-3.5 text-sm font-semibold text-slate-700 hover:text-slate-900 ${surface} ${lift} ${focusRing}`}
            >
              <span className={`flex size-9 shrink-0 items-center justify-center rounded-lg ring-1 ring-inset transition-transform duration-200 group-hover:scale-105 ${action.chip}`}>
                <action.icon className="size-[18px]" aria-hidden />
              </span>
              <span className="truncate">{action.name}</span>
              <ChevronRight className="ml-auto size-4 shrink-0 text-slate-300 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-slate-500" aria-hidden />
            </Link>
          ))}
        </nav>
      </section>

    </div>
  );
}
