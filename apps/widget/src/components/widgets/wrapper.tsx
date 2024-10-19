import { PropsWithChildren, useEffect, useState } from "react";

type Props = PropsWithChildren & {
  token: string;
  isDev?: boolean;
};

export const WidgetWrapper = (props: Props) => {
  const { isDev, token, children } = props;
  const [isWidgetActive, setIsWidgetActive] = useState(false);
  console.log({ isDev });
  useEffect(() => {
    const checkWidgetStatus = async () => {
      try {
        const url = isDev
          ? "http://localhost:3000"
          : import.meta.env.VITE_PUBLIC_URL;

        const response = await fetch(`${url}/api/widget/status`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

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
