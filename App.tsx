import React, { useState } from "react";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import FloatingAvatars from "./components/FloatingAvatars";
import Onboarding from "./components/Onboarding";
import NodeRegistration from "./components/NodeRegistration";
import SuccessState from "./components/SuccessState";
import ClusterDashboard from "./components/ClusterDashboard";
import ClusterDetail from "./components/ClusterDetail";
import ClusterMarketplace from "./components/ClusterMarketplace";
import ContributionFlow from "./components/ContributionFlow";
import ContributionSuccess from "./components/ContributionSuccess";
import ActivityLog from "./components/ActivityLog";
import Settings from "./components/Settings";
import LoadingScreen from "./components/LoadingScreen";
import TrustHub from "./components/TrustHub";
import StartPledgeUnit from "./components/StartPledgeUnit";
import AutoInvestVault from "./components/AutoInvestVault";
import { Settings as SettingsIcon } from "lucide-react";

type AppState =
  | "landing"
  | "onboarding"
  | "registration"
  | "success"
  | "dashboard"
  | "clusterDetail"
  | "contributionFlow"
  | "contributionSuccess"
  | "activityLog"
  | "settings"
  | "joinRandom"
  | "startPledge"
  | "loadingTrustHub"
  | "trustHub"
  | "autoInvestVault";

