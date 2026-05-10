import { Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Language } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const languages: { code: Language; label: string; nativeLabel: string }[] = [
  { code: "zh-CN", label: "Simplified Chinese", nativeLabel: "简体中文" },
  { code: "zh-TW", label: "Traditional Chinese", nativeLabel: "繁體中文" },
  { code: "en", label: "English", nativeLabel: "English" },
];

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 font-sans text-sm text-muted-foreground transition hover:text-primary"
          aria-label="切换语言 / Switch Language"
        >
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{languages.find((l) => l.code === language)?.nativeLabel}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className="cursor-pointer"
            aria-current={language === lang.code ? "page" : undefined}
          >
            <div className="flex w-full items-center justify-between">
              <span className="font-sans">{lang.nativeLabel}</span>
              {language === lang.code && <span className="text-primary">✓</span>}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
