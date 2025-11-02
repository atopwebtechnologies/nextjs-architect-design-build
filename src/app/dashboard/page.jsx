"use client";

import { useAuth } from "@/context/AuthProvider";
import {
  ArrowUpRight,
  Banknote,
  Bell,
  Bitcoin,
  ChevronDown,
  CreditCard,
  Gift,
  Home,
  LayoutGrid,
  LogOut,
  MoreHorizontal,
  MoreVertical,
  Plus,
  RefreshCcw,
  Search,
  Wallet,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { Suspense, useEffect } from "react";
import TransactionsList from "./components/transaction-list";

export default function Dashboard() {
  const router = useRouter();
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="flex min-h-screen max-w-[1440px] mx-auto bg-[#090909] text-gray-100">
      {/* Sidebar */}

      <div className="w-[280px] bg-[#0F0F0F] hidden lg:flex flex-col">
        {/* Logo and App Name */}
        <div className="flex items-center space-x-2 pl-9 pt-[30.8px] pb[51.2px]">
          <span className="font-extrabold text-xl">ATOPBANK</span>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 space-y-2 pt-12">
          <SidebarItem icon={Home} text="Dashboard" active />
          <SidebarItem icon={CreditCard} text="My cards" active={undefined} />
          <SidebarItem icon={Banknote} text="Payments" active={undefined} />
          <SidebarItem icon={Gift} text="Cashback" active={undefined} />
          <SidebarItem icon={RefreshCcw} text="Exchange" active={undefined} />
          <SidebarItem
            icon={LayoutGrid}
            text="All Services"
            active={undefined}
          />
        </nav>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-[87px] flex items-center justify-between gap-x-4 pr-[20px] max-md:pr-0 max-md:px-3 bg-[#0F0F0F]">
          <div className="h-[51px] max-w-[415px] flex-1 flex items-center bg-[#171717E5] border border-[#DFE2E712] rounded-full p-2  md:flex">
            <Search className="size-[22px] text-white/40 mr-2 ml-2" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent flex-1 focus:outline-none placeholder-white/40 text-sm"
            />
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative size-11 rounded-full border border-[#DFE2E736] flex items-center justify-center">
              <span className="absolute top-0 right-0 size-3 rounded-full bg-[#E67E22] border-[2.5px] border-[#0F0F0F]" />
              <Bell className="size-6 text-white  cursor-pointer" />
            </div>
            <div className="flex items-center gap-x-[11px] cursor-pointer py-2 px-3  rounded-full">
              <div className="flex items-center gap-x-[17px]">
                <img
                  src="/img/user.png"
                  alt="avatar"
                  className="w-10 h-10 rounded-full"
                />
                <div className="hidden sm:block text-sm">
                  <p className="font-semibold text-white">John Doe</p>
                  <p className="text-white/35">johndoe@example.com</p>
                </div>
              </div>
              <span>
                <ChevronDown className="size-[24px] text-white/35" />
              </span>
              <button
                title="Logout"
                onClick={() => setIsAuthenticated(false)}
                className="relative group size-4 rounded-full"
              >
                <LogOut className="size-6 p-1 rounded-full text-white transition-all duration-300 ease-in-out hover:bg-white/15 " />
                <span className="absolute left-1/2 -translate-x-1/2 -top-8 text-xs text-white bg-black/70 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Logout
                </span>
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="p-[23px] flex flex-col lg:flex-row gap-6">
          <section className="flex-1 flex flex-col gap-6">
            {/* Balance Card */}
            <div className="bg-gradient-to-r from-[#C364FA] to-[#F96A3F] p-8 rounded-[8px] overflow-hidden">
              <div className="relative z-10 flex justify-between items-center">
                <div className="space-y-2 w-full">
                  <div className="flex items-center gap-x-2.5 py-2.5">
                    <Wallet className="size-5" />
                    <h3 className="text-[16px] font-semibold text-white">
                      Total Balance
                    </h3>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-4xl font-bold">$80,435.32</p>
                    <button className="bg-[#441311] text-white font-normal py-2.5 px-3.5 rounded-md flex items-center space-x-2">
                      <span className="text-[12px]">Add Money</span>
                      <Plus className="size-[15.625px]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Money Flow Chart */}
            <div className="bg-[#161616] p-6 rounded-[8px]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">Money Flow</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <span className="flex items-center space-x-1 cursor-pointer">
                    <span>Income</span>
                    <ChevronDown className="w-4 h-4" />
                  </span>
                  <span className="flex items-center space-x-1 cursor-pointer">
                    <span>June 01 - June 07</span>
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </div>
              </div>
              {/* Placeholder for the chart */}
              <div className="w-full h-64">
                <Image
                  src="/img/chat-flow-1.png"
                  width={900}
                  height={800}
                  alt="Money flow chat"
                />
              </div>
            </div>

            {/* Income, Savings, Investments Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <MetricCard title="Income" value="$342,394" />
              <MetricCard title="Savings" value="$137,240" />
              <MetricCard title="Investments" value="$12,407" />
            </div>
          </section>

          {/* Right Column - Wallet and Transactions */}
          <div className="w-full bg-[#0F0F0F] rounded-md lg:w-96 flex-shrink-0 flex flex-col">
            {/* Wallet Card */}
            <div className="p-6 hidden lg:block">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">Wallet</h3>
                <MoreHorizontal className="w-5 h-5 text-gray-400 cursor-pointer" />
              </div>
              <div className="relative bg-[#EA6873] h-48 rounded-xl overflow-hidden">
                {/* <div className="absolute inset-0  opacity-80 z-0"></div> */}
                <img
                  src="/img/wallet-card-style.png"
                  alt="Wallet Card Style"
                  className="absolute right-0 w-[35%]"
                />
                <div className="relative z-10 h-full p-4 flex flex-col justify-end gap-y-8">
                  <p className="text-white text-lg font-semibold tracking-wide">
                    5022&nbsp;&nbsp;&nbsp;3386&nbsp;&nbsp;&nbsp;9820&nbsp;&nbsp;&nbsp;1246
                  </p>
                  <div className="flex justify-between items-center text-white text-sm">
                    <span>JOSIAH KHHNHE</span>
                    <span>08/26</span>
                    <span className="text-3xl font-extrabold italic text-white">
                      VISA
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-center items-center gap-x-2 pb-9 pt-2">
                <div className="h-[3px] w-8 bg-[#373737] " />
                <div className="h-[3px] w-4 bg-[#373737] " />
                <div className="h-[3px] w-4 bg-[#373737] " />
              </div>

              {/* Wallet Actions */}
              <div className="w-full flex justify-between items-center border-b border-[#373737] pb-11 pt-[5px]">
                <WalletActionButton icon={ArrowUpRight} text="Send" />
                <WalletActionButton icon={Plus} text="Request" />
                <WalletActionButton icon={Bitcoin} text="Crypto" />
                <WalletActionButton icon={LayoutGrid} text="More..." />
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="p-6">
              <h3 className="font-semibold text-lg mb-4">
                Recent Transactions
              </h3>
              <Suspense
                fallback={
                  <p
                    className="mt-20
                   text-sm text-white/80 text-center"
                  >
                    Loading...
                  </p>
                }
              >
                <TransactionsList />
              </Suspense>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const SidebarItem = ({ icon: Icon, text, active }) => {
  return (
    <a
      href="#"
      className={`flex items-center space-x-4 px-[36px] py-[20px]  transition-colors duration-200 ${
        active ? "bg-white/5 text-white" : "hover:bg-gray-800/20"
      }`}
    >
      <Icon className="size-[24px]" />
      <span className="font-medium">{text}</span>
    </a>
  );
};

// Component for the small metric cards (Income, Savings, etc.).
const MetricCard = ({ title, value }) => {
  return (
    <div className="bg-[#161616] p-[21px] rounded-2xl">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-normal text-[16px] text-gray-400">{title}</h3>
        <MoreVertical className="w-5 h-5 text-gray-400" />
      </div>
      <p className="text-lg font-semibold">{value}</p>
      {/* Placeholder for small chart */}
      <div className="pt-12">
        <Image
          src="/img/chat-flow-2.png"
          width={100}
          height={80}
          alt="Metric card chat"
          className="w-full"
          priority
        />
      </div>
    </div>
  );
};

// Component for the action buttons in the Wallet card.
const WalletActionButton = ({ icon: Icon, text }) => {
  return (
    <button className="flex flex-col items-center space-y-1 text-sm text-gray-400 hover:text-white transition-colors duration-200">
      <div className="w-12 h-12 rounded-md bg-gray-800 flex items-center justify-center">
        <Icon className="size-6 text-white" />
      </div>
      <span>{text}</span>
    </button>
  );
};
