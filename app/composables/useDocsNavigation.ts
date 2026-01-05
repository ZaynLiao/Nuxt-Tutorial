import { sidebarGroups } from "~/utils/navigation";

export const useDocsNavigation = () => {
  const route = useRoute();

  // Flatten all links from sidebar groups
  const allLinks = computed(() => {
    return sidebarGroups.flatMap((group) => group.links);
  });

  // Find current index
  const currentIndex = computed(() => {
    return allLinks.value.findIndex((link) => link.to === route.path);
  });

  // Get Prev/Next links
  const prev = computed(() => {
    if (currentIndex.value > 0) {
      return allLinks.value[currentIndex.value - 1];
    }
    return null;
  });

  const next = computed(() => {
    if (
      currentIndex.value !== -1 &&
      currentIndex.value < allLinks.value.length - 1
    ) {
      return allLinks.value[currentIndex.value + 1];
    }
    return null;
  });

  return {
    prev,
    next,
  };
};
