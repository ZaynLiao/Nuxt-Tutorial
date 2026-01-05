export default defineAppConfig({
  ui: {
    colors: {
      primary: "emerald",
      neutral: "slate",
    },
    card: {
      slots: {
        root: "bg-slate-900/50 backdrop-blur-md ring-1 ring-white/10 hover:ring-emerald-500/50 transition-all duration-300 divide-y divide-white/10",
        header: "bg-transparent",
      },
    },
    button: {
      defaultVariants: {
        color: "primary",
        variant: "solid",
      },
    },
    badge: {
      defaultVariants: {
        variant: "subtle",
      },
    },
  },
});
