import "vue-router";

declare module "vue-router" {
  interface RouteMeta {
    toc?: { id: string; label: string }[];
  }
}

export {};
