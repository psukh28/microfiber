/* empty css                                 */
import { e as createComponent, f as createAstro, h as addAttribute, r as renderTemplate, u as unescapeHTML, k as renderComponent, l as renderHead } from '../chunks/astro/server_CgvE6uuo.mjs';
import 'kleur/colors';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { createContext, useState, useContext, useEffect } from 'react';
import { s as safeDisplay, a as validateProduct, v as validateRFQForm } from '../chunks/validation_Cev_PqC_.mjs';
import 'clsx';
export { renderers } from '../renderers.mjs';

const CurrencyContext = createContext();
function CurrencyProvider({ children, initialCurrency = "THB" }) {
  const [currency, setCurrency] = useState(initialCurrency);
  const changeCurrency = (newCurrency) => {
    setCurrency(newCurrency);
  };
  const value = {
    currency,
    changeCurrency
  };
  return /* @__PURE__ */ jsx(CurrencyContext.Provider, { value, children });
}
function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}

const CURRENCIES = [
  { code: "THB", label: "Thai Baht", symbol: "฿" },
  { code: "USD", label: "US Dollar", symbol: "$" },
  { code: "EUR", label: "Euro", symbol: "€" }
];
function CurrencySwitcher({ currency = "THB", onCurrencyChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleCurrencySelect = (currencyCode) => {
    if (onCurrencyChange) {
      onCurrencyChange(currencyCode);
    }
    setIsOpen(false);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setIsOpen(false);
    }
  };
  const currentCurrency = CURRENCIES.find((c) => c.code === currency) || CURRENCIES[0];
  return /* @__PURE__ */ jsxs("div", { className: "relative", onKeyDown: handleKeyDown, children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => setIsOpen(!isOpen),
        className: "flex items-center space-x-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-colors duration-200 min-h-[44px]",
        "aria-expanded": isOpen,
        "aria-haspopup": "true",
        "aria-label": `Current currency: ${currentCurrency.label}. Click to change currency.`,
        id: "currency-button",
        children: [
          /* @__PURE__ */ jsx("span", { className: "text-lg", "aria-hidden": "true", children: currentCurrency.symbol }),
          /* @__PURE__ */ jsx("span", { children: currentCurrency.code }),
          /* @__PURE__ */ jsx(
            "svg",
            {
              className: `w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`,
              fill: "none",
              stroke: "currentColor",
              viewBox: "0 0 24 24",
              "aria-hidden": "true",
              children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" })
            }
          )
        ]
      }
    ),
    isOpen && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "fixed inset-0 z-10",
          onClick: () => setIsOpen(false),
          "aria-hidden": "true"
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg z-20",
          role: "menu",
          "aria-labelledby": "currency-button",
          "aria-orientation": "vertical",
          children: /* @__PURE__ */ jsx("div", { className: "py-1", children: CURRENCIES.map((curr) => /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => handleCurrencySelect(curr.code),
              className: `w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-emerald-500 focus:ring-inset transition-colors duration-150 min-h-[44px] ${curr.code === currency ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300" : "text-gray-700 dark:text-gray-200"}`,
              role: "menuitem",
              "aria-current": curr.code === currency ? "true" : "false",
              "aria-label": `Select ${curr.label} (${curr.code})`,
              children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-lg", "aria-hidden": "true", children: curr.symbol }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("div", { className: "font-medium", children: curr.code }),
                    /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500 dark:text-gray-400", children: curr.label })
                  ] })
                ] }),
                curr.code === currency && /* @__PURE__ */ jsx(
                  "svg",
                  {
                    className: "w-4 h-4 text-emerald-600 dark:text-emerald-400",
                    fill: "currentColor",
                    viewBox: "0 0 20 20",
                    "aria-hidden": "true",
                    children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z", clipRule: "evenodd" })
                  }
                )
              ] })
            },
            curr.code
          )) })
        }
      )
    ] })
  ] });
}

function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (savedTheme === "dark" || !savedTheme && systemPrefersDark) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);
  const toggleDarkMode = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    if (newIsDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };
  return /* @__PURE__ */ jsx(
    "button",
    {
      onClick: toggleDarkMode,
      className: "p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors duration-200 min-h-[44px] min-w-[44px]",
      "aria-label": isDark ? "Switch to light mode" : "Switch to dark mode",
      title: isDark ? "Switch to light mode" : "Switch to dark mode",
      children: isDark ? (
        // Sun icon for light mode
        /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" }) })
      ) : (
        // Moon icon for dark mode
        /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" }) })
      )
    }
  );
}

const navigation = [
  { name: "Products", href: "#products" },
  { name: "Logistics", href: "#logistics" },
  { name: "RFQ", href: "#rfq-form" },
  { name: "FAQ", href: "#faq" }
];
function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currency, changeCurrency } = useCurrency();
  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };
  const scrollToRFQ = () => {
    scrollToSection("#rfq-form");
  };
  return /* @__PURE__ */ jsx("header", { className: "sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-blue-100 dark:border-blue-800/50", role: "banner", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-2 sm:px-4 xl:px-6 2xl:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between h-14 sm:h-16", children: [
      /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 flex items-center", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsx("div", { className: "w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-white", fill: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8 14H9v-2h2v2zm0-4H9V7h2v6zm6 4h-2v-2h2v2zm0-4h-2V7h2v6z" }) }) }),
        /* @__PURE__ */ jsx("h1", { className: "text-lg sm:text-xl xl:text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent", children: /* @__PURE__ */ jsxs("a", { href: "#", className: "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 rounded", "aria-label": "Driver's Choice - Home", children: [
          /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "Driver's Choice" }),
          /* @__PURE__ */ jsx("span", { className: "sm:hidden", children: "Driver's Choice" })
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsx("nav", { className: "hidden md:flex items-center space-x-1 lg:space-x-2", role: "navigation", "aria-label": "Main navigation", children: navigation.map((item) => /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => scrollToSection(item.href),
          className: "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus-visible:text-blue-600 dark:focus-visible:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 focus-visible:bg-blue-50 dark:focus-visible:bg-blue-900/20 px-4 py-2 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 rounded-lg min-h-[44px] relative group",
          "aria-label": `Navigate to ${item.name} section`,
          children: [
            item.name,
            /* @__PURE__ */ jsx("span", { className: "absolute bottom-0 left-1/2 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-200 group-hover:w-full group-hover:left-0 group-focus-visible:w-full group-focus-visible:left-0" })
          ]
        },
        item.name
      )) }),
      /* @__PURE__ */ jsxs("div", { className: "hidden md:flex items-center space-x-2 lg:space-x-3 xl:space-x-4", children: [
        /* @__PURE__ */ jsx(DarkModeToggle, {}),
        /* @__PURE__ */ jsx(
          CurrencySwitcher,
          {
            currency,
            onCurrencyChange: changeCurrency
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: scrollToRFQ,
            className: "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus-visible:from-blue-700 focus-visible:to-blue-800 text-white px-4 lg:px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 min-h-[44px] shadow-lg hover:shadow-xl transform hover:scale-105 focus-visible:scale-105",
            "aria-label": "Get clearance pricing - navigate to quote form",
            children: [
              /* @__PURE__ */ jsxs("span", { className: "hidden lg:inline flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M7 4V2C7 1.45 7.45 1 8 1S9 1.55 9 2V4H15V2C15 1.45 15.45 1 16 1S17 1.55 17 2V4H20C21.1 4 22 4.9 22 6V20C22 21.1 21.1 22 20 22H4C2.9 22 2 21.1 2 20V6C2 4.9 2.9 4 4 4H7ZM20 8H4V20H20V8ZM12 17L7 12L8.41 10.59L11 13.17L15.59 8.58L17 10L12 17Z" }) }),
                "Get Quote"
              ] }),
              /* @__PURE__ */ jsx("span", { className: "lg:hidden", children: "Quote" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "md:hidden flex items-center space-x-1 sm:space-x-2", children: [
        /* @__PURE__ */ jsx(DarkModeToggle, {}),
        /* @__PURE__ */ jsx(
          CurrencySwitcher,
          {
            currency,
            onCurrencyChange: changeCurrency
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setMobileMenuOpen(!mobileMenuOpen),
            className: "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus-visible:text-blue-600 dark:focus-visible:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 rounded-lg p-2 min-h-[44px] min-w-[44px] transition-all duration-200",
            "aria-expanded": mobileMenuOpen,
            "aria-controls": "mobile-menu",
            "aria-label": mobileMenuOpen ? "Close main menu" : "Open main menu",
            children: [
              /* @__PURE__ */ jsxs("span", { className: "sr-only", children: [
                mobileMenuOpen ? "Close" : "Open",
                " main menu"
              ] }),
              !mobileMenuOpen ? /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6h16M4 12h16M4 18h16" }) }) : /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) })
            ]
          }
        )
      ] })
    ] }),
    mobileMenuOpen && /* @__PURE__ */ jsx("div", { id: "mobile-menu", className: "md:hidden border-t border-blue-100 dark:border-blue-800/50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md", role: "navigation", "aria-label": "Mobile navigation", children: /* @__PURE__ */ jsxs("div", { className: "px-2 pt-2 pb-3 space-y-1", children: [
      navigation.map((item) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => scrollToSection(item.href),
          className: "block w-full text-left px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus-visible:text-blue-600 dark:focus-visible:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 focus:bg-blue-50 dark:focus:bg-blue-900/20 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset min-h-[44px]",
          "aria-label": `Navigate to ${item.name} section`,
          children: item.name
        },
        item.name
      )),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: scrollToRFQ,
          className: "block w-full text-left mt-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus-visible:from-blue-700 focus-visible:to-blue-800 text-white px-4 py-3 rounded-lg text-base font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset min-h-[44px] shadow-lg",
          "aria-label": "Get clearance pricing - navigate to quote form",
          children: /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M7 4V2C7 1.45 7.45 1 8 1S9 1.55 9 2V4H15V2C15 1.45 15.45 1 16 1S17 1.55 17 2V4H20C21.1 4 22 4.9 22 6V20C22 21.1 21.1 22 20 22H4C2.9 22 2 21.1 2 20V6C2 4.9 2.9 4 4 4H7ZM20 8H4V20H20V8ZM12 17L7 12L8.41 10.59L11 13.17L15.59 8.58L17 10L12 17Z" }) }),
            "Get Clearance Pricing"
          ] })
        }
      )
    ] }) })
  ] }) });
}

