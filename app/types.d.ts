import "vue-router";

declare global {
  interface NavItem {
    label: string;
    to: string;
    icon: string;
    description?: string;
    badges?: { label: string; color?: string }[];
  }

  interface NavGroup {
    id?: string;
    title: string;
    icon?: string;
    items: NavItem[];
  }
}

declare module "vue-router" {
  interface RouteMeta {
    toc?: { id: string; label: string }[];
  }
}

export {};
