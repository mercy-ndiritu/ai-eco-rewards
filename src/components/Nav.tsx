import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Recycle, LayoutDashboard, Camera, Gift, MessageCircle, User, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Nav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Failed to sign out");
    } else {
      toast.success("Signed out successfully");
      navigate("/");
    }
  };

  const navItems = [
    { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/submit", icon: Camera, label: "Submit Item" },
    { to: "/rewards", icon: Gift, label: "Rewards" },
    { to: "/chat", icon: MessageCircle, label: "EcoBot" },
    { to: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <nav className="border-b bg-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/dashboard" className="flex items-center gap-2">
            <Recycle className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold">EcoRewards</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.to} to={item.to}>
                <Button
                  variant={location.pathname === item.to ? "default" : "ghost"}
                  className="gap-2"
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Button>
              </Link>
            ))}
            <Button variant="ghost" onClick={handleSignOut} className="gap-2 ml-2">
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>

          <div className="md:hidden flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.to} to={item.to}>
                <Button
                  variant={location.pathname === item.to ? "default" : "ghost"}
                  size="icon"
                >
                  <item.icon className="w-4 h-4" />
                </Button>
              </Link>
            ))}
            <Button variant="ghost" size="icon" onClick={handleSignOut}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
