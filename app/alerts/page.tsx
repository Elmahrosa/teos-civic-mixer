"use client"

import { ArrowLeft, AlertTriangle, TrendingUp, Shield, Clock, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/lib/language-context"
import { useTeos } from "@/lib/teos-context"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { ar, enUS } from "date-fns/locale"
import { useState } from "react"

export default function AlertsPage() {
  const { t, language } = useLanguage()
  const { alerts, addAlert, teosData } = useTeos()
  const [dismissed, setDismissed] = useState<string[]>([])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "border-destructive/20 bg-destructive/5"
      case "medium":
        return "border-yellow-500/20 bg-yellow-500/5"
      case "low":
        return "border-blue-500/20 bg-blue-500/5"
      default:
        return ""
    }
  }

  const getSeverityIcon = (type: string) => {
    switch (type) {
      case "whale":
        return AlertTriangle
      case "sudden":
        return TrendingUp
      case "risk":
        return Shield
      default:
        return AlertTriangle
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      case "low":
        return "outline"
      default:
        return "outline"
    }
  }

  const handleDismiss = (id: string) => {
    setDismissed((prev) => [...prev, id])
  }

  const activeAlerts = alerts.filter((alert) => !dismissed.includes(alert.id))
  const highSeverityCount = activeAlerts.filter((a) => a.severity === "high").length

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
              <h1 className="text-lg font-bold leading-none">{t("alerts.title")}</h1>
              <p className="text-xs text-muted-foreground">{t("alerts.subtitle")}</p>
            </div>
            {highSeverityCount > 0 && (
              <Badge variant="destructive" className="gap-1">
                <AlertTriangle className="w-3 h-3" />
                {highSeverityCount}
              </Badge>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-md">
        {/* Alert Summary */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card className="bg-destructive/5">
            <CardContent className="pt-4 pb-3 px-3">
              <div className="text-center">
                <p className="text-2xl font-bold text-destructive">
                  {activeAlerts.filter((a) => a.severity === "high").length}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{t("analysis.high")}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-yellow-500/5">
            <CardContent className="pt-4 pb-3 px-3">
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-500">
                  {activeAlerts.filter((a) => a.severity === "medium").length}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{t("analysis.medium")}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-blue-500/5">
            <CardContent className="pt-4 pb-3 px-3">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-500">
                  {activeAlerts.filter((a) => a.severity === "low").length}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{t("analysis.low")}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Info Card */}
        <Card className="mb-6 border-primary/20 bg-primary/5">
          <CardContent className="pt-4 pb-4">
            <div className="flex gap-3">
              <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium">{language === "en" ? "Real-Time Monitoring" : "مراقبة فورية"}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {language === "en"
                    ? `System automatically monitors for wallets exceeding ${teosData.whaleThreshold}% ownership, sudden large transactions, and suspicious patterns.`
                    : `يراقب النظام تلقائيًا المحافظ التي تتجاوز ${teosData.whaleThreshold}٪ من الملكية والمعاملات الكبيرة المفاجئة والأنماط المشبوهة.`}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alerts List */}
        <div className="space-y-3">
          {activeAlerts.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="pt-12 pb-12 text-center">
                <Shield className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                <p className="text-sm text-muted-foreground">{t("alerts.noAlerts")}</p>
              </CardContent>
            </Card>
          ) : (
            activeAlerts
              .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
              .map((alert) => {
                const Icon = getSeverityIcon(alert.type)
                return (
                  <Card key={alert.id} className={getSeverityColor(alert.severity)}>
                    <CardContent className="pt-4 pb-4">
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                            alert.severity === "high"
                              ? "bg-destructive/10"
                              : alert.severity === "medium"
                                ? "bg-yellow-500/10"
                                : "bg-blue-500/10"
                          }`}
                        >
                          <Icon
                            className={`w-5 h-5 ${
                              alert.severity === "high"
                                ? "text-destructive"
                                : alert.severity === "medium"
                                  ? "text-yellow-600 dark:text-yellow-500"
                                  : "text-blue-600 dark:text-blue-500"
                            }`}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <Badge variant={getSeverityBadge(alert.severity) as any} className="text-xs">
                              {t(`alerts.${alert.type}`)}
                            </Badge>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 -mt-1 -mr-2"
                              onClick={() => handleDismiss(alert.id)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                          <p className="text-sm leading-relaxed mb-2">{alert.message}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            <span>
                              {formatDistanceToNow(alert.timestamp, {
                                addSuffix: true,
                                locale: language === "ar" ? ar : enUS,
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })
          )}
        </div>

        {/* Risk Explanation */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">{language === "en" ? "Risk Categories" : "فئات المخاطر"}</CardTitle>
            <CardDescription>{language === "en" ? "Understanding alert types" : "فهم أنواع التنبيهات"}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium">{t("alerts.whale")}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {language === "en"
                    ? "Wallets holding more than 20% of supply. Can cause severe price manipulation."
                    : "المحافظ التي تحتفظ بأكثر من 20٪ من الإمداد. يمكن أن تسبب تلاعبًا شديدًا في الأسعار."}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium">{t("alerts.sudden")}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {language === "en"
                    ? "Large buy or sell orders detected. May indicate pump and dump schemes."
                    : "تم اكتشاف أوامر شراء أو بيع كبيرة. قد يشير إلى مخططات الضخ والتفريغ."}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium">{t("alerts.risk")}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {language === "en"
                    ? "General security warnings about distribution patterns and liquidity."
                    : "تحذيرات أمنية عامة حول أنماط التوزيع والسيولة."}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Test Alert Button for Demo */}
        <Button
          variant="outline"
          className="w-full mt-6 bg-transparent"
          onClick={() => {
            addAlert({
              type: "sudden",
              message:
                language === "en"
                  ? "Large sell detected: 50M TEOS tokens moved to exchange"
                  : "تم اكتشاف عملية بيع كبيرة: تم نقل 50 مليون عملة TEOS إلى البورصة",
              severity: "medium",
            })
          }}
        >
          {language === "en" ? "Simulate Alert (Demo)" : "محاكاة تنبيه (تجريبي)"}
        </Button>
      </main>
    </div>
  )
}
