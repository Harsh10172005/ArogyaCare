'use client';

import { useState, useContext, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { getAIResponse, getSkinDiagnosis } from './actions';
import type { SkinDiagnosisOutput } from './schema';
import { Send, User, Bot, Loader2, Image as ImageIcon, X, AlertTriangle, Lightbulb } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { LanguageContext } from '@/context/language-context';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  query: z.string().min(1, 'Please enter a message.'),
});

type Message = {
  role: 'user' | 'assistant';
  content: string | SkinDiagnosisOutput;
  imagePreview?: string;
};

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { t } = useContext(LanguageContext);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { query: '' },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) { // 4MB limit
        toast({
          variant: 'destructive',
          title: t('error'),
          description: "Image size cannot exceed 4MB.",
        });
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const fileToDataUri = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const userMessage: Message = {
      role: 'user',
      content: values.query,
      ...(imagePreview && { imagePreview: imagePreview }),
    };
    setMessages((prev) => [...prev, userMessage]);

    let result;
    if (imageFile) {
      const photoDataUri = await fileToDataUri(imageFile);
      result = await getSkinDiagnosis({ photoDataUri, description: values.query });
      if (result.response) {
        setMessages((prev) => [...prev, { role: 'assistant', content: result.response }]);
      }
    } else {
      result = await getAIResponse(values.query);
      if (result.response) {
        setMessages((prev) => [...prev, { role: 'assistant', content: result.response as string }]);
      }
    }

    if (result.error) {
      setMessages((prev) => [...prev, { role: 'assistant', content: `Error: ${result.error}` }]);
    }
    
    setIsLoading(false);
    removeImage();
    form.reset();
  }

  return (
    <Card className="w-full">
      <CardHeader className="border-b">
        <h2 className="text-xl font-semibold">{t('chatWithArogyaCareAI')}</h2>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[500px] w-full p-4">
          <div className="space-y-6">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn('flex items-start gap-3', message.role === 'user' ? 'justify-end' : 'justify-start')}
              >
                {message.role === 'assistant' && (
                  <Avatar className="h-8 w-8 bg-primary/10 text-primary">
                    <AvatarFallback><Bot className="h-5 w-5"/></AvatarFallback>
                  </Avatar>
                )}
                
                {typeof message.content === 'string' ? (
                   <div
                    className={cn(
                      'max-w-xl rounded-lg p-3 text-sm',
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    )}
                  >
                    {message.imagePreview && (
                        <Image src={message.imagePreview} alt="User upload" width={200} height={200} className="rounded-md mb-2" />
                    )}
                    {message.content}
                  </div>
                ) : (
                  <SkinDiagnosisCard response={message.content} />
                )}

                 {message.role === 'user' && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback><User className="h-5 w-5"/></AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-3 justify-start">
                 <Avatar className="h-8 w-8 bg-primary/10 text-primary">
                    <AvatarFallback><Bot className="h-5 w-5"/></AvatarFallback>
                  </Avatar>
                <div className="bg-muted rounded-lg p-3 flex items-center space-x-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>{t('thinking')}...</span>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-2">
            {imagePreview && (
              <div className="relative w-24 h-24">
                <Image src={imagePreview} alt="Selected preview" layout="fill" className="rounded-md object-cover" />
                <Button variant="destructive" size="icon" className="absolute -top-2 -right-2 h-6 w-6 rounded-full" onClick={removeImage}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
            <div className="flex w-full items-start space-x-2">
              <FormField
                control={form.control}
                name="query"
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormControl>
                      <Textarea placeholder={t('chatPlaceholder')} {...field} disabled={isLoading} rows={1} className="min-h-0"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="button" variant="outline" size="icon" onClick={() => fileInputRef.current?.click()} disabled={isLoading}>
                <ImageIcon className="h-5 w-5" />
              </Button>
              <Input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/png, image/jpeg, image/webp" />
              <Button type="submit" disabled={isLoading} size="icon">
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </form>
        </Form>
      </CardFooter>
    </Card>
  );
}

function SkinDiagnosisCard({ response }: { response: SkinDiagnosisOutput }) {
  return (
    <Card className="max-w-xl border-blue-200 bg-blue-50/50">
      <CardHeader>
        <h3 className="text-lg font-semibold text-blue-900">AI Skin Analysis Result</h3>
        <p className="text-2xl font-bold text-blue-700">{response.disease}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2"><Lightbulb className="h-5 w-5"/> Suggested Remedies</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-blue-700/90">
            {response.remedies.map((remedy, i) => <li key={i}>{remedy}</li>)}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2"><AlertTriangle className={cn("h-5 w-5", response.isSerious ? 'text-red-500' : 'text-amber-500')} /> Recommendation</h4>
          <p className={cn("text-sm p-3 rounded-md", response.isSerious ? 'bg-red-100 border-red-200 text-red-900' : 'bg-amber-100 border-amber-200 text-amber-900')}>{response.recommendation}</p>
        </div>
      </CardContent>
    </Card>
  );
}