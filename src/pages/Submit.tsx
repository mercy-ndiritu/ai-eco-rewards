import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Nav from "@/components/Nav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, Upload, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";

const Submit = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [verification, setVerification] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUserId(session.user.id);
      }
    });
  }, [navigate]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setVerification(null);
    }
  };

  const handleUploadAndVerify = async () => {
    if (!selectedFile || !userId) return;

    setUploading(true);
    setVerifying(true);

    try {
      // Upload to storage
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${userId}/${Date.now()}.${fileExt}`;
      
      const { error: uploadError, data } = await supabase.storage
        .from('recyclable-images')
        .upload(fileName, selectedFile, {
          contentType: selectedFile.type,
          upsert: false,
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('recyclable-images')
        .getPublicUrl(fileName);

      setUploading(false);
      toast.success("Image uploaded successfully!");

      // Verify with AI
      const { data: verifyData, error: verifyError } = await supabase.functions.invoke(
        'verify-recyclable',
        { body: { imageUrl: publicUrl } }
      );

      if (verifyError) throw verifyError;

      if (!verifyData.recyclable) {
        toast.error("This item doesn't appear to be recyclable. Please try another item.");
        setVerifying(false);
        return;
      }

      setVerification(verifyData);
      
      // Save to database
      const { error: dbError } = await supabase
        .from('recycling_submissions')
        .insert({
          user_id: userId,
          image_url: publicUrl,
          item_type: verifyData.item_type,
          material_category: verifyData.material_category,
          points_earned: verifyData.points,
          co2_saved_kg: verifyData.co2_saved_kg,
          ai_confidence: verifyData.confidence,
        });

      if (dbError) throw dbError;

      // Update user profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('total_points, items_recycled, co2_saved_kg')
        .eq('id', userId)
        .single();

      if (profileData) {
        const newCo2 = parseFloat(profileData.co2_saved_kg.toString()) + parseFloat(verifyData.co2_saved_kg.toString());
        await supabase
          .from('profiles')
          .update({
            total_points: profileData.total_points + verifyData.points,
            items_recycled: profileData.items_recycled + 1,
            co2_saved_kg: newCo2,
          })
          .eq('id', userId);
      }

      // Create points transaction
      await supabase
        .from('points_transactions')
        .insert({
          user_id: userId,
          amount: verifyData.points,
          transaction_type: 'earned',
          description: `Recycled ${verifyData.item_type}`,
        });

      toast.success(`Great! You earned ${verifyData.points} points! 🎉`);

    } catch (error: any) {
      console.error('Error:', error);
      toast.error(error.message || "Failed to process image");
    } finally {
      setVerifying(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setVerification(null);
  };

  return (
    <div className="min-h-screen gradient-hero">
      <Nav />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-2">Submit Recyclable Item</h1>
        <p className="text-muted-foreground text-lg mb-8">
          Upload a photo of your recyclable materials to earn points!
        </p>

        <Card className="shadow-eco">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="w-6 h-6 text-primary" />
              Upload & Verify
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {!verification ? (
              <>
                <div className="space-y-4">
                  <Label htmlFor="image-upload">
                    Select an image of your recyclable item
                  </Label>
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    disabled={uploading || verifying}
                  />
                </div>

                {previewUrl && (
                  <div className="space-y-4">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full max-h-96 object-contain rounded-lg border-2 border-border"
                    />
                    <Button
                      onClick={handleUploadAndVerify}
                      disabled={uploading || verifying}
                      variant="eco"
                      className="w-full"
                      size="lg"
                    >
                      {uploading ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Uploading...
                        </>
                      ) : verifying ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Verifying with AI...
                        </>
                      ) : (
                        <>
                          <Upload className="w-5 h-5 mr-2" />
                          Upload & Verify
                        </>
                      )}
                    </Button>
                  </div>
                )}

                <div className="bg-secondary/50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Accepted Materials:</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Plastic bottles and containers</li>
                    <li>• Glass bottles and jars</li>
                    <li>• Paper and cardboard</li>
                    <li>• Aluminum cans</li>
                    <li>• Metal items</li>
                  </ul>
                </div>
              </>
            ) : (
              <div className="space-y-6">
                <div className="text-center p-6 bg-accent/10 rounded-lg border-2 border-accent">
                  <CheckCircle2 className="w-16 h-16 text-accent mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Item Verified!</h3>
                  <p className="text-lg mb-4">{verification.item_type}</p>
                  <div className="grid grid-cols-2 gap-4 text-left max-w-sm mx-auto">
                    <div>
                      <p className="text-sm text-muted-foreground">Category</p>
                      <p className="font-semibold capitalize">{verification.material_category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Points Earned</p>
                      <p className="font-semibold text-accent">+{verification.points}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">CO₂ Saved</p>
                      <p className="font-semibold">{verification.co2_saved_kg} kg</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">AI Confidence</p>
                      <p className="font-semibold">{verification.confidence}%</p>
                    </div>
                  </div>
                </div>

                {verification.tips && (
                  <div className="bg-secondary/50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Recycling Tips:</h3>
                    <p className="text-sm text-muted-foreground">{verification.tips}</p>
                  </div>
                )}

                <div className="flex gap-4">
                  <Button onClick={handleReset} variant="outline" className="flex-1">
                    Submit Another
                  </Button>
                  <Button onClick={() => navigate("/dashboard")} variant="hero" className="flex-1">
                    View Dashboard
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Submit;
