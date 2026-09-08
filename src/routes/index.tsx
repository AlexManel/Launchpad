import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  Check,
  FileText,
  LayoutDashboard,
  Mail,
  MessageCircle,
  Package,
  Sparkles,
  Workflow,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Section } from "@/components/site/Section";
import { HeroMedia } from "@/components/site/HeroMedia";
import { HeroOverlay } from "@/components/site/HeroOverlay";
import { tools, products } from "@/data/webrya";
import { useI18n } from "@/i18n/I18nProvider";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Webrya — Run your properties smarter" },
      {
        name: "description",
        content:
          "AI toolkit for Airbnb hosts: guest replies, review responses with host notes, and listing optimization. Not a PMS.",
      },
      { property: "og:title", content: "Webrya — Run your properties smarter" },
      {
        property: "og:description",
        content:
          "AI toolkit for Airbnb hosts: messages, reviews and listing optimization. Not a PMS.",
      },
      { property: "og:url", content: "https://webrya.com/" },
      { property: "og:image", content: "https://webrya.com/villa.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://webrya.com/" }],
  }),
  component: Home,
});
