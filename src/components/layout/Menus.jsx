// Role-aware menu model used by Sidebar.
// Roles: 'admin', 'instructor'. You can add 'learner' later if you want.

import {
  LayoutDashboard, BookOpen, Layers, ListTree, PlayCircle, Tag, Users,
  UserCog, UserCheck, LineChart, Receipt, Wallet, MessageSquare,
  Bell, Star, GraduationCap, Settings, SlidersHorizontal, Globe,
  Image as ImageIcon, FileText, HelpCircle, Shield, KeyRound,
  ServerCog, Bug, LifeBuoy, ClipboardList, PackageSearch
} from "lucide-react";

export const MENUS = {
  instructor: [
    { label: "Overview", icon: LayoutDashboard, to: "/instructor" },
    {
      label: "Courses",
      icon: BookOpen,
      children: [
        { label: "My Courses", to: "/instructor/courses" },
        { label: "Create Course", to: "/instructor/courses/new" },
        { label: "Sections", to: "/instructor/sections" },
        { label: "Lessons", to: "/instructor/lessons" },
        { label: "Catalog (my)", to: "/instructor/catalog" },
      ],
    },
    {
      label: "Audience",
      icon: Users,
      children: [
        { label: "Students", to: "/instructor/students" },
        { label: "Q&A / Messages", to: "/instructor/messages" , icon: MessageSquare},
        { label: "Reviews", to: "/instructor/reviews", icon: Star },
        { label: "Announcements", to: "/instructor/announcements", icon: Bell },
      ],
    },
    {
      label: "Sales",
      icon: Receipt,
      children: [
        { label: "Orders", to: "/instructor/orders" },
        { label: "Coupons", to: "/instructor/coupons", icon: Tag },
        { label: "Earnings & Payouts", to: "/instructor/payouts", icon: Wallet },
        { label: "Analytics", to: "/instructor/analytics", icon: LineChart },
      ],
    },
    {
      label: "Settings",
      icon: Settings,
      children: [
        { label: "Profile", to: "/instructor/settings/profile", icon: UserCog },
        { label: "Notifications", to: "/instructor/settings/notifications", icon: Bell },
        { label: "Integrations", to: "/instructor/settings/integrations", icon: SlidersHorizontal },
        { label: "API keys", to: "/instructor/settings/api-keys", icon: KeyRound },
      ],
    },
    { label: "Help & Support", icon: LifeBuoy, to: "/instructor/support" },
    { label: "Docs (API)", icon: ClipboardList, to: "/docs" },
  ],

  admin: [
    { label: "Dashboard", icon: LayoutDashboard, to: "/admin" },
    {
      label: "Courses",
      icon: BookOpen,
      children: [
        { label: "All Courses", to: "/admin/courses" },
        { label: "Create Course", to: "/admin/courses/new" },
        { label: "Sections", to: "/admin/sections" },
        { label: "Lessons", to: "/admin/lessons" },
        { label: "Catalog (global)", to: "/admin/catalog" },
      ],
    },
    {
      label: "Taxonomy",
      icon: ListTree,
      children: [
        { label: "Categories", to: "/admin/categories" },
        { label: "Tags", to: "/admin/tags", icon: Tag },
      ],
    },
    {
      label: "People",
      icon: Users,
      children: [
        { label: "Users", to: "/admin/users" },
        { label: "Instructors", to: "/admin/instructors", icon: GraduationCap },
        { label: "Enrollments", to: "/admin/enrollments", icon: UserCheck },
        { label: "Messages", to: "/admin/messages", icon: MessageSquare },
        { label: "Reviews", to: "/admin/reviews", icon: Star },
      ],
    },
    {
      label: "Commerce",
      icon: Receipt,
      children: [
        { label: "Orders", to: "/admin/orders" },
        { label: "Coupons", to: "/admin/coupons", icon: Tag },
        { label: "Payouts", to: "/admin/payouts", icon: Wallet },
        { label: "Reports", to: "/admin/reports", icon: PackageSearch },
      ],
    },
    {
      label: "Site",
      icon: Globe,
      children: [
        { label: "Banners", to: "/admin/banners", icon: ImageIcon },
        { label: "Pages", to: "/admin/pages", icon: FileText },
        { label: "FAQs", to: "/admin/faqs", icon: HelpCircle },
        { label: "Notifications", to: "/admin/notifications", icon: Bell },
      ],
    },
    {
      label: "System",
      icon: ServerCog,
      children: [
        { label: "Settings", to: "/admin/settings", icon: Settings },
        { label: "Roles & Permissions", to: "/admin/roles", icon: Shield },
        { label: "Integrations", to: "/admin/integrations", icon: SlidersHorizontal },
        { label: "API keys", to: "/admin/api-keys", icon: KeyRound },
        { label: "Logs", to: "/admin/logs", icon: Bug },
        { label: "Health", to: "/admin/health" },
      ],
    },
    { label: "Docs (API)", icon: ClipboardList, to: "/docs" },
    { label: "Support", icon: LifeBuoy, to: "/admin/support" },
  ],
};

export const getMenusForRole = (role = "instructor") =>
  role === "admin" ? MENUS.admin : MENUS.instructor;
