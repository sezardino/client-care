import { Typography } from "@/components/ui/typography";
import { Card, CardBody, CardHeader, Chip, cn } from "@nextui-org/react";
import { Check } from "lucide-react";

const content = {
  title: "Project Roadmap",
  subtitle:
    "Track our progress and see the key features we plan to roll out in each phase.",
  mvps: [
    {
      version: "MVP 0",
      title: "Landing Page with Project Description",
      goal: "Attract initial users and showcase the concept.",
      functionality: [
        "Presentation of the Client Care project with a description of key features.",
        "Project roadmap with detailed MVPs.",
        "Feedback form for subscribing to product news.",
        "FAQ for potential users.",
        "CTA (Call to Action) for early user registration.",
      ],
    },
    {
      version: "MVP 1",
      title: "Platform, Basic Widget, and Team Management",
      goal: "Launch a minimal working version to gather user requests and manage teams.",
      functionality: [
        "Widget: form with fields (name, contact details, request, attachment of up to 5 files, each up to 5 MB).",
        "Platform: ability to create 5 projects and 5 widgets for each client.",
        "Request processing: submission through the widget, filtering requests to separate spam, automatic ticket creation.",
        "Simple ticket management panel: view incoming requests, respond to requests, and close tickets.",
        "Team and role management: create roles (administrator, operator, observer) and manage employees.",
        "Internationalization (i18n): support for one language in the widget.",
      ],
    },
    {
      version: "MVP 2",
      title: "Client Portal",
      goal: "Create a client portal for interaction with requests.",
      functionality: [
        "Clients can track the status of their requests.",
        "View ticket history and communication with support.",
        "Rate the service after ticket resolution.",
        "Access to a knowledge base with frequently asked questions.",
      ],
    },
    {
      version: "MVP 3",
      title: "Reports and Analytics",
      goal: "Add basic analytics and reporting tools.",
      functionality: [
        "Automatic report generation on the number of processed tickets, response time, and request handling time.",
        "Dashboard with visualization of current tickets, their status, and employee performance statistics.",
        "Ability to export reports in CSV format.",
      ],
    },
    {
      version: "MVP 4",
      title: "Widget Customization and Enhanced Project Management",
      goal: "Expand widget and project capabilities for users.",
      functionality: [
        "Support for widget customization (color scheme, fonts, logos).",
        "Preview of widget changes in real time.",
        "Add multiple widgets within a single project.",
        "Support for multiple languages in the widget.",
      ],
    },
    {
      version: "MVP 5",
      title: "Mobile Optimization",
      goal: "Ensure request handling through mobile devices.",
      functionality: [
        "Develop a responsive version of the platform for mobile devices.",
        "Support for ticket submission and handling from mobile devices.",
        "Implement PWA (Progressive Web App) for offline access and push notifications.",
      ],
    },
    {
      version: "MVP 6",
      title: "Monetization and Subscriptions",
      goal: "Introduce a subscription system and pricing plans for service monetization.",
      functionality: [
        "Introduce pricing plans with various limits on the number of projects, widgets, and employees.",
        "Payment through the platform (Stripe, PayPal, or other payment systems).",
      ],
    },
    {
      version: "MVP 7",
      title: "Scalability and Enhanced Interaction",
      goal: "Support large organizations and improve user interaction.",
      functionality: [
        "Allow users with large teams to create multiple projects with extended widget and role management.",
        "Improved communication with clients: automatic notifications about ticket status.",
        "Integration with other internal systems via API.",
      ],
    },
    {
      version: "MVP 8",
      title: "Security and Privacy",
      goal: "Enhance security and client data protection.",
      functionality: [
        "Data encryption during transmission and storage.",
        "GDPR compliance for client personal data protection.",
        "Implement two-factor authentication (2FA) to protect accounts.",
      ],
    },
  ],
};

const currentMVPVersion = 0;

export const LandingRoadMapSection = () => {
  return (
    <section className="container py-20">
      <header className="text-center">
        <Typography
          level="h1"
          styling="h1"
          weight="bold"
          className="my-6 text-pretty"
        >
          {content.title}
        </Typography>
        <Typography level="p" className="mb-8 text-muted-foreground">
          {content.subtitle}
        </Typography>
      </header>
      <ul className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
        {content.mvps.map((mvp, index) => (
          <li
            key={index}
            className={cn(
              "relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group",
              currentMVPVersion >= index && "is-active"
            )}
          >
            <div
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full border border-white bg-background group-[.is-active]:bg-emerald-500 text-slate-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2"
              )}
            >
              {currentMVPVersion >= index && <Check />}
            </div>
            <Card className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)]">
              <CardHeader className="flex-col items-start">
                <Typography
                  level="h3"
                  styling="large"
                  weight="bold"
                  className="inline"
                >
                  {mvp.title}
                </Typography>
                <Chip color="secondary" size="sm" className="-order-1">
                  {mvp.version}
                </Chip>{" "}
                <Typography styling="small">{mvp.goal}</Typography>
              </CardHeader>
              <CardBody className="pt-0">
                <Typography level="h4" weight="medium">
                  Features:
                </Typography>
                <ul className="list-inside list-disc">
                  {mvp.functionality.map((feature, featureIndex) => (
                    <Typography
                      key={featureIndex}
                      asChild
                      styling="small"
                      className="text-muted-foreground"
                    >
                      <li>{feature}</li>
                    </Typography>
                  ))}
                </ul>
              </CardBody>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  );
};
