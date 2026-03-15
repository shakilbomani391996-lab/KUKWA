import React from 'react';
import { Home, ShoppingBag, PlusCircle, MessageSquare, User, Truck } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import { Logo } from './Logo';

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  active?: boolean;
}

const NavItem = ({ to, icon: Icon, label, active }: NavItemProps) => (
  <Link
    to={to}
    className={cn(
      "flex flex-col items-center justify-center w-full py-2 transition-colors",
      active ? "text-orange-600" : "text-gray-500 hover:text-orange-400"
    )}
  >
    <Icon size={24} />
    <span className="text-[10px] mt-1 font-medium">{label}</span>
  </Link>
);

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col max-w-md mx-auto shadow-2xl relative overflow-hidden">
      {/* Header */}
      <header className="bg-white border-b border-stone-200 px-4 py-3 sticky top-0 z-50 flex items-center justify-between">
        <Logo size="sm" />
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-full bg-stone-100 text-stone-600">
            <PlusCircle size={20} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-stone-200 flex justify-around items-center z-50">
        <NavItem to="/" icon={Home} label="Nyumbani" active={location.pathname === '/'} />
        <NavItem to="/marketplace" icon={ShoppingBag} label="Soko" active={location.pathname === '/marketplace'} />
        <NavItem to="/kuja-kwako" icon={Truck} label="Kuja Kwako" active={location.pathname === '/kuja-kwako'} />
        <NavItem to="/messages" icon={MessageSquare} label="Ujumbe" active={location.pathname === '/messages'} />
        <NavItem to="/profile" icon={User} label="Wasifu" active={location.pathname === '/profile'} />
      </nav>
    </div>
  );
};
