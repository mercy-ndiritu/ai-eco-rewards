import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Nav from "@/components/Nav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaf, Award, TrendingUp, Camera, Gift, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  total_points: number;
  items_recycled: number;
  co2_saved_kg: number;
}

interface RecentSubmission {
  id: string;
  item_type: string;
  points_earned: number;
  created_at: string;
  material_category: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [recentSubmissions, setRecentSubmissions] = useState<RecentSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          navigate("/auth");
          return;
        }

        // Fetch profile
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        if (profileError) throw profileError;
        setProfile(profileData);

        // Fetch recent submissions
        const { data: submissions, error: submissionsError } = await supabase
          .from("recycling_submissions")
          .select("*")
          .eq("user_id", session.user.id)
          .order("created_at", { ascending: false })
          .limit(5);

        if (submissionsError) throw submissionsError;
        setRecentSubmissions(submissions || []);

      } catch (error: any) {
        toast.error("Failed to load dashboard data");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen gradient-hero">
        <Nav />
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-xl">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-hero">
      <Nav />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Welcome back, {profile?.full_name || "Eco Warrior"}! 🌱
          </h1>
          <p className="text-muted-foreground text-lg">
            Keep making a difference one recyclable at a time
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-2 hover:border-accent transition-smooth">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Points</CardTitle>
              <Award className="w-5 h-5 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">{profile?.total_points || 0}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Available for redemption
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary transition-smooth">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Items Recycled</CardTitle>
              <TrendingUp className="w-5 h-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{profile?.items_recycled || 0}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Total contributions
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-accent transition-smooth">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">CO₂ Saved</CardTitle>
              <Leaf className="w-5 h-5 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">
                {profile?.co2_saved_kg ? profile.co2_saved_kg.toFixed(1) : "0.0"} kg
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Environmental impact
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="gradient-eco text-primary-foreground">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="w-6 h-6" />
                Submit New Item
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Upload a photo of your recyclable materials to earn points!</p>
              <Button 
                onClick={() => navigate("/submit")}
                className="bg-card text-card-foreground hover:bg-card/90"
              >
                <Camera className="w-4 h-4 mr-2" />
                Upload Now
              </Button>
            </CardContent>
          </Card>

          <Card className="gradient-accent text-accent-foreground">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="w-6 h-6" />
                Redeem Rewards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Explore amazing eco-friendly rewards from our partners!</p>
              <Button 
                onClick={() => navigate("/rewards")}
                className="bg-card text-card-foreground hover:bg-card/90"
              >
                <Gift className="w-4 h-4 mr-2" />
                Browse Rewards
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent" />
              Recent Recycling Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentSubmissions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p className="mb-4">No recycling history yet!</p>
                <Button onClick={() => navigate("/submit")} variant="hero">
                  Submit Your First Item
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {recentSubmissions.map((submission) => (
                  <div
                    key={submission.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-smooth"
                  >
                    <div>
                      <p className="font-semibold">{submission.item_type}</p>
                      <p className="text-sm text-muted-foreground capitalize">
                        {submission.material_category} • {new Date(submission.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-accent">+{submission.points_earned} pts</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
