"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface TeosData {
  totalSupply: number
  burnedSupply: number
  holders: number
  lockedLiquidity: string[]
  whaleThreshold: number
}

interface Wallet {
  address: string
  balance: number
  percentage: number
  risk: "high" | "medium" | "low"
}

interface Alert {
  id: string
  type: "whale" | "sudden" | "risk"
  message: string
  timestamp: Date
  severity: "high" | "medium" | "low"
}

interface Proposal {
  id: string
  title: string
  description: string
  votes: { yes: number; no: number }
  endDate: Date
  status: "active" | "ended"
  userVoted?: boolean
}

interface TeosContextType {
  teosData: TeosData
  wallets: Wallet[]
  alerts: Alert[]
  proposals: Proposal[]
  updateTeosData: (data: Partial<TeosData>) => void
  scanWallet: (address: string) => Promise<Wallet | null>
  addAlert: (alert: Omit<Alert, "id" | "timestamp">) => void
  vote: (proposalId: string, voteType: "yes" | "no") => void
  createProposal: (title: string, description: string) => void
}

const TeosContext = createContext<TeosContextType | undefined>(undefined)

// Mock data
const mockWallets: Wallet[] = [
  { address: "0x1234...5678", balance: 1500000000, percentage: 21, risk: "high" },
  { address: "0xabcd...ef01", balance: 900000000, percentage: 12.6, risk: "medium" },
  { address: "0x9876...5432", balance: 650000000, percentage: 9.1, risk: "medium" },
  { address: "0x5555...9999", balance: 500000000, percentage: 7.0, risk: "low" },
  { address: "0x3333...7777", balance: 400000000, percentage: 5.6, risk: "low" },
]

const mockProposals: Proposal[] = [
  {
    id: "1",
    title: "Increase Burn Rate to 2%",
    description: "Proposal to increase the token burn rate from 0.5% to 2% per transaction",
    votes: { yes: 450, no: 120 },
    endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    status: "active",
  },
  {
    id: "2",
    title: "Add New Liquidity Lock",
    description: "Lock additional 500M TEOS in liquidity pool for permanent security",
    votes: { yes: 380, no: 95 },
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    status: "active",
  },
]

export function TeosProvider({ children }: { children: ReactNode }) {
  const [teosData, setTeosData] = useState<TeosData>({
    totalSupply: 7146000000,
    burnedSupply: 2854000000,
    holders: 991,
    lockedLiquidity: [
      "https://dexscreener.com/lock1",
      "https://dexscreener.com/lock2",
      "https://dexscreener.com/lock3",
    ],
    whaleThreshold: 20,
  })

  const [wallets, setWallets] = useState<Wallet[]>(mockWallets)
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [proposals, setProposals] = useState<Proposal[]>(mockProposals)

  useEffect(() => {
    // Check for whale alerts on mount
    const whaleWallets = wallets.filter((w) => w.percentage > teosData.whaleThreshold)
    whaleWallets.forEach((wallet) => {
      if (!alerts.find((a) => a.message.includes(wallet.address))) {
        addAlert({
          type: "whale",
          message: `Whale wallet detected: ${wallet.address} owns ${wallet.percentage}%`,
          severity: "high",
        })
      }
    })
  }, [])

  const updateTeosData = (data: Partial<TeosData>) => {
    setTeosData((prev) => ({ ...prev, ...data }))
  }

  const scanWallet = async (address: string): Promise<Wallet | null> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const existing = wallets.find((w) => w.address.toLowerCase() === address.toLowerCase())
    if (existing) return existing

    // Generate mock data for new wallet
    const balance = Math.floor(Math.random() * 100000000) + 10000000
    const percentage = (balance / teosData.totalSupply) * 100
    const risk: "high" | "medium" | "low" = percentage > 20 ? "high" : percentage > 10 ? "medium" : "low"

    const newWallet: Wallet = { address, balance, percentage, risk }
    setWallets((prev) => [...prev, newWallet])
    return newWallet
  }

  const addAlert = (alert: Omit<Alert, "id" | "timestamp">) => {
    const newAlert: Alert = {
      ...alert,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
    }
    setAlerts((prev) => [newAlert, ...prev].slice(0, 10)) // Keep last 10 alerts
  }

  const vote = (proposalId: string, voteType: "yes" | "no") => {
    setProposals((prev) =>
      prev.map((p) => {
        if (p.id === proposalId) {
          return {
            ...p,
            votes: {
              ...p.votes,
              [voteType]: p.votes[voteType] + 1,
            },
            userVoted: true,
          }
        }
        return p
      }),
    )
  }

  const createProposal = (title: string, description: string) => {
    const newProposal: Proposal = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      description,
      votes: { yes: 0, no: 0 },
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      status: "active",
    }
    setProposals((prev) => [newProposal, ...prev])
  }

  return (
    <TeosContext.Provider
      value={{
        teosData,
        wallets,
        alerts,
        proposals,
        updateTeosData,
        scanWallet,
        addAlert,
        vote,
        createProposal,
      }}
    >
      {children}
    </TeosContext.Provider>
  )
}

export function useTeos() {
  const context = useContext(TeosContext)
  if (context === undefined) {
    throw new Error("useTeos must be used within a TeosProvider")
  }
  return context
}
