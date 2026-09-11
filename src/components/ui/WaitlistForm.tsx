'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { ArrowRight, CheckCircle2, Loader2, Sparkles } from 'lucide-react'

interface WaitlistFormProps {
  variant?: 'hero' | 'detailed'
  onSuccess?: () => void
}

const DIET_GOALS = [
  'Ayurvedic Balance',
  'Fat Loss & Agni Boost',
  'Lean Muscle Hypertrophy',
  'Gut Microbiome Health',
  'Metabolic Longevity',
]

export function WaitlistForm({ variant = 'hero', onSuccess }: WaitlistFormProps) {
  const [email, setEmail] = useState('')
  const [selectedGoal, setSelectedGoal] = useState(DIET_GOALS[0])
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const trimmed = email.trim()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!trimmed || !emailRegex.test(trimmed)) {
      toast.error('Please enter a valid email address.')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: trimmed,
          goal: variant === 'detailed' ? selectedGoal : undefined,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Failed to join waitlist')
      }

      setSubmitted(true)
      toast.success('Welcome to the inner circle! Your VIP early access pass is reserved.', {
        description: `Confirmation dispatched to ${trimmed}`,
        duration: 5000,
      })

      onSuccess?.()
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong'
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="flex items-center gap-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 px-5 py-4 text-emerald-400">
        <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
        <div className="text-sm">
          <span className="font-semibold">Priority reservation confirmed!</span> Check your inbox shortly for early beta rollout instructions.
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      {variant === 'detailed' && (
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-wider text-neutral-400 font-medium flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Select Primary Health & Nutrition Focus
          </label>
          <div className="flex flex-wrap gap-2 pt-1">
            {DIET_GOALS.map((goal) => {
              const active = selectedGoal === goal
              return (
                <button
                  key={goal}
                  type="button"
                  onClick={() => setSelectedGoal(goal)}
                  className={`text-xs px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                    active
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-sm shadow-emerald-950'
                      : 'bg-white/[0.04] text-neutral-400 border border-white/[0.08] hover:text-white hover:bg-white/[0.08]'
                  }`}
                >
                  {goal}
                </button>
              )
            })}
          </div>
        </div>
      )}

      <div className="relative flex flex-col sm:flex-row gap-2.5">
        <div className="relative flex-grow">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your work or personal email..."
            required
            className="w-full rounded-xl bg-white/[0.04] border border-white/[0.12] px-4 py-3.5 text-sm text-white placeholder-neutral-500 transition-all focus:border-emerald-500/60 focus:bg-white/[0.07] focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 px-6 py-3.5 text-sm font-semibold text-neutral-950 shadow-lg shadow-emerald-900/30 transition-all hover:opacity-95 hover:shadow-emerald-700/40 active:scale-[0.98] disabled:opacity-60 cursor-pointer flex-shrink-0"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Securing Spot...</span>
            </>
          ) : (
            <>
              <span>Get Early Access</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </form>
  )
}
