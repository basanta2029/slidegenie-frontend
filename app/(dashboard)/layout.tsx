'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  Home as HomeIcon,
  Presentation as PresentationIcon,
  FileText as TemplateIcon,
  Settings as SettingsIcon,
  HelpCircle as HelpCircleIcon,
  LogOut as LogOutIcon,
  Menu as MenuIcon,
  Plus as PlusIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Sparkles as SparklesIcon,
  BarChart3 as BarChart3Icon,
  Users as UsersIcon,
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Presentations', href: '/presentations', icon: PresentationIcon },
  { name: 'Templates', href: '/templates', icon: TemplateIcon },
  { name: 'Analytics', href: '/analytics', icon: BarChart3Icon },
  { name: 'Team', href: '/team', icon: UsersIcon },
]

const bottomNavigation = [
  { name: 'Settings', href: '/settings', icon: SettingsIcon },
  { name: 'Help & Support', href: '/help', icon: HelpCircleIcon },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Desktop Sidebar */}
      <div
        className={cn(
          "hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col transition-all duration-300",
          sidebarCollapsed ? "lg:w-16" : "lg:w-64"
        )}
      >
        <div className="flex flex-1 flex-col gap-y-5 overflow-y-auto border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 pb-4">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-2">
              <SparklesIcon className="h-8 w-8 text-primary" />
              {!sidebarCollapsed && (
                <span className="text-xl font-semibold text-gray-900 dark:text-white">
                  SlideGenie
                </span>
              )}
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:flex"
            >
              {sidebarCollapsed ? (
                <ChevronRightIcon className="h-4 w-4" />
              ) : (
                <ChevronLeftIcon className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="px-2">
            <Button className="w-full justify-start" size={sidebarCollapsed ? "icon" : "default"}>
              <PlusIcon className="h-4 w-4" />
              {!sidebarCollapsed && <span className="ml-2">New Presentation</span>}
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                  pathname === item.href
                    ? "bg-primary/10 text-primary"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
              >
                <item.icon
                  className={cn(
                    "h-5 w-5 flex-shrink-0",
                    sidebarCollapsed ? "mx-auto" : "mr-3"
                  )}
                />
                {!sidebarCollapsed && item.name}
              </Link>
            ))}
          </nav>

          {/* Usage Stats Widget */}
          {!sidebarCollapsed && (
            <div className="mx-2 rounded-lg bg-gray-100 dark:bg-gray-800 p-4">
              <div className="text-sm font-medium text-gray-900 dark:text-white">Usage This Month</div>
              <div className="mt-2 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600 dark:text-gray-400">Presentations</span>
                  <span className="font-medium">12/50</span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                  <div className="h-2 w-1/4 rounded-full bg-primary" />
                </div>
              </div>
              <Badge className="mt-3 w-full justify-center" variant="secondary">
                Free Plan
              </Badge>
            </div>
          )}

          {/* Bottom Navigation */}
          <nav className="space-y-1 pb-2">
            {bottomNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                  "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
              >
                <item.icon
                  className={cn(
                    "h-5 w-5 flex-shrink-0",
                    sidebarCollapsed ? "mx-auto" : "mr-3"
                  )}
                />
                {!sidebarCollapsed && item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="sticky top-0 z-40 flex h-16 items-center gap-x-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 shadow-sm lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <MenuIcon className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="flex h-full flex-col">
              {/* Mobile Sidebar Content */}
              <div className="flex h-16 items-center px-6">
                <Link href="/dashboard" className="flex items-center gap-2">
                  <SparklesIcon className="h-8 w-8 text-primary" />
                  <span className="text-xl font-semibold">SlideGenie</span>
                </Link>
              </div>
              
              <div className="flex-1 space-y-4 px-4">
                <Button className="w-full justify-start">
                  <PlusIcon className="mr-2 h-4 w-4" />
                  New Presentation
                </Button>

                <nav className="space-y-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "flex items-center px-2 py-2 text-sm font-medium rounded-md",
                        pathname === item.href
                          ? "bg-primary/10 text-primary"
                          : "text-gray-700 hover:bg-gray-100"
                      )}
                    >
                      <item.icon className="mr-3 h-5 w-5" />
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="border-t p-4">
                {bottomNavigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100"
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex-1">
          <Link href="/dashboard" className="flex items-center gap-2">
            <SparklesIcon className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold">SlideGenie</span>
          </Link>
        </div>

        {/* Mobile User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatars/user.png" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              <LogOutIcon className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Main Content */}
      <div className={cn("lg:pl-64", sidebarCollapsed && "lg:pl-16")}>
        {/* Desktop Header */}
        <div className="sticky top-0 z-30 hidden h-16 items-center gap-x-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 shadow-sm lg:flex">
          <div className="flex-1" />
          
          {/* Desktop User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 px-2">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src="/avatars/user.png" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start text-sm">
                  <span className="font-medium">John Doe</span>
                  <span className="text-xs text-gray-500">john@example.com</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <LogOutIcon className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Page Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}