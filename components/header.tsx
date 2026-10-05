"use client";

import { Bell, Search } from "lucide-react";

export function Header() {
  return (
    <header className="flex h-20 shrink-0 items-center gap-x-4 border-b border-slate-200/60 bg-white/80 backdrop-blur-md px-4 sm:gap-x-6 sm:px-6 lg:px-8 z-10 sticky top-0">
      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <form className="relative flex flex-1 items-center" action="#" method="GET">
          <label htmlFor="search-field" className="sr-only">
            Search
          </label>
          <div className="relative w-full max-w-md">
            <Search
              className="pointer-events-none absolute inset-y-0 left-3 h-full w-4 text-slate-400"
              aria-hidden="true"
            />
            <input
              id="search-field"
              className="block h-10 w-full rounded-full border border-slate-200 bg-slate-50/50 py-2 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
              placeholder="Search anything..."
              type="search"
              name="search"
            />
          </div>
        </form>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <button type="button" className="relative p-2 text-slate-400 hover:text-slate-500 transition-colors rounded-full hover:bg-slate-50">
            <span className="sr-only">View notifications</span>
            <Bell className="h-5 w-5" aria-hidden="true" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-blue-500 border-2 border-white"></span>
          </button>
          
          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-slate-200" aria-hidden="true" />
          
          <div className="flex items-center gap-x-4 lg:gap-x-6">
            <button className="flex items-center gap-x-3 text-sm font-medium leading-6 text-slate-900 p-1 rounded-full hover:bg-slate-50 transition-colors pr-3">
              <img
                className="h-9 w-9 rounded-full bg-slate-100 object-cover border border-slate-200"
                src="https://ui-avatars.com/api/?name=Agent+RH&background=eff6ff&color=1d4ed8"
                alt="User profile"
              />
              <span className="sr-only">Your profile</span>
              <div className="hidden md:flex md:flex-col md:items-start">
                <span className="text-sm font-semibold text-slate-900">Agent RH</span>
                <span className="text-xs text-slate-500">Service RH</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
