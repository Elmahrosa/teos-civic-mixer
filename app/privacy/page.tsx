"use client"

import { ArrowLeft, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"
import Link from "next/link"

export default function PrivacyPage() {
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
              <h1 className="text-lg font-bold leading-none">{t("privacy.title")}</h1>
            </div>
            <Shield className="w-5 h-5 text-primary" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-md">
        <Card>
          <CardContent className="pt-6 pb-6 space-y-6">
            {language === "en" ? (
              <>
                <section className="space-y-3">
                  <h2 className="text-lg font-bold">1. Information We Collect</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    TEOS Egypt Civic Mixer is designed with privacy in mind. We do not collect personal information such
                    as names, email addresses, or identification documents. The application interacts with public
                    blockchain data and wallet addresses that you choose to analyze.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-lg font-bold">2. Blockchain Data</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    All wallet analysis and token data is derived from public blockchain records. This information is
                    already publicly accessible on the blockchain. We simply provide tools to analyze and visualize this
                    data for transparency and security purposes.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-lg font-bold">3. Local Storage</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    The application uses browser local storage to save your language preference and user interface
                    settings. This data never leaves your device and is not transmitted to any servers. You can clear
                    this data at any time through your browser settings.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-lg font-bold">4. No Tracking or Analytics</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    We do not use tracking cookies, analytics services, or third-party advertising networks. Your
                    browsing activity within the application is not monitored, recorded, or shared with any parties.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-lg font-bold">5. Wallet Security</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    The application does not request, store, or have access to your private keys or seed phrases. All
                    wallet interactions occur through standard blockchain protocols. You maintain full control and
                    custody of your assets at all times.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-lg font-bold">6. Governance Data</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Votes and proposals submitted through the governance system are recorded off-chain for community
                    transparency. This data is publicly viewable within the application but is not linked to personal
                    identities.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-lg font-bold">7. Data Security</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    While we implement security best practices, no system is completely secure. Users are responsible
                    for maintaining the security of their devices and wallet credentials. Always verify you are using
                    the official application from trusted sources.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-lg font-bold">8. Third-Party Links</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    The application may contain links to external services like blockchain explorers and liquidity lock
                    verification sites. These third parties have their own privacy policies which we do not control. We
                    recommend reviewing their policies before interacting with external sites.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-lg font-bold">9. Children's Privacy</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    This application is not intended for users under 18 years of age. We do not knowingly collect
                    information from children. Blockchain technology involves financial risks unsuitable for minors.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-lg font-bold">10. Changes to Privacy Policy</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    We may update this privacy policy to reflect changes in our practices or legal requirements. Updates
                    will be posted in the application with the revision date. Continued use constitutes acceptance of
                    the updated policy.
                  </p>
                </section>

                <section className="space-y-2">
                  <p className="text-xs text-muted-foreground">Last updated: December 2025</p>
                  <p className="text-xs text-muted-foreground">TEOS Egypt Civic Mixer - Privacy by Design</p>
                </section>
              </>
            ) : (
              <>
                <section className="space-y-3">
                  <h2 className="text-lg font-bold">1. المعلومات التي نجمعها</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    تم تصميم خلاط المواطنة لتيوس مصر مع مراعاة الخصوصية. نحن لا نجمع معلومات شخصية مثل الأسماء أو عناوين
                    البريد الإلكتروني أو وثائق الهوية. يتفاعل التطبيق مع بيانات البلوكتشين العامة وعناوين المحفظة التي
                    تختار تحليلها.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-lg font-bold">2. بيانات البلوكتشين</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    يتم اشتقاق جميع تحليلات المحفظة وبيانات الرموز من سجلات البلوكتشين العامة. هذه المعلومات متاحة
                    بالفعل للجمهور على البلوكتشين. نحن ببساطة نوفر أدوات لتحليل وتصور هذه البيانات لأغراض الشفافية
                    والأمان.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-lg font-bold">3. التخزين المحلي</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    يستخدم التطبيق التخزين المحلي للمتصفح لحفظ تفضيلات اللغة وإعدادات واجهة المستخدم. هذه البيانات لا
                    تغادر جهازك أبدًا ولا يتم نقلها إلى أي خوادم. يمكنك مسح هذه البيانات في أي وقت من خلال إعدادات
                    المتصفح.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-lg font-bold">4. بدون تتبع أو تحليلات</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    نحن لا نستخدم ملفات تعريف الارتباط للتتبع أو خدمات التحليلات أو شبكات الإعلان التابعة لجهات خارجية.
                    نشاط التصفح الخاص بك داخل التطبيق لا تتم مراقبته أو تسجيله أو مشاركته مع أي أطراف.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-lg font-bold">5. أمان المحفظة</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    لا يطلب التطبيق أو يخزن أو يمكنه الوصول إلى مفاتيحك الخاصة أو عبارات الاسترداد. تحدث جميع تفاعلات
                    المحفظة من خلال بروتوكولات البلوكتشين القياسية. تحتفظ بالتحكم الكامل والحضانة لأصولك في جميع
                    الأوقات.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-lg font-bold">6. بيانات الحوكمة</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    يتم تسجيل الأصوات والمقترحات المقدمة من خلال نظام الحوكمة خارج السلسلة من أجل الشفافية المجتمعية.
                    هذه البيانات قابلة للعرض العام داخل التطبيق ولكنها غير مرتبطة بالهويات الشخصية.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-lg font-bold">7. أمان البيانات</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    بينما ننفذ أفضل ممارسات الأمان، لا يوجد نظام آمن تمامًا. المستخدمون مسؤولون عن الحفاظ على أمان
                    أجهزتهم وبيانات اعتماد المحفظة. تحقق دائمًا من أنك تستخدم التطبيق الرسمي من مصادر موثوقة.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-lg font-bold">8. روابط الجهات الخارجية</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    قد يحتوي التطبيق على روابط لخدمات خارجية مثل مستكشفات البلوكتشين ومواقع التحقق من قفل السيولة. هذه
                    الأطراف الثالثة لديها سياسات الخصوصية الخاصة بها والتي لا نتحكم فيها. نوصي بمراجعة سياساتهم قبل
                    التفاعل مع المواقع الخارجية.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-lg font-bold">9. خصوصية الأطفال</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    هذا التطبيق غير مخصص للمستخدمين الذين تقل أعمارهم عن 18 عامًا. نحن لا نجمع معلومات من الأطفال عن عمد.
                    تتضمن تقنية البلوكتشين مخاطر مالية غير مناسبة للقصر.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-lg font-bold">10. التغييرات على سياسة الخصوصية</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    قد نقوم بتحديث سياسة الخصوصية هذه لتعكس التغييرات في ممارساتنا أو المتطلبات القانونية. سيتم نشر
                    التحديثات في التطبيق مع تاريخ المراجعة. يشكل الاستخدام المستمر قبولًا للسياسة المحدثة.
                  </p>
                </section>

                <section className="space-y-2">
                  <p className="text-xs text-muted-foreground">آخر تحديث: ديسمبر 2025</p>
                  <p className="text-xs text-muted-foreground">خلاط المواطنة لتيوس مصر - الخصوصية حسب التصميم</p>
                </section>
              </>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
