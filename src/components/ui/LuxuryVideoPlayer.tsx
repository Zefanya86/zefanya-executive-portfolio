'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  RotateCcw,
  Sparkles,
  Sliders,
  Tv,
  Film,
} from 'lucide-react';
import { sound } from '@/lib/sound';

interface LuxuryVideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  duration?: string;
  resolution?: string;
  aspectRatio?: '16/9' | '4/3' | '1/1' | '9/16' | '21/9';
  autoPlay?: boolean;
  loop?: boolean;
  className?: string;
}

export default function LuxuryVideoPlayer({
  src,
  poster,
  title,
  duration: initialDuration,
  resolution = '1080p 60fps',
  aspectRatio = '16/9',
  autoPlay = false,
  loop = false,
  className = '',
}: LuxuryVideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.85);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLooping, setIsLooping] = useState(loop);
  const [showControls, setShowControls] = useState(true);
  const [isBuffering, setIsBuffering] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Check if URL is YouTube or Vimeo embed
  const isYouTube = src.includes('youtube.com') || src.includes('youtu.be');
  const isVimeo = src.includes('vimeo.com');

  const getYouTubeEmbedUrl = (url: string) => {
    let videoId = '';
    if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0] || '';
    } else if (url.includes('watch?v=')) {
      videoId = url.split('watch?v=')[1]?.split('&')[0] || '';
    } else if (url.includes('embed/')) {
      return url;
    }
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
  };

  const getVimeoEmbedUrl = (url: string) => {
    const videoId = url.split('vimeo.com/')[1]?.split('?')[0] || '';
    return `https://player.vimeo.com/video/${videoId}?autoplay=1&color=C5A477`;
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '00:00';
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  // Autohide controls on inactivity
  const resetControlsTimeout = useCallback(() => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 2500);
    }
  }, [isPlaying]);

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, []);

  const togglePlay = () => {
    sound.playClick();
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
      setShowControls(true);
    } else {
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasStarted(true);
          resetControlsTimeout();
        })
        .catch((err) => {
          console.warn('Playback error:', err);
        });
    }
  };

  const toggleMute = () => {
    sound.playClick();
    if (!videoRef.current) return;
    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (videoRef.current) {
      videoRef.current.volume = newVol;
      videoRef.current.muted = newVol === 0;
      setIsMuted(newVol === 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  const toggleFullscreen = () => {
    sound.playClick();
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().then(() => setIsFullscreen(true));
    } else {
      document.exitFullscreen?.().then(() => setIsFullscreen(false));
    }
  };

  const togglePiP = async () => {
    sound.playClick();
    if (!videoRef.current) return;
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else if (document.pictureInPictureEnabled) {
        await videoRef.current.requestPictureInPicture();
      }
    } catch (err) {
      console.warn('PiP not supported or failed:', err);
    }
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  // Aspect ratio helper
  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case '21/9':
        return 'aspect-[21/9]';
      case '4/3':
        return 'aspect-[4/3]';
      case '1/1':
        return 'aspect-square';
      case '9/16':
        return 'aspect-[9/16] max-w-sm mx-auto';
      case '16/9':
      default:
        return 'aspect-video';
    }
  };

  if (isYouTube || isVimeo) {
    const embedUrl = isYouTube ? getYouTubeEmbedUrl(src) : getVimeoEmbedUrl(src);
    return (
      <div
        className={`relative w-full rounded-2xl overflow-hidden bg-obsidian border border-hairline shadow-luxury-elevated ${getAspectRatioClass()} ${className}`}
      >
        <iframe
          src={embedUrl}
          title={title || 'Executive Video Player'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full border-0"
        />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={resetControlsTimeout}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      className={`relative w-full rounded-2xl overflow-hidden bg-obsidian border border-gold/40 shadow-luxury-elevated group select-none ${getAspectRatioClass()} ${className}`}
    >
      {/* HTML5 Video Element */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        loop={isLooping}
        playsInline
        preload="metadata"
        onTimeUpdate={() => {
          if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
        }}
        onLoadedMetadata={() => {
          if (videoRef.current) {
            setDuration(videoRef.current.duration);
            videoRef.current.volume = volume;
          }
        }}
        onWaiting={() => setIsBuffering(true)}
        onPlaying={() => {
          setIsBuffering(false);
          setIsPlaying(true);
        }}
        onEnded={() => {
          if (!isLooping) {
            setIsPlaying(false);
            setShowControls(true);
          }
        }}
        onClick={togglePlay}
        className="w-full h-full object-cover cursor-pointer"
      />

      {/* Buffering Indicator */}
      {isBuffering && (
        <div className="absolute inset-0 flex items-center justify-center bg-obsidian/40 backdrop-blur-xs pointer-events-none z-20">
          <div className="w-12 h-12 rounded-full border-2 border-gold/20 border-t-gold animate-spin" />
        </div>
      )}

      {/* Center Big Play Button (when paused or before start) */}
      {!isPlaying && (
        <button
          onClick={togglePlay}
          aria-label="Play video"
          className="absolute inset-0 m-auto w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-charcoal/80 hover:bg-gold/90 text-gold hover:text-obsidian backdrop-blur-xl border border-gold/50 hover:border-gold shadow-[0_0_35px_rgba(197,164,119,0.35)] flex items-center justify-center transition-all duration-300 hover:scale-108 active:scale-95 group/play z-20"
        >
          <Play
            size={36}
            className="fill-current translate-x-1 group-hover/play:scale-110 transition-transform"
          />
        </button>
      )}

      {/* Top Telemetry Overlay */}
      <div
        className={`absolute top-0 left-0 right-0 p-4 sm:p-5 bg-gradient-to-b from-obsidian/90 via-obsidian/40 to-transparent flex items-center justify-between pointer-events-none transition-opacity duration-300 z-20 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <span className="px-2.5 py-0.5 rounded-full bg-gold/20 text-gold text-[10px] font-sans font-bold uppercase tracking-wider border border-gold/40 flex items-center gap-1.5 shadow-[0_0_10px_rgba(197,164,119,0.2)]">
            <Film size={11} className="text-gold" />
            <span>EXECUTIVE CINEMATIC</span>
          </span>
          {resolution && (
            <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-obsidian/70 text-softGray text-[10px] font-mono border border-hairline">
              {resolution}
            </span>
          )}
        </div>

        {title && (
          <div className="text-right">
            <span className="text-xs font-serif font-bold text-ivory line-clamp-1 max-w-xs sm:max-w-md">
              {title}
            </span>
          </div>
        )}
      </div>

      {/* Bottom Custom Control Bar */}
      <div
        className={`absolute bottom-0 left-0 right-0 p-3 sm:p-5 bg-gradient-to-t from-obsidian/95 via-obsidian/75 to-transparent flex flex-col gap-2.5 transition-all duration-300 z-20 ${
          showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
        }`}
      >
        {/* Progress Timeline Scrubber */}
        <div className="relative w-full group/scrubber flex items-center">
          <input
            type="range"
            min={0}
            max={duration || 100}
            step={0.1}
            value={currentTime}
            onChange={handleSeek}
            aria-label="Seek timeline"
            className="w-full h-1.5 bg-white/20 rounded-full appearance-none cursor-pointer accent-gold hover:h-2 transition-all duration-150 focus:outline-none"
            style={{
              background: `linear-gradient(to right, #C5A477 ${progressPercentage}%, rgba(255, 255, 255, 0.2) ${progressPercentage}%)`,
            }}
          />
        </div>

        {/* Controls Action Row */}
        <div className="flex items-center justify-between text-ivory text-xs">
          {/* Left Group: Play/Pause, Volume, Timer */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause' : 'Play'}
              className="p-1.5 rounded-full hover:bg-white/10 text-ivory hover:text-gold transition-colors"
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} className="fill-current" />}
            </button>

            {/* Volume Control */}
            <div className="flex items-center gap-2 group/volume">
              <button
                onClick={toggleMute}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
                className="p-1.5 rounded-full hover:bg-white/10 text-ivory hover:text-gold transition-colors"
              >
                {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                aria-label="Volume slider"
                className="w-14 sm:w-20 h-1 bg-white/20 rounded-full appearance-none cursor-pointer accent-gold hover:h-1.5 transition-all"
                style={{
                  background: `linear-gradient(to right, #C5A477 ${(isMuted ? 0 : volume) * 100}%, rgba(255, 255, 255, 0.2) ${(isMuted ? 0 : volume) * 100}%)`,
                }}
              />
            </div>

            {/* Time Stamp */}
            <div className="text-[11px] font-mono text-softGray">
              <span className="text-ivory font-medium">{formatTime(currentTime)}</span>
              <span className="mx-1 text-softGray/60">/</span>
              <span>{formatTime(duration || 0)}</span>
            </div>
          </div>

          {/* Right Group: Loop, PiP, Fullscreen */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => {
                sound.playClick();
                setIsLooping(!isLooping);
              }}
              title={isLooping ? 'Disable Loop' : 'Enable Loop'}
              className={`p-1.5 rounded-full transition-colors ${
                isLooping ? 'text-gold bg-gold/15' : 'text-softGray hover:text-ivory hover:bg-white/10'
              }`}
            >
              <RotateCcw size={16} />
            </button>

            <button
              onClick={togglePiP}
              title="Picture in Picture"
              className="hidden sm:block p-1.5 rounded-full text-softGray hover:text-ivory hover:bg-white/10 transition-colors"
            >
              <Tv size={16} />
            </button>

            <button
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
              className="p-1.5 rounded-full hover:bg-white/10 text-ivory hover:text-gold transition-colors"
            >
              {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
