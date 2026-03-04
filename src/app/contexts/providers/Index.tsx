"use client";

import { Suspense } from "react";
import AudioProvider from "../AudioContext";
import { RadioDataProvider } from "../RadioDataContext";
import { SpinnerProvider } from "../SpinnerContext";
import { SlideOverProvider } from "../SlideOverContext";
import { MixCloudProvider } from "../MixCloudContext"; 
import { SearchProvider } from "../SearchContext";
import Header from "@/app/components/Header/Header";
import Footer from "@/app/components/Footer/Footer";
import QueueDisplay from "@/app/components/MixCloudQueue/MixCloudQueu";
import ThreeShaderOverlay from "@/app/components/Mascot/ThreeJsEnv"
import { MascotProvider } from '@/app/contexts/MascotContext';
import Mascot from '@/app/components/Mascot/Mascot';
import MascotToggle from '@/app/components/Mascot/MascotToggle';
import MascotControls from '@/app/components/Mascot/MascotControls';

interface AppProviderprops {
  children: React.ReactNode;
}


const AppProvider = ({ children }: AppProviderprops) => {
  return (
    <AudioProvider>
      <SpinnerProvider>
        <MascotProvider>
          <MixCloudProvider>
            <Suspense fallback={<div className="text-white">Loading search...</div>}>
              <SearchProvider>
                <ThreeShaderOverlay />
                <Mascot />
                <MascotControls />  
                <RadioDataProvider>
                  <SlideOverProvider>
                  <Header />
                  {children}
                  <QueueDisplay />
                  <Footer />
                  </SlideOverProvider>
                </RadioDataProvider>
              </SearchProvider>
            </Suspense>
          </MixCloudProvider>
        </MascotProvider>
      </SpinnerProvider>
    </AudioProvider>
  );
};

export default AppProvider;