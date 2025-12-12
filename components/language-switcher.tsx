"use client"

import { Languages } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <Button variant="outline" size="sm" onClick={() => setLanguage(language === "en" ? "ar" : "en")} className="gap-2">
      <Languages className="w-4 h-4" />
      {language === "en" ? "العربية" : "English"}
    </Button>
  )
}
