import "vue-router";

export interface NavItem {
  label: string;
  to: string;
  icon: string;
  description?: string;
}

export interface NavGroup {
  id?: string;
  title: string;
  icon?: string;
  items: NavItem[];
}

declare module "vue-router" {
  interface RouteMeta {
    toc?: { id: string; label: string }[];
  }
}

export {};