export default function App() {
  const [currentScreen, setCurrentScreen] =
    useState<AppState>("landing");
  const [nodeData, setNodeData] = useState<{
    nodeAlias: string;
    signalRoute: string;
  } | null>(null);
  const [selectedClusterId, setSelectedClusterId] =
    useState<string>("");
  const [logoTapCount, setLogoTapCount] = useState(0);
  const [lastTapTime, setLastTapTime] = useState(0);
  const [userTrustScore, setUserTrustScore] = useState(45); // Mock trust score for demo

  const handleInitializeConnection = () => {
    setCurrentScreen("onboarding");
  };

  const handleOnboardingComplete = () => {
    setCurrentScreen("registration");
  };

  const handleOnboardingSkip = () => {
    setCurrentScreen("registration");
  };

  const handleRegistrationSubmit = (data: {
    nodeAlias: string;
    signalRoute: string;
  }) => {
    setNodeData(data);
    setCurrentScreen("success");
  };

  const handleBackToLanding = () => {
    setCurrentScreen("landing");
  };

  const handleContinueToLobby = () => {
    setCurrentScreen("dashboard");
  };

  const handleViewCluster = (clusterId: string) => {
    setSelectedClusterId(clusterId);
    setCurrentScreen("clusterDetail");
  };

  const handleBackToDashboard = () => {
    setCurrentScreen("dashboard");
  };

  const handleJoinRandom = () => {
    setCurrentScreen("joinRandom");
  };

  const handleStartPledge = () => {
    setCurrentScreen("startPledge");
  };

  const handlePledgeUnitComplete = (clusterId: string) => {
    setSelectedClusterId(clusterId);
    setCurrentScreen("clusterDetail");
  };

  const handleJoinCluster = () => {
    // Navigate to contribution flow instead of back to dashboard
    setCurrentScreen("contributionFlow");
  };

  const handleContributionSuccess = () => {
    setCurrentScreen("contributionSuccess");
  };

  const handleBackToClusterDetail = () => {
    setCurrentScreen("clusterDetail");
  };

  const handleViewActivity = () => {
    setCurrentScreen("activityLog");
  };

  const handleBackToClusterDetailFromActivity = () => {
    setCurrentScreen("clusterDetail");
  };

  const handleOpenSettings = () => {
    setCurrentScreen("settings");
  };

  const handleBackToSettings = () => {
    setCurrentScreen("settings");
  };

  const handleUpdateProfile = (data: {
    nodeAlias: string;
    signalRoute: string;
  }) => {
    setNodeData(data);
  };

  const handleMarketplaceJoinCluster = (clusterId: string) => {
    setSelectedClusterId(clusterId);
    setCurrentScreen("clusterDetail");
  };

  const handleLogoTap = () => {
    const currentTime = Date.now();

    // Reset count if more than 3 seconds have passed since last tap
    if (currentTime - lastTapTime > 3000) {
      setLogoTapCount(1);
    } else {
      setLogoTapCount((prev) => prev + 1);
    }

    setLastTapTime(currentTime);

    // Trigger Trust Hub after 5-6 taps
    if (logoTapCount >= 4 && nodeData) {
      setCurrentScreen("loadingTrustHub");
      setLogoTapCount(0); // Reset counter
    }
  };

  const handleTrustHubLoadingComplete = () => {
    setCurrentScreen("trustHub");
  };

  const handleTrustHubBack = () => {
    setCurrentScreen("dashboard");
  };

  const handleTrustHubAccess = () => {
    if (nodeData) {
      setCurrentScreen("loadingTrustHub");
    }
  };

  const handleOpenAutoInvestVault = () => {
    setCurrentScreen("autoInvestVault");
  };

  const renderNavigation = () => {
    // Don't show navigation during onboarding, loading, trust hub, or start pledge flow
    if (
      [
        "onboarding",
        "loadingTrustHub",
        "trustHub",
        "startPledge",
      ].includes(currentScreen)
    ) {
      return null;
    }

    return (
      <nav className="fixed top-0 left-0 right-0 z-50 p-4 md:p-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={handleLogoTap}
              className="w-8 h-8 md:w-10 md:h-10 rounded-lg gradient-primary flex items-center justify-center transition-transform duration-200 hover:scale-105 active:scale-95"
            >
              <span className="font-space-grotesk font-bold text-white text-lg md:text-xl">
                O
              </span>
            </button>
            <button
              onClick={handleLogoTap}
              className="font-space-grotesk font-bold text-xl md:text-2xl text-white hover:text-primary transition-colors"
            >
              OXYGEN
            </button>
          </div>

          {currentScreen === "landing" && (
            <>
              <div className="hidden md:flex items-center gap-6">
                <a
                  href="#"
                  className="font-inter text-muted-foreground hover:text-white transition-colors"
                >
                  Community
                </a>
                <a
                  href="#"
                  className="font-inter text-muted-foreground hover:text-white transition-colors"
                >
                  Features
                </a>
                <a
                  href="#"
                  className="font-inter text-muted-foreground hover:text-white transition-colors"
                >
                  About
                </a>
              </div>

              <button className="md:hidden p-2 text-white">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </>
          )}

          {(currentScreen === "dashboard" ||
            currentScreen === "clusterDetail" ||
            currentScreen === "contributionFlow" ||
            currentScreen === "contributionSuccess" ||
            currentScreen === "activityLog" ||
            currentScreen === "settings" ||
            currentScreen === "joinRandom") &&
            nodeData && (
              <div className="flex items-center gap-3">
                {currentScreen !== "settings" && (
                  <button
                    onClick={handleOpenSettings}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    <SettingsIcon className="w-4 h-4 text-white" />
                  </button>
                )}
                <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
                  <span className="font-space-grotesk font-bold text-white text-sm">
                    {nodeData.nodeAlias.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="font-inter text-white hidden md:block">
                  {nodeData.nodeAlias}
                </span>
              </div>
            )}
        </div>
      </nav>
    );
  };

  const renderLandingPage = () => (
    <>
      {/* Floating avatars background */}
      <FloatingAvatars />

      {/* Main content */}
      <main>
        <HeroSection
          onInitializeConnection={handleInitializeConnection}
        />
        <FeaturesSection />
      </main>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                  <span className="font-space-grotesk font-bold text-white">
                    O
                  </span>
                </div>
                <span className="font-space-grotesk font-bold text-xl text-white">
                  OXYGEN
                </span>
              </div>
              <p className="font-inter text-muted-foreground text-sm">
                Amplifying Nigerian communities through
                decentralized coordination.
              </p>
            </div>

            <div>
              <h4 className="font-space-grotesk font-semibold text-white mb-4">
                Community
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="font-inter text-muted-foreground hover:text-white transition-colors text-sm"
                  >
                    Lagos Hub
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="font-inter text-muted-foreground hover:text-white transition-colors text-sm"
                  >
                    Abuja Hub
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="font-inter text-muted-foreground hover:text-white transition-colors text-sm"
                  >
                    Port Harcourt Hub
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-space-grotesk font-semibold text-white mb-4">
                Resources
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="font-inter text-muted-foreground hover:text-white transition-colors text-sm"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="font-inter text-muted-foreground hover:text-white transition-colors text-sm"
                  >
                    API
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="font-inter text-muted-foreground hover:text-white transition-colors text-sm"
                  >
                    Support
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-space-grotesk font-semibold text-white mb-4">
                Connect
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="font-inter text-muted-foreground hover:text-white transition-colors text-sm"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="font-inter text-muted-foreground hover:text-white transition-colors text-sm"
                  >
                    Discord
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="font-inter text-muted-foreground hover:text-white transition-colors text-sm"
                  >
                    Telegram
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <p className="font-inter text-muted-foreground text-sm">
              © 2025 OXYGEN. Built with ❤️ for the Nigerian
              hustle.
            </p>
          </div>
        </div>
      </footer>
    </>
  );

  return (
    <div className="min-h-screen bg-background dark overflow-x-hidden">
      {renderNavigation()}

      {currentScreen === "landing" && renderLandingPage()}

      {currentScreen === "onboarding" && (
        <Onboarding
          onComplete={handleOnboardingComplete}
          onSkip={handleOnboardingSkip}
        />
      )}

      {currentScreen === "registration" && (
        <NodeRegistration
          onSubmit={handleRegistrationSubmit}
          onBack={handleBackToLanding}
        />
      )}

      {currentScreen === "success" && nodeData && (
        <SuccessState
          nodeAlias={nodeData.nodeAlias}
          onContinue={handleContinueToLobby}
        />
      )}

      {currentScreen === "dashboard" && nodeData && (
        <ClusterDashboard
          nodeAlias={nodeData.nodeAlias}
          onViewCluster={handleViewCluster}
          onJoinRandom={handleJoinRandom}
          onStartPledge={handleStartPledge}
          onTrustHubAccess={handleTrustHubAccess}
          // Add button to open Auto-Invest Vault
          extraActions={
            <button
              className="w-full mt-4 p-3 rounded-xl gradient-primary text-white font-space-grotesk font-bold text-lg shadow-lg"
              onClick={handleOpenAutoInvestVault}
            >
              Open Auto-Invest Vault
            </button>
          }
        />
      )}

      {currentScreen === "clusterDetail" && (
        <ClusterDetail
          clusterId={selectedClusterId}
          onBack={handleBackToDashboard}
          onJoinCluster={handleJoinCluster}
          onViewActivity={handleViewActivity}
        />
      )}

      {currentScreen === "contributionFlow" && (
        <ContributionFlow
          clusterId={selectedClusterId}
          onBack={handleBackToClusterDetail}
          onSuccess={handleContributionSuccess}
        />
      )}

      {currentScreen === "contributionSuccess" && (
        <ContributionSuccess
          clusterId={selectedClusterId}
          onContinue={handleBackToDashboard}
        />
      )}

      {currentScreen === "activityLog" && (
        <ActivityLog
          clusterId={selectedClusterId}
          onBack={handleBackToClusterDetailFromActivity}
        />
      )}

      {currentScreen === "settings" && nodeData && (
        <Settings
          nodeData={nodeData}
          onBack={handleBackToDashboard}
          onUpdateProfile={handleUpdateProfile}
          onViewCluster={handleViewCluster}
        />
      )}

      {currentScreen === "joinRandom" && (
        <ClusterMarketplace
          onBack={handleBackToDashboard}
          onJoinCluster={handleMarketplaceJoinCluster}
        />
      )}

      {currentScreen === "loadingTrustHub" && (
        <LoadingScreen
          onComplete={handleTrustHubLoadingComplete}
        />
      )}

      {currentScreen === "trustHub" && nodeData && (
        <TrustHub
          nodeAlias={nodeData.nodeAlias}
          onBack={handleTrustHubBack}
          // Add button to open Auto-Invest Vault from TrustHub
          extraActions={
            <button
              className="w-full mt-4 p-3 rounded-xl gradient-primary text-white font-space-grotesk font-bold text-lg shadow-lg"
              onClick={handleOpenAutoInvestVault}
            >
              Open Auto-Invest Vault
            </button>
          }
        />
      )}

      {currentScreen === "startPledge" && nodeData && (
        <StartPledgeUnit
          nodeAlias={nodeData.nodeAlias}
          onBack={handleBackToDashboard}
          onComplete={handlePledgeUnitComplete}
        />
      )}

      {currentScreen === "autoInvestVault" && nodeData && (
        <div className="max-w-md mx-auto p-4 pt-20">
          <AutoInvestVault
            nodeAlias={nodeData.nodeAlias}
            userTrustScore={userTrustScore}
            onBack={handleTrustHubBack}
          />
        </div>
      )}
    </div>
  );
}