"use client"

import { ArrowLeft, TrendingUp, Flame, Lock, ExternalLink, PieChart, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/lib/language-context"
import { useTeos } from "@/lib/teos-context"
import Link from "next/link"

export default function DashboardPage() {
  const { t, language } = useLanguage()
  const { teosData, wallets } = useTeos()

  const circulatingSupply = teosData.totalSupply - teosData.burnedSupply
  const burnPercentage = ((teosData.burnedSupply / teosData.totalSupply) * 100).toFixed(2)

  // Distribution data for visualization
  const top5Total = wallets
    .slice(0, 5)
    .reduce((sum, w) => sum + w.percentage, 0)
    .toFixed(1)
  const othersPercentage = (100 - Number.parseFloat(top5Total)).toFixed(1)

  // Mock timeline data
  const supplyTimeline = [
    { month: language === "en" ? "Jan" : "يناير", total: 10000000000, burned: 1500000000 },
    { month: language === "en" ? "Feb" : "فبراير", total: 10000000000, burned: 2000000000 },
    { month: language === "en" ? "Mar" : "مارس", total: 10000000000, burned: 2400000000 },
    { month: language === "en" ? "Apr" : "أبريل", total: 10000000000, burned: 2700000000 },
    { month: language === "en" ? "May" : "مايو", total: 10000000000, burned: 2854000000 },
  ]

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 max-w-md">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex-1">
              <h1 className="text-lg font-bold leading-none">{t("dashboard.title")}</h1>
              <p className="text-xs text-muted-foreground">{t("dashboard.subtitle")}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-md">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-foreground">{t("dashboard.supply")}</span>
              </div>
              <p className="text-xl font-bold">{(teosData.totalSupply / 1000000000).toFixed(2)}B</p>
              <p className="text-xs text-muted-foreground mt-1">
                {language === "en" ? "Circulating" : "متداول"}: {(circulatingSupply / 1000000000).toFixed(2)}B
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-destructive/10 to-destructive/5">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center gap-2 mb-2">
                <Flame className="w-4 h-4 text-destructive" />
                <span className="text-xs text-muted-foreground">{t("dashboard.burned")}</span>
              </div>
              <p className="text-xl font-bold">{(teosData.burnedSupply / 1000000000).toFixed(2)}B</p>
              <p className="text-xs text-muted-foreground mt-1">
                {burnPercentage}% {language === "en" ? "of supply" : "من الإمداد"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Locked Liquidity */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Lock className="w-5 h-5 text-accent" />
              {t("dashboard.locked")}
            </CardTitle>
            <CardDescription>
              {language === "en" ? "3 permanent liquidity locks" : "3 أقفال سيولة دائمة"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {teosData.lockedLiquidity.map((link, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-muted hover:bg-muted/70 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <Lock className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      {language === "en" ? "Lock" : "قفل"} #{index + 1}
                    </p>
                    <Badge variant="outline" className="text-xs mt-1">
                      {t("dashboard.permanent")}
                    </Badge>
                  </div>
                </div>
                <a href={link} target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </a>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Distribution Chart */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <PieChart className="w-5 h-5 text-primary" />
              {t("dashboard.distribution")}
            </CardTitle>
            <CardDescription>{language === "en" ? "Token holder breakdown" : "تفصيل حائزي العملة"}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Visual Distribution Bars */}
              {wallets.slice(0, 5).map((wallet, index) => (
                <div key={wallet.address} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {language === "en" ? "Holder" : "الحائز"} #{index + 1}
                    </span>
                    <span className="font-semibold">{wallet.percentage.toFixed(2)}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${Math.min(wallet.percentage, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{language === "en" ? "Others" : "آخرون"}</span>
                  <span className="font-semibold">{othersPercentage}%</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-accent rounded-full transition-all"
                    style={{ width: `${othersPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Supply Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              {t("dashboard.timeline")}
            </CardTitle>
            <CardDescription>
              {language === "en" ? "Burn progress over time" : "تقدم الحرق مع مرور الوقت"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {supplyTimeline.map((data, index) => {
                const burnedPercent = (data.burned / data.total) * 100
                const circulatingPercent = 100 - burnedPercent

                return (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{data.month}</span>
                      <span className="text-xs text-muted-foreground">
                        {(data.burned / 1000000000).toFixed(2)}B {language === "en" ? "burned" : "محروق"}
                      </span>
                    </div>
                    <div className="h-3 rounded-full bg-muted overflow-hidden flex">
                      <div
                        className="h-full bg-accent transition-all"
                        style={{ width: `${circulatingPercent}%` }}
                        title={language === "en" ? "Circulating" : "متداول"}
                      />
                      <div
                        className="h-full bg-destructive transition-all"
                        style={{ width: `${burnedPercent}%` }}
                        title={language === "en" ? "Burned" : "محروق"}
                      />
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-4 mt-6 pt-4 border-t border-border">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-accent" />
                <span className="text-xs text-muted-foreground">{language === "en" ? "Circulating" : "متداول"}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-destructive" />
                <span className="text-xs text-muted-foreground">{language === "en" ? "Burned" : "محروق"}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Info Banner */}
        <Card className="mt-6 border-primary/20 bg-primary/5">
          <CardContent className="pt-4 pb-4">
            <div className="flex gap-3">
              <TrendingUp className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium">{language === "en" ? "Full Transparency" : "شفافية كاملة"}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {language === "en"
                    ? "All data is verified on-chain. Liquidity is permanently locked for community security."
                    : "يتم التحقق من جميع البيانات على البلوكتشين. السيولة مقفلة بشكل دائم لأمان المجتمع."}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
