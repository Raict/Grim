<template>
    <section class="section section--hero">
      <div class="hero-background">
        <div class="hero-gradient"></div>
        <div class="hero-glow"></div>
      </div>

      <div class="container">
        <div class="hero-content fade-in-up">

          <h1 class="hero-title">
            <span class="hero-title__main">{{ $t('hero.title') }}</span>
            <span class="hero-title__gradient">{{ $t('hero.titleAccent') }}</span>
          </h1>

          <p class="hero-subtitle">
            {{ $t('hero.subtitle') }}
          </p>

          <p class="hero-description">
            {{ $t('hero.description') }}
          </p>


          <div class="hero-actions">
            <button
              class="btn btn--hero btn--lg"
              @click="scrollToConverter"
            >
              <div class="btn-glow"></div>
              <Icon name="lucide:upload" class="btn-icon" />
              <span class="btn-text">{{ $t('hero.uploadButton') }}</span>
              <Icon name="lucide:arrow-right" class="btn-arrow" />
            </button>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  const scrollToConverter = () => {
    const element = document.getElementById('favicon-converter')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .section--hero {
    position: relative;
    overflow: hidden;
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding: spacing(6xl) 0 spacing(4xl);

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310b981' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;
      pointer-events: none;
      z-index: 0;
    }

    @include respond-to(md) {
      padding: spacing(8xl) 0 spacing(6xl);
    }
  }

  .hero-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
  }

  .hero-gradient {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(16, 185, 129, 0.12) 0%,
      rgba(20, 184, 166, 0.18) 25%,
      rgba(99, 102, 241, 0.15) 50%,
      rgba(168, 85, 247, 0.12) 75%,
      rgba(236, 72, 153, 0.15) 100%
    );
    background-size: 400% 400%;
    animation: gradientShift 15s ease infinite;
  }


  .hero-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1000px;
    height: 800px;
    background: radial-gradient(
      ellipse at center,
      rgba(16, 185, 129, 0.08) 0%,
      rgba(99, 102, 241, 0.06) 30%,
      rgba(168, 85, 247, 0.04) 60%,
      transparent 80%
    );
    animation: glowPulse 6s ease-in-out infinite;
    filter: blur(40px);
  }


  .hero-content {
    position: relative;
    max-width: 900px;
    margin: 0 auto;
    text-align: center;
    z-index: 2;
  }

  .hero-badge {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: spacing(xs);
    padding: spacing(sm) spacing(md);
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    border-radius: border-radius(full);
    font-size: font-size(sm);
    font-weight: font-weight(medium);
    margin-bottom: spacing(lg);
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.1),
      0 0 0 1px rgba(255, 255, 255, 0.05);
    animation: badgeFloat 3s ease-in-out infinite;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      opacity: 0.8;
      z-index: -1;
      border-radius: inherit;
    }

    &__glow {
      position: absolute;
      top: -3px;
      left: -3px;
      right: -3px;
      bottom: -3px;
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      border-radius: inherit;
      z-index: -2;
      filter: blur(12px);
      opacity: 0.8;
      animation: glowRotate 3s linear infinite;
    }

    &__shimmer {
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
      animation: shimmerSlide 3s infinite;
      z-index: 1;
    }

    &__icon {
      width: 16px;
      height: 16px;
      filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.5));
    }
  }

  .hero-title {
    font-size: font-size(4xl);
    font-weight: font-weight(extrabold);
    line-height: 1.1;
    margin-bottom: spacing(lg);
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

    @include respond-to(sm) {
      font-size: font-size(5xl);
    }

    @include respond-to(lg) {
      font-size: font-size(6xl);
    }

    &__main {
      display: block;
      color: var(--text-primary);
      position: relative;
    }

    &__gradient {
      display: block;
      background: linear-gradient(135deg, var(--primary), var(--secondary), var(--primary));
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-size: 300% 300%;
      animation: gradientText 4s ease-in-out infinite;
      position: relative;
      filter: drop-shadow(0 0 20px rgba(16, 185, 129, 0.3));
    }
  }

  .hero-subtitle {
    font-size: font-size(xl);
    font-weight: font-weight(medium);
    color: var(--text-secondary);
    margin-bottom: spacing(md);

    @include respond-to(sm) {
      font-size: font-size(2xl);
    }
  }

  .hero-description {
    font-size: font-size(lg);
    color: var(--text-tertiary);
    margin-bottom: spacing(2xl);
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  .hero-actions {
    margin-bottom: spacing(2xl);
  }

  .btn--hero {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: spacing(sm);
    padding: spacing(lg) spacing(2xl);
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    color: white;
    border: none;
    border-radius: border-radius(xl);
    font-size: font-size(lg);
    font-weight: font-weight(semibold);
    box-shadow:
      0 20px 40px rgba(0, 0, 0, 0.15),
      0 0 0 1px rgba(255, 255, 255, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    overflow: hidden;
    margin-bottom: spacing(xl);

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
      transition: left 0.6s ease;
    }

    &:hover {
      transform: translateY(-4px) scale(1.02);
      box-shadow:
        0 30px 60px rgba(0, 0, 0, 0.25),
        0 0 0 1px rgba(255, 255, 255, 0.2),
        inset 0 1px 0 rgba(255, 255, 255, 0.3);

      &::before {
        left: 100%;
      }

      .btn-glow {
        opacity: 1;
        transform: scale(1.2);
      }

      .btn-arrow {
        transform: translateX(6px);
      }

      .btn-icon {
        transform: rotate(15deg) scale(1.1);
      }
    }

    .btn-glow {
      position: absolute;
      top: -4px;
      left: -4px;
      right: -4px;
      bottom: -4px;
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      border-radius: inherit;
      z-index: -1;
      filter: blur(15px);
      opacity: 0.7;
      transition: all 0.4s ease;
    }

    .btn-icon,
    .btn-arrow {
      width: 20px;
      height: 20px;
      transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
  }

  .hero-stats {
    position: relative;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: spacing(lg);
    max-width: 450px;
    margin: 0 auto spacing(xl);
    padding: spacing(lg);
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: border-radius(2xl);
    box-shadow:
      0 20px 40px rgba(0, 0, 0, 0.1),
      0 0 0 1px rgba(255, 255, 255, 0.05),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
    overflow: hidden;

    &__backdrop {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        135deg,
        rgba(16, 185, 129, 0.02) 0%,
        rgba(99, 102, 241, 0.03) 50%,
        rgba(168, 85, 247, 0.02) 100%
      );
      z-index: -1;
    }

    @include respond-to(sm) {
      padding: spacing(xl);
      max-width: 500px;
    }
  }

  .hero-stat {
    text-align: center;
    position: relative;
    padding: spacing(sm);
    border-radius: border-radius(lg);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      background: rgba(255, 255, 255, 0.05);
    }

    &__icon {
      width: 24px;
      height: 24px;
      margin: 0 auto spacing(xs);
      color: var(--primary);
      opacity: 0.8;
      filter: drop-shadow(0 0 8px rgba(16, 185, 129, 0.3));
    }

    &__number {
      font-size: font-size(2xl);
      font-weight: font-weight(bold);
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: spacing(xs);
      filter: drop-shadow(0 0 8px rgba(16, 185, 129, 0.2));

      @include respond-to(sm) {
        font-size: font-size(3xl);
      }
    }

    &__label {
      font-size: font-size(sm);
      color: var(--text-secondary);
      font-weight: font-weight(medium);
      opacity: 0.9;
    }
  }

  .hero-features {
    display: flex;
    justify-content: center;
    gap: spacing(xl);
    flex-wrap: wrap;

    @include respond-to(sm) {
      gap: spacing(2xl);
    }
  }

  .hero-feature {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: spacing(sm);
    font-size: font-size(sm);
    color: var(--text-secondary);
    font-weight: font-weight(medium);
    cursor: pointer;
    transition: all 0.3s ease;
    padding: spacing(sm);
    border-radius: border-radius(lg);

    &:hover {
      transform: translateY(-5px);
      color: var(--text-primary);

      .hero-feature__icon-wrapper {
        transform: scale(1.1) rotate(5deg);
        box-shadow:
          0 20px 40px rgba(0, 0, 0, 0.15),
          0 0 0 4px rgba(255, 255, 255, 0.1);
      }

      .hero-feature__icon {
        filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.8));
      }
    }

    &__icon-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 56px;
      height: 56px;
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      border-radius: border-radius(xl);
      box-shadow:
        0 10px 25px rgba(0, 0, 0, 0.1),
        0 0 0 1px rgba(255, 255, 255, 0.1);
      margin-bottom: spacing(xs);
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      position: relative;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
        transition: left 0.5s ease;
      }

      &:hover::before {
        left: 100%;
      }
    }

    &__icon {
      width: 28px;
      height: 28px;
      color: white;
      transition: all 0.3s ease;
    }
  }

  @keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; }
    25% { background-position: 100% 0%; }
    50% { background-position: 100% 100%; }
    75% { background-position: 0% 100%; }
  }

  @keyframes particlesFloat {
    0% { transform: translateY(0px); opacity: 1; }
    25% { transform: translateY(-15px); opacity: 0.7; }
    50% { transform: translateY(-30px); opacity: 1; }
    75% { transform: translateY(-15px); opacity: 0.8; }
    100% { transform: translateY(0px); opacity: 1; }
  }

  @keyframes glowPulse {
    0%, 100% {
      opacity: 0.4;
      transform: translate(-50%, -50%) scale(1);
    }
    33% {
      opacity: 0.7;
      transform: translate(-50%, -50%) scale(1.1);
    }
    66% {
      opacity: 0.5;
      transform: translate(-50%, -50%) scale(0.9);
    }
  }

  @keyframes shimmerSlide {
    0% { left: -100%; }
    50% { left: 100%; }
    100% { left: 100%; }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    25% { transform: translateY(-15px); }
    50% { transform: translateY(-30px); }
    75% { transform: translateY(-15px); }
  }

  @keyframes badgeFloat {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-3px); }
  }

  @keyframes glowRotate {
    0% { opacity: 0.6; }
    50% { opacity: 1; }
    100% { opacity: 0.6; }
  }

  @keyframes gradientText {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  </style>
  