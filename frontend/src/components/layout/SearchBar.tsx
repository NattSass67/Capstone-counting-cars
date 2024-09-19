/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/consistent-type-imports */
'use client'

import { useState, useEffect, KeyboardEvent } from 'react'
import { MagnifyingGlassIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
import { clsx } from 'clsx'
import { useNavigate } from '@tanstack/react-router'
import { useSearchBarStore } from '@/stores/search-bar/search-bar'

export function SearchBarRedirect({ action }: { action?: Function }) {
  const navigate = useNavigate({ from: '/$locale' })
  const searchBar = useSearchBarStore()
  const [query, setQuery] = useState<string>('')
  const [keyword, setKeyword] = useState<string[]>([])
  const [categoryListOpen, setCategoryListOpen] = useState(false)
  const [modelListOpen, setModelListOpen] = useState(false)
  const categoryItems = filterControlProps.category.selectList
  const modelItems = filterControlProps.model.selectList
  const [model, setModel] = useState<string>('')
  const [category, setCategory] = useState<string>('')

  const onSearchChange = async (key: string) => {
    //   if (key.length > 0) {
    //     const res = await getSearchKeyword(key)
    //     setKeyword(res.data)
    //   } else {
    //     setKeyword([])
    //   }
  }

  const searchAction = () => {
    navigate({
      to: '/$locale/marketplace',
      search: {
        product: searchBar.searchProduct,
        searchQuery: query,
        model: model,
        category: category
      }
    })
  }

  let keywordList = keyword.map((object, index) => (
    <div
      key={index}
      onClick={() => {
        setQuery(object)
        setKeyword([])
      }}
      className="search bg-white px-4 py-1.5 text-sm hover:bg-zinc-50 md:rounded-xl dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700/50 md:dark:bg-zinc-800/90">
      {object}
    </div>
  ))

  const categoryList = categoryItems.map((object, index) => (
    <div
      key={index}
      onClick={() => {
        setCategoryListOpen(false)
        setCategory(object)
      }}
      className="search flex bg-white px-4 py-1.5 text-base hover:bg-zinc-50 md:rounded-xl dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700/50 md:dark:bg-zinc-800/90">
      {object.toLowerCase()}
    </div>
  ))

  const modelList = modelItems.map((object, index) => (
    <div
      key={index}
      onClick={() => {
        setCategoryListOpen(false)
        setModel(object)
      }}
      className="search flex bg-white px-4 py-1.5 text-base hover:bg-zinc-50 md:rounded-xl dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700/50 md:dark:bg-zinc-800/90">
      {object.toLowerCase()}
    </div>
  ))


  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      // Your function or code to execute when Enter is pressed
      if (query.length == 0) {
        return
      }
      searchAction()
      searchBar.setIsOpen(false)
    }
  }

  const handleOutsideClick = (event: any) => {
    if (!event.target.closest('.search')) {
      setKeyword([])
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick)

    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [])

  return (
    <div className="nav-toggle relative flex h-full w-full flex-none flex-col items-center text-sm">
      {/*desktop */}
      <div className="relative z-20 w-full max-w-2xl flex-col rounded-full h-full">
        <div className="flex h-full">
          <div className="search relative w-full flex flex-col rounded-full bg-white/90 px-8 py-3.5 text-zinc-800 hover:bg-zinc-100 focus:outline-none dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700/50">
            <p className="leading-4 text-sm">Search</p>
            <input
              onFocus={() => {
                setCategoryListOpen(false)
                setModelListOpen(false)
              }}
              className="search leading-4 mt-1 flex w-full truncate bg-transparent text-sm text-zinc-600 focus:outline-none dark:text-zinc-400"
              placeholder={'Tags and Keywords'}
              value={query}
              onChange={(event) => {
                setQuery(event.target.value)
                onSearchChange(event.target.value)
              }}
              onKeyDown={handleKeyDown}
            />
          </div>

          {/* model */}
          {searchBar.searchProduct != 'Apps' && (
            <>
              <div className="mx-2 my-3 flex border-l dark:border-zinc-300/20"></div>
              <button
                onClick={() => {
                  setModelListOpen(true)
                  setCategoryListOpen(false)
                  setKeyword([])
                }}
                className="search relative w-full rounded-full flex flex-col bg-white/90 px-6 py-3.5 text-zinc-800 hover:bg-zinc-100 focus:outline-none dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700/50">
                <p className="leading-4 text-xs">Model</p>
                <div className="flex">
                  <p className="min-w-0 truncate py-0.5 text-sm leading-4 mt-1 text-zinc-600 dark:text-zinc-400">
                    {model == '' ? 'Add filter' : model}
                  </p>
                </div>
                {modelListOpen && (
                  <div className="search nav-toggle no-scrollbar absolute right-0 top-16 hidden max-h-40 w-full flex-col overflow-hidden overflow-y-auto rounded-xl border bg-white shadow-md sm:flex dark:border-zinc-300/20 dark:bg-zinc-800">
                    {modelList}
                  </div>
                )}
              </button>
            </>
          )}

          {/* category */}
          <div className="mx-2 my-3 flex border-l dark:border-zinc-300/20"></div>
          <button
            onClick={() => {
              setCategoryListOpen(true)
              setModelListOpen(false)
              setKeyword([])
            }}
            className="search relative flex flex-col w-full rounded-full bg-white/90 px-6 py-3.5 text-zinc-800 hover:bg-zinc-100 focus:outline-none dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700/50">
            <p className="text-xs leading-4">Category</p>
            <div className="flex">
              <p className="min-w-0 truncate text-sm leading-4 mt-1 text-zinc-600 dark:text-zinc-400">
                {category == '' ? 'Add filter' : category}
              </p>
            </div>
            {categoryListOpen && (
              <div className="search nav-toggle no-scrollbar absolute right-0 top-16 hidden max-h-40 w-full flex-col overflow-hidden overflow-y-auto rounded-xl border bg-white shadow-md sm:flex dark:border-zinc-300/20 dark:bg-zinc-800">
                {categoryList}
              </div>
            )}
          </button>

          {/* Search */}
          <a
            onClick={() => {
              if (query.length == 0) {
                return
              }
              searchAction()
              searchBar.setIsOpen(false)
            }}
            className="group mx-2 my-auto hidden h-12 w-12 flex-none items-center justify-center gap-2 rounded-full bg-zinc-800 px-2 py-2 shadow ring-1 ring-zinc-200 transition hover:scale-105 sm:flex dark:bg-zinc-700/50 dark:ring-zinc-300/20">
            <MagnifyingGlassIcon
              className="pointer-events-none h-5 w-5 text-zinc-200 dark:text-zinc-400"
              aria-hidden="true"
            />
          </a>
        </div>

        {keywordList.length != 0 && (
          <div className="search nav-toggle absolute top-16 hidden w-1/2 flex-col overflow-hidden rounded-3xl border-t bg-white p-4 md:flex dark:border-zinc-300/20 dark:bg-zinc-800">
            {keywordList}
          </div>
        )}
      </div>
    </div>
  )
}

