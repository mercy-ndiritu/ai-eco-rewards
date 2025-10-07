import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Nav from "@/components/Nav";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gift, Award, ShoppingBag, Leaf, Check } from "lucide-react";
import { toast } from "sonner";

interface Reward {
  id: string;
  title: string;
  description: string;
  points_cost: number;
  category: string;
  partner_name: string;
  available_quantity: number | null;
}

const Rewards = () => {
  const navigate = useNavigate();
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [userPoints, setUserPoints] = useState(0);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          navigate("/auth");
          return;
        }

        setUserId(session.user.id);

        // Fetch user points
        const { data: profileData } = await supabase
          .from("profiles")
          .select("total_points")
          .eq("id", session.user.id)
          .single();

        if (profileData) {
          setUserPoints(profileData.total_points);
        }

        // Fetch rewards
        const { data: rewardsData, error } = await supabase
          .from("rewards")
          .select("*")
          .eq("is_active", true)
          .order("points_cost", { ascending: true });

        if (error) throw error;
        setRewards(rewardsData || []);

      } catch (error: any) {
        toast.error("Failed to load rewards");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleRedeem = async (reward: Reward) => {
    if (!userId) return;

    if (userPoints < reward.points_cost) {
      toast.error("Not enough points to redeem this reward");
      return;
    }

    try {
      // Create redemption record
      const redemptionCode = `ECO-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      
      const { error: redemptionError } = await supabase
        .from("reward_redemptions")
        .insert({
          user_id: userId,
          reward_id: reward.id,
          points_spent: reward.points_cost,
          redemption_code: redemptionCode,
          status: 'pending',
        });

      if (redemptionError) throw redemptionError;

      // Update user points
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ total_points: userPoints - reward.points_cost })
        .eq("id", userId);

      if (updateError) throw updateError;

      // Create points transaction
      await supabase
        .from("points_transactions")
        .insert({
          user_id: userId,
          amount: -reward.points_cost,
          transaction_type: 'redeemed',
          description: `Redeemed: ${reward.title}`,
        });

      setUserPoints(userPoints - reward.points_cost);
      toast.success(`Successfully redeemed! Code: ${redemptionCode}`);

    } catch (error: any) {
      console.error('Error:', error);
      toast.error("Failed to redeem reward");
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'voucher':
        return ShoppingBag;
      case 'product':
        return Gift;
      case 'activity':
        return Leaf;
      default:
        return Award;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen gradient-hero">
        <Nav />
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-xl">Loading rewards...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-hero">
      <Nav />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Rewards Marketplace</h1>
            <p className="text-muted-foreground text-lg">
              Redeem your points for eco-friendly rewards
            </p>
          </div>
          <Card className="shadow-eco">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-1">Your Points</p>
              <p className="text-3xl font-bold text-accent">{userPoints}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rewards.map((reward) => {
            const CategoryIcon = getCategoryIcon(reward.category);
            const canAfford = userPoints >= reward.points_cost;

            return (
              <Card 
                key={reward.id} 
                className={`border-2 transition-smooth ${
                  canAfford ? 'hover:border-accent hover:shadow-eco' : 'opacity-75'
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <CategoryIcon className="w-8 h-8 text-accent" />
                    <Badge variant={canAfford ? "default" : "secondary"}>
                      {reward.points_cost} pts
                    </Badge>
                  </div>
                  <CardTitle>{reward.title}</CardTitle>
                  <CardDescription className="capitalize">
                    {reward.partner_name} • {reward.category}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {reward.description}
                  </p>
                  {reward.available_quantity !== null && (
                    <p className="text-xs text-muted-foreground mb-4">
                      {reward.available_quantity} available
                    </p>
                  )}
                  <Button
                    onClick={() => handleRedeem(reward)}
                    disabled={!canAfford}
                    variant={canAfford ? "eco" : "secondary"}
                    className="w-full"
                  >
                    {canAfford ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Redeem Now
                      </>
                    ) : (
                      `Need ${reward.points_cost - userPoints} more points`
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {rewards.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Gift className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No rewards available yet</h3>
              <p className="text-muted-foreground">Check back soon for exciting offers!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Rewards;