function HeroSection() {
  const scrollToRFQ = () => {
    const element = document.querySelector("#rfq-form");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  const downloadCatalog = () => {
    const link = document.createElement("a");
    link.href = "/catalog/microfiber-clearance-catalog.pdf";
    link.download = "Drivers-Choice-Microfiber-Clearance-Catalog.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return /* @__PURE__ */ jsxs(
    "section",
    {
      className: "bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white relative overflow-hidden",
      role: "banner",
      "aria-labelledby": "hero-heading",
      children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-5", "aria-hidden": "true", children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0", style: {
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20h40v40H20V20zm10 10v20h20V30H30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        } }) }),
        /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 overflow-hidden pointer-events-none", "aria-hidden": "true", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-20 left-10 opacity-15 animate-pulse", children: /* @__PURE__ */ jsxs("svg", { className: "w-16 h-16 text-white", fill: "currentColor", viewBox: "0 0 100 100", children: [
            /* @__PURE__ */ jsx("path", { d: "M25 30c0-8 6-15 15-15h20c9 0 15 7 15 15v25c0 12-8 20-20 20h-10c-12 0-20-8-20-20V30z" }),
            /* @__PURE__ */ jsx("circle", { cx: "35", cy: "40", r: "2", opacity: "0.6" }),
            /* @__PURE__ */ jsx("circle", { cx: "45", cy: "35", r: "2", opacity: "0.6" }),
            /* @__PURE__ */ jsx("circle", { cx: "55", cy: "42", r: "2", opacity: "0.6" }),
            /* @__PURE__ */ jsx("circle", { cx: "40", cy: "50", r: "2", opacity: "0.6" }),
            /* @__PURE__ */ jsx("circle", { cx: "50", cy: "52", r: "2", opacity: "0.6" })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "absolute top-32 right-16 opacity-15 animate-pulse delay-1000", children: /* @__PURE__ */ jsxs("svg", { className: "w-14 h-14 text-white", fill: "currentColor", viewBox: "0 0 100 100", children: [
            /* @__PURE__ */ jsx("rect", { x: "20", y: "25", width: "60", height: "50", rx: "4" }),
            /* @__PURE__ */ jsx("line", { x1: "30", y1: "35", x2: "70", y2: "35", stroke: "currentColor", strokeWidth: "1", opacity: "0.4" }),
            /* @__PURE__ */ jsx("line", { x1: "30", y1: "45", x2: "70", y2: "45", stroke: "currentColor", strokeWidth: "1", opacity: "0.4" }),
            /* @__PURE__ */ jsx("line", { x1: "30", y1: "55", x2: "70", y2: "55", stroke: "currentColor", strokeWidth: "1", opacity: "0.4" }),
            /* @__PURE__ */ jsx("line", { x1: "30", y1: "65", x2: "70", y2: "65", stroke: "currentColor", strokeWidth: "1", opacity: "0.4" })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "absolute bottom-20 left-20 opacity-15 animate-pulse delay-2000", children: /* @__PURE__ */ jsxs("svg", { className: "w-12 h-12 text-white", fill: "currentColor", viewBox: "0 0 100 100", children: [
            /* @__PURE__ */ jsx("circle", { cx: "50", cy: "50", r: "25", fill: "none", stroke: "currentColor", strokeWidth: "8" }),
            /* @__PURE__ */ jsx("circle", { cx: "50", cy: "50", r: "12", fill: "currentColor", opacity: "0.3" }),
            /* @__PURE__ */ jsx("circle", { cx: "35", cy: "35", r: "3", opacity: "0.6" }),
            /* @__PURE__ */ jsx("circle", { cx: "65", cy: "35", r: "3", opacity: "0.6" }),
            /* @__PURE__ */ jsx("circle", { cx: "35", cy: "65", r: "3", opacity: "0.6" }),
            /* @__PURE__ */ jsx("circle", { cx: "65", cy: "65", r: "3", opacity: "0.6" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "container mx-auto px-2 sm:px-4 xl:px-6 2xl:px-8 py-12 sm:py-16 lg:py-20 xl:py-24 relative", children: /* @__PURE__ */ jsxs("div", { className: "text-center max-w-xs sm:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto", children: [
          /* @__PURE__ */ jsxs("h1", { id: "hero-heading", className: "text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight", children: [
            /* @__PURE__ */ jsx("span", { className: "block", children: "Microfiber Stock" }),
            /* @__PURE__ */ jsx("span", { className: "block text-yellow-300", children: "Clearance Sale" })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 opacity-90 leading-relaxed px-2 sm:px-0", children: [
            "Practical cleaning solutions for automotive detailing & household use.",
            /* @__PURE__ */ jsx("br", { className: "hidden sm:block" }),
            /* @__PURE__ */ jsx("span", { className: "text-yellow-200 font-semibold", children: "Unbeatable bulk pricing • 1M+ units in stock • Ready to ship" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 px-2 sm:px-0", role: "list", "aria-label": "Product categories", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-white/20 backdrop-blur-sm px-3 sm:px-4 lg:px-5 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-medium border border-white/30 flex items-center gap-2", role: "listitem", children: [
              /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-blue-200", fill: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8 14H9v-2h2v2zm0-4H9V7h2v6zm6 4h-2v-2h2v2zm0-4h-2V7h2v6z" }) }),
              /* @__PURE__ */ jsx("span", { className: "hidden xs:inline", children: "Car Wash Mitts" }),
              /* @__PURE__ */ jsx("span", { className: "xs:hidden", children: "Car Mitts" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white/20 backdrop-blur-sm px-3 sm:px-4 lg:px-5 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-medium border border-white/30 flex items-center gap-2", role: "listitem", children: [
              /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-green-200", fill: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" }) }),
              /* @__PURE__ */ jsx("span", { className: "hidden xs:inline", children: "Cleaning Towels" }),
              /* @__PURE__ */ jsx("span", { className: "xs:hidden", children: "Towels" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white/20 backdrop-blur-sm px-3 sm:px-4 lg:px-5 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-medium border border-white/30 flex items-center gap-2", role: "listitem", children: [
              /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-yellow-200", fill: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" }) }),
              /* @__PURE__ */ jsx("span", { className: "hidden xs:inline", children: "Steering Covers" }),
              /* @__PURE__ */ jsx("span", { className: "xs:hidden", children: "Covers" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-2 sm:px-0", children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: scrollToRFQ,
                className: "w-full sm:w-auto bg-yellow-400 text-blue-900 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:bg-yellow-300 focus-visible:bg-yellow-300 transition-all duration-200 transform hover:scale-105 focus-visible:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-300/50 shadow-xl min-h-[48px] sm:min-h-[56px] flex items-center justify-center gap-2",
                "aria-label": "Get clearance pricing - navigate to quote request form",
                children: [
                  /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M7 4V2C7 1.45 7.45 1 8 1S9 1.55 9 2V4H15V2C15 1.45 15.45 1 16 1S17 1.55 17 2V4H20C21.1 4 22 4.9 22 6V20C22 21.1 21.1 22 20 22H4C2.9 22 2 21.1 2 20V6C2 4.9 2.9 4 4 4H7ZM20 8H4V20H20V8ZM12 17L7 12L8.41 10.59L11 13.17L15.59 8.58L17 10L12 17Z" }) }),
                  "Get Bulk Quote Now"
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: downloadCatalog,
                className: "w-full sm:w-auto border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-white/10 focus-visible:bg-white/10 transition-all duration-200 transform hover:scale-105 focus-visible:scale-105 focus:outline-none focus:ring-4 focus:ring-white/30 backdrop-blur-sm min-h-[48px] sm:min-h-[56px]",
                "aria-label": "Download product catalog as PDF",
                children: /* @__PURE__ */ jsxs("span", { className: "flex items-center justify-center space-x-2", children: [
                  /* @__PURE__ */ jsx("svg", { className: "w-4 sm:w-5 h-4 sm:h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }) }),
                  /* @__PURE__ */ jsx("span", { className: "hidden xs:inline", children: "Product Catalog" }),
                  /* @__PURE__ */ jsx("span", { className: "xs:hidden", children: "Catalog" })
                ] })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/20", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm opacity-75 mb-3 sm:mb-4", children: "Ready for immediate shipment worldwide" }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-center items-center gap-4 sm:gap-6 lg:gap-8 opacity-70", role: "list", "aria-label": "Quality certifications and capabilities", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 text-xs font-medium", role: "listitem", children: [
                /* @__PURE__ */ jsx("svg", { className: "w-3 h-3", fill: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" }) }),
                "Quality Value"
              ] }),
              /* @__PURE__ */ jsx("div", { className: "w-1 h-1 bg-white rounded-full hidden sm:block", "aria-hidden": "true" }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 text-xs font-medium", role: "listitem", children: [
                /* @__PURE__ */ jsx("svg", { className: "w-3 h-3", fill: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
                "ISO Certified"
              ] }),
              /* @__PURE__ */ jsx("div", { className: "w-1 h-1 bg-white rounded-full hidden sm:block", "aria-hidden": "true" }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 text-xs font-medium", role: "listitem", children: [
                /* @__PURE__ */ jsx("svg", { className: "w-3 h-3", fill: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
                "Global Shipping"
              ] }),
              /* @__PURE__ */ jsx("div", { className: "w-1 h-1 bg-white rounded-full hidden sm:block", "aria-hidden": "true" }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 text-xs font-medium", role: "listitem", children: [
                /* @__PURE__ */ jsx("svg", { className: "w-3 h-3", fill: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M13 10V3L4 14h7v7l9-11h-7z" }) }),
                "Fast Delivery"
              ] })
            ] })
          ] })
        ] }) })
      ]
    }
  );
}

const features = [
  {
    title: "1,000,000+ Units Ready",
    description: "Massive inventory available for immediate shipment. No waiting, no delays.",
    icon: /* @__PURE__ */ jsx("svg", { className: "w-8 h-8", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" }) })
  },
  {
    title: "Factory-Direct Pricing",
    description: "Skip the middleman. Get wholesale prices directly from our manufacturing facility.",
    icon: /* @__PURE__ */ jsx("svg", { className: "w-8 h-8", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" }) })
  },
  {
    title: "Retail-Ready Packaging",
    description: "Professional packaging with display strips and retail-friendly presentation.",
    icon: /* @__PURE__ */ jsx("svg", { className: "w-8 h-8", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" }) })
  },
  {
    title: "Global Logistics",
    description: "Worldwide shipping with flexible Incoterms. FOB, CIF, DDP options available.",
    icon: /* @__PURE__ */ jsx("svg", { className: "w-8 h-8", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) })
  }
];
function FeatureHighlights() {
  return /* @__PURE__ */ jsx("section", { className: "py-12 sm:py-16 lg:py-20 bg-gray-50 dark:bg-gray-900", "aria-labelledby": "features-heading", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-2 sm:px-4 xl:px-6 2xl:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-8 sm:mb-12", children: [
      /* @__PURE__ */ jsx("h2", { id: "features-heading", className: "text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4", children: "Why Choose Our Clearance Stock?" }),
      /* @__PURE__ */ jsx("p", { className: "text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-xs sm:max-w-2xl mx-auto px-2 sm:px-0", children: "Take advantage of this unique opportunity to secure durable, versatile microfiber goods for everyday cleaning and automotive use at unprecedented prices." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8", role: "list", "aria-label": "Key features and benefits", children: features.map((feature, index) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg focus-within:shadow-lg transition-shadow duration-300 text-center",
        role: "listitem",
        children: [
          /* @__PURE__ */ jsx("div", { className: "text-emerald-600 dark:text-emerald-400 mb-3 sm:mb-4 flex justify-center", "aria-hidden": "true", children: feature.icon }),
          /* @__PURE__ */ jsx("h3", { className: "text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3", children: feature.title }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 dark:text-gray-300 text-xs sm:text-sm leading-relaxed", children: feature.description })
        ]
      },
      index
    )) })
  ] }) });
}

function ManufacturingVideo() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const videoId = "mpX4w7LjzLo";
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const handlePlayVideo = () => {
    setShowVideo(true);
  };
  return /* @__PURE__ */ jsx("section", { className: "py-16 bg-gradient-to-br from-blue-50 to-gray-100 dark:from-gray-800 dark:to-gray-900", "aria-labelledby": "manufacturing-heading", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full text-sm font-semibold mb-4", children: [
        /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" }) }),
        "QUALITY MANUFACTURING"
      ] }),
      /* @__PURE__ */ jsx("h2", { id: "manufacturing-heading", className: "text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4", children: "See Our Production Process" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto", children: "Watch our advanced manufacturing equipment in action, producing the high-quality microfiber cleaning towels you're getting at clearance prices." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "aspect-video relative", children: !showVideo ? (
        /* Video Thumbnail with Play Button */
        /* @__PURE__ */ jsxs("div", { className: "relative w-full h-full group cursor-pointer", onClick: handlePlayVideo, children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: thumbnailUrl,
              alt: "Manufacturing process of microfiber cleaning towels",
              className: "w-full h-full object-cover transition-transform duration-300 group-hover:scale-105",
              onLoad: () => setIsLoaded(true)
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "bg-red-600 hover:bg-red-700 text-white rounded-full p-6 shadow-2xl transform group-hover:scale-110 transition-all duration-300", children: /* @__PURE__ */ jsx("svg", { className: "w-8 h-8 ml-1", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M8 5v14l11-7z" }) }) }) }),
          /* @__PURE__ */ jsxs("div", { className: "absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded text-sm font-semibold flex items-center gap-1", children: [
            /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" }) }),
            "YouTube"
          ] }),
          !isLoaded && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "text-gray-500 dark:text-gray-400", children: "Loading video..." }) })
        ] })
      ) : (
        /* Embedded YouTube Video */
        /* @__PURE__ */ jsx(
          "iframe",
          {
            src: `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`,
            title: "Microfiber Manufacturing Process - Driver's Choice",
            className: "w-full h-full",
            frameBorder: "0",
            allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
            allowFullScreen: true
          }
        )
      ) }),
      /* @__PURE__ */ jsx("div", { className: "p-6 bg-gradient-to-r from-blue-50 to-gray-50 dark:from-gray-700 dark:to-gray-800", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white mb-2", children: "Advanced Manufacturing Equipment" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 dark:text-gray-300 text-sm", children: "Our state-of-the-art production line ensures consistent quality and efficiency in every microfiber towel we manufacture." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400", children: [
          /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" }) }),
          "Verified Production"
        ] })
      ] }) })
    ] })
  ] }) }) });
}

