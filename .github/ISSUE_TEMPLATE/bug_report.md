---
name: Bug Report
about: Report a bug or unexpected behavior
title: '[BUG] '
labels: bug
assignees: ''
---

## Bug Description

A clear and concise description of the bug.

## Steps to Reproduce

1. Initialize plugin with...
2. Call method...
3. Observe error...

## Expected Behavior

What you expected to happen.

## Actual Behavior

What actually happened.

## Code Sample

```typescript
// Minimal reproducible example
import { AnyUpPlugin } from '@dcversus/babylon-anyup';

const plugin = new AnyUpPlugin({
  sourceSystem: 'z-up',
  targetSystem: 'y-up',
  autoConvert: true,
  preserveOriginal: false,
});
// ... rest of code
```

## Environment

- **babylon-anyup version**: [e.g., 0.1.0]
- **@babylonjs/core version**: [e.g., 7.0.0]
- **Node.js version**: [e.g., 20.10.0]
- **Browser** (if applicable): [e.g., Chrome 120]
- **OS**: [e.g., macOS 14.2]

## Additional Context

Any other context about the problem.

## Checklist

- [ ] I have searched existing issues
- [ ] I have provided a minimal reproducible example
- [ ] I have included version information
