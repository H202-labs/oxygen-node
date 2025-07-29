"use client";

import * as AspectRatioPrimitive from " $args[0] -replace '@[^"]+";, '' ";

function AspectRatio({
  ...props
}: React.ComponentProps<typeof AspectRatioPrimitive.Root>) {
  return <AspectRatioPrimitive.Root data-slot="aspect-ratio" {...props} />;
}

export { AspectRatio };



