import { NextRequest, NextResponse } from 'next/server'

// Copying your data structures from lib/teos-context.tsx
// NOTE: In a real production environment, you would fetch this data from a Database or Blockchain RPC.
// For the Grant Proof-of-Concept (POC), we use the logic from your context.

interface Wallet {
  address: string
  balance: number
  percentage: number
  risk: "high" | "medium" | "low"
}

// Mock Data (mirroring your teos-context.tsx)
const mockWallets: Wallet[] = [
  { address: "0x1234...5678", balance: 1500000000, percentage: 21, risk: "high" },
  { address: "0xabcd...ef01", balance: 900000000, percentage: 12.6, risk: "medium" },
  { address: "0x9876...5432", balance: 650000000, percentage: 9.1, risk: "medium" },
  { address: "0x5555...9999", balance: 500000000, percentage: 7.0, risk: "low" },
  { address: "0x3333...7777", balance: 400000000, percentage: 5.6, risk: "low" },
]

const TOTAL_SUPPLY = 7146000000; // From your teos-context
const WHALE_THRESHOLD = 20; // From your teos-context

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const address = searchParams.get('address')

  if (!address) {
    return NextResponse.json({ error: "Missing 'address' parameter" }, { status: 400 })
  }

  // --- YOUR EXISTING LOGIC STARTS HERE ---
  // This is the logic we are "wrapping" for the MCP Tool
  
  // 1. Check if wallet exists in our mock DB
  const existing = mockWallets.find((w) => w.address.toLowerCase() === address.toLowerCase())
  
  if (existing) {
    return NextResponse.json({
      tool: "teos-civic-risk-scanner",
      wallet: existing.address,
      analysis: {
        ownership_percentage: existing.percentage,
        risk_level: existing.risk,
        is_whale: existing.percentage > WHALE_THRESHOLD,
        warning: existing.risk === "high" ? "Potential manipulation risk detected." : "Wallet within normal parameters."
      },
      timestamp: new Date().toISOString()
    })
  }

  // 2. If new wallet, calculate risk dynamically (Simulating on-chain check)
  const balance = Math.floor(Math.random() * 100000000) + 10000000
  const percentage = (balance / TOTAL_SUPPLY) * 100
  let risk: "high" | "medium" | "low" = "low"
  
  if (percentage > 20) risk = "high"
  else if (percentage > 10) risk = "medium"

  const newWallet = { address, balance, percentage, risk }
  
  // --- YOUR EXISTING LOGIC ENDS HERE ---

  return NextResponse.json({
    tool: "teos-civic-risk-scanner",
    wallet: newWallet.address,
    analysis: {
      ownership_percentage: Number(percentage.toFixed(2)),
      risk_level: risk,
      is_whale: percentage > WHALE_THRESHOLD,
      warning: risk === "high" ? "New wallet detected with high concentration." : "New wallet looks safe."
    },
    timestamp: new Date().toISOString()
  })
}
