import { MapPin } from "react-feather";
import { footerSocialLinks } from "@/data";
import Link from "next/link";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/Language/page";

const TopBarTwo = () => {
  const t = useTranslations();

  return (
    <div className="bg-black/80 text-white py-2 px-4">
      <div className="container mx-auto flex-col md:flex-row flex justify-between items-center text-sm">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          <span className="text-12">{t("Topbar.location")}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm">{t("Topbar.followUs")}</span>
          <div className="flex items-center gap-3">
            {footerSocialLinks?.map(({ link, icon: Icon }, index) => (
              <Link
                key={index}
                href={link}
                className="hover:opacity-80 hover:border-[#ff6b2c] hover:text-[#ff6b2c] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon className="w-4 h-4" />
                <span className="sr-only">Facebook</span>
              </Link>
            ))}

            <>
              <LanguageSwitcher />
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBarTwo;
