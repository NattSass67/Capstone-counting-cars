

import { Container } from '@/components/components-gpts/layout/Container'
import { NavItem } from './HeaderGPT'



export function Footer() {
  return (
    <footer className="flex-none mt-12 bg-white dark:bg-zinc-900">
      <div>
        <div className="border-t border-zinc-100 pb-16 pt-10 dark:border-zinc-700/40">
          <Container>
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                <NavItem href="/about">About</NavItem>
                <NavItem href="/projects">Projects</NavItem>
                <NavItem href="/speaking">Speaking</NavItem>
                <NavItem href="/uses">Uses</NavItem>
              </div>
              <p className="text-sm text-zinc-400 dark:text-zinc-500">
                &copy; {new Date().getFullYear()} Prompt Base. All rights
                reserved.
              </p>
            </div>
          </Container>
        </div>
      </div>
    </footer>
  )
}
