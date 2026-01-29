export interface PlatformSizeGroup {
  key: string;
  label: string;
  sizes: number[];
  themeColor: string;
  maxFileSize: string;
}

export interface PlatformConfig {
  slug?: string;
  title: string;
  description: string;
  h1: string;
  h1Highlight?: string;
  h1Prefix?: string;
  h1Suffix?: string;
  accentGradient?: { from: string; to: string };
  seoTitle: string;
  seoIntro: string;
  seoSteps: { title: string; body: string }[];
  seoFaq: { question: string; answer: string }[];
  specsRows?: {
    platform: string;
    type: string;
    dimensions: string;
    maxFileSize: string;
    note: string;
  }[];
  sizeGroups: PlatformSizeGroup[];
  isDefault?: boolean;
}

export const defaultPlatform: PlatformConfig = {
  title: 'Free Emote Resizer for Twitch, Discord & More',
  description:
    'Resize emotes for Twitch, Discord, YouTube, and more with pixel-perfect results. 100% browser-based, privacy-first, and fast.',
  h1: 'Perfect emotes, pixel perfect.',
  seoTitle: 'The Ultimate Guide to Resizing Emotes for Every Platform',
  seoIntro:
    'Creating custom emotes is the fastest way to build your brand and connect with your community. Each platform has strict size requirements—if the dimensions are off, uploads get rejected.\n\n<strong class="text-slate-900 font-bold">EmoteForge</strong> generates every required size automatically, keeping your artwork crisp and professional across Twitch, Discord, YouTube, Slack, and Kick.',
  seoSteps: [
    {
      title: 'Prepare a 500px+ square PNG',
      body: 'Start large and transparent so downsized exports stay crisp across platforms.'
    },
    {
      title: 'Upload once to EmoteForge',
      body: 'Drag and drop your file and let the browser generate every required size.'
    },
    {
      title: 'Download all platform sizes',
      body: 'Export Twitch/Discord/YouTube/Slack/Kick PNGs in a single click.'
    },
    {
      title: 'Upload each size to its platform',
      body: 'Drop the matching PNG into each dashboard and you’re done.'
    }
  ],
  seoFaq: [
    {
      question: 'Why do my uploads look blurry on different platforms?',
      answer:
        'Blurriness usually comes from upscaling small artwork. Start with a large square canvas and resize down for sharper edges.'
    },
    {
      question: 'Is my artwork uploaded to a server?',
      answer:
        'No. EmoteForge processes images locally inside your browser, so files never leave your device.'
    },
    {
      question: 'Which file formats work best across platforms?',
      answer: 'PNG is recommended for transparency and crisp linework. JPG works when you do not need transparency.'
    },
    {
      question: 'Should I keep a master file?',
      answer: 'Yes. Save a large layered master so you can export new sizes without losing detail.'
    },
    {
      question: 'Can I resize multiple emotes in one session?',
      answer: 'Yes. You can repeat the upload process for each emote—everything happens locally, so there’s no wait for server queues.'
    }
  ],
  specsRows: [
    {
      platform: 'Twitch',
      type: 'Emotes',
      dimensions: '112, 56, 28',
      maxFileSize: '1 MB',
      note: 'Square, Transparent PNG'
    },
    {
      platform: 'Twitch',
      type: 'Badges',
      dimensions: '72, 36, 18',
      maxFileSize: '25 KB',
      note: 'Strict size requirement'
    },
    {
      platform: 'Discord',
      type: 'Emojis',
      dimensions: '128 x 128',
      maxFileSize: '256 KB',
      note: 'Displays at 32x32'
    },
    {
      platform: 'Discord',
      type: 'Stickers',
      dimensions: '320 x 320',
      maxFileSize: '500 KB',
      note: 'APNG or PNG'
    },
    {
      platform: 'YouTube',
      type: 'Profile',
      dimensions: '800 x 800',
      maxFileSize: '2 MB',
      note: 'Displays circular'
    },
    {
      platform: 'Slack',
      type: 'Emojis',
      dimensions: '128 x 128',
      maxFileSize: '128 KB',
      note: 'Square'
    },
    {
      platform: 'Kick',
      type: 'Emotes',
      dimensions: '500 x 500',
      maxFileSize: '1 MB',
      note: 'Strict requirement'
    }
  ],
  sizeGroups: [
    {
      key: 'twitch',
      label: 'Twitch Emotes',
      sizes: [112, 56, 28],
      themeColor: '#9146FF',
      maxFileSize: '1MB'
    },
    {
      key: 'discord',
      label: 'Discord Emojis',
      sizes: [128, 320],
      themeColor: '#5865F2',
      maxFileSize: '256KB'
    },
    {
      key: 'youtube',
      label: 'YouTube Profile',
      sizes: [800, 98],
      themeColor: '#FF0033',
      maxFileSize: '2MB'
    },
    {
      key: 'slack',
      label: 'Slack Emojis',
      sizes: [128, 64],
      themeColor: '#611F69',
      maxFileSize: '128KB'
    },
    {
      key: 'kick',
      label: 'Kick Emotes',
      sizes: [500],
      themeColor: '#53FC18',
      maxFileSize: '1MB'
    }
  ],
  isDefault: true
};

