# Data Model

## Core Types

### Image Generation
```typescript
interface ImageGenerationRequest {
  prompt: string;
  style?: string;
  negative_prompt?: string;
  width?: number;
  height?: number;
  num_outputs?: number;
  scheduler?: string;
  num_inference_steps?: number;
  guidance_scale?: number;
  seed?: number;
}

interface ImageGenerationResponse {
  images: string[];
  metadata: {
    prompt: string;
    style: string;
    dimensions: {
      width: number;
      height: number;
    };
    seed: number;
  };
}
```

### Image Optimization
```typescript
interface ImageOptimizationRequest {
  input: string;
  output: string;
  removeBg?: boolean;
  resize?: {
    width: number;
    height: number;
  };
  format?: 'png' | 'jpeg' | 'webp';
  quality?: number;
}

interface ImageOptimizationResult {
  success: boolean;
  outputPath: string;
  metadata: {
    format: string;
    size: number;
    dimensions: {
      width: number;
      height: number;
    };
  };
}
```

### Brand Assets
```typescript
interface BrandImageRequest {
  brandName: string;
  type: 'logo' | 'banner' | 'social' | 'favicon';
  style: string;
  dimensions: {
    width: number;
    height: number;
  };
}
```

## Data Flow
1. User Input → Validation → API Request
2. API Response → Processing → Optimization
3. Final Output → Storage/Delivery

## Storage
- Local file system for temporary storage
- Environment variables for API keys and configuration
- Client-side state management (as needed)
