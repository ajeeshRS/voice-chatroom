import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}
export default function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="flex flex-col items-center p-6 bg-neutral-100 rounded-lg">
      {icon}
      <h2 className="mt-4 text-xl font-semibold">{title}</h2>
      <p className="mt-2 text-xs text-muted-foreground">{description}</p>
    </div>
  );
}
