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

const RECAPTCHA_SITE_KEY = '6LfMd5ArAAAAAJsui3V7lbDhHz3FooPVhPTnXR63'

export const RecaptchaProvider = () => {
  useEffect(() => {
    if (!document.getElementById('recaptcha-v3')) {
      const script = document.createElement('script')
      script.id = 'recaptcha-v3'
      script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`
      script.async = true
      script.defer = true
      document.head.appendChild(script)

      script.onload = () => {
        console.log('reCAPTCHA script loaded successfully')
      }
      script.onerror = () => {
        console.error('Failed to load reCAPTCHA script')
      }
    }
  }, [])

  return null
}

export const getRecaptchaToken = async (action: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const executeRecaptcha = () => {
      if (window.grecaptcha && window.grecaptcha.execute) {
        console.log('Executing reCAPTCHA with action:', action)
        window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action })
          .then(token => {
            console.log('reCAPTCHA token generated (first 20 chars):', token.substring(0, 20) + '...')
            console.log('Token length:', token.length)
            console.log('Token format validation:', /^[A-Za-z0-9_-]+$/.test(token) ? 'Valid' : 'Invalid')
            resolve(token)
          })
          .catch(error => {
            console.error('reCAPTCHA execution error:', error)
            reject(error)
          })
      } else {
        const error = new Error('reCAPTCHA not loaded')
        console.error(error.message)
        reject(error)
      }
    }

    if (window.grecaptcha && window.grecaptcha.ready) {
      window.grecaptcha.ready(executeRecaptcha)
    } else {
      console.log('reCAPTCHA not ready, waiting for initialization...')
      const checkRecaptcha = () => {
        if (window.grecaptcha && window.grecaptcha.ready) {
          console.log('reCAPTCHA is now ready')
          window.grecaptcha.ready(executeRecaptcha)
        } else {
          setTimeout(checkRecaptcha, 100)
        }
      }
      checkRecaptcha()
    }
  })
}