// Currency conversion constants
const EXCHANGE_RATES = {
  THB: 1,
  USD: 0.027,
  EUR: 0.025
};

const CURRENCY_SYMBOLS = {
  THB: '฿',
  USD: '$',
  EUR: '€'
};

/**
 * Convert price from THB to target currency
 * @param {number} priceThb - Price in Thai Baht
 * @param {string} targetCurrency - Target currency code (THB, USD, EUR)
 * @returns {number} Converted price
 */
function convertCurrency(priceThb, targetCurrency = 'THB') {
  if (!priceThb || typeof priceThb !== 'number') {
    return 0;
  }
  
  const rate = EXCHANGE_RATES[targetCurrency];
  if (!rate) {
    throw new Error(`Unsupported currency: ${targetCurrency}`);
  }
  
  return priceThb * rate;
}

/**
 * Format price with currency symbol and appropriate decimal places
 * @param {number} price - Price to format
 * @param {string} currency - Currency code (THB, USD, EUR)
 * @returns {string} Formatted price string
 */
function formatPrice(price, currency = 'THB') {
  if (!price || typeof price !== 'number') {
    return 'Request bulk quote';
  }
  
  const symbol = CURRENCY_SYMBOLS[currency];
  if (!symbol) {
    throw new Error(`Unsupported currency: ${currency}`);
  }
  
  // THB typically doesn't use decimals, USD/EUR use 2 decimals
  const decimals = currency === 'THB' ? 0 : 2;
  
  return `${symbol}${price.toFixed(decimals)}`;
}

/**
 * Convert and format price in one step
 * @param {number} priceThb - Price in Thai Baht
 * @param {string} targetCurrency - Target currency code
 * @returns {string} Formatted converted price
 */
function convertAndFormatPrice(priceThb, targetCurrency = 'THB') {
  if (!priceThb || typeof priceThb !== 'number') {
    return 'Request bulk quote';
  }
  
  const convertedPrice = convertCurrency(priceThb, targetCurrency);
  return formatPrice(convertedPrice, targetCurrency);
}