import { XMarkIcon } from '@heroicons/react/24/outline'
import { Button } from '../shared/Button'
import { DynamicSelector } from '../shared/DynamicElements'

export function SearchBarMobile({ action }: { action?: Function }) {
  const navigate = useNavigate({ from: '/$locale' })
  const searchBar = useSearchBarStore()
  const [query, setQuery] = useState<string>('')
  const [keyword, setKeyword] = useState<string[]>([])
  const [model, setModel] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const [searchOpen, setSearchOpen] = useState(false)

  const [boxState, setBoxState] = useState(0)

  const onSearchChange = async (key: string) => {
    //   if (key.length > 0) {
    //     const res = await getSearchKeyword(key)
    //     setKeyword(res.data)
    //   } else {
    //     setKeyword([])
    //   }
  }

  const searchAction = () => {
    navigate({
      to: '/$locale/marketplace',
      search: {
        product: searchBar.searchProduct,
        searchQuery: query,
        model: model,
        category: category
      }
    })
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      // Your function or code to execute when Enter is pressed
      if (query.length == 0) {
        return
      }
      searchAction()
      searchBar.setIsOpen(false)
    }
  }

  const handleOutsideClick = (event: any) => {
    if (!event.target.closest('.search')) {
      setKeyword([])
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick)

    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [])

  return (
    <div className="nav-toggle fixed inset-0 flex flex-col bg-zinc-100 backdrop-blur-sm sm:hidden dark:bg-zinc-900">
      <div
        className={clsx(
          'flex-1 transition ease-out duration-500 overflow-y-auto',
          searchBar.primaryTransition ? 'translate-y-0' : '-translate-y-16'
        )}>
        {!searchOpen && (
          <div className="flex w-full justify-center gap-4 py-6 text-base">
            <div
              className={clsx(
                'flex cursor-pointer items-center',
                searchBar.searchProduct == 'Prompts' ? 'font-medium' : ''
              )}
              onClick={() => {
                searchBar.setSearchProduct('Prompts')
              }}>
              Prompts
            </div>
            <div
              className={clsx(
                'flex cursor-pointer items-center',
                searchBar.searchProduct == 'Bundles' ? 'font-medium' : ''
              )}
              onClick={() => {
                searchBar.setSearchProduct('Bundles')
              }}>
              Bundles
            </div>
            <div
              className={clsx(
                'flex cursor-pointer items-center',
                searchBar.searchProduct == 'Apps' ? 'font-medium' : ''
              )}
              onClick={() => {
                searchBar.setSearchProduct('Apps')
              }}>
              Apps
            </div>
          </div>
        )}

        {!searchOpen && (
          <div
            onClick={() => {
              searchBar.setIsOpen(false)
            }}
            className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border-zinc-300/20 bg-white shadow-md dark:bg-zinc-800">
            <XMarkIcon className="h-5 w-5" />
          </div>
        )}
        <div
          onClick={() => {
            setBoxState(0)
          }}
          className={clsx(
            'nav-toggle flex flex-col rounded-xl bg-white p-4 shadow-lg transition-all dark:bg-zinc-800',
            boxState == 0
              ? searchOpen
                ? 'mx-0 mt-6 h-screen flex-none'
                : 'mx-4 h-36'
              : 'mx-4 h-16 justify-center'
          )}>
          {boxState != 0 && (
            <div className="nav-toggle flex w-full items-center justify-between">
              <div className="text-zinc-600 dark:text-zinc-400">Search</div>
              <div className="font-medium">{query != '' ? query : 'Any Prompts'}</div>
            </div>
          )}
          {boxState == 0 && (
            <>
              {!searchOpen && <div className="mb-4 text-2xl font-medium">Discover Prompts</div>}
              <div
                onClick={() => {
                  setSearchOpen(true)
                }}
                className="flex h-14 items-center gap-2 rounded-md px-4 shadow ring-1 ring-zinc-300/50">
                {!searchOpen && <MagnifyingGlassIcon className="h-5 w-5" />}
                {searchOpen && (
                  <ArrowLeftIcon
                    onClick={(e) => {
                      e.stopPropagation() // Prevents the parent div's onClick from being triggered
                      setSearchOpen(false)
                    }}
                    className="nav-toggle h-5 w-5 cursor-auto"
                  />
                )}
                <input
                  type="text"
                  placeholder="Search..."
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value)
                  }}
                  className="w-full border-none bg-transparent p-2 focus:outline-none"
                />
              </div>
            </>
          )}

          {/* Add input box no focus border and all focus outline */}
        </div>

        {searchBar.searchProduct != 'Apps' && (
          <div
            onClick={() => {
              setBoxState(1)
            }}
            className={clsx(
              'nav-toggle rounded-xl bg-white p-4 shadow-lg transition-all dark:bg-zinc-800',
              //   searchOpen ? 'mx-0 mt-6 h-screen flex-none' : 'mx-4 mt-16',
              boxState == 1 ? 'mx-4 mt-4 h-48' : 'mx-4 mt-4 flex h-16 items-center'
            )}>
            {boxState != 1 && (
              <div className="nav-toggle flex w-full items-center justify-between">
                <div className="text-zinc-600 dark:text-zinc-400">Model</div>
                <div className="font-medium">{model != '' ? model : 'Choose Model'}</div>
              </div>
            )}
            {boxState == 1 && (
              <>
                <div className="mb-4 text-2xl font-medium">Select Model</div>
                <DynamicSelector
                  selectList={filterControlProps.model.selectList}
                  value={model != '' ? model : 'Select Model'}
                  myOnChange={(value: string) => {
                    setModel(value)
                  }}
                />
              </>
            )}
          </div>
        )}

        <div
          onClick={() => {
            setBoxState(2)
          }}
          className={clsx(
            'rounded-xl bg-white p-4 shadow-lg transition-all dark:bg-zinc-800',
            //   searchOpen ? 'mx-0 mt-6 h-screen flex-none' : 'mx-4 mt-16',
            boxState == 2 ? 'mx-4 mt-4 h-48' : 'mx-4 mt-4 flex h-16 items-center'
          )}>
          {boxState != 2 && (
            <div className="nav-toggle flex w-full items-center justify-between">
              <div className="text-zinc-600 dark:text-zinc-400">Category</div>
              <div className="font-medium">{category != '' ? category : 'Choose Category'}</div>
            </div>
          )}
          {boxState == 2 && (
            <>
              <div className="mb-4 text-2xl font-medium">Select Category</div>
              <DynamicSelector
                selectList={filterControlProps.category.selectList}
                value={category != '' ? category : 'Select Category'}
                myOnChange={(value: string) => {
                  setCategory(value)
                }}
              />
            </>
          )}
        </div>
      </div>

      {/* Foot */}
      <div className="flex h-16 items-center justify-between bg-white px-4 dark:bg-zinc-800">
        <div className="underline underline-offset-1">Clear</div>
        <Button
          className="flex gap-1"
          onClick={() => {
            searchAction()
            searchBar.setIsOpen(false)
          }}>
          <MagnifyingGlassIcon className="h-5 w-5" /> Search
        </Button>
      </div>
    </div>
  )
}

