"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "ar"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  en: {
    // Header
    "header.title": "TEOS",
    "header.subtitle": "Civic Mixer",
    "header.badge": "Egypt Blockchain",

    // Navigation
    "nav.home": "Home",
    "nav.analysis": "Analysis",
    "nav.dashboard": "Dashboard",
    "nav.governance": "Governance",
    "nav.admin": "Admin",

    // Home
    "home.hero.title": "Secure Civic Privacy Mixer",
    "home.hero.subtitle": "Badge-verified privacy transactions for Egypt's digital transformation",
    "home.stats.holders": "Holders",
    "home.stats.supply": "Supply",
    "home.stats.burned": "Burned",
    "home.stats.locked": "Locked",

    // Wallet Analysis
    "analysis.title": "Wallet Analysis",
    "analysis.subtitle": "Scan and analyze TEOS token holders",
    "analysis.scan": "Scan Wallet",
    "analysis.address": "Wallet Address",
    "analysis.whales": "Whale Wallets",
    "analysis.risk": "Risk Level",
    "analysis.ownership": "Ownership",
    "analysis.high": "High",
    "analysis.medium": "Medium",
    "analysis.low": "Low",
    "analysis.topHolders": "Top Holders",

    // Dashboard
    "dashboard.title": "Token Transparency",
    "dashboard.subtitle": "Complete transparency for TEOS Egypt",
    "dashboard.supply": "Total Supply",
    "dashboard.burned": "Burned Supply",
    "dashboard.locked": "Locked Liquidity",
    "dashboard.permanent": "Permanent",
    "dashboard.distribution": "Distribution Chart",
    "dashboard.timeline": "Supply Timeline",

    // Anti-Manipulation
    "alerts.title": "Anti-Manipulation",
    "alerts.subtitle": "Real-time security monitoring",
    "alerts.whale": "Whale Alert",
    "alerts.sudden": "Sudden Activity",
    "alerts.risk": "Risk Warning",
    "alerts.noAlerts": "No active alerts",

    // Governance
    "governance.title": "Governance",
    "governance.subtitle": "Community proposals and voting",
    "governance.create": "Create Proposal",
    "governance.active": "Active Proposals",
    "governance.vote": "Vote",
    "governance.voted": "Voted",
    "governance.ends": "Ends in",
    "governance.days": "days",

    // Admin
    "admin.title": "Admin Panel",
    "admin.subtitle": "Manage token transparency",
    "admin.update": "Update",
    "admin.version": "Token Version",
    "admin.burnAmount": "Burned Amount",
    "admin.lockLink": "Liquidity Lock Link",
    "admin.notice": "Transparency Notice",
    "admin.publish": "Publish Notice",

    // Terms & Privacy
    "terms.title": "Terms of Service",
    "privacy.title": "Privacy Policy",
    "footer.terms": "Terms",
    "footer.privacy": "Privacy",

    // Common
    "common.loading": "Loading...",
    "common.error": "Error",
    "common.success": "Success",
    "common.cancel": "Cancel",
    "common.confirm": "Confirm",
    "common.close": "Close",
  },
  ar: {
    // Header
    "header.title": "تيوس",
    "header.subtitle": "خلاط المواطنة",
    "header.badge": "بلوكتشين مصر",

    // Navigation
    "nav.home": "الرئيسية",
    "nav.analysis": "التحليل",
    "nav.dashboard": "لوحة البيانات",
    "nav.governance": "الحوكمة",
    "nav.admin": "الإدارة",

    // Home
    "home.hero.title": "خلاط الخصوصية المدنية الآمن",
    "home.hero.subtitle": "معاملات خاصة موثقة بالشارات للتحول الرقمي في مصر",
    "home.stats.holders": "الحائزون",
    "home.stats.supply": "الإمداد",
    "home.stats.burned": "محروق",
    "home.stats.locked": "مقفل",

    // Wallet Analysis
    "analysis.title": "تحليل المحفظة",
    "analysis.subtitle": "مسح وتحليل حائزي عملة TEOS",
    "analysis.scan": "مسح المحفظة",
    "analysis.address": "عنوان المحفظة",
    "analysis.whales": "محافظ الحيتان",
    "analysis.risk": "مستوى المخاطر",
    "analysis.ownership": "الملكية",
    "analysis.high": "عالي",
    "analysis.medium": "متوسط",
    "analysis.low": "منخفض",
    "analysis.topHolders": "أكبر الحائزين",

    // Dashboard
    "dashboard.title": "شفافية العملة",
    "dashboard.subtitle": "شفافية كاملة لتيوس مصر",
    "dashboard.supply": "إجمالي الإمداد",
    "dashboard.burned": "الإمداد المحروق",
    "dashboard.locked": "السيولة المقفلة",
    "dashboard.permanent": "دائم",
    "dashboard.distribution": "مخطط التوزيع",
    "dashboard.timeline": "الجدول الزمني للإمداد",

    // Anti-Manipulation
    "alerts.title": "مكافحة التلاعب",
    "alerts.subtitle": "مراقبة أمنية فورية",
    "alerts.whale": "تنبيه الحوت",
    "alerts.sudden": "نشاط مفاجئ",
    "alerts.risk": "تحذير مخاطر",
    "alerts.noAlerts": "لا توجد تنبيهات نشطة",

    // Governance
    "governance.title": "الحوكمة",
    "governance.subtitle": "مقترحات المجتمع والتصويت",
    "governance.create": "إنشاء مقترح",
    "governance.active": "المقترحات النشطة",
    "governance.vote": "صوت",
    "governance.voted": "تم التصويت",
    "governance.ends": "ينتهي خلال",
    "governance.days": "أيام",

    // Admin
    "admin.title": "لوحة الإدارة",
    "admin.subtitle": "إدارة شفافية العملة",
    "admin.update": "تحديث",
    "admin.version": "إصدار العملة",
    "admin.burnAmount": "المبلغ المحروق",
    "admin.lockLink": "رابط قفل السيولة",
    "admin.notice": "إشعار الشفافية",
    "admin.publish": "نشر الإشعار",

    // Terms & Privacy
    "terms.title": "شروط الخدمة",
    "privacy.title": "سياسة الخصوصية",
    "footer.terms": "الشروط",
    "footer.privacy": "الخصوصية",

    // Common
    "common.loading": "جاري التحميل...",
    "common.error": "خطأ",
    "common.success": "نجح",
    "common.cancel": "إلغاء",
    "common.confirm": "تأكيد",
    "common.close": "إغلاق",
  },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")

  useEffect(() => {
    const saved = localStorage.getItem("teos-language") as Language
    if (saved && (saved === "en" || saved === "ar")) {
      setLanguageState(saved)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("teos-language", lang)
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"
    document.documentElement.lang = lang
  }

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
