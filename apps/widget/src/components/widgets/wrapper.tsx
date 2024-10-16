import { PropsWithChildren, useEffect, useState } from "react";

type Props = PropsWithChildren & {
  token: string;
};

export const WidgetWrapper = (props: Props) => {
  const { token, children } = props;
  const [isWidgetActive, setIsWidgetActive] = useState(false);

  useEffect(() => {
    const checkWidgetStatus = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_PUBLIC_URL}/api/widget-status`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) return;
        const content = await response.json();

        if ("enabled" in content) setIsWidgetActive(content.enabled);
      } catch (error) {
        console.log(error);
      }
    };

    checkWidgetStatus();
  }, []);

  if (!isWidgetActive) return;

  return children;
};
