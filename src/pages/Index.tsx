import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Recycle, Gift, TrendingUp, Sparkles, Camera } from "lucide-react";
import heroImage from "@/assets/hero-recycling.jpg";
import recyclablesImage from "@/assets/recyclables.png";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative gradient-hero min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-accent/20 text-accent-foreground px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Leaf className="w-4 h-4" />
                <span>Supporting SDG 12 & 13</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Recycle Smart,
                <br />
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Earn Rewards
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Join the revolution in responsible recycling. Use AI to identify recyclable materials, 
                track your environmental impact, and earn rewards for making a difference.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" variant="hero" className="text-lg">
                  <Sparkles className="w-5 h-5" />
                  Get Started Free
                </Button>
                <Button size="lg" variant="outline" className="text-lg">
                  Learn More
                </Button>
              </div>
              <div className="flex flex-wrap gap-8 justify-center lg:justify-start pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">50K+</div>
                  <div className="text-sm text-muted-foreground">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">2M+</div>
                  <div className="text-sm text-muted-foreground">Items Recycled</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">Partners</div>
                </div>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <img 
                src={heroImage} 
                alt="People recycling in sustainable environment" 
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
              <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-xl shadow-eco">
                <div className="flex items-center gap-3">
                  <div className="bg-accent rounded-full p-3">
                    <Recycle className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">+250</div>
                    <div className="text-sm text-muted-foreground">Points Today</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              How It <span className="text-accent">Works</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Four simple steps to start making an environmental impact while earning rewards
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-2 hover:border-accent transition-smooth hover:shadow-eco">
              <CardHeader>
                <div className="w-12 h-12 rounded-full gradient-eco flex items-center justify-center mb-4">
                  <Camera className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle>1. Scan Item</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Upload a photo of your recyclable materials. Our AI instantly identifies them.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-accent transition-smooth hover:shadow-eco">
              <CardHeader>
                <div className="w-12 h-12 rounded-full gradient-eco flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle>2. Get Verified</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  AI validates your recyclable items in seconds with high accuracy.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-accent transition-smooth hover:shadow-eco">
              <CardHeader>
                <div className="w-12 h-12 rounded-full gradient-accent flex items-center justify-center mb-4">
                  <Gift className="w-6 h-6 text-accent-foreground" />
                </div>
                <CardTitle>3. Earn Points</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Receive eco-points for each item recycled. The more you recycle, the more you earn!
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-accent transition-smooth hover:shadow-eco">
              <CardHeader>
                <div className="w-12 h-12 rounded-full gradient-accent flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-accent-foreground" />
                </div>
                <CardTitle>4. Redeem Rewards</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Exchange points for discounts, gifts, and exclusive offers from eco-friendly partners.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Recyclable Materials Section */}
      <section className="py-20 px-4 bg-secondary/30">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src={recyclablesImage} 
                alt="Recyclable materials" 
                className="w-full max-w-md mx-auto"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold">
                We Accept All
                <br />
                <span className="text-primary">Recyclable Materials</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Our AI-powered recognition system can identify and verify a wide range of recyclable materials:
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "Plastic Bottles & Containers",
                  "Glass Bottles & Jars",
                  "Paper & Cardboard",
                  "Aluminum Cans",
                  "Metal Items",
                  "Electronic Waste"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 bg-card p-3 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <Button size="lg" variant="eco" className="mt-6">
                <Recycle className="w-5 h-5" />
                Start Recycling Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Our Collective <span className="text-accent">Impact</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Together, we're making a real difference for our planet
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-2 gradient-hero">
              <CardHeader>
                <div className="w-20 h-20 mx-auto rounded-full gradient-eco flex items-center justify-center mb-4">
                  <Leaf className="w-10 h-10 text-primary-foreground" />
                </div>
                <CardTitle className="text-4xl font-bold text-primary">12,500</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium">Tons of CO₂ Saved</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Equivalent to planting 200,000 trees
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 gradient-hero">
              <CardHeader>
                <div className="w-20 h-20 mx-auto rounded-full gradient-accent flex items-center justify-center mb-4">
                  <Recycle className="w-10 h-10 text-accent-foreground" />
                </div>
                <CardTitle className="text-4xl font-bold text-primary">2.3M</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium">Items Recycled</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Keeping waste out of landfills
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 gradient-hero">
              <CardHeader>
                <div className="w-20 h-20 mx-auto rounded-full gradient-eco flex items-center justify-center mb-4">
                  <Gift className="w-10 h-10 text-primary-foreground" />
                </div>
                <CardTitle className="text-4xl font-bold text-primary">$450K</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium">Rewards Distributed</p>
                <p className="text-sm text-muted-foreground mt-2">
                  To our amazing community members
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 gradient-eco">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-4xl lg:text-5xl font-bold text-primary-foreground">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-primary-foreground/90">
              Join thousands of users who are earning rewards while saving the planet. 
              Start your recycling journey today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" className="bg-card text-card-foreground hover:bg-card/90 text-lg shadow-glow">
                <Sparkles className="w-5 h-5" />
                Create Free Account
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary text-lg">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Recycle className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold">EcoRewards</span>
          </div>
          <p className="text-muted-foreground mb-4">
            Supporting SDG 12: Responsible Consumption and Production
          </p>
          <p className="text-sm text-muted-foreground">
            © 2025 EcoRewards. Making recycling rewarding for everyone. 🌱
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