function ProductCard({ product, onRequestQuote }) {
  const [imageError, setImageError] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [availableImages, setAvailableImages] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const { currency } = useCurrency();
  const cardId = `product-${product.sku || product.name?.replace(/\s+/g, "-").toLowerCase() || "unknown"}-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
  const handleRequestQuote = () => {
    if (onRequestQuote) {
      onRequestQuote(product);
    }
    const rfqSection = document.getElementById("rfq-form");
    if (rfqSection) {
      rfqSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  const priceDisplay = product.unit_price_thb_no_vat ? convertAndFormatPrice(product.unit_price_thb_no_vat, currency) : "Request bulk quote";
  const generateImagePaths = (productName) => {
    const baseName = productName?.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
    const images = [];
    images.push(`/images/products/${baseName}.jpg`);
    const baseNameWithoutSet = baseName.replace(/-set$/, "");
    if (baseNameWithoutSet !== baseName) {
      images.push(`/images/products/${baseNameWithoutSet}.jpg`);
    }
    if (product.colors && product.colors.length > 0) {
      product.colors.forEach((color) => {
        const colorName = color.toLowerCase().replace(/[^a-z0-9]/g, "");
        images.push(`/images/products/${baseName}-${colorName}.jpg`);
        if (baseNameWithoutSet !== baseName) {
          images.push(`/images/products/${baseNameWithoutSet}-${colorName}.jpg`);
        }
      });
    }
    images.push(`/images/products/${baseName}-bulk.jpg`);
    images.push(`/images/products/${baseName}-strip.jpg`);
    images.push(`/images/products/${baseName}-multi.jpg`);
    if (baseNameWithoutSet !== baseName) {
      images.push(`/images/products/${baseNameWithoutSet}-bulk.jpg`);
      images.push(`/images/products/${baseNameWithoutSet}-strip.jpg`);
      images.push(`/images/products/${baseNameWithoutSet}-multi.jpg`);
    }
    images.push(`/images/products/${baseName}-multistrip.jpg`);
    images.push(`/images/products/${baseName}-multiple.jpg`);
    images.push(`/images/products/${baseName}-blackvelour.jpg`);
    return images;
  };
  useEffect(() => {
    const checkImages = async () => {
      const possibleImages = generateImagePaths(product.name);
      const existingImages = [];
      for (const imagePath of possibleImages) {
        try {
          const response = await fetch(imagePath, { method: "HEAD" });
          if (response.ok) {
            existingImages.push(imagePath);
          }
        } catch (error) {
        }
      }
      setAvailableImages(existingImages.length > 0 ? existingImages : [possibleImages[0]]);
      setImagesLoaded(true);
    };
    checkImages();
  }, [product.name]);
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % availableImages.length);
  };
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + availableImages.length) % availableImages.length);
  };
  return /* @__PURE__ */ jsxs("article", { className: "group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col relative rounded-lg", role: "article", "aria-labelledby": `product-title-${product.name?.replace(/\s+/g, "-").toLowerCase()}`, children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10", children: "CLEARANCE" }),
    /* @__PURE__ */ jsx("div", { className: "relative aspect-[4/3] bg-gray-50 dark:bg-gray-700 overflow-hidden", children: imagesLoaded && availableImages.length > 0 && !imageError ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: availableImages[currentImageIndex],
          alt: `${product.name} - ${product.summary || "Microfiber product"} - ${currentImageIndex + 1} of ${availableImages.length}`,
          className: "w-full h-full object-contain group-hover:scale-105 transition-transform duration-300",
          onError: () => {
            if (currentImageIndex === 0) {
              setImageError(true);
            } else {
              setCurrentImageIndex(0);
            }
          },
          loading: "lazy"
        }
      ),
      availableImages.length > 1 && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: (e) => {
              e.preventDefault();
              e.stopPropagation();
              prevImage();
            },
            className: "absolute left-1 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 hover:text-gray-900 rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 focus:opacity-100 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm hover:shadow-md backdrop-blur-sm",
            "aria-label": "Previous image",
            children: /* @__PURE__ */ jsx("svg", { className: "w-3 h-3", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", strokeWidth: 2.5, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15 19l-7-7 7-7" }) })
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: (e) => {
              e.preventDefault();
              e.stopPropagation();
              nextImage();
            },
            className: "absolute right-1 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 hover:text-gray-900 rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 focus:opacity-100 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm hover:shadow-md backdrop-blur-sm",
            "aria-label": "Next image",
            children: /* @__PURE__ */ jsx("svg", { className: "w-3 h-3", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", strokeWidth: 2.5, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 5l7 7-7 7" }) })
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "absolute bottom-0.5 left-1/2 -translate-x-1/2 flex gap-px", children: availableImages.map((_, index) => /* @__PURE__ */ jsx(
          "button",
          {
            onClick: (e) => {
              e.preventDefault();
              e.stopPropagation();
              setCurrentImageIndex(index);
            },
            className: `w-0.2 h-0.2 rounded-full cursor-pointer transition-opacity duration-200 ${index === currentImageIndex ? "bg-gray-800 opacity-90" : "bg-gray-600 opacity-50 hover:opacity-70"}`,
            "aria-label": `Go to image ${index + 1}`
          },
          index
        )) }),
        /* @__PURE__ */ jsxs("div", { className: "absolute top-1.5 right-1.5 bg-black/40 text-white text-xs px-1.5 py-0.5 rounded text-[10px] font-medium backdrop-blur-sm", children: [
          currentImageIndex + 1,
          "/",
          availableImages.length
        ] })
      ] })
    ] }) : /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center h-full text-gray-400 dark:text-gray-500", role: "img", "aria-label": `Product placeholder for ${product.name}`, children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("svg", { className: "w-20 h-20 mx-auto mb-3 opacity-50", fill: "currentColor", viewBox: "0 0 20 20", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z", clipRule: "evenodd" }) }),
      /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "Product Photo" })
    ] }) }) }),
    /* @__PURE__ */ jsxs("div", { className: "p-4 flex flex-col flex-1", children: [
      /* @__PURE__ */ jsx("div", { className: "mb-3", children: /* @__PURE__ */ jsx("h3", { id: `product-title-${product.name?.replace(/\s+/g, "-").toLowerCase()}`, className: "font-bold text-lg text-gray-900 dark:text-white leading-tight min-h-[3.5rem] flex items-start uppercase tracking-wide", children: product.name }) }),
      /* @__PURE__ */ jsxs("div", { className: "mb-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 p-3 border-l-4 border-blue-500 shadow-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-x-4 gap-y-1 text-xs font-mono", children: [
          product.size && /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { className: "text-gray-500", children: "SIZE:" }),
            " ",
            /* @__PURE__ */ jsx("span", { className: "font-bold", children: product.size.split("\n")[0] })
          ] }),
          product.gsm && /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { className: "text-gray-500", children: "GSM:" }),
            " ",
            /* @__PURE__ */ jsx("span", { className: "font-bold", children: product.gsm })
          ] }),
          product.fabric && /* @__PURE__ */ jsxs("div", { className: "col-span-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-gray-500", children: "MATERIAL:" }),
            " ",
            /* @__PURE__ */ jsx("span", { className: "font-bold", children: product.fabric })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-2 text-xs text-gray-600 dark:text-gray-300 italic", children: product.summary })
      ] }),
      (product.colors?.length > 0 || product.packing || product.carton_dimensions) && /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: (e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowDetails(!showDetails);
            },
            className: "flex items-center justify-between w-full text-left text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 rounded p-2 -m-2 bg-blue-50 dark:bg-blue-900/20",
            "aria-expanded": showDetails,
            "aria-controls": `details-${cardId}`,
            children: [
              /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v10z" }) }),
                "SHIPPING & VARIANTS"
              ] }),
              /* @__PURE__ */ jsx(
                "svg",
                {
                  className: `w-4 h-4 transition-transform duration-200 ${showDetails ? "rotate-180" : ""}`,
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  "aria-hidden": "true",
                  children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" })
                }
              )
            ]
          }
        ),
        showDetails && /* @__PURE__ */ jsxs(
          "div",
          {
            id: `details-${cardId}`,
            className: "mt-3 space-y-3 text-sm animate-in slide-in-from-top-2 duration-200",
            children: [
              product.colors && product.colors.length > 0 && /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-700", children: [
                /* @__PURE__ */ jsxs("h4", { className: "font-semibold text-blue-800 dark:text-blue-200 text-xs uppercase tracking-wide mb-2 flex items-center gap-1", children: [
                  /* @__PURE__ */ jsx("svg", { className: "w-3 h-3", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" }) }),
                  "Available Colors"
                ] }),
                /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1", children: product.colors.map((color, index) => /* @__PURE__ */ jsx("span", { className: "bg-white dark:bg-gray-800 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-xs font-medium border border-blue-200 dark:border-blue-600", children: color }, index)) })
              ] }),
              (product.packing || product.carton_dimensions) && /* @__PURE__ */ jsxs("div", { className: "bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3 border border-orange-200 dark:border-orange-700", children: [
                /* @__PURE__ */ jsxs("h4", { className: "font-semibold text-orange-800 dark:text-orange-200 text-xs uppercase tracking-wide mb-2 flex items-center gap-1", children: [
                  /* @__PURE__ */ jsx("svg", { className: "w-3 h-3", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" }) }),
                  "Packaging Details"
                ] }),
                product.packing && /* @__PURE__ */ jsxs("div", { className: "mb-1", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-orange-700 dark:text-orange-300 text-xs font-medium", children: "Pack: " }),
                  /* @__PURE__ */ jsx("span", { className: "text-orange-900 dark:text-orange-100 text-xs", children: safeDisplay(product.packing) })
                ] }),
                product.carton_dimensions && /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("span", { className: "text-orange-700 dark:text-orange-300 text-xs font-medium", children: "Carton: " }),
                  /* @__PURE__ */ jsx("span", { className: "text-orange-900 dark:text-orange-100 text-xs", children: safeDisplay(product.carton_dimensions) })
                ] })
              ] })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "border-t-2 border-blue-200 dark:border-blue-600 pt-4 mt-auto bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700 dark:to-blue-900/20 -mx-4 -mb-4 px-4 pb-4 relative overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-5", "aria-hidden": "true", children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0", style: {
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M0 0h20v20H0V0zm10 10h10v10H10V10z'/%3E%3C/g%3E%3C/svg%3E")`
        } }) }),
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxs("div", { className: "text-xs text-gray-500 dark:text-gray-400 font-mono mb-1 flex items-center gap-1", children: [
                /* @__PURE__ */ jsx("svg", { className: "w-3 h-3", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M7 4V2C7 1.45 7.45 1 8 1S9 1.55 9 2V4H15V2C15 1.45 15.45 1 16 1S17 1.55 17 2V4H20C21.1 4 22 4.9 22 6V20C22 21.1 21.1 22 20 22H4C2.9 22 2 21.1 2 20V6C2 4.9 2.9 4 4 4H7Z" }) }),
                "PRICE (EX VAT)"
              ] }),
              /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1", "aria-label": `Price: ${priceDisplay}`, children: priceDisplay }),
              product.unit_price_thb_no_vat && /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500 dark:text-gray-400", children: "per unit" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "text-right bg-green-100 dark:bg-green-900/30 px-3 py-2 rounded-lg border border-green-200 dark:border-green-700", children: [
              /* @__PURE__ */ jsx("div", { className: "text-xs text-green-700 dark:text-green-300 mb-1 font-semibold", children: "STOCK STATUS" }),
              /* @__PURE__ */ jsxs("div", { className: "text-sm font-bold text-green-600 dark:text-green-400 flex items-center gap-1", children: [
                /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
                "READY TO SHIP"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: (e) => {
                e.preventDefault();
                e.stopPropagation();
                handleRequestQuote();
              },
              className: "w-full bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 focus-visible:from-blue-700 focus-visible:via-blue-800 focus-visible:to-blue-900 text-white px-4 py-3 font-bold text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 shadow-lg hover:shadow-xl transform hover:scale-[1.02] focus-visible:scale-[1.02] min-h-[48px] flex items-center justify-center gap-2 uppercase tracking-wide border-2 border-blue-800 dark:border-blue-500 relative overflow-hidden",
              "aria-label": `Request bulk quote for ${product.name}`,
              children: [
                /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" }),
                /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 relative z-10", fill: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v10z" }) }),
                /* @__PURE__ */ jsx("span", { className: "relative z-10", children: "REQUEST BULK QUOTE" })
              ]
            }
          )
        ] })
      ] })
    ] })
  ] });
}

