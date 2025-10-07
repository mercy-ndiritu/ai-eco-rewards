import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Nav from "@/components/Nav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Award, History } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }

      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      setProfile(profileData);

      const { data: transData } = await supabase
        .from("points_transactions")
        .select("*")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false })
        .limit(10);

      setTransactions(transData || []);
    };

    fetchData();
  }, [navigate]);

  return (
    <div className="min-h-screen gradient-hero">
      <Nav />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">My Profile</h1>
        
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p><strong>Name:</strong> {profile?.full_name || 'Not set'}</p>
              <p><strong>Email:</strong> {profile?.email}</p>
              <p><strong>Member since:</strong> {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : ''}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Points History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {transactions.map((trans) => (
                  <div key={trans.id} className="flex justify-between p-3 bg-secondary/50 rounded">
                    <span>{trans.description}</span>
                    <span className={trans.amount > 0 ? 'text-accent font-bold' : 'text-muted-foreground'}>
                      {trans.amount > 0 ? '+' : ''}{trans.amount} pts
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
