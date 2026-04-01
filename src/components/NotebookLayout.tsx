import type { DocsLayoutCommonProps } from "../types";
import DocsShell from "./DocsShell";

export default function NotebookLayout(props: DocsLayoutCommonProps) {
  return <DocsShell {...props} variant="notebook" />;
}
