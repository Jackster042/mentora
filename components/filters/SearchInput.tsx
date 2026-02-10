"use client";

import React, {useState, useEffect} from 'react'
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import Image from "next/image";
import {formUrlQuery, removeKeysFromUrlQuery} from "@jsmastery/utils";

const SearchInput = () => {

    const pathName = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get("topic") || "";

    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {

        const delayDebounceFn = setTimeout(() => {
      if(searchQuery) {
          const newUrl = formUrlQuery({
              params: searchParams.toString(),
              key: "topic",
              value: searchQuery,
          });

          router.push(newUrl,  {scroll: false});
      }else {
          if(pathName === "/companions") {
              const newUrl = removeKeysFromUrlQuery({
                  params: searchParams.toString(),
                  keysToRemove: ["topic"],
              });

              router.push(newUrl, { scroll: false });
          }
      }
       }, 500)
    },[searchQuery, router, pathName, searchParams]);

    return (
        <div 
            className="relative rounded-xl items-center flex gap-2 px-3 h-10 transition-all duration-300 focus-within:shadow-[0_0_0_2px_rgba(212,168,83,0.15)]"
            style={{ 
                background: 'var(--bg-elevated)', 
                border: '1px solid var(--border-subtle)',
            }}
        >
            <Image src="/icons/search.svg" alt="search" width={14} height={14} className="brightness-200 opacity-50" />
            <input
                placeholder="Search companions..."
                className="outline-none text-sm bg-transparent w-full"
                style={{ color: 'var(--text-primary)' }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
    )
}
export default SearchInput
