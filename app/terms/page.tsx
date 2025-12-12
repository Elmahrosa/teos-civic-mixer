"use client"

import { ArrowLeft, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"
import Link from "next/link"

export default function TermsPage() {
  const { t, language } = useLanguage()

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
              <h1 className="text-lg font-bold leading-none">{t("terms.title")}</h1>
            </div>
            <FileText className="w-5 h-5 text-primary" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-md">
        <Card>
          <CardContent className="pt-6 pb-6 space-y-6">
            {language === "en" ? (
              <>
                <section className="space-y-3">
                  <h2 className="text-lg font-bold">1. Introduction</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Welcome to TEOS Egypt Civic Mixer. By accessing or using this application, you agree to be bound by
                    these Terms of Service and all applicable laws and regulations. If you do not agree with any of
                    these terms, you are prohibited from using this application.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-lg font-bold">2. License and Usage</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    This application is part of the TEOS Egypt Blockchain Ecosystem and is protected under the TEOS
                    Egypt Sovereign License (TESL). The source code is available on GitHub for transparency and
                    community review. No crypto payments are required to use this application.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-lg font-bold">3. Transparency and Analysis</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    This application provides analysis, transparency tools, and anti-manipulation alerts for the TEOS
                    token ecosystem. All data displayed is for informational purposes only and should not be considered
                    financial advice. Users are responsible for verifying all information independently.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-lg font-bold">4. Governance and Voting</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    The governance system enables off-chain community voting on proposals. Votes are recorded for
                    transparency but do not guarantee implementation. The TEOS community and authorized administrators
                    maintain final decision-making authority.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-lg font-bold">5. Limitations of Liability</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    TEOS Egypt and the application developers shall not be liable for any damages arising from the use
                    or inability to use this application, including but not limited to financial losses, data loss, or
                    system errors. All blockchain transactions are final and irreversible.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-lg font-bold">6. Security and Responsibility</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Users are responsible for maintaining the security of their wallet credentials and private keys.
                    Never share your private keys or seed phrases. The application provides security features and alerts
                    but cannot guarantee protection against all threats.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-lg font-bold">7. Changes to Terms</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    We reserve the right to modify these terms at any time. Continued use of the application after
                    changes constitutes acceptance of the modified terms. Material changes will be communicated through
                    the application's transparency notice system.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-lg font-bold">8. Contact</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    For questions about these terms, please visit the GitHub repository at
                    github.com/Elmahrosa/Teos-Civic-Mixer or contact the TEOS Egypt community through official channels.
                  </p>
                </section>

                <section className="space-y-2">
                  <p className="text-xs text-muted-foreground">Last updated: December 2025</p>
                  <p className="text-xs text-muted-foreground">Protected by TEOS Egypt Sovereign License (TESL)</p>
                </section>
              </>
            ) : (
              <>
                <section className="space-y-3">
                  <h2 className="text-lg font-bold">1. المقدمة</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    مرحبًا بك في خلاط المواطنة لتيوس مصر. من خلال الوصول أو استخدام هذا التطبيق، فإنك توافق على الالتزام
                    بشروط الخدمة هذه وجميع القوانين واللوائح المعمول بها. إذا كنت لا توافق على أي من هذه الشروط، فيحظر
                    عليك استخدام هذا التطبيق.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-lg font-bold">2. الترخيص والاستخدام</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    هذا التطبيق جزء من النظام البيئي لبلوكتشين تيوس مصر ومحمي بموجب ترخيص تيوس مصر السيادي (TESL). الكود
                    المصدري متاح على GitHub للشفافية ومراجعة المجتمع. لا يلزم دفع رسوم تشفير لاستخدام هذا التطبيق.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-lg font-bold">3. الشفافية والتحليل</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    يوفر هذا التطبيق أدوات التحليل والشفافية وتنبيهات مكافحة التلاعب لنظام عملة TEOS البيئي. جميع
                    البيانات المعروضة للأغراض الإعلامية فقط ولا ينبغي اعتبارها نصيحة مالية. المستخدمون مسؤولون عن التحقق
                    من جميع المعلومات بشكل مستقل.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-lg font-bold">4. الحوكمة والتصويت</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    يتيح نظام الحوكمة التصويت المجتمعي خارج السلسلة على المقترحات. يتم تسجيل الأصوات من أجل الشفافية
                    ولكنها لا تضمن التنفيذ. يحتفظ مجتمع TEOS والمسؤولون المصرح لهم بسلطة اتخاذ القرار النهائي.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-lg font-bold">5. حدود المسؤولية</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    لن تكون تيوس مصر ومطورو التطبيق مسؤولين عن أي أضرار ناشئة عن استخدام أو عدم القدرة على استخدام هذا
                    التطبيق، بما في ذلك على سبيل المثال لا الحصر الخسائر المالية أو فقدان البيانات أو أخطاء النظام. جميع
                    معاملات البلوكتشين نهائية ولا رجعة فيها.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-lg font-bold">6. الأمان والمسؤولية</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    المستخدمون مسؤولون عن الحفاظ على أمان بيانات اعتماد محفظتهم والمفاتيح الخاصة. لا تشارك أبدًا مفاتيحك
                    الخاصة أو عبارات الاسترداد. يوفر التطبيق ميزات أمان وتنبيهات ولكن لا يمكن ضمان الحماية ضد جميع
                    التهديدات.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-lg font-bold">7. التغييرات على الشروط</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    نحتفظ بالحق في تعديل هذه الشروط في أي وقت. يشكل الاستخدام المستمر للتطبيق بعد التغييرات قبولًا للشروط
                    المعدلة. سيتم الإبلاغ عن التغييرات الجوهرية من خلال نظام إشعارات الشفافية في التطبيق.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-lg font-bold">8. الاتصال</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    للأسئلة حول هذه الشروط، يرجى زيارة مستودع GitHub على github.com/Elmahrosa/Teos-Civic-Mixer أو
                    الاتصال بمجتمع تيوس مصر من خلال القنوات الرسمية.
                  </p>
                </section>

                <section className="space-y-2">
                  <p className="text-xs text-muted-foreground">آخر تحديث: ديسمبر 2025</p>
                  <p className="text-xs text-muted-foreground">محمي بترخيص تيوس مصر السيادي (TESL)</p>
                </section>
              </>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