function ProductGrid({ products = [], onRequestQuote }) {
  if (!Array.isArray(products) || products.length === 0) {
    return /* @__PURE__ */ jsxs("div", { className: "text-center py-12", role: "status", "aria-live": "polite", children: [
      /* @__PURE__ */ jsx("div", { className: "text-gray-400 dark:text-gray-500 mb-4", "aria-hidden": "true", children: /* @__PURE__ */ jsx("svg", { className: "w-16 h-16 mx-auto", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M10 2L3 7v11a2 2 0 002 2h10a2 2 0 002-2V7l-7-5zM10 12a3 3 0 100-6 3 3 0 000 6z", clipRule: "evenodd" }) }) }),
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900 dark:text-white mb-2", children: "No products available" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-500 dark:text-gray-400", children: "Check back later for clearance items." })
    ] });
  }
  const validProducts = products.map((product) => {
    try {
      return validateProduct(product);
    } catch (error) {
      console.warn("Invalid product data:", error);
      return null;
    }
  }).filter(Boolean);
  if (validProducts.length === 0) {
    return /* @__PURE__ */ jsxs("div", { className: "text-center py-12", role: "status", "aria-live": "polite", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900 dark:text-white mb-2", children: "No valid products found" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-500 dark:text-gray-400", children: "Please check the product data." })
    ] });
  }
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 items-start",
      role: "list",
      "aria-label": `${validProducts.length} clearance products available`,
      children: validProducts.map((product, index) => /* @__PURE__ */ jsx(
        ProductCard,
        {
          product,
          onRequestQuote
        },
        product.sku || product.name || `product-${index}`
      ))
    }
  );
}

const logisticsInfo = [
  {
    title: "Incoterms",
    content: "FOB Bangkok, CIF, DDP available",
    description: "Flexible shipping terms to match your import requirements and budget.",
    icon: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" }) })
  },
  {
    title: "Payment Terms",
    content: "30% deposit, 70% before shipment",
    description: "Standard B2B payment terms with T/T wire transfer. LC available for large orders.",
    icon: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" }) })
  },
  {
    title: "Lead Time",
    content: "2-5 days (stock items)",
    description: "Ready inventory ships immediately. Custom packaging may require additional time.",
    icon: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" }) })
  },
  {
    title: "Packaging",
    content: "Export cartons, retail-ready",
    description: "Professional packaging suitable for retail display or warehouse distribution.",
    icon: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" }) })
  },
  {
    title: "Compliance",
    content: "CE, CPSIA, REACH compliant",
    description: "All products meet international safety and quality standards for global markets.",
    icon: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) })
  },
  {
    title: "Samples",
    content: "Free samples available",
    description: "Request product samples to verify quality before placing your order.",
    icon: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2z" }) })
  }
];
function LogisticsSection() {
  return /* @__PURE__ */ jsx("section", { id: "logistics", className: "py-16 bg-white dark:bg-gray-900", "aria-labelledby": "logistics-heading", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
      /* @__PURE__ */ jsx("h2", { id: "logistics-heading", className: "text-3xl font-bold text-gray-900 dark:text-white mb-4", children: "Logistics & Terms" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto", children: "Streamlined processes and flexible terms designed for international B2B buyers. We handle the complexity so you can focus on your business." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", role: "list", "aria-label": "Logistics information and terms", children: logisticsInfo.map((item, index) => /* @__PURE__ */ jsx(
      "div",
      {
        className: "bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md focus-within:shadow-md transition-shadow duration-300",
        role: "listitem",
        children: /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-4", children: [
          /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 text-emerald-600 dark:text-emerald-400 mt-1", "aria-hidden": "true", children: item.icon }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white mb-2", children: item.title }),
            /* @__PURE__ */ jsx("p", { className: "text-emerald-600 dark:text-emerald-400 font-medium mb-2", children: item.content }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600 dark:text-gray-300 text-sm leading-relaxed", children: item.description })
          ] })
        ] })
      },
      index
    )) }),
    /* @__PURE__ */ jsx("div", { className: "mt-12 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-8 border border-emerald-200 dark:border-emerald-800", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-emerald-900 dark:text-emerald-100 mb-4", children: "Need Custom Logistics Solutions?" }),
      /* @__PURE__ */ jsx("p", { className: "text-emerald-800 dark:text-emerald-200 mb-6 max-w-2xl mx-auto", children: "Our logistics team can arrange door-to-door delivery, customs clearance, and special handling for large orders. Contact us to discuss your specific requirements." }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            const rfqSection = document.getElementById("rfq-form");
            if (rfqSection) {
              rfqSection.scrollIntoView({ behavior: "smooth" });
            }
          },
          className: "bg-emerald-600 hover:bg-emerald-700 focus-visible:bg-emerald-700 text-white px-6 py-3 rounded-md font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-emerald-900 min-h-[48px]",
          "aria-label": "Discuss custom logistics solutions - navigate to quote request form",
          children: "Discuss Logistics"
        }
      )
    ] }) })
  ] }) });
}

function WhyClearanceSection() {
  return /* @__PURE__ */ jsx("section", { className: "py-16 bg-gray-50 dark:bg-gray-900", "aria-labelledby": "clearance-heading", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
      /* @__PURE__ */ jsx("h2", { id: "clearance-heading", className: "text-3xl font-bold text-gray-900 dark:text-white mb-4", children: "Factory-Direct Stock Available" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-600 dark:text-gray-300", children: "Special bulk pricing on ready-to-ship microfiber inventory" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700", children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center", children: [
            /* @__PURE__ */ jsx("span", { className: "text-blue-500 mr-2", children: "🏭" }),
            "Factory-Direct Availability"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 dark:text-gray-300 leading-relaxed", children: "We are offering factory-direct microfiber stock at special bulk pricing, ready to ship immediately. As the manufacturer, we can provide exceptional value by eliminating distributor markups on this ready-to-ship inventory." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700", children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center", children: [
            /* @__PURE__ */ jsx("span", { className: "text-green-500 mr-2", children: "⚡" }),
            "Immediate Shipment Ready"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 dark:text-gray-300 leading-relaxed", children: "Over 1 million units are warehoused and ready for immediate shipment. This allows us to offer faster delivery times and better pricing than typical made-to-order production runs." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700", children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center", children: [
            /* @__PURE__ */ jsx("span", { className: "text-green-500 mr-2", children: "✅" }),
            "Quality Assurance"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 dark:text-gray-300 leading-relaxed", children: "These aren't defective or substandard products. Every item has passed our standard quality control processes and meets the same specifications as our regular production. The only difference is the exceptional pricing due to the circumstances." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "lg:text-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/30 dark:to-emerald-800/30 rounded-2xl p-8 border border-emerald-300 dark:border-emerald-700", children: [
          /* @__PURE__ */ jsx("div", { className: "text-6xl mb-4", children: "📦" }),
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-emerald-900 dark:text-emerald-100 mb-4", children: "1,000,000+ Units" }),
          /* @__PURE__ */ jsx("p", { className: "text-emerald-800 dark:text-emerald-200 mb-6", children: "Ready for immediate shipment from our Thailand facility" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-3 text-sm", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center space-x-2 text-emerald-700 dark:text-emerald-300", children: [
              /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z", clipRule: "evenodd" }) }),
              /* @__PURE__ */ jsx("span", { children: "Quality controlled & tested" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center space-x-2 text-emerald-700 dark:text-emerald-300", children: [
              /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z", clipRule: "evenodd" }) }),
              /* @__PURE__ */ jsx("span", { children: "Retail-ready packaging" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center space-x-2 text-emerald-700 dark:text-emerald-300", children: [
              /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z", clipRule: "evenodd" }) }),
              /* @__PURE__ */ jsx("span", { children: "International compliance" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 text-center", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400 italic", children: `"This situation won't last long. Once word gets out, this inventory will move quickly."` }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 dark:text-gray-500 mt-2", children: "— Export Sales Manager" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-12 text-center", children: /* @__PURE__ */ jsxs("div", { className: "bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg p-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-emerald-900 dark:text-emerald-100 mb-2", children: "📈 Limited-Time Bulk Pricing" }),
      /* @__PURE__ */ jsx("p", { className: "text-emerald-800 dark:text-emerald-200 mb-4", children: "Special factory-direct pricing available while inventory lasts. Contact us to discuss volume discounts and secure your allocation." }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            const rfqSection = document.getElementById("rfq-form");
            if (rfqSection) {
              rfqSection.scrollIntoView({ behavior: "smooth" });
            }
          },
          className: "bg-emerald-600 hover:bg-emerald-700 focus-visible:bg-emerald-700 text-white px-6 py-3 rounded-md font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-emerald-900 min-h-[48px]",
          "aria-label": "Request bulk pricing - navigate to quote request form",
          children: "Request Bulk Pricing"
        }
      )
    ] }) })
  ] }) }) });
}

