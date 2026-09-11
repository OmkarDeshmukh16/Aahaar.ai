'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Mail, Users } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { MagneticButton } from '@/components/ui/MagneticButton'

const waitlistSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

type WaitlistForm = z.infer<typeof waitlistSchema>

export function WaitlistCard() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WaitlistForm>({
    resolver: zodResolver(waitlistSchema),
  })

  const onSubmit = async (data: WaitlistForm) => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email }),
      })

      const result = await res.json()

      if (result.success) {
        setIsSubmitted(true)
        toast.success('Welcome to the future of nutrition.', {
          description: "We'll notify you when we launch.",
        })
      } else {
        toast.error('Something went wrong. Please try again.')
      }
    } catch {
      toast.error('Network error. Please check your connection.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-[100dvh] flex items-center justify-center px-4 py-20">
      <GlassCard className="max-w-md w-full text-center" delay={0.1}>
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-body text-[10px] tracking-[0.2em] uppercase text-amber-500/80 mb-4 block"
        >
          Early Access
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3"
        >
          Join the Waitlist
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-body text-sm text-white/40 mb-8 leading-relaxed"
        >
          Be among the first to experience AI-powered nutrition that actually
          understands your body, your kitchen, and your culture.
        </motion.p>

        {/* Email form */}
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="space-y-4 mb-6"
        >
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
            <input
              {...register('email')}
              type="email"
              placeholder="your@email.com"
              disabled={isSubmitted}
              className={`
                w-full pl-11 pr-4 py-3.5
                bg-white/[0.03] border rounded-xl
                font-body text-sm text-white
                placeholder:text-white/20
                focus:outline-none focus:ring-1
                transition-colors duration-200
                disabled:opacity-50
                ${errors.email
                  ? 'border-red-500/50 focus:ring-red-500/30'
                  : 'border-white/10 focus:ring-amber-500/30 focus:border-amber-500/30'
                }
              `}
              id="waitlist-email"
            />
          </div>

          {/* Inline error */}
          <AnimatePresence>
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -8, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -8, height: 0 }}
                className="text-red-400 text-xs font-body text-left pl-1"
              >
                {errors.email.message}
              </motion.p>
            )}
          </AnimatePresence>

          <MagneticButton
            type="submit"
            loading={isLoading}
            success={isSubmitted}
            disabled={isSubmitted}
            className="w-full"
          >
            Join the Waitlist
          </MagneticButton>
        </motion.form>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="space-y-2"
        >
          <div className="flex items-center justify-center gap-2 text-white/30">
            <Users className="w-3.5 h-3.5" />
            <span className="font-body text-xs">
              Join{' '}
              <span className="text-white/60 font-medium">400+</span>{' '}
              early testers
            </span>
          </div>
          <p className="font-body text-[10px] text-white/20 tracking-wide">
            First 500 get lifetime founder pricing
          </p>
        </motion.div>
      </GlassCard>
    </div>
  )
}
