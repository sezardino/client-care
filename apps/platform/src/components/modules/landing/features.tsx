import {
  BarChart2,
  ChartArea,
  Layers,
  MessageCircle,
  ShieldOff,
  Sliders,
  Ticket,
  UserCheck,
  Users,
} from "lucide-react";

const content = {
  title: "Key Features of Client Care",
  badge: "Empowering Your Customer Support",
  subtitle:
    "Discover the powerful features designed to enhance your customer support experience, streamline request management, and foster effective communication.",
  features: [
    {
      name: "Customer Request Widget",
      description:
        "Easily embed a customizable widget on your website for customers to submit their requests and issues.",
      icon: MessageCircle,
    },
    {
      name: "Automated Ticket Creation",
      description:
        "Requests submitted through the widget are automatically converted into tickets for efficient tracking and management.",
      icon: Ticket,
    },
    {
      name: "Spam Filtering",
      description:
        "Advanced filtering options help separate spam from legitimate requests, ensuring your team focuses on what matters.",
      icon: ShieldOff,
    },
    {
      name: "Team Management",
      description:
        "Assign roles and manage team members within projects, ensuring the right people handle customer requests.",
      icon: Users,
    },
    {
      name: "Customer Portal",
      description:
        "A dedicated portal where customers can track the status of their requests and provide feedback after resolution.",
      icon: UserCheck,
    },
    {
      name: "Analytics Dashboard",
      description:
        "Gain insights into request handling with a comprehensive dashboard that displays key performance metrics.",
      icon: BarChart2,
    },
    {
      name: "Real-Time Communication",
      description:
        "Stay in touch with customers directly through the platform, allowing for immediate responses and updates on requests.",
      icon: ChartArea,
    },
    {
      name: "Customizable Widgets",
      description:
        "Tailor the look and feel of the widget to match your brand with various customization options.",
      icon: Sliders,
    },
    {
      name: "Multi-Project Support",
      description:
        "Manage multiple projects and widgets, allowing for flexibility and scalability as your business grows.",
      icon: Layers,
    },
  ],
};

export const LandingFeaturesSection = () => {
  return (
    <section id="features" className="py-32">
      <div className="container mx-auto max-w-screen-xl">
        <header className="flex flex-col">
          <h2 className="text-3xl font-medium md:pl-5 lg:text-4xl">
            {content.title}
          </h2>
          <p className="md:pl-5 mt-4 max-w-2xl text-muted-foreground lg:text-xl">
            {content.subtitle}
          </p>
          <p className="mb-4 text-xs text-muted-foreground md:pl-5 -order-1">
            {content.badge}
          </p>
        </header>
        <ul className="mx-auto mt-14 grid gap-x-20 gap-y-8 md:grid-cols-2 md:gap-y-6 xl:grid-cols-3 lg:mt-20">
          {content.features.map((feature, idx) => (
            <li className="flex gap-6 rounded-lg md:block md:p-5" key={idx}>
              <span className="mb-8 flex size-10 shrink-0 items-center justify-center rounded-full bg-accent md:size-12">
                <feature.icon />
              </span>
              <div>
                <h3 className="font-medium md:mb-2 md:text-xl">
                  {feature.name}
                </h3>
                <p className="text-sm text-muted-foreground md:text-base">
                  {feature.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
