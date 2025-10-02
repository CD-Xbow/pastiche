import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Download, Copy, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const STYLE_PRESETS = [
  { label: "None", value: "none" },
  { label: "Photorealistic", value: "photorealistic, 8k, highly detailed, professional photography" },
  { label: "Oil Painting", value: "oil painting, classical art style, rich colors, textured brushstrokes" },
  { label: "Watercolor", value: "watercolor painting, soft colors, flowing, artistic" },
  { label: "Digital Art", value: "digital art, vibrant colors, modern, detailed" },
  { label: "Anime", value: "anime style, manga, japanese animation" },
  { label: "Pop Art", value: "pop art style, bold colors, comic book, Andy Warhol inspired" },
  { label: "Pencil Sketch", value: "pencil sketch, hand-drawn, black and white, artistic" },
  { label: "Charcoal Drawing", value: "charcoal drawing, dramatic contrast, expressive strokes, fine art" },
  { label: "Ink Drawing", value: "ink drawing, pen and ink, detailed linework, black and white" },
  { label: "Crayon Art", value: "crayon drawing, textured, colorful, hand-drawn aesthetic" },
  { label: "Cross Hatch", value: "cross hatching technique, detailed shading, pen illustration" },
  { label: "Lithograph", value: "lithograph print, vintage printing technique, fine art reproduction" },
  { label: "Etching", value: "etching style, engraved, intricate detail, traditional printmaking" },
  { label: "Poster Art", value: "vintage poster art, bold graphics, screen print style" },
  { label: "Linocut", value: "linocut print, bold shapes, high contrast, block printing" },
  { label: "3D Render", value: "3d render, octane render, cinematic lighting, high quality" },
  { label: "Pixel Art", value: "pixel art, 8-bit, retro gaming style" },
];

const SIZE_PRESETS = [
  { label: "Square (1024x1024)", value: "square", width: 1024, height: 1024 },
  { label: "Portrait (1024x1536)", value: "portrait", width: 1024, height: 1536 },
  { label: "Landscape (1536x1024)", value: "landscape", width: 1536, height: 1024 },
];

export const ImageGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("none");
  const [selectedSize, setSelectedSize] = useState("square");
  const [seed, setSeed] = useState("");
  const [removeLogo, setRemoveLogo] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

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
        body: { prompt: fullPrompt }
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

      setGeneratedImage(data.imageUrl);
      toast.success("Image generated successfully!");
    } catch (error) {
      console.error('Generation error:', error);
      toast.error("Failed to generate image");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyToClipboard = async () => {
    if (!generatedImage) return;

    try {
      const response = await fetch(generatedImage);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob })
      ]);
      toast.success("Image copied to clipboard!");
    } catch (error) {
      console.error('Copy error:', error);
      toast.error("Failed to copy image");
    }
  };

  const handleDownload = (format: 'jpg' | 'png') => {
    if (!generatedImage) return;

    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `generated-image-${Date.now()}.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`Image downloaded as ${format.toUpperCase()}`);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6 h-full">
      {/* Controls Panel */}
      <Card className="p-6 bg-gradient-card border-border space-y-6 h-fit">
        <div>
          <h2 className="text-2xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
            AI Image Generator
          </h2>
          <p className="text-muted-foreground text-sm">
            Create stunning images with AI
          </p>
        </div>

        <div className="space-y-4">
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
            <Label htmlFor="style" className="text-foreground">Style Preset</Label>
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
            <Label htmlFor="seed" className="text-foreground">Seed (Optional)</Label>
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
        </div>
      </Card>

      {/* Image Display */}
      <Card className="p-6 bg-gradient-card border-border space-y-4">
        <div className="aspect-square rounded-lg bg-muted/20 border-2 border-dashed border-border flex items-center justify-center overflow-hidden">
          {generatedImage ? (
            <img
              src={generatedImage}
              alt="Generated"
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="text-center p-8">
              <Sparkles className="mx-auto h-16 w-16 text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">
                Your generated image will appear here
              </p>
            </div>
          )}
        </div>

        {generatedImage && (
          <div className="flex gap-2">
            <Button
              onClick={handleCopyToClipboard}
              variant="outline"
              className="flex-1 border-border"
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </Button>
            <Button
              onClick={() => handleDownload('jpg')}
              variant="outline"
              className="flex-1 border-border"
            >
              <Download className="mr-2 h-4 w-4" />
              JPG
            </Button>
            <Button
              onClick={() => handleDownload('png')}
              variant="outline"
              className="flex-1 border-border"
            >
              <Download className="mr-2 h-4 w-4" />
              PNG
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};
