import { getMessages } from "next-intl/server";
import type { AbstractIntlMessages } from "next-intl";
import HomeComponent from "@/components/Home";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const messages: AbstractIntlMessages = await getMessages({ locale });

  

  const title =
    typeof messages === "object" &&
    "TabTitles" in messages &&
    typeof messages.TabTitles === "object"
      ? (messages.TabTitles as Record<string, unknown>).title
      : "";

  return {
    title,
 
  };
}

// If your MainPage component needs params, update it like this:
// const MainPage = async ({ params }: PageProps) => {
//   const { locale } = await params;
//   return <HomeComponent locale={locale} />;
// };

const MainPage = () => <HomeComponent />;

export default MainPage;