export const platforms: PlatformConfig[] = [
  {
    slug: 'twitch-emote-resizer',
    title: 'Free Twitch Emote Resizer',
    description:
      'Resize Twitch emotes to 112, 56, and 28px instantly. Keep transparent PNGs crisp with high-quality downscaling.',
    h1: 'Resize Images for Twitch Instantly',
    h1Prefix: 'Resize Images for',
    h1Highlight: 'Twitch',
    h1Suffix: 'Instantly',
    accentGradient: { from: '#9146FF', to: '#B69CFF' },
    seoTitle: 'Twitch Emote Resizing Guide',
    seoIntro:
      'Twitch requires emotes at 112, 56, and 28px. Resize from a large square PNG to keep edges sharp and avoid blur in chat.',
    seoSteps: [
      {
        title: 'Design a 500px+ square PNG',
        body: 'Keep transparency so Twitch renders cleanly in light and dark chat.'
      },
      {
        title: 'Generate 112/56/28px sizes',
        body: 'EmoteForge outputs Twitch’s official sizes with clean downscaling.'
      },
      {
        title: 'Preview at 28px',
        body: 'Simplify shapes if tiny details disappear in chat.'
      },
      {
        title: 'Upload in Creator Dashboard',
        body: 'Place each size in its slot and you’re ready for chat.'
      }
    ],
    seoFaq: [
      {
        question: 'Do Twitch emotes need to be transparent?',
        answer: 'Yes, transparent PNGs look best across light and dark chat themes.'
      },
      {
        question: 'Why 112/56/28px sizes?',
        answer: 'These are Twitch’s official display sizes, ensuring sharp rendering in every chat scale.'
      },
      {
        question: 'Is 1MB the max file size?',
        answer: 'Twitch allows up to 1MB. EmoteForge outputs optimized PNGs that stay within the limit.'
      },
      {
        question: 'How do I keep emotes sharp in dark mode?',
        answer: 'Use bold shapes and avoid thin lines; transparent PNGs with clean edges render best.'
      },
      {
        question: 'Can I upload animated emotes?',
        answer: 'Twitch supports animated emotes for eligible creators. Export a PNG here for static emotes or use your animated workflow separately.'
      }
    ],
    sizeGroups: [
      {
        key: 'twitch',
        label: 'Twitch Emotes',
        sizes: [112, 56, 28],
        themeColor: '#9146FF',
        maxFileSize: '1MB'
      }
    ]
  },
  {
    slug: 'discord-emoji-maker',
    title: 'Discord Emoji Resizer',
    description:
      'Create perfectly sized Discord emojis and stickers. Resize to 128px and 320px with fast, local processing.',
    h1: 'Create Discord Emojis in Seconds',
    h1Prefix: 'Create',
    h1Highlight: 'Discord Emojis',
    h1Suffix: 'in Seconds',
    accentGradient: { from: '#5865F2', to: '#9AA4FF' },
    seoTitle: 'Discord Emoji & Sticker Resizer',
    seoIntro:
      'Discord emojis are typically 128x128px, while stickers can be 320x320px. Resize once and export both sizes for instant upload.',
    seoSteps: [
      {
        title: 'Upload a square PNG',
        body: 'Use transparency so edges stay crisp in servers.'
      },
      {
        title: 'Export 128px + 320px sizes',
        body: 'Generate emoji and sticker files in one pass.'
      },
      {
        title: 'Preview at 32px',
        body: 'Boost contrast if the emoji reads soft at small size.'
      },
      {
        title: 'Upload in server settings',
        body: 'Add the files and your community can use them immediately.'
      }
    ],
    seoFaq: [
      {
        question: 'Can I upload the same file for emojis and stickers?',
        answer: 'You can, but Discord expects different sizes. Export both for best results.'
      },
      {
        question: 'What file formats does Discord support?',
        answer: 'PNG is ideal for transparency; JPEG works but won’t preserve backgrounds.'
      },
      {
        question: 'Is there a file size limit?',
        answer: 'Discord limits emoji size, so keep files optimized. EmoteForge keeps them lightweight.'
      },
      {
        question: 'Why do my emojis look soft?',
        answer: 'Start larger than 128px and downscale. Upscaling small art introduces blur.'
      },
      {
        question: 'Do emojis look different on dark mode?',
        answer: 'Transparent PNGs work best and keep edges clean on both light and dark themes.'
      }
    ],
    sizeGroups: [
      {
        key: 'discord',
        label: 'Discord Emojis & Stickers',
        sizes: [128, 320],
        themeColor: '#5865F2',
        maxFileSize: '256KB'
      }
    ]
  },
  {
    slug: 'youtube-profile-resizer',
    title: 'YouTube Profile Resizer',
    description:
      'Resize images for YouTube profile photos with clean, square exports. Fast, private, and browser-based.',
    h1: 'Resize for YouTube Profiles Fast',
    h1Prefix: 'Resize for',
    h1Highlight: 'YouTube Profiles',
    h1Suffix: 'Fast',
    accentGradient: { from: '#FF0033', to: '#FF6B6B' },
    seoTitle: 'YouTube Profile Image Resizer',
    seoIntro:
      'YouTube profile images are displayed across multiple sizes. Start with a large square and export 800px and 98px versions for consistent clarity.',
    seoSteps: [
      {
        title: 'Prepare an 800px square image',
        body: 'Center the subject so the circle crop never clips key details.'
      },
      {
        title: 'Generate 800px + 98px sizes',
        body: 'Export upload and preview sizes in one click.'
      },
      {
        title: 'Verify circle-safe framing',
        body: 'Keep logos and faces within the center safe area.'
      },
      {
        title: 'Upload to your channel',
        body: 'Replace your profile image and keep branding sharp everywhere.'
      }
    ],
    seoFaq: [
      {
        question: 'Does YouTube crop to a circle?',
        answer: 'Yes, most views show a circle crop. Keep key details centered.'
      },
      {
        question: 'Is 800px required?',
        answer: 'It’s a recommended upload size that scales cleanly across devices.'
      },
      {
        question: 'Can I use JPG?',
        answer: 'PNG is preferred for crisp edges, but JPG works if transparency is not needed.'
      },
      {
        question: 'What background works best?',
        answer: 'A clean, high-contrast background keeps the profile image readable at small sizes.'
      },
      {
        question: 'Will EmoteForge add watermarks?',
        answer: 'No. Your exports are clean, and processing stays in your browser.'
      }
    ],
    sizeGroups: [
      {
        key: 'youtube',
        label: 'YouTube Profile',
        sizes: [800, 98],
        themeColor: '#FF0033',
        maxFileSize: '2MB'
      }
    ]
  },
  {
    slug: 'slack-emoji-resizer',
    title: 'Slack Emoji Resizer',
    description:
      'Resize Slack emojis in seconds. Export 128px and 64px PNGs for crisp team chat stickers.',
    h1: 'Resize Images for Slack Emojis',
    h1Prefix: 'Resize Images for',
    h1Highlight: 'Slack Emojis',
    h1Suffix: '',
    accentGradient: { from: '#611F69', to: '#9E6FA8' },
    seoTitle: 'Slack Emoji Resizer',
    seoIntro:
      'Slack emojis look best when uploaded at higher resolution and downscaled. Export 128px and 64px versions for consistent clarity.',
    seoSteps: [
      {
        title: 'Start with a 128px+ PNG',
        body: 'Transparency keeps emojis clean in any workspace theme.'
      },
      {
        title: 'Export 128px + 64px sizes',
        body: 'Generate both full-size and preview files.'
      },
      {
        title: 'Test at 64px',
        body: 'Make sure the emoji is recognizable at preview size.'
      },
      {
        title: 'Upload in Slack settings',
        body: 'Add the emoji and test it in light/dark themes.'
      }
    ],
    seoFaq: [
      {
        question: 'Does Slack accept transparent emojis?',
        answer: 'Yes, PNG transparency is supported and recommended.'
      },
      {
        question: 'What size should I upload?',
        answer: '128px is a safe upload size that scales down cleanly.'
      },
      {
        question: 'Can I upload GIFs?',
        answer: 'Slack supports GIFs, but PNGs are best for crisp static art.'
      },
      {
        question: 'Do I need a separate 64px file?',
        answer: 'Yes, Slack shows smaller previews. Export both sizes for consistent clarity.'
      },
      {
        question: 'Do I need to downscale manually?',
        answer: 'No. EmoteForge exports the exact sizes, so you can upload immediately.'
      }
    ],
    sizeGroups: [
      {
        key: 'slack',
        label: 'Slack Emojis',
        sizes: [128, 64],
        themeColor: '#611F69',
        maxFileSize: '128KB'
      }
    ]
  },
  {
    slug: 'kick-emote-resizer',
    title: 'Kick Emote Resizer',
    description:
      'Resize Kick emotes quickly with high-quality downscaling. Export 500px PNGs that stay crisp in chat.',
    h1: 'Resize for Kick Emotes',
    h1Prefix: 'Resize for',
    h1Highlight: 'Kick Emotes',
    h1Suffix: '',
    accentGradient: { from: '#53FC18', to: '#B6FF7D' },
    seoTitle: 'Kick Emote Resizer Guide',
    seoIntro:
      'Kick emotes look best when uploaded at higher resolution. Use a 500px square PNG for sharp chat rendering.',
    seoSteps: [
      {
        title: 'Upload a 500px square PNG',
        body: 'Higher resolution keeps edges sharp in chat.'
      },
      {
        title: 'Export the 500px size',
        body: 'Generate the official Kick upload size.'
      },
      {
        title: 'Review edge clarity',
        body: 'Zoom in and confirm clean outlines on dark backgrounds.'
      },
      {
        title: 'Upload and test in chat',
        body: 'Preview at different scales and confirm readability.'
      }
    ],
    seoFaq: [
      {
        question: 'Is 500px required for Kick emotes?',
        answer: 'It’s a strong baseline for crispness, especially for detailed artwork.'
      },
      {
        question: 'Should Kick emotes be transparent?',
        answer: 'Yes, transparent PNGs look clean across backgrounds.'
      },
      {
        question: 'Can I reuse Twitch emotes on Kick?',
        answer: 'Often yes, but re-export at the recommended size for best clarity.'
      },
      {
        question: 'What if my file is too large?',
        answer: 'Kick’s limit is 1MB. Reduce subtle gradients and export again—flat colors compress smaller.'
      },
      {
        question: 'Will EmoteForge compress my art?',
        answer: 'Exports are optimized PNGs to stay within size limits while keeping detail.'
      }
    ],
    sizeGroups: [
      {
        key: 'kick',
        label: 'Kick Emotes',
        sizes: [500],
        themeColor: '#53FC18',
        maxFileSize: '1MB'
      }
    ]
  }
];
