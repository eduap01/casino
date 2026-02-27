import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';

export interface SeoConfig {
  title: string;
  description?: string;
  canonical?: string;
  robots?: string; // "index,follow" / "noindex,nofollow"
  ogImage?: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  constructor(private title: Title, private meta: Meta) {}

  setSeo(cfg: SeoConfig): void {
    // Title
    this.title.setTitle(cfg.title);

    // Description
    if (cfg.description) {
      this.meta.updateTag({ name: 'description', content: cfg.description });
      this.meta.updateTag({ property: 'og:description', content: cfg.description });
      this.meta.updateTag({ name: 'twitter:description', content: cfg.description });
    }

    // Robots
    this.meta.updateTag({ name: 'robots', content: cfg.robots ?? 'index, follow' });

    // OG / Twitter title
    this.meta.updateTag({ property: 'og:title', content: cfg.title });
    this.meta.updateTag({ name: 'twitter:title', content: cfg.title });

    // Canonical
    if (cfg.canonical) {
      this.setCanonical(cfg.canonical);
      this.meta.updateTag({ property: 'og:url', content: cfg.canonical });
    }

    // Image (opcional)
    if (cfg.ogImage) {
      this.meta.updateTag({ property: 'og:image', content: cfg.ogImage });
      this.meta.updateTag({ name: 'twitter:image', content: cfg.ogImage });
    }
  }

  private setCanonical(url: string): void {
    let link = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
