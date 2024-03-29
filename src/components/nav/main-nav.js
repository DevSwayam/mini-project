"use client";
import React, { useState } from "react";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

function MainNav({ items }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleLinkClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2" passHref>
        {/* <Icons.logo className="h-6 w-6" /> */}
        <span className="inline-block font-bold">{siteConfig.name}</span>
      </Link>
      {items && items.length ? (
        <nav className="md:flex hidden gap-6">
          {items.map(
            (item, index) =>
              item.href && (
                <div key={index}>
                  <Link
                    key={index}
                    href={item.href}
                    className={cn(
                      "flex items-center text-sm font-medium",
                      activeIndex === index
                        ? "text-foreground"
                        : "text-muted-foreground",
                      item.disabled && "cursor-not-allowed opacity-80"
                    )}
                    onClick={() => handleLinkClick(index)}
                    passHref
                  >
                    {item.title}
                  </Link>
                  {/* {!user && item.title === "Home" ? (
                    <Link
                      key={index}
                      href={item.href}
                      className={cn(
                        "flex items-center text-sm font-medium",
                        activeIndex === index
                          ? "text-foreground"
                          : "text-muted-foreground",
                        item.disabled && "cursor-not-allowed opacity-80"
                      )}
                      onClick={() => handleLinkClick(index)}
                      passHref
                    >
                      {item.title}
                    </Link>
                  ) : (
                    <></>
                  )} */}
                  {/* {user && (
                    <Link
                      key={index}
                      href={item.href}
                      className={cn(
                        "flex items-center text-sm font-medium",
                        activeIndex === index
                          ? "text-foreground"
                          : "text-muted-foreground",
                        item.disabled && "cursor-not-allowed opacity-80"
                      )}
                      onClick={() => handleLinkClick(index)}
                      passHref
                    >
                      {item.title}
                    </Link> */}
                  {/* )} */}
                </div>
              )
          )}
        </nav>
      ) : null}
    </div>
  );
}

export default MainNav;
