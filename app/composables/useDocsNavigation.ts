export const useDocsNavigation = () => {
  const route = useRoute();

  // Find current group
  const currentGroup = computed(() => {
    return sidebarGroups.find((group) =>
      group.items.some((item) => item.to === route.path)
    );
  });

  // Find current page item
  const currentPage = computed(() => {
    return currentGroup.value?.items.find((item) => item.to === route.path);
  });

  // Flatten all links from sidebar groups
  const allLinks = computed(() => {
    return sidebarGroups.flatMap((group) => group.items);
  });

  // Find current index
  const currentIndex = computed(() => {
    // Logic to handle trailing slashes if necessary, but simple match for now
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
    currentGroup,
    currentPage,
  };
};
