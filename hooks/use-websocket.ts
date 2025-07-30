import { useEffect, useState, useRef, useCallback } from 'react'
import { io, Socket } from 'socket.io-client'
import { GenerationProgress } from '@/types'

interface UseWebSocketOptions {
  url: string
  onMessage?: (data: GenerationProgress) => void
  onError?: (error: Event | Error) => void
  onOpen?: () => void
  onClose?: () => void
  reconnectAttempts?: number
  reconnectDelay?: number
  useSocketIO?: boolean
}

export function useWebSocket({
  url,
  onMessage,
  onError,
  onOpen,
  onClose,
  reconnectAttempts = 3,
  reconnectDelay = 1000,
  useSocketIO = false,
}: UseWebSocketOptions) {
  const [isConnected, setIsConnected] = useState(false)
  const [lastMessage, setLastMessage] = useState<GenerationProgress | null>(null)
  const wsRef = useRef<WebSocket | null>(null)
  const socketRef = useRef<Socket | null>(null)
  const reconnectAttemptsRef = useRef(0)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>()

  const connectWebSocket = useCallback(() => {
    try {
      const ws = new WebSocket(url)
      wsRef.current = ws

      ws.onopen = () => {
        setIsConnected(true)
        reconnectAttemptsRef.current = 0
        onOpen?.()
      }

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data) as GenerationProgress
          setLastMessage(data)
          onMessage?.(data)
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error)
        }
      }

      ws.onerror = (error) => {
        console.error('WebSocket error:', error)
        onError?.(error)
      }

      ws.onclose = () => {
        setIsConnected(false)
        onClose?.()

        // Attempt to reconnect
        if (reconnectAttemptsRef.current < reconnectAttempts) {
          reconnectAttemptsRef.current++
          reconnectTimeoutRef.current = setTimeout(() => {
            connectWebSocket()
          }, reconnectDelay * reconnectAttemptsRef.current)
        }
      }
    } catch (error) {
      console.error('Failed to create WebSocket connection:', error)
      onError?.(error as Error)
    }
  }, [url, onMessage, onError, onOpen, onClose, reconnectAttempts, reconnectDelay])

  const connectSocketIO = useCallback(() => {
    try {
      const socket = io(url, {
        reconnection: true,
        reconnectionAttempts: reconnectAttempts,
        reconnectionDelay: reconnectDelay,
      })

      socketRef.current = socket

      socket.on('connect', () => {
        setIsConnected(true)
        reconnectAttemptsRef.current = 0
        onOpen?.()
      })

      socket.on('progress', (data: GenerationProgress) => {
        setLastMessage(data)
        onMessage?.(data)
      })

      socket.on('error', (error: Error) => {
        console.error('Socket.IO error:', error)
        onError?.(error)
      })

      socket.on('disconnect', () => {
        setIsConnected(false)
        onClose?.()
      })
    } catch (error) {
      console.error('Failed to create Socket.IO connection:', error)
      onError?.(error as Error)
    }
  }, [url, onMessage, onError, onOpen, onClose, reconnectAttempts, reconnectDelay])

  const connect = useCallback(() => {
    if (useSocketIO) {
      connectSocketIO()
    } else {
      connectWebSocket()
    }
  }, [useSocketIO, connectSocketIO, connectWebSocket])

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current)
    }
    
    if (wsRef.current) {
      wsRef.current.close()
      wsRef.current = null
    }

    if (socketRef.current) {
      socketRef.current.disconnect()
      socketRef.current = null
    }
  }, [])

  const sendMessage = useCallback((data: any) => {
    if (useSocketIO && socketRef.current && socketRef.current.connected) {
      socketRef.current.emit('message', data)
    } else if (!useSocketIO && wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(data))
    }
  }, [useSocketIO])

  useEffect(() => {
    connect()
    return () => {
      disconnect()
    }
  }, [connect, disconnect])

  return {
    isConnected,
    lastMessage,
    sendMessage,
    disconnect,
    reconnect: connect,
  }
}