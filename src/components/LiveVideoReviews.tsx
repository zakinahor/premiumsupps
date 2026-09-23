import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Star,
  Play,
  Pause,
  Check,
  X,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Maximize2
} from 'lucide-react';

export interface VideoReviewItem {
  id: number;
  customer: string;
  location: string;
  product: string;
  title: string;
  quote: string;
  poster: string;
  videoUrl: string;
}

interface LiveVideoReviewsProps {
  onViewAllReviews?: () => void;
}

export const LiveVideoReviews: React.FC<LiveVideoReviewsProps> = ({ onViewAllReviews }) => {
  const [activeVideo, setActiveVideo] = useState<VideoReviewItem | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [showControls, setShowControls] = useState<boolean>(true);
  const [controlsTimeout, setControlsTimeout] = useState<NodeJS.Timeout | null>(null);

  const modalVideoRef = useRef<HTMLVideoElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  const videoReviews: VideoReviewItem[] = [
    {
      id: 1,
      customer: 'Jake T.',
      location: 'Bondi, NSW',
      product: 'Creatine HCL 150g',
      title: 'Most cost-effective Creatine HCL on the market',
      quote:
        'Started taking Creatine HCL 150g. Switching from monohydrate to this, zero difference in performance, incredible value for money, 1g serving size is super easy.',
      poster: '/videos/video-1-poster.jpg',
      videoUrl:
        'https://cdn.shopify.com/videos/c/o/v/b9d2b8aa2b1244febfaef68613b0aa33.mp4',
    },
    {
      id: 2,
      customer: 'Sam M.',
      location: 'Melbourne, VIC',
      product: 'Micronised Creatine 200 Mesh',
      title: 'Dissolves completely with zero grit',
      quote:
        'The 200-mesh micronised creatine is superior to anything at the local chemist. No stomach cramps, dissolves in cold water instantly.',
      poster: '/videos/creatine-poster.jpg',
      videoUrl:
        'https://cdn.shopify.com/videos/c/o/v/c402cc5490214ac8aef9219e34096e63.mp4',
    },
    {
      id: 3,
      customer: 'Liam K.',
      location: 'Brisbane, QLD',
      product: 'Anabolic Stack',
      title: 'Best stack value in Australia',
      quote:
        'Stacking the night warrior with pure creatine and shilajit. Recovery has doubled and sleep is uninterrupted. 50% bundle savings are legit.',
      poster: '/videos/video-3-poster.jpg',
      videoUrl:
        'https://cdn.shopify.com/videos/c/o/v/adfa69546af34dca88b7c2017c6a31f7.mp4',
    },
    {
      id: 4,
      customer: 'Courtney B.',
      location: 'Perth, WA',
      product: 'Protein Water Passionfruit',
      title: 'Refreshing, zero milky texture',
      quote:
        'Can not stand heavy milky whey after summer training. Protein water is light, tastes like real passionfruit and hits 25g protein per serve.',
      poster: '/videos/video-4-poster.jpg',
      videoUrl:
        'https://cdn.shopify.com/videos/c/o/v/efaf8b1f14b547b9b173a947c7620216.mp4',
    },
    {
      id: 5,
      customer: 'Marcus H.',
      location: 'Gold Coast, QLD',
      product: 'Bacteriostatic Water 30ml',
      title: 'Pharmacy grade quality with HPLC certs',
      quote:
        'Clean vials, sterile, benzyl alcohol exact 0.9%. Always delivered in 2 business days via Australia Post Express.',
      poster: '/videos/video-5-poster.jpg',
      videoUrl:
        'https://cdn.shopify.com/videos/c/o/v/abb1dc84470641f1b81425fa816d4ae9.mp4',
    },
    {
      id: 6,
      customer: 'Dave P.',
      location: 'Adelaide, SA',
      product: 'Himalayan Shilajit Resin',
      title: 'Clean energy and mental clarity',
      quote:
        'Mineral-rich resin with full heavy metals lab test verification. Gives me steady morning drive without caffeine dependency.',
      poster: '/videos/video-6-poster.jpg',
      videoUrl:
        'https://cdn.shopify.com/videos/c/o/v/5a932166e02e4887bfe39887ee5c7f3c.mp4',
    },
  ];

  // Open Pop-up modal for selected video
  const handleOpenPopup = (rev: VideoReviewItem) => {
    setActiveVideo(rev);
    setIsPlaying(true);
    setCurrentTime(0);
    setShowControls(true);
  };

  // Close Pop-up modal
  const handleClosePopup = useCallback(() => {
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
    }
    setActiveVideo(null);
  }, []);

  // Navigate to previous video
  const handlePrevVideo = useCallback(() => {
    if (!activeVideo) return;
    const currentIndex = videoReviews.findIndex((v) => v.id === activeVideo.id);
    const prevIndex = (currentIndex - 1 + videoReviews.length) % videoReviews.length;
    setActiveVideo(videoReviews[prevIndex]);
    setCurrentTime(0);
    setIsPlaying(true);
  }, [activeVideo, videoReviews]);

  // Navigate to next video
  const handleNextVideo = useCallback(() => {
    if (!activeVideo) return;
    const currentIndex = videoReviews.findIndex((v) => v.id === activeVideo.id);
    const nextIndex = (currentIndex + 1) % videoReviews.length;
    setActiveVideo(videoReviews[nextIndex]);
    setCurrentTime(0);
    setIsPlaying(true);
  }, [activeVideo, videoReviews]);

  // Toggle play/pause
  const togglePlayPause = () => {
    if (!modalVideoRef.current) return;
    if (isPlaying) {
      modalVideoRef.current.pause();
      setIsPlaying(false);
    } else {
      modalVideoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  // Toggle mute
  const toggleMute = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!modalVideoRef.current) return;
    const nextMuted = !isMuted;
    modalVideoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  // Format time (mm:ss)
  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Handle progress bar scrubbing
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || !modalVideoRef.current || !duration) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = percentage * duration;
    modalVideoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Auto-hide controls during playback
  const resetControlsTimeout = () => {
    setShowControls(true);
    if (controlsTimeout) clearTimeout(controlsTimeout);
    const t = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3500);
    setControlsTimeout(t);
  };

  // Keyboard shortcut listener (Esc, Arrows, Space)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeVideo) return;
      if (e.key === 'Escape') {
        handleClosePopup();
      } else if (e.key === 'ArrowLeft') {
        handlePrevVideo();
      } else if (e.key === 'ArrowRight') {
        handleNextVideo();
      } else if (e.key === ' ') {
        e.preventDefault();
        togglePlayPause();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeVideo, handleClosePopup, handleNextVideo, handlePrevVideo, isPlaying]);

  // Autoplay and video source change handler
  useEffect(() => {
    if (activeVideo && modalVideoRef.current) {
      modalVideoRef.current.currentTime = 0;
      const playPromise = modalVideoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // Autoplay with audio was prevented, fallback to muted autoplay
            if (modalVideoRef.current) {
              modalVideoRef.current.muted = true;
              setIsMuted(true);
              modalVideoRef.current.play().catch(() => {});
            }
          });
      }
    }
  }, [activeVideo]);

  const activeIndex = activeVideo
    ? videoReviews.findIndex((v) => v.id === activeVideo.id)
    : 0;

  return (
    <section id="live-reviews" className="py-14 sm:py-20 bg-[#f5f5f5] border-b border-stone-200 overflow-hidden font-['Jost',sans-serif]">
      <div className="max-w-[1410px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column Text Header */}
          <div className="lg:col-span-4 space-y-4">
            <span className="font-['Instrument_Sans'] text-xs sm:text-sm font-semibold text-[#e75924] uppercase tracking-widest block">
              LIVE REVIEWS
            </span>

            <h2 className="font-['Instrument_Sans'] text-3xl sm:text-4xl font-extrabold text-[#111111] uppercase tracking-tight leading-[1.15]">
              JOIN 36,000+ AUSTRALIANS TRAINING HARDER
            </h2>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Real people. Real results. See what our customers are saying about their training since switching to PremiumSupps.
            </p>

            {/* Stars Rating Score */}
            <div className="flex items-center gap-3 pt-2">
              <div className="flex text-[#e6b422]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#e6b422] text-[#e6b422]" />
                ))}
              </div>
              <span className="text-sm font-['Instrument_Sans'] font-bold text-[#111111]">
                <strong>4.9</strong> <span className="text-stone-500 font-normal">/ 1,666+ verified reviews</span>
              </span>
            </div>

            <div className="pt-2">
              <button
                onClick={onViewAllReviews}
                className="inline-flex items-center gap-2 font-['Instrument_Sans'] text-sm font-bold text-[#111111] hover:text-[#e75924] border-b border-[#c9a227] pb-1 uppercase tracking-wider transition-colors cursor-pointer"
              >
                <span>Read All Reviews</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-4 h-4 stroke-current stroke-2">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Column Video Cards Grid (Trigger: .live-reviews__card.pointer) */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
              {videoReviews.map((rev) => (
                <div
                  key={rev.id}
                  id={`video-review-card-${rev.id}`}
                  onClick={() => handleOpenPopup(rev)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Watch customer review video from ${rev.customer} about ${rev.product}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleOpenPopup(rev);
                    }
                  }}
                  className="live-reviews__card pointer relative aspect-[9/16] rounded-[16px] overflow-hidden bg-[#333333] shadow-md cursor-pointer group transform hover:-translate-y-1 transition-all duration-300 border border-stone-800 hover:border-[#e6b422] focus:outline-none focus:ring-2 focus:ring-[#e6b422]"
                >
                  {/* Poster Image */}
                  <img
                    id={`video-poster-img-${rev.id}`}
                    src={rev.poster}
                    alt={`Customer video testimonial by ${rev.customer}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Gradient Overlay for Contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/40 pointer-events-none z-10" />

                  {/* Top-Left CUSTOMER VIDEO Badge (.live-reviews__badge) */}
                  <div className="live-reviews__badge absolute top-3 left-3 z-20 inline-flex items-center gap-1.5 bg-[#111111]/85 backdrop-blur-md text-white text-[9px] sm:text-[10px] font-['Instrument_Sans'] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border border-white/10 shadow-sm">
                    <Check className="w-3 h-3 text-[#e6b422] stroke-[2.5]" />
                    <span>CUSTOMER VIDEO</span>
                  </div>

                  {/* Central Play Button UI (Square 56px + Circle 36px + White Triangle) */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                    <div className="live-reviews__play-square group-hover:scale-110 group-hover:bg-[#222222] transition-all duration-300">
                      <div className="live-reviews__play-circle">
                        <Play className="w-4 h-4 fill-white text-white translate-x-0.5" />
                      </div>
                    </div>
                  </div>

                  {/* Bottom Text Preview */}
                  <div className="absolute bottom-3 inset-x-3 text-white text-left z-20 pointer-events-none">
                    <div className="flex items-center gap-1 text-[#e6b422] mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-[#e6b422] text-[#e6b422]" />
                      ))}
                    </div>
                    <p className="text-xs font-bold font-['Instrument_Sans'] line-clamp-2 leading-snug drop-shadow-sm text-white">
                      "{rev.title}"
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-stone-300 mt-1.5 font-medium">
                      <span>{rev.customer} • {rev.location}</span>
                      <span className="text-[#edd065] text-[9px] font-semibold tracking-wide">
                        9:16 HD
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* High-Fidelity UI Component for "Live Customer Video Review" Pop-Up
          Trigger: .live-reviews__card.pointer
          Popup Selector: .video-item__popup.live-reviews__popup
          Media Container: .live-reviews__popup-media
          Aspect Ratio: 9:16 (Vertical/TikTok style)
          Interactive State: uses aria-hidden and hidden attribute when inactive
      */}
      <div
        className={`video-item__popup live-reviews__popup fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 transition-opacity duration-300 ${
          activeVideo ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label={activeVideo ? `Video review by ${activeVideo.customer}` : 'Video review pop-up'}
        aria-hidden={activeVideo ? 'false' : 'true'}
        hidden={!activeVideo}
      >
        {/* Dark Semi-Transparent Overlay Backdrop */}
        <div
          className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
          onClick={handleClosePopup}
          aria-hidden="true"
        />

        {/* Global Modal Close Button (Top-Right of Viewport for accessibility) */}
        <button
          onClick={handleClosePopup}
          className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 p-2.5 rounded-full bg-stone-900/90 hover:bg-[#e6b422] hover:text-black text-white transition-all shadow-xl border border-white/10 flex items-center justify-center cursor-pointer"
          aria-label="Close review video pop-up"
          title="Close (Esc)"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Desktop Previous Video Navigation Arrow */}
        <button
          onClick={handlePrevVideo}
          className="hidden md:flex fixed left-6 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-stone-900/80 hover:bg-[#e6b422] hover:text-black text-white items-center justify-center transition-all shadow-2xl border border-white/10 cursor-pointer"
          aria-label="Previous customer video"
          title="Previous video (Left Arrow)"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Desktop Next Video Navigation Arrow */}
        <button
          onClick={handleNextVideo}
          className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-stone-900/80 hover:bg-[#e6b422] hover:text-black text-white items-center justify-center transition-all shadow-2xl border border-white/10 cursor-pointer"
          aria-label="Next customer video"
          title="Next video (Right Arrow)"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Main 9:16 Vertical Video Media Container (.live-reviews__popup-media) */}
        {activeVideo && (
          <div
            className="live-reviews__popup-media relative aspect-[9/16] w-full max-w-[390px] sm:max-w-[400px] mx-auto bg-[#1a1a1a] rounded-[16px] overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] border border-stone-800 z-30 select-none flex flex-col justify-between"
            onMouseMove={resetControlsTimeout}
            onTouchStart={resetControlsTimeout}
          >
            {/* Native HTML5 1080p MP4 Video Player */}
            <video
              ref={modalVideoRef}
              key={activeVideo.id}
              src={activeVideo.videoUrl}
              poster={activeVideo.poster}
              autoPlay
              playsInline
              loop
              muted={isMuted}
              onClick={togglePlayPause}
              onTimeUpdate={() => {
                if (modalVideoRef.current) {
                  setCurrentTime(modalVideoRef.current.currentTime);
                  setDuration(modalVideoRef.current.duration || 0);
                }
              }}
              onLoadedMetadata={() => {
                if (modalVideoRef.current) {
                  setDuration(modalVideoRef.current.duration || 0);
                }
              }}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="absolute inset-0 w-full h-full object-cover cursor-pointer bg-black"
            >
              <source src={activeVideo.videoUrl} type="video/mp4" />
              Your browser does not support HTML5 video.
            </video>

            {/* Gradient Overlays for Readability */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/95 via-black/20 to-black/60" />

            {/* Top Bar inside Video: Customer Video Badge + Sound + Close */}
            <div
              className={`relative z-20 flex items-center justify-between p-3.5 transition-opacity duration-300 ${
                showControls ? 'opacity-100' : 'opacity-0 md:opacity-100'
              }`}
            >
              {/* Badge: CUSTOMER VIDEO with Checkmark */}
              <div className="live-reviews__badge inline-flex items-center gap-1.5 bg-[#111111]/85 backdrop-blur-md text-white text-[10px] font-['Instrument_Sans'] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider border border-white/10 shadow-md">
                <Check className="w-3.5 h-3.5 text-[#e6b422] stroke-[2.5]" />
                <span>CUSTOMER VIDEO</span>
              </div>

              {/* Right Controls: Video Index & Audio Toggle */}
              <div className="flex items-center gap-2">
                <span className="bg-black/60 backdrop-blur-sm text-stone-300 text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/10 font-['Instrument_Sans']">
                  {activeIndex + 1} / {videoReviews.length}
                </span>

                <button
                  onClick={toggleMute}
                  className="w-8 h-8 rounded-full bg-black/70 hover:bg-[#e6b422] hover:text-black text-white flex items-center justify-center backdrop-blur-sm transition-all border border-white/10 cursor-pointer"
                  aria-label={isMuted ? 'Unmute video sound' : 'Mute video sound'}
                  title={isMuted ? 'Unmute audio' : 'Mute audio'}
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 text-[#e6b422] hover:text-black" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Center Play/Pause Floating Indicator */}
            {!isPlaying && (
              <div
                onClick={togglePlayPause}
                className="absolute inset-0 flex items-center justify-center z-20 cursor-pointer"
              >
                <div className="live-reviews__play-square scale-110 shadow-2xl">
                  <div className="live-reviews__play-circle">
                    <Play className="w-4 h-4 fill-white text-white translate-x-0.5" />
                  </div>
                </div>
              </div>
            )}

            {/* Mobile Navigation Arrows (Visible only on smaller screens) */}
            <div className="md:hidden absolute inset-y-0 inset-x-2 flex items-center justify-between pointer-events-none z-20">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevVideo();
                }}
                className="pointer-events-auto w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center backdrop-blur-sm border border-white/10"
                aria-label="Previous video"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextVideo();
                }}
                className="pointer-events-auto w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center backdrop-blur-sm border border-white/10"
                aria-label="Next video"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Bottom Overlay: Customer Info, Star Rating, Testimonial & Controls */}
            <div
              className={`relative z-20 p-4 pt-2 text-white transition-opacity duration-300 ${
                showControls ? 'opacity-100' : 'opacity-90'
              }`}
            >
              {/* Star Rating + Verified Buyer Tag */}
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1 text-[#e6b422]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#e6b422] text-[#e6b422]" />
                  ))}
                  <span className="text-[11px] font-bold text-white ml-1">5.0</span>
                </div>

                <span className="text-[10px] font-bold text-[#00c950] bg-black/60 px-2 py-0.5 rounded-full border border-[#00c950]/30 inline-flex items-center gap-1">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                  Verified Buyer
                </span>
              </div>

              {/* Review Headline Title */}
              <h3 className="font-['Instrument_Sans'] text-base font-bold text-white leading-snug mb-1">
                "{activeVideo.title}"
              </h3>

              {/* Customer Testimonial Quote */}
              <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed mb-2.5">
                {activeVideo.quote}
              </p>

              {/* Customer & Product Badges */}
              <div className="flex items-center justify-between bg-black/50 backdrop-blur-md p-2 rounded-xl border border-white/10 mb-3 text-xs">
                <div>
                  <span className="font-bold text-white block text-[11px]">
                    {activeVideo.customer}
                  </span>
                  <span className="text-[10px] text-stone-400">
                    {activeVideo.location}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[9px] uppercase tracking-wider text-stone-400 block font-semibold">
                    Product
                  </span>
                  <span className="text-[10px] font-bold text-[#e6b422] truncate max-w-[140px] block">
                    {activeVideo.product}
                  </span>
                </div>
              </div>

              {/* Interactive Video Scrubber & Progress Bar */}
              <div
                ref={progressBarRef}
                onClick={handleSeek}
                className="group relative h-1.5 bg-stone-700/60 hover:h-2.5 rounded-full cursor-pointer transition-all mb-2.5"
                role="slider"
                aria-label="Video scrubber"
                aria-valuemin={0}
                aria-valuemax={duration || 100}
                aria-valuenow={currentTime}
              >
                <div
                  className="absolute left-0 top-0 bottom-0 bg-[#e6b422] rounded-full"
                  style={{
                    width: `${duration ? (currentTime / duration) * 100 : 0}%`,
                  }}
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    left: `${duration ? (currentTime / duration) * 100 : 0}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              </div>

              {/* Playback Controls Strip */}
              <div className="flex items-center justify-between text-[11px] text-stone-300 font-medium">
                <div className="flex items-center gap-2">
                  <button
                    onClick={togglePlayPause}
                    className="p-1 text-white hover:text-[#e6b422] transition-colors cursor-pointer"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                  </button>
                  <span className="font-mono text-[10px] text-stone-300">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {onViewAllReviews && (
                    <button
                      onClick={() => {
                        handleClosePopup();
                        onViewAllReviews();
                      }}
                      className="text-[10px] font-bold text-[#e6b422] hover:text-white uppercase tracking-wider underline underline-offset-2 transition-colors cursor-pointer"
                    >
                      All Reviews →
                    </button>
                  )}
                  <button
                    onClick={handleClosePopup}
                    className="bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </section>
  );
};
