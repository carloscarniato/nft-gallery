"use client";

import { useCallback, useEffect, useState } from "react";

export default function ThemeToggle() {
  // Temporary fix as next-themes doens't work properly with NextJS 13 and appDir, more info: https://github.com/pacocoursey/next-themes/issues/152
  const [htmlElement, setHtmlElement] = useState<HTMLElement>();

  const toggleTheme = useCallback(() => {
    htmlElement?.classList.contains("dark") ?  localStorage.removeItem("theme") : localStorage.setItem("theme", "dark");
    htmlElement?.classList.toggle("dark");
  }, [htmlElement])
  
  useEffect(() => {
    setHtmlElement(document.getElementsByTagName("html")[0]);
    localStorage.getItem("theme") ? toggleTheme() : null
  }, [toggleTheme]);

  return (
    <div>
        <input className='w-0 h-0 hidden' type="checkbox" id="darkmode-input" checked={htmlElement?.classList.contains("dark") ?? false} onChange={toggleTheme}/>
          <label className="w-16 h-8 relative block bg-slate-200 after:bg-white after:left-2 rounded-3xl cursor-pointer after:content-[''] after:w-5 after:h-5 after:absolute after:top-1.5 after:rounded-full after:left-14 duration-300 dark:bg-gray-800 dark:after:bg-gray-600 dark:after:left-9" htmlFor="darkmode-input">
            <svg
              width={16}
              height={16}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute z-20 w-16 top-2 -left-3.5 fill-black dark:fill-gray-100 duration-300"
            >
              <path
                d="M12 17.75A5.75 5.75 0 1 1 17.75 12 5.76 5.76 0 0 1 12 17.75Zm0-10A4.25 4.25 0 1 0 16.25 12 4.26 4.26 0 0 0 12 7.75ZM12 5a.76.76 0 0 1-.75-.75v-1.5a.75.75 0 1 1 1.5 0v1.5A.76.76 0 0 1 12 5ZM12 22a.76.76 0 0 1-.75-.75v-1.5a.75.75 0 1 1 1.5 0v1.5A.76.76 0 0 1 12 22ZM21.25 12.75h-1.5a.75.75 0 1 1 0-1.5h1.5a.75.75 0 1 1 0 1.5ZM4.25 12.75h-1.5a.75.75 0 1 1 0-1.5h1.5a.75.75 0 1 1 0 1.5ZM6.5 7.25A.74.74 0 0 1 6 7L4.91 6A.77.77 0 0 1 6 4.91L7 6a.75.75 0 0 1-.5 1.25ZM18.56 19.31a.741.741 0 0 1-.53-.22L17 18a.75.75 0 0 1 1-1l1.09 1a.75.75 0 0 1 0 1.06.742.742 0 0 1-.53.25ZM17.5 7.25A.75.75 0 0 1 17 6l1-1.09A.77.77 0 1 1 19.09 6L18 7a.74.74 0 0 1-.5.25ZM5.44 19.31a.74.74 0 0 1-.53-.22.75.75 0 0 1 0-1.06L6 17a.749.749 0 0 1 1 1l-1 1.09a.74.74 0 0 1-.56.22Z"
              />
            </svg>
            <svg
              width={16}
              height={16}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute z-20 w-16 top-2 left-3.5 stroke-gray-400 dark:stroke-white duration-300"
            >
              <path
                d="M20.867 15.316c.052-.118-.066-.238-.188-.194v0c-3.362 1.215-7.23.498-9.767-2.038-2.525-2.525-3.243-6.367-2.05-9.718v0c.049-.139-.088-.273-.222-.213l-.027.012c-1.855.838-3.506 2.252-4.476 4.032a9.335 9.335 0 0 0 2.255 11.664A9.344 9.344 0 0 0 12.332 21a9.344 9.344 0 0 0 5.23-1.601c1.427-.964 2.557-2.423 3.27-4.003l.035-.08Z"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </label>
    </div>
  )
}
