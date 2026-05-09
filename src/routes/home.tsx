import { createFileRoute } from "@tanstack/react-router";
import { RecommendationsScreen } from "./index";

export const Route = createFileRoute("/home")({
  component: RecommendationsScreen,
  head: () => ({
    meta: [{ title: "Recommendations" }],
  }),
});
