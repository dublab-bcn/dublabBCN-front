"use client";
import {useState} from 'react';

type DescriptionProps = {
  description: string | { __html: string };
};

const Description = ({ description }: DescriptionProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const isHtmlObject = typeof description !== 'string' && description && '__html' in description;
    
    return (
      <div className="flex flex-col items-start">
        <div
          className={`mt-2 md:mt-0 text-sm sm:w-fit sm:pr-0 transition-all duration-300 
          ${isExpanded ? '' : 'line-clamp-6'} md:line-clamp-none`}
        >
          {isHtmlObject ? (
            // Render as HTML if it's the object type
            <div dangerouslySetInnerHTML={description} />
          ) : (
            // Render as plain text if it's a string
            <p>{description}</p>
          )}
        </div>
        
        <button 
          onClick={() => setIsExpanded(!isExpanded)} 
          className="mt-2 text-sm font-bold text-gray-500 underline md:hidden hover:text-gray-700"
        >
          {isExpanded ? "Mostra menys" : "Mostra més"}
        </button>
      </div>
    );
}

export default Description;