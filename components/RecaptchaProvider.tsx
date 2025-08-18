"use client"

import { useEffect } from 'react'

declare global {
  interface Window {
    grecaptcha: {
      execute: (siteKey: string, options: { action: string }) => Promise<string>
      ready: (callback: () => void) => void
    }
  }
}

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""

export const RecaptchaProvider = () => {
  useEffect(() => {
    // Validate site key exists
    if (!RECAPTCHA_SITE_KEY) {
      console.error('reCAPTCHA site key is not configured. Please check NEXT_PUBLIC_RECAPTCHA_SITE_KEY environment variable.')
      return
    }

    if (!document.getElementById('recaptcha-v3')) {
      const script = document.createElement('script')
      script.id = 'recaptcha-v3'
      script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`
      script.async = true
      script.defer = true
      document.head.appendChild(script)

      script.onerror = () => {
        console.error('Failed to load reCAPTCHA script')
      }
    }
  }, [])

  return null
}

export const getRecaptchaToken = async (action: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Validate site key before execution
    if (!RECAPTCHA_SITE_KEY) {
      reject(new Error('reCAPTCHA site key is not configured'))
      return
    }

    const executeRecaptcha = () => {
      if (window.grecaptcha && window.grecaptcha.execute) {
        window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action })
          .then(token => {
            resolve(token)
          })
          .catch(error => {
            reject(error)
          })
      } else {
        reject(new Error('reCAPTCHA not loaded'))
      }
    }

    if (window.grecaptcha && window.grecaptcha.ready) {
      window.grecaptcha.ready(executeRecaptcha)
    } else {
      // Add timeout to prevent infinite waiting
      let attempts = 0
      const maxAttempts = 50 // 5 seconds max wait

      const checkRecaptcha = () => {
        if (window.grecaptcha && window.grecaptcha.ready) {
          window.grecaptcha.ready(executeRecaptcha)
        } else if (attempts < maxAttempts) {
          attempts++
          setTimeout(checkRecaptcha, 100)
        } else {
          reject(new Error('reCAPTCHA failed to initialize within timeout'))
        }
      }
      checkRecaptcha()
    }
  })
}