const faqs = [
  {
    question: "What's the minimum order quantity for clearance items?",
    answer: "Minimum orders start at 1,000 units per SKU, but we offer better pricing for larger quantities. Container loads (20ft/40ft) receive the best rates. Mixed SKU orders are welcome to help you reach minimum quantities."
  },
  {
    question: "Are these products defective or seconds quality?",
    answer: "No, these are first-quality products that have passed all our standard quality control processes. All items meet the same specifications as our regular production and are ready for immediate shipment from our factory warehouse."
  },
  {
    question: "How quickly can you ship, and what are the payment terms?",
    answer: "Ready stock can ship within 2-5 business days after payment confirmation. Payment terms are 30% deposit with the balance due before shipment via T/T wire transfer. Letter of Credit is available for orders over $50,000 USD."
  },
  {
    question: "Can I get samples before placing a large order?",
    answer: "Yes, we provide free samples for serious buyers. Sample shipping costs apply, but we'll credit this against your first order. Samples typically ship within 24 hours and help you verify quality before committing to larger quantities."
  }
];
function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const handleKeyDown = (event, index) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleFAQ(index);
    }
  };
  return /* @__PURE__ */ jsx("section", { id: "faq", className: "py-16 bg-white dark:bg-gray-900", "aria-labelledby": "faq-heading", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
      /* @__PURE__ */ jsx("h2", { id: "faq-heading", className: "text-3xl font-bold text-gray-900 dark:text-white mb-4", children: "Frequently Asked Questions" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-600 dark:text-gray-300", children: "Common questions about our clearance inventory and ordering process" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space-y-4", role: "list", "aria-label": "Frequently asked questions", children: faqs.map((faq, index) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden",
        role: "listitem",
        children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => toggleFAQ(index),
              onKeyDown: (e) => handleKeyDown(e, index),
              className: "w-full px-6 py-4 text-left focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-inset hover:bg-gray-100 dark:hover:bg-gray-700 focus-visible:bg-gray-100 dark:focus-visible:bg-gray-700 transition-colors duration-200 min-h-[56px]",
              "aria-expanded": openIndex === index,
              "aria-controls": `faq-answer-${index}`,
              id: `faq-question-${index}`,
              children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white pr-4", children: faq.question }),
                /* @__PURE__ */ jsx(
                  "svg",
                  {
                    className: `w-5 h-5 text-gray-500 dark:text-gray-400 transform transition-transform duration-200 flex-shrink-0 ${openIndex === index ? "rotate-180" : ""}`,
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    "aria-hidden": "true",
                    children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" })
                  }
                )
              ] })
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              id: `faq-answer-${index}`,
              role: "region",
              "aria-labelledby": `faq-question-${index}`,
              className: openIndex === index ? "block" : "hidden",
              children: openIndex === index && /* @__PURE__ */ jsx("div", { className: "px-6 pb-4", children: /* @__PURE__ */ jsx("div", { className: "border-t border-gray-200 dark:border-gray-600 pt-4", children: /* @__PURE__ */ jsx("p", { className: "text-gray-600 dark:text-gray-300 leading-relaxed", children: faq.answer }) }) })
            }
          )
        ]
      },
      index
    )) }),
    /* @__PURE__ */ jsx("div", { className: "mt-12 text-center", children: /* @__PURE__ */ jsxs("div", { className: "bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-6 border border-emerald-200 dark:border-emerald-800", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-emerald-900 dark:text-emerald-100 mb-2", children: "Still Have Questions?" }),
      /* @__PURE__ */ jsx("p", { className: "text-emerald-800 dark:text-emerald-200 mb-4", children: "Our export team is standing by to answer your specific questions about products, pricing, logistics, or custom requirements." }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-3 justify-center", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => {
              const rfqSection = document.getElementById("rfq-form");
              if (rfqSection) {
                rfqSection.scrollIntoView({ behavior: "smooth" });
              }
            },
            className: "bg-emerald-600 hover:bg-emerald-700 focus-visible:bg-emerald-700 text-white px-6 py-2 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-emerald-900 min-h-[44px]",
            "aria-label": "Ask a question - navigate to quote request form",
            children: "Ask a Question"
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "mailto:lilsoft@kidskreationsco.com",
            className: "inline-flex items-center justify-center border border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white focus-visible:bg-emerald-600 focus-visible:text-white px-6 py-2 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-emerald-900 min-h-[44px]",
            "aria-label": "Send email directly to export team",
            children: "Email Direct"
          }
        )
      ] })
    ] }) })
  ] }) }) });
}

function RFQForm() {
  const [formData, setFormData] = useState({
    company: "",
    name: "",
    email: "",
    phone: "",
    country: "",
    products: "",
    quantity: "",
    message: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ""
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    const validation = validateRFQForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      setIsSubmitting(false);
      return;
    }
    try {
      const response = await fetch("/api/rfq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          company: "",
          name: "",
          email: "",
          phone: "",
          country: "",
          products: "",
          quantity: "",
          message: ""
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsx("section", { id: "rfq-form", className: "py-12 sm:py-16 lg:py-20 bg-gray-50 dark:bg-gray-900", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-2 sm:px-4 xl:px-6 2xl:px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-xs sm:max-w-2xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-6 sm:mb-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4", children: "Request Clearance Quote" }),
      /* @__PURE__ */ jsx("p", { className: "text-base sm:text-lg text-gray-600 dark:text-gray-300 px-2 sm:px-0", children: "Get factory-direct pricing on our microfiber clearance inventory. Fill out the form below and we'll respond within 24 hours." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 lg:p-8", children: [
      submitStatus === "success" && /* @__PURE__ */ jsx("div", { className: "mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-green-600 dark:text-green-400 mr-2", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z", clipRule: "evenodd" }) }),
        /* @__PURE__ */ jsx("p", { className: "text-green-800 dark:text-green-200 font-medium", children: "Thank you! Your quote request has been submitted successfully. We'll contact you within 24 hours." })
      ] }) }),
      submitStatus === "error" && /* @__PURE__ */ jsx("div", { className: "mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-red-600 dark:text-red-400 mr-2", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z", clipRule: "evenodd" }) }),
        /* @__PURE__ */ jsx("p", { className: "text-red-800 dark:text-red-200 font-medium", children: "There was an error submitting your request. Please try again or contact us directly." })
      ] }) }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, noValidate: true, children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "company", className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Company Name *" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                id: "company",
                name: "company",
                value: formData.company,
                onChange: handleInputChange,
                required: true,
                className: `w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.company ? "border-red-500 dark:border-red-500" : "border-gray-300 dark:border-gray-600"}`,
                placeholder: "Your company name"
              }
            ),
            errors.company && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600 dark:text-red-400", children: errors.company })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "name", className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Contact Name *" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                id: "name",
                name: "name",
                value: formData.name,
                onChange: handleInputChange,
                required: true,
                className: `w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.name ? "border-red-500 dark:border-red-500" : "border-gray-300 dark:border-gray-600"}`,
                placeholder: "Your full name"
              }
            ),
            errors.name && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600 dark:text-red-400", children: errors.name })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Email Address *" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "email",
                id: "email",
                name: "email",
                value: formData.email,
                onChange: handleInputChange,
                required: true,
                className: `w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.email ? "border-red-500 dark:border-red-500" : "border-gray-300 dark:border-gray-600"}`,
                placeholder: "your.email@company.com"
              }
            ),
            errors.email && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600 dark:text-red-400", children: errors.email })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mt-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "phone", className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Phone Number" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "tel",
                id: "phone",
                name: "phone",
                value: formData.phone,
                onChange: handleInputChange,
                className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white",
                placeholder: "+1 (555) 123-4567"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "country", className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Country" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                id: "country",
                name: "country",
                value: formData.country,
                onChange: handleInputChange,
                className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white",
                placeholder: "United States"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mt-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "products", className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Products of Interest" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                id: "products",
                name: "products",
                value: formData.products,
                onChange: handleInputChange,
                className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white",
                placeholder: "Cleaning cloths, wash mitts, etc."
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "quantity", className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Estimated Quantity" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                id: "quantity",
                name: "quantity",
                value: formData.quantity,
                onChange: handleInputChange,
                className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white",
                placeholder: "10,000 units, 1 container, etc."
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "message", className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Additional Message" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              id: "message",
              name: "message",
              rows: 4,
              value: formData.message,
              onChange: handleInputChange,
              className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white",
              placeholder: "Tell us about your requirements, timeline, or any specific questions..."
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            disabled: isSubmitting,
            className: "w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800",
            children: isSubmitting ? /* @__PURE__ */ jsxs("span", { className: "flex items-center justify-center", children: [
              /* @__PURE__ */ jsxs("svg", { className: "animate-spin -ml-1 mr-3 h-5 w-5 text-white", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [
                /* @__PURE__ */ jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
                /* @__PURE__ */ jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })
              ] }),
              "Submitting..."
            ] }) : "Request Quote"
          }
        ) }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm text-gray-500 dark:text-gray-400 text-center", children: "* Required fields. We'll respond within 24 hours with pricing and availability." })
      ] })
    ] })
  ] }) }) });
}

