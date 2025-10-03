import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, Sparkles, Upload, Palette } from "lucide-react";

const Help = () => {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Studio
            </Button>
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Help & Documentation
          </h1>
          <p className="text-muted-foreground text-lg">
            Everything you need to know about Pastiche AI Studio
          </p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Getting Started
              </CardTitle>
              <CardDescription>
                Quick introduction to using Pastiche AI Studio
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Pastiche AI Studio offers two powerful modes for creating stunning images:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li><strong>Generate:</strong> Create images from text descriptions</li>
                <li><strong>Edit Image:</strong> Upload an image and transform it with AI</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Style Presets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="photographic">
                  <AccordionTrigger>Photographic Styles</AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    <p><strong>Cinematic:</strong> Dramatic lighting with film-like quality and rich colors</p>
                    <p><strong>Portrait:</strong> Professional portrait photography with soft focus</p>
                    <p><strong>Product:</strong> Clean, commercial-style product photography</p>
                    <p><strong>Macro:</strong> Extreme close-up with fine detail emphasis</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="artistic">
                  <AccordionTrigger>Artistic Styles</AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    <p><strong>Oil Painting:</strong> Rich, textured brushstrokes and vibrant colors</p>
                    <p><strong>Watercolor:</strong> Soft, flowing washes with organic edges</p>
                    <p><strong>Digital Art:</strong> Modern digital illustration with clean lines</p>
                    <p><strong>Fantasy:</strong> Magical, ethereal aesthetic with vibrant colors</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="printing">
                  <AccordionTrigger>Printing Styles</AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    <p><strong>Lithograph:</strong> Classic stone printing technique with flat colors</p>
                    <p><strong>Etching:</strong> Fine line work with cross-hatching details</p>
                    <p><strong>Poster Art:</strong> Bold, graphic design with limited color palette</p>
                    <p><strong>Linocut:</strong> Relief printing with bold contrasts and carved aesthetic</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="drawing">
                  <AccordionTrigger>Drawing Styles</AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    <p><strong>Crayon:</strong> Waxy, textured strokes with vibrant colors</p>
                    <p><strong>Charcoal:</strong> Soft, smudged blacks and grays with depth</p>
                    <p><strong>Ink Drawing:</strong> Clean, precise lines with pen-like quality</p>
                    <p><strong>Cross Hatch:</strong> Traditional shading using intersecting lines</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="cartoon">
                  <AccordionTrigger>Cartoon Styles</AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    <p><strong>Anime:</strong> Japanese animation style with expressive characters</p>
                    <p><strong>Pop Art:</strong> Bold colors and comic book aesthetic</p>
                    <p><strong>Comic Book:</strong> Dynamic panels with speech bubbles and action</p>
                    <p><strong>Cartoon:</strong> Playful, exaggerated features and bright colors</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Image Editing Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Style Transfer</h3>
                <p className="text-muted-foreground">
                  Upload an image and describe a style (e.g., "make it look like a watercolor painting") 
                  to transform it while keeping the original composition.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Adding Elements</h3>
                <p className="text-muted-foreground">
                  Describe what you want to add (e.g., "add a sunset in the background" or "put the person 
                  in a futuristic city") to enhance your uploaded image.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Image Variations</h3>
                <p className="text-muted-foreground">
                  Use prompts like "create a variation of this image" or "reimagine this scene" to generate 
                  creative alternatives based on your upload.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Best Practices</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h3 className="font-semibold mb-1">Be Specific</h3>
                <p className="text-muted-foreground text-sm">
                  Detailed prompts yield better results. Include subject, setting, style, mood, and lighting.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-1">Use Style Presets</h3>
                <p className="text-muted-foreground text-sm">
                  Select a style preset to give the AI clear direction about the aesthetic you want.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-1">Experiment</h3>
                <p className="text-muted-foreground text-sm">
                  Try different prompts and styles. Small wording changes can produce very different results.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-1">Image Quality</h3>
                <p className="text-muted-foreground text-sm">
                  For editing mode, upload high-quality images for best results. Supported formats: JPG, PNG, WebP.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Help;
