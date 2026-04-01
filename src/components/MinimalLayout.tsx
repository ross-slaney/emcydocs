import type { DocsLayoutCommonProps } from "../types";
import DocsShell from "./DocsShell";

export default function MinimalLayout(props: DocsLayoutCommonProps) {
  return <DocsShell {...props} variant="minimal" />;
}
