import { Card } from "@/components/ui/card";
import { InlineMath } from 'react-katex';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

interface TechnicalDetails {
  implementation: string[];
  parameters: string[];
  complexity: string;
}

interface AlgorithmCardProps {
  title: string;
  description: string;
  features: string[];
  technicalDetails: TechnicalDetails;
  formula: string;
  example: string;
}

export const AlgorithmCard = ({
  title,
  description,
  features,
  technicalDetails,
  formula,
  example
}: AlgorithmCardProps) => {
  return (
    <Card className="p-6 animate-fade-in">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-3">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {features.map((feature, index) => (
            <Badge key={index} variant="secondary">
              {feature}
            </Badge>
          ))}
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="implementation">
            <AccordionTrigger>Implementation Details</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc pl-6 space-y-2">
                {technicalDetails.implementation.map((detail, index) => (
                  <li key={index} className="text-muted-foreground">
                    {detail}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="parameters">
            <AccordionTrigger>Parameters</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc pl-6 space-y-2">
                {technicalDetails.parameters.map((param, index) => (
                  <li key={index} className="text-muted-foreground">
                    {param}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="formula">
            <AccordionTrigger>Mathematical Formulation</AccordionTrigger>
            <AccordionContent>
              <div className="p-4 bg-muted rounded-md">
                <InlineMath>{formula}</InlineMath>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="example">
            <AccordionTrigger>Example</AccordionTrigger>
            <AccordionContent>
              <pre className="p-4 bg-muted rounded-md whitespace-pre-wrap">
                {example}
              </pre>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="complexity">
            <AccordionTrigger>Computational Complexity</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">{technicalDetails.complexity}</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </Card>
  );
};