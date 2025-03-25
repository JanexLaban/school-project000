
"use client"

import * as React from "react"
import { Toast } from "@/components/ui/toast"

type ToastProps = {
  title?: string
  description?: string
  variant?: "default" | "destructive" | "success"
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

export function toast({ title, description, variant }: ToastProps) {
  const toastElement = document.createElement('div')
  toastElement.className = `fixed top-4 right-4 p-4 rounded shadow-lg ${
    variant === 'destructive' ? 'bg-red-500' : 'bg-green-500'
  } text-white max-w-md z-50`
  
  toastElement.innerHTML = `
    ${title ? `<h4 class="font-bold">${title}</h4>` : ''}
    ${description ? `<p>${description}</p>` : ''}
  `
  
  document.body.appendChild(toastElement)
  
  const timeoutId = setTimeout(() => {
    toastElement.remove()
  }, 3000)
  
  toastTimeouts.set(timeoutId.toString(), timeoutId)
}
