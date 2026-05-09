import { createFileRoute } from "@tanstack/react-router";
import { RelatedResourcesScreen } from "./related";

export const Route = createFileRoute("/resources")({
  component: RelatedResourcesScreen,
  head: () => ({
    meta: [{ title: "Related Resources" }],
  }),
});
