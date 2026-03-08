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
import { SWRConfig } from "swr";
import { LiveRadioData } from "@/app/types";

interface AppProviderprops {
  children: React.ReactNode;
  initialLiveRadioData?: LiveRadioData;
}


const AppProvider = ({ children, initialLiveRadioData }: AppProviderprops) => {
  return (
    <SWRConfig value={{ fallback: { liveRadioData: initialLiveRadioData } }}>
      <AudioProvider>
        <SpinnerProvider>
          <MixCloudProvider>
            <Suspense fallback={<div className="text-white">Loading search...</div>}>
              <SearchProvider>
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
        </SpinnerProvider>
      </AudioProvider>
    </SWRConfig>
  );
};

export default AppProvider;