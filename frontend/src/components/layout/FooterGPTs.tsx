'use client'
import { useAppRoute } from "@/service/custom"
/* eslint-disable @next/next/no-img-element */
const navigation = {
  solutions: [
    { name: 'Explore All GPT Categories', href: '#' },
    { name: 'Discover Newest GPTs', href: '#' },
    { name: 'Search All GPTs', href: '#' },
    { name: 'OpenAI Sora GPTs', href: '#' },
    { name: 'Suno GPT', href: '#' },
    { name: 'Rizz GPT', href: '#' },
    { name: 'Homeworkify GPT', href: '#' },
    { name: 'Bypass GPT', href: '#' },
  ],
  support: [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Service Status', href: '#' },
    { name: 'Download All GPTs Data', href: '#' },
    { name: "What's GPTs Hunter", href: '#' },
  ],
  products: [
    { name: 'Daily GPT Store Trending Data', href: '#' },
    { name: 'Daily Top 500 GPTs', href: '#' },
    { name: 'GPTs API', href: '#' },
    { name: 'GPTs Hunt', href: '#' },
    { name: 'Chrome extension', href: '#' },
    { name: 'GPT by GPTsHunter(WIP)', href: '#' },
    { name: 'Alternative to ChatGPT', href: '#' },
    { name: 'AI.LS', href: '#' },
    { name: 'IP.network', href: '#' },
    { name: 'MakerHunter Community', href: '#' },
  ],
  friends: [
    { name: 'd.id', href: '#' },
    { name: 'OKDID', href: '#' },
    { name: 'Monica', href: '#' },
    { name: 'Podwise', href: '#' },
    { name: 'Gemini Pro Chat', href: '#' },
    { name: 'gapier', href: '#' },
    { name: 'OpenSource LLM Guide', href: '#' },
    { name: 'MagicAnimate', href: '#' },
    { name: 'OutfitAnyone', href: '#' },
    { name: 'ChatGPT Sora', href: '#' },
  ],
}

export default function FooterGPT() {
  let isActive = useAppRoute().subPath === "gpt-store"
  return (
    <footer className="bg-white shadow mt-24 ring-zinc-100 ring-1 dark:ring-zinc-300/20 dark:bg-zinc-900 " aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className={`mx-auto ${!isActive ? "max-w-screen-2xl":"max-w-7xl"} px-6 py-16 md:px-10 xl:px-20`}>
        <div className="grid xl:grid-cols-4 gap-8 sm:grid-cols-3">
          <div className="col-span-1 flex flex-col xl:col-span-1 sm:col-span-3">
            <div className="flex gap-2 sm:gap-3">
              <img
                className="h-9 w-auto rounded-full"
                src="https://www.gptshunter.com/_nuxt/logo.DQOOruJz.png"
                alt="Your Company"
              />
              <span className="text-lg font-semibold text-zinc-800 sm:text-xl dark:text-zinc-200">
                GPTs Hunter
              </span>
            </div>
            <span className="text-sm leading-6 mt-4 text-zinc-400">
              Share and discover the best custom GPTs on the GPT Store and use
              with ChatGPT.
            </span>
            <div className="mt-4 sm:grid sm:grid-cols-3 xl:flex xl:flex-col gap-x-8">
              {navigation.solutions.map((item) => (
                <div key={item.name} className="mb-2">
                  <a
                    href={item.href}
                    className="text-sm text-zinc-700 hover:text-teal-400 align-baseline dark:text-zinc-500"
                  >
                    {item.name}
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-1">
            <h3 className="text-sm font-semibold leading-6 text-zinc-400 ">
              Policy
            </h3>
            <ul role="list" className="mt-4 space-y-2">
              {navigation.support.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-sm leading-6 text-zinc-700 hover:text-teal-400 dark:text-zinc-500"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-sm font-semibold leading-6 text-zinc-400 ">
              Products
            </h3>
            <ul role="list" className="mt-4 space-y-2">
              {navigation.products.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-sm leading-6 text-zinc-700 hover:text-teal-400 dark:text-zinc-500"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-sm font-semibold leading-6 text-zinc-400 ">
              Friends
            </h3>
            <ul role="list" className="mt-4 space-y-2">
              {navigation.friends.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-sm leading-6 text-zinc-700 hover:text-teal-400 dark:text-zinc-500"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
