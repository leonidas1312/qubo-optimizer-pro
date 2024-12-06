import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { BasicInfoForm } from "@/components/upload/BasicInfoForm";
import { FileUploadSection } from "@/components/upload/FileUploadSection";
import { AnalyzerHeader } from "@/components/upload/AnalyzerHeader";
import { AnalyzerButton } from "@/components/upload/AnalyzerButton";
import { AnalysisResults } from "@/components/upload/AnalysisResults";
import { useSession } from '@supabase/auth-helpers-react';

export default function UploadSolver() {
  const [originalCode, setOriginalCode] = useState("");
  const [transformedCode, setTransformedCode] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState("");
  const [verificationSteps, setVerificationSteps] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showCode, setShowCode] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressInterval = useRef<number | NodeJS.Timeout>();
  const session = useSession();

  const analyzeSolver = async () => {
    if (!session) {
      toast.error("Please log in to analyze solvers");
      return;
    }

    if (!originalCode || !description) {
      toast.error("Please provide both code and description");
      return;
    }

    setIsAnalyzing(true);
    setAnalysis("");
    setVerificationSteps("");
    setTransformedCode("");
    setProgress(0);
    
    try {
      const response = await fetch('https://zddqnxesbhbvmdcyqpuw.supabase.co/functions/v1/analyze-solver', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ 
          code: originalCode,
          description: description
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to analyze solver');
      }

      progressInterval.current = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) return prev;
          return prev + 1;
        });
      }, 500);

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No reader available');

      let currentSection = '';
      let codeBuffer = '';
      let isInCodeBlock = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = new TextDecoder().decode(value);
        const lines = text.split('\n');

        for (const line of lines) {
          if (line.trim() === '') continue;
          if (line.startsWith('data: ')) {
            try {
              const chunk = JSON.parse(line.slice(5));
              if (chunk.choices?.[0]?.delta?.content) {
                const content = chunk.choices[0].delta.content;
                
                if (content.includes('# Analysis')) {
                  currentSection = 'analysis';
                  continue;
                } else if (content.includes('# Transformed Code')) {
                  currentSection = 'code';
                  continue;
                } else if (content.includes('# Verification Steps')) {
                  currentSection = 'verification';
                  continue;
                }

                if (content.includes('```python')) {
                  isInCodeBlock = true;
                  continue;
                } else if (content.includes('```')) {
                  isInCodeBlock = false;
                  if (currentSection === 'code') {
                    setTransformedCode(codeBuffer);
                  }
                  continue;
                }

                switch (currentSection) {
                  case 'analysis':
                    setAnalysis(prev => prev + content);
                    break;
                  case 'code':
                    if (isInCodeBlock) {
                      codeBuffer += content;
                    }
                    break;
                  case 'verification':
                    setVerificationSteps(prev => prev + content);
                    break;
                }
              }
            } catch (e) {
              console.error('Error parsing chunk:', e);
            }
          }
        }
      }

      toast.success("Analysis completed successfully");
    } catch (error) {
      console.error("Error analyzing solver:", error);
      toast.error(error instanceof Error ? error.message : "Failed to analyze solver");
    } finally {
      clearInterval(progressInterval.current);
      setProgress(100);
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold gradient-text">Upload Solver</h1>
        <p className="text-muted-foreground mt-2">
          Transform your optimization code into a platform-compatible solver
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="space-y-6">
            <AnalyzerHeader showCode={showCode} setShowCode={setShowCode} />

            {showCode ? (
              <FileUploadSection
                originalCode={originalCode}
                setOriginalCode={setOriginalCode}
                setSelectedFile={setSelectedFile}
              />
            ) : (
              <BasicInfoForm
                name={name}
                setName={setName}
                description={description}
                setDescription={setDescription}
              />
            )}

            <AnalyzerButton
              isAnalyzing={isAnalyzing}
              disabled={isAnalyzing || !originalCode}
              onClick={analyzeSolver}
              progress={progress}
            />
          </div>
        </Card>

        <Card className="p-6">
          <AnalysisResults
            analysis={analysis}
            transformedCode={transformedCode}
            setTransformedCode={setTransformedCode}
            verificationSteps={verificationSteps}
          />
        </Card>
      </div>
    </div>
  );
}