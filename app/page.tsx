"use client"

import { BarChart3, Shield, Vote, AlertTriangle, Search, Settings } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/lib/language-context"
import { useTeos } from "@/lib/teos-context"
import { LanguageSwitcher } from "@/components/language-switcher"
import Link from "next/link"

export default function HomePage() {
  const { t, language } = useLanguage()
  const { teosData, alerts, proposals, wallets } = useTeos()

  const activeAlerts = alerts.filter((a) => a.severity === "high").length
  const activeProposals = proposals.filter((p) => p.status === "active").length
  const whaleCount = wallets.filter((w) => w.percentage > teosData.whaleThreshold).length

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold leading-none">{t("header.title")}</h1>
              <p className="text-xs text-muted-foreground">{t("header.subtitle")}</p>
            </div>
          </div>
          <LanguageSwitcher />
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 pb-24 max-w-md">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2 text-balance">{t("home.hero.title")}</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">{t("home.hero.subtitle")}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
            <CardContent className="pt-4 pb-3 px-4">
              <div className="flex items-center gap-2 mb-1">
                <BarChart3 className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-foreground">{t("home.stats.holders")}</span>
              </div>
              <p className="text-xl font-bold">{teosData.holders}</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-accent/10 to-accent/5">
            <CardContent className="pt-4 pb-3 px-4">
              <div className="flex items-center gap-2 mb-1">
                <Shield className="w-4 h-4 text-accent" />
                <span className="text-xs text-muted-foreground">{t("home.stats.supply")}</span>
              </div>
              <p className="text-xl font-bold">{(teosData.totalSupply / 1000000000).toFixed(2)}B</p>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Cards */}
        <div className="space-y-3">
          <Link href="/analysis">
            <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
              <CardContent className="pt-4 pb-4 px-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Search className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{t("analysis.title")}</h3>
                    <p className="text-xs text-muted-foreground">{t("analysis.subtitle")}</p>
                  </div>
                  {whaleCount > 0 && (
                    <Badge variant="destructive" className="text-xs">
                      {whaleCount}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/dashboard">
            <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
              <CardContent className="pt-4 pb-4 px-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{t("dashboard.title")}</h3>
                    <p className="text-xs text-muted-foreground">{t("dashboard.subtitle")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/alerts">
            <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
              <CardContent className="pt-4 pb-4 px-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-5 h-5 text-destructive" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{t("alerts.title")}</h3>
                    <p className="text-xs text-muted-foreground">{t("alerts.subtitle")}</p>
                  </div>
                  {activeAlerts > 0 && (
                    <Badge variant="destructive" className="text-xs">
                      {activeAlerts}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/governance">
            <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
              <CardContent className="pt-4 pb-4 px-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Vote className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{t("governance.title")}</h3>
                    <p className="text-xs text-muted-foreground">{t("governance.subtitle")}</p>
                  </div>
                  {activeProposals > 0 && (
                    <Badge variant="outline" className="text-xs">
                      {activeProposals}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin">
            <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
              <CardContent className="pt-4 pb-4 px-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center flex-shrink-0">
                    <Settings className="w-5 h-5 text-yellow-600 dark:text-yellow-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{t("admin.title")}</h3>
                    <p className="text-xs text-muted-foreground">{t("admin.subtitle")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Footer Links */}
        <div className="mt-8 pt-6 border-t border-border">
          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <Link href="/terms" className="hover:text-primary transition-colors">
              {t("footer.terms")}
            </Link>
            <span>•</span>
            <Link href="/privacy" className="hover:text-primary transition-colors">
              {t("footer.privacy")}
            </Link>
            <span>•</span>
            <a
              href="https://github.com/Elmahrosa/Teos-Civic-Mixer"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              GitHub
            </a>
          </div>
          <p className="text-center text-xs text-muted-foreground mt-3">
            {language === "en"
              ? "Protected by TEOS Egypt Sovereign License (TESL)"
              : "محمي بترخيص تيوس مصر السيادي (TESL)"}
          </p>
        </div>
      </main>
    </div>
  )
}
