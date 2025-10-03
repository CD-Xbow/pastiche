import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Loader2, Sparkles, HelpCircle } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { STYLE_PRESETS, SIZE_PRESETS } from "./StylePresets";

interface GenerateTabProps {
  onImageGenerated: (url: string) => void;
}

export const GenerateTab = ({ onImageGenerated }: GenerateTabProps) => {
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("none");
  const [selectedSize, setSelectedSize] = useState("square");
  const [seed, setSeed] = useState("");
  const [removeLogo, setRemoveLogo] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    setIsGenerating(true);
    try {
      const fullPrompt = selectedStyle && selectedStyle !== "none"
        ? `${prompt}, ${selectedStyle}${removeLogo ? ', no text, no watermarks, no logos' : ''}`
        : `${prompt}${removeLogo ? ', no text, no watermarks, no logos' : ''}`;

      const { data, error } = await supabase.functions.invoke('generate-image', {
        body: { prompt: fullPrompt, mode: 'generate' }
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
      toast.success("Image generated successfully!");
    } catch (error) {
      console.error('Generation error:', error);
      toast.error("Failed to generate image");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="p-6 bg-gradient-card border-border space-y-4">
      <div>
        <Label htmlFor="prompt" className="text-foreground">Prompt</Label>
        <Textarea
          id="prompt"
          placeholder="Describe the image you want to create..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="mt-2 min-h-[120px] bg-background/50 border-border"
        />
      </div>

      <div>
        <div className="flex items-center gap-2 mb-2">
          <Label htmlFor="style" className="text-foreground">Style Preset</Label>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Apply a visual style to your image (photographic, artistic, etc.)</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <Select value={selectedStyle} onValueChange={setSelectedStyle}>
          <SelectTrigger id="style" className="mt-2 bg-background/50 border-border">
            <SelectValue placeholder="Choose a style" />
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

      <div>
        <Label htmlFor="size" className="text-foreground">Image Size</Label>
        <Select value={selectedSize} onValueChange={setSelectedSize}>
          <SelectTrigger id="size" className="mt-2 bg-background/50 border-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SIZE_PRESETS.map((size) => (
              <SelectItem key={size.value} value={size.value}>
                {size.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-2">
          <Label htmlFor="seed" className="text-foreground">Seed (Optional)</Label>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Use the same seed number to reproduce similar results</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <Input
          id="seed"
          type="number"
          placeholder="Random seed for reproducibility"
          value={seed}
          onChange={(e) => setSeed(e.target.value)}
          className="mt-2 bg-background/50 border-border"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="removeLogo"
          checked={removeLogo}
          onChange={(e) => setRemoveLogo(e.target.checked)}
          className="w-4 h-4 rounded border-border"
        />
        <Label htmlFor="removeLogo" className="text-foreground cursor-pointer">
          Remove logos & watermarks
        </Label>
      </div>

      <Button
        onClick={handleGenerate}
        disabled={isGenerating}
        className="w-full bg-gradient-primary hover:opacity-90 text-white font-semibold h-12"
      >
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-5 w-5" />
            Generate Image
          </>
        )}
      </Button>
    </Card>
  );
};