function StickyBottomBar() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      const footer = document.querySelector("footer");
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const showAfterHero = window.scrollY > heroHeight * 0.8;
        const hideForFooter = footerRect.top < windowHeight - 80;
        setIsVisible(showAfterHero && !hideForFooter);
      } else {
        setIsVisible(window.scrollY > heroHeight * 0.8);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    if (isVisible) {
      document.body.style.paddingBottom = "80px";
    } else {
      document.body.style.paddingBottom = "0";
    }
    return () => {
      document.body.style.paddingBottom = "0";
    };
  }, [isVisible]);
  const scrollToRFQ = () => {
    const element = document.querySelector("#rfq-form");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  if (!isVisible) return null;
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg",
      role: "banner",
      "aria-label": "Sticky contact bar",
      children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 py-3", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center space-x-4", children: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-gray-900 dark:text-white", children: "Factory-Direct Microfiber Stock" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-600 dark:text-gray-400", children: "Special bulk pricing • 1M+ units ready" })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "tel:+66802065413",
              className: "hidden sm:flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 focus-visible:text-emerald-700 dark:focus-visible:text-emerald-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 rounded-md px-2 py-1 min-h-[44px]",
              "aria-label": "Call us now at +66 80 206 5413",
              children: [
                /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" }) }),
                /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "Call Now" })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: scrollToRFQ,
              className: "bg-emerald-600 hover:bg-emerald-700 focus-visible:bg-emerald-700 text-white px-4 py-2 rounded-md text-sm font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 min-h-[44px]",
              "aria-label": "Talk to sales - navigate to quote request form",
              children: "Talk to Sales"
            }
          )
        ] })
      ] }) })
    }
  );
}

function Footer() {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  const downloadCatalog = () => {
    console.log("Download catalog PDF");
  };
  return /* @__PURE__ */ jsx("footer", { className: "bg-gray-900 text-white", role: "contentinfo", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-4", children: "Kids Kreations Co., Ltd." }),
        /* @__PURE__ */ jsx("div", { className: "text-sm text-emerald-400 font-semibold mb-2", children: "Microfiber Division • Household & Auto Cleaning" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-300 mb-4 leading-relaxed", children: "Established infantwear manufacturer expanding into microfiber cleaning products. Leveraging our textile expertise to deliver quality cleaning cloths, automotive accessories, and household textiles with factory-direct pricing and reliable logistics." }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-sm text-gray-400", role: "list", "aria-label": "Company details", children: [
          /* @__PURE__ */ jsxs("p", { role: "listitem", children: [
            /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "📍" }),
            /* @__PURE__ */ jsx("span", { children: "Manufacturing Facility: Bangkok, Thailand" })
          ] }),
          /* @__PURE__ */ jsxs("p", { role: "listitem", children: [
            /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "🌍" }),
            /* @__PURE__ */ jsx("span", { children: "Exporting to 30+ Countries" })
          ] }),
          /* @__PURE__ */ jsxs("p", { role: "listitem", children: [
            /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "✅" }),
            /* @__PURE__ */ jsx("span", { children: "ISO 9001 Certified • BSCI Compliant" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "text-lg font-semibold mb-4", children: "Contact Export Sales" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3 text-sm", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-2", children: [
            /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 mt-0.5 text-emerald-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "mailto:lilsoft@kidskreationsco.com",
                  className: "text-gray-300 hover:text-emerald-400 focus-visible:text-emerald-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded",
                  "aria-label": "Send email to export team",
                  children: "lilsoft@kidskreationsco.com"
                }
              ),
              /* @__PURE__ */ jsx("p", { className: "text-gray-400", children: "Primary contact for quotes" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-2", children: [
            /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 mt-0.5 text-emerald-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "tel:+66802065413",
                  className: "text-gray-300 hover:text-emerald-400 focus-visible:text-emerald-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded",
                  "aria-label": "Call us at +66 80 206 5413",
                  children: "+66 80 206 5413"
                }
              ),
              /* @__PURE__ */ jsx("p", { className: "text-gray-400", children: "Business hours: 9 AM - 6 PM ICT" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-2", children: [
            /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 mt-0.5 text-emerald-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "https://wa.me/15035601009",
                  className: "text-gray-300 hover:text-emerald-400 focus-visible:text-emerald-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded",
                  "aria-label": "Contact us on WhatsApp",
                  children: "WhatsApp: +1 503 560 1009"
                }
              ),
              /* @__PURE__ */ jsx("p", { className: "text-gray-400", children: "Quick responses during business hours" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "text-lg font-semibold mb-4", children: "Resources" }),
        /* @__PURE__ */ jsxs("nav", { className: "space-y-2", "aria-label": "Footer navigation", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: downloadCatalog,
              className: "block text-left text-gray-300 hover:text-emerald-400 focus-visible:text-emerald-400 transition-colors duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded min-h-[44px] py-1",
              "aria-label": "Download full product catalog as PDF",
              children: [
                /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "📄" }),
                " Download Full Catalog (PDF)"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => {
                const element = document.querySelector("#products");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              },
              className: "block text-left text-gray-300 hover:text-emerald-400 focus-visible:text-emerald-400 transition-colors duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded min-h-[44px] py-1",
              "aria-label": "Navigate to available products section",
              children: [
                /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "🛍️" }),
                " View Available Products"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => {
                const element = document.querySelector("#logistics");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              },
              className: "block text-left text-gray-300 hover:text-emerald-400 focus-visible:text-emerald-400 transition-colors duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded min-h-[44px] py-1",
              "aria-label": "Navigate to shipping and logistics information",
              children: [
                /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "🚚" }),
                " Shipping & Logistics Info"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => {
                const element = document.querySelector("#rfq-form");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              },
              className: "block text-left text-gray-300 hover:text-emerald-400 focus-visible:text-emerald-400 transition-colors duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded min-h-[44px] py-1",
              "aria-label": "Navigate to quote request form",
              children: [
                /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "💬" }),
                " Request Quote"
              ]
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "border-t border-gray-800 mt-8 pt-8", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-400", children: [
        /* @__PURE__ */ jsxs("p", { children: [
          "© ",
          currentYear,
          " Kids Kreations Co., Ltd. All rights reserved."
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-1", children: "Infantwear manufacturer • Microfiber division • Export specialist" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-6 text-sm text-gray-400", children: [
        /* @__PURE__ */ jsx("span", { children: "🏭 Made in Thailand" }),
        /* @__PURE__ */ jsx("span", { children: "🌍 Worldwide Shipping" }),
        /* @__PURE__ */ jsx("span", { children: "✅ Quality Assured" })
      ] })
    ] }) })
  ] }) });
}

function PageContent({ products }) {
  const handleRequestQuote = (product) => {
    console.log("Request quote for:", product.name);
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-white dark:bg-gray-900", children: [
    /* @__PURE__ */ jsx(
      "a",
      {
        href: "#main-content",
        className: "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-emerald-600 text-white px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2",
        children: "Skip to main content"
      }
    ),
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsx(HeroSection, {}),
    /* @__PURE__ */ jsxs("main", { id: "main-content", role: "main", children: [
      /* @__PURE__ */ jsx(FeatureHighlights, {}),
      /* @__PURE__ */ jsx(ManufacturingVideo, {}),
      /* @__PURE__ */ jsx("section", { id: "products", className: "py-16 bg-white dark:bg-gray-900", "aria-labelledby": "products-heading", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
          /* @__PURE__ */ jsx("h2", { id: "products-heading", className: "text-3xl font-bold text-gray-900 dark:text-white mb-4", children: "Available Clearance Products" }),
          /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-600 dark:text-gray-300", children: "Proven microfiber essentials, ready for immediate export at unbeatable clearance prices" })
        ] }),
        /* @__PURE__ */ jsx(
          ProductGrid,
          {
            products,
            onRequestQuote: handleRequestQuote
          }
        )
      ] }) }),
      /* @__PURE__ */ jsx(LogisticsSection, {}),
      /* @__PURE__ */ jsx(WhyClearanceSection, {}),
      /* @__PURE__ */ jsx(FAQSection, {}),
      /* @__PURE__ */ jsx(RFQForm, {})
    ] }),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsx(StickyBottomBar, {})
  ] });
}
function MicrofiberClearancePage({ products }) {
  return /* @__PURE__ */ jsx(CurrencyProvider, { initialCurrency: "THB", children: /* @__PURE__ */ jsx(PageContent, { products }) });
}

const $$Astro$2 = createAstro();
const $$SEOHead = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$SEOHead;
  const {
    title = "Microfiber Stock Clearance - Factory Direct Pricing | Kids Kreations Co., Ltd.",
    description = "Factory-direct microfiber products at special bulk pricing. Over 1 million units ready for immediate shipment. Cleaning cloths, wash mitts, and automotive accessories from Thailand manufacturer.",
    canonical = Astro2.url.href,
    ogImage = "/images/og-microfiber-clearance.jpg"
  } = Astro2.props;
  const siteName = "Kids Kreations Co., Ltd.";
  return renderTemplate`<!-- Primary Meta Tags --><title>${title}</title><meta name="title"${addAttribute(title, "content")}><meta name="description"${addAttribute(description, "content")}><meta name="keywords" content="microfiber, cleaning cloths, wash mitts, factory direct, bulk pricing, Thailand manufacturer, automotive accessories, clearance stock, wholesale microfiber"><meta name="robots" content="index, follow"><meta name="language" content="English"><meta name="author" content="Kids Kreations Co., Ltd."><!-- Canonical URL --><link rel="canonical"${addAttribute(canonical, "href")}><!-- Open Graph / Facebook --><meta property="og:type" content="website"><meta property="og:url"${addAttribute(canonical, "content")}><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:image"${addAttribute(ogImage, "content")}><meta property="og:site_name"${addAttribute(siteName, "content")}><meta property="og:locale" content="en_US"><!-- Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url"${addAttribute(canonical, "content")}><meta property="twitter:title"${addAttribute(title, "content")}><meta property="twitter:description"${addAttribute(description, "content")}><meta property="twitter:image"${addAttribute(ogImage, "content")}><!-- Additional SEO Meta Tags --><meta name="geo.region" content="TH"><meta name="geo.placename" content="Bangkok"><meta name="geo.position" content="13.7563;100.5018"><meta name="ICBM" content="13.7563, 100.5018"><!-- Business/Contact Info --><meta name="contact" content="lilsoft@kidskreationsco.com"><meta name="coverage" content="Worldwide"><meta name="distribution" content="Global"><meta name="target" content="B2B, Wholesale, Retail"><!-- Preconnect for performance --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`;
}, "/Users/pranavsukumaran/Desktop/microfiber/deeply-debris/src/components/SEOHead.astro", void 0);