const filterControlProps = {
  product: {
    type: 'input',
    name: 'Product',
    dataType: 'select',
    selectList: ['Prompts', 'Bundles', 'Apps'],
    defaultValue: 'Prompts',
    colSpan: 1
  },
  type: {
    type: 'input',
    name: 'Type',
    dataType: 'select',
    selectList: ['All', 'Image', 'Text'],
    defaultValue: 'All',
    colSpan: 1
  },
  sortBy: {
    type: 'input',
    name: 'Sort by',
    dataType: 'select',
    selectList: ['Trending', 'Most Popular', 'Newest'],
    defaultValue: 'Trending',
    colSpan: 1
  },
  time: {
    type: 'input',
    name: 'Time',
    dataType: 'select',
    selectList: ['All time', 'Past Month', 'Past Week', 'Past 24 hours'],
    defaultValue: 'All time',
    colSpan: 1
  },
  model: {
    type: 'input',
    name: 'Model',
    dataType: 'select',
    selectList: ['All', 'DALL·E', 'GPT', 'Leonardo Ai', 'Llama', 'Midjourney', 'Stable Diffusion'],
    defaultValue: 'All',
    colSpan: 1
  },
  version: {
    type: 'input',
    name: 'Version',
    dataType: 'select',
    selectList: [
      'All',
      'Leonardo Lightning XL',
      'Leonardo Anime XL',
      'Leonardo Diffusion XL',
      'Leonardo Kino XL',
      'Leonardo Vision XL',
      'AlbedoBase XL',
      'DreamShaper v7',
      'Absolute Reality v1.6',
      'RPG v5',
      'Leonardo Diffusion',
      'RPG 4.0',
      '3D Animation Style',
      'SDXL 0.9',
      'Stable Diffusion 1.5',
      'Stable Diffusion 2.1'
    ],
    defaultValue: 'All',
    colSpan: 1
  },
  withArtistName: {
    type: 'input',
    name: 'Prompts with artist names',
    dataType: 'select',
    selectList: ['Hidden', 'Visible'],
    defaultValue: 'Visible',
    colSpan: 1
  },
  category: {
    type: 'input',
    name: 'Category',
    dataType: 'select-many',
    selectList: [
      '3D',
      'Accessory',
      'Animal',
      'Anime',
      'Art',
      'Avatar',
      'Building',
      'Cartoon',
      'Celebrity',
      'Clothes',
      'Cute',
      'Cyberpunk',
      'Drawing',
      'Drink',
      'Fantasy',
      'Fashion',
      'Food',
      'Future',
      'Games',
      'Glass',
      'Graphic Design',
      'Holiday',
      'Icons',
      'Illustration',
      'Ink',
      'Interiors',
      'Jewelry',
      'Landscape',
      'Logo',
      'Mockup',
      'Monogram',
      'Monster',
      'Nature',
      'Painting',
      'Pattern',
      'People',
      'Photography',
      'Pixel Art',
      'Product',
      'Psychedelic',
      'Retro',
      'Scary',
      'Space',
      'Statues',
      'Steampunk',
      'Unique Style',
      'Synthwave',
      'Texture',
      'Vehicle',
      'Wallpaper',
      'Wood'
    ],
    defaultValue: [],
    colSpan: 1
  }
}

type filterProps = typeof filterControlProps
export type { filterProps }
