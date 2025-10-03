import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Upload, Wand2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { STYLE_PRESETS } from "./StylePresets";

interface EditTabProps {
  onImageGenerated: (url: string) => void;
}

export const EditTab = ({ onImageGenerated }: EditTabProps) => {
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("none");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error("Please upload an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
      toast.success("Image uploaded!");
    };
    reader.readAsDataURL(file);
  };

  const handleEdit = async () => {
    if (!uploadedImage) {
      toast.error("Please upload an image first");
      return;
    }

    if (!prompt.trim()) {
      toast.error("Please describe what changes you want");
      return;
    }

    setIsGenerating(true);
    try {
      const fullPrompt = selectedStyle && selectedStyle !== "none"
        ? `${prompt}, ${selectedStyle}`
        : prompt;

      const { data, error } = await supabase.functions.invoke('generate-image', {
        body: { 
          prompt: fullPrompt, 
          mode: 'edit',
          imageUrl: uploadedImage 
        }
      });

      if (error) throw error;

      if (data.error) {
        if (data.error.includes('Rate limit')) {
          toast.error('Rate limit reached. Please wait a moment and try again.');
        } else if (data.error.includes('Payment required')) {
          toast.error('Credits required. Please add credits to continue.');
        } else {
          toast.error(data.error);
        }
        return;
      }

      onImageGenerated(data.imageUrl);
      toast.success("Image edited successfully!");
    } catch (error) {
      console.error('Edit error:', error);
      toast.error("Failed to edit image");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="p-6 bg-gradient-card border-border space-y-4">
      <div>
        <Label htmlFor="upload" className="text-foreground">Upload Image</Label>
        <div className="mt-2 border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
          <input
            id="upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <label htmlFor="upload" className="cursor-pointer">
            {uploadedImage ? (
              <div className="space-y-2">
                <img src={uploadedImage} alt="Upload preview" className="max-h-48 mx-auto rounded-lg" />
                <p className="text-sm text-muted-foreground">Click to change image</p>
              </div>
            ) : (
              <div className="space-y-2">
                <Upload className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <p className="text-muted-foreground">Click to upload an image</p>
                <p className="text-xs text-muted-foreground">PNG, JPG, WEBP up to 10MB</p>
              </div>
            )}
          </label>
        </div>
      </div>

      <div>
        <Label htmlFor="edit-prompt" className="text-foreground">Edit Instructions</Label>
        <Textarea
          id="edit-prompt"
          placeholder="Describe what you want to change (e.g., 'add a sunset', 'make it look like a watercolor', 'change background to a forest')"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="mt-2 min-h-[120px] bg-background/50 border-border"
        />
      </div>

      <div>
        <Label htmlFor="edit-style" className="text-foreground">Style Transfer (Optional)</Label>
        <Select value={selectedStyle} onValueChange={setSelectedStyle}>
          <SelectTrigger id="edit-style" className="mt-2 bg-background/50 border-border">
            <SelectValue placeholder="Apply a style" />
          </SelectTrigger>
          <SelectContent>
            {STYLE_PRESETS.map((style) => (
              <SelectItem key={style.value} value={style.value}>
                {style.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        onClick={handleEdit}
        disabled={isGenerating || !uploadedImage}
        className="w-full bg-gradient-primary hover:opacity-90 text-white font-semibold h-12"
      >
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Editing...
          </>
        ) : (
          <>
            <Wand2 className="mr-2 h-5 w-5" />
            Edit Image
          </>
        )}
      </Button>
    </Card>
  );
};