const productsData = [
	{
		sku: null,
		name: "Super Soft Microfiber Cloth",
		summary: "Streak-free microfiber cloth for glass, mirrors, and delicate surfaces. Reusable and fast-drying.",
		size: "16\" X 24\"\n(40 X 60 cm)",
		fabric: "100% Polyester",
		gsm: 200,
		colors: [
			"White"
		],
		packing: "2 DISPLAY STRIPS × 12 PCS = 24 PCS / CARTON",
		carton_dimensions: "34 X 28 X 19 cm",
		cbm: 0.015,
		unit_price_thb_no_vat: 12.5,
		hs_code: null
	},
	{
		sku: null,
		name: "Microfiber Cleaning Towels - 2 PCS SET",
		summary: "Dual-color, lint-free towels for detailing, dust, and spills. Durable, washable, and multipurpose.",
		size: "14\" X 16\"\n(35.5 X 40.5 cm)",
		fabric: "80% Polyester, 20% Polyamide",
		gsm: 220,
		colors: [
			"Blue",
			"Green"
		],
		packing: "30 SETS / CARTON = TOTAL 60 PCS",
		carton_dimensions: "34 X 28 X 19 cm",
		cbm: 0.018,
		unit_price_thb_no_vat: 11.5,
		hs_code: null
	},
	{
		sku: null,
		name: "Steering Wheel Cover",
		summary: "Microfiber cover with non-slip surface. Universal fit for added grip and protection.",
		size: "7.48\" X 7.48\"            (19 X 19 cm)",
		fabric: "100% Polyester Velour – Solid/Printed",
		gsm: 220,
		colors: [
			"Pink",
			"Black",
			"Rainbow",
			"Beige",
			"Grey"
		],
		packing: "24 PCS / CARTON",
		carton_dimensions: "39 X 20 X 18 cm",
		cbm: 0.0125,
		unit_price_thb_no_vat: 13.5,
		hs_code: null
	},
	{
		sku: null,
		name: "Microfiber Washmitt",
		summary: "Dense microfiber traps dirt safely. Paint-safe, scratch-resistant design for efficient hand car washing.",
		size: "10\" X 5.75\"      (25.40 X 14.60 cm)",
		fabric: "100% Polyester – Chenille Front & Terry Back",
		gsm: 655,
		colors: [
			"Grey",
			"Blue",
			"Green"
		],
		packing: "3 DISPLAY STRIPS × 12 PCS = 36 PCS / CARTON",
		carton_dimensions: "34 X 28 X 19 cm",
		cbm: 0.02,
		unit_price_thb_no_vat: 15,
		hs_code: null
	},
	{
		sku: null,
		name: "Antimicrobial Microfiber Cleaning Towels - 2 PCS SET",
		summary: "High-absorbency microfiber cloths with built-in antimicrobial agent. Traps dust, dirt, and grime effectively.",
		size: "13.75\" x 13.75\"\n(35 x 35 cm)",
		fabric: "100% Polyester",
		gsm: 195,
		colors: [
			"Grey"
		],
		packing: "24 SETS / CARTON = TOTAL 48 TOWELS",
		carton_dimensions: "39.5 X 19 X 24 cm",
		cbm: 0.012,
		unit_price_thb_no_vat: 13.5,
		hs_code: null
	},
	{
		sku: null,
		name: "Handy Shammy Cleaning Towels",
		summary: "bsorbent and reusable towel for spills, drying, and general cleaning. Leaves surfaces streak-free.",
		size: "13.75\" x 13.75\"\n(35 x 35 cm",
		fabric: "100% Polyester",
		gsm: null,
		colors: [
			"Yellow"
		],
		packing: "48 PCS / CARTON",
		carton_dimensions: "37 X 34 X 14.5 cm",
		cbm: 0.018,
		unit_price_thb_no_vat: 11.5,
		hs_code: null
	}
];

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(cooked.slice()) }));
var _a$1;
const $$Astro$1 = createAstro();
const $$StructuredData = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$StructuredData;
  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Microfiber Stock Clearance - Factory Direct Pricing",
    "description": "Factory-direct microfiber products at special bulk pricing. Over 1 million units ready for immediate shipment from Thailand manufacturer.",
    "url": Astro2.url.href,
    "mainEntity": {
      "@type": "Organization",
      "name": "Kids Kreations Co., Ltd.",
      "description": "Leading manufacturer of high-quality microfiber products for global markets",
      "url": Astro2.site?.href || Astro2.url.origin,
      "logo": `${Astro2.url.origin}/images/logo.png`,
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+66 802065413",
        "contactType": "sales",
        "email": "lilsoft@kidskreationsco.com",
        "availableLanguage": ["English", "Thai"]
      },
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "TH",
        "addressLocality": "Bangkok",
        "addressRegion": "Bangkok"
      },
      "sameAs": [
        "https://www.linkedin.com/company/kids-kreations",
        "https://www.facebook.com/kidskreationsthailand"
      ]
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": Astro2.url.origin
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Microfiber Clearance",
          "item": Astro2.url.href
        }
      ]
    }
  };
  const productListStructuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Microfiber Clearance Products",
    "description": "Factory-direct microfiber products available for immediate shipment",
    "numberOfItems": productsData.length,
    "itemListElement": productsData.map((product, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": product.name,
        "description": product.summary,
        "material": product.fabric || "Microfiber",
        "manufacturer": {
          "@type": "Organization",
          "name": "Kids Kreations Co., Ltd."
        },
        "offers": {
          "@type": "Offer",
          "price": product.unit_price_thb_no_vat || "Contact for pricing",
          "priceCurrency": "THB",
          "availability": "https://schema.org/InStock",
          "seller": {
            "@type": "Organization",
            "name": "Kids Kreations Co., Ltd."
          }
        },
        "additionalProperty": [
          ...product.gsm ? [{
            "@type": "PropertyValue",
            "name": "GSM",
            "value": product.gsm
          }] : [],
          ...product.size ? [{
            "@type": "PropertyValue",
            "name": "Size",
            "value": product.size
          }] : [],
          ...product.colors && product.colors.length > 0 ? [{
            "@type": "PropertyValue",
            "name": "Available Colors",
            "value": product.colors.join(", ")
          }] : []
        ]
      }
    }))
  };
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What's the minimum order quantity for clearance items?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Minimum orders start at 1,000 units per SKU, but we offer better pricing for larger quantities. Container loads (20ft/40ft) receive the best rates. Mixed SKU orders are welcome to help you reach minimum quantities."
        }
      },
      {
        "@type": "Question",
        "name": "Are these products defective or seconds quality?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, these are first-quality products that have passed all our standard quality control processes. All items meet the same specifications as our regular production and are ready for immediate shipment from our factory warehouse."
        }
      },
      {
        "@type": "Question",
        "name": "How quickly can you ship, and what are the payment terms?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ready stock can ship within 2-5 business days after payment confirmation. Payment terms are 30% deposit with the balance due before shipment via T/T wire transfer. Letter of Credit is available for orders over $50,000 USD."
        }
      },
      {
        "@type": "Question",
        "name": "Can I get samples before placing a large order?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we provide free samples for serious buyers. Sample shipping costs apply, but we'll credit this against your first order. Samples typically ship within 24 hours and help you verify quality before committing to larger quantities."
        }
      }
    ]
  };
  return renderTemplate(_a$1 || (_a$1 = __template$1(['<!-- Website and Organization Structured Data --><script type="application/ld+json">', '<\/script> <!-- Product List Structured Data --><script type="application/ld+json">', '<\/script> <!-- FAQ Structured Data --><script type="application/ld+json">', "<\/script>"])), unescapeHTML(JSON.stringify(websiteStructuredData)), unescapeHTML(JSON.stringify(productListStructuredData)), unescapeHTML(JSON.stringify(faqStructuredData)));
}, "/Users/pranavsukumaran/Desktop/microfiber/deeply-debris/src/components/StructuredData.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate(_a || (_a = __template(['<html lang="en"> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="generator"', "><!-- SEO Meta Tags -->", "<!-- Structured Data -->", `<!-- Accessibility Styles --><link rel="stylesheet" href="/src/styles/accessibility.css"><!-- Dark Mode Script (must run before page renders) --><script>
			// Prevent flash of unstyled content (FOUC) for dark mode
			(function() {
				const savedTheme = localStorage.getItem('theme');
				const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
				
				if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
					document.documentElement.classList.add('dark');
				}
			})();
		<\/script>`, "</head> <body> ", " </body></html>"])), addAttribute(Astro2.generator, "content"), renderComponent($$result, "SEOHead", $$SEOHead, {}), renderComponent($$result, "StructuredData", $$StructuredData, {}), renderHead(), renderComponent($$result, "MicrofiberClearancePage", MicrofiberClearancePage, { "products": productsData, "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/pranavsukumaran/Desktop/microfiber/deeply-debris/src/components/MicrofiberClearancePage.jsx", "client:component-export": "default" }));
}, "/Users/pranavsukumaran/Desktop/microfiber/deeply-debris/src/pages/index.astro", void 0);

const $$file = "/Users/pranavsukumaran/Desktop/microfiber/deeply-debris/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
