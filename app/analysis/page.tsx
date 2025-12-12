"use client"

import { useState } from "react"
import { Search, AlertTriangle, TrendingUp, Wallet, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/lib/language-context"
import { useTeos } from "@/lib/teos-context"
import Link from "next/link"

export default function AnalysisPage() {
  const { t, language } = useLanguage()
  const { wallets, teosData, scanWallet } = useTeos()
  const [searchAddress, setSearchAddress] = useState("")
  const [scanning, setScanning] = useState(false)
  const [scannedWallet, setScannedWallet] = useState<any>(null)

  const handleScan = async () => {
    if (!searchAddress) return
    setScanning(true)
    const result = await scanWallet(searchAddress)
    setScannedWallet(result)
    setScanning(false)
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high":
        return "text-red-500"
      case "medium":
        return "text-yellow-500"
      case "low":
        return "text-green-500"
      default:
        return "text-muted-foreground"
    }
  }

  const getRiskBadgeVariant = (risk: string) => {
    switch (risk) {
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

  const whaleWallets = wallets.filter((w) => w.percentage > teosData.whaleThreshold)
  const totalWhaleOwnership = whaleWallets.reduce((sum, w) => sum + w.percentage, 0)

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
              <h1 className="text-lg font-bold leading-none">{t("analysis.title")}</h1>
              <p className="text-xs text-muted-foreground">{t("analysis.subtitle")}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-md">
        {/* Scan Wallet */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Search className="w-5 h-5 text-primary" />
              {t("analysis.scan")}
            </CardTitle>
            <CardDescription>{t("analysis.address")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="0x..."
                value={searchAddress}
                onChange={(e) => setSearchAddress(e.target.value)}
                className="font-mono text-sm"
                dir="ltr"
              />
              <Button onClick={handleScan} disabled={scanning || !searchAddress}>
                {scanning ? t("common.loading") : t("analysis.scan")}
              </Button>
            </div>

            {scannedWallet && (
              <div className="p-4 rounded-lg bg-muted space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{t("analysis.address")}</span>
                  <span className="text-sm font-mono">{scannedWallet.address.slice(0, 10)}...</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{t("analysis.ownership")}</span>
                  <span className="text-lg font-bold">{scannedWallet.percentage.toFixed(2)}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{t("analysis.risk")}</span>
                  <Badge variant={getRiskBadgeVariant(scannedWallet.risk)}>{t(`analysis.${scannedWallet.risk}`)}</Badge>
                </div>
                {scannedWallet.percentage > teosData.whaleThreshold && (
                  <div className="flex items-start gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                    <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-destructive leading-relaxed">
                      {language === "en"
                        ? `This wallet owns more than ${teosData.whaleThreshold}% of supply. High manipulation risk.`
                        : `تمتلك هذه المحفظة أكثر من ${teosData.whaleThreshold}٪ من الإمداد. مخاطر تلاعب عالية.`}
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Whale Alert Summary */}
        <Card className="mb-6 border-destructive/20 bg-destructive/5">
          <CardContent className="pt-6 pb-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
              <div className="flex-1 space-y-2">
                <h3 className="font-semibold text-sm">{t("analysis.whales")}</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground">{language === "en" ? "Count" : "العدد"}</p>
                    <p className="text-2xl font-bold text-destructive">{whaleWallets.length}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {language === "en" ? "Total Ownership" : "إجمالي الملكية"}
                    </p>
                    <p className="text-2xl font-bold text-destructive">{totalWhaleOwnership.toFixed(1)}%</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Holders */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              {t("analysis.topHolders")}
            </h2>
            <Badge variant="outline">
              <Wallet className="w-3 h-3 mr-1" />
              {wallets.length}
            </Badge>
          </div>

          {wallets
            .sort((a, b) => b.percentage - a.percentage)
            .slice(0, 10)
            .map((wallet, index) => (
              <Card key={wallet.address} className="hover:bg-muted/50 transition-colors">
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-primary">#{index + 1}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-mono font-medium truncate" dir="ltr">
                        {wallet.address}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-xs text-muted-foreground">{wallet.balance.toLocaleString()} TEOS</p>
                        <span className="text-xs text-muted-foreground">•</span>
                        <p className={`text-xs font-semibold ${getRiskColor(wallet.risk)}`}>
                          {wallet.percentage.toFixed(2)}%
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge variant={getRiskBadgeVariant(wallet.risk)} className="text-xs">
                        {t(`analysis.${wallet.risk}`)}
                      </Badge>
                      {wallet.percentage > teosData.whaleThreshold && (
                        <div className="flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3 text-destructive" />
                          <span className="text-xs text-destructive font-medium">
                            {language === "en" ? "Whale" : "حوت"}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>

        {/* Distribution Pattern Warning */}
        {totalWhaleOwnership > 50 && (
          <Card className="mt-6 border-yellow-500/20 bg-yellow-500/5">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-yellow-600 dark:text-yellow-500">
                    {language === "en" ? "High Risk Distribution Pattern" : "نمط توزيع عالي المخاطر"}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {language === "en"
                      ? "Whale wallets control more than 50% of supply. This creates significant manipulation risk and price volatility concerns."
                      : "محافظ الحيتان تسيطر على أكثر من 50٪ من الإمداد. هذا يخلق مخاطر تلاعب كبيرة ومخاوف من تقلبات الأسعار."}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
