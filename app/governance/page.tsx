"use client"

import { useState } from "react"
import { ArrowLeft, Vote, Plus, ThumbsUp, ThumbsDown, Clock, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/lib/language-context"
import { useTeos } from "@/lib/teos-context"
import Link from "next/link"

export default function GovernancePage() {
  const { t, language } = useLanguage()
  const { proposals, vote, createProposal } = useTeos()
  const [openDialog, setOpenDialog] = useState(false)
  const [newTitle, setNewTitle] = useState("")
  const [newDescription, setNewDescription] = useState("")

  const handleCreateProposal = () => {
    if (!newTitle || !newDescription) return
    createProposal(newTitle, newDescription)
    setNewTitle("")
    setNewDescription("")
    setOpenDialog(false)
  }

  const handleVote = (proposalId: string, voteType: "yes" | "no") => {
    vote(proposalId, voteType)
  }

  const activeProposals = proposals.filter((p) => p.status === "active")
  const totalVotes = proposals.reduce((sum, p) => sum + p.votes.yes + p.votes.no, 0)

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
              <h1 className="text-lg font-bold leading-none">{t("governance.title")}</h1>
              <p className="text-xs text-muted-foreground">{t("governance.subtitle")}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-md">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card className="bg-primary/5">
            <CardContent className="pt-4 pb-3 px-4">
              <div className="flex items-center gap-2 mb-2">
                <Vote className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-foreground">
                  {language === "en" ? "Total Votes" : "إجمالي الأصوات"}
                </span>
              </div>
              <p className="text-2xl font-bold">{totalVotes}</p>
            </CardContent>
          </Card>
          <Card className="bg-accent/5">
            <CardContent className="pt-4 pb-3 px-4">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="w-4 h-4 text-accent" />
                <span className="text-xs text-muted-foreground">{t("governance.active")}</span>
              </div>
              <p className="text-2xl font-bold">{activeProposals.length}</p>
            </CardContent>
          </Card>
        </div>

        {/* Create Proposal Button */}
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button className="w-full mb-6 gap-2">
              <Plus className="w-4 h-4" />
              {t("governance.create")}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md mx-4">
            <DialogHeader>
              <DialogTitle>{t("governance.create")}</DialogTitle>
              <DialogDescription>
                {language === "en" ? "Submit a proposal for community voting" : "قدم مقترحًا لتصويت المجتمع"}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">{language === "en" ? "Title" : "العنوان"}</Label>
                <Input
                  id="title"
                  placeholder={language === "en" ? "Proposal title" : "عنوان المقترح"}
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">{language === "en" ? "Description" : "الوصف"}</Label>
                <Textarea
                  id="description"
                  placeholder={language === "en" ? "Describe your proposal..." : "صف مقترحك..."}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  rows={4}
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setOpenDialog(false)}>
                  {t("common.cancel")}
                </Button>
                <Button className="flex-1" onClick={handleCreateProposal} disabled={!newTitle || !newDescription}>
                  {t("common.confirm")}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Active Proposals */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            {t("governance.active")}
          </h2>

          {activeProposals.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="pt-12 pb-12 text-center">
                <Vote className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                <p className="text-sm text-muted-foreground">
                  {language === "en" ? "No active proposals" : "لا توجد مقترحات نشطة"}
                </p>
              </CardContent>
            </Card>
          ) : (
            activeProposals.map((proposal) => {
              const totalVotes = proposal.votes.yes + proposal.votes.no
              const yesPercentage = totalVotes > 0 ? (proposal.votes.yes / totalVotes) * 100 : 0
              const noPercentage = totalVotes > 0 ? (proposal.votes.no / totalVotes) * 100 : 0
              const daysLeft = Math.ceil((proposal.endDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))

              return (
                <Card key={proposal.id} className="hover:bg-muted/50 transition-colors">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-base leading-tight">{proposal.title}</CardTitle>
                      {proposal.userVoted && (
                        <Badge variant="outline" className="text-xs">
                          {t("governance.voted")}
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="leading-relaxed">{proposal.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Vote Results */}
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <ThumbsUp className="w-4 h-4 text-green-600 dark:text-green-500" />
                            <span className="font-medium">{language === "en" ? "Yes" : "نعم"}</span>
                          </div>
                          <span className="font-semibold text-green-600 dark:text-green-500">
                            {proposal.votes.yes} ({yesPercentage.toFixed(0)}%)
                          </span>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full bg-green-600 dark:bg-green-500 rounded-full transition-all"
                            style={{ width: `${yesPercentage}%` }}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <ThumbsDown className="w-4 h-4 text-red-600 dark:text-red-500" />
                            <span className="font-medium">{language === "en" ? "No" : "لا"}</span>
                          </div>
                          <span className="font-semibold text-red-600 dark:text-red-500">
                            {proposal.votes.no} ({noPercentage.toFixed(0)}%)
                          </span>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full bg-red-600 dark:bg-red-500 rounded-full transition-all"
                            style={{ width: `${noPercentage}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Time Remaining */}
                    <div className="flex items-center gap-2 text-xs text-muted-foreground p-3 rounded-lg bg-muted">
                      <Clock className="w-3 h-3" />
                      <span>
                        {t("governance.ends")} {daysLeft} {t("governance.days")}
                      </span>
                    </div>

                    {/* Vote Buttons */}
                    {!proposal.userVoted && (
                      <div className="flex gap-2 pt-2">
                        <Button
                          variant="outline"
                          className="flex-1 gap-2 border-green-600/20 text-green-600 dark:text-green-500 hover:bg-green-600/10 bg-transparent"
                          onClick={() => handleVote(proposal.id, "yes")}
                        >
                          <ThumbsUp className="w-4 h-4" />
                          {language === "en" ? "Yes" : "نعم"}
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1 gap-2 border-red-600/20 text-red-600 dark:text-red-500 hover:bg-red-600/10 bg-transparent"
                          onClick={() => handleVote(proposal.id, "no")}
                        >
                          <ThumbsDown className="w-4 h-4" />
                          {language === "en" ? "No" : "لا"}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })
          )}
        </div>

        {/* Info Card */}
        <Card className="mt-6 border-primary/20 bg-primary/5">
          <CardContent className="pt-4 pb-4">
            <div className="flex gap-3">
              <Vote className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium">{language === "en" ? "Off-Chain Voting" : "التصويت خارج السلسلة"}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {language === "en"
                    ? "Votes are recorded off-chain for transparency. Community consensus drives TEOS ecosystem decisions."
                    : "يتم تسجيل الأصوات خارج السلسلة للشفافية. توافق المجتمع يقود قرارات نظام TEOS البيئي."}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
