"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { 
  Building2, LayoutDashboard, Settings, Users, 
  MessageSquare, FileText, Calendar, UserPlus, 
  Building, Briefcase, Heart, Badge, GraduationCap, LogOut, 
  Gift, Receipt, Bed, ShoppingBag, Share2, Image as ImageIcon, 
  Laptop, BookOpen, Bookmark, Coins, UsersRound, Contact,
  ChevronDown, ChevronRight, FolderTree, Plane, Megaphone
} from "lucide-react";

const navigationGroups = [
  {
    title: "Gestion RH",
    icon: Users,
    items: [
      { name: "Gestion de collaborateur", icon: UsersRound, href: "/employees" },
      { name: "Situation personnelle", icon: Heart, href: "/personal-situation" },
      { name: "Situation professionnelle", icon: Badge, href: "/professional-situation" },
      { name: "Rémunération", icon: Coins, href: "/compensation" },
      { name: "Dotation", icon: Gift, href: "/dotation" },
    ]
  },
  {
    title: "Recrutement & Talents",
    icon: GraduationCap,
    items: [
      { name: "Recrutement", icon: UserPlus, href: "/recruitment" },
      { name: "Candidature interne", icon: Briefcase, href: "/internal-application" },
      { name: "Nouvel arrivant", icon: UserPlus, href: "/onboarding" },
      { name: "Départ collaborateur", icon: LogOut, href: "/offboarding" },
      { name: "Evaluation Formation", icon: GraduationCap, href: "/training" },
      { name: "Entretien d'évaluation", icon: Users, href: "/evaluation-interview" },
    ]
  },
  {
    title: "Demandes & Déplacements",
    icon: Plane,
    items: [
      { name: "Demande de congés", icon: Calendar, href: "/leaves" },
      { name: "Demande Administrative", icon: FileText, href: "/admin-request" },
      { name: "Note de frais", icon: Receipt, href: "/expenses" },
      { name: "Réservation d'hôtel", icon: Bed, href: "/hotel-booking" },
      { name: "Réservation de salle", icon: Building, href: "/meeting-room" },
      { name: "Accueil visiteur", icon: Contact, href: "/visitor" },
    ]
  },
  {
    title: "Communication & IT",
    icon: Megaphone,
    items: [
      { name: "Mot du General Manager", icon: MessageSquare, href: "/general-manager" },
      { name: "IT request GLPI", icon: Laptop, href: "/it-request" },
      { name: "Believery Store", icon: ShoppingBag, href: "/store" },
      { name: "Galerie", icon: ImageIcon, href: "/gallery" },
      { name: "FLP", icon: Share2, href: "/flp" },
      { name: "Règlement intérieur", icon: BookOpen, href: "/rules" },
      { name: "Référentiels", icon: Bookmark, href: "/references" },
    ]
  }
];

export function Sidebar() {
  const pathname = usePathname();
  // Keep first group open by default, others closed
  const [openGroups, setOpenGroups] = useState<string[]>(["Gestion RH"]);

  const toggleGroup = (title: string) => {
    setOpenGroups(prev => 
      prev.includes(title) 
        ? prev.filter(g => g !== title)
        : [...prev, title]
    );
  };

  const isDashboardActive = pathname === "/";

  return (
    <div className="flex h-full w-72 flex-col bg-white border-r border-slate-200/60 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
      <div className="flex h-20 shrink-0 items-center px-6 border-b border-slate-100">
        <div className="flex items-center mx-auto gap-3">
          <img 
            src="/silentbelievers_logo.jpeg" 
            alt="Silent Believers Logo" 
            className="h-10 w-auto object-contain rounded-lg"
          />
        </div>
      </div>
      
      <div className="flex flex-1 flex-col overflow-y-auto px-3 py-4 custom-scrollbar">
        <nav className="flex-1 space-y-2">
          
          <Link
            href="/"
            className={`
              group flex items-center rounded-xl px-3 py-2.5 text-[13px] font-semibold transition-all duration-200 mb-4
              ${isDashboardActive 
                ? "bg-blue-50/80 text-blue-700 shadow-sm shadow-blue-100/50" 
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }
            `}
          >
            <LayoutDashboard
              className={`mr-3 h-4 w-4 shrink-0 transition-colors duration-200 stroke-[2] ${isDashboardActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-500"}`}
            />
            Tableau de Bord
          </Link>

          {navigationGroups.map((group) => {
            const isOpen = openGroups.includes(group.title);
            
            return (
              <div key={group.title} className="space-y-1">
                <button
                  onClick={() => toggleGroup(group.title)}
                  className="w-full flex items-center justify-between px-3 py-2 text-[12px] font-bold uppercase tracking-wider text-slate-500 hover:text-slate-800 transition-colors rounded-lg hover:bg-slate-50"
                >
                  <div className="flex items-center">
                    <group.icon className="mr-2 h-4 w-4 shrink-0 text-slate-400" />
                    {group.title}
                  </div>
                  {isOpen ? (
                    <ChevronDown className="h-4 w-4 text-slate-400" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  )}
                </button>
                
                {isOpen && (
                  <div className="mt-1 space-y-1 border-l-2 border-slate-100 ml-5 pl-2">
                    {group.items.map((item) => {
                      const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(`${item.href}/`));
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={`
                            group flex items-center rounded-lg px-3 py-2 text-[13px] font-medium transition-all duration-200
                            ${isActive 
                              ? "bg-blue-50 text-blue-700 font-semibold" 
                              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            }
                          `}
                        >
                          <item.icon
                            className={`
                              mr-3 h-4 w-4 shrink-0 transition-colors duration-200
                              ${isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-500"}
                            `}
                          />
                          {item.name}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="mt-auto pt-6 pb-2">
          <Link
            href="/settings"
            className={`
              group flex items-center rounded-xl px-3 py-2.5 text-[13px] font-semibold transition-all duration-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900
            `}
          >
            <Settings className="mr-3 h-4 w-4 shrink-0 text-slate-400 group-hover:text-slate-500" />
            Paramètres
          </Link>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}} />
    </div>
  );
}
