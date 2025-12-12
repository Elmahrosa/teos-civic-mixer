"use client"

import { useState } from "react"
import { ArrowLeft, Settings, Save, Bell, ExternalLink, Flame, Lock, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/lib/language-context"
import { useTeos } from "@/lib/teos-context"
import Link from "next/link"
import { toast } from "sonner"

export default function AdminPage() {
  const { t, language } = useLanguage()
  const { teosData, updateTeosData, addAlert } = useTeos()

  const [tokenVersion, setTokenVersion] = useState("v1.0.0")
  const [burnAmount, setBurnAmount] = useState(teosData.burnedSupply.toString())
  const [lockLink, setLockLink] = useState("")
  const [notice, setNotice] = useState("")

  const handleUpdateBurn = () => {
    const amount = Number.parseInt(burnAmount)
    if (!amount || isNaN(amount)) {
      toast.error(language === "en" ? "Invalid amount" : "مبلغ غير صالح")
      return
    }
    updateTeosData({ burnedSupply: amount })
    toast.success(language === "en" ? "Burn amount updated" : "تم تحديث المبلغ المحروق")
  }

  const handleAddLock = () => {
    if (!lockLink) {
      toast.error(language === "en" ? "Please enter a link" : "الرجاء إدخال رابط")
      return
    }
    const newLocks = [...teosData.lockedLiquidity, lockLink]
    updateTeosData({ lockedLiquidity: newLocks })
    setLockLink("")
    toast.success(language === "en" ? "Liquidity lock added" : "تمت إضافة قفل السيولة")
  }

  const handlePublishNotice = () => {
    if (!notice) {
      toast.error(language === "en" ? "Please enter a notice" : "الرجاء إدخال إشعار")
      return
    }
    addAlert({
      type: "risk",
      message: notice,
      severity: "low",
    })
    setNotice("")
    toast.success(language === "en" ? "Notice published" : "تم نشر الإشعار")
  }

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
              <h1 className="text-lg font-bold leading-none">{t("admin.title")}</h1>
              <p className="text-xs text-muted-foreground">{t("admin.subtitle")}</p>
            </div>
            <Settings className="w-5 h-5 text-primary" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-md">
        {/* Current Stats */}
        <Card className="mb-6 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-base">{language === "en" ? "Current Status" : "الوضع الحالي"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{t("dashboard.supply")}</span>
              <span className="text-sm font-semibold">{(teosData.totalSupply / 1000000000).toFixed(2)}B</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{t("dashboard.burned")}</span>
              <span className="text-sm font-semibold">{(teosData.burnedSupply / 1000000000).toFixed(2)}B</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{t("home.stats.holders")}</span>
              <span className="text-sm font-semibold">{teosData.holders}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {language === "en" ? "Liquidity Locks" : "أقفال السيولة"}
              </span>
              <span className="text-sm font-semibold">{teosData.lockedLiquidity.length}</span>
            </div>
          </CardContent>
        </Card>

        {/* Token Version */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Package className="w-4 h-4 text-primary" />
              {t("admin.version")}
            </CardTitle>
            <CardDescription>
              {language === "en" ? "Update token version number" : "تحديث رقم إصدار العملة"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="version">{language === "en" ? "Version" : "الإصدار"}</Label>
              <Input
                id="version"
                placeholder="v1.0.0"
                value={tokenVersion}
                onChange={(e) => setTokenVersion(e.target.value)}
              />
            </div>
            <Button className="w-full gap-2">
              <Save className="w-4 h-4" />
              {t("admin.update")}
            </Button>
          </CardContent>
        </Card>

        {/* Burned Amount */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Flame className="w-4 h-4 text-destructive" />
              {t("admin.burnAmount")}
            </CardTitle>
            <CardDescription>
              {language === "en" ? "Update total burned tokens" : "تحديث إجمالي العملات المحروقة"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="burn">{language === "en" ? "Amount (in TEOS)" : "المبلغ (بالتيوس)"}</Label>
              <Input
                id="burn"
                type="number"
                placeholder="2854000000"
                value={burnAmount}
                onChange={(e) => setBurnAmount(e.target.value)}
              />
            </div>
            <Button className="w-full gap-2" onClick={handleUpdateBurn}>
              <Save className="w-4 h-4" />
              {t("admin.update")}
            </Button>
          </CardContent>
        </Card>

        {/* Liquidity Lock Link */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Lock className="w-4 h-4 text-accent" />
              {t("admin.lockLink")}
            </CardTitle>
            <CardDescription>
              {language === "en" ? "Add new liquidity lock verification link" : "إضافة رابط تحقق قفل السيولة الجديد"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="lock">{language === "en" ? "Lock URL" : "رابط القفل"}</Label>
              <Input
                id="lock"
                placeholder="https://dexscreener.com/..."
                value={lockLink}
                onChange={(e) => setLockLink(e.target.value)}
                dir="ltr"
              />
            </div>
            <Button className="w-full gap-2" onClick={handleAddLock}>
              <ExternalLink className="w-4 h-4" />
              {language === "en" ? "Add Lock" : "إضافة القفل"}
            </Button>
          </CardContent>
        </Card>

        {/* Transparency Notice */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Bell className="w-4 h-4 text-primary" />
              {t("admin.notice")}
            </CardTitle>
            <CardDescription>
              {language === "en" ? "Publish transparency notice to community" : "نشر إشعار الشفافية للمجتمع"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="notice">{language === "en" ? "Notice Message" : "رسالة الإشعار"}</Label>
              <Textarea
                id="notice"
                placeholder={
                  language === "en"
                    ? "Enter transparency notice for the community..."
                    : "أدخل إشعار الشفافية للمجتمع..."
                }
                value={notice}
                onChange={(e) => setNotice(e.target.value)}
                rows={4}
              />
            </div>
            <Button className="w-full gap-2" onClick={handlePublishNotice}>
              <Bell className="w-4 h-4" />
              {t("admin.publish")}
            </Button>
          </CardContent>
        </Card>

        {/* Warning */}
        <Card className="border-yellow-500/20 bg-yellow-500/5">
          <CardContent className="pt-4 pb-4">
            <div className="flex gap-3">
              <Settings className="w-5 h-5 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-yellow-600 dark:text-yellow-500">
                  {language === "en" ? "Admin Access Only" : "وصول الإدارة فقط"}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {language === "en"
                    ? "This panel is for authorized administrators only. All changes are publicly visible for transparency."
                    : "هذه اللوحة للمسؤولين المصرح لهم فقط. جميع التغييرات مرئية للجمهور من أجل الشفافية."}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
