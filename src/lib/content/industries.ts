import { HeartPulse, Truck, MapPin, GraduationCap, Briefcase, type LucideIcon } from "lucide-react";

export type Industry = {
  icon: LucideIcon;
  title: string;
  description: string;
};

// Five verticals being tested, not five specialisms already proven — see
// docs/target-audience.md "Initial Industries Being Tested" and
// docs/australian-market.md's healthcare/privacy guardrails. Kept to one
// recognizable operational pattern each, no claimed compliance or deep
// specialization.
export const INDUSTRIES: Industry[] = [
  {
    icon: HeartPulse,
    title: "Healthcare & Wellness",
    description:
      "Clinics and wellness providers losing hours to bookings, client messages and paperwork that pull staff away from care.",
  },
  {
    icon: Briefcase,
    title: "Professional Services",
    description:
      "Accountants, advisers and consultancies chasing documents, tracking time and billing through spreadsheets and disconnected software.",
  },
  {
    icon: Truck,
    title: "Logistics",
    description:
      "Businesses coordinating bookings, dispatch, and reporting across multiple moving parts and disconnected tools.",
  },
  {
    icon: MapPin,
    title: "Tourism & Hospitality",
    description:
      "Operators managing bookings, availability, and guest communication across seasons and channels.",
  },
  {
    icon: GraduationCap,
    title: "Education",
    description:
      "Schools and training providers handling enrolments, scheduling, and repetitive administrative communication.",
  },
];
