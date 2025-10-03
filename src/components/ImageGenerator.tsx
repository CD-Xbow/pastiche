import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GenerateTab } from "./image-generator/GenerateTab";
import { EditTab } from "./image-generator/EditTab";
import { ImageDisplay } from "./image-generator/ImageDisplay";

export const ImageGenerator = () => {
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleImageGenerated = (url: string) => {
    setGeneratedImage(url);
    setIsGenerating(false);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
          AI Image Studio
        </h1>
        <p className="text-muted-foreground">
          Create stunning images from text or edit existing images with AI
        </p>
      </div>

      <Tabs defaultValue="generate" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
          <TabsTrigger value="generate">Generate</TabsTrigger>
          <TabsTrigger value="edit">Edit Image</TabsTrigger>
        </TabsList>

        <div className="grid lg:grid-cols-2 gap-6 mt-6">
          <div>
            <TabsContent value="generate" className="mt-0">
              <GenerateTab onImageGenerated={handleImageGenerated} />
            </TabsContent>

            <TabsContent value="edit" className="mt-0">
              <EditTab onImageGenerated={handleImageGenerated} />
            </TabsContent>
          </div>

          <ImageDisplay imageUrl={generatedImage} isGenerating={isGenerating} />
        </div>
      </Tabs>
    </div>
  );
};
