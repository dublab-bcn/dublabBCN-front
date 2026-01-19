"use client";

import RadioBar from "@/app/components/RadioBar/RadioBar";
import AudioProvider from "../AudioContext";
import { RadioDataProvider } from "../RadioDataContext";
import { SpinnerProvider } from "../SpinnerContext";
import { SlideOverProvider } from "../SlideOverContext";
import { MixCloudProvider } from "../MixCloudContext"; 
import Header from "@/app/components/Header/Header";
import Footer from "@/app/components/Footer/Footer";
import QueueDisplay from "@/app/components/MixCloudQueue/MixCloudQueu";
import { MascotProvider } from '@/app/contexts/MascotContext';
import Mascot from '@/app/components/Mascot/Mascot';
import MascotToggle from '@/app/components/Mascot/MascotToggle';
import MascotControls from '@/app/components/Mascot/MascotControls';

interface AppProviderprops {
  children: React.ReactNode;
}


const AppProvider = ({ children }: AppProviderprops) => {
  return (
    <MascotProvider>
      <AudioProvider>
        <SpinnerProvider>
          <MixCloudProvider>
            <RadioDataProvider>
              <Mascot />
              <MascotControls />  
              <RadioBar />
              <SlideOverProvider>
                <Header />
                {children}
                <QueueDisplay />
                <Footer />
              </SlideOverProvider>
            </RadioDataProvider>
          </MixCloudProvider>
        </SpinnerProvider>
      </AudioProvider>
    </MascotProvider>
    
  );
};

export default AppProvider